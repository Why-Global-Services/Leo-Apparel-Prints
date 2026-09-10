// import { useState, useEffect, useRef } from "react";
// import { IoClose } from "react-icons/io5";

// const STATUS_TYPE = {
//   Completed: { label: "Completed", color: "#10B981", bg: "#D1FAE5" },
//   Processing: { label: "Processing", color: "#3B82F6", bg: "#DBEAFE" },
//   Pending: { label: "Pending", color: "#D97706", bg: "#FEF3C7" },
//   Shipped: { label: "Shipped", color: "#0EA5E9", bg: "#E0F2FE" },
//   Cancelled: { label: "Cancelled", color: "#EF4444", bg: "#FEE2E2" },
// };

// const FONT_MAP = {
//   brush: "cursive",
//   sport: "Impact, Arial Black, sans-serif",
//   bold: "Arial Black, sans-serif",
//   serif: "Georgia, serif",
//   default: "Arial, sans-serif",
// };

// function loadImage(src) {
//   return new Promise((resolve, reject) => {
//     if (!src) return reject(new Error("No src"));
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.onload = () => resolve(img);
//     img.onerror = () => {
//       const img2 = new Image();
//       img2.onload = () => resolve(img2);
//       img2.onerror = () => reject(new Error("Failed: " + src));
//       img2.src = src + (src.includes("?") ? "&" : "?") + "_=" + Date.now();
//     };
//     img.src = src;
//   });
// }

// async function composeCanvas(canvas, baseImgSrc, patternSrc, overlays) {
//   if (!canvas || !baseImgSrc) return;
//   const ctx = canvas.getContext("2d");
//   try {
//     const base = await loadImage(baseImgSrc);
//     const W = base.naturalWidth || base.width || 600;
//     const H = base.naturalHeight || base.height || 800;
//     canvas.width = W;
//     canvas.height = H;

//     // 1. Base product image — clean, no colour tint
//     ctx.drawImage(base, 0, 0, W, H);

//     // 2. Pattern overlay (multiply)
//     if (patternSrc) {
//       try {
//         const pat = await loadImage(patternSrc);
//         ctx.globalCompositeOperation = "multiply";
//         ctx.drawImage(pat, 0, 0, W, H);
//         ctx.globalCompositeOperation = "source-over";
//       } catch (_) {
//         ctx.globalCompositeOperation = "source-over";
//       }
//     }

//     // 3. Overlays (logo image / text) inside print zones
//     for (const ov of overlays) {
//       if (!ov || !ov.zone) continue;
//       const { zone } = ov;
//       const zx = (zone.x / 100) * W;
//       const zy = (zone.y / 100) * H;
//       const zw = (zone.w / 100) * W;
//       const zh = (zone.h / 100) * H;

//       if (ov.type === "image" && ov.src) {
//         try {
//           const img = await loadImage(ov.src);
//           const padding = 0.08;
//           const innerW = zw * (1 - padding);
//           const innerH = zh * (1 - padding);
//           const ratio = Math.min(innerW / img.width, innerH / img.height);
//           const dw = img.width * ratio;
//           const dh = img.height * ratio;
//           const dx = zx + (zw - dw) / 2;
//           const dy = zy + (zh - dh) / 2;
//           ctx.drawImage(img, dx, dy, dw, dh);
//         } catch (_) {}
//       }

//       if (ov.type === "text" && ov.text) {
//         const fontFamily = FONT_MAP[ov.font] || FONT_MAP.default;
//         const fontSize = Math.max(1, Math.round(zh * 0.62));
//         ctx.font = `bold ${fontSize}px ${fontFamily}`;
//         ctx.fillStyle = ov.color || "#FFFFFF";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.strokeStyle = "rgba(0,0,0,0.4)";
//         ctx.lineWidth = Math.max(1, fontSize * 0.06);
//         ctx.strokeText(ov.text, zx + zw / 2, zy + zh / 2);
//         ctx.fillText(ov.text, zx + zw / 2, zy + zh / 2);
//       }
//     }
//   } catch (_) {
//     const W = 400,
//       H = 500;
//     canvas.width = W;
//     canvas.height = H;
//     ctx.fillStyle = "#F1F5F9";
//     ctx.fillRect(0, 0, W, H);
//     ctx.fillStyle = "#94A3B8";
//     ctx.font = "14px Arial";
//     ctx.textAlign = "center";
//     ctx.fillText("Preview unavailable", W / 2, H / 2);
//   }
// }

// function CanvasView({ label, baseImg, patternImg, overlays }) {
//   const ref = useRef(null);
//   const [status, setStatus] = useState("loading");

//   useEffect(() => {
//     if (!ref.current) return;
//     if (!baseImg) {
//       setStatus("empty");
//       return;
//     }
//     setStatus("loading");
//     composeCanvas(ref.current, baseImg, patternImg, overlays || [])
//       .then(() => setStatus("done"))
//       .catch(() => setStatus("error"));
//   }, [baseImg, patternImg]);

//   return (
//     <div>
//       <p
//         style={{
//           fontSize: "11px",
//           fontWeight: 600,
//           color: "#94A3B8",
//           textTransform: "uppercase",
//           letterSpacing: ".5px",
//           marginBottom: "8px",
//         }}
//       >
//         {label}
//       </p>
//       <div
//         style={{
//           position: "relative",
//           borderRadius: "10px",
//           overflow: "hidden",
//           border: "1px solid #E2E8F0",
//           background: "#F8FAFC",
//           minHeight: "160px",
//         }}
//       >
//         {status === "loading" && (
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               background: "#F8FAFC",
//               zIndex: 2,
//               minHeight: "160px",
//             }}
//           >
//             <span style={{ fontSize: "12px", color: "#94A3B8" }}>Compositing…</span>
//           </div>
//         )}
//         {status === "empty" && (
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               minHeight: "160px",
//             }}
//           >
//             <span style={{ fontSize: "12px", color: "#94A3B8" }}>No image available</span>
//           </div>
//         )}
//         <canvas
//           ref={ref}
//           style={{
//             width: "100%",
//             display: status === "empty" ? "none" : "block",
//             opacity: status === "done" ? 1 : 0,
//             transition: "opacity .3s",
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// // Build everything needed to render ONE product's preview + chips,
// // derived purely from that product's own data (not the order/other products).
// function buildProductView(product) {
//   const customization = product?.customization || [];
//   const printZones = product?.printZones || {};
//   const frontZones = printZones?.front || [];

//   const getCV = (field) => customization.find((c) => c.fieldName === field)?.value;

//   const jerseyColor = product.color || getCV("jerseyColor") || customization.find(c => c.fieldName?.toLowerCase().includes("color") || /^#[0-9a-fA-F]{3,6}$/.test(c.value || ""))?.value;
//   const patternFront = getCV("patternFront");
//   const patternBack = getCV("patternBack");
//   const clubLogo = getCV("logo");
//   const playerName = getCV("playerName");
//   const playerNumber = getCV("playerNumber");
//   const nameColor = getCV("nameColor") || "#222222";
//   const nameFont = getCV("nameFont") || "default";
//   const numberColor = getCV("numberColor") || "#222222";
//   const numberFont = getCV("numberFont") || "sport";
  
