// 'use client';

// import { useState, useCallback, useEffect, useRef } from 'react';
// import {
//   Upload, ChevronDown, Save, Check, Trash2,
//   Type, Shield, Paintbrush, ShoppingBag,
//   RotateCcw, X, Star, Maximize2,
// } from 'lucide-react';
// import GLBViewer from '../common/GLBViewer';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '@/features/cart/cartSlice';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// // ─────────────────────────────────────────────────────────────────────────────
// // STATIC DATA
// // ─────────────────────────────────────────────────────────────────────────────
// const JERSEY_COLORS = [
//   { name: 'Obsidian',   code: '#111111' },
//   { name: 'Crimson',    code: '#DC2626' },
//   { name: 'Deep Navy',  code: '#1D3557' },
//   { name: 'Royal Blue', code: '#1E40AF' },
//   { name: 'Emerald',    code: '#059669' },
//   { name: 'Gold',       code: '#D97706' },
//   { name: 'Pure White', code: '#FFFFFF' },
//   { name: 'Black',      code: '#000000' },
//   { name: 'Purple',     code: '#7C3AED' },
//   { name: 'Orange',     code: '#EA580C' },
//   { name: 'Teal',       code: '#0D9488' },
//   { name: 'Maroon',     code: '#9F1239' },
//   { name: 'Sky Blue',   code: '#0EA5E9' },
//   { name: 'Lime',       code: '#65A30D' },
//   { name: 'Pink',       code: '#EC4899' },
//   { name: 'Slate',      code: '#475569' },
// ];

// const SLEEVE_COLORS = [
//   { name: 'Obsidian',   code: '#111111' },
//   { name: 'Crimson',    code: '#DC2626' },
//   { name: 'Deep Navy',  code: '#1D3557' },
//   { name: 'Pure White', code: '#FFFFFF' },
//   { name: 'Royal Blue', code: '#1E40AF' },
//   { name: 'Gold',       code: '#D97706' },
//   { name: 'Emerald',    code: '#059669' },
//   { name: 'Black',      code: '#000000' },
// ];

// const TEXT_COLORS = [
//   '#FFFFFF','#000000','#E8820C','#DC2626',
//   '#1D3557','#F59E0B','#FFFF00','#00FF88',
//   '#7C3AED','#EC4899','#0EA5E9','#059669',
//   '#FF6B35','#C0C0C0','#FFD700','#FF4500',
// ];

// const FONT_STYLES = [
//   { id: 'collegiate', label: 'COLLEGIATE', fontFamily: '"Russo One", sans-serif',       fontWeight: '400', fontStyle: 'normal' },
//   { id: 'block',      label: 'BLOCK',      fontFamily: '"Bebas Neue", sans-serif',       fontWeight: '400', fontStyle: 'normal' },
//   { id: 'varsity',    label: 'VARSITY',    fontFamily: '"Teko", sans-serif',             fontWeight: '700', fontStyle: 'normal' },
//   { id: 'sport',      label: 'SPORT',      fontFamily: '"Oswald", sans-serif',           fontWeight: '700', fontStyle: 'normal' },
//   { id: 'modern',     label: 'MODERN',     fontFamily: '"Barlow Condensed", sans-serif', fontWeight: '800', fontStyle: 'normal' },
//   { id: 'script',     label: 'Script',     fontFamily: '"Satisfy", sans-serif',          fontWeight: '400', fontStyle: 'normal' },
//   { id: 'stencil',    label: 'STENCIL',    fontFamily: '"Rajdhani", sans-serif',         fontWeight: '700', fontStyle: 'normal' },
//   { id: 'condensed',  label: 'CONDENSED',  fontFamily: '"Saira Condensed", sans-serif',  fontWeight: '800', fontStyle: 'normal' },
//   { id: 'brush',      label: 'Brush',      fontFamily: '"Pacifico", sans-serif',         fontWeight: '400', fontStyle: 'normal' },
// ];

// const COLLAR_TYPES = [
//   { id: 'round',  label: 'Round',  icon: '○' },
//   { id: 'v-neck', label: 'V-Neck', icon: '∨' },
//   { id: 'polo',   label: 'Polo',   icon: '⊓' },
//   { id: 'hood',   label: 'Hood',   icon: '∩' },
// ];

// const FABRIC_TYPES = [
//   { id: 'climatech', label: 'ClimateTech Pro',  desc: 'UV protection & elite moisture management' },
//   { id: 'coolweave', label: 'CoolWeave Lite',   desc: 'Lightweight breathable performance fabric' },
//   { id: 'dryfit',    label: 'DriFit Ultra',     desc: 'Maximum sweat-wicking & comfort' },
//   { id: 'interlock', label: 'Interlock Knit',   desc: 'Durable two-layer knit for heavy use' },
//   { id: 'jacquard',  label: 'Jacquard Weave',   desc: 'Premium textured weave, pattern-defined' },
// ];

// const NUMBER_POSITIONS = [
//   { id: 'back',  label: 'Back Only' },
//   { id: 'front', label: 'Front Only' },
//   { id: 'both',  label: 'Both Sides' },
// ];

// const BADGE_POSITIONS = [
//   { id: 'left',   label: 'Left Chest' },
//   { id: 'center', label: 'Center' },
//   { id: 'right',  label: 'Right Chest' },
// ];

// const TEXT_EFFECTS = [
//   { id: 'none',    label: 'None' },
//   { id: 'outline', label: 'Outline' },
//   { id: 'shadow',  label: 'Shadow' },
//   { id: 'both',    label: 'Outline+Shadow' },
// ];

// const SIZES = ['XS','S','M','L','XL','XXL','3XL','4XL'];

// const MAIN_TABS = [
//   { id: 'style',      label: 'Style',          Icon: Paintbrush },
//   { id: 'logos',      label: 'Logos',          Icon: Shield },
//   { id: 'nameNumber', label: 'Name & Number',  Icon: Type },
//   { id: 'order',      label: 'Order',          Icon: ShoppingBag },
// ];

// // ─────────────────────────────────────────────────────────────────────────────
// // HELPERS
// // ─────────────────────────────────────────────────────────────────────────────
// const isLight = (hex) => {
//   if (!hex) return true;
//   const h = hex.replace('#','');
//   const r = parseInt(h.slice(0,2),16);
//   const g = parseInt(h.slice(2,4),16);
//   const b = parseInt(h.slice(4,6),16);
//   return (r*299 + g*587 + b*114)/1000 > 155;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // PRODUCT IMAGE VIEWER
// // ─────────────────────────────────────────────────────────────────────────────
// const ProductImageViewer = ({ jerseyColor, view, product, children }) => {
//   const productImage = view === 'front'
//     ? product?.mainImage || product?.image || '/images/jerseys/jersey-front.png'
//     : product?.hoverImage || product?.backImage || product?.mainImage || '/images/jerseys/jersey-back.png';

//   return (
//     <div style={{
//       position: 'relative', width: '100%', height: '100%',
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       background: 'linear-gradient(135deg,#EEF2F7,#E2E8F0)',
//     }}>
//       <img
//         src={productImage}
//         alt={`Jersey ${view} view`}
//         style={{ maxWidth:'85%', maxHeight:'85%', objectFit:'contain', filter:'drop-shadow(0 10px 30px rgba(0,0,0,0.22))' }}
//         onError={e => { e.target.src = '/images/jerseys/jersey-front.png'; }}
//       />
//       <div style={{
//         position:'absolute', inset:0,
//         backgroundColor: jerseyColor, opacity:0.35,
//         mixBlendMode:'multiply', pointerEvents:'none', borderRadius:'12px',
//       }}/>
//       {children}
//     </div>
//   );
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // MAIN COMPONENT
// // ─────────────────────────────────────────────────────────────────────────────
// export default function JerseyCustomizer({ product }) {
//   const router   = useRouter();
//   const dispatch = useDispatch();
//   const { user } = useSelector(s => s.auth);

//   // ── UI state ──
//   const [mounted,     setMounted]     = useState(false);
//   const [activeTab,   setActiveTab]   = useState('style');
//   const [view,        setView]        = useState('front');
//   const [viewMode,    setViewMode]    = useState('glb');   // default to 3D
//   const [mobileOpen,  setMobileOpen]  = useState(false);

//   // ── Style ──
//   const [fabric,      setFabric]      = useState('climatech');
//   const [collarType,  setCollarType]  = useState('round');

//   // ── Colors ──
//   const [jerseyColor, setJerseyColor] = useState('#FFFFFF');
//   const [sleeveColor, setSleeveColor] = useState('#111111');
//   const [collarColor, setCollarColor] = useState('#111111');

//   // ── Logos ──
//   const [clubLogo,       setClubLogo]       = useState(null);
//   const [clubLogoPos,    setClubLogoPos]    = useState('left');
//   const [clubLogoSize,   setClubLogoSize]   = useState(52);
//   const [sponsorLogo,    setSponsorLogo]    = useState(null);
//   const [sponsorLogoSize,setSponsorLogoSize]= useState(110);
//   const [sponsorBackLogo,setSponsorBackLogo]= useState(null);

//   // ── Name ──
//   const [showName,        setShowName]        = useState(true);
//   const [nameText,        setNameText]        = useState('PLAYER');
//   const [nameStyleId,     setNameStyleId]     = useState('straight');
//   const [nameFont,        setNameFont]        = useState('collegiate');
//   const [nameColor,       setNameColor]       = useState('#FFFFFF');
//   const [nameSize,        setNameSize]        = useState(22);
//   const [nameVertical,    setNameVertical]    = useState(20);
//   const [nameEffect,      setNameEffect]      = useState('none');
//   const [nameEffectColor, setNameEffectColor] = useState('#000000');
//   const [nameOutlineWidth,setNameOutlineWidth]= useState(1.5);

//   // ── Number ──
//   const [showNumber,        setShowNumber]        = useState(true);
//   const [numberText,        setNumberText]        = useState('10');
//   const [numberFont,        setNumberFont]        = useState('block');
//   const [numberColor,       setNumberColor]       = useState('#F59E0B');
//   const [numberSize,        setNumberSize]        = useState(72);
//   const [numberPosition,    setNumberPosition]    = useState('back');
//   const [numberEffect,      setNumberEffect]      = useState('none');
//   const [numberEffectColor, setNumberEffectColor] = useState('#000000');

//   // ── Team ──
//   const [showTeam,  setShowTeam]  = useState(false);
//   const [teamName,  setTeamName]  = useState('YOUR TEAM');
//   const [teamColor, setTeamColor] = useState('#FFFFFF');
//   const [teamFont,  setTeamFont]  = useState('sport');

//   // ── Order ──
//   const [selectedSize, setSelectedSize] = useState('L');
//   const [quantity,     setQuantity]     = useState(1);
//   const [sport,        setSport]        = useState('cricket');

//   const viewerRef = useRef(null);

//   // ── Accordion ──
//   const [sec, setSec] = useState({
//     fabric:true, collar:false, base:true, sleeveCol:false,
//     collarCol:false, club:true, sponsor:false, sponsorBack:false,
//     name:true, number:false, team:false,
//   });
//   const tog = k => setSec(p => ({ ...p, [k]: !p[k] }));

//   useEffect(() => { setMounted(true); }, []);

//   // ── Save design ──
//   const handleSaveDesign = () => {
//     dispatch(addToCart({
//       productId: product?.id,
//       name:      product?.name,
//       price:     product?.price,
//       sport:     'Cricket',
//       size:      selectedSize,
//       quantity,
//     }));
//     toast.success('Design saved successfully!');
//   };

//   // ── Fullscreen ──
//   const handleFullscreen = () => {
//     const el = viewerRef.current;
//     if (!el) return;
//     document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen();
//   };

//   // ── Upload ──
//   const handleUpload = useCallback(setter => e => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith('image/')) { alert('Please upload an image file'); return; }
//     if (file.size > 8*1024*1024) { alert('Max file size is 8 MB'); return; }
//     const reader = new FileReader();
//     reader.onloadend = () => setter(reader.result);
//     reader.readAsDataURL(file);
//   }, []);

//   // ── Reset ──
//   const reset = () => {
//     setJerseyColor('#FFFFFF'); setSleeveColor('#111111'); setCollarColor('#111111');
//     setCollarType('round'); setFabric('climatech');
//     setClubLogo(null); setSponsorLogo(null); setSponsorBackLogo(null);
//     setClubLogoPos('left'); setClubLogoSize(52); setSponsorLogoSize(110);
//     setNameText('PLAYER'); setNameFont('collegiate'); setNameColor('#FFFFFF');
//     setNameSize(22); setNameVertical(20); setNameEffect('none'); setNameStyleId('straight');
//     setNumberText('10'); setNumberFont('block'); setNumberColor('#F59E0B');
//     setNumberSize(72); setNumberPosition('back'); setNumberEffect('none');
//     setShowTeam(false); setShowName(true); setShowNumber(true);
//     setTeamName('YOUR TEAM'); setTeamColor('#FFFFFF');
//     setSelectedSize('L'); setQuantity(1);
//   };

//   // ─────────────────────────────────────────────────────────────────────────
//   // UI ATOMS
//   // ─────────────────────────────────────────────────────────────────────────
//   const Section = ({ k, title, badge, children }) => {
//     const isOpen = sec[k];
//     return (
//       <div style={{
//         background:'#fff', borderRadius:12, marginBottom:10, overflow:'hidden',
//         border:`1px solid ${isOpen ? 'rgba(0,62,155,0.2)' : '#E8ECF0'}`,
//         boxShadow: isOpen ? '0 2px 14px rgba(0,62,155,0.07)' : 'none',
//       }}>
//         <button onClick={() => tog(k)} style={{
//           width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
//           padding:'13px 16px', border:'none', cursor:'pointer',
//           background: isOpen ? 'rgba(0,62,155,0.04)' : '#FAFAFA',
//         }}>
//           <div style={{ display:'flex', alignItems:'center', gap:8 }}>
//             <span style={{ fontSize:11, fontWeight:700, color: isOpen?'#003E9B':'#334155' }}>{title}</span>
//             {badge && <span style={{ fontSize:9, padding:'2px 8px', borderRadius:12, background:'rgba(0,62,155,0.10)', color:'#003E9B', fontWeight:700 }}>{badge}</span>}
//           </div>
//           <ChevronDown size={14} color={isOpen?'#003E9B':'#94A3B8'} style={{ transform:isOpen?'rotate(180deg)':'none', transition:'transform 0.2s' }}/>
//         </button>
//         {isOpen && (
//           <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:13 }}>
//             {children}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const ColorGrid = ({ colors, selected, onSelect, cols=8 }) => (
//     <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols},1fr)`, gap:7 }}>
//       {colors.map(c => {
//         const code = typeof c==='string'?c:c.code;
//         const name = typeof c==='string'?c:c.name;
//         const sel  = selected===code;
//         return (
//           <button key={code} title={name} onClick={() => onSelect(code)} style={{
//             width:'100%', aspectRatio:'1', borderRadius:8, cursor:'pointer',
//             border:`2.5px solid ${sel?'#003E9B':'#E2E8F0'}`, backgroundColor:code,
//             position:'relative', transform:sel?'scale(1.18)':'scale(1)', transition:'all 0.15s',
//             boxShadow: sel?'0 0 0 3px rgba(0,62,155,0.22)':'none',
//           }}>
//             {sel && <Check size={9} strokeWidth={3.5} color={isLight(code)?'#000':'#fff'} style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}/>}
//           </button>
//         );
//       })}
//     </div>
//   );

