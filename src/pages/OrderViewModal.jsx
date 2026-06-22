import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const STATUS_TYPE = {
  Completed: { label: "Completed", color: "#10B981", bg: "#D1FAE5" },
  Processing: { label: "Processing", color: "#3B82F6", bg: "#DBEAFE" },
  Pending: { label: "Pending", color: "#D97706", bg: "#FEF3C7" },
  Shipped: { label: "Shipped", color: "#0EA5E9", bg: "#E0F2FE" },
  Cancelled: { label: "Cancelled", color: "#EF4444", bg: "#FEE2E2" },
};

const FONT_MAP = {
  brush: "cursive",
  sport: "Impact, Arial Black, sans-serif",
  bold: "Arial Black, sans-serif",
  serif: "Georgia, serif",
  default: "Arial, sans-serif",
};

function loadImage(src) {
  return new Promise((resolve, reject) => {
    if (!src) return reject(new Error("No src"));
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => {
      const img2 = new Image();
      img2.onload = () => resolve(img2);
      img2.onerror = () => reject(new Error("Failed: " + src));
      img2.src = src + (src.includes("?") ? "&" : "?") + "_=" + Date.now();
    };
    img.src = src;
  });
}

async function composeCanvas(canvas, baseImgSrc, patternSrc, overlays) {
  if (!canvas || !baseImgSrc) return;
  const ctx = canvas.getContext("2d");
  try {
    const base = await loadImage(baseImgSrc);
    const W = base.naturalWidth || base.width || 600;
    const H = base.naturalHeight || base.height || 800;
    canvas.width = W;
    canvas.height = H;

    // 1. Base product image — clean, no colour tint
    ctx.drawImage(base, 0, 0, W, H);

    // 2. Pattern overlay (multiply)
    if (patternSrc) {
      try {
        const pat = await loadImage(patternSrc);
        ctx.globalCompositeOperation = "multiply";
        ctx.drawImage(pat, 0, 0, W, H);
        ctx.globalCompositeOperation = "source-over";
      } catch (_) {
        ctx.globalCompositeOperation = "source-over";
      }
    }

    // 3. Overlays (logo image / text) inside print zones
    for (const ov of overlays) {
      if (!ov || !ov.zone) continue;
      const { zone } = ov;
      const zx = (zone.x / 100) * W;
      const zy = (zone.y / 100) * H;
      const zw = (zone.w / 100) * W;
      const zh = (zone.h / 100) * H;

      if (ov.type === "image" && ov.src) {
        try {
          const img = await loadImage(ov.src);
          const padding = 0.08;
          const innerW = zw * (1 - padding);
          const innerH = zh * (1 - padding);
          const ratio = Math.min(innerW / img.width, innerH / img.height);
          const dw = img.width * ratio;
          const dh = img.height * ratio;
          const dx = zx + (zw - dw) / 2;
          const dy = zy + (zh - dh) / 2;
          ctx.drawImage(img, dx, dy, dw, dh);
        } catch (_) {}
      }

      if (ov.type === "text" && ov.text) {
        const fontFamily = FONT_MAP[ov.font] || FONT_MAP.default;
        const fontSize = Math.max(1, Math.round(zh * 0.62));
        ctx.font = `bold ${fontSize}px ${fontFamily}`;
        ctx.fillStyle = ov.color || "#FFFFFF";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "rgba(0,0,0,0.4)";
        ctx.lineWidth = Math.max(1, fontSize * 0.06);
        ctx.strokeText(ov.text, zx + zw / 2, zy + zh / 2);
        ctx.fillText(ov.text, zx + zw / 2, zy + zh / 2);
      }
    }
  } catch (_) {
    const W = 400,
      H = 500;
    canvas.width = W;
    canvas.height = H;
    ctx.fillStyle = "#F1F5F9";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#94A3B8";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Preview unavailable", W / 2, H / 2);
  }
}