//   const singleSize = getCV("size") || customization.find(c => c.fieldName?.toLowerCase().includes("size") && !c.fieldName.includes("_"))?.value;
//   const singleSleeve = getCV("sleeve") || customization.find(c => c.fieldName?.toLowerCase().includes("sleeve") && !c.fieldName.includes("_"))?.value;

//   const rosterItems = [];
//   customization.forEach((c) => {
//     const match = c.fieldName?.match(/^player(Name|Number|Size|Sleeve|Color)_(\d+)$/i);
//     if (match) {
//       const type = match[1].toLowerCase();
//       const idx = parseInt(match[2], 10);
//       if (!rosterItems[idx]) rosterItems[idx] = {};
//       rosterItems[idx][type] = c.value;
//     }
//   });
//   let validRoster = rosterItems.filter(Boolean);

//   if (product.sizes && product.sizes.length > 0) {
//     const expandedRoster = [];
//     product.sizes.forEach(s => {
//       for (let i = 0; i < s.quantity; i++) {
//         expandedRoster.push({ size: s.size, sleeve: "Half", name: "-", number: "-", color: "-" });
//       }
//     });
//     validRoster.forEach((vr, i) => {
//       if (expandedRoster[i]) {
//         expandedRoster[i] = { ...expandedRoster[i], ...vr };
//       }
//     });
//     validRoster = expandedRoster;
//   } else if (product.quantity > validRoster.length) {
//     const padCount = product.quantity - validRoster.length;
//     for (let i = 0; i < padCount; i++) {
//       validRoster.push({ name: "-", number: "-", size: "-", sleeve: "-", color: "-" });
//     }
//   }

//   const zoneById = (id) => frontZones.find((z) => z.id === id);

//   const frontOverlays = [
//     clubLogo && { type: "image", zone: zoneById("clubLogo"), src: clubLogo },
//     playerName && {
//       type: "text",
//       zone: zoneById("playerName"),
//       text: playerName,
//       color: nameColor,
//       font: nameFont,
//     },
//     playerNumber && {
//       type: "text",
//       zone: zoneById("number"),
//       text: playerNumber,
//       color: numberColor,
//       font: numberFont,
//     },
//   ].filter(Boolean);

//   const layerChips = [
//     jerseyColor && { kind: "color", value: jerseyColor, label: "Jersey colour" },
//     patternFront && { kind: "img", value: patternFront, label: "Pattern" },
//     clubLogo && { kind: "img", value: clubLogo, label: "Logo" },
//     playerName && { kind: "text", value: playerName, color: nameColor, label: "Player name" },
//     playerNumber && { kind: "text", value: playerNumber, color: numberColor, label: "Number" },
//     singleSize && { kind: "text", value: singleSize, color: "#3B82F6", label: "Size" },
//     singleSleeve && { kind: "text", value: singleSleeve, color: "#3B82F6", label: "Sleeve" },
//   ].filter(Boolean);

//   return {
//     customization,
//     // base image: pattern if present, else the product's own plain images
//     frontBaseImg: patternFront || product.frontImage || product.viewImages?.front,
//     backBaseImg: patternBack || product.backImage || product.viewImages?.back,
//     frontOverlays,
//     layerChips,
//     hasCustomization: customization.length > 0,
//     roster: validRoster,
//   };
// }

// export default function OrderViewModal({ order, onClose }) {
//   const [activeTab, setActiveTab] = useState("canvas");

//   const statusInfo = STATUS_TYPE[order.orderStatus || order.status] || STATUS_TYPE.Pending;
//   const fullData = order.fullData || {};
//   const products =
//     fullData?.orderDetails?.products && fullData.orderDetails.products.length > 0
//       ? fullData.orderDetails.products
//       : order.products || [];
//   const deliveryAddress = fullData?.deliveryAddress || {};

//   const tabs = [
//     { key: "canvas", label: "Canvas preview" },
//     { key: "info", label: "Order info" },
//     // { key: "custom", label: "Customization" },
//   ];

//   const s = {
//     overlay: {
//       position: "fixed",
//       inset: 0,
//       background: "rgba(0,0,0,0.55)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 1000,
//       padding: "16px",
//     },
//     modal: {
//       background: "#fff",
//       borderRadius: "16px",
//       width: "820px",
//       maxWidth: "100%",
//       maxHeight: "90vh",
//       overflowY: "auto",
//     },
//     header: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       padding: "20px 24px 16px",
//       borderBottom: "1px solid #E2E8F0",
//       position: "sticky",
//       top: 0,
//       background: "#fff",
//       zIndex: 5,
//     },
//     tabRow: {
//       display: "flex",
//       borderBottom: "1px solid #E2E8F0",
//       padding: "0 24px",
//       position: "sticky",
//       top: "73px",
//       background: "#fff",
//       zIndex: 5,
//     },
//     tabBtn: (a) => ({
//       padding: "10px 18px",
//       background: "none",
//       border: "none",
//       borderBottom: a ? "2px solid #3B82F6" : "2px solid transparent",
//       cursor: "pointer",
//       fontSize: "13px",
//       fontWeight: 500,
//       color: a ? "#3B82F6" : "#64748B",
//     }),
//     badge: {
//       display: "inline-flex",
//       alignItems: "center",
//       padding: "3px 10px",
//       borderRadius: "20px",
//       fontSize: "11px",
//       fontWeight: 600,
//       background: statusInfo.bg,
//       color: statusInfo.color,
//     },
//     infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", padding: "24px" },
//     infoItem: { display: "flex", flexDirection: "column", gap: "3px" },
//     iLabel: { fontSize: "11px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: ".5px" },
//     iValue: { fontSize: "13px", fontWeight: 500, color: "#0F172A" },
//     custRow: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "10px 0",
//       borderBottom: "1px solid #F1F5F9",
//       fontSize: "13px",
//     },
//     thumb: { width: "36px", height: "36px", objectFit: "cover", borderRadius: "6px", border: "1px solid #E2E8F0" },
//     productHeader: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       padding: "14px 24px 4px",
//     },
//     productDivider: {
//       borderTop: "1px solid #E2E8F0",
//       marginTop: "8px",
//     },
//   };

//   const orderId = order.id || order.orderId;
//   const total = order.total ?? order.totalPrice ?? 0;
//   const quantity = order.quantity ?? fullData?.orderDetails?.cartQuantity;

//   return (
//     <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
//       <div style={s.modal}>
//         {/* Header */}
//         <div style={s.header}>
//           <div>
//             <h2 style={{ fontSize: "16px", fontWeight: 600, margin: 0, color: "#0F172A" }}>Order details</h2>
//             <p style={{ fontSize: "12px", color: "#64748B", margin: "4px 0 0", fontFamily: "monospace" }}>
//               {orderId}
//             </p>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//             <span style={s.badge}>{statusInfo.label}</span>
//             <button
//               onClick={onClose}
//               style={{
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 fontSize: "22px",
//                 color: "#94A3B8",
//                 lineHeight: 1,
//                 padding: 0,
//               }}
//             >
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
//             {products.length === 0 && (
//               <p style={{ padding: "24px", fontSize: "14px", color: "#94A3B8" }}>No products in this order</p>
//             )}