//   const FontGrid = ({ selectedId, onSelect, styleMode='straight' }) => (
//     <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
//       {FONT_STYLES.map(f => {
//         const sel = selectedId===f.id;
//         const pathId = `arch-${f.id}`;
//         const isCurved = styleMode==='curved';
//         return (
//           <button key={f.id} onClick={() => onSelect(f.id)} style={{
//             height:72, borderRadius:12, cursor:'pointer',
//             border:`2px solid ${sel?'#003E9B':'#E2E8F0'}`,
//             background: sel?'rgba(0,62,155,0.09)':'#F8FAFC',
//             display:'flex', flexDirection:'column', alignItems:'center',
//             justifyContent:'center', gap:2, padding:'6px 4px', overflow:'hidden',
//           }}>
//             <svg width="90" height="44" viewBox="0 0 90 44" style={{ overflow:'visible' }}>
//               {isCurved ? (
//                 <>
//                   <defs><path id={pathId} d="M 8,36 Q 45,10 82,36"/></defs>
//                   <text fontFamily={f.fontFamily} fontWeight={f.fontWeight} fontStyle={f.fontStyle}
//                     fontSize="18" fill={sel?'#003E9B':'#1E293B'} letterSpacing="1">
//                     <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">PLAYER</textPath>
//                   </text>
//                 </>
//               ) : (
//                 <text x="45" y="30" textAnchor="middle" fontFamily={f.fontFamily}
//                   fontWeight={f.fontWeight} fontStyle={f.fontStyle} fontSize="18"
//                   fill={sel?'#003E9B':'#1E293B'} letterSpacing="1">PLAYER</text>
//               )}
//             </svg>
//             <span style={{ fontSize:8, fontWeight:700, color:sel?'#003E9B':'#94A3B8', textTransform:'uppercase', letterSpacing:'0.5px', marginTop:2 }}>{f.label}</span>
//           </button>
//         );
//       })}
//     </div>
//   );

//   const UploadSlot = ({ label, hint, state, setter, uid }) => (
//     <div>
//       <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:6 }}>{label}</div>
//       {state ? (
//         <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', background:'#F8FAFC', borderRadius:10, border:'1px solid #E2E8F0' }}>
//           <img src={state} alt={label} style={{ maxHeight:56, maxWidth:110, objectFit:'contain' }}/>
//           <button onClick={() => setter(null)} style={{ background:'#FEF2F2', border:'1px solid #FECACA', color:'#EF4444', borderRadius:7, padding:'5px 10px', cursor:'pointer', fontSize:10, fontWeight:700, display:'flex', alignItems:'center', gap:4 }}>
//             <Trash2 size={12}/> Remove
//           </button>
//         </div>
//       ) : (
//         <button onClick={() => document.getElementById(uid).click()} style={{
//           width:'100%', padding:'16px', border:'2px dashed #CBD5E1', borderRadius:10, cursor:'pointer',
//           background:'#F8FAFC', display:'flex', alignItems:'center', justifyContent:'center',
//           gap:8, fontSize:11, fontWeight:700, color:'#000000',
//         }}><Upload size={15}/> Upload Image</button>
//       )}
//       {hint && <p style={{ fontSize:9, color:'#64748B', marginTop:5 }}>{hint}</p>}
//       <input id={uid} type="file" accept="image/*" style={{ display:'none' }} onChange={handleUpload(setter)}/>
//     </div>
//   );

//   const Toggle = ({ value, onChange, label }) => (
//     <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//       <span style={{ fontSize:11, fontWeight:700, color:'#334155' }}>{label}</span>
//       <button onClick={() => onChange(!value)} style={{ width:42, height:22, borderRadius:99, cursor:'pointer', position:'relative', border:'none', background:value?'#003E9B':'#CBD5E1', transition:'background 0.22s' }}>
//         <span style={{ position:'absolute', top:2, left:value?20:2, width:18, height:18, borderRadius:'50%', background:'#fff', transition:'left 0.22s', boxShadow:'0 1px 4px rgba(0,0,0,0.25)' }}/>
//       </button>
//     </div>
//   );

//   const Slider = ({ label, value, onChange, min, max, unit='' }) => (
//     <div>
//       <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
//         <span style={{ fontSize:10, fontWeight:700, color:'#64748B' }}>{label}</span>
//         <span style={{ fontSize:11, fontWeight:800, color:'#003E9B' }}>{value}{unit}</span>
//       </div>
//       <input type="range" min={min} max={max} value={value} onChange={e=>onChange(Number(e.target.value))} style={{ width:'100%', accentColor:'#003E9B' }}/>
//     </div>
//   );

//   const Pills = ({ items, selected, onSelect }) => (
//     <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
//       {items.map(it => {
//         const id  = typeof it==='string'?it:it.id;
//         const lbl = typeof it==='string'?it:(it.label||it.icon);
//         const sel = selected===id;
//         return (
//           <button key={id} onClick={() => onSelect(id)} style={{
//             padding:'9px 13px', borderRadius:10, cursor:'pointer',
//             border:`2px solid ${sel?'#003E9B':'#E2E8F0'}`,
//             background: sel?'rgba(0,62,155,0.09)':'#F8FAFC',
//             fontSize:10, fontWeight:700, color:sel?'#003E9B':'#000000',
//           }}>{lbl}</button>
//         );
//       })}
//     </div>
//   );

//   const ColorPicker = ({ label, value, onChange }) => (
//     <div>
//       <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>{label}</div>
//       <ColorGrid colors={TEXT_COLORS} selected={value} onSelect={onChange} cols={8}/>
//       <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
//         <div style={{ width:26, height:26, borderRadius:7, background:value, border:'2px solid #E2E8F0', flexShrink:0 }}/>
//         <input type="color" value={value} onChange={e=>onChange(e.target.value)} style={{ width:32, height:32, borderRadius:7, border:'1px solid #E2E8F0', cursor:'pointer', padding:2 }}/>
//         <span style={{ fontSize:9, color:'#64748B' }}>Custom picker</span>
//       </div>
//     </div>
//   );

//   // ─────────────────────────────────────────────────────────────────────────
//   // TAB CONTENT
//   // ─────────────────────────────────────────────────────────────────────────
//   const renderTabContent = () => {
//     if (activeTab === 'style') return (
//       <div>
//         <Section k="fabric" title="Fabric Technology" badge={FABRIC_TYPES.find(f=>f.id===fabric)?.label}>
//           {FABRIC_TYPES.map(f => (
//             <button key={f.id} onClick={() => setFabric(f.id)} style={{
//               padding:'11px 14px', borderRadius:10, cursor:'pointer', textAlign:'left',
//               border:`2px solid ${fabric===f.id?'#003E9B':'#E2E8F0'}`,
//               background: fabric===f.id?'rgba(0,62,155,0.07)':'#F8FAFC',
//             }}>
//               <div style={{ fontSize:11, fontWeight:800, color:fabric===f.id?'#003E9B':'#334155' }}>{f.label}</div>
//               <div style={{ fontSize:9, color:'#64748B', marginTop:3 }}>{f.desc}</div>
//             </button>
//           ))}
//         </Section>

//         <Section k="collar" title="Collar Style" badge={COLLAR_TYPES.find(c=>c.id===collarType)?.label}>
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
//             {COLLAR_TYPES.map(c => {
//               const sel = collarType===c.id;
//               return (
//                 <button key={c.id} onClick={() => setCollarType(c.id)} style={{
//                   padding:'12px 6px', borderRadius:10, cursor:'pointer', textAlign:'center',
//                   border:`2px solid ${sel?'#003E9B':'#E2E8F0'}`,
//                   background: sel?'rgba(0,62,155,0.09)':'#F8FAFC',
//                 }}>
//                   <div style={{ fontSize:22, marginBottom:4 }}>{c.icon}</div>
//                   <div style={{ fontSize:9, fontWeight:700, color:sel?'#003E9B':'#000000' }}>{c.label}</div>
//                 </button>
//               );
//             })}
//           </div>
//         </Section>

//         <Section k="base" title="Base Colour" badge={JERSEY_COLORS.find(c=>c.code===jerseyColor)?.name}>
//           <ColorGrid colors={JERSEY_COLORS} selected={jerseyColor} onSelect={setJerseyColor} cols={8}/>
//           <input type="color" value={jerseyColor} onChange={e=>setJerseyColor(e.target.value)} style={{ width:'100%', height:36, borderRadius:8, border:'1px solid #E2E8F0', cursor:'pointer', padding:2, marginTop:8 }}/>
//         </Section>

//         <Section k="sleeveCol" title="Sleeve Colour" badge={JERSEY_COLORS.find(c=>c.code===sleeveColor)?.name}>
//           <ColorGrid colors={SLEEVE_COLORS} selected={sleeveColor} onSelect={setSleeveColor} cols={8}/>
//           <input type="color" value={sleeveColor} onChange={e=>setSleeveColor(e.target.value)} style={{ width:'100%', height:36, borderRadius:8, border:'1px solid #E2E8F0', cursor:'pointer', padding:2, marginTop:8 }}/>
//           <button onClick={() => setSleeveColor(jerseyColor)} style={{ fontSize:10, fontWeight:700, color:'#003E9B', background:'rgba(0,62,155,0.08)', border:'1px solid rgba(0,62,155,0.25)', borderRadius:8, padding:'9px', cursor:'pointer', width:'100%', marginTop:8 }}>↔ Match Base Colour</button>
//         </Section>

//         <Section k="collarCol" title="Collar Colour" badge={JERSEY_COLORS.find(c=>c.code===collarColor)?.name}>
//           <ColorGrid colors={JERSEY_COLORS} selected={collarColor} onSelect={setCollarColor} cols={8}/>
//           <input type="color" value={collarColor} onChange={e=>setCollarColor(e.target.value)} style={{ width:'100%', height:36, borderRadius:8, border:'1px solid #E2E8F0', cursor:'pointer', padding:2, marginTop:8 }}/>
//         </Section>
//       </div>
//     );

//     if (activeTab === 'logos') return (
//       <div>
//         <Section k="club" title="Club Badge">
//           <UploadSlot label="Club / Team Badge (Front)" hint="PNG transparent bg, min 300×300px" state={clubLogo} setter={setClubLogo} uid="up-club"/>
//           {clubLogo && (
//             <>
//               <div>
//                 <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Badge Position on Front</div>
//                 <div style={{ display:'flex', gap:8 }}>
//                   {BADGE_POSITIONS.map(p => {
//                     const sel = clubLogoPos===p.id;
//                     return (
//                       <button key={p.id} onClick={() => setClubLogoPos(p.id)} style={{
//                         flex:1, padding:'10px', borderRadius:9, cursor:'pointer',
//                         border:`2px solid ${sel?'#003E9B':'#E2E8F0'}`,
//                         background: sel?'rgba(0,62,155,0.09)':'#F8FAFC',
//                         fontSize:10, fontWeight:700, color:sel?'#003E9B':'#000000',
//                       }}>{p.label}</button>
//                     );
//                   })}
//                 </div>
//               </div>
//               <Slider label="Badge Size" value={clubLogoSize} onChange={setClubLogoSize} min={28} max={90} unit="px"/>
//             </>
//           )}
//         </Section>

//         <Section k="sponsor" title="Front Sponsor Logo">
//           <UploadSlot label="Sponsor Logo (Center Chest)" hint="PNG/SVG transparent bg, min 600×200px" state={sponsorLogo} setter={setSponsorLogo} uid="up-sponsor"/>
//           {sponsorLogo && <Slider label="Logo Width" value={sponsorLogoSize} onChange={setSponsorLogoSize} min={50} max={180} unit="px"/>}
//         </Section>

//         <Section k="sponsorBack" title="Back Logo / Sponsor">
//           <UploadSlot label="Back Sponsor / Secondary Logo" hint="Shown at top-back of jersey" state={sponsorBackLogo} setter={setSponsorBackLogo} uid="up-back"/>
//         </Section>

//         <div style={{ padding:'12px 14px', background:'#FFF7ED', borderRadius:10, border:'1px solid #FED7AA' }}>
//           <div style={{ fontSize:10, fontWeight:700, color:'#C2410C', marginBottom:5 }}>📋 Logo Print Guidelines</div>
//           <div style={{ fontSize:10, color:'#9A3412', lineHeight:1.7 }}>
//             • PNG/SVG with <b>transparent background</b> preferred<br/>
//             • Minimum <b>300 DPI</b> for crisp sublimation print<br/>
//             • Max file size: <b>8 MB</b><br/>
//             • Switch to <b>Back View</b> to preview back logos
//           </div>
//         </div>
//       </div>
//     );

//     if (activeTab === 'nameNumber') return (
//       <div>
//         <Section k="name" title="Player Name">
//           <Toggle value={showName} onChange={setShowName} label="Show Player Name"/>
//           {showName && <>
//             <div>
//               <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:6 }}>Name Text</div>
//               <input value={nameText} onChange={e=>setNameText(e.target.value.toUpperCase())} maxLength={22} placeholder="PLAYER NAME" style={{ width:'100%', padding:'11px 13px', border:'1.5px solid #E2E8F0', borderRadius:9, fontSize:13, fontWeight:700, color:'#000000', boxSizing:'border-box', outline:'none' }}/>
//             </div>
//             <div>
//               <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Name Style</div>
//               <div style={{ display:'flex', gap:8 }}>
//                 {[{id:'none',label:'None'},{id:'straight',label:'Straight'},{id:'curved',label:'Curved'}].map(ns => {
//                   const sel = nameStyleId===ns.id;
//                   const col = sel?'#003E9B':'#1E293B';
//                   return (
//                     <button key={ns.id} onClick={() => setNameStyleId(ns.id)} style={{
//                       flex:1, height:76, borderRadius:10, cursor:'pointer',
//                       border:`2px solid ${sel?'#003E9B':'#E2E8F0'}`,
//                       background: sel?'rgba(0,62,155,0.09)':'#F8FAFC',
//                       display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6, padding:'8px 4px',
//                     }}>
//                       {ns.id==='none' && <svg width="38" height="26" viewBox="0 0 38 26"><circle cx="19" cy="13" r="11" fill="none" stroke="#DC2626" strokeWidth="2.2"/><line x1="10" y1="4" x2="28" y2="22" stroke="#DC2626" strokeWidth="2.2"/></svg>}
//                       {ns.id==='straight' && <svg width="60" height="26" viewBox="0 0 60 26"><text x="30" y="20" textAnchor="middle" fontFamily="'Arial Black', sans-serif" fontSize="16" fontWeight="900" fill={col} letterSpacing="1">NAME</text></svg>}
//                       {ns.id==='curved' && <svg width="60" height="32" viewBox="0 0 60 32"><defs><path id="curvedNamePath" d="M 4,28 Q 30,6 56,28"/></defs><text fontFamily="'Arial Black', sans-serif" fontSize="13" fontWeight="900" fill={col}><textPath href="#curvedNamePath" startOffset="50%" textAnchor="middle">NAME</textPath></text></svg>}
//                       <span style={{ fontSize:9, fontWeight:700, color:sel?'#003E9B':'#64748B' }}>{ns.label}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//             {nameStyleId!=='none' && (
//               <div>
//                 <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Font Style</div>
//                 <FontGrid selectedId={nameFont} onSelect={setNameFont} styleMode={nameStyleId}/>
//               </div>
//             )}
//             <ColorPicker label="Name Color" value={nameColor} onChange={setNameColor}/>
//             <div>
//               <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Text Effect</div>
//               <Pills items={TEXT_EFFECTS} selected={nameEffect} onSelect={setNameEffect}/>
//             </div>
//             {nameEffect!=='none' && <ColorPicker label="Effect Color" value={nameEffectColor} onChange={setNameEffectColor}/>}
//             {(nameEffect==='outline'||nameEffect==='both') && <Slider label="Outline Width" value={nameOutlineWidth} onChange={setNameOutlineWidth} min={0.5} max={6} unit="px"/>}
//             <Slider label="Font Size" value={nameSize} onChange={setNameSize} min={10} max={40} unit="pt"/>
//             <Slider label="Vertical Position" value={nameVertical} onChange={setNameVertical} min={2} max={70} unit="%"/>
//           </>}
//         </Section>

