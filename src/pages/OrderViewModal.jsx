// import { useState, useEffect, useRef } from "react";
// import {
//   IoClose, IoPersonOutline, IoCalendarOutline, IoWalletOutline,
//   IoLocationOutline, IoShirtOutline, IoColorPaletteOutline
// } from "react-icons/io5";

// const STATUS_TYPE = {
//   Completed: { label: "Completed", color: "#10B981", bg: "#D1FAE5" },
//   Processing: { label: "Processing", color: "#3B82F6", bg: "#DBEAFE" },
//   Pending:    { label: "Pending",    color: "#D97706", bg: "#FEF3C7" },
//   Shipped:    { label: "Shipped",    color: "#0EA5E9", bg: "#E0F2FE" },
//   Cancelled:  { label: "Cancelled",  color: "#EF4444", bg: "#FEE2E2" },
// };

// export default function OrderViewModal({ order, onClose }) {
//   const [activeTab, setActiveTab] = useState("canvas");
//   const [imgSize, setImgSize] = useState({ w: 0, h: 0 });
//   const frontImgRef = useRef(null);

//   const status = STATUS_TYPE[order.status] || STATUS_TYPE.Pending;

//   // Extract customization data from fullData
//   const fullData = order.fullData || {};
//   const product = fullData?.orderDetails?.products?.[0] || {};
//   const customization = product?.customization || order.customization || [];
//   const printZones = product?.printZones || order.printZones || {};
//   const frontZones = printZones?.front || [];

//   const deliveryAddress = fullData?.deliveryAddress || {};

//   // Find specific customization values
//   const getCustomValue = (fieldName) =>
//     customization.find((c) => c.fieldName === fieldName)?.value;

//   const patternFront  = getCustomValue("patternFront");
//   const patternBack   = getCustomValue("patternBack");
//   const clubLogo      = getCustomValue("logo");
//   const playerNumber  = getCustomValue("playerNumber");

//   const handleImgLoad = (e) => {
//     setImgSize({ w: e.target.clientWidth, h: e.target.clientHeight });
//   };

//   // Recalculate on resize
//   useEffect(() => {
//     const obs = new ResizeObserver(() => {
//       if (frontImgRef.current) {
//         setImgSize({
//           w: frontImgRef.current.clientWidth,
//           h: frontImgRef.current.clientHeight,
//         });
//       }
//     });
//     if (frontImgRef.current) obs.observe(frontImgRef.current);
//     return () => obs.disconnect();
//   }, []);

//   const tabs = [
//     { key: "canvas", label: "Canvas preview" },
//     { key: "info",   label: "Order info" },
//     { key: "custom", label: "Customization" },
//   ];