//             {products.map((product, idx) => {
//               const pv = buildProductView(product);
//               return (
//                 <div key={product.productId ? `${product.productId}-${idx}` : idx} style={idx > 0 ? s.productDivider : undefined}>
//                   <div style={s.productHeader}>
//                     <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
//                       <strong style={{ color: "#0F172A" }}>{product.productName}</strong> · Qty {product.quantity} ·{" "}
//                       <strong style={{ color: "#F5B800" }}>₹{(product.subtotal ?? product.price ?? 0).toLocaleString()}</strong>
//                     </p>
//                     <span
//                       style={{
//                         fontSize: "11px",
//                         fontWeight: 600,
//                         padding: "2px 8px",
//                         borderRadius: "12px",
//                         background: pv.hasCustomization ? "#EDE9FE" : "#F1F5F9",
//                         color: pv.hasCustomization ? "#7C3AED" : "#94A3B8",
//                       }}
//                     >
//                       {pv.hasCustomization ? "Customized" : "No customization"}
//                     </span>
//                   </div>

//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", padding: "16px 24px 20px" }}>
//                     <CanvasView label="Front" baseImg={pv.frontBaseImg} overlays={pv.frontOverlays} />
//                     <CanvasView label="Back" baseImg={pv.backBaseImg} overlays={[]} />
//                   </div>

//                   {pv.layerChips.length > 0 && (
//                     <div
//                       style={{
//                         padding: "0 24px 20px",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "20px",
//                         flexWrap: "wrap",
//                       }}
//                     >
//                       <span
//                         style={{
//                           fontSize: "11px",
//                           color: "#94A3B8",
//                           fontWeight: 600,
//                           textTransform: "uppercase",
//                           letterSpacing: ".5px",
//                         }}
//                       >
//                         Applied
//                       </span>
//                       {pv.layerChips.map((l, i) => (
//                         <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
//                           {l.kind === "color" && (
//                             <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
//                               <div
//                                 style={{
//                                   width: "28px",
//                                   height: "28px",
//                                   borderRadius: "6px",
//                                   background: l.value,
//                                   border: "1px solid #E2E8F0",
//                                 }}
//                               />
//                               <span style={{ fontSize: "10px", fontWeight: 700, color: "#475569" }}>{l.value.toUpperCase()}</span>
//                             </div>
//                           )}
//                           {l.kind === "img" && (
//                             <img
//                               src={l.value}
//                               style={{ width: "28px", height: "28px", objectFit: "cover", borderRadius: "6px", border: "1px solid #E2E8F0" }}
//                               alt={l.label}
//                             />
//                           )}
//                           {l.kind === "text" && (
//                             <span
//                               style={{
//                                 fontSize: "12px",
//                                 fontWeight: 700,
//                                 padding: "3px 8px",
//                                 borderRadius: "5px",
//                                 background: l.color,
//                                 color: "#fff",
//                                 minWidth: "28px",
//                                 textAlign: "center",
//                               }}
//                             >
//                               {l.value}
//                             </span>
//                           )}
//                           <span style={{ fontSize: "10px", color: "#94A3B8", whiteSpace: "nowrap" }}>{l.label}</span>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {pv.roster && pv.roster.length > 0 && (
//                     <div style={{ padding: "0 24px 20px" }}>
//                       <p style={{
//                         fontSize: "11px", color: "#94A3B8", fontWeight: 600,
//                         textTransform: "uppercase", letterSpacing: ".5px", marginBottom: "12px"
//                       }}>
//                         Player Variations (Roster)
//                       </p>
//                       <div style={{ overflowX: 'auto', border: "1px solid #E2E8F0", borderRadius: "8px" }}>
//                         <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", minWidth: "400px" }}>
//                           <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
//                             <tr>
//                               <th style={{ padding: "10px 12px", textAlign: "left", color: "#64748B", fontWeight: 600 }}>#</th>
//                               <th style={{ padding: "10px 12px", textAlign: "left", color: "#64748B", fontWeight: 600 }}>Name</th>
//                               <th style={{ padding: "10px 12px", textAlign: "left", color: "#64748B", fontWeight: 600 }}>Number</th>
//                               <th style={{ padding: "10px 12px", textAlign: "left", color: "#64748B", fontWeight: 600 }}>Size</th>
//                               <th style={{ padding: "10px 12px", textAlign: "left", color: "#64748B", fontWeight: 600 }}>Sleeve</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {pv.roster.map((r, i) => (
//                               <tr key={i} style={{ borderBottom: i < pv.roster.length - 1 ? "1px solid #F1F5F9" : "none" }}>
//                                 <td style={{ padding: "10px 12px", color: "#94A3B8" }}>{i + 1}</td>
//                                 <td style={{ padding: "10px 12px", color: "#0F172A", fontWeight: 500 }}>{r.name || "—"}</td>
//                                 <td style={{ padding: "10px 12px", color: "#0F172A", fontWeight: 500 }}>{r.number || "—"}</td>
//                                 <td style={{ padding: "10px 12px" }}><span style={{ background: "#EFF6FF", color: "#3B82F6", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>{r.size || "—"}</span></td>
//                                 <td style={{ padding: "10px 12px" }}><span style={{ background: "#F1F5F9", color: "#64748B", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>{r.sleeve || "—"}</span></td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </>
//         )}

//         {/* === INFO TAB === */}
//         {activeTab === "info" && (
//           <div style={s.infoGrid}>
//             <div style={s.infoItem}>
//               <span style={s.iLabel}>Customer</span>
//               <span style={s.iValue}>{order.customer || fullData?.userDetails?.name}</span>
//             </div>
//             <div style={s.infoItem}>
//               <span style={s.iLabel}>Email</span>
//               <span style={s.iValue}>{order.email || fullData?.userDetails?.email}</span>
//             </div>
//             <div style={s.infoItem}>
//               <span style={s.iLabel}>Phone</span>
//               <span style={s.iValue}>{fullData?.userDetails?.phoneNumber || "—"}</span>
//             </div>
//             <div style={s.infoItem}>
//               <span style={s.iLabel}>Order date</span>
//               <span style={s.iValue}>{order.date}</span>
//             </div>
//             <div style={s.infoItem}>
//               <span style={s.iLabel}>Payment method</span>
//               <span style={s.iValue}>{order.paymentMethod}</span>
//             </div>
//             <div style={s.infoItem}>
//               <span style={s.iLabel}>Payment status</span>
//               <span style={{ ...s.iValue, color: order.paymentStatus === "Completed" ? "#10B981" : "#D97706" }}>
//                 {order.paymentStatus}
//               </span>
//             </div>
//             <div style={s.infoItem}>
//               <span style={s.iLabel}>Total</span>
//               <span style={{ ...s.iValue, color: "#F5B800", fontSize: "16px" }}>₹{total.toLocaleString()}</span>
//             </div>
//             <div style={s.infoItem}>
//               <span style={s.iLabel}>Quantity</span>
//               <span style={s.iValue}>{quantity ?? "—"}</span>
//             </div>
//             {deliveryAddress?.addressLine1 && (
//               <div style={{ ...s.infoItem, gridColumn: "1 / -1" }}>
//                 <span style={s.iLabel}>Delivery address</span>
//                 <span style={s.iValue}>
//                   {deliveryAddress.fullName} · {deliveryAddress.addressLine1}, {deliveryAddress.city},{" "}
//                   {deliveryAddress.state} {deliveryAddress.zipCode} · {deliveryAddress.country}
//                 </span>
//               </div>
//             )}
//           </div>
//         )}