//         <Section k="number" title="Player Number">
//           <Toggle value={showNumber} onChange={setShowNumber} label="Show Player Number"/>
//           {showNumber && <>
//             <div>
//               <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:6 }}>Number</div>
//               <input value={numberText} onChange={e=>setNumberText(e.target.value)} maxLength={3} placeholder="10" style={{ width:'100%', padding:'11px 13px', border:'1.5px solid #E2E8F0', borderRadius:9, fontSize:13, fontWeight:700, color:'#000000', boxSizing:'border-box' }}/>
//             </div>
//             <div>
//               <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Number Position</div>
//               <Pills items={NUMBER_POSITIONS} selected={numberPosition} onSelect={setNumberPosition}/>
//             </div>
//             <div>
//               <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Font Style</div>
//               <FontGrid selectedId={numberFont} onSelect={setNumberFont} styleMode="straight"/>
//             </div>
//             <ColorPicker label="Number Color" value={numberColor} onChange={setNumberColor}/>
//             <Slider label="Number Size" value={numberSize} onChange={setNumberSize} min={36} max={110} unit="pt"/>
//           </>}
//         </Section>

//         <Section k="team" title="Team Name (Back Footer)">
//           <Toggle value={showTeam} onChange={setShowTeam} label="Show Team Name"/>
//           {showTeam && <>
//             <div>
//               <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:6 }}>Team Name</div>
//               <input value={teamName} onChange={e=>setTeamName(e.target.value.toUpperCase())} maxLength={22} placeholder="YOUR TEAM" style={{ width:'100%', padding:'11px 13px', border:'1.5px solid #E2E8F0', borderRadius:9, fontSize:12, fontWeight:700, color:'#000000', boxSizing:'border-box' }}/>
//             </div>
//             <FontGrid selectedId={teamFont} onSelect={setTeamFont} styleMode="straight"/>
//             <ColorPicker label="Team Name Color" value={teamColor} onChange={setTeamColor}/>
//           </>}
//         </Section>

//         <div style={{ padding:'10px 14px', background:'#F0FDF4', borderRadius:10, border:'1px solid #BBF7D0' }}>
//           <div style={{ fontSize:10, color:'#166534' }}>💡 Switch to <b>Back View</b> to preview name & number on jersey.</div>
//         </div>
//       </div>
//     );

//     // Order tab
//     return (
//       <div>
//         <div style={{ padding:'12px 14px', background:'#F0FDF4', borderRadius:10, border:'1px solid #BBF7D0', marginBottom:14 }}>
//           <div style={{ fontSize:11, color:'#166534', fontWeight:600 }}>Design ready! Complete the details below.</div>
//         </div>
//         <div style={{ marginBottom:16 }}>
//           <div style={{ fontSize:11, fontWeight:700, marginBottom:9, color:'#000' }}>Select Size</div>
//           <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
//             {SIZES.map(s => {
//               const sel = selectedSize===s;
//               return (
//                 <button key={s} onClick={() => setSelectedSize(s)} style={{
//                   width:50, height:50, borderRadius:9, fontSize:11, fontWeight:700, cursor:'pointer',
//                   border:`2px solid ${sel?'#003E9B':'#E2E8F0'}`,
//                   background: sel?'rgba(0,62,155,0.10)':'#F8FAFC',
//                   color: sel?'#003E9B':'#000',
//                 }}>{s}</button>
//               );
//             })}
//           </div>
//         </div>
//         <div style={{ marginBottom:16 }}>
//           <div style={{ fontSize:11, fontWeight:700, marginBottom:9, color:'#000' }}>Quantity</div>
//           <div style={{ display:'flex', alignItems:'center', gap:14, background:'#F8FAFC', padding:'8px 16px', borderRadius:10, justifyContent:'center' }}>
//             <button onClick={() => setQuantity(Math.max(1,quantity-1))} style={{ width:38, height:38, borderRadius:8, background:'#fff', border:'1px solid #E2E8F0', cursor:'pointer', fontSize:20, color:'#003E9B' }}>−</button>
//             <span style={{ fontSize:22, fontWeight:900, minWidth:64, textAlign:'center', color:'#003E9B' }}>{quantity}</span>
//             <button onClick={() => setQuantity(quantity+1)} style={{ width:38, height:38, borderRadius:8, background:'#fff', border:'1px solid #E2E8F0', cursor:'pointer', fontSize:20, color:'#003E9B' }}>+</button>
//           </div>
//         </div>
//         <div style={{ border:'1px solid rgba(0,62,155,0.2)', borderRadius:12, background:'rgba(0,62,155,0.03)', padding:16, marginBottom:14 }}>
//           <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
//             <Star size={15} color="#003E9B" fill="#003E9B"/>
//             <span style={{ fontSize:13, fontWeight:800, color:'#003E9B' }}>Order Summary</span>
//           </div>
//           {[
//             ['Sport', sport.charAt(0).toUpperCase()+sport.slice(1)],
//             ['Fabric', FABRIC_TYPES.find(f=>f.id===fabric)?.label],
//             ['Collar', COLLAR_TYPES.find(c=>c.id===collarType)?.label],
//             ['Base Color', JERSEY_COLORS.find(c=>c.code===jerseyColor)?.name],
//             ['Player Name', showName?(nameText||'—'):'Hidden'],
//             ['Player Number', showNumber?`#${numberText}`:'Hidden'],
//             ['Size', selectedSize],
//           ].map(([k,v]) => (
//             <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
//               <span style={{ fontSize:10, color:'#64748B' }}>{k}</span>
//               <span style={{ fontSize:11, fontWeight:600, color:'#1E293B', textAlign:'right' }}>{v}</span>
//             </div>
//           ))}
//           <div style={{ borderTop:'1px solid rgba(0,62,155,0.12)', marginTop:10, paddingTop:10, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//             <span style={{ fontSize:12, fontWeight:700 }}>Total ({quantity} units)</span>
//             <span style={{ fontSize:22, fontWeight:900, color:'#003E9B' }}>₹{((product?.price||89)*quantity).toLocaleString()}</span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ─────────────────────────────────────────────────────────────────────────
//   // PANEL INNER
//   // ─────────────────────────────────────────────────────────────────────────
//   const panelInner = (
//     <>
//       {/* Tabs */}
//       <div style={{ display:'flex', borderBottom:'1px solid #E8ECF0', background:'#fff', flexShrink:0 }}>
//         {MAIN_TABS.map(tab => {
//           const active = activeTab===tab.id;
//           const Icon = tab.Icon;
//           return (
//             <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
//               flex:1, padding:'12px 4px 10px', border:'none', cursor:'pointer',
//               borderBottom:`2.5px solid ${active?'#003E9B':'transparent'}`,
//               background: active?'rgba(0,62,155,0.05)':'transparent',
//               color: active?'#003E9B':'#94A3B8',
//               display:'flex', flexDirection:'column', alignItems:'center', gap:3,
//             }}>
//               <Icon size={16} strokeWidth={active?2.5:1.8}/>
//               <span style={{ fontSize:9, fontWeight:700 }}>{tab.label}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Panel header */}
//       <div style={{ padding:'12px 16px', borderBottom:'1px solid #E8ECF0', flexShrink:0 }}>
//         <div style={{ fontSize:17, fontWeight:800, color:'#0F172A' }}>{product?.name||'Kit Designer'}</div>
//         <div style={{ fontSize:9, color:'#94A3B8', marginTop:2 }}>
//           {activeTab==='style'&&'Style & Colors'}
//           {activeTab==='logos'&&'Logos & Badges'}
//           {activeTab==='nameNumber'&&'Name & Number'}
//           {activeTab==='order'&&'Order Details'}
//         </div>
//       </div>

//       {/* Scrollable content */}
//       <div style={{ flex:1, overflowY:'auto', padding:'14px', background:'#FAFAFA' }}>
//         {renderTabContent()}
//       </div>

//       {/* Footer buttons */}
//       <div style={{ padding:'12px 14px', borderTop:'1px solid #E8ECF0', background:'#fff', flexShrink:0 }}>
//         <div style={{ display:'flex', gap:10 }}>
//           <button onClick={reset} style={{
//             flex:1, padding:'12px', borderRadius:10, border:'1px solid #E2E8F0',
//             background:'#fff', cursor:'pointer', fontSize:12, fontWeight:700, color:'#64748B',
//           }}>Reset</button>
//           <button onClick={handleSaveDesign} style={{
//             flex:2, padding:'12px', borderRadius:10, border:'none', cursor:'pointer',
//             fontSize:13, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', gap:8,
//             background:'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)', color:'#fff',
//           }}>
//             <Save size={16}/> Save Design
//           </button>
//         </div>
//       </div>
//     </>
//   );

//   if (!mounted) return (
//     <div style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
//       <div style={{ width:40, height:40, border:'3px solid #003E9B', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 1s linear infinite' }}/>
//       <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//     </div>
//   );

//   return (
//     <>
//       {/* ── KEY FIX: use height:100% not 100vh, and calc for navbar ── */}
//       <div style={{
//         display: 'flex',
//         height: 'calc(100vh - 120px)',   /* subtract your navbar height */
//         minHeight: 500,
//         overflow: 'hidden',
//         background: '#fff',
//         fontFamily: "'Poppins','Segoe UI',sans-serif",
//       }}>

//         {/* ── LEFT: 3D / Product viewer ── */}
//         <div style={{
//           flex: 1,
//           position: 'relative',
//           background: 'linear-gradient(135deg,#EEF2F7,#E2E8F0)',
//           overflow: 'hidden',
//           /* CRITICAL: explicit height so children can stretch */
//           height: '100%',
//         }}>

//           {/* View toggle buttons */}
//           <div style={{ position:'absolute', top:14, left:'50%', transform:'translateX(-50%)', zIndex:20, display:'flex', gap:8 }}>
//             {['product','glb'].map(v => (
//               <button key={v} onClick={() => setViewMode(v)} style={{
//                 padding:'7px 16px', borderRadius:99, fontSize:10, fontWeight:700, cursor:'pointer', border:'none',
//                 background: viewMode===v ? 'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)' : 'rgba(255,255,255,0.95)',
//                 color: viewMode===v ? '#fff' : '#003E9B',
//                 boxShadow: viewMode===v ? '0 2px 10px rgba(0,62,155,0.3)' : '0 1px 4px rgba(0,0,0,0.1)',
//               }}>{v==='product'?'Product View':'3D View'}</button>
//             ))}
//           </div>

//           {/* Fullscreen button (3D only) */}
//           {viewMode==='glb' && (
//             <button onClick={handleFullscreen} style={{
//               position:'absolute', top:14, right:14, zIndex:20,
//               background:'rgba(255,255,255,0.92)', backdropFilter:'blur(8px)',
//               padding:8, borderRadius:40, border:'none', cursor:'pointer',
//               boxShadow:'0 2px 8px rgba(0,0,0,0.12)',
//             }}>
//               <Maximize2 size={15}/>
//             </button>
//           )}

//           {/* Product image view */}
//           {viewMode==='product' && (
//             <ProductImageViewer jerseyColor={jerseyColor} view={view} product={product}>
//               <div style={{ position:'absolute', bottom:20, left:'50%', transform:'translateX(-50%)', zIndex:20 }}>
//                 <div style={{ background:'rgba(255,255,255,0.95)', borderRadius:99, padding:4, display:'inline-flex', gap:4, boxShadow:'0 4px 14px rgba(0,0,0,0.10)' }}>
//                   {['front','back'].map(v => (
//                     <button key={v} onClick={() => setView(v)} style={{
//                       padding:'8px 26px', borderRadius:99, fontSize:10, fontWeight:700, cursor:'pointer',
//                       background: view===v ? 'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)' : 'transparent',
//                       border: view===v ? 'none' : '1px solid #003E9B',
//                       color: view===v ? '#fff' : '#003E9B',
//                     }}>{v.toUpperCase()}</button>
//                   ))}
//                 </div>
//               </div>
//             </ProductImageViewer>
//           )}

//           {/* ── 3D GLB viewer — the critical fix is here ── */}
//           {viewMode==='glb' && (
//             <div
//               ref={viewerRef}
//               style={{
//                 position: 'absolute',  /* fill the entire parent */
//                 inset: 0,
//                 width: '100%',
//                 height: '100%',
//               }}
//             >
//               <GLBViewer
//                 glbPath="/images/jerseys/TSHIRT.glb"
//                 autoRotate={true}
//                 backgroundColor="#E2E8F0"
//                 jerseyColor={jerseyColor}
//                 sleeveColor={sleeveColor}
//                 collarColor={collarColor} 
//                 playerName={nameText}
//                 playerNumber={numberText}
//                 nameColor={nameColor}
//                 numberColor={numberColor}
//                 nameStyleId={nameStyleId}
//                 nameFont={nameFont}
//                 nameTextStyle={nameStyleId}
//                 nameVertical={nameVertical}
//                 showText={showName && nameStyleId!=='none'}
//                 clubLogo={clubLogo}
//                 sponsorLogo={sponsorLogo}
//                 nameEffect={nameEffect}
//                 nameEffectColor={nameEffectColor}
//                 nameOutlineWidth={nameOutlineWidth}
//                 numberEffect={numberEffect}
//                 numberEffectColor={numberEffectColor}
//               />
//             </div>
//           )}
//         </div>

//         {/* ── RIGHT: config panel (desktop) ── */}
//         <div
//           className="desktop-cfg"
//           style={{
//             width: 385,
//             background: '#fff',
//             borderLeft: '1px solid #E8ECF0',
//             display: 'flex',
//             flexDirection: 'column',
//             overflow: 'hidden',
//             height: '100%',      /* fill the flex row height */
//             flexShrink: 0,
//           }}
//         >
//           {panelInner}
//         </div>
//       </div>

//       {/* ── Mobile bottom nav ── */}
//       <div className="mob-nav" style={{ display:'none', position:'fixed', bottom:0, left:0, right:0, background:'rgba(255,255,255,0.98)', backdropFilter:'blur(10px)', borderTop:'1px solid #E8ECF0', zIndex:40 }}>
//         {MAIN_TABS.map(tab => {
//           const Icon = tab.Icon;
//           const active = activeTab===tab.id;
//           return (
//             <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileOpen(true); }} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2, padding:'10px 0', cursor:'pointer', border:'none', background:'transparent', color:active?'#003E9B':'#94A3B8' }}>
//               <Icon size={18} strokeWidth={active?2.5:1.8}/>
//               <span style={{ fontSize:8, fontWeight:700 }}>{tab.label}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Mobile drawer */}
//       {mobileOpen && (
//         <div style={{ position:'fixed', inset:0, zIndex:300 }}>
//           <div style={{ position:'absolute', inset:0, background:'rgba(15,23,42,0.5)', backdropFilter:'blur(4px)' }} onClick={() => setMobileOpen(false)}/>
//           <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'#fff', borderRadius:'24px 24px 0 0', maxHeight:'82vh', display:'flex', flexDirection:'column' }}>
//             <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px', borderBottom:'1px solid #E8ECF0' }}>
//               <span style={{ fontSize:16, fontWeight:800, color:'#000' }}>Customize</span>
//               <button onClick={() => setMobileOpen(false)} style={{ background:'#F1F5F9', border:'none', borderRadius:'50%', width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
//                 <X size={14}/>
//               </button>
//             </div>
//             <div style={{ flex:1, overflow:'auto' }}>{panelInner}</div>
//           </div>
//         </div>
//       )}

//       <style jsx global>{`
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @media (max-width: 1023px) {
//           .desktop-cfg { display: none !important; }
//           .mob-nav { display: flex !important; }
//         }
//         @media (min-width: 1024px) {
//           .mob-nav { display: none !important; }
//         }
//         button { transition: all 0.18s ease; }
//         button:hover { opacity: 0.9; }
//         button:active { transform: scale(0.97); }
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 10px; }
//         ::-webkit-scrollbar-thumb { background: linear-gradient(135deg,#0EA5E9,#0284C7); border-radius: 10px; }
//         input[type=range] { cursor: pointer; }
//         input:focus { outline: 2px solid rgba(0,62,155,0.4); outline-offset: 2px; }
//       `}</style>
//     </>
//   );
// }