//   const s = {
//     overlay: {
//       position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       zIndex: 1000, padding: "16px",
//     },
//     modal: {
//       background: "#fff", borderRadius: "16px", width: "760px",
//       maxWidth: "100%", maxHeight: "90vh", overflowY: "auto",
//       boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
//     },
//     header: {
//       display: "flex", alignItems: "center", justifyContent: "space-between",
//       padding: "20px 24px 16px", borderBottom: "1px solid #E2E8F0",
//     },
//     tabRow: {
//       display: "flex", gap: 0, borderBottom: "1px solid #E2E8F0", padding: "0 24px",
//     },
//     tabBtn: (active) => ({
//       padding: "10px 18px", background: "none", border: "none",
//       borderBottom: active ? "2px solid #3B82F6" : "2px solid transparent",
//       cursor: "pointer", fontSize: "13px", fontWeight: 500,
//       color: active ? "#3B82F6" : "#64748B",
//     }),
//     canvasGrid: {
//       display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px",
//       padding: "20px 24px",
//     },
//     canvasWrap: {
//       position: "relative", borderRadius: "10px", overflow: "hidden",
//       border: "1px solid #E2E8F0", background: "#F8FAFC",
//     },
//     zoneBox: (zone) => ({
//       position: "absolute",
//       left:   zone.x + "%",
//       top:    zone.y + "%",
//       width:  zone.w + "%",
//       height: zone.h + "%",
//       border: "1.5px dashed rgba(59,130,246,0.85)",
//       background: "rgba(59,130,246,0.07)",
//       borderRadius: "3px",
//     }),
//     zoneLabel: {
//       position: "absolute", top: "-20px", left: "0",
//       background: "#3B82F6", color: "#fff",
//       fontSize: "10px", padding: "2px 6px", borderRadius: "3px",
//       whiteSpace: "nowrap",
//     },
//     sectionLabel: {
//       fontSize: "11px", fontWeight: 600, color: "#94A3B8",
//       textTransform: "uppercase", letterSpacing: ".5px", marginBottom: "8px",
//     },
//     infoGrid: {
//       display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px",
//       padding: "24px",
//     },
//     infoItem: { display: "flex", flexDirection: "column", gap: "3px" },
//     infoLabel: { fontSize: "11px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: ".5px" },
//     infoValue: { fontSize: "13px", fontWeight: 500, color: "#0F172A" },
//     badge: {
//       display: "inline-flex", alignItems: "center", gap: "4px",
//       padding: "3px 10px", borderRadius: "20px",
//       fontSize: "11px", fontWeight: 600,
//       background: status.bg, color: status.color,
//     },
//     thumb: {
//       width: "36px", height: "36px", objectFit: "cover",
//       borderRadius: "6px", border: "1px solid #E2E8F0",
//     },
//     custRow: {
//       display: "flex", justifyContent: "space-between", alignItems: "center",
//       padding: "10px 0", borderBottom: "1px solid #F1F5F9",
//       fontSize: "13px",
//     },
//   };

//   return (
//     <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
//       <div style={s.modal}>
//         {/* Header */}
//         <div style={s.header}>
//           <div>
//             <h2 style={{ fontSize: "16px", fontWeight: 600, margin: 0, color: "#0F172A" }}>
//               Order details
//             </h2>
//             <p style={{ fontSize: "12px", color: "#64748B", margin: "4px 0 0", fontFamily: "monospace" }}>
//               {order.id}
//             </p>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//             <span style={s.badge}>{status.label}</span>
//             <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "22px", color: "#94A3B8", lineHeight: 1, padding: 0 }}>
//               <IoClose />
//             </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div style={s.tabRow}>
//           {tabs.map((t) => (
//             <button key={t.key} style={s.tabBtn(activeTab === t.key)} onClick={() => setActiveTab(t.key)}>
//               {t.label}
//             </button>
//           ))}
//         </div>

//         {/* === CANVAS TAB === */}
//         {activeTab === "canvas" && (
//           <>
//             <div style={{ padding: "14px 24px 4px" }}>
//               <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
//                 {order.product} · Qty {order.quantity} ·{" "}
//                 <strong style={{ color: "#F5B800" }}>₹{order.total.toLocaleString()}</strong>
//               </p>
//             </div>

//             <div style={s.canvasGrid}>
//               {/* Front */}
//               <div>
//                 <p style={s.sectionLabel}>Front view</p>
//                 <div style={s.canvasWrap}>
//                   <img
//                     ref={frontImgRef}
//                     src={order.frontImage}
//                     alt="Front"
//                     style={{ width: "100%", display: "block" }}
//                     onLoad={handleImgLoad}
//                     onError={(e) => { e.target.style.display = "none"; }}
//                   />
//                   {/* Print zone overlays */}
//                   {frontZones.map((zone) => (
//                     <div key={zone.id} style={s.zoneBox(zone)}>
//                       <span style={s.zoneLabel}>{zone.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Back */}
//               <div>
//                 <p style={s.sectionLabel}>Back view</p>
//                 <div style={s.canvasWrap}>
//                   <img
//                     src={order.backImage}
//                     alt="Back"
//                     style={{ width: "100%", display: "block" }}
//                     onError={(e) => { e.target.style.display = "none"; }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Applied assets strip */}
//             {(patternFront || patternBack || clubLogo || playerNumber) && (
//               <div style={{ padding: "0 24px 20px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
//                 <p style={{ ...s.sectionLabel, margin: 0 }}>Applied:</p>
//                 {patternFront && <img src={patternFront} style={s.thumb} alt="Front pattern" title="Front pattern" />}
//                 {patternBack  && <img src={patternBack}  style={s.thumb} alt="Back pattern"  title="Back pattern"  />}
//                 {clubLogo     && <img src={clubLogo}     style={s.thumb} alt="Club logo"     title="Club logo"     />}
//                 {playerNumber && (
//                   <span style={{ fontSize: "12px", background: "#F1F5F9", padding: "4px 10px", borderRadius: "6px", color: "#0F172A", fontWeight: 600 }}>
//                     #{playerNumber}
//                   </span>
//                 )}
//               </div>
//             )}
//           </>
//         )}