//         {/* === CUSTOMIZATION TAB === */}
//         {/* activeTab === "custom" && (
//           <>
//             {products.length === 0 && (
//               <p style={{ padding: "24px", fontSize: "14px", color: "#94A3B8" }}>No products in this order</p>
//             )}

//             {products.map((product, idx) => {
//               const customization = product?.customization || [];
//               return (
//                 <div
//                   key={product.productId ? `${product.productId}-${idx}` : idx}
//                   style={{
//                     padding: "24px",
//                     borderTop: idx > 0 ? "1px solid #E2E8F0" : "none",
//                   }}
//                 >
//                   <p style={{ fontWeight: 600, fontSize: "13px", color: "#0F172A", marginBottom: "4px" }}>
//                     {product.productName}
//                   </p>
//                   <p
//                     style={{
//                       fontSize: "11px",
//                       fontWeight: 600,
//                       color: "#94A3B8",
//                       textTransform: "uppercase",
//                       letterSpacing: ".5px",
//                       marginBottom: "12px",
//                     }}
//                   >
//                     Customization fields
//                   </p>

//                   {customization.length === 0 ? (
//                     <p style={{ fontSize: "14px", color: "#94A3B8" }}>No customization data</p>
//                   ) : (
//                     <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)", background: "#FFF" }}>
//                       <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
//                         <thead>
//                           <tr>
//                             <th style={{ textAlign: "left", padding: "14px 20px", borderBottom: "1px solid #E2E8F0", background: "#F8FAFC", color: "#64748B", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Zone</th>
//                             <th style={{ textAlign: "left", padding: "14px 20px", borderBottom: "1px solid #E2E8F0", background: "#F8FAFC", color: "#64748B", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Field Name</th>
//                             <th style={{ textAlign: "right", padding: "14px 20px", borderBottom: "1px solid #E2E8F0", background: "#F8FAFC", color: "#64748B", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Value</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {customization.map((c, i) => {
//                             const isImg = c.value?.startsWith("http") && /\.(png|jpg|jpeg|webp|gif)/i.test(c.value);
//                             const isColor = /^#[0-9a-fA-F]{3,6}$/.test(c.value || "");
                            
//                             // Format camelCase and _1 to human readable
//                             const formattedField = (c.fieldName || "")
//                               .replace(/([A-Z])/g, ' $1')
//                               .replace(/_(\d+)/g, ' $1')
//                               .replace(/^./, str => str.toUpperCase());
                              
//                             const formattedZone = (c.zoneKey || "").charAt(0).toUpperCase() + (c.zoneKey || "").slice(1);

//                             return (
//                               <tr key={i} style={{ borderBottom: i < customization.length - 1 ? "1px solid #F1F5F9" : "none", transition: "background-color 0.2s" }}>
//                                 <td style={{ padding: "14px 20px", color: "#94A3B8", fontWeight: 500 }}>
//                                   <span style={{ background: "#F1F5F9", padding: "4px 8px", borderRadius: "6px", fontSize: "12px" }}>
//                                     {formattedZone}
//                                   </span>
//                                 </td>
//                                 <td style={{ padding: "14px 20px", color: "#334155", fontWeight: 500 }}>{formattedField}</td>
//                                 <td style={{ padding: "14px 20px", fontWeight: 600, color: "#0F172A", textAlign: "right" }}>
//                                   {isImg ? (
//                                     <img src={c.value} style={{ ...s.thumb, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} alt={c.fieldName} />
//                                   ) : isColor ? (
//                                     <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", justifyContent: "flex-end", width: "100%" }}>
//                                       <span
//                                         style={{
//                                           display: "inline-block",
//                                           width: "20px",
//                                           height: "20px",
//                                           borderRadius: "50%",
//                                           background: c.value,
//                                           border: "2px solid #FFF",
//                                           boxShadow: "0 0 0 1px #E2E8F0, 0 2px 4px rgba(0,0,0,0.1)"
//                                         }}
//                                       />
//                                       <span style={{ fontFamily: "monospace", fontSize: "13px", color: "#475569" }}>{c.value.toUpperCase()}</span>
//                                     </span>
//                                   ) : (
//                                     c.value
//                                   )}
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </>
//         ) */}
//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { IoClose, IoDownloadOutline, IoEyeOutline } from "react-icons/io5";

const STATUS_TYPE = {
  Completed: { label: "Completed", color: "#10B981", bg: "#D1FAE5" },
  Processing: { label: "Processing", color: "#3B82F6", bg: "#DBEAFE" },
  Pending: { label: "Pending", color: "#D97706", bg: "#FEF3C7" },
  Shipped: { label: "Shipped", color: "#0EA5E9", bg: "#E0F2FE" },
  Cancelled: { label: "Cancelled", color: "#EF4444", bg: "#FEE2E2" },
};