// 'use client';

// import { useState, useCallback, useEffect, useRef } from 'react';
// import {
//   Upload, ChevronDown, Save, Check, Trash2,
//   Type, Shield, Paintbrush, ShoppingBag,
//   X, Star, Maximize2, Minimize2,
// } from 'lucide-react';
// import GLBViewer from '../common/GLBViewer';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '@/features/cart/cartSlice';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// // ─────────────────────────────────────────────────────────────────────────────
// // STATIC DATA
// // ─────────────────────────────────────────────────────────────────────────────
// const JERSEY_COLORS = [
//   { name: 'Obsidian',   code: '#111111' }, { name: 'Crimson',    code: '#DC2626' },
//   { name: 'Deep Navy',  code: '#1D3557' }, { name: 'Royal Blue', code: '#1E40AF' },
//   { name: 'Emerald',    code: '#059669' }, { name: 'Gold',       code: '#D97706' },
//   { name: 'Pure White', code: '#FFFFFF' }, { name: 'Black',      code: '#000000' },
//   { name: 'Purple',     code: '#7C3AED' }, { name: 'Orange',     code: '#EA580C' },
//   { name: 'Teal',       code: '#0D9488' }, { name: 'Sky Blue',   code: '#0EA5E9' },
// ];

// const SLEEVE_COLORS = [
//   { name: 'Obsidian',   code: '#111111' }, { name: 'Crimson',    code: '#DC2626' },
//   { name: 'Deep Navy',  code: '#1D3557' }, { name: 'Pure White', code: '#FFFFFF' },
//   { name: 'Royal Blue', code: '#1E40AF' }, { name: 'Gold',       code: '#D97706' },
//   { name: 'Emerald',    code: '#059669' }, { name: 'Black',      code: '#000000' },
// ];

// const TEXT_COLORS = [
//   '#FFFFFF', '#000000', '#E8820C', '#DC2626',
//   '#1D3557', '#F59E0B', '#FFFF00', '#00FF88',
//   '#7C3AED', '#EC4899', '#0EA5E9', '#059669',
// ];

// const FONT_STYLES = [
//   { id: 'collegiate', label: 'COLLEGIATE', fontFamily: '"Russo One", sans-serif',       fontWeight: '400' },
//   { id: 'block',      label: 'BLOCK',      fontFamily: '"Bebas Neue", sans-serif',       fontWeight: '400' },
//   { id: 'varsity',    label: 'VARSITY',    fontFamily: '"Teko", sans-serif',             fontWeight: '700' },
//   { id: 'sport',      label: 'SPORT',      fontFamily: '"Oswald", sans-serif',           fontWeight: '700' },
//   { id: 'modern',     label: 'MODERN',     fontFamily: '"Barlow Condensed", sans-serif', fontWeight: '800' },
// ];

// const FABRIC_TYPES = [
//   { id: 'climatech', label: 'ClimateTech Pro', desc: 'UV protection & elite moisture management' },
//   { id: 'coolweave', label: 'CoolWeave Lite',  desc: 'Lightweight breathable performance fabric' },
//   { id: 'dryfit',    label: 'DriFit Ultra',    desc: 'Maximum sweat-wicking & comfort' },
//   { id: 'interlock', label: 'Interlock Knit',  desc: 'Durable two-layer knit for heavy use' },
// ];

// const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

// const MAIN_TABS = [
//   { id: 'style',      label: 'Style',         Icon: Paintbrush  },
//   { id: 'logos',      label: 'Logos',         Icon: Shield       },
//   { id: 'nameNumber', label: 'Name & Number', Icon: Type         },
//   { id: 'order',      label: 'Order',         Icon: ShoppingBag  },
// ];

// const isLight = (hex) => {
//   if (!hex) return true;
//   const h = hex.replace('#', '');
//   const r = parseInt(h.slice(0, 2), 16);
//   const g = parseInt(h.slice(2, 4), 16);
//   const b = parseInt(h.slice(4, 6), 16);
//   return (r * 299 + g * 587 + b * 114) / 1000 > 155;
// };


// // ─────────────────────────────────────────────────────────────────────────────
// // MAIN COMPONENT
// // ─────────────────────────────────────────────────────────────────────────────
// export default function JerseyCustomizer({ product }) {
//   const router   = useRouter();
//   const dispatch = useDispatch();
//   const { user } = useSelector(s => s.auth);
// console.log("product",product)
//   // ── UI State ──
//   const [mounted,       setMounted]       = useState(false);
//   const [activeTab,     setActiveTab]     = useState('style');
//   const [view,          setView]          = useState('front');
//   const [viewMode,      setViewMode]      = useState('product');
//   const [mobileOpen,    setMobileOpen]    = useState(false);
//   const [isFullscreen,  setIsFullscreen]  = useState(false);
//   const [selectedSize,  setSelectedSize]  = useState('L');
//   const [quantity,      setQuantity]      = useState(1);
//   const [isMobile,      setIsMobile]      = useState(false);
//   const [isTablet,      setIsTablet]      = useState(false);

//   // ── Style State ──
//   const [jerseyColor, setJerseyColor] = useState('#1E40AF');
//   const [sleeveColor, setSleeveColor] = useState('#111111');
//   const [fabric,      setFabric]      = useState('climatech');

//   // ── Logos State ──
//   const [clubLogo,    setClubLogo]    = useState(null);
//   const [sponsorLogo, setSponsorLogo] = useState(null);

//   // ── Name & Number State ──
//   const [playerName,   setPlayerName]   = useState('PLAYER');
//   const [playerNumber, setPlayerNumber] = useState('10');
//   const [nameFont,     setNameFont]     = useState('collegiate');
//   const [nameColor,    setNameColor]    = useState('#FFFFFF');
//   const [numberFont,   setNumberFont]   = useState('block');
//   const [numberColor,  setNumberColor]  = useState('#F59E0B');
//   const [showName,     setShowName]     = useState(true);
//   const [showNumber,   setShowNumber]   = useState(true);

//   // ── Accordion States ──
//   const [fabricOpen,  setFabricOpen]  = useState(true);
//   const [baseOpen,    setBaseOpen]    = useState(true);
//   const [sleeveOpen,  setSleeveOpen]  = useState(false);
//   const [clubOpen,    setClubOpen]    = useState(true);
//   const [sponsorOpen, setSponsorOpen] = useState(false);
//   const [nameOpen,    setNameOpen]    = useState(true);
//   const [numberOpen,  setNumberOpen]  = useState(false);

//   const viewerContainerRef = useRef(null);

//   // ── Screen size detection ──
//   useEffect(() => {
//     const checkSize = () => {
//       const width = window.innerWidth;
//       setIsMobile(width < 768);
//       setIsTablet(width >= 768 && width < 1024);
//     };
//     checkSize();
//     window.addEventListener('resize', checkSize);
//     return () => window.removeEventListener('resize', checkSize);
//   }, []);

//   useEffect(() => { setMounted(true); }, []);

//   // ── Fullscreen listener ──
//   useEffect(() => {
//     const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
//     document.addEventListener('fullscreenchange', handleFullscreenChange);
//     return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
//   }, []);

//   // ── Handlers ──
//   const handleUpload = useCallback((setter) => (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith('image/')) { toast.error('Please upload an image'); return; }
//     if (file.size > 8 * 1024 * 1024)    { toast.error('Max file size 8 MB');      return; }
//     const reader = new FileReader();
//     reader.onloadend = () => setter(reader.result);
//     reader.readAsDataURL(file);
//   }, []);

//   const handleSaveDesign = () => {
//     if (!product) { toast.error('Product not loaded'); return; }
//     dispatch(addToCart({
//       productId:    product?.id,
//       name:         product?.name,
//       price:        product?.price || 899,
//       size:         selectedSize,
//       quantity,
//       jerseyColor,
//       sleeveColor,
//       playerName:   showName   ? playerName   : '',
//       playerNumber: showNumber ? playerNumber : '',
//     }));
//     toast.success('Design saved to cart!');
//   };

//   const reset = () => {
//     setJerseyColor('#1E40AF');
//     setSleeveColor('#111111');
//     setFabric('climatech');
//     setClubLogo(null);
//     setSponsorLogo(null);
//     setPlayerName('PLAYER');
//     setPlayerNumber('10');
//     setNameFont('collegiate');
//     setNameColor('#FFFFFF');
//     setNumberFont('block');
//     setNumberColor('#F59E0B');
//     setShowName(true);
//     setShowNumber(true);
//     setSelectedSize('L');
//     setQuantity(1);
//     toast.success('Reset complete');
//   };

//   const handleFullscreen = async () => {
//     const el = viewerContainerRef.current;
//     if (!el) return;
//     try {
//       if (!document.fullscreenElement) await el.requestFullscreen();
//       else                              await document.exitFullscreen();
//     } catch (err) {
//       console.error('Fullscreen error:', err);
//     }
//   };

//   // ─────────────────────────────────────────────────────────────────────────
//   // UI ATOMS
//   // ─────────────────────────────────────────────────────────────────────────
//   const Section = ({ title, badge, open, onToggle, children }) => (
//     <div style={{
//       background: '#fff', borderRadius: 12, marginBottom: 10, overflow: 'hidden',
//       border: `1px solid ${open ? 'rgba(0,62,155,0.2)' : '#E8ECF0'}`,
//       boxShadow: open ? '0 2px 14px rgba(0,62,155,0.07)' : 'none',
//     }}>
//       <button onClick={onToggle} style={{
//         width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//         padding: '13px 16px', border: 'none', cursor: 'pointer',
//         background: open ? 'rgba(0,62,155,0.04)' : '#FAFAFA',
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <span style={{ fontSize: 11, fontWeight: 700, color: open ? '#003E9B' : '#334155' }}>{title}</span>
//           {badge && (
//             <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 12, background: 'rgba(0,62,155,0.10)', color: '#003E9B', fontWeight: 700 }}>
//               {badge}
//             </span>
//           )}
//         </div>
//         <ChevronDown
//           size={14}
//           color={open ? '#003E9B' : '#94A3B8'}
//           style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
//         />
//       </button>
//       {open && (
//         <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 13 }}>
//           {children}
//         </div>
//       )}
//     </div>
//   );

//   const ColorGrid = ({ colors, selected, onSelect, cols = isMobile ? 6 : 8 }) => (
//     <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols},1fr)`, gap: 7 }}>
//       {colors.map(c => {
//         const code = typeof c === 'string' ? c : c.code;
//         const name = typeof c === 'string' ? c : c.name;
//         const sel  = selected === code;
//         return (
//           <button key={code} title={name} onClick={() => onSelect(code)} style={{
//             width: '100%', aspectRatio: '1', borderRadius: 8, cursor: 'pointer',
//             border: `2.5px solid ${sel ? '#003E9B' : '#E2E8F0'}`, backgroundColor: code,
//             position: 'relative', transform: sel ? 'scale(1.12)' : 'scale(1)', transition: 'all 0.15s',
//             boxShadow: sel ? '0 0 0 3px rgba(0,62,155,0.22)' : 'none',
//           }}>
//             {sel && (
//               <Check
//                 size={9} strokeWidth={3.5}
//                 color={isLight(code) ? '#000' : '#fff'}
//                 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
//               />
//             )}
//           </button>
//         );
//       })}
//     </div>
//   );

//   const UploadSlot = ({ label, hint, state, setter, uid }) => (
//     <div>
//       <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 6 }}>{label}</div>
//       {state ? (
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
//           <img src={state} alt={label} style={{ maxHeight: 56, maxWidth: 110, objectFit: 'contain' }} />
//           <button onClick={() => setter(null)} style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', borderRadius: 7, padding: '5px 10px', cursor: 'pointer', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
//             <Trash2 size={12} /> Remove
//           </button>
//         </div>
//       ) : (
//         <button onClick={() => document.getElementById(uid).click()} style={{
//           width: '100%', padding: '16px', border: '2px dashed #CBD5E1', borderRadius: 10, cursor: 'pointer',
//           background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center',
//           gap: 8, fontSize: 11, fontWeight: 700, color: '#475569',
//         }}>
//           <Upload size={15} /> Upload Image
//         </button>
//       )}
//       {hint && <p style={{ fontSize: 9, color: '#64748B', marginTop: 5 }}>{hint}</p>}
//       <input id={uid} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload(setter)} />
//     </div>
//   );

//   const Toggle = ({ label, value, onChange }) => (
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//       <span style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>{label}</span>
//       <button onClick={() => onChange(!value)} style={{ width: 42, height: 22, borderRadius: 99, cursor: 'pointer', position: 'relative', border: 'none', background: value ? '#003E9B' : '#CBD5E1', transition: 'background 0.22s' }}>
//         <span style={{ position: 'absolute', top: 2, left: value ? 20 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.22s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }} />
//       </button>
//     </div>
//   );

//   const FontSelect = ({ selected, onSelect }) => (
//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
//       {FONT_STYLES.map(font => (
//         <button key={font.id} onClick={() => onSelect(font.id)} style={{
//           padding: '7px 13px', borderRadius: 9, fontSize: 10, fontWeight: 700,
//           background: selected === font.id ? '#003E9B' : '#F3F4F6',
//           color:      selected === font.id ? '#fff'    : '#374151',
//           border: `1.5px solid ${selected === font.id ? '#003E9B' : '#E2E8F0'}`,
//           cursor: 'pointer',
//         }}>
//           {font.label}
//         </button>
//       ))}
//     </div>
//   );

//   // ─────────────────────────────────────────────────────────────────────────
//   // TAB CONTENT
//   // ─────────────────────────────────────────────────────────────────────────
//   const renderTabContent = () => {
//     if (activeTab === 'style') return (
//       <>
//         <Section title="Fabric Technology" open={fabricOpen} onToggle={() => setFabricOpen(!fabricOpen)} badge={FABRIC_TYPES.find(f => f.id === fabric)?.label}>
//           {FABRIC_TYPES.map(f => (
//             <button key={f.id} onClick={() => setFabric(f.id)} style={{
//               padding: '11px 14px', borderRadius: 10, cursor: 'pointer', textAlign: 'left', width: '100%',
//               border: `2px solid ${fabric === f.id ? '#003E9B' : '#E2E8F0'}`,
//               background: fabric === f.id ? 'rgba(0,62,155,0.07)' : '#F8FAFC',
//             }}>
//               <div style={{ fontSize: 11, fontWeight: 800, color: fabric === f.id ? '#003E9B' : '#334155' }}>{f.label}</div>
//               <div style={{ fontSize: 9, color: '#64748B', marginTop: 3 }}>{f.desc}</div>
//             </button>
//           ))}
//         </Section>

//         <Section title="Base Colour" open={baseOpen} onToggle={() => setBaseOpen(!baseOpen)} badge={JERSEY_COLORS.find(c => c.code === jerseyColor)?.name}>
//           <ColorGrid colors={JERSEY_COLORS} selected={jerseyColor} onSelect={setJerseyColor} />
//           <input type="color" value={jerseyColor} onChange={e => setJerseyColor(e.target.value)}
//             style={{ width: '100%', height: 36, borderRadius: 8, border: '1px solid #E2E8F0', cursor: 'pointer', padding: 2, marginTop: 4 }} />
//         </Section>