//         {/* === INFO TAB === */}
//         {activeTab === "info" && (
//           <div style={s.infoGrid}>
//             <div style={s.infoItem}>
//               <span style={s.infoLabel}>Customer</span>
//               <span style={s.infoValue}>{order.customer}</span>
//             </div>
//             <div style={s.infoItem}>
//               <span style={s.infoLabel}>Email</span>
//               <span style={s.infoValue}>{order.email}</span>
//             </div>
//             <div style={s.infoItem}>
//               <span style={s.infoLabel}>Phone</span>
//               <span style={s.infoValue}>{fullData?.userDetails?.phoneNumber || "—"}</span>
//             </div>
//             <div style={s.infoItem}>
//               <span style={s.infoLabel}>Order date</span>
//               <span style={s.infoValue}>{order.date}</span>
//             </div>
//             <div style={s.infoItem}>
//               <span style={s.infoLabel}>Payment method</span>
//               <span style={s.infoValue}>{order.paymentMethod}</span>
//             </div>
//             <div style={s.infoItem}>
//               <span style={s.infoLabel}>Payment status</span>
//               <span style={{ ...s.infoValue, color: order.paymentStatus === "Completed" ? "#10B981" : "#D97706" }}>
//                 {order.paymentStatus}
//               </span>
//             </div>
//             <div style={s.infoItem}>
//               <span style={s.infoLabel}>Total</span>
//               <span style={{ ...s.infoValue, color: "#F5B800", fontSize: "16px" }}>
//                 ₹{order.total.toLocaleString()}
//               </span>
//             </div>
//             <div style={s.infoItem}>
//               <span style={s.infoLabel}>Quantity</span>
//               <span style={s.infoValue}>{order.quantity}</span>
//             </div>
//             {deliveryAddress?.addressLine1 && (
//               <div style={{ ...s.infoItem, gridColumn: "1 / -1" }}>
//                 <span style={s.infoLabel}>Delivery address</span>
//                 <span style={s.infoValue}>
//                   {deliveryAddress.fullName} · {deliveryAddress.addressLine1}, {deliveryAddress.city},{" "}
//                   {deliveryAddress.state} {deliveryAddress.zipCode} · {deliveryAddress.country}
//                 </span>
//               </div>
//             )}
//           </div>
//         )}