function CanvasView({ label, baseImg, patternImg, overlays }) {
  const ref = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!ref.current) return;
    if (!baseImg) {
      setStatus("empty");
      return;
    }
    setStatus("loading");
    composeCanvas(ref.current, baseImg, patternImg, overlays || [])
      .then(() => setStatus("done"))
      .catch(() => setStatus("error"));
  }, [baseImg, patternImg]);

  return (
    <div>
      <p
        style={{
          fontSize: "11px",
          fontWeight: 600,
          color: "#94A3B8",
          textTransform: "uppercase",
          letterSpacing: ".5px",
          marginBottom: "8px",
        }}
      >
        {label}
      </p>
      <div
        style={{
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid #E2E8F0",
          background: "#F8FAFC",
          minHeight: "160px",
        }}
      >
        {status === "loading" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F8FAFC",
              zIndex: 2,
              minHeight: "160px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#94A3B8" }}>Compositing…</span>
          </div>
        )}
        {status === "empty" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "160px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#94A3B8" }}>No image available</span>
          </div>
        )}
        <canvas
          ref={ref}
          style={{
            width: "100%",
            display: status === "empty" ? "none" : "block",
            opacity: status === "done" ? 1 : 0,
            transition: "opacity .3s",
          }}
        />
      </div>
    </div>
  );
}

// Build everything needed to render ONE product's preview + chips,
// derived purely from that product's own data (not the order/other products).
function buildProductView(product) {
  const customization = product?.customization || [];
  const printZones = product?.printZones || {};
  const frontZones = printZones?.front || [];

  const getCV = (field) => customization.find((c) => c.fieldName === field)?.value;

  const jerseyColor = getCV("jerseyColor");
  const patternFront = getCV("patternFront");
  const patternBack = getCV("patternBack");
  const clubLogo = getCV("logo");
  const playerName = getCV("playerName");
  const playerNumber = getCV("playerNumber");
  const nameColor = getCV("nameColor") || "#222222";
  const nameFont = getCV("nameFont") || "default";
  const numberColor = getCV("numberColor") || "#222222";
  const numberFont = getCV("numberFont") || "sport";

  const zoneById = (id) => frontZones.find((z) => z.id === id);

  const frontOverlays = [
    clubLogo && { type: "image", zone: zoneById("clubLogo"), src: clubLogo },
    playerName && {
      type: "text",
      zone: zoneById("playerName"),
      text: playerName,
      color: nameColor,
      font: nameFont,
    },
    playerNumber && {
      type: "text",
      zone: zoneById("number"),
      text: playerNumber,
      color: numberColor,
      font: numberFont,
    },
  ].filter(Boolean);

  const layerChips = [
    jerseyColor && { kind: "color", value: jerseyColor, label: "Jersey colour" },
    patternFront && { kind: "img", value: patternFront, label: "Pattern" },
    clubLogo && { kind: "img", value: clubLogo, label: "Logo" },
    playerName && { kind: "text", value: playerName, color: nameColor, label: "Player name" },
    playerNumber && { kind: "text", value: playerNumber, color: numberColor, label: "Number" },
  ].filter(Boolean);

  return {
    customization,
    // base image: pattern if present, else the product's own plain images
    frontBaseImg: patternFront || product.frontImage || product.viewImages?.front,
    backBaseImg: patternBack || product.backImage || product.viewImages?.back,
    frontOverlays,
    layerChips,
    hasCustomization: customization.length > 0,
  };
}