//         <Section title="Sleeve Colour" open={sleeveOpen} onToggle={() => setSleeveOpen(!sleeveOpen)} badge={SLEEVE_COLORS.find(c => c.code === sleeveColor)?.name}>
//           <ColorGrid colors={SLEEVE_COLORS} selected={sleeveColor} onSelect={setSleeveColor} />
//           <input type="color" value={sleeveColor} onChange={e => setSleeveColor(e.target.value)}
//             style={{ width: '100%', height: 36, borderRadius: 8, border: '1px solid #E2E8F0', cursor: 'pointer', padding: 2, marginTop: 4 }} />
//           <button onClick={() => setSleeveColor(jerseyColor)} style={{
//             fontSize: 10, fontWeight: 700, color: '#003E9B', background: 'rgba(0,62,155,0.08)',
//             border: '1px solid rgba(0,62,155,0.25)', borderRadius: 8, padding: '9px', cursor: 'pointer', width: '100%',
//           }}>
//             ↔ Match Base Colour
//           </button>
//         </Section>
//       </>
//     );

//     if (activeTab === 'logos') return (
//       <>
//         <Section title="Club Badge" open={clubOpen} onToggle={() => setClubOpen(!clubOpen)}>
//           <UploadSlot label="Club / Team Badge (Front)" hint="PNG transparent bg, min 300×300px" state={clubLogo} setter={setClubLogo} uid="up-club" />
//         </Section>

//         <Section title="Sponsor Logo" open={sponsorOpen} onToggle={() => setSponsorOpen(!sponsorOpen)}>
//           <UploadSlot label="Sponsor Logo (Center Chest)" hint="PNG/SVG transparent bg, min 600×200px" state={sponsorLogo} setter={setSponsorLogo} uid="up-sponsor" />
//         </Section>

//         <div style={{ padding: '12px 14px', background: '#FFF7ED', borderRadius: 10, border: '1px solid #FED7AA' }}>
//           <div style={{ fontSize: 10, fontWeight: 700, color: '#C2410C', marginBottom: 5 }}>📋 Logo Print Guidelines</div>
//           <div style={{ fontSize: 10, color: '#9A3412', lineHeight: 1.7 }}>
//             • PNG/SVG with <b>transparent background</b> preferred<br />
//             • Minimum <b>300 DPI</b> for crisp sublimation print<br />
//             • Max file size: <b>8 MB</b>
//           </div>
//         </div>
//       </>
//     );

//     if (activeTab === 'nameNumber') return (
//       <>
//         <Section title="Player Name" open={nameOpen} onToggle={() => setNameOpen(!nameOpen)}>
//           <Toggle label="Show Player Name" value={showName} onChange={setShowName} />
//           {showName && (
//             <>
//               <div>
//                 <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 6 }}>Name Text</div>
//                 <input
//                   type="text"
//                   value={playerName}
//                   onChange={e => setPlayerName(e.target.value.toUpperCase())}
//                   maxLength={22}
//                   placeholder="PLAYER NAME"
//                   style={{ width: '100%', padding: '11px 13px', border: '1.5px solid #E2E8F0', borderRadius: 9, fontSize: 13, fontWeight: 700, color: '#000', boxSizing: 'border-box', outline: 'none' }}
//                 />
//               </div>
//               <div>
//                 <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 7 }}>Font Style</div>
//                 <FontSelect selected={nameFont} onSelect={setNameFont} />
//               </div>
//               <div>
//                 <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 7 }}>Name Color</div>
//                 <ColorGrid colors={TEXT_COLORS.map(c => ({ code: c, name: c }))} selected={nameColor} onSelect={setNameColor} cols={8} />
//               </div>
//             </>
//           )}
//         </Section>

//         <Section title="Player Number" open={numberOpen} onToggle={() => setNumberOpen(!numberOpen)}>
//           <Toggle label="Show Player Number" value={showNumber} onChange={setShowNumber} />
//           {showNumber && (
//             <>
//               <div>
//                 <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 6 }}>Number</div>
//                 <input
//                   type="text"
//                   value={playerNumber}
//                   onChange={e => setPlayerNumber(e.target.value)}
//                   maxLength={2}
//                   placeholder="10"
//                   style={{ width: '100%', padding: '11px 13px', border: '1.5px solid #E2E8F0', borderRadius: 9, fontSize: 13, fontWeight: 700, color: '#000', boxSizing: 'border-box', outline: 'none' }}
//                 />
//               </div>
//               <div>
//                 <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 7 }}>Font Style</div>
//                 <FontSelect selected={numberFont} onSelect={setNumberFont} />
//               </div>
//               <div>
//                 <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 7 }}>Number Color</div>
//                 <ColorGrid colors={TEXT_COLORS.map(c => ({ code: c, name: c }))} selected={numberColor} onSelect={setNumberColor} cols={8} />
//               </div>
//             </>
//           )}
//         </Section>

//         <div style={{ padding: '10px 14px', background: '#F0FDF4', borderRadius: 10, border: '1px solid #BBF7D0' }}>
//           <div style={{ fontSize: 10, color: '#166534' }}>
//             💡 Switch to <b>3D View</b> to preview name & number on the jersey.
//           </div>
//         </div>
//       </>
//     );

//     // ── Order Tab ──
//     return (
//       <>
//         <div style={{ padding: '10px 12px', background: '#F0FDF4', borderRadius: 10, marginBottom: 12, fontSize: 11, color: '#166534', fontWeight: 600 }}>
//           Design ready! Complete the details below.
//         </div>

//         <div style={{ marginBottom: 16 }}>
//           <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 9, color: '#000' }}>Select Size</div>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
//             {SIZES.map(s => (
//               <button key={s} onClick={() => setSelectedSize(s)} style={{
//                 width: 48, height: 48, borderRadius: 9, fontSize: 11, fontWeight: 700, cursor: 'pointer',
//                 border: `2px solid ${selectedSize === s ? '#003E9B' : '#E2E8F0'}`,
//                 background: selectedSize === s ? 'rgba(0,62,155,0.10)' : '#F8FAFC',
//                 color: selectedSize === s ? '#003E9B' : '#000',
//               }}>{s}</button>
//             ))}
//           </div>
//         </div>

//         <div style={{ marginBottom: 16 }}>
//           <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 9, color: '#000' }}>Quantity</div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#F8FAFC', padding: '8px 16px', borderRadius: 10, justifyContent: 'center' }}>
//             <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 38, height: 38, borderRadius: 8, background: '#fff', border: '1px solid #E2E8F0', cursor: 'pointer', fontSize: 20, color: '#003E9B' }}>−</button>
//             <span style={{ fontSize: 22, fontWeight: 900, minWidth: 64, textAlign: 'center', color: '#003E9B' }}>{quantity}</span>
//             <button onClick={() => setQuantity(quantity + 1)} style={{ width: 38, height: 38, borderRadius: 8, background: '#fff', border: '1px solid #E2E8F0', cursor: 'pointer', fontSize: 20, color: '#003E9B' }}>+</button>
//           </div>
//         </div>

//         <div style={{ border: '1px solid rgba(0,62,155,0.2)', borderRadius: 12, background: 'rgba(0,62,155,0.03)', padding: 16, marginBottom: 14 }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
//             <Star size={15} color="#003E9B" fill="#003E9B" />
//             <span style={{ fontSize: 13, fontWeight: 800, color: '#003E9B' }}>Order Summary</span>
//           </div>
//           {[
//             ['Fabric',        FABRIC_TYPES.find(f => f.id === fabric)?.label],
//             ['Base Color',    JERSEY_COLORS.find(c => c.code === jerseyColor)?.name],
//             ['Player Name',   showName   ? (playerName   || '—') : 'Hidden'],
//             ['Player Number', showNumber ? `#${playerNumber}`    : 'Hidden'],
//             ['Size',          selectedSize],
//           ].map(([k, v]) => (
//             <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
//               <span style={{ fontSize: 10, color: '#64748B' }}>{k}</span>
//               <span style={{ fontSize: 11, fontWeight: 600, color: '#1E293B' }}>{v}</span>
//             </div>
//           ))}
//           <div style={{ borderTop: '1px solid rgba(0,62,155,0.12)', marginTop: 10, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <span style={{ fontSize: 12, fontWeight: 700 }}>Total ({quantity} unit{quantity > 1 ? 's' : ''})</span>
//             <span style={{ fontSize: 22, fontWeight: 900, color: '#003E9B' }}>
//               ₹{((product?.basePrice || 899) * quantity).toLocaleString()}
//             </span>
//           </div>
//         </div>
//       </>
//     );
//   };

//   // ─────────────────────────────────────────────────────────────────────────
//   // PANEL INNER (tabs + header + content + footer)
//   // ─────────────────────────────────────────────────────────────────────────
//   const panelInner = (
//     <>
//       {/* ── Tabs ── */}
//       <div style={{ display: 'flex', borderBottom: '1px solid #E8ECF0', background: '#fff', flexShrink: 0 }}>
//         {MAIN_TABS.map(tab => {
//           const active = activeTab === tab.id;
//           const Icon   = tab.Icon;
//           return (
//             <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
//               flex: 1, padding: '12px 4px 10px', border: 'none', cursor: 'pointer',
//               borderBottom: `2.5px solid ${active ? '#003E9B' : 'transparent'}`,
//               background: active ? 'rgba(0,62,155,0.05)' : 'transparent',
//               color: active ? '#003E9B' : '#94A3B8',
//               display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
//             }}>
//               <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />
//               <span style={{ fontSize: 9, fontWeight: 700 }}>{tab.label}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* ── Panel Header (FIX #2 — restored) ── */}
//       <div style={{ padding: '10px 16px', borderBottom: '1px solid #E8ECF0', flexShrink: 0, background: '#fff' }}>
//         <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', lineHeight: 1.3 }}>
//           {product?.name || 'Kit Designer'}
//         </div>
//         <div style={{ fontSize: 9, color: '#94A3B8', marginTop: 2 }}>
//           {activeTab === 'style'      && 'Style & Colors'}
//           {activeTab === 'logos'      && 'Logos & Badges'}
//           {activeTab === 'nameNumber' && 'Name & Number'}
//           {activeTab === 'order'      && 'Order Details'}
//         </div>
//       </div>

//       {/* ── Scrollable Content ── */}
//       <div style={{ flex: 1, overflowY: 'auto', padding: '14px', background: '#FAFAFA', paddingBottom: 20 }}>
//         {renderTabContent()}
//       </div>

//       {/* ── Footer Buttons ── */}
//       <div style={{ padding: '12px 14px', borderTop: '1px solid #E8ECF0', background: '#fff', flexShrink: 0 }}>
//         <div style={{ display: 'flex', gap: 10 }}>
//           <button onClick={reset} style={{
//             flex: 1, padding: '11px', borderRadius: 10, border: '1px solid #E2E8F0',
//             background: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#64748B',
//           }}>
//             Reset
//           </button>
//           <button onClick={handleSaveDesign} style={{
//             flex: 2, padding: '11px', borderRadius: 10, border: 'none', cursor: 'pointer',
//             fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//             background: 'linear-gradient(135deg, #0EA5E9, #0284C7, #1E3A8A)', color: '#fff',
//           }}>
//             <Save size={16} /> Add to Cart
//           </button>
//         </div>
//       </div>
//     </>
//   );

//   // ─────────────────────────────────────────────────────────────────────────
//   // LOADING / GUARD
//   // ─────────────────────────────────────────────────────────────────────────
//   if (!mounted) return (
//     <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <div style={{ width: 40, height: 40, border: '3px solid #E2E8F0', borderTopColor: '#003E9B', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//     </div>
//   );

//   if (!product) return (
//     <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
//       <div style={{ width: 40, height: 40, border: '3px solid #E2E8F0', borderTopColor: '#003E9B', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
//       <p style={{ color: '#64748B', fontSize: 14 }}>Loading product…</p>
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//     </div>
//   );

//   const showDesktopSidebar = !isMobile && !isTablet;
//   const configPanelWidth   = isTablet ? 320 : 370;

//   // ─────────────────────────────────────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────────────────────────────────────
//   return (
//     <div style={{
//       display: 'flex',
//       height: 'calc(100vh - 120px)', /* subtract navbar height */
//       minHeight: 500,
//       overflow: 'hidden',
//       background: '#fff',
//       fontFamily: "'Poppins','Segoe UI',sans-serif",
//     }}>

//       {/* ── LEFT: Viewer ── */}
//       <div
//         ref={viewerContainerRef}
//         style={{
//           flex: 1,
//           position: 'relative',
//           background: 'linear-gradient(135deg,#EEF2F7,#E2E8F0)',
//           overflow: 'hidden',
//           height: '100%',
//         }}
//       >
//         {/* ── View Mode Toggle (FIX #1 — zIndex raised to 50, always above navbar) ── */}
//         <div style={{
//           position: 'absolute',
//           top: 14,
//           left: '50%',
//           transform: 'translateX(-50%)',
//           zIndex: 50,               /* ← FIX: was 30, now 50 */
//           display: 'flex',
//           gap: 6,
//           background: 'rgba(0,0,0,0.55)',
//           backdropFilter: 'blur(10px)',
//           padding: '3px',
//           borderRadius: 30,
//         }}>
//           {[
//             { id: 'product', label: isMobile ? '2D' : 'Product View' },
//             { id: 'glb',     label: isMobile ? '3D' : '3D View'      },
//           ].map(v => (
//             <button key={v.id} onClick={() => setViewMode(v.id)} style={{
//               padding: isMobile ? '4px 14px' : '5px 20px',
//               borderRadius: 30,
//               fontSize: isMobile ? 10 : 11,
//               fontWeight: 700,
//               background: viewMode === v.id ? '#fff' : 'transparent',
//               color:      viewMode === v.id ? '#003E9B' : '#fff',
//               border: 'none',
//               cursor: 'pointer',
//               whiteSpace: 'nowrap',
//               transition: 'all 0.2s',
//             }}>
//               {v.label}
//             </button>
//           ))}
//         </div>

//         {/* ── Fullscreen button ── */}
//         <button onClick={handleFullscreen} style={{
//           position: 'absolute', top: 14, right: 14, zIndex: 50,
//           background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
//           padding: 8, borderRadius: 40, border: 'none', cursor: 'pointer',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//         }}>
//           {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
//         </button>

//         {/* ── Front / Back toggle (product view only) ── */}
//         {viewMode === 'product' && (
//           <div style={{
//             position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 50,
//           }}>
//             <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 99, padding: 4, display: 'inline-flex', gap: 4, boxShadow: '0 4px 14px rgba(0,0,0,0.10)' }}>
//               {['front', 'back'].map(v => (
//                 <button key={v} onClick={() => setView(v)} style={{
//                   padding: '8px 26px', borderRadius: 99, fontSize: 10, fontWeight: 700, cursor: 'pointer',
//                   background: view === v ? 'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)' : 'transparent',
//                   border: view === v ? 'none' : '1px solid #003E9B',
//                   color: view === v ? '#fff' : '#003E9B',
//                 }}>
//                   {v.toUpperCase()}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ── 3D GLB Viewer ── */}
//         {viewMode === 'glb' && (
//           <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
//             <GLBViewer
//               glbPath={product?.glbUrl || '/images/jerseys/TSHIRT.glb'}
//               autoRotate={true}
//               backgroundColor="#E2E8F0"
//               jerseyColor={jerseyColor}
//               sleeveColor={sleeveColor}
//               playerName={playerName}
//               playerNumber={playerNumber}
//               nameColor={nameColor}
//               numberColor={numberColor}
//               nameStyleId={nameFont}
//               showText={showName}
//               clubLogo={clubLogo}
//               sponsorLogo={sponsorLogo}
//             />
//           </div>
//         )}