//         {/* === CUSTOMIZATION TAB === */}
//         {activeTab === "custom" && (
//           <div style={{ padding: "24px" }}>
//             <p style={s.sectionLabel}>Customization fields</p>
//             {customization.length === 0 && (
//               <p style={{ fontSize: "14px", color: "#94A3B8" }}>No customization data</p>
//             )}
//             {customization.map((c, i) => {
//               const isImg = c.value?.startsWith("http") &&
//                 (c.value.includes(".png") || c.value.includes(".jpg") || c.value.includes(".webp"));
//               return (
//                 <div key={i} style={s.custRow}>
//                   <span style={{ color: "#64748B", minWidth: "60px" }}>{c.zoneKey}</span>
//                   <span style={{ flex: 1, padding: "0 16px", color: "#64748B" }}>{c.fieldName}</span>
//                   <span style={{ fontWeight: 500, color: "#0F172A", maxWidth: "200px", textAlign: "right", wordBreak: "break-all" }}>
//                     {isImg ? (
//                       <img src={c.value} style={s.thumb} alt={c.fieldName} />
//                     ) : (
//                       c.value
//                     )}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const STATUS_TYPE = {
  Completed: { label: "Completed", color: "#10B981", bg: "#D1FAE5" },
  Processing: { label: "Processing", color: "#3B82F6", bg: "#DBEAFE" },
  Pending:    { label: "Pending",    color: "#D97706", bg: "#FEF3C7" },
  Shipped:    { label: "Shipped",    color: "#0EA5E9", bg: "#E0F2FE" },
  Cancelled:  { label: "Cancelled",  color: "#EF4444", bg: "#FEE2E2" },
};

const FONT_MAP = {
  brush:   "cursive",
  sport:   "Impact, Arial Black, sans-serif",
  bold:    "Arial Black, sans-serif",
  serif:   "Georgia, serif",
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
    const W = base.naturalWidth  || base.width  || 600;
    const H = base.naturalHeight || base.height || 800;
    canvas.width  = W;
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

    // better logo sizing

    const padding = 0.08;

    const innerW = zw * (1 - padding);

    const innerH = zh * (1 - padding);

    const ratio = Math.min(
      innerW / img.width,
      innerH / img.height
    );

    const dw = img.width * ratio;

    const dh = img.height * ratio;

    const dx =
      zx + (zw - dw) / 2;

    const dy =
      zy + (zh - dh) / 2;

    ctx.drawImage(
      img,
      dx,
      dy,
      dw,
      dh
    );

  } catch (_) {}
}

      if (ov.type === "text" && ov.text) {
        const fontFamily = FONT_MAP[ov.font] || FONT_MAP.default;
        const fontSize   = Math.max(1, Math.round(zh * 0.62));
        ctx.font         = `bold ${fontSize}px ${fontFamily}`;
        ctx.fillStyle    = ov.color || "#FFFFFF";
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle  = "rgba(0,0,0,0.4)";
        ctx.lineWidth    = Math.max(1, fontSize * 0.06);
        ctx.strokeText(ov.text, zx + zw / 2, zy + zh / 2);
        ctx.fillText(ov.text,   zx + zw / 2, zy + zh / 2);
      }
    }
  } catch (_) {
    const W = 400, H = 500;
    canvas.width = W; canvas.height = H;
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
    setStatus("loading");
    composeCanvas(ref.current, baseImg, patternImg, overlays || [])
      .then(() => setStatus("done"))
      .catch(() => setStatus("error"));
  }, [baseImg, patternImg]);

  return (
    <div>
      <p style={{ fontSize: "11px", fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: "8px" }}>
        {label}
      </p>
      <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", border: "1px solid #E2E8F0", background: "#F8FAFC" }}>
        {status === "loading" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", zIndex: 2, minHeight: "200px" }}>
            <span style={{ fontSize: "12px", color: "#94A3B8" }}>Compositing…</span>
          </div>
        )}
        <canvas ref={ref} style={{ width: "100%", display: "block", opacity: status === "done" ? 1 : 0, transition: "opacity .3s" }} />
      </div>
    </div>
  );
}