export default function OrderViewModal({ order, onClose }) {
  const [activeTab, setActiveTab] = useState("canvas");

  const statusInfo = STATUS_TYPE[order.orderStatus || order.status] || STATUS_TYPE.Pending;
  const fullData = order.fullData || {};
  const products =
    fullData?.orderDetails?.products && fullData.orderDetails.products.length > 0
      ? fullData.orderDetails.products
      : order.products || [];
  const deliveryAddress = fullData?.deliveryAddress || {};

  const tabs = [
    { key: "canvas", label: "Canvas preview" },
    { key: "info", label: "Order info" },
    { key: "custom", label: "Customization" },
  ];

  const s = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "16px",
    },
    modal: {
      background: "#fff",
      borderRadius: "16px",
      width: "820px",
      maxWidth: "100%",
      maxHeight: "90vh",
      overflowY: "auto",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 24px 16px",
      borderBottom: "1px solid #E2E8F0",
      position: "sticky",
      top: 0,
      background: "#fff",
      zIndex: 5,
    },
    tabRow: {
      display: "flex",
      borderBottom: "1px solid #E2E8F0",
      padding: "0 24px",
      position: "sticky",
      top: "73px",
      background: "#fff",
      zIndex: 5,
    },
    tabBtn: (a) => ({
      padding: "10px 18px",
      background: "none",
      border: "none",
      borderBottom: a ? "2px solid #3B82F6" : "2px solid transparent",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: 500,
      color: a ? "#3B82F6" : "#64748B",
    }),
    badge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "3px 10px",
      borderRadius: "20px",
      fontSize: "11px",
      fontWeight: 600,
      background: statusInfo.bg,
      color: statusInfo.color,
    },
    infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", padding: "24px" },
    infoItem: { display: "flex", flexDirection: "column", gap: "3px" },
    iLabel: { fontSize: "11px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: ".5px" },
    iValue: { fontSize: "13px", fontWeight: 500, color: "#0F172A" },
    custRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
      borderBottom: "1px solid #F1F5F9",
      fontSize: "13px",
    },
    thumb: { width: "36px", height: "36px", objectFit: "cover", borderRadius: "6px", border: "1px solid #E2E8F0" },
    productHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 24px 4px",
    },
    productDivider: {
      borderTop: "1px solid #E2E8F0",
      marginTop: "8px",
    },
  };

  const orderId = order.id || order.orderId;
  const total = order.total ?? order.totalPrice ?? 0;
  const quantity = order.quantity ?? fullData?.orderDetails?.cartQuantity;

  return (
    <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={s.modal}>
        {/* Header */}
        <div style={s.header}>
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 600, margin: 0, color: "#0F172A" }}>Order details</h2>
            <p style={{ fontSize: "12px", color: "#64748B", margin: "4px 0 0", fontFamily: "monospace" }}>
              {orderId}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={s.badge}>{statusInfo.label}</span>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "22px",
                color: "#94A3B8",
                lineHeight: 1,
                padding: 0,
              }}
            >
              <IoClose />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={s.tabRow}>
          {tabs.map((t) => (
            <button key={t.key} style={s.tabBtn(activeTab === t.key)} onClick={() => setActiveTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* === CANVAS TAB === */}
        {activeTab === "canvas" && (
          <>
            {products.length === 0 && (
              <p style={{ padding: "24px", fontSize: "14px", color: "#94A3B8" }}>No products in this order</p>
            )}

            {products.map((product, idx) => {
              const pv = buildProductView(product);
              return (
                <div key={product.productId ? `${product.productId}-${idx}` : idx} style={idx > 0 ? s.productDivider : undefined}>
                  <div style={s.productHeader}>
                    <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
                      <strong style={{ color: "#0F172A" }}>{product.productName}</strong> · Qty {product.quantity} ·{" "}
                      <strong style={{ color: "#F5B800" }}>₹{(product.subtotal ?? product.price ?? 0).toLocaleString()}</strong>
                    </p>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: "12px",
                        background: pv.hasCustomization ? "#EDE9FE" : "#F1F5F9",
                        color: pv.hasCustomization ? "#7C3AED" : "#94A3B8",
                      }}
                    >
                      {pv.hasCustomization ? "Customized" : "No customization"}
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", padding: "16px 24px 20px" }}>
                    <CanvasView label="Front" baseImg={pv.frontBaseImg} overlays={pv.frontOverlays} />
                    <CanvasView label="Back" baseImg={pv.backBaseImg} overlays={[]} />
                  </div>

                  {pv.layerChips.length > 0 && (
                    <div
                      style={{
                        padding: "0 24px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#94A3B8",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: ".5px",
                        }}
                      >
                        Applied
                      </span>
                      {pv.layerChips.map((l, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                          {l.kind === "color" && (
                            <div
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "6px",
                                background: l.value,
                                border: "1px solid #E2E8F0",
                              }}
                            />
                          )}
                          {l.kind === "img" && (
                            <img
                              src={l.value}
                              style={{ width: "28px", height: "28px", objectFit: "cover", borderRadius: "6px", border: "1px solid #E2E8F0" }}
                              alt={l.label}
                            />
                          )}
                          {l.kind === "text" && (
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: 700,
                                padding: "3px 8px",
                                borderRadius: "5px",
                                background: l.color,
                                color: "#fff",
                                minWidth: "28px",
                                textAlign: "center",
                              }}
                            >
                              {l.value}
                            </span>
                          )}
                          <span style={{ fontSize: "10px", color: "#94A3B8", whiteSpace: "nowrap" }}>{l.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* === INFO TAB === */}
        {activeTab === "info" && (
          <div style={s.infoGrid}>
            <div style={s.infoItem}>
              <span style={s.iLabel}>Customer</span>
              <span style={s.iValue}>{order.customer || fullData?.userDetails?.name}</span>
            </div>
            <div style={s.infoItem}>
              <span style={s.iLabel}>Email</span>
              <span style={s.iValue}>{order.email || fullData?.userDetails?.email}</span>
            </div>
            <div style={s.infoItem}>
              <span style={s.iLabel}>Phone</span>
              <span style={s.iValue}>{fullData?.userDetails?.phoneNumber || "—"}</span>
            </div>
            <div style={s.infoItem}>
              <span style={s.iLabel}>Order date</span>
              <span style={s.iValue}>{order.date}</span>
            </div>
            <div style={s.infoItem}>
              <span style={s.iLabel}>Payment method</span>
              <span style={s.iValue}>{order.paymentMethod}</span>
            </div>
            <div style={s.infoItem}>
              <span style={s.iLabel}>Payment status</span>
              <span style={{ ...s.iValue, color: order.paymentStatus === "Completed" ? "#10B981" : "#D97706" }}>
                {order.paymentStatus}
              </span>
            </div>
            <div style={s.infoItem}>
              <span style={s.iLabel}>Total</span>
              <span style={{ ...s.iValue, color: "#F5B800", fontSize: "16px" }}>₹{total.toLocaleString()}</span>
            </div>
            <div style={s.infoItem}>
              <span style={s.iLabel}>Quantity</span>
              <span style={s.iValue}>{quantity ?? "—"}</span>
            </div>
            {deliveryAddress?.addressLine1 && (
              <div style={{ ...s.infoItem, gridColumn: "1 / -1" }}>
                <span style={s.iLabel}>Delivery address</span>
                <span style={s.iValue}>
                  {deliveryAddress.fullName} · {deliveryAddress.addressLine1}, {deliveryAddress.city},{" "}
                  {deliveryAddress.state} {deliveryAddress.zipCode} · {deliveryAddress.country}
                </span>
              </div>
            )}
          </div>
        )}

        {/* === CUSTOMIZATION TAB === */}
        {activeTab === "custom" && (
          <>
            {products.length === 0 && (
              <p style={{ padding: "24px", fontSize: "14px", color: "#94A3B8" }}>No products in this order</p>
            )}

            {products.map((product, idx) => {
              const customization = product?.customization || [];
              return (
                <div
                  key={product.productId ? `${product.productId}-${idx}` : idx}
                  style={{
                    padding: "24px",
                    borderTop: idx > 0 ? "1px solid #E2E8F0" : "none",
                  }}
                >
                  <p style={{ fontWeight: 600, fontSize: "13px", color: "#0F172A", marginBottom: "4px" }}>
                    {product.productName}
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#94A3B8",
                      textTransform: "uppercase",
                      letterSpacing: ".5px",
                      marginBottom: "12px",
                    }}
                  >
                    Customization fields
                  </p>

                  {customization.length === 0 ? (
                    <p style={{ fontSize: "14px", color: "#94A3B8" }}>No customization data</p>
                  ) : (
                    customization.map((c, i) => {
                      const isImg = c.value?.startsWith("http") && /\.(png|jpg|jpeg|webp|gif)/i.test(c.value);
                      const isColor = /^#[0-9a-fA-F]{3,6}$/.test(c.value || "");
                      return (
                        <div key={i} style={s.custRow}>
                          <span style={{ color: "#64748B", minWidth: "60px" }}>{c.zoneKey}</span>
                          <span style={{ flex: 1, padding: "0 16px", color: "#64748B" }}>{c.fieldName}</span>
                          <span style={{ fontWeight: 500, color: "#0F172A", textAlign: "right" }}>
                            {isImg ? (
                              <img src={c.value} style={s.thumb} alt={c.fieldName} />
                            ) : isColor ? (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "4px",
                                    background: c.value,
                                    border: "1px solid #E2E8F0",
                                  }}
                                />
                                {c.value}
                              </span>
                            ) : (
                              c.value
                            )}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}