const GOOGLE_FONTS = {
  brush: { family: "'Permanent Marker'", css: "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" },
  sport: { family: "'Anton'", css: "https://fonts.googleapis.com/css2?family=Anton&display=swap" },
  bold: { family: "'Archivo Black'", css: "https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" },
  serif: { family: "'Playfair Display'", css: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" },
  script: { family: "'Dancing Script'", css: "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" },
  condensed: { family: "'Oswald'", css: "https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap" },
};

const FONT_MAP = {
  brush: `${GOOGLE_FONTS.brush.family}, cursive`,
  sport: `${GOOGLE_FONTS.sport.family}, Impact, sans-serif`,
  bold: `${GOOGLE_FONTS.bold.family}, Arial Black, sans-serif`,
  serif: `${GOOGLE_FONTS.serif.family}, Georgia, serif`,
  script: `${GOOGLE_FONTS.script.family}, cursive`,
  condensed: `${GOOGLE_FONTS.condensed.family}, 'Arial Narrow', sans-serif`,
  default: "Arial, sans-serif",
};

const injectedFontStylesheets = new Set();
function injectFontStylesheet(url) {
  if (typeof document === "undefined" || injectedFontStylesheets.has(url)) return;
  if (document.querySelector(`link[href="${url}"]`)) {
    injectedFontStylesheets.add(url);
    return;
  }
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
  injectedFontStylesheets.add(url);
}


async function ensureFontLoaded(fontKey, fontSize) {
  const entry = GOOGLE_FONTS[fontKey];
  if (!entry) return; // "default" — plain Arial, nothing to load
  injectFontStylesheet(entry.css);
  const fontSpec = `bold ${Math.max(10, Math.round(fontSize))}px ${entry.family}`;
  try {
    if (typeof document !== "undefined" && document.fonts && document.fonts.load) {
      await document.fonts.load(fontSpec);
      await document.fonts.ready;
    }
  } catch (_) {
    // offline / blocked font request — let canvas fall back quietly
  }
}

// ---------------------------------------------------------------------------
// Cotton Tee Transformable Layer sizing & positioning.
// Exactly matches CottonDesignStage & CottonTransformableLayer in JersyCustomizer.jsx:
// - The customer places layers inside an A4 box: left: 25%, top: 15%, width: 50%, height: 70%
// - transform.x and transform.y are 0-100% percentages INSIDE this A4 box
// - Sized by sizePct (50% for design, 24% for logo) of the A4 box with object-fit: contain
// ---------------------------------------------------------------------------
const DEFAULT_SIZE_PCT = {
  design: 50, // 50% of A4 box
  logo: 24,   // 24% of A4 box
};

// "boxer-knit" -> "Boxer Knit", "script" -> "Script"
function toTitleCase(raw) {
  if (!raw) return raw;
  return raw
    .replace(/[-_]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

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

// Safely parse a transform JSON string like:
// '{"x":58.3,"y":24.45,"scale":0.6,"rotation":0}'
function parseTransform(raw) {
  if (!raw) return null;
  if (typeof raw === "object") return raw; // already parsed
  try {
    const t = JSON.parse(raw);
    if (typeof t.x === "number" && typeof t.y === "number") return t;
  } catch (_) {}
  return null;
}

// Draw a single freeform layer (design/logo) positioned by % x/y (center),
// sized by scale relative to the A4 anchor box, rotated in degrees.
async function drawTransformLayer(ctx, W, H, src, transform, sizePct = 50) {
  if (!src || !transform) return;
  const img = await loadImage(src);

  const scale = typeof transform.scale === "number" ? transform.scale : 1;
  const rotationDeg = typeof transform.rotation === "number" ? transform.rotation : 0;
  const rotationRad = (rotationDeg * Math.PI) / 180;

  // In the customer-facing customizer, the A4 print area horizontally
  // spans the full width of the garment (0% to 100% of W).
  // transform.x is therefore directly the horizontal percentage across the shirt.
  const cx = (transform.x / 100) * W;

  // Vertically, the printable area runs from below the collar (~7% of H)
  // to above the bottom hem (~93% of H), spanning ~86% of the shirt height.
  const a4Y = 0.07 * H;
  const a4H = 0.86 * H;
  const cy = a4Y + (transform.y / 100) * a4H;

  // Bounding box: sizePct is relative to garment width W and printable height a4H
  const boxW = W * (sizePct / 100) * scale;
  const boxH = a4H * (sizePct / 100) * scale;

  // object-fit: contain inside (boxW, boxH)
  const fitRatio = Math.min(boxW / img.width, boxH / img.height);
  const dw = img.width * fitRatio;
  const dh = img.height * fitRatio;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotationRad);
  ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
  ctx.restore();
}

// Draw text bowed along an arc (the classic "curved jersey name" look),
// used when a customer picks nameStyle === "curved" in the editor.
//
// IMPORTANT: the radius is derived from a FIXED total sweep angle, not from
// the print zone's width. Print zones (e.g. playerName at w:70%) are much
// wider than the text itself, so a zone-width-based radius produced a bow
// only a few pixels tall — technically curved, but visually flat once
// scaled down for display. Fixing the sweep angle keeps the curve looking
// like a consistent, clearly-visible "smile" no matter how long the name is.
function drawCurvedText(ctx, text, zx, zy, zw, zh, color, fontFamily) {
  const fontSize = Math.max(1, Math.round(zh * 0.62));
  ctx.font = `bold ${fontSize}px ${fontFamily}`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = color || "#FFFFFF";
  ctx.strokeStyle = "rgba(0,0,0,0.4)";
  ctx.lineWidth = Math.max(1, fontSize * 0.06);

  const centerX = zx + zw / 2;
  const centerY = zy + zh / 2;

  const textWidth = ctx.measureText(text).width;

  // Total angle the whole string sweeps across the arc, in degrees.
  // Higher = more pronounced curve. 42 gives a clear, jersey-style bow
  // without letters overlapping on typical names (2-20 characters).
  const ARC_SWEEP_DEGREES = 42;
  const totalAngle = (ARC_SWEEP_DEGREES * Math.PI) / 180;
  const radius = textWidth / totalAngle;

  let angle = -totalAngle / 2;

  ctx.save();
  // Shift the arc's pivot down so the curve bows upward into the zone
  // (the typical "smile" shape used on jersey names).
  ctx.translate(centerX, centerY + radius * 0.42);

  for (const char of text) {
    const charWidth = ctx.measureText(char).width;
    const charAngle = charWidth / radius;
    ctx.save();
    ctx.rotate(angle + charAngle / 2);
    ctx.translate(0, -radius);
    ctx.strokeText(char, 0, 0);
    ctx.fillText(char, 0, 0);
    ctx.restore();
    angle += charAngle;
  }

  ctx.restore();
}

async function composeCanvas(canvas, baseImgSrc, patternSrc, overlays, transformLayers = [], isCurrent = () => true, garmentColor = null) {
  if (!canvas || !baseImgSrc) return false;
  const ctx = canvas.getContext("2d");
  try {
    const base = await loadImage(baseImgSrc);
    if (!isCurrent()) return false; // a newer draw call has superseded this one

    const W = base.naturalWidth || base.width || 600;
    const H = base.naturalHeight || base.height || 800;
    canvas.width = W;
    canvas.height = H;

    // 1. Base product image — clean, no colour tint
    ctx.drawImage(base, 0, 0, W, H);

    // 2. Recolour the garment fabric to the customer's chosen jersey
    // colour. "color" blend mode replaces hue+saturation while keeping
    // the backdrop's existing shading/texture/folds intact — this is
    // what makes it read as a naturally recoloured photo instead of a
    // flat, texture-less tint.
    if (garmentColor) {
      ctx.save();
      ctx.globalCompositeOperation = "color";
      ctx.fillStyle = garmentColor;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    // 3. Pattern overlay (multiply)
    if (patternSrc) {
      try {
        const pat = await loadImage(patternSrc);
        if (!isCurrent()) return false;
        ctx.globalCompositeOperation = "multiply";
        ctx.drawImage(pat, 0, 0, W, H);
        ctx.globalCompositeOperation = "source-over";
      } catch (_) {
        ctx.globalCompositeOperation = "source-over";
      }
    }

    // 4. Freeform transform-based layers (frontDesign, backDesign, logo)
    //    These use %x/%y + scale + rotation instead of a fixed print zone.
    //    Drawn in array order, so put backgrounds/designs before logos.
    for (const layer of transformLayers) {
      if (!isCurrent()) return false;
      if (!layer || !layer.src || !layer.transform) continue;
      try {
        await drawTransformLayer(ctx, W, H, layer.src, layer.transform, layer.sizePct ?? DEFAULT_SIZE_PCT.design);
        if (!isCurrent()) return false;
      } catch (_) {
        // skip a broken layer rather than failing the whole canvas
      }
    }

    // 5. Zone-based overlays (logo image / text) inside fixed print zones
    for (const ov of overlays) {
      if (!isCurrent()) return false;
      if (!ov || !ov.zone) continue;
      const { zone } = ov;
      const zx = (zone.x / 100) * W;
      const zy = (zone.y / 100) * H;
      const zw = (zone.w / 100) * W;
      const zh = (zone.h / 100) * H;

      if (ov.type === "image" && ov.src) {
        try {
          const img = await loadImage(ov.src);
          if (!isCurrent()) return false;
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

        // Wait for the actual webfont to be downloaded before drawing —
        // otherwise this silently renders in the fallback font.
        await ensureFontLoaded(ov.font, fontSize);
        if (!isCurrent()) return false; // superseded while we were waiting on the font

        if (ov.style === "curved") {
          drawCurvedText(ctx, ov.text, zx, zy, zw, zh, ov.color, fontFamily);
        } else {
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
    }
    return true;
  } catch (_) {
    if (!isCurrent()) return false;
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
    return false;
  }
}

function CanvasView({ label, baseImg, patternImg, overlays, transformLayers, garmentColor, orderId }) {
  const ref = useRef(null);
  const runIdRef = useRef(0);
  const [status, setStatus] = useState("loading");

  const handleDownloadCanvas = () => {
    if (!ref.current) return;
    try {
      const link = document.createElement("a");
      link.download = `${orderId || "order"}_${label?.toLowerCase() || "preview"}_customized.png`;
      link.href = ref.current.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download canvas:", err);
    }
  };

  useEffect(() => {
    if (!ref.current) return;
    if (!baseImg) {
      setStatus("empty");
      return;
    }
    setStatus("loading");

    // Bump the run token so any older, still in-flight composeCanvas
    // call (waiting on an image or font load) recognizes it's stale and
    // stops drawing instead of racing with this newer call — that race
    // was producing the duplicated/ghosted text.
    const myRunId = ++runIdRef.current;
    const isCurrent = () => runIdRef.current === myRunId;

    composeCanvas(ref.current, baseImg, patternImg, overlays || [], transformLayers || [], isCurrent, garmentColor)
      .then((completed) => {
        if (isCurrent()) setStatus(completed ? "done" : "error");
      })
      .catch(() => {
        if (isCurrent()) setStatus("error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseImg, patternImg, overlays, transformLayers, garmentColor]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#94A3B8",
            textTransform: "uppercase",
            letterSpacing: ".5px",
            margin: 0,
          }}
        >
          {label}
        </p>
        {status === "done" && (
          <button
            type="button"
            onClick={handleDownloadCanvas}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "3px 8px",
              fontSize: "11px",
              fontWeight: 600,
              color: "#2563EB",
              background: "rgba(37, 99, 235, 0.08)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            title={`Download ${label} customized preview mockup`}
          >
            <IoDownloadOutline size={13} /> Download {label}
          </button>
        )}
      </div>
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

async function handleDownloadAsset(url, filename) {
  if (!url) return;
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error("Network response not ok: " + res.status);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename || url.split("/").pop()?.split("?")[0] || "download.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  } catch (err) {
    console.warn("Direct blob download failed, opening in new tab:", err);
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.download = filename || "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

async function downloadAllAssets(assets, orderId) {
  if (!assets || assets.length === 0) return;
  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i];
    const ext = asset.url.split(".").pop()?.split("?")[0]?.toLowerCase() || "png";
    const filename = `${orderId || "order"}_${asset.key || `asset_${i + 1}`}.${ext}`;
    await handleDownloadAsset(asset.url, filename);
    await new Promise((r) => setTimeout(r, 400));
  }
}

// Build everything needed to render ONE product's preview + chips,
// derived purely from that product's own data (not the order/other products).
function buildProductView(product) {
  const customization = product?.customization || [];
  const printZones = product?.printZones || {};
  const frontZones = printZones?.front || [];

  const getCV = (field) => customization.find((c) => c.fieldName === field)?.value;

  const fabric = getCV("fabric");

  const jerseyColor =
    product.color ||
    getCV("jerseyColor") ||
    customization.find(
      (c) =>
        c.fieldName?.toLowerCase().includes("color") ||
        /^#[0-9a-fA-F]{3,6}$/.test(c.value || ""),
    )?.value;

  const patternFront = getCV("patternFront");
  const patternBack = getCV("patternBack");
  const clubLogo = getCV("logo");
  const playerName = getCV("playerName");
  const playerNumber = getCV("playerNumber");
  const nameColor = getCV("nameColor") || "#222222";
  const nameFont = getCV("nameFont") || "default";
  const nameStyle = getCV("nameStyle") || "straight"; // "straight" | "curved"
  const numberColor = getCV("numberColor") || "#222222";
  const numberFont = getCV("numberFont") || "sport";

  const singleSize =
    getCV("size") ||
    customization.find((c) => c.fieldName?.toLowerCase().includes("size") && !c.fieldName.includes("_"))?.value;
  const singleSleeve =
    getCV("sleeve") ||
    customization.find((c) => c.fieldName?.toLowerCase().includes("sleeve") && !c.fieldName.includes("_"))?.value;

  // -------------------------------------------------------------------
  // NEW: freeform placement data (uploaded design + logo, positioned by
  // the customer via drag/scale/rotate — not tied to a fixed print zone)
  // -------------------------------------------------------------------
  const frontDesign = getCV("frontDesign");
  const backDesign = getCV("backDesign");
  const frontDesignTransform = parseTransform(getCV("frontDesignTransform"));
  const backDesignTransform = parseTransform(getCV("backDesignTransform"));
  const logoTransform = parseTransform(getCV("logoTransform"));

  const frontTransformLayers = [
    frontDesign &&
      frontDesignTransform && {
        src: frontDesign,
        transform: frontDesignTransform,
        sizePct: DEFAULT_SIZE_PCT.design,
      },
    clubLogo &&
      logoTransform && {
        src: clubLogo,
        transform: logoTransform,
        sizePct: DEFAULT_SIZE_PCT.logo,
      },
  ].filter(Boolean);

  const backTransformLayers = [
    backDesign &&
      backDesignTransform && {
        src: backDesign,
        transform: backDesignTransform,
        sizePct: DEFAULT_SIZE_PCT.design,
      },
  ].filter(Boolean);

  const rosterItems = [];
  customization.forEach((c) => {
    const match = c.fieldName?.match(/^player(Name|Number|Size|Sleeve|Color)_(\d+)$/i);
    if (match) {
      const type = match[1].toLowerCase();
      const idx = parseInt(match[2], 10);
      if (!rosterItems[idx]) rosterItems[idx] = {};
      rosterItems[idx][type] = c.value;
    }
  });
let validRoster = rosterItems.filter(Boolean);

if (product.sizes && product.sizes.length > 0) {
  const expandedRoster = [];
  product.sizes.forEach((s) => {
    for (let i = 0; i < s.quantity; i++) {
      expandedRoster.push({ size: s.size, sleeve: "Half", name: "-", number: "-", color: "-" });
    }
  });
  validRoster.forEach((vr, i) => {
    if (expandedRoster[i]) {
      expandedRoster[i] = { ...expandedRoster[i], ...vr };
    }
  });
  validRoster = expandedRoster;
} else if (validRoster.length > 0 && product.quantity > validRoster.length) {
  // Only top up to `quantity` when at least one real player entry exists —
  // e.g. customer filled in 3 of 5 jerseys. If there's no roster data at
  // all (plain quantity-only products like Custom Cotton Tees), don't
  // fabricate blank rows.
  const padCount = product.quantity - validRoster.length;
  for (let i = 0; i < padCount; i++) {
    validRoster.push({ name: "-", number: "-", size: "-", sleeve: "-", color: "-" });
  }
}

  const zoneById = (id) => frontZones.find((z) => z.id === id);

  // NOTE: clubLogo is now handled above via frontTransformLayers when a
  // logoTransform is present. This zone-based overlay is kept as a
  // fallback ONLY for logos that have no transform data (older orders /
  // products still using fixed print zones instead of freeform placement).
  const frontOverlays = [
    clubLogo &&
      !logoTransform && { type: "image", zone: zoneById("clubLogo"), src: clubLogo },
    playerName && {
      type: "text",
      zone: zoneById("playerName"),
      text: playerName,
      color: nameColor,
      font: nameFont,
      style: nameStyle,
    },
    playerNumber && {
      type: "text",
      zone: zoneById("number"),
      text: playerNumber,
      color: numberColor,
      font: numberFont,
    },
  ].filter(Boolean);

const isCottonTeesOrder = !!(getCV("frontDesign") || getCV("backDesign"));

let productSizes = [];
if (Array.isArray(product.sizes) && product.sizes.length > 0) {
  productSizes = product.sizes.filter((s) => s && (Number(s.quantity) > 0 || typeof s.quantity === "number"));
} else if (Array.isArray(product.selectedSizes) && product.selectedSizes.length > 0) {
  productSizes = product.selectedSizes.filter((s) => s && (Number(s.quantity) > 0 || typeof s.quantity === "number"));
} else if (Array.isArray(product.size) && product.size.length > 0) {
  productSizes = product.size.filter((s) => s && (Number(s.quantity) > 0 || typeof s.quantity === "number"));
} else if (validRoster.length > 0) {
  const sizeCounts = {};
  validRoster.forEach((r) => {
    if (r.size && r.size !== "-" && r.size !== "—") {
      sizeCounts[r.size] = (sizeCounts[r.size] || 0) + 1;
    }
  });
  productSizes = Object.entries(sizeCounts).map(([size, quantity]) => ({ size, quantity }));
}

if (productSizes.length === 0 && singleSize && singleSize !== "-" && singleSize !== "—") {
  productSizes = [{ size: singleSize, quantity: product.quantity || 1 }];
}

const sizeChips =
  productSizes.length > 0
    ? productSizes.map((s) => ({
        kind: "text",
        value: `${s.size} - ${s.quantity}`,
        color: "#2563EB",
        label: `Size ${s.size}`,
      }))
    : isCottonTeesOrder
    ? [{ kind: "badge", value: "Not captured", label: "Size" }]
    : [];

const hasRealRoster = validRoster.some(
  (r) => (r.name && r.name !== "-" && r.name !== "—") || (r.number && r.number !== "-" && r.number !== "—")
);

const layerChips = [
  jerseyColor && { kind: "color", value: jerseyColor, label: "Jersey colour" },
  fabric && { kind: "badge", value: toTitleCase(fabric), label: "Fabric" },
  patternFront && { kind: "img", value: patternFront, label: "Pattern" },
  frontDesign && { kind: "img", value: frontDesign, label: "Design" },
  clubLogo && { kind: "img", value: clubLogo, label: "Logo" },
  playerName && {
    kind: "text",
    value: playerName,
    color: nameColor,
    label: nameStyle === "curved" ? "Player name (curved)" : "Player name",
  },
  playerName && nameFont && nameFont !== "default" && { kind: "badge", value: toTitleCase(nameFont), label: "Name font" },
  playerNumber && { kind: "text", value: playerNumber, color: numberColor, label: "Number" },
  ...sizeChips,
  singleSleeve && { kind: "text", value: singleSleeve, color: "#3B82F6", label: "Sleeve" },
].filter(Boolean);

  const assets = [];
  if (frontDesign) {
    assets.push({
      key: "front_design",
      name: "Front Design (A4)",
      typeLabel: "Print Graphic",
      url: frontDesign,
    });
  }
  if (backDesign) {
    assets.push({
      key: "back_design",
      name: "Back Design (A4)",
      typeLabel: "Print Graphic",
      url: backDesign,
    });
  }
  if (clubLogo) {
    assets.push({
      key: "logo",
      name: "Chest Logo",
      typeLabel: "Emblem / Logo",
      url: clubLogo,
    });
  }
  const sponsorLogo = getCV("sponsorLogo");
  if (sponsorLogo) {
    assets.push({
      key: "sponsor_logo",
      name: "Sponsor Logo",
      typeLabel: "Sponsor Graphic",
      url: sponsorLogo,
    });
  }
  customization.forEach((c) => {
    if (
      c.value &&
      typeof c.value === "string" &&
      (c.value.startsWith("http://") || c.value.startsWith("https://") || c.value.startsWith("data:image/")) &&
      !assets.some((a) => a.url === c.value) &&
      c.fieldName?.toLowerCase() !== "patternfront" &&
      c.fieldName?.toLowerCase() !== "patternback"
    ) {
      assets.push({
        key: c.fieldName || "asset",
        name: toTitleCase(c.fieldName || "Custom Asset"),
        typeLabel: "Customer Upload",
        url: c.value,
      });
    }
  });

  return {
    customization,
    // base image: pattern if present, else the product's own plain images
    frontBaseImg: patternFront || product.frontImage || product.viewImages?.front,
    backBaseImg: patternBack || product.backImage || product.viewImages?.back,
    jerseyColor,
    frontOverlays,
    frontTransformLayers,
    backTransformLayers,
    layerChips,
    assets,
    sizes: productSizes,
    hasRealRoster,
    hasCustomization: customization.length > 0,
    roster: validRoster,
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
    // { key: "custom", label: "Customization" },
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
                    <CanvasView
                      label="Front"
                      baseImg={pv.frontBaseImg}
                      overlays={pv.frontOverlays}
                      transformLayers={pv.frontTransformLayers}
                      garmentColor={pv.jerseyColor}
                      orderId={order.orderId || order._id}
                    />
                    <CanvasView
                      label="Back"
                      baseImg={pv.backBaseImg}
                      overlays={[]}
                      transformLayers={pv.backTransformLayers}
                      garmentColor={pv.jerseyColor}
                      orderId={order.orderId || order._id}
                    />
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
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                              <div
                                style={{
                                  width: "28px",
                                  height: "28px",
                                  borderRadius: "6px",
                                  background: l.value,
                                  border: "1px solid #E2E8F0",
                                }}
                              />
                              <span style={{ fontSize: "10px", fontWeight: 700, color: "#475569" }}>{l.value.toUpperCase()}</span>
                            </div>
                          )}
                          {l.kind === "img" && (
                            <img
                              src={l.value}
                              style={{ width: "28px", height: "28px", objectFit: "cover", borderRadius: "6px", border: "1px solid #E2E8F0" }}
                              alt={l.label}
                            />
                          )}
                          {l.kind === "badge" && (
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: 700,
                                padding: "3px 10px",
                                borderRadius: "5px",
                                background: "#F1F5F9",
                                color: "#475569",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {l.value}
                            </span>
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

                  {/* Customer Uploaded Assets (Print Graphics, Logos) */}
                  {pv.assets && pv.assets.length > 0 && (
                    <div style={{ padding: "0 24px 20px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "12px",
                          paddingBottom: "8px",
                          borderBottom: "1px solid #F1F5F9",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: "11px",
                              color: "#94A3B8",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: ".5px",
                              margin: 0,
                            }}
                          >
                            Customer Uploaded Assets ({pv.assets.length})
                          </p>
                          <span style={{ fontSize: "12px", color: "#64748B" }}>
                            Original high-resolution files uploaded by customer for printing
                          </span>
                        </div>
                        {pv.assets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => downloadAllAssets(pv.assets, order.orderId || order._id)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "5px 12px",
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "#0F172A",
                              background: "#F1F5F9",
                              border: "1px solid #E2E8F0",
                              borderRadius: "6px",
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#E2E8F0")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "#F1F5F9")}
                          >
                            <IoDownloadOutline size={15} /> Download All ({pv.assets.length})
                          </button>
                        )}
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                          gap: "12px",
                        }}
                      >
                        {pv.assets.map((asset, aIdx) => (
                          <div
                            key={aIdx}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              background: "#F8FAFC",
                              border: "1px solid #E2E8F0",
                              borderRadius: "10px",
                              overflow: "hidden",
                              padding: "10px",
                              gap: "10px",
                            }}
                          >
                            <div
                              style={{
                                position: "relative",
                                width: "100%",
                                height: "120px",
                                background: "#FFFFFF",
                                borderRadius: "6px",
                                border: "1px solid #E2E8F0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src={asset.url}
                                alt={asset.name}
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                  objectFit: "contain",
                                }}
                              />
                              <span
                                style={{
                                  position: "absolute",
                                  top: "6px",
                                  left: "6px",
                                  fontSize: "10px",
                                  fontWeight: 600,
                                  background: "rgba(15, 23, 42, 0.75)",
                                  color: "#FFFFFF",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  backdropFilter: "blur(2px)",
                                }}
                              >
                                {asset.typeLabel}
                              </span>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  color: "#0F172A",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                                title={asset.name}
                              >
                                {asset.name}
                              </span>
                              <span
                                style={{
                                  fontSize: "11px",
                                  color: "#94A3B8",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                                title={asset.url}
                              >
                                {asset.url.split("/").pop()?.split("?")[0]}
                              </span>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginTop: "auto" }}>
                              <a
                                href={asset.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "4px",
                                  padding: "6px 8px",
                                  fontSize: "11px",
                                  fontWeight: 600,
                                  color: "#475569",
                                  background: "#FFFFFF",
                                  border: "1px solid #CBD5E1",
                                  borderRadius: "6px",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                }}
                                title="Open full size image in new tab"
                              >
                                <IoEyeOutline size={14} /> View
                              </a>
                              <button
                                type="button"
                                onClick={() => {
                                  const ext = asset.url.split(".").pop()?.split("?")[0]?.toLowerCase() || "png";
                                  handleDownloadAsset(asset.url, `${order.orderId || order._id || "order"}_${asset.key}.${ext}`);
                                }}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "4px",
                                  padding: "6px 8px",
                                  fontSize: "11px",
                                  fontWeight: 600,
                                  color: "#FFFFFF",
                                  background: "#2563EB",
                                  border: "none",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                }}
                                title="Download high-resolution image file"
                              >
                                <IoDownloadOutline size={14} /> Download
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sizes & Quantities Breakdown */}
                  {pv.sizes && pv.sizes.length > 0 && (
                    <div style={{ padding: "0 24px 20px" }}>
                      <div
                        style={{
                          marginBottom: "12px",
                          paddingBottom: "8px",
                          borderBottom: "1px solid #F1F5F9",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "11px",
                            color: "#94A3B8",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: ".5px",
                            margin: 0,
                          }}
                        >
                          Size & Quantity Breakdown ({pv.sizes.reduce((sum, s) => sum + (Number(s.quantity) || 0), 0)} Total)
                        </p>
                        <span style={{ fontSize: "12px", color: "#64748B" }}>
                          Quantity ordered per size
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                        {pv.sizes.map((sItem, sIdx) => (
                          <div
                            key={sIdx}
                            style={{
                              background: "#EFF6FF",
                              border: "1px solid #BFDBFE",
                              borderRadius: "8px",
                              padding: "6px 14px",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <span style={{ fontSize: "13px", fontWeight: 700, color: "#1D4ED8" }}>
                              {sItem.size}
                            </span>
                            <span style={{ fontSize: "11px", color: "#64748B" }}>:</span>
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#0F172A",
                                background: "#FFFFFF",
                                padding: "2px 8px",
                                borderRadius: "4px",
                                border: "1px solid #DBEAFE",
                              }}
                            >
                              {sItem.quantity} pcs
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {pv.hasRealRoster && pv.roster && pv.roster.length > 0 && (
                    <div style={{ padding: "0 24px 20px" }}>
                      <p style={{
                        fontSize: "11px", color: "#94A3B8", fontWeight: 600,
                        textTransform: "uppercase", letterSpacing: ".5px", marginBottom: "12px"
                      }}>
                        Player Variations (Roster)
                      </p>
                      <div style={{ overflowX: 'auto', border: "1px solid #E2E8F0", borderRadius: "8px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", minWidth: "400px" }}>
                          <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                            <tr>
                              <th style={{ padding: "10px 12px", textAlign: "left", color: "#64748B", fontWeight: 600 }}>#</th>
                              <th style={{ padding: "10px 12px", textAlign: "left", color: "#64748B", fontWeight: 600 }}>Name</th>
                              <th style={{ padding: "10px 12px", textAlign: "left", color: "#64748B", fontWeight: 600 }}>Number</th>
                              <th style={{ padding: "10px 12px", textAlign: "left", color: "#64748B", fontWeight: 600 }}>Size</th>
                              <th style={{ padding: "10px 12px", textAlign: "left", color: "#64748B", fontWeight: 600 }}>Sleeve</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pv.roster.map((r, i) => (
                              <tr key={i} style={{ borderBottom: i < pv.roster.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                                <td style={{ padding: "10px 12px", color: "#94A3B8" }}>{i + 1}</td>
                                <td style={{ padding: "10px 12px", color: "#0F172A", fontWeight: 500 }}>{r.name || "—"}</td>
                                <td style={{ padding: "10px 12px", color: "#0F172A", fontWeight: 500 }}>{r.number || "—"}</td>
                                <td style={{ padding: "10px 12px" }}><span style={{ background: "#EFF6FF", color: "#3B82F6", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>{r.size || "—"}</span></td>
                                <td style={{ padding: "10px 12px" }}><span style={{ background: "#F1F5F9", color: "#64748B", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>{r.sleeve || "—"}</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
      </div>
    </div>
  );
}