//         {/* ── Product Image View ── */}
//         {viewMode === 'product' && (
//           <div style={{
//             width: '100%', height: '100%',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>
//             <img
//               src={
//                 view === 'front'
//                   ? (product?.mainImage  || '/images/jerseys/jersey-front.png')
//                   : (product?.hoverImage || product?.backImage || product?.mainImage || '/images/jerseys/jersey-back.png')
//               }
//               alt={`Jersey ${view} view`}
//               style={{
//                 maxWidth: '80%', maxHeight: '80%',
//                 objectFit: 'contain',
//                 filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.22))',
//               }}
//               onError={e => { e.target.src = '/images/jerseys/jersey-front.png'; }}
//             />
//             {/* Color tint overlay */}
//             <div style={{
//               position: 'absolute', inset: 0,
//               backgroundColor: jerseyColor, opacity: 0.35,
//               mixBlendMode: 'multiply', pointerEvents: 'none',
//             }} />
//           </div>
//         )}
//       </div>

//       {/* ── RIGHT: Config Panel (desktop) ── */}
//       {showDesktopSidebar && (
//         <div style={{
//           width: configPanelWidth,
//           background: '#fff',
//           borderLeft: '1px solid #E8ECF0',
//           display: 'flex',
//           flexDirection: 'column',
//           overflow: 'hidden',
//           height: '100%',
//           flexShrink: 0,
//         }}>
//           {panelInner}
//         </div>
//       )}

//       {/* ── Mobile / Tablet bottom nav ── */}
//       {(isMobile || isTablet) && (
//         <div style={{
//           position: 'fixed', bottom: 0, left: 0, right: 0,
//           background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)',
//           borderTop: '1px solid #E8ECF0', zIndex: 40,
//           display: 'flex',
//         }}>
//           {MAIN_TABS.map(tab => {
//             const Icon   = tab.Icon;
//             const active = activeTab === tab.id;
//             return (
//               <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileOpen(true); }} style={{
//                 flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
//                 padding: '10px 0', cursor: 'pointer', border: 'none', background: 'transparent',
//                 color: active ? '#003E9B' : '#94A3B8',
//               }}>
//                 <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
//                 <span style={{ fontSize: 8, fontWeight: 700 }}>{tab.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       )}

//       {/* ── Mobile / Tablet bottom sheet ── */}
//       {(isMobile || isTablet) && mobileOpen && (
//         <div style={{ position: 'fixed', inset: 0, zIndex: 300 }}>
//           <div
//             style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }}
//             onClick={() => setMobileOpen(false)}
//           />
//           <div style={{
//             position: 'absolute', bottom: 0, left: 0, right: 0,
//             background: '#fff', borderRadius: '24px 24px 0 0',
//             maxHeight: '82vh', display: 'flex', flexDirection: 'column',
//           }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #E8ECF0' }}>
//               <span style={{ fontSize: 16, fontWeight: 800, color: '#000' }}>Customize</span>
//               <button onClick={() => setMobileOpen(false)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
//                 <X size={14} />
//               </button>
//             </div>
//             <div style={{ flex: 1, overflow: 'auto' }}>{panelInner}</div>
//           </div>
//         </div>
//       )}

//       <style jsx global>{`
//         @keyframes spin { to { transform: rotate(360deg); } }
//         * { box-sizing: border-box; }
//         button { transition: all 0.18s ease; }
//         button:hover { opacity: 0.9; }
//         button:active { transform: scale(0.97); }
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 10px; }
//         ::-webkit-scrollbar-thumb { background: linear-gradient(135deg,#0EA5E9,#0284C7); border-radius: 10px; }
//         input[type=range] { cursor: pointer; }
//         input:focus { outline: 2px solid rgba(0,62,155,0.4); outline-offset: 2px; }
//       `}</style>
//     </div>
//   );
// }










'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Upload, ChevronDown, Save, Check, Trash2,
  Type, Shield, Paintbrush, ShoppingBag,
  X, Star, Maximize2, Minimize2,
} from 'lucide-react';
import GLBViewer from '../common/GLBViewer';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/features/cart/cartThunks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSearchParams } from "next/navigation";
import axiosClient from "@/lib/axios";
import { saveCustomizationAPI } from "@/services/customizationService";

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────
const JERSEY_COLORS = [
  { name: 'Obsidian',   code: '#111111' }, { name: 'Crimson',    code: '#DC2626' },
  { name: 'Deep Navy',  code: '#1D3557' }, { name: 'Royal Blue', code: '#1E40AF' },
  { name: 'Emerald',    code: '#059669' }, { name: 'Gold',       code: '#D97706' },
  { name: 'Pure White', code: '#FFFFFF' }, { name: 'Black',      code: '#000000' },
  { name: 'Purple',     code: '#7C3AED' }, { name: 'Orange',     code: '#EA580C' },
  { name: 'Teal',       code: '#0D9488' }, { name: 'Sky Blue',   code: '#0EA5E9' },
];

const SLEEVE_COLORS = [
  { name: 'Obsidian',   code: '#111111' }, { name: 'Crimson',    code: '#DC2626' },
  { name: 'Deep Navy',  code: '#1D3557' }, { name: 'Pure White', code: '#FFFFFF' },
  { name: 'Royal Blue', code: '#1E40AF' }, { name: 'Gold',       code: '#D97706' },
  { name: 'Emerald',    code: '#059669' }, { name: 'Black',      code: '#000000' },
];

const TEXT_COLORS = [
  '#FFFFFF', '#000000', '#EA580C', '#DC2626',
  '#1D3557', '#F59E0B', '#FFFF00', '#00FF88',
  '#7C3AED', '#EC4899', '#0EA5E9', '#059669',
  '#7C3AED', '#EC4899', '#0EA5E9', '#D97706',
  '#EA580C', '#94A3B8',
];

const FONT_STYLES = [
  { id: 'collegiate', label: 'COLLEGIATE', fontFamily: '"Russo One", sans-serif',        canvasFont: 'Russo One',        fontWeight: '400' },
  { id: 'block',      label: 'BLOCK',      fontFamily: '"Bebas Neue", sans-serif',        canvasFont: 'Bebas Neue',       fontWeight: '400' },
  { id: 'varsity',    label: 'VARSITY',    fontFamily: '"Teko", sans-serif',              canvasFont: 'Teko',             fontWeight: '700' },
  { id: 'sport',      label: 'SPORT',      fontFamily: '"Oswald", sans-serif',            canvasFont: 'Oswald',           fontWeight: '700' },
  { id: 'modern',     label: 'MODERN',     fontFamily: '"Barlow Condensed", sans-serif',  canvasFont: 'Barlow Condensed', fontWeight: '800' },
  { id: 'script',     label: 'SCRIPT',     fontFamily: '"Dancing Script", cursive',       canvasFont: 'Dancing Script',   fontWeight: '700' },
  { id: 'stencil',    label: 'STENCIL',    fontFamily: '"Archivo Black", sans-serif',     canvasFont: 'Archivo Black',    fontWeight: '900' },
  { id: 'condensed',  label: 'CONDENSED',  fontFamily: '"Fjalla One", sans-serif',        canvasFont: 'Fjalla One',       fontWeight: '400' },
  { id: 'brush',      label: 'BRUSH',      fontFamily: '"Permanent Marker", cursive',     canvasFont: 'Permanent Marker', fontWeight: '400' },
];

const NAME_STYLES = [
  { id: 'none',     label: 'None'     },
  { id: 'straight', label: 'Straight' },
  { id: 'curved',   label: 'Curved'   },
];

const FABRIC_TYPES = [
  { id: 'climatech', label: 'ClimateTech Pro', desc: 'UV protection & elite moisture management' },
  { id: 'coolweave', label: 'CoolWeave Lite',  desc: 'Lightweight breathable performance fabric' },
  { id: 'dryfit',    label: 'DriFit Ultra',    desc: 'Maximum sweat-wicking & comfort' },
  { id: 'interlock', label: 'Interlock Knit',  desc: 'Durable two-layer knit for heavy use' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

const MAIN_TABS = [
  { id: 'style',      label: 'Style',         Icon: Paintbrush  },
  { id: 'logos',      label: 'Logos',         Icon: Shield      },
  { id: 'nameNumber', label: 'Name & Number', Icon: Type        },
  { id: 'order',      label: 'Order',         Icon: ShoppingBag },
];

const isLight = (hex) => {
  if (!hex) return true;
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
};

const getFontObj = (id) => FONT_STYLES.find(f => f.id === id) || FONT_STYLES[0];

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS TEXT OVERLAY — draws name (straight or curved) + number in real-time
// ─────────────────────────────────────────────────────────────────────────────
function TextOverlay({
  containerRef,
  playerName, showName, nameFont, nameColor, nameStyle,
  playerNumber, showNumber, numberFont, numberColor, textEffect,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = containerRef?.current;
    if (!canvas || !parent) return;

    const { width, height } = parent.getBoundingClientRect();
    canvas.width  = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    const applyEffect = (ctx, color, effect) => {
      ctx.shadowBlur    = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle     = color;
      if (effect === 'outline') {
        ctx.strokeStyle = isLight(color) ? '#000' : '#fff';
        ctx.lineWidth   = 3;
      } else if (effect === 'shadow') {
        ctx.shadowColor   = 'rgba(0,0,0,0.65)';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur    = 7;
      }
    };

    const cx = width * 0.5;

    // ── Draw Name ──────────────────────────────────────────────────────────────
    if (showName && playerName && nameStyle !== 'none') {
      const fo       = getFontObj(nameFont);
      const fontSize = Math.round(width * 0.048);
      const nameY    = height * 0.26;

      applyEffect(ctx, nameColor, textEffect);

      if (nameStyle === 'curved') {
        // Arc sweeps upward across the back-neck area
        const radius = width * 0.30;
        const arcCY  = nameY + radius * 0.52; // arc center sits below the nameY
        const chars  = playerName.split('');
        const totalAngleDeg = Math.min(chars.length * 11, 100);
        const totalAngleRad = (totalAngleDeg * Math.PI) / 180;
        // start at top of arc (270° = -π/2) and distribute chars evenly
        const startAngle = -Math.PI / 2 - totalAngleRad / 2;
        const step       = chars.length > 1 ? totalAngleRad / (chars.length - 1) : 0;

        ctx.font         = `${fo.fontWeight} ${fontSize}px ${fo.canvasFont}, sans-serif`;
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';

        chars.forEach((char, i) => {
          const angle = startAngle + i * step;
          const x = cx + radius * Math.cos(angle);
          const y = arcCY + radius * Math.sin(angle);
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle + Math.PI / 2);
          if (textEffect === 'outline') ctx.strokeText(char, 0, 0);
          ctx.fillText(char, 0, 0);
          ctx.restore();
        });
      } else {
        // straight
        ctx.font         = `${fo.fontWeight} ${fontSize}px ${fo.canvasFont}, sans-serif`;
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        if (textEffect === 'outline') ctx.strokeText(playerName, cx, nameY);
        ctx.fillText(playerName, cx, nameY);
      }
    }

    // ── Draw Number ────────────────────────────────────────────────────────────
    if (showNumber && playerNumber) {
      const fo       = getFontObj(numberFont);
      const fontSize = Math.round(width * 0.14);
      const numY     = height * 0.52;

      // Reset shadow/effect before drawing number
      applyEffect(ctx, numberColor, textEffect);
      ctx.font         = `${fo.fontWeight} ${fontSize}px ${fo.canvasFont}, sans-serif`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      if (textEffect === 'outline') ctx.strokeText(playerNumber, cx, numY);
      ctx.fillText(playerNumber, cx, numY);
    }
  }, [
    playerName, showName, nameFont, nameColor, nameStyle,
    playerNumber, showNumber, numberFont, numberColor, textEffect, containerRef,
  ]);

  // Redraw on resize
  useEffect(() => {
    const parent = containerRef?.current;
    if (!parent) return;
    const ro = new ResizeObserver(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const { width, height } = parent.getBoundingClientRect();
        canvas.width  = width;
        canvas.height = height;
        // Trigger re-draw by calling the draw effect (simulate dep change)
        // Since ResizeObserver doesn't trigger useState, we force canvas clear
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
      }
    });
    ro.observe(parent);
    return () => ro.disconnect();
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function JerseyCustomizer({ product }) {
  const router   = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(s => s.auth);

  const [mounted,      setMounted]      = useState(false);
  const [activeTab,    setActiveTab]    = useState('style');
  const [view,         setView]         = useState('front');
  const [viewMode,     setViewMode]     = useState('product');
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
const [sizeQuantities, setSizeQuantities] = useState({
  XS: 0,
  S: 0,
  M: 0,
  L: 0,
  XL: 0,
  XXL: 0,
  "3XL": 0,
  "4XL": 0,
});
  const [isMobile,     setIsMobile]     = useState(false);
  const [isTablet,     setIsTablet]     = useState(false);

  // Style
  const [jerseyColor, setJerseyColor] = useState('#1E40AF');
  const [sleeveColor, setSleeveColor] = useState('#111111');
  const [collarColor, setCollarColor] = useState('#DC2626');
  const [fabric,      setFabric]      = useState('climatech');

  // Logos
  const [clubLogo,    setClubLogo]    = useState(null);
  const [sponsorLogo, setSponsorLogo] = useState(null);

  // Name & Number
  const [playerName,   setPlayerName]   = useState('PLAYER');
  const [playerNumber, setPlayerNumber] = useState('10');
  const [nameStyle,    setNameStyle]    = useState('straight');
  const [nameFont,     setNameFont]     = useState('collegiate');
  const [nameColor,    setNameColor]    = useState('#FFFFFF');
  const [numberFont,   setNumberFont]   = useState('block');
  const [numberColor,  setNumberColor]  = useState('#F59E0B');
  const [showName,     setShowName]     = useState(true);
  const [showNumber,   setShowNumber]   = useState(true);
  const [textEffect,   setTextEffect]   = useState('none');

  // Accordions
  const [fabricOpen,  setFabricOpen]  = useState(true);
  const [baseOpen,    setBaseOpen]    = useState(true);
  const [sleeveOpen,  setSleeveOpen]  = useState(false);
  const [collarOpen,  setCollarOpen]  = useState(false);
  const [clubOpen,    setClubOpen]    = useState(true);
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [nameOpen,    setNameOpen]    = useState(true);
  const [numberOpen,  setNumberOpen]  = useState(false);

  const viewerContainerRef = useRef(null);

  const searchParams = useSearchParams();

const customizationId =
  searchParams.get("customizationId");



  useEffect(() => {
  if (!customizationId) return;

  const fetchCustomization = async () => {
    try {
      const res = await axiosClient.get(
        `/v1/user/customization/${customizationId}`
      );

      const data = res.data?.data;

      if (!data) return;

      // ✅ Sizes
      const sizeObj = {
        XS: 0,
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0,
        "3XL": 0,
        "4XL": 0,
      };

      (data.sizes || []).forEach((s) => {
        sizeObj[s.size] = s.quantity;
      });

      setSizeQuantities(sizeObj);

      // ✅ Customization fields
      const getField = (name) =>
        data.customization.find(
          (c) => c.fieldName === name
        )?.value;

        setClubLogo(
  getField("logo") || null
);

setSponsorLogo(
  getField("sponsor") || null
);

      setJerseyColor(
        getField("jerseyColor") || "#1E40AF"
      );

      setSleeveColor(
        getField("sleeveColor") || "#111111"
      );

      setCollarColor(
        getField("collarColor") || "#DC2626"
      );

      setPlayerName(
        getField("playerName") || "PLAYER"
      );

      setPlayerNumber(
        getField("playerNumber") || "10"
      );

      setFabric(
        getField("fabric") || "climatech"
      );

      setNameFont(
        getField("nameFont") || "collegiate"
      );

      setNameColor(
        getField("nameColor") || "#FFFFFF"
      );

      setNumberFont(
        getField("numberFont") || "block"
      );

      setNumberColor(
        getField("numberColor") || "#F59E0B"
      );

      setNameStyle(
        getField("nameStyle") || "straight"
      );

      setTextEffect(
        getField("textEffect") || "none"
      );

    } catch (err) {
      console.error(err);
    }
  };

  fetchCustomization();
}, [customizationId]);

  useEffect(() => {
    const checkSize = () => { setIsMobile(window.innerWidth < 768); setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024); };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const fn = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fn);
    return () => document.removeEventListener('fullscreenchange', fn);
  }, []);