export default function OrderViewModal({ order, onClose }) {
  const [activeTab, setActiveTab] = useState("canvas");

  const status        = STATUS_TYPE[order.status] || STATUS_TYPE.Pending;
  const fullData      = order.fullData || {};
  const product       = fullData?.orderDetails?.products?.[0] || {};
  const customization = product?.customization || order.customization || [];
  const printZones    = product?.printZones    || order.printZones    || {};
  const frontZones    = printZones?.front || [];
  const deliveryAddress = fullData?.deliveryAddress || {};

  const getCV = (field) => customization.find((c) => c.fieldName === field)?.value;

  const jerseyColor  = getCV("jerseyColor");
  const patternFront = getCV("patternFront");
  const patternBack  = getCV("patternBack");
  const clubLogo     = getCV("logo");
  const playerName   = getCV("playerName");
  const playerNumber = getCV("playerNumber");
  const nameColor    = getCV("nameColor")   || "#222222";
  const nameFont     = getCV("nameFont")    || "default";
  const numberColor  = getCV("numberColor") || "#222222";
  const numberFont   = getCV("numberFont")  || "sport";

  const zoneById = (id) => frontZones.find((z) => z.id === id);

  const frontOverlays = [
    clubLogo     && { type: "image", zone: zoneById("clubLogo"),   src: clubLogo },
    playerName   && { type: "text",  zone: zoneById("playerName"), text: playerName,   color: nameColor,   font: nameFont   },
    playerNumber && { type: "text",  zone: zoneById("number"),     text: playerNumber, color: numberColor, font: numberFont },
  ].filter(Boolean);

  // Layer chips shown below canvas — colour swatch only for jerseyColor, no tint on image
  const layerChips = [
    jerseyColor  && { kind: "color", value: jerseyColor,  label: "Jersey colour" },
    patternFront && { kind: "img",   value: patternFront, label: "Pattern"       },
    clubLogo     && { kind: "img",   value: clubLogo,     label: "Logo"          },
    playerName   && { kind: "text",  value: playerName,   color: nameColor,      label: "Player name" },
    playerNumber && { kind: "text",  value: playerNumber, color: numberColor,    label: "Number"      },
  ].filter(Boolean);

  const tabs = [
    { key: "canvas", label: "Canvas preview" },
    { key: "info",   label: "Order info"     },
    { key: "custom", label: "Customization"  },
  ];

  const s = {
    overlay:  { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" },
    modal:    { background: "#fff", borderRadius: "16px", width: "780px", maxWidth: "100%", maxHeight: "90vh", overflowY: "auto" },
    header:   { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 16px", borderBottom: "1px solid #E2E8F0" },
    tabRow:   { display: "flex", borderBottom: "1px solid #E2E8F0", padding: "0 24px" },
    tabBtn:   (a) => ({ padding: "10px 18px", background: "none", border: "none", borderBottom: a ? "2px solid #3B82F6" : "2px solid transparent", cursor: "pointer", fontSize: "13px", fontWeight: 500, color: a ? "#3B82F6" : "#64748B" }),
    badge:    { display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: status.bg, color: status.color },
    infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", padding: "24px" },
    infoItem: { display: "flex", flexDirection: "column", gap: "3px" },
    iLabel:   { fontSize: "11px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: ".5px" },
    iValue:   { fontSize: "13px", fontWeight: 500, color: "#0F172A" },
    custRow:  { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F1F5F9", fontSize: "13px" },
    thumb:    { width: "36px", height: "36px", objectFit: "cover", borderRadius: "6px", border: "1px solid #E2E8F0" },
  };

  return (
    <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={s.modal}>

        <div style={s.header}>
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 600, margin: 0, color: "#0F172A" }}>Order details</h2>
            <p style={{ fontSize: "12px", color: "#64748B", margin: "4px 0 0", fontFamily: "monospace" }}>{order.id}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={s.badge}>{status.label}</span>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "22px", color: "#94A3B8", lineHeight: 1, padding: 0 }}>
              <IoClose />
            </button>
          </div>
        </div>

        <div style={s.tabRow}>
          {tabs.map((t) => (
            <button key={t.key} style={s.tabBtn(activeTab === t.key)} onClick={() => setActiveTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "canvas" && (
          <>
            <div style={{ padding: "14px 24px 4px" }}>
              <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
                {order.product} · Qty {order.quantity} ·{" "}
                <strong style={{ color: "#F5B800" }}>₹{order.total.toLocaleString()}</strong>
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", padding: "16px 24px 20px" }}>
              <CanvasView label="Front" baseImg={patternFront || order.frontImage}  overlays={frontOverlays} />
              <CanvasView label="Back"  baseImg={patternBack || order.backImage}   overlays={[]} />
            </div>

            {layerChips.length > 0 && (
              <div style={{ padding: "12px 24px 20px", borderTop: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "11px", color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".5px" }}>Applied</span>
                {layerChips.map((l, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    {l.kind === "color" && (
                      <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: l.value, border: "1px solid #E2E8F0" }} />
                    )}
                    {l.kind === "img" && (
                      <img src={l.value} style={{ width: "28px", height: "28px", objectFit: "cover", borderRadius: "6px", border: "1px solid #E2E8F0" }} alt={l.label} />
                    )}
                    {l.kind === "text" && (
                      <span style={{ fontSize: "12px", fontWeight: 700, padding: "3px 8px", borderRadius: "5px", background: l.color, color: "#fff", minWidth: "28px", textAlign: "center" }}>
                        {l.value}
                      </span>
                    )}
                    <span style={{ fontSize: "10px", color: "#94A3B8", whiteSpace: "nowrap" }}>{l.label}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "info" && (
          <div style={s.infoGrid}>
            <div style={s.infoItem}><span style={s.iLabel}>Customer</span><span style={s.iValue}>{order.customer}</span></div>
            <div style={s.infoItem}><span style={s.iLabel}>Email</span><span style={s.iValue}>{order.email}</span></div>
            <div style={s.infoItem}><span style={s.iLabel}>Phone</span><span style={s.iValue}>{fullData?.userDetails?.phoneNumber || "—"}</span></div>
            <div style={s.infoItem}><span style={s.iLabel}>Order date</span><span style={s.iValue}>{order.date}</span></div>
            <div style={s.infoItem}><span style={s.iLabel}>Payment</span><span style={s.iValue}>{order.paymentMethod}</span></div>
            <div style={s.infoItem}>
              <span style={s.iLabel}>Payment status</span>
              <span style={{ ...s.iValue, color: order.paymentStatus === "Completed" ? "#10B981" : "#D97706" }}>{order.paymentStatus}</span>
            </div>
            <div style={s.infoItem}><span style={s.iLabel}>Total</span><span style={{ ...s.iValue, color: "#F5B800", fontSize: "16px" }}>₹{order.total.toLocaleString()}</span></div>
            <div style={s.infoItem}><span style={s.iLabel}>Quantity</span><span style={s.iValue}>{order.quantity}</span></div>
            {deliveryAddress?.addressLine1 && (
              <div style={{ ...s.infoItem, gridColumn: "1 / -1" }}>
                <span style={s.iLabel}>Delivery address</span>
                <span style={s.iValue}>{deliveryAddress.fullName} · {deliveryAddress.addressLine1}, {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zipCode} · {deliveryAddress.country}</span>
              </div>
            )}
          </div>
        )}

        {activeTab === "custom" && (
          <div style={{ padding: "24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: "12px" }}>Customization fields</p>
            {customization.length === 0 && <p style={{ fontSize: "14px", color: "#94A3B8" }}>No customization data</p>}
            {customization.map((c, i) => {
              const isImg   = c.value?.startsWith("http") && /\.(png|jpg|jpeg|webp|gif)/i.test(c.value);
              const isColor = /^#[0-9a-fA-F]{3,6}$/.test(c.value || "");
              return (
                <div key={i} style={s.custRow}>
                  <span style={{ color: "#64748B", minWidth: "60px" }}>{c.zoneKey}</span>
                  <span style={{ flex: 1, padding: "0 16px", color: "#64748B" }}>{c.fieldName}</span>
                  <span style={{ fontWeight: 500, color: "#0F172A", textAlign: "right" }}>
                    {isImg   ? <img src={c.value} style={s.thumb} alt={c.fieldName} /> :
                     isColor ? (
                       <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                         <span style={{ display: "inline-block", width: "16px", height: "16px", borderRadius: "4px", background: c.value, border: "1px solid #E2E8F0" }} />
                         {c.value}
                       </span>
                     ) : c.value}
                  </span>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}