const handleUpload = useCallback((setter) => (e) => {
  const file = e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith('image/')) {
    toast.error('Please upload an image');
    return;
  }

  if (file.size > 8 * 1024 * 1024) {
    toast.error('Max file size 8 MB');
    return;
  }

  setter(file);
}, []);

  // const handleSaveDesign = () => {
  //   if (!product) { toast.error('Product not loaded'); return; }
  //   dispatch(addToCart({
  //     productId: product?.id, name: product?.name, price: product?.price || 899,
  //     size: selectedSize, quantity, jerseyColor, sleeveColor, collarColor,
  //     playerName: showName ? playerName : '', playerNumber: showNumber ? playerNumber : '',
  //   }));
  //   toast.success('Design saved to cart!');
  // };


const handleSaveDesign = async () => {

  if (!product) {
    toast.error("Product not loaded");
    return;
  }

  // ✅ Convert sizes
  const sizes = Object.entries(sizeQuantities)
    .filter(([_, qty]) => qty > 0)
    .map(([size, qty]) => ({
      size,
      quantity: qty,
    }));

  // ✅ Validation
  if (sizes.length === 0) {
    toast.error(
      "Please select at least one size"
    );
    return;
  }

  try {

    // =========================
    // ✅ SAVE / UPDATE CUSTOMIZATION
    // =========================
    const customizationRes =
      await saveCustomizationAPI({

        productId:
          product?._id || product?.id,

        // 🔥 IMPORTANT
        customizationId,

        customization: [
          {
            zoneKey: "jersey",
            fieldName: "jerseyColor",
            value: String(jerseyColor),
          },
          {
            zoneKey: "jersey",
            fieldName: "sleeveColor",
            value: String(sleeveColor),
          },
          {
            zoneKey: "jersey",
            fieldName: "collarColor",
            value: String(collarColor),
          },
          {
            zoneKey: "jersey",
            fieldName: "playerName",
            value: showName
              ? String(playerName)
              : "",
          },
          {
            zoneKey: "jersey",
            fieldName: "playerNumber",
            value: showNumber
              ? String(playerNumber)
              : "",
          },
          {
            zoneKey: "jersey",
            fieldName: "fabric",
            value: String(fabric),
          },
          {
            zoneKey: "jersey",
            fieldName: "nameFont",
            value: String(nameFont),
          },
          {
            zoneKey: "jersey",
            fieldName: "nameColor",
            value: String(nameColor),
          },
          {
            zoneKey: "jersey",
            fieldName: "numberFont",
            value: String(numberFont),
          },
          {
            zoneKey: "jersey",
            fieldName: "numberColor",
            value: String(numberColor),
          },
          {
            zoneKey: "jersey",
            fieldName: "nameStyle",
            value: String(nameStyle),
          },
          {
            zoneKey: "jersey",
            fieldName: "textEffect",
            value: String(textEffect),
          },
        ],

        // ✅ LOGOS
        clubLogo,
        sponsorLogo,
      });

    // =========================
    // ✅ FINAL CUSTOMIZATION ID
    // =========================
    const finalCustomizationId =
      customizationRes?.data?._id;

    // =========================
    // ✅ ADD TO CART
    // =========================
    const result = await dispatch(
      addToCart({
        customizationId:
          finalCustomizationId,
        sizes,
      })
    ).unwrap();

    console.log(
      "✅ Add to cart success:",
      result
    );

    toast.success(
      `${product?.name} added to cart!`
    );

  } catch (error) {

    console.error(
      "❌ Add to cart failed:",
      error
    );

    toast.error(
      error || "Failed to add to cart"
    );
  }
};

  const reset = () => {
    setJerseyColor('#1E40AF'); setSleeveColor('#111111'); setCollarColor('#DC2626');
    setFabric('climatech'); setClubLogo(null); setSponsorLogo(null);
    setPlayerName('PLAYER'); setPlayerNumber('10');
    setNameStyle('straight'); setNameFont('collegiate'); setNameColor('#FFFFFF');
    setNumberFont('block'); setNumberColor('#F59E0B');
    setShowName(true); setShowNumber(true); setTextEffect('none');
    // setSelectedSize('L'); setQuantity(1);
    setSizeQuantities({
  XS: 0,
  S: 0,
  M: 0,
  L: 0,
  XL: 0,
  XXL: 0,
  "3XL": 0,
  "4XL": 0,
});
    toast.success('Reset complete');
  };

  const handleFullscreen = async () => {
    const el = viewerContainerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) await el.requestFullscreen();
      else await document.exitFullscreen();
    } catch (err) { console.error(err); }
  };

  // ─── UI ATOMS ─────────────────────────────────────────────────────────────────

  const Section = ({ title, badge, open, onToggle, children }) => (
    <div style={{ background: '#fff', borderRadius: 12, marginBottom: 10, overflow: 'hidden', border: `1px solid ${open ? 'rgba(0,62,155,0.2)' : '#E8ECF0'}`, boxShadow: open ? '0 2px 14px rgba(0,62,155,0.07)' : 'none' }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', border: 'none', cursor: 'pointer', background: open ? 'rgba(0,62,155,0.04)' : '#FAFAFA' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: open ? '#003E9B' : '#334155' }}>{title}</span>
          {badge && <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 12, background: 'rgba(0,62,155,0.10)', color: '#003E9B', fontWeight: 700 }}>{badge}</span>}
        </div>
        <ChevronDown size={14} color={open ? '#003E9B' : '#94A3B8'} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {open && <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 13 }}>{children}</div>}
    </div>
  );

  const ColorGrid = ({ colors, selected, onSelect, pickerId }) => (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${isMobile ? 6 : 8},1fr)`, gap: 7, marginBottom: 10 }}>
        {colors.map(c => {
          const code = typeof c === 'string' ? c : c.code;
          const name = typeof c === 'string' ? c : c.name;
          const sel  = selected === code;
          return (
            <button key={code} title={name} onClick={() => onSelect(code)} style={{ width: '100%', aspectRatio: '1', borderRadius: 8, cursor: 'pointer', border: `2.5px solid ${sel ? '#003E9B' : '#E2E8F0'}`, backgroundColor: code, position: 'relative', transform: sel ? 'scale(1.12)' : 'scale(1)', transition: 'all 0.15s', boxShadow: sel ? '0 0 0 3px rgba(0,62,155,0.22)' : 'none' }}>
              {sel && <Check size={9} strokeWidth={3.5} color={isLight(code) ? '#000' : '#fff'} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, border: '2px dashed #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#94A3B8' }}>≡</div>
        <div style={{ position: 'relative', width: 34, height: 34, borderRadius: 8, border: '2px solid #E2E8F0', overflow: 'hidden', background: selected }}>
          <input type="color" id={pickerId} value={selected} onChange={e => onSelect(e.target.value)} style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer', border: 'none' }} />
        </div>
        <label htmlFor={pickerId} style={{ fontSize: 10, color: '#94A3B8', cursor: 'pointer' }}>Custom picker</label>
      </div>
    </div>
  );

  const TextColorGrid = ({ colors, selected, onSelect, pickerId }) => (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9,1fr)', gap: 6, marginBottom: 10 }}>
        {colors.map((c, i) => {
          const sel = selected === c;
          return (
            <button key={i} onClick={() => onSelect(c)} style={{ width: '100%', aspectRatio: '1', borderRadius: 7, cursor: 'pointer', border: `2px solid ${sel ? '#003E9B' : '#E2E8F0'}`, backgroundColor: c, position: 'relative', transform: sel ? 'scale(1.12)' : 'scale(1)', transition: 'all 0.15s', boxShadow: sel ? '0 0 0 3px rgba(0,62,155,0.22)' : 'none' }}>
              {sel && <Check size={8} strokeWidth={3.5} color={isLight(c) ? '#000' : '#fff'} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: 7, border: '2px dashed #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#94A3B8' }}>≡</div>
        <div style={{ position: 'relative', width: 30, height: 30, borderRadius: 7, border: '2px solid #E2E8F0', overflow: 'hidden', background: selected }}>
          <input type="color" id={pickerId} value={selected} onChange={e => onSelect(e.target.value)} style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer', border: 'none' }} />
        </div>
        <label htmlFor={pickerId} style={{ fontSize: 10, color: '#94A3B8', cursor: 'pointer' }}>Custom picker</label>
      </div>
    </div>
  );

  const UploadSlot = ({ label, hint, state, setter, uid }) => (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 6 }}>{label}</div>
      {state ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
          <img
  src={
    typeof state === "string"
      ? state
      : URL.createObjectURL(state)
  }
  alt={label}
  style={{
    maxHeight: 56,
    maxWidth: 110,
    objectFit: "contain",
  }}
/>
          <button onClick={() => setter(null)} style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', borderRadius: 7, padding: '5px 10px', cursor: 'pointer', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Trash2 size={12} /> Remove
          </button>
        </div>
      ) : (
        <button onClick={() => document.getElementById(uid)?.click()} style={{ width: '100%', padding: '16px', border: '2px dashed #CBD5E1', borderRadius: 10, cursor: 'pointer', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 11, fontWeight: 700, color: '#475569' }}>
          <Upload size={15} /> Upload Image
        </button>
      )}
      {hint && <p style={{ fontSize: 9, color: '#64748B', marginTop: 5 }}>{hint}</p>}
      <input id={uid} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload(setter)} />
    </div>
  );

  const Toggle = ({ label, value, onChange }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>{label}</span>
      <button onClick={() => onChange(!value)} style={{ width: 42, height: 22, borderRadius: 99, cursor: 'pointer', position: 'relative', border: 'none', background: value ? '#003E9B' : '#CBD5E1', transition: 'background 0.22s' }}>
        <span style={{ position: 'absolute', top: 2, left: value ? 20 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.22s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }} />
      </button>
    </div>
  );

  // ── Name Style Cards — SVG shows ACTUAL curved/straight preview ──
  const NameStyleSelect = ({ selected, onSelect, sampleText, sampleFontId }) => {
    const fo          = getFontObj(sampleFontId);
    const displayText = (sampleText || 'NAME').slice(0, 8);
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
        {NAME_STYLES.map(ns => {
          const isSel = selected === ns.id;
          const col   = isSel ? '#003E9B' : '#334155';
          return (
            <button key={ns.id} onClick={() => onSelect(ns.id)} style={{ padding: '10px 6px 8px', borderRadius: 10, cursor: 'pointer', border: `2px solid ${isSel ? '#003E9B' : '#E2E8F0'}`, background: isSel ? 'rgba(0,62,155,0.07)' : '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minHeight: 80 }}>

              {/* ── SVG preview per style ── */}
              <svg viewBox="0 0 84 38" width="84" height="38" style={{ overflow: 'visible' }}>
                {ns.id === 'none' && (
                  <>
                    <circle cx="42" cy="19" r="14" fill="none" stroke={isSel ? '#003E9B' : '#CBD5E1'} strokeWidth="2" />
                    <line x1="30" y1="29" x2="54" y2="9" stroke={isSel ? '#003E9B' : '#CBD5E1'} strokeWidth="2.5" strokeLinecap="round" />
                  </>
                )}
                {ns.id === 'straight' && (
                  <text x="42" y="24" textAnchor="middle" fontFamily={`${fo.canvasFont}, sans-serif`} fontWeight={fo.fontWeight} fontSize="15" fill={col}>
                    {displayText}
                  </text>
                )}
                {ns.id === 'curved' && (
                  <>
                    {/* Upward arc — same geometry used in the canvas overlay */}
                    <path id={`arc-prev-${ns.id}`} d="M 6,32 Q 42,4 78,32" fill="none" />
                    <text fontFamily={`${fo.canvasFont}, sans-serif`} fontWeight={fo.fontWeight} fontSize="13" fill={col}>
                      <textPath href={`#arc-prev-${ns.id}`} startOffset="50%" textAnchor="middle">
                        {displayText}
                      </textPath>
                    </text>
                  </>
                )}
              </svg>

              <span style={{ fontSize: 9, fontWeight: 700, color: isSel ? '#003E9B' : '#64748B' }}>{ns.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // ── Font Style Cards — renders PLAYER in actual loaded font ──
  const FontStyleCards = ({ selected, onSelect }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
      {FONT_STYLES.map(font => (
        <button key={font.id} onClick={() => onSelect(font.id)} style={{ padding: '10px 6px 8px', borderRadius: 10, cursor: 'pointer', border: `2px solid ${selected === font.id ? '#003E9B' : '#E2E8F0'}`, background: selected === font.id ? 'rgba(0,62,155,0.07)' : '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minHeight: 72 }}>
          <span style={{ fontFamily: font.fontFamily, fontWeight: font.fontWeight, fontSize: 13, color: selected === font.id ? '#003E9B' : '#1E293B', letterSpacing: 0.5, lineHeight: 1.2 }}>PLAYER</span>
          <span style={{ fontSize: 8, fontWeight: 700, color: selected === font.id ? '#003E9B' : '#94A3B8', letterSpacing: 0.8 }}>{font.label}</span>
        </button>
      ))}
    </div>
  );

  const TextEffectSelect = ({ selected, onSelect }) => (
    <div style={{ display: 'flex', gap: 8 }}>
      {['none', 'outline', 'shadow'].map(ef => (
        <button key={ef} onClick={() => onSelect(ef)} style={{ flex: 1, padding: '8px 4px', borderRadius: 9, fontSize: 10, fontWeight: 700, background: selected === ef ? '#003E9B' : '#F3F4F6', color: selected === ef ? '#fff' : '#374151', border: `1.5px solid ${selected === ef ? '#003E9B' : '#E2E8F0'}`, cursor: 'pointer', textTransform: 'capitalize' }}>{ef}</button>
      ))}
    </div>
  );

  // ─── TAB CONTENT ─────────────────────────────────────────────────────────────
  const renderTabContent = () => {
    if (activeTab === 'style') return (
      <>
        <Section title="Fabric Technology" open={fabricOpen} onToggle={() => setFabricOpen(v => !v)} badge={FABRIC_TYPES.find(f => f.id === fabric)?.label}>
          {FABRIC_TYPES.map(f => (
            <button key={f.id} onClick={() => setFabric(f.id)} style={{ padding: '11px 14px', borderRadius: 10, cursor: 'pointer', textAlign: 'left', width: '100%', border: `2px solid ${fabric === f.id ? '#003E9B' : '#E2E8F0'}`, background: fabric === f.id ? 'rgba(0,62,155,0.07)' : '#F8FAFC' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: fabric === f.id ? '#003E9B' : '#334155' }}>{f.label}</div>
              <div style={{ fontSize: 9, color: '#64748B', marginTop: 3 }}>{f.desc}</div>
            </button>
          ))}
        </Section>
        <Section title="Base Colour" open={baseOpen} onToggle={() => setBaseOpen(v => !v)} badge={JERSEY_COLORS.find(c => c.code === jerseyColor)?.name || jerseyColor}>
          <ColorGrid colors={JERSEY_COLORS} selected={jerseyColor} onSelect={setJerseyColor} pickerId="base-cp" />
        </Section>
        <Section title="Sleeve Colour" open={sleeveOpen} onToggle={() => setSleeveOpen(v => !v)} badge={SLEEVE_COLORS.find(c => c.code === sleeveColor)?.name || sleeveColor}>
          <ColorGrid colors={SLEEVE_COLORS} selected={sleeveColor} onSelect={setSleeveColor} pickerId="sleeve-cp" />
          <button onClick={() => setSleeveColor(jerseyColor)} style={{ fontSize: 10, fontWeight: 700, color: '#003E9B', background: 'rgba(0,62,155,0.08)', border: '1px solid rgba(0,62,155,0.25)', borderRadius: 8, padding: '9px', cursor: 'pointer', width: '100%' }}>↔ Match Base Colour</button>
        </Section>
        <Section title="Collar Colour" open={collarOpen} onToggle={() => setCollarOpen(v => !v)} badge={JERSEY_COLORS.find(c => c.code === collarColor)?.name || collarColor}>
          <ColorGrid colors={JERSEY_COLORS} selected={collarColor} onSelect={setCollarColor} pickerId="collar-cp" />
          <button onClick={() => setCollarColor(jerseyColor)} style={{ fontSize: 10, fontWeight: 700, color: '#003E9B', background: 'rgba(0,62,155,0.08)', border: '1px solid rgba(0,62,155,0.25)', borderRadius: 8, padding: '9px', cursor: 'pointer', width: '100%' }}>↔ Match Base Colour</button>
        </Section>
      </>
    );

    if (activeTab === 'logos') return (
      <>
        <Section title="Club Badge" open={clubOpen} onToggle={() => setClubOpen(v => !v)}>
          <UploadSlot label="Club / Team Badge (Front)" hint="PNG transparent bg, min 300×300px" state={clubLogo} setter={setClubLogo} uid="up-club" />
        </Section>
        <Section title="Sponsor Logo" open={sponsorOpen} onToggle={() => setSponsorOpen(v => !v)}>
          <UploadSlot label="Sponsor Logo (Center Chest)" hint="PNG/SVG transparent bg, min 600×200px" state={sponsorLogo} setter={setSponsorLogo} uid="up-sponsor" />
        </Section>
        <div style={{ padding: '12px 14px', background: '#FFF7ED', borderRadius: 10, border: '1px solid #FED7AA' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#C2410C', marginBottom: 5 }}>📋 Logo Print Guidelines</div>
          <div style={{ fontSize: 10, color: '#9A3412', lineHeight: 1.7 }}>• PNG/SVG with <b>transparent background</b> preferred<br />• Minimum <b>300 DPI</b> for crisp sublimation print<br />• Max file size: <b>8 MB</b></div>
        </div>
      </>
    );

    if (activeTab === 'nameNumber') return (
      <>
        <Section title="Player Name" open={nameOpen} onToggle={() => setNameOpen(v => !v)}>
          <Toggle label="Show Player Name" value={showName} onChange={setShowName} />
          {showName && (
            <>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 6 }}>Name Text</div>
                <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value.toUpperCase())} maxLength={22} placeholder="PLAYER NAME" style={{ width: '100%', padding: '11px 13px', border: '1.5px solid #E2E8F0', borderRadius: 9, fontSize: 13, fontWeight: 700, color: '#000', boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 8 }}>Name Style</div>
                {/* Cards now show ACTUAL curved SVG arc using the currently selected font */}
                <NameStyleSelect selected={nameStyle} onSelect={setNameStyle} sampleText={playerName || 'NAME'} sampleFontId={nameFont} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 8 }}>Font Style</div>
                <FontStyleCards selected={nameFont} onSelect={setNameFont} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 7 }}>Name Color</div>
                <TextColorGrid colors={TEXT_COLORS} selected={nameColor} onSelect={setNameColor} pickerId="name-cp" />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 7 }}>Text Effect</div>
                <TextEffectSelect selected={textEffect} onSelect={setTextEffect} />
              </div>
            </>
          )}
        </Section>
        <Section title="Player Number" open={numberOpen} onToggle={() => setNumberOpen(v => !v)}>
          <Toggle label="Show Player Number" value={showNumber} onChange={setShowNumber} />
          {showNumber && (
            <>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 6 }}>Number</div>
                <input type="text" value={playerNumber} onChange={e => setPlayerNumber(e.target.value)} maxLength={2} placeholder="10" style={{ width: '100%', padding: '11px 13px', border: '1.5px solid #E2E8F0', borderRadius: 9, fontSize: 13, fontWeight: 700, color: '#000', boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 8 }}>Font Style</div>
                <FontStyleCards selected={numberFont} onSelect={setNumberFont} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 7 }}>Number Color</div>
                <TextColorGrid colors={TEXT_COLORS} selected={numberColor} onSelect={setNumberColor} pickerId="num-cp" />
              </div>
            </>
          )}
        </Section>
        <div style={{ padding: '10px 14px', background: '#EFF6FF', borderRadius: 10, border: '1px solid #BFDBFE' }}>
          <div style={{ fontSize: 10, color: '#1D4ED8', fontWeight: 600 }}>✦ Name & number update live in <b>Product View</b>. Switch to <b>3D View</b> for full model preview.</div>
        </div>
      </>
    );

    return (
      <>
        <div style={{ padding: '10px 12px', background: '#F0FDF4', borderRadius: 10, marginBottom: 12, fontSize: 11, color: '#166534', fontWeight: 600 }}>Design ready! Complete the details below.</div>
        <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
  <div
    style={{
      fontSize: 11,
      fontWeight: 700,
      marginBottom: 12,
      color: "#000",
    }}
  >
    Select Sizes & Quantities
  </div>

  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {SIZES.map((size) => (
      <div
        key={size}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 14px",
          border: "1px solid #E2E8F0",
          borderRadius: "10px",
          background: "#fff",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 12,
            color: "#003E9B",
          }}
        >
          {size}
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <button
            onClick={() =>
              setSizeQuantities((prev) => ({
                ...prev,
                [size]: Math.max(0, prev[size] - 1),
              }))
            }
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1px solid #003E9B",
              background: "#fff",
              cursor: "pointer",
              fontSize: 18,
              color: "#003E9B",
            }}
          >
            −
          </button>

          <span
            style={{
              minWidth: 20,
              textAlign: "center",
              fontWeight: 700,
              color: "#003E9B",
            }}
          >
            {sizeQuantities[size]}
          </span>

          <button
            onClick={() =>
              setSizeQuantities((prev) => ({
                ...prev,
                [size]: prev[size] + 1,
              }))
            }
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1px solid #003E9B",
              background: "#fff",
              cursor: "pointer",
              fontSize: 18,
              color: "#003E9B",
            }}
          >
            +
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
        </div>
        {/* <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 9, color: '#000' }}>Quantity</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#F8FAFC', padding: '8px 16px', borderRadius: 10, justifyContent: 'center' }}>
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 38, height: 38, borderRadius: 8, background: '#fff', border: '1px solid #E2E8F0', cursor: 'pointer', fontSize: 20, color: '#003E9B' }}>−</button>
            <span style={{ fontSize: 22, fontWeight: 900, minWidth: 64, textAlign: 'center', color: '#003E9B' }}>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} style={{ width: 38, height: 38, borderRadius: 8, background: '#fff', border: '1px solid #E2E8F0', cursor: 'pointer', fontSize: 20, color: '#003E9B' }}>+</button>
          </div>
        </div> */}
        <div style={{ border: '1px solid rgba(0,62,155,0.2)', borderRadius: 12, background: 'rgba(0,62,155,0.03)', padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Star size={15} color="#003E9B" fill="#003E9B" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#003E9B' }}>Order Summary</span>
          </div>
          {[
            ['Fabric',        FABRIC_TYPES.find(f => f.id === fabric)?.label],
            ['Base Color',    JERSEY_COLORS.find(c => c.code === jerseyColor)?.name || jerseyColor],
            ['Collar Color',  JERSEY_COLORS.find(c => c.code === collarColor)?.name || collarColor],
            ['Player Name',   showName   ? (playerName   || '—') : 'Hidden'],
            ['Player Number', showNumber ? `#${playerNumber}`    : 'Hidden'],
           [
  'Sizes',
  Object.entries(sizeQuantities)
    .filter(([_, qty]) => qty > 0)
    .map(([size, qty]) => `${size} × ${qty}`)
    .join(', ') || '—'
],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 10, color: '#64748B' }}>{k}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#1E293B' }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(0,62,155,0.12)', marginTop: 10, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700 }}>
  Total (
  {
    Object.values(sizeQuantities)
      .reduce((a, b) => a + b, 0)
  }
  {' '}units)
</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#003E9B' }}>₹{(
  (product?.basePrice || 899) *
  Object.values(sizeQuantities).reduce((a, b) => a + b, 0)
).toLocaleString()}</span>
          </div>
        </div>
      </>
    );
  };

  // ─── PANEL ────────────────────────────────────────────────────────────────────
  const panelInner = (
    <>
      <div style={{ display: 'flex', borderBottom: '1px solid #E8ECF0', background: '#fff', flexShrink: 0 }}>
        {MAIN_TABS.map(tab => {
          const active = activeTab === tab.id;
          const Icon   = tab.Icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: '12px 4px 10px', border: 'none', cursor: 'pointer', borderBottom: `2.5px solid ${active ? '#003E9B' : 'transparent'}`, background: active ? 'rgba(0,62,155,0.05)' : 'transparent', color: active ? '#003E9B' : '#94A3B8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />
              <span style={{ fontSize: 9, fontWeight: 700 }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #E8ECF0', flexShrink: 0, background: '#fff' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', lineHeight: 1.3 }}>{product?.name || 'Kit Designer'}</div>
        <div style={{ fontSize: 9, color: '#94A3B8', marginTop: 2 }}>
          {activeTab === 'style' && 'Style & Colors'}
          {activeTab === 'logos' && 'Logos & Badges'}
          {activeTab === 'nameNumber' && 'Name & Number'}
          {activeTab === 'order' && 'Order Details'}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px', background: '#FAFAFA', paddingBottom: 20 }}>{renderTabContent()}</div>
      <div style={{ padding: '12px 14px', borderTop: '1px solid #E8ECF0', background: '#fff', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={reset} style={{ flex: 1, padding: '11px', borderRadius: 10, border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#64748B' }}>Reset</button>
          <button onClick={handleSaveDesign} style={{ flex: 2, padding: '11px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)', color: '#fff' }}>
            <Save size={16} /> Add to Cart
          </button>
        </div>
      </div>
    </>
  );

  if (!mounted) return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 40, height: 40, border: '3px solid #E2E8F0', borderTopColor: '#003E9B', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;
  if (!product)  return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}><div style={{ width: 40, height: 40, border: '3px solid #E2E8F0', borderTopColor: '#003E9B', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /><p style={{ color: '#64748B', fontSize: 14 }}>Loading product…</p><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;

  const showDesktopSidebar = !isMobile && !isTablet;
  const configPanelWidth   = isTablet ? 320 : 370;

  return (
    <div style={{ display: 'flex', height: 'calc(100dvh - 72px)', minHeight: 500, overflow: 'visible', background: '#fff', fontFamily: "'Poppins','Segoe UI',sans-serif", position: 'relative' }}>

      {/* ── Viewer ── */}
      <div ref={viewerContainerRef} style={{ flex: 1, position: 'relative', background: '#ffffff', overflow: 'hidden',minHeight: 'calc(100vh - 120px)'}}>

        <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: 6, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', padding: '3px', borderRadius: 30 }}>
          {[{ id: 'product', label: isMobile ? '2D' : 'Product View' }, { id: 'glb', label: isMobile ? '3D' : '3D View' }].map(v => (
            <button key={v.id} onClick={() => setViewMode(v.id)} style={{ padding: isMobile ? '4px 14px' : '5px 20px', borderRadius: 30, fontSize: isMobile ? 10 : 11, fontWeight: 700, background: viewMode === v.id ? '#fff' : 'transparent', color: viewMode === v.id ? '#003E9B' : '#fff', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>{v.label}</button>
          ))}
        </div>

        <button onClick={handleFullscreen} style={{ position: 'absolute', top: 14, right: 14, zIndex: 10, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: 8, borderRadius: 40, border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>

        {viewMode === 'product' && (
          <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 99, padding: 4, display: 'inline-flex', gap: 4, boxShadow: '0 4px 14px rgba(0,0,0,0.10)' }}>
              {['front', 'back'].map(v => (
                <button key={v} onClick={() => setView(v)} style={{ padding: '8px 26px', borderRadius: 99, fontSize: 10, fontWeight: 700, cursor: 'pointer', background: view === v ? 'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)' : 'transparent', border: view === v ? 'none' : '1px solid #003E9B', color: view === v ? '#fff' : '#003E9B' }}>{v.toUpperCase()}</button>
              ))}
            </div>
          </div>
        )}

        {/* 3D Viewer — collarColor now passed */}
        {viewMode === 'glb' && (
          <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <GLBViewer
              glbPath={product?.glbUrl || '/images/jerseys/TSHIRT.glb'}
              autoRotate={true}
              backgroundColor="#E2E8F0"
              jerseyColor={jerseyColor}
              sleeveColor={sleeveColor}
              collarColor={collarColor}
              playerName={showName ? playerName : ''}
              playerNumber={showNumber ? playerNumber : ''}
              nameColor={nameColor}
              numberColor={numberColor}
              nameStyleId={nameFont}
              nameArcStyle={nameStyle}
              textEffect={textEffect}
              showText={showName}
              clubLogo={clubLogo}
              sponsorLogo={sponsorLogo}
            />
          </div>
        )}

        {/* Product view — canvas text overlay draws straight or curved text in real time */}
        {viewMode === 'product' && (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              // src={view === 'front' ? (product?.mainImage || '/images/jerseys/front.jpg') : (product?.hoverImage || product?.backImage || product?.mainImage || '/images/jerseys/back.jpg')}
src={
  view === "front"
    ? product?.viewImages?.front ||
      product?.images?.[0] ||
      "/images/jerseys/front.jpg"
    : product?.viewImages?.back ||
      product?.images?.[1] ||
      product?.images?.[0] ||
      "/images/jerseys/back.jpg"
}
              alt={`Jersey ${view} view`}
              style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain', filter: 'none' }}
              onError={e => { e.target.src = '/images/jerseys/front.jpg'; }}
            />

            {/* ← Real-time canvas overlay: curved or straight text */}
            <TextOverlay
              containerRef={viewerContainerRef}
              playerName={playerName}
              showName={showName}
              nameFont={nameFont}
              nameColor={nameColor}
              nameStyle={nameStyle}
              playerNumber={playerNumber}
              showNumber={showNumber}
              numberFont={numberFont}
              numberColor={numberColor}
              textEffect={textEffect}
            />
          </div>
        )}
      </div>

      {/* Desktop panel */}
      {showDesktopSidebar && (
        <div style={{ width: configPanelWidth, background: '#fff', borderLeft: '1px solid #E8ECF0', display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%', flexShrink: 0 }}>
          {panelInner}
        </div>
      )}

      {/* Mobile bottom nav */}
      {(isMobile || isTablet) && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)', borderTop: '1px solid #E8ECF0', zIndex: 40, display: 'flex' }}>
          {MAIN_TABS.map(tab => {
            const Icon = tab.Icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileOpen(true); }} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '10px 0', cursor: 'pointer', border: 'none', background: 'transparent', color: active ? '#003E9B' : '#94A3B8' }}>
                <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
                <span style={{ fontSize: 8, fontWeight: 700 }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Mobile bottom sheet */}
      {(isMobile || isTablet) && mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '24px 24px 0 0', maxHeight: '82vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #E8ECF0' }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#000' }}>Customize</span>
              <button onClick={() => setMobileOpen(false)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={14} />
              </button>
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>{panelInner}</div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Russo+One&family=Bebas+Neue&family=Teko:wght@700&family=Oswald:wght@700&family=Barlow+Condensed:wght@800&family=Dancing+Script:wght@700&family=Archivo+Black&family=Fjalla+One&family=Permanent+Marker&display=swap');
        @keyframes spin{to{transform:rotate(360deg)}}
        *{box-sizing:border-box}
        button{transition:all 0.18s ease}
        button:hover{opacity:0.9}
        button:active{transform:scale(0.97)}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#F1F5F9;border-radius:10px}
        ::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#0EA5E9,#0284C7);border-radius:10px}
        input:focus{outline:2px solid rgba(0,62,155,0.4);outline-offset:2px}
      `}</style>
    </div>
  );
}