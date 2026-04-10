// "use client";

// import { useState, useCallback, useEffect, useRef } from 'react';
// import {
//   Upload, ChevronDown, Save, Check, Trash2,
//   Type, Shield, Paintbrush, ShoppingBag, ArrowRight,
//   RotateCcw, X, Menu, Zap, Download, Star, Undo2, Redo2
// } from 'lucide-react';

// /* ══════════════════════ DATA ══════════════════════ */
// const JERSEY_COLORS = [
//   { name: 'Obsidian',      code: '#111111' },
//   { name: 'Midnight Navy', code: '#0D1B2A' },
//   { name: 'Deep Navy',     code: '#1D3557' },
//   { name: 'Royal Blue',    code: '#1E40AF' },
//   { name: 'Crimson',       code: '#DC2626' },
//   { name: 'Scarlet',       code: '#EF4444' },
//   { name: 'Forest',        code: '#14532D' },
//   { name: 'Emerald',       code: '#059669' },
//   { name: 'Gold',          code: '#D97706' },
//   { name: 'Amber',         code: '#F59E0B' },
//   { name: 'Pure White',    code: '#FFFFFF' },
//   { name: 'Pearl',         code: '#F5F5DC' },
//   { name: 'Slate',         code: '#334155' },
//   { name: 'Burgundy',      code: '#7F1D1D' },
//   { name: 'Purple',        code: '#6D28D9' },
//   { name: 'Teal',          code: '#0F766E' },
//   { name: 'Sky Blue',      code: '#0EA5E9' },
//   { name: 'Cyan',          code: '#06B6D4' },
//   { name: 'Orange',        code: '#EA580C' },
//   { name: 'Pink',          code: '#EC4899' },
// ];

// const SLEEVE_COLORS = [
//   { name: 'Obsidian',      code: '#111111' },
//   { name: 'Midnight Navy', code: '#0D1B2A' },
//   { name: 'Deep Navy',     code: '#1D3557' },
//   { name: 'Royal Blue',    code: '#1E40AF' },
//   { name: 'Crimson',       code: '#DC2626' },
//   { name: 'Pure White',    code: '#FFFFFF' },
//   { name: 'Gold',          code: '#D97706' },
//   { name: 'Emerald',       code: '#059669' },
//   { name: 'Purple',        code: '#6D28D9' },
//   { name: 'Teal',          code: '#0F766E' },
//   { name: 'Sky Blue',      code: '#0EA5E9' },
//   { name: 'Orange',        code: '#EA580C' },
// ];

// const COLLAR_TYPES = [
//   { id: 'round',  label: 'Round',  icon: '○' },
//   { id: 'v-neck', label: 'V-Neck', icon: '∨' },
//   { id: 'polo',   label: 'Polo',   icon: '⊓' },
//   { id: 'collar', label: 'Collar', icon: '⊏' },
// ];

// const TEXT_COLORS = [
//   '#FFFFFF','#F1F5F9','#94A3B8','#334155',
//   '#FBBF24','#F59E0B','#EF4444','#DC2626',
//   '#34D399','#10B981','#60A5FA','#3B82F6',
//   '#C084FC','#A855F7','#FB7185','#F43F5E',
//   '#000000','#1E293B',
// ];

// const FONT_STYLES = [
//   { id:'collegiate', label:'PLAYER', fontFamily:'"Arial Black",sans-serif',  fontWeight:'900', style:{ letterSpacing:'.05em' } },
//   { id:'block',      label:'PLAYER', fontFamily:'Impact,sans-serif',         fontWeight:'900', style:{} },
//   { id:'varsity',    label:'PLAYER', fontFamily:'"Georgia",serif',           fontWeight:'900', style:{ fontStyle:'italic' } },
//   { id:'athletic',   label:'PLAYER', fontFamily:'"Trebuchet MS",sans-serif', fontWeight:'800', style:{ letterSpacing:'.08em' } },
//   { id:'sport',      label:'PLAYER', fontFamily:'"Verdana",sans-serif',      fontWeight:'700', style:{ letterSpacing:'.04em' } },
//   { id:'modern',     label:'PLAYER', fontFamily:'"Helvetica",sans-serif',    fontWeight:'900', style:{ letterSpacing:'.1em' } },
//   { id:'retro',      label:'PLAYER', fontFamily:'"Courier New",monospace',   fontWeight:'700', style:{ letterSpacing:'.06em' } },
//   { id:'slim',       label:'PLAYER', fontFamily:'"Arial",sans-serif',        fontWeight:'400', style:{ letterSpacing:'.15em' } },
//   { id:'bold-con',   label:'PLAYER', fontFamily:'"Arial Narrow",sans-serif', fontWeight:'900', style:{ letterSpacing:'.02em' } },
//   { id:'serif',      label:'PLAYER', fontFamily:'"Times New Roman",serif',   fontWeight:'700', style:{} },
//   { id:'outline',    label:'PLAYER', fontFamily:'"Arial Black",sans-serif',  fontWeight:'900', style:{ letterSpacing:'.06em', WebkitTextStroke:'1px currentColor' } },
//   { id:'thin',       label:'PLAYER', fontFamily:'"Helvetica",sans-serif',    fontWeight:'300', style:{ letterSpacing:'.2em' } },
//   { id:'condensed',  label:'PLAYER', fontFamily:'"Impact",sans-serif',       fontWeight:'900', style:{ letterSpacing:'-0.02em' } },
//   { id:'wide',       label:'PLAYER', fontFamily:'"Trebuchet MS",sans-serif', fontWeight:'600', style:{ letterSpacing:'.25em' } },
// ];

// const SIZES = ['XS','S','M','L','XL','XXL','3XL'];
// const STEPS = [
//   { id:'style', label:'Style',  Icon:Paintbrush  },
//   { id:'logos', label:'Logos',  Icon:Shield      },
//   { id:'text',  label:'Text',   Icon:Type        },
//   { id:'order', label:'Order',  Icon:ShoppingBag },
// ];

// const NAME_STYLES = [
//   { id:'none',     label:'None',     icon: null },
//   { id:'straight', label:'Straight', icon:'straight' },
//   { id:'curved',   label:'Curved',   icon:'curved' },
// ];

// /* ══════════════════════ HELPERS ══════════════════════ */
// const isLight = (h) => {
//   if (!h||h==='transparent') return true;
//   const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);
//   return (r*299+g*587+b*114)/1000>160;
// };

// const hexToRgb = (hex) => {
//   const r=parseInt(hex.slice(1,3),16);
//   const g=parseInt(hex.slice(3,5),16);
//   const b=parseInt(hex.slice(5,7),16);
//   return {r,g,b};
// };

// /* ══════════════════════ JERSEY SVG (no product image) ══════════════════════ */
// const JerseySVG = ({ jerseyColor, sleeveColor, collarType, view, clubLogo, sponsorLogo, nameText, nameStyleId, nameTextStyle, nameColor, nameVertical, numberText, numberStyleId, numberColor, showTeam, teamName, teamColor }) => {
//   const ns = FONT_STYLES.find(f=>f.id===nameStyleId) || FONT_STYLES[0];
//   const nu = FONT_STYLES.find(f=>f.id===numberStyleId) || FONT_STYLES[1];
//   const light = isLight(jerseyColor);
//   const seam = light?'rgba(0,0,0,0.13)':'rgba(255,255,255,0.12)';
//   const panel = light?'rgba(0,0,0,0.07)':'rgba(255,255,255,0.07)';
//   const sleeveCol = sleeveColor || jerseyColor;

//   const collarPath = collarType === 'v-neck'
//     ? "M130,46 L150,68 L170,46"
//     : collarType === 'polo'
//     ? "M125,46 Q150,52 175,46 L175,60 Q150,67 125,60 Z"
//     : "M125,46 Q150,55 175,46"; // round default

//   return (
//     <svg viewBox="0 0 300 380" style={{ width:'100%',height:'100%',filter:'drop-shadow(0 28px 52px rgba(0,0,0,0.25))' }}>
//       <defs>
//         <linearGradient id="jS" x1="15%" y1="0%" x2="85%" y2="100%">
//           <stop offset="0%"   stopColor={light?'rgba(255,255,255,0.32)':'rgba(255,255,255,0.10)'}/>
//           <stop offset="55%"  stopColor="rgba(255,255,255,0)"/>
//           <stop offset="100%" stopColor={light?'rgba(0,0,0,0.06)':'rgba(0,0,0,0.20)'}/>
//         </linearGradient>
//         <linearGradient id="jB" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%"   stopColor="rgba(0,0,0,0)"/>
//           <stop offset="100%" stopColor="rgba(0,0,0,0.30)"/>
//         </linearGradient>
//       </defs>
//       <ellipse cx="150" cy="375" rx="82" ry="7" fill="rgba(0,0,0,0.12)"/>
//       {/* Sleeves */}
//       <path d="M65,38 L8,78 L18,155 L56,140 L56,100 Z" fill={sleeveCol} stroke={seam} strokeWidth="1"/>
//       <path d="M235,38 L292,78 L282,155 L244,140 L244,100 Z" fill={sleeveCol} stroke={seam} strokeWidth="1"/>
//       {/* Body */}
//       <path d="M65,38 L56,100 L56,342 L244,342 L244,100 L235,38 L202,18 Q175,46 150,46 Q125,46 98,18 Z"
//         fill={jerseyColor} stroke={seam} strokeWidth="1.2"/>
//       <path d="M65,38 L32,60 L8,78 L18,155 L56,140 L56,342 L244,342 L244,140 L282,155 L292,78 L268,60 L235,38 L202,18 Q175,46 150,46 Q125,46 98,18 Z"
//         fill="url(#jS)"/>
//       <path d="M56,230 L56,342 L244,342 L244,230 Z" fill="url(#jB)" opacity="0.45"/>
//       <path d="M65,42 L56,140 L74,340 L90,340 L90,96 Z"  fill={panel}/>
//       <path d="M235,42 L244,140 L226,340 L210,340 L210,96 Z" fill={panel}/>
//       {/* Collar */}
//       <path d={collarPath} fill="none" stroke={seam} strokeWidth="3"/>
//       {collarType === 'polo' && <path d="M125,46 Q150,67 175,46 L175,60 Q150,67 125,60 Z" fill={sleeveCol} opacity="0.8"/>}
//       {/* Seam dots */}
//       {[62,78,94].map(cy=><circle key={cy} cx="150" cy={cy} r="2.5" fill={seam}/>)}
//       <line x1="78"  y1="60" x2="72"  y2="338" stroke={seam} strokeWidth="1.2" strokeDasharray="4,3"/>
//       <line x1="222" y1="60" x2="228" y2="338" stroke={seam} strokeWidth="1.2" strokeDasharray="4,3"/>
//       {/* Logos on front */}
//       {clubLogo    && view==='front' && <image href={clubLogo}    x="84" y="82"  width="46" height="46"/>}
//       {sponsorLogo && view==='front' && <image href={sponsorLogo} x="98" y="142" width="104" height="34" preserveAspectRatio="xMidYMid meet"/>}
//       {/* Back text */}
//       {view==='back' && nameStyleId!=='none' && nameTextStyle==='straight' && (
//         <text x="150" y={nameVertical*2.6} textAnchor="middle"
//           fontFamily={ns.fontFamily} fontSize="22" fontWeight={ns.fontWeight}
//           fill={nameColor} letterSpacing={ns.style?.letterSpacing??'2'} fontStyle={ns.style?.fontStyle}>
//           {nameText}
//         </text>
//       )}
//       {view==='back' && nameStyleId!=='none' && nameTextStyle==='curved' && (
//         <>
//           <defs>
//             <path id="nameCurve" d={`M 70,${nameVertical*2.4} Q 150,${nameVertical*2.4-20} 230,${nameVertical*2.4}`}/>
//           </defs>
//           <text textAnchor="middle" fontFamily={ns.fontFamily} fontSize="22" fontWeight={ns.fontWeight}
//             fill={nameColor} letterSpacing={ns.style?.letterSpacing??'2'} fontStyle={ns.style?.fontStyle}>
//             <textPath href="#nameCurve" startOffset="50%">{nameText}</textPath>
//           </text>
//         </>
//       )}
//       {view==='back' && numberStyleId!=='none' && (
//         <text x="150" y={nameVertical*2.6+72} textAnchor="middle"
//           fontFamily={nu.fontFamily} fontSize="72" fontWeight={nu.fontWeight} fill={numberColor}>
//           {numberText}
//         </text>
//       )}
//       {view==='back' && showTeam && (
//         <text x="150" y="314" textAnchor="middle"
//           fontFamily='"Trebuchet MS",sans-serif' fontSize="10" fontWeight="700"
//           fill={teamColor} letterSpacing="5">{teamName}
//         </text>
//       )}
//     </svg>
//   );
// };

// /* ══════════════════════ MAIN ══════════════════════ */
// export default function JerseyCustomizer({ product }) {
//   const [mounted,      setMounted]      = useState(false);
//   const [step,         setStep]         = useState(0);
//   const [jerseyColor,  setJerseyColor]  = useState('#DC2626');
//   const [sleeveColor,  setSleeveColor]  = useState('#111111');
//   const [collarType,   setCollarType]   = useState('round');
//   const [view,         setView]         = useState('front');
//   const [mobileOpen,   setMobileOpen]   = useState(false);
//   const [fabricChoice, setFabricChoice] = useState('AirMesh Pro');

//   const [clubLogo,    setClubLogo]    = useState(null);
//   const [sponsorLogo, setSponsorLogo] = useState(null);
//   const [leftSleeve,  setLeftSleeve]  = useState(null);
//   const [rightSleeve, setRightSleeve] = useState(null);

//   // Name & Number
//   const [nameTextStyle,  setNameTextStyle]  = useState('straight'); // 'none' | 'straight' | 'curved'
//   const [nameStyleId,    setNameStyleId]    = useState('collegiate');
//   const [nameText,       setNameText]       = useState('PLAYER');
//   const [nameColor,      setNameColor]      = useState('#FFFFFF');
//   const [nameVertical,   setNameVertical]   = useState(38);

//   const [numberStyleId, setNumberStyleId] = useState('block');
//   const [numberText,    setNumberText]    = useState('10');
//   const [numberColor,   setNumberColor]   = useState('#F59E0B');

//   const [teamName,  setTeamName]  = useState('YOUR TEAM');
//   const [teamColor, setTeamColor] = useState('#64748B');
//   const [showTeam,  setShowTeam]  = useState(false);

//   const [selectedSize, setSelectedSize] = useState('L');

//   // Section open states
//   const [fabOpen,    setFabOpen]    = useState(true);
//   const [collarOpen, setCollarOpen] = useState(false);
//   const [baseOpen,   setBaseOpen]   = useState(true);
//   const [sleeveOpen, setSleeveOpen] = useState(false);
//   const [designOpen, setDesignOpen] = useState(false);
//   const [nameOpen,   setNameOpen]   = useState(true);
//   const [numOpen,    setNumOpen]    = useState(false);
//   const [teamOpen,   setTeamOpen]   = useState(false);

//   useEffect(()=>{ setMounted(true); },[]);

//   const handleUpload = useCallback((setter) => (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith('image/')) { alert('Please upload an image file'); return; }
//     if (file.size > 5 * 1024 * 1024) { alert('File size should be less than 5MB'); return; }
//     const reader = new FileReader();
//     reader.onloadend = () => setter(reader.result);
//     reader.onerror = () => alert('Error reading file');
//     reader.readAsDataURL(file);
//   }, []);

//   const reset = () => {
//     setJerseyColor('#DC2626'); setSleeveColor('#111111'); setCollarType('round');
//     setClubLogo(null); setSponsorLogo(null); setLeftSleeve(null); setRightSleeve(null);
//     setNameText('PLAYER'); setNumberText('10'); setTeamName('YOUR TEAM');
//     setNameColor('#FFFFFF'); setNumberColor('#F59E0B'); setNameVertical(38);
//     setShowTeam(false); setNameStyleId('collegiate'); setNumberStyleId('block');
//     setNameTextStyle('straight');
//   };

//   /* Color overlay for product image */
//   const { r, g, b } = hexToRgb(jerseyColor);
//   const colorOverlay = `rgba(${r},${g},${b},0.45)`;

//   const curColor  = JERSEY_COLORS.find(c=>c.code===jerseyColor);
//   const productImg = view === 'front' ? product?.mainImage : product?.hoverImage;

//   /* tokens */
//   const P    = 'var(--primary,#E8820C)';
//   const Pmid = 'rgba(232,130,12,0.10)';
//   const F    = { fontFamily:"var(--font-primary,'Poppins'),sans-serif" };

//   const labelSt = { ...F, fontSize:9, fontWeight:700, textTransform:'uppercase',
//     letterSpacing:'.18em', color:'#94A3B8', marginBottom:7, display:'block' };
//   const inputSt = { ...F, width:'100%', padding:'10px 13px', borderRadius:10,
//     border:'1.5px solid #E2E8F0', background:'#fff', color:'#0F172A',
//     fontSize:13, fontWeight:700, outline:'none', boxSizing:'border-box' };
//   const card = { background:'#fff', borderRadius:12, border:'1px solid #E8ECF0',
//     overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,0.04)' };
//   const chip = { background:'rgba(255,255,255,0.93)', backdropFilter:'blur(14px)',
//     border:'1px solid rgba(255,255,255,0.75)', boxShadow:'0 4px 18px rgba(0,0,0,0.10)', borderRadius:12 };

//   /* ── sub-components ── */
//   const ColorSwatch = ({ color, selected, onSelect, size=28 }) => {
//     const sel = (selected || jerseyColor) === color.code;
//     return (
//       <button title={color.name} onClick={()=> onSelect ? onSelect(color.code) : setJerseyColor(color.code)} style={{
//         width:size, height:size, borderRadius:8, cursor:'pointer',
//         border:`2px solid ${sel?'#E8820C':'#E2E8F0'}`,
//         backgroundColor:color.code,
//         display:'flex', alignItems:'center', justifyContent:'center',
//         transform:sel?'scale(1.18)':'scale(1)', transition:'all 0.16s',
//         flexShrink:0,
//         boxShadow:sel?`0 0 0 3px rgba(232,130,12,0.22),0 4px 10px rgba(0,0,0,0.14)`
//           :color.code==='#FFFFFF'?'inset 0 0 0 1px #E2E8F0':'none',
//       }}>
//         {sel&&<Check size={9} strokeWidth={3.5} color={isLight(color.code)?'#000':'#fff'}/>}
//       </button>
//     );
//   };

//   const ColorDots = ({ selected, onSelect }) => (
//     <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
//       {TEXT_COLORS.map(c=>(
//         <button key={c} onClick={()=>onSelect(c)} style={{
//           width:22, height:22, borderRadius:7,
//           border:`2px solid ${selected===c?'#E8820C':'transparent'}`,
//           backgroundColor:c, cursor:'pointer',
//           transform:selected===c?'scale(1.3)':'scale(1)', transition:'all 0.16s',
//           boxShadow:c==='#FFFFFF'?'inset 0 0 0 1px #CBD5E1'
//             :selected===c?`0 0 0 2px rgba(232,130,12,0.3)`:'none',
//         }}/>
//       ))}
//     </div>
//   );

//   /* Font Grid - shows actual PLAYER text in each font */
//   const FontGrid = ({ selectedId, onSelect }) => (
//     <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:7 }}>
//       {FONT_STYLES.map(f=>{
//         const sel=selectedId===f.id;
//         return (
//           <button key={f.id} onClick={()=>onSelect(f.id)} style={{
//             height:52, borderRadius:9, cursor:'pointer', position:'relative',
//             border:`1.5px solid ${sel?'#E8820C':'#E2E8F0'}`,
//             background:sel?Pmid:'#F8FAFC',
//             display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.16s',
//             overflow:'hidden', padding:'2px 4px',
//           }}>
//             {sel&&<span style={{ position:'absolute', top:3, right:3, width:10, height:10,
//               borderRadius:'50%', background:'#E8820C',
//               display:'flex', alignItems:'center', justifyContent:'center' }}>
//               <Check size={5} strokeWidth={4} color="#fff"/>
//             </span>}
//             <span style={{
//               ...f.style,
//               fontFamily:f.fontFamily||'sans-serif',
//               fontWeight:f.fontWeight,
//               fontSize:9,
//               color:sel?'#E8820C':'#334155',
//               whiteSpace:'nowrap',
//               maxWidth:'100%',
//               overflow:'hidden',
//             }}>
//               {f.label}
//             </span>
//           </button>
//         );
//       })}
//     </div>
//   );

//   const UploadSlot = ({ label, type, state, setter }) => (
//     <div style={{ ...card, borderRadius:10 }}>
//       <div style={{ padding:'9px 12px', background:'#F8FAFC', borderBottom:'1px solid #E8ECF0',
//         display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//         <span style={{ ...F, fontSize:10, fontWeight:700, color:'#334155' }}>{label}</span>
//         {state && (
//           <button onClick={()=>{ setter(null); const el=document.getElementById(`up-${type}`); if(el) el.value=''; }}
//             style={{ background:'none', border:'none', cursor:'pointer', color:'#EF4444' }}>
//             <Trash2 size={11}/>
//           </button>
//         )}
//       </div>
//       <div style={{ padding:10 }}>
//         {state ? (
//           <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:60 }}>
//             <img src={state} alt={label} style={{ maxHeight:48, maxWidth:'100%', display:'block',
//               objectFit:'contain', borderRadius:6, border:'1px solid #E8ECF0', padding:4, background:'#fff' }}/>
//           </div>
//         ) : (
//           <>
//             <button onClick={()=>document.getElementById(`up-${type}`).click()} style={{
//               width:'100%', padding:'13px 8px', border:'1.5px dashed #CBD5E1', borderRadius:9,
//               cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
//               gap:6, background:'transparent', ...F, fontSize:9, fontWeight:700,
//               color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.1em', transition:'all 0.18s',
//             }}
//               onMouseEnter={e=>{ e.currentTarget.style.borderColor='#E8820C'; e.currentTarget.style.color='#E8820C'; e.currentTarget.style.background=Pmid; }}
//               onMouseLeave={e=>{ e.currentTarget.style.borderColor='#CBD5E1'; e.currentTarget.style.color='#94A3B8'; e.currentTarget.style.background='transparent'; }}
//             >
//               <Upload size={12}/> Upload Image
//             </button>
//             <input id={`up-${type}`} type="file" accept="image/*" style={{ display:'none' }}
//               onChange={handleUpload(setter)}/>
//           </>
//         )}
//       </div>
//     </div>
//   );

//   const Section = ({ open, onToggle, label, badge, children }) => (
//     <div style={card}>
//       <button onClick={onToggle} style={{
//         width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
//         padding:'12px 16px', border:'none', cursor:'pointer',
//         background:open?Pmid:'#F8FAFC', transition:'all 0.18s',
//         borderBottom:open?`1.5px solid rgba(232,130,12,0.18)`:'1.5px solid transparent',
//       }}>
//         <div style={{ display:'flex', alignItems:'center', gap:8 }}>
//           <span style={{ ...F, fontSize:10, fontWeight:700, textTransform:'uppercase',
//             letterSpacing:'.14em', color:open?'#E8820C':'#334155' }}>{label}</span>
//           {badge&&<span style={{ ...F, padding:'2px 8px', borderRadius:6,
//             background:open?`rgba(232,130,12,0.15)`:'#EEF2FF',
//             fontSize:9, fontWeight:700, color:open?'#E8820C':'#4F46E5' }}>{badge}</span>}
//         </div>
//         <ChevronDown size={13} color={open?'#E8820C':'#94A3B8'}
//           style={{ transform:open?'rotate(180deg)':'none', transition:'transform 0.2s' }}/>
//       </button>
//       {open&&(
//         <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:13 }}>
//           {children}
//         </div>
//       )}
//     </div>
//   );

//   /* ═══ NAME STYLE SELECTOR (None / Straight / Curved) ═══ */
//   const NameStyleSelector = () => (
//     <div style={{ display:'flex', gap:8 }}>
//       {NAME_STYLES.map(ns=>{
//         const sel = nameTextStyle===ns.id;
//         return (
//           <button key={ns.id} onClick={()=>setNameTextStyle(ns.id)} style={{
//             flex:1, height:64, borderRadius:10, cursor:'pointer',
//             border:`2px solid ${sel?'#E8820C':'#E2E8F0'}`,
//             background:sel?Pmid:'#F8FAFC',
//             display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
//             gap:4, transition:'all 0.18s', position:'relative',
//           }}>
//             {sel&&<span style={{ position:'absolute', top:4, right:4, width:10, height:10,
//               borderRadius:'50%', background:'#E8820C',
//               display:'flex', alignItems:'center', justifyContent:'center' }}>
//               <Check size={5} strokeWidth={4} color="#fff"/>
//             </span>}
//             {ns.id==='none' && (
//               <svg width="28" height="20" viewBox="0 0 28 20">
//                 <circle cx="14" cy="10" r="9" fill="none" stroke="#EF4444" strokeWidth="2"/>
//                 <line x1="6" y1="6" x2="22" y2="14" stroke="#EF4444" strokeWidth="2"/>
//               </svg>
//             )}
//             {ns.id==='straight' && (
//               <svg width="44" height="20" viewBox="0 0 44 20">
//                 <text x="22" y="14" textAnchor="middle" fontFamily="'Arial Black',sans-serif"
//                   fontSize="10" fontWeight="900" fill={sel?'#E8820C':'#334155'}>YOUR NAME</text>
//               </svg>
//             )}
//             {ns.id==='curved' && (
//               <svg width="44" height="24" viewBox="0 0 44 24">
//                 <defs><path id="c" d="M 4,18 Q 22,4 40,18"/></defs>
//                 <text fontSize="8" fontWeight="900" fontFamily="'Arial Black',sans-serif" fill={sel?'#E8820C':'#334155'}>
//                   <textPath href="#c" startOffset="50%" textAnchor="middle">YOUR NAME</textPath>
//                 </text>
//               </svg>
//             )}
//             <span style={{ ...F, fontSize:8, fontWeight:700, color:sel?'#E8820C':'#64748B',
//               textTransform:'uppercase', letterSpacing:'.1em' }}>{ns.label}</span>
//           </button>
//         );
//       })}
//     </div>
//   );

//   /* ═══ STEP CONTENT ═══ */
//   const renderContent = () => {
//     /* STYLE */
//     if (step===0) return (
//       <div style={{ display:'flex', flexDirection:'column', gap:10 }}>

//         {/* FABRIC */}
//         <Section open={fabOpen} onToggle={()=>setFabOpen(v=>!v)} label="Fabric Technology">
//           <div style={{ display:'flex', gap:8 }}>
//             {['AirMesh Pro','CoolWeave'].map(f=>{
//               const sel=fabricChoice===f;
//               return (
//                 <button key={f} onClick={()=>setFabricChoice(f)} style={{
//                   flex:1, padding:'10px 12px', borderRadius:10, cursor:'pointer',
//                   border:`1.5px solid ${sel?'#E8820C':'#E2E8F0'}`,
//                   background:sel?Pmid:'#F8FAFC', ...F,
//                   fontSize:11, fontWeight:700, color:sel?'#E8820C':'#64748B', transition:'all 0.18s',
//                 }}>{f}</button>
//               );
//             })}
//           </div>
//           <p style={{ ...F, fontSize:11, color:'#94A3B8', lineHeight:1.7, margin:0 }}>
//             Bio-washed performance fabric with UV protection &amp; elite moisture management.
//           </p>
//         </Section>

//         {/* COLLAR */}
//         <Section open={collarOpen} onToggle={()=>setCollarOpen(v=>!v)} label="Collar" badge={COLLAR_TYPES.find(c=>c.id===collarType)?.label}>
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
//             {COLLAR_TYPES.map(c=>{
//               const sel=collarType===c.id;
//               return (
//                 <button key={c.id} onClick={()=>setCollarType(c.id)} style={{
//                   padding:'12px 8px', borderRadius:10, cursor:'pointer',
//                   border:`1.5px solid ${sel?'#E8820C':'#E2E8F0'}`,
//                   background:sel?Pmid:'#F8FAFC',
//                   display:'flex', flexDirection:'column', alignItems:'center', gap:5,
//                   transition:'all 0.18s',
//                 }}>
//                   <span style={{ fontSize:18, lineHeight:1 }}>{c.icon}</span>
//                   <span style={{ ...F, fontSize:9, fontWeight:700, color:sel?'#E8820C':'#64748B',
//                     textTransform:'uppercase', letterSpacing:'.08em' }}>{c.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </Section>

//         {/* BASE COLOUR */}
//         <Section open={baseOpen} onToggle={()=>setBaseOpen(v=>!v)} label="Base Colour" badge={curColor?.name}>
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:7 }}>
//             {JERSEY_COLORS.map(c=>(
//               <ColorSwatch key={c.code} color={c} selected={jerseyColor} onSelect={setJerseyColor}/>
//             ))}
//           </div>
//         </Section>

//         {/* SLEEVE */}
//         <Section open={sleeveOpen} onToggle={()=>setSleeveOpen(v=>!v)} label="Sleeve"
//           badge={SLEEVE_COLORS.find(c=>c.code===sleeveColor)?.name||'Custom'}>
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:7 }}>
//             {SLEEVE_COLORS.map(c=>(
//               <ColorSwatch key={c.code} color={c} selected={sleeveColor} onSelect={setSleeveColor}/>
//             ))}
//           </div>
//           {/* Sleeve match base toggle */}
//           <button onClick={()=>setSleeveColor(jerseyColor)} style={{
//             ...F, fontSize:10, fontWeight:700, color:'#E8820C', background:Pmid,
//             border:'1px solid rgba(232,130,12,0.3)', borderRadius:8, padding:'8px 14px', cursor:'pointer',
//           }}>↔ Match Base Colour</button>
//         </Section>

//         {/* DESIGN COLORS (accent) */}
//         <Section open={designOpen} onToggle={()=>setDesignOpen(v=>!v)} label="Design Colors">
//           <p style={{ ...F, fontSize:11, color:'#94A3B8', margin:0, lineHeight:1.7 }}>
//             Additional design accent colors and pattern options will be applied here.
//           </p>
//           <div style={{ display:'flex', gap:8 }}>
//             {['Solid','Striped','Panel','Gradient'].map(d=>(
//               <button key={d} style={{
//                 flex:1, padding:'9px 4px', borderRadius:9, cursor:'pointer',
//                 border:'1.5px solid #E2E8F0', background:'#F8FAFC',
//                 ...F, fontSize:9, fontWeight:700, color:'#64748B',
//               }}>{d}</button>
//             ))}
//           </div>
//         </Section>
//       </div>
//     );

//     /* LOGOS */
//     if (step===1) return (
//       <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
//         <div style={{ padding:'11px 14px', borderRadius:10,
//           background:'rgba(232,130,12,0.07)', border:'1px solid rgba(232,130,12,0.2)',
//           display:'flex', gap:9, alignItems:'flex-start' }}>
//           <Zap size={13} color={'#E8820C'} style={{ flexShrink:0, marginTop:1 }}/>
//           <p style={{ ...F, fontSize:10, color:'#64748B', lineHeight:1.65, margin:0 }}>
//             <span style={{ color:'#E8820C', fontWeight:700 }}>Vector (SVG/EPS)</span> gives sharpest print.
//             PNG/JPG needs 300 DPI+ with transparent background.
//           </p>
//         </div>
//         <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
//           <UploadSlot label="Club Badge"   type="club"    state={clubLogo}    setter={setClubLogo}/>
//           <UploadSlot label="Sponsor Logo" type="sponsor" state={sponsorLogo} setter={setSponsorLogo}/>
//           <UploadSlot label="Left Sleeve"  type="left"    state={leftSleeve}  setter={setLeftSleeve}/>
//           <UploadSlot label="Right Sleeve" type="right"   state={rightSleeve} setter={setRightSleeve}/>
//         </div>
//       </div>
//     );

//     /* NAME & NUMBER */
//     if (step===2) return (
//       <div style={{ display:'flex', flexDirection:'column', gap:10 }}>

//         {/* NAME */}
//         <Section open={nameOpen} onToggle={()=>setNameOpen(v=>!v)} label="Player Name">
//           {/* Name Style: None / Straight / Curved */}
//           <div>
//             <span style={labelSt}>Name Style</span>
//             <NameStyleSelector/>
//           </div>

//           {nameTextStyle!=='none' && (
//             <>
//               <p style={{ ...F, fontSize:10, color:'#E8820C', fontWeight:700, margin:0, background:Pmid,
//                 padding:'6px 10px', borderRadius:8 }}>
//                 {nameTextStyle==='straight' ? 'Straight Text' : 'Curved Text'}
//               </p>
//               <div>
//                 <span style={labelSt}>Name</span>
//                 <input value={nameText} onChange={e=>setNameText(e.target.value.toUpperCase())}
//                   placeholder="YOUR NAME" style={inputSt}
//                   onFocus={e=>e.target.style.borderColor='#E8820C'}
//                   onBlur={e=>e.target.style.borderColor='#E2E8F0'}/>
//               </div>
//               <div>
//                 <span style={labelSt}>Font Style</span>
//                 <FontGrid selectedId={nameStyleId} onSelect={setNameStyleId}/>
//               </div>
//               <div><span style={labelSt}>Colour</span><ColorDots selected={nameColor} onSelect={setNameColor}/></div>
//               <div>
//                 <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
//                   <span style={labelSt}>Vertical Position</span>
//                   <span style={{ ...F, fontSize:10, fontWeight:700, color:'#E8820C' }}>{nameVertical}%</span>
//                 </div>
//                 <input type="range" min="20" max="65" value={nameVertical}
//                   onChange={e=>setNameVertical(Number(e.target.value))}
//                   style={{ width:'100%', accentColor:'#E8820C', cursor:'pointer' }}/>
//               </div>
//             </>
//           )}
//         </Section>

//         {/* NUMBER */}
//         <Section open={numOpen} onToggle={()=>setNumOpen(v=>!v)} label="Player Number">
//           <div>
//             <span style={labelSt}>Number</span>
//             <input value={numberText} onChange={e=>setNumberText(e.target.value)} maxLength={2} style={inputSt}/>
//           </div>
//           <div>
//             <span style={labelSt}>Font Style</span>
//             <FontGrid selectedId={numberStyleId} onSelect={setNumberStyleId}/>
//           </div>
//           <div><span style={labelSt}>Colour</span><ColorDots selected={numberColor} onSelect={setNumberColor}/></div>
//         </Section>

//         {/* TEAM */}
//         <div style={card}>
//           <button onClick={()=>setTeamOpen(v=>!v)} style={{
//             width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
//             padding:'12px 16px', border:'none', cursor:'pointer',
//             background:teamOpen?Pmid:'#F8FAFC',
//             borderBottom:teamOpen?`1.5px solid rgba(232,130,12,0.18)`:'1.5px solid transparent',
//             transition:'all 0.18s',
//           }}>
//             <span style={{ ...F, fontSize:10, fontWeight:700, textTransform:'uppercase',
//               letterSpacing:'.14em', color:teamOpen?'#E8820C':'#334155' }}>Team Name</span>
//             <div style={{ display:'flex', alignItems:'center', gap:9 }}>
//               <div onClick={e=>{ e.stopPropagation(); setShowTeam(v=>!v); }}
//                 style={{ width:36, height:20, borderRadius:99, cursor:'pointer', position:'relative',
//                   background:showTeam?'#E8820C':'#CBD5E1', transition:'background 0.22s' }}>
//                 <span style={{ position:'absolute', top:3,
//                   left:showTeam?17:3, width:14, height:14, borderRadius:'50%',
//                   background:'#fff', transition:'left 0.22s', boxShadow:'0 1px 4px rgba(0,0,0,0.2)' }}/>
//               </div>
//               <ChevronDown size={13} color={teamOpen?'#E8820C':'#94A3B8'}
//                 style={{ transform:teamOpen?'rotate(180deg)':'none', transition:'transform 0.2s' }}/>
//             </div>
//           </button>
//           {teamOpen&&(
//             <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:13 }}>
//               {showTeam
//                 ? <>
//                     <div>
//                       <span style={labelSt}>Team Name</span>
//                       <input value={teamName} onChange={e=>setTeamName(e.target.value.toUpperCase())} style={inputSt}/>
//                     </div>
//                     <div><span style={labelSt}>Colour</span><ColorDots selected={teamColor} onSelect={setTeamColor}/></div>
//                   </>
//                 : <p style={{ ...F, fontSize:11, color:'#94A3B8', textAlign:'center', padding:'4px 0', margin:0 }}>
//                     Toggle on to show team name
//                   </p>
//               }
//             </div>
//           )}
//         </div>
//       </div>
//     );

//     /* ORDER */
//     return (
//       <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
//         <div style={{ padding:'11px 14px', borderRadius:10, background:'#F0FDF4', border:'1px solid #BBF7D0' }}>
//           <p style={{ ...F, fontSize:11, color:'#166534', margin:0 }}>
//             Add players' names, numbers and sizes to complete your order.{' '}
//             <a href="#" style={{ fontWeight:700, color:'#059669' }}>Size Guide →</a>
//           </p>
//         </div>
//         <div style={card}>
//           <div style={{ padding:'11px 14px', background:'#F8FAFC', borderBottom:'1px solid #E8ECF0' }}>
//             <span style={{ ...F, fontSize:11, fontWeight:700, color:'#0F172A' }}>Player List</span>
//           </div>
//           <div style={{ padding:12, display:'flex', flexDirection:'column', gap:8 }}>
//             <a href="#" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7,
//               padding:'10px 14px', border:`1.5px solid #E8820C`, borderRadius:10,
//               fontSize:10, fontWeight:700, color:'#E8820C', textDecoration:'none', background:Pmid,
//               ...F, textTransform:'uppercase', letterSpacing:'.08em' }}>
//               <Download size={11}/> Download Template
//             </a>
//             <label style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7,
//               padding:'10px 14px', border:'1.5px dashed #CBD5E1', borderRadius:10,
//               fontSize:10, fontWeight:600, cursor:'pointer', ...F,
//               color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.08em' }}>
//               <Upload size={11}/> Upload Player List
//               <input type="file" style={{ display:'none' }}/>
//             </label>
//           </div>
//         </div>
//         <div>
//           <span style={labelSt}>Select Size</span>
//           <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
//             {SIZES.map(s=>{
//               const sel=selectedSize===s;
//               return (
//                 <button key={s} onClick={()=>setSelectedSize(s)} style={{
//                   width:46, height:46, borderRadius:9, ...F,
//                   fontSize:11, fontWeight:700, cursor:'pointer',
//                   border:`1.5px solid ${sel?'#E8820C':'#E2E8F0'}`,
//                   background:sel?Pmid:'#F8FAFC', color:sel?'#E8820C':'#64748B', transition:'all 0.18s',
//                 }}>{s}</button>
//               );
//             })}
//           </div>
//         </div>
//         <div style={{ border:`1.5px solid rgba(232,130,12,0.25)`, borderRadius:12,
//           overflow:'hidden', background:'rgba(232,130,12,0.03)' }}>
//           <div style={{ padding:'11px 16px', borderBottom:'1px solid rgba(232,130,12,0.12)',
//             display:'flex', alignItems:'center', gap:8 }}>
//             <Star size={13} color={'#E8820C'} fill={'#E8820C'}/>
//             <span style={{ ...F, fontSize:12, fontWeight:800, color:'#E8820C' }}>Order Summary</span>
//           </div>
//           <div style={{ padding:'12px 16px', display:'flex', flexDirection:'column', gap:9 }}>
//             {[
//               ['Base Colour', curColor?.name??jerseyColor],
//               ['Collar',      COLLAR_TYPES.find(c=>c.id===collarType)?.label??collarType],
//               ['Player',      `${nameText} — #${numberText}`],
//               ['Team',        showTeam?teamName:'—'],
//               ['Fabric',      fabricChoice],
//               ['Size',        selectedSize],
//             ].map(([k,v])=>(
//               <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//                 <span style={{ ...F, fontSize:9, color:'#94A3B8', fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em' }}>{k}</span>
//                 <span style={{ ...F, fontSize:11, color:'#0F172A', fontWeight:700 }}>{v}</span>
//               </div>
//             ))}
//           </div>
//           <div style={{ padding:'12px 16px', borderTop:'1px solid rgba(232,130,12,0.12)',
//             display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
//             <span style={{ ...F, fontSize:9, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.12em' }}>Unit Price</span>
//             <div style={{ display:'flex', alignItems:'baseline', gap:2 }}>
//               <span style={{ ...F, fontSize:15, color:'#E8820C', fontWeight:700 }}>$</span>
//               <span style={{ ...F, fontSize:32, fontWeight:900, color:'#E8820C' }}>{product?.price??'149'}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   /* ═══ PANEL SHELL ═══ */
//   const panelInner = (
//     <>
//       <div style={{ display:'flex', borderBottom:'1px solid #E8ECF0', flexShrink:0, background:'#fff' }}>
//         {STEPS.map((s,i)=>{
//           const active=step===i; const Icon=s.Icon;
//           return (
//             <button key={s.id} onClick={()=>setStep(i)} style={{
//               flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4,
//               padding:'11px 4px', border:'none', cursor:'pointer',
//               borderBottom:`2.5px solid ${active?'#E8820C':'transparent'}`,
//               background:active?Pmid:'transparent',
//               color:active?'#E8820C':'#94A3B8', transition:'all 0.2s',
//             }}>
//               <Icon size={16} strokeWidth={active?2.5:1.8}/>
//               <span style={{ ...F, fontSize:8, fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em' }}>{s.label}</span>
//             </button>
//           );
//         })}
//       </div>

//       <div style={{ padding:'14px 18px 12px', borderBottom:'1px solid #E8ECF0', flexShrink:0 }}>
//         <div style={{ ...F, fontSize:17, fontWeight:800, color:'#0F172A', letterSpacing:'-0.01em' }}>
//           {['Style','Logos','Name & Number','Your Order'][step]}
//         </div>
//         <div style={{ ...F, fontSize:9, color:'#94A3B8', marginTop:3, textTransform:'uppercase', letterSpacing:'.16em' }}>
//           {['Colour & fabric','Badges & sponsors','Fonts & placement','Sizing & players'][step]}
//         </div>
//       </div>

//       <div style={{ flex:1, overflowY:'auto', padding:'14px 16px 10px', background:'#F8FAFC' }}>
//         {renderContent()}
//       </div>

//       <div style={{ padding:'12px 16px', borderTop:'1px solid #E8ECF0',
//         flexShrink:0, display:'flex', flexDirection:'column', gap:8, background:'#fff' }}>
//         <button
//           onClick={()=>step<STEPS.length-1?setStep(s=>s+1):null}
//           style={{
//             ...F, width:'100%', padding:'13px', borderRadius:12, border:'none', cursor:'pointer',
//             fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:'.12em',
//             display:'flex', alignItems:'center', justifyContent:'center', gap:8,
//             background:`linear-gradient(135deg, #E8820C, #F59E0B)`,
//             color:'#fff', boxShadow:`0 6px 20px rgba(232,130,12,0.32)`, transition:'all 0.2s',
//           }}
//           onMouseEnter={e=>e.currentTarget.style.transform='translateY(-1px)'}
//           onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
//         >
//           {step<STEPS.length-1
//             ?<>{step===STEPS.length-2?'Review Order':'Continue'} <ArrowRight size={14}/></>
//             :<><Save size={13}/> Save &amp; Order</>
//           }
//         </button>
//         {step>0&&(
//           <button onClick={()=>setStep(s=>s-1)} style={{ background:'none', border:'none', cursor:'pointer',
//             ...F, fontSize:10, color:'#94A3B8', textAlign:'center', padding:2 }}>
//             ← Back to {STEPS[step-1].label}
//           </button>
//         )}
//       </div>
//     </>
//   );

//   if (!mounted) return (
//     <div style={{ height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#fff' }}>
//       <div style={{ width:38, height:38, border:`3px solid #E8820C`, borderTopColor:'transparent',
//         borderRadius:'50%', animation:'spin 1s linear infinite' }}/>
//       <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//     </div>
//   );

//   return (
//     <div suppressHydrationWarning style={{
//       height:'100vh', overflow:'hidden', background:'#fff',
//       fontFamily:"var(--font-primary,'Poppins'),sans-serif",
//       display:'flex', flexDirection:'column',
//     }}>

//       {/* HEADER */}
//       <header style={{
//         height:54, flexShrink:0, zIndex:100,
//         display:'flex', alignItems:'center', justifyContent:'space-between',
//         padding:'0 20px', background:'#fff', borderBottom:'1px solid #E8ECF0',
//       }}>
//         <div style={{ display:'flex', alignItems:'center', gap:10 }}>
//           <div style={{ width:30, height:30, borderRadius:8,
//             background:`linear-gradient(135deg, #E8820C, #F59E0B)`,
//             display:'flex', alignItems:'center', justifyContent:'center',
//             boxShadow:`0 3px 10px rgba(232,130,12,0.32)` }}>
//             <Paintbrush size={14} color="#fff"/>
//           </div>
//           <div>
//             <div style={{ ...F, fontSize:13, fontWeight:800, color:'#0F172A' }}>
//               {product?.name??'Kit Designer'}
//             </div>
//             <div style={{ ...F, fontSize:8, color:'#94A3B8', letterSpacing:'.2em', textTransform:'uppercase' }}>
//               Custom Kit Studio
//             </div>
//           </div>
//         </div>
//         <div style={{ display:'flex', alignItems:'center', gap:8 }}>
//           <button onClick={reset} style={{ display:'flex', alignItems:'center', gap:5,
//             padding:'7px 13px', borderRadius:8, border:'1px solid #E2E8F0',
//             background:'#fff', color:'#64748B', ...F, fontSize:10, fontWeight:700, cursor:'pointer' }}>
//             <RotateCcw size={10}/> Reset
//           </button>
//           <button style={{ display:'flex', alignItems:'center', gap:6,
//             padding:'7px 15px', borderRadius:9,
//             background:`linear-gradient(135deg, #E8820C, #F59E0B)`,
//             border:'none', color:'#fff', ...F, fontSize:10, fontWeight:800, cursor:'pointer',
//             boxShadow:`0 3px 12px rgba(232,130,12,0.28)` }}>
//             <Save size={10}/> Save
//           </button>
//           <button onClick={()=>setMobileOpen(v=>!v)} className="mob-toggle" style={{
//             display:'none', alignItems:'center', gap:5, padding:'7px 12px', borderRadius:8,
//             border:`1.5px solid rgba(232,130,12,0.4)`, background:Pmid,
//             color:'#E8820C', ...F, fontSize:10, fontWeight:700, cursor:'pointer',
//           }}>
//             <Menu size={14}/>
//           </button>
//         </div>
//       </header>

//       {/* BODY */}
//       <div style={{ display:'flex', flex:1, overflow:'hidden' }}>

//         {/* ══ LEFT — PRODUCT PREVIEW ══ */}
//         <div style={{
//           flex:1, position:'relative', display:'flex', alignItems:'center', justifyContent:'center',
//           background:'linear-gradient(135deg,#EEF2F7,#E2E8F0)',
//           overflow:'hidden',
//         }}>

//           {productImg ? (
//             /* ── REAL PRODUCT IMAGE with color overlay ── */
//             <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
//               {/* Base image */}
//               <img src={productImg} alt="Jersey preview" style={{
//                 position:'absolute', inset:0, width:'100%', height:'100%',
//                 objectFit:'contain', objectPosition:'center top',
//               }}/>
//               {/* Color overlay — mix-blend-mode multiply tints the jersey */}
//               <div style={{
//                 position:'absolute', inset:0,
//                 backgroundColor: jerseyColor,
//                 mixBlendMode: 'multiply',
//                 opacity: 0.55,
//                 pointerEvents:'none',
//               }}/>
//             </div>
//           ) : (
//             /* ── SVG fallback (full color, no overlay needed) ── */
//             <div style={{ position:'absolute', inset:0, display:'flex',
//               alignItems:'center', justifyContent:'center', padding:'64px 10%' }}>
//               <div style={{ width:'100%', maxWidth:340, height:'100%', maxHeight:480 }}>
//                 <JerseySVG
//                   jerseyColor={jerseyColor}
//                   sleeveColor={sleeveColor}
//                   collarType={collarType}
//                   view={view}
//                   clubLogo={clubLogo} sponsorLogo={sponsorLogo}
//                   nameText={nameText} nameStyleId={nameStyleId}
//                   nameTextStyle={nameTextStyle}
//                   nameColor={nameColor} nameVertical={nameVertical}
//                   numberText={numberText} numberStyleId={numberStyleId} numberColor={numberColor}
//                   showTeam={showTeam} teamName={teamName} teamColor={teamColor}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Back text overlay for real product image */}
//           {productImg && view==='back' && (
//             <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
//               alignItems:'center', paddingTop:`${nameVertical*0.9}%`, pointerEvents:'none', zIndex:10 }}>
//               {nameTextStyle!=='none'&&nameStyleId!=='none'&&(()=>{
//                 const ns=FONT_STYLES.find(f=>f.id===nameStyleId);
//                 if(nameTextStyle==='curved'){
//                   return (
//                     <svg width="300" height="60" style={{ overflow:'visible' }}>
//                       <defs><path id="oc" d="M 20,40 Q 150,10 280,40"/></defs>
//                       <text fontSize="clamp(12px,2.8vw,24px)" fontWeight={ns?.fontWeight}
//                         fontFamily={ns?.fontFamily} fill={nameColor}>
//                         <textPath href="#oc" startOffset="50%" textAnchor="middle">{nameText}</textPath>
//                       </text>
//                     </svg>
//                   );
//                 }
//                 return (
//                   <span style={{ fontFamily:ns?.fontFamily, fontWeight:ns?.fontWeight,
//                     color:nameColor, fontSize:'clamp(12px,2.8vw,24px)', letterSpacing:2,
//                     textShadow:'0 2px 6px rgba(0,0,0,0.3)' }}>
//                     {nameText}
//                   </span>
//                 );
//               })()}
//               {numberStyleId!=='none'&&(
//                 <span style={{
//                   fontFamily:FONT_STYLES.find(f=>f.id===numberStyleId)?.fontFamily,
//                   fontWeight:FONT_STYLES.find(f=>f.id===numberStyleId)?.fontWeight,
//                   color:numberColor, fontSize:'clamp(36px,9vw,80px)', lineHeight:1,
//                   textShadow:'0 2px 8px rgba(0,0,0,0.3)' }}>
//                   {numberText}
//                 </span>
//               )}
//             </div>
//           )}

//           {/* ── FLOATING OVERLAY CONTROLS ── */}

//           {/* View toggle — TOP CENTRE */}
//           <div style={{ position:'absolute', top:14, left:'50%', transform:'translateX(-50%)', zIndex:20 }}>
//             <div style={{ ...chip, borderRadius:99, padding:4, display:'inline-flex', gap:3 }}>
//               {['front','back'].map(v=>(
//                 <button key={v} onClick={()=>setView(v)} style={{
//                   padding:'6px 22px', borderRadius:99, fontSize:9, fontWeight:700,
//                   textTransform:'uppercase', letterSpacing:'.14em', border:'none', cursor:'pointer',
//                   background:view===v?`linear-gradient(135deg, #E8820C, #F59E0B)`:'transparent',
//                   color:view===v?'#fff':'#64748B', transition:'all 0.2s', ...F,
//                   boxShadow:view===v?`0 3px 10px rgba(232,130,12,0.35)`:'none',
//                 }}>{v}</button>
//               ))}
//             </div>
//           </div>

//           {/* Product name + price — TOP LEFT */}
//           <div style={{ position:'absolute', top:14, left:14, zIndex:20 }}>
//             <div style={{ ...chip, padding:'8px 14px' }}>
//               <div style={{ ...F, fontSize:11, fontWeight:800, color:'#0F172A' }}>{product?.name??'Custom Kit'}</div>
//               <div style={{ ...F, fontSize:8, color:'#E8820C', fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', marginTop:1 }}>
//                 ${product?.price??'149'} per unit
//               </div>
//             </div>
//           </div>

//           {/* Colour chip + sleeve chip — BOTTOM LEFT */}
//           <div style={{ position:'absolute', bottom:16, left:16, zIndex:20, display:'flex', flexDirection:'column', gap:7 }}>
//             <div style={{ ...chip, padding:'9px 14px', display:'flex', alignItems:'center', gap:9 }}>
//               <div style={{ width:16, height:16, borderRadius:'50%', backgroundColor:jerseyColor,
//                 border:'2px solid rgba(0,0,0,0.08)', flexShrink:0 }}/>
//               <div>
//                 <div style={{ ...F, fontSize:8, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.14em', lineHeight:1 }}>Base</div>
//                 <div style={{ ...F, fontSize:11, fontWeight:700, color:'#0F172A', marginTop:2 }}>{curColor?.name??jerseyColor}</div>
//               </div>
//             </div>
//             <div style={{ ...chip, padding:'9px 14px', display:'flex', alignItems:'center', gap:9 }}>
//               <div style={{ width:16, height:16, borderRadius:'50%', backgroundColor:sleeveColor,
//                 border:'2px solid rgba(0,0,0,0.08)', flexShrink:0 }}/>
//               <div>
//                 <div style={{ ...F, fontSize:8, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.14em', lineHeight:1 }}>Sleeve</div>
//                 <div style={{ ...F, fontSize:11, fontWeight:700, color:'#0F172A', marginTop:2 }}>
//                   {SLEEVE_COLORS.find(c=>c.code===sleeveColor)?.name??sleeveColor}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Size — BOTTOM CENTRE */}
//           <div style={{ position:'absolute', bottom:16, left:'50%', transform:'translateX(-50%)', zIndex:20 }}>
//             <div style={{ ...chip, padding:'8px 18px', display:'flex', alignItems:'center', gap:8 }}>
//               <span style={{ ...F, fontSize:9, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.12em' }}>Size</span>
//               <span style={{ ...F, fontSize:13, fontWeight:800, color:'#E8820C' }}>{selectedSize}</span>
//             </div>
//           </div>

//           {/* UNDO / REDO — BOTTOM RIGHT */}
//           <div style={{ position:'absolute', bottom:16, right:16, zIndex:20, display:'flex', flexDirection:'column', gap:7 }}>
//             <button style={{
//               display:'flex', alignItems:'center', gap:7, padding:'9px 16px',
//               borderRadius:10, border:'none', cursor:'pointer',
//               background:`linear-gradient(135deg, #E8820C, #F59E0B)`,
//               color:'#fff', boxShadow:`0 4px 14px rgba(232,130,12,0.38)`,
//               ...F, fontSize:11, fontWeight:800,
//             }}>
//               <Undo2 size={14}/> UNDO
//             </button>
//             <button style={{
//               display:'flex', alignItems:'center', gap:7, padding:'9px 16px',
//               borderRadius:10, border:'1px solid rgba(255,255,255,0.7)', cursor:'pointer',
//               background:'rgba(255,255,255,0.92)', backdropFilter:'blur(14px)',
//               color:'#64748B', boxShadow:'0 4px 14px rgba(0,0,0,0.09)',
//               ...F, fontSize:11, fontWeight:700,
//             }}>
//               <Redo2 size={14}/> REDO
//             </button>
//           </div>
//         </div>

//         {/* ══ RIGHT PANEL ══ */}
//         <div className="desktop-cfg" style={{
//           width:400, flexShrink:0, background:'#fff',
//           borderLeft:'1px solid #E8ECF0',
//           display:'flex', flexDirection:'column', overflow:'hidden',
//         }}>
//           {panelInner}
//         </div>

//         {/* ══ MOBILE SHEET ══ */}
//         {mobileOpen&&(
//           <div style={{ position:'fixed', inset:0, zIndex:300, display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
//             <div style={{ position:'absolute', inset:0, background:'rgba(15,23,42,0.4)', backdropFilter:'blur(6px)' }}
//               onClick={()=>setMobileOpen(false)}/>
//             <div style={{ position:'relative', background:'#fff', borderRadius:'20px 20px 0 0',
//               maxHeight:'92vh', display:'flex', flexDirection:'column',
//               boxShadow:'0 -8px 40px rgba(0,0,0,0.14)' }}>
//               <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
//                 padding:'14px 18px', borderBottom:'1px solid #E8ECF0' }}>
//                 <span style={{ ...F, fontSize:15, fontWeight:800, color:'#0F172A' }}>Customise</span>
//                 <button onClick={()=>setMobileOpen(false)} style={{ background:'#F1F5F9', border:'none',
//                   borderRadius:'50%', width:30, height:30, display:'flex', alignItems:'center',
//                   justifyContent:'center', cursor:'pointer' }}>
//                   <X size={13} color="#64748B"/>
//                 </button>
//               </div>
//               <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>{panelInner}</div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* MOBILE NAV */}
//       <div className="mob-nav" style={{ display:'none', position:'fixed', bottom:0, insetInline:0,
//         background:'rgba(255,255,255,0.97)', backdropFilter:'blur(20px)',
//         borderTop:'1px solid #E8ECF0', zIndex:40 }}>
//         {STEPS.map((s,i)=>{
//           const Icon=s.Icon; const active=step===i;
//           return (
//             <button key={s.id} onClick={()=>{ setStep(i); setMobileOpen(true); }} style={{
//               flex:1, display:'flex', flexDirection:'column', alignItems:'center',
//               justifyContent:'center', gap:3, padding:'9px 0', cursor:'pointer',
//               border:'none', background:'transparent', color:active?'#E8820C':'#94A3B8',
//             }}>
//               <Icon size={18} strokeWidth={active?2.5:1.8}/>
//               <span style={{ ...F, fontSize:7, fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em' }}>{s.label}</span>
//             </button>
//           );
//         })}
//       </div>

//       <style jsx>{`
//         @media(max-width:1023px){
//           .desktop-cfg { display:none!important; }
//           .mob-nav     { display:flex!important; }
//           .mob-toggle  { display:flex!important; }
//         }
//         ::-webkit-scrollbar { width:4px; }
//         ::-webkit-scrollbar-track { background:#F1F5F9; border-radius:10px; }
//         ::-webkit-scrollbar-thumb { background:rgba(232,130,12,0.4); border-radius:10px; }
//         ::-webkit-scrollbar-thumb:hover { background:#E8820C; }
//       `}</style>
//     </div>
//   );
// }











//glb 3d viewr working code






// 'use client';

// import { useState, useCallback, useEffect } from 'react';
// import {
//   Upload, ChevronDown, Save, Check, Trash2,
//   Type, Shield, Paintbrush, ShoppingBag, ArrowRight,
//   RotateCcw, X, Menu, Zap, Download, Star, Undo2, Redo2,
//   Maximize2, Minus, Plus
// } from 'lucide-react';
// import GLBViewer from '../common/GLBViewer';

// // Colors Data
// const JERSEY_COLORS = [
//   { name: 'Obsidian', code: '#111111' },
//   { name: 'Crimson', code: '#DC2626' },
//   { name: 'Deep Navy', code: '#1D3557' },
//   { name: 'Royal Blue', code: '#1E40AF' },
//   { name: 'Emerald', code: '#059669' },
//   { name: 'Gold', code: '#D97706' },
//   { name: 'Pure White', code: '#FFFFFF' },
//   { name: 'Black', code: '#000000' },
// ];

// const SLEEVE_COLORS = [
//   { name: 'Obsidian', code: '#111111' },
//   { name: 'Crimson', code: '#DC2626' },
//   { name: 'Deep Navy', code: '#1D3557' },
//   { name: 'Pure White', code: '#FFFFFF' },
// ];

// const COLLAR_TYPES = [
//   { id: 'round', label: 'Round', icon: '○' },
//   { id: 'v-neck', label: 'V-Neck', icon: '∨' },
//   { id: 'polo', label: 'Polo', icon: '⊓' },
// ];

// const TEXT_COLORS = ['#FFFFFF', '#000000', '#E8820C', '#DC2626', '#1D3557', '#F59E0B'];

// const FONT_STYLES = [
//   { id: 'collegiate', label: 'COLLEGIATE', fontFamily: '"Arial Black", sans-serif', fontWeight: '900' },
//   { id: 'block', label: 'BLOCK', fontFamily: 'Impact, sans-serif', fontWeight: '900' },
//   { id: 'varsity', label: 'VARSITY', fontFamily: '"Georgia", serif', fontWeight: '900', fontStyle: 'italic' },
//   { id: 'sport', label: 'SPORT', fontFamily: '"Verdana", sans-serif', fontWeight: '700' },
//   { id: 'modern', label: 'MODERN', fontFamily: '"Helvetica", sans-serif', fontWeight: '900' },
// ];

// const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
// const STEPS = [
//   { id: 'style', label: 'Style', Icon: Paintbrush },
//   { id: 'colors', label: 'Colors', Icon: Paintbrush },
//   { id: 'logos', label: 'Logos', Icon: Shield },
//   { id: 'text', label: 'Text', Icon: Type },
//   { id: 'order', label: 'Order', Icon: ShoppingBag },
// ];

// const NAME_STYLES = [
//   { id: 'none', label: 'None' },
//   { id: 'straight', label: 'Straight' },
//   { id: 'curved', label: 'Curved' },
// ];

// const isLight = (h) => {
//   if (!h || h === 'transparent') return true;
//   const r = parseInt(h.slice(1, 3), 16);
//   const g = parseInt(h.slice(3, 5), 16);
//   const b = parseInt(h.slice(5, 7), 16);
//   return (r * 299 + g * 587 + b * 114) / 1000 > 160;
// };

// const getGlbPathForProduct = () => '/images/jerseys/jersey.glb';

// // Jersey SVG Component
// const JerseySVG = ({ jerseyColor, sleeveColor, collarType, view, clubLogo, sponsorLogo, nameText, nameStyleId, nameTextStyle, nameColor, nameVertical, numberText, numberStyleId, numberColor, showTeam, teamName, teamColor }) => {
//   const ns = FONT_STYLES.find(f => f.id === nameStyleId) || FONT_STYLES[0];
//   const light = isLight(jerseyColor);
//   const seam = light ? 'rgba(0,0,0,0.13)' : 'rgba(255,255,255,0.12)';
//   const sleeveCol = sleeveColor || jerseyColor;

//   const collarPath = collarType === 'v-neck' ? "M130,46 L150,68 L170,46" : "M125,46 Q150,55 175,46";

//   return (
//     <svg viewBox="0 0 300 380" style={{ width: '100%', height: '100%' }}>
//       <ellipse cx="150" cy="375" rx="82" ry="7" fill="rgba(0,0,0,0.12)" />
//       <path d="M65,38 L8,78 L18,155 L56,140 L56,100 Z" fill={sleeveCol} stroke={seam} strokeWidth="1" />
//       <path d="M235,38 L292,78 L282,155 L244,140 L244,100 Z" fill={sleeveCol} stroke={seam} strokeWidth="1" />
//       <path d="M65,38 L56,100 L56,342 L244,342 L244,100 L235,38 L202,18 Q175,46 150,46 Q125,46 98,18 Z" fill={jerseyColor} stroke={seam} strokeWidth="1.2" />
//       <path d={collarPath} fill="none" stroke={seam} strokeWidth="3" />
      
//       {clubLogo && view === 'front' && <image href={clubLogo} x="84" y="82" width="46" height="46" />}
//       {sponsorLogo && view === 'front' && <image href={sponsorLogo} x="98" y="142" width="104" height="34" preserveAspectRatio="xMidYMid meet" />}
      
//       {view === 'back' && nameStyleId !== 'none' && nameTextStyle === 'straight' && (
//         <text x="150" y={nameVertical * 2.6} textAnchor="middle" fontFamily={ns.fontFamily} fontSize="22" fontWeight={ns.fontWeight} fill={nameColor}>
//           {nameText}
//         </text>
//       )}
//       {view === 'back' && nameStyleId !== 'none' && nameTextStyle === 'curved' && (
//         <>
//           <defs><path id="nameCurve" d={`M 70,${nameVertical * 2.4} Q 150,${nameVertical * 2.4 - 20} 230,${nameVertical * 2.4}`} /></defs>
//           <text textAnchor="middle" fontFamily={ns.fontFamily} fontSize="22" fontWeight={ns.fontWeight} fill={nameColor}>
//             <textPath href="#nameCurve" startOffset="50%">{nameText}</textPath>
//           </text>
//         </>
//       )}
//       {view === 'back' && numberStyleId !== 'none' && (
//         <text x="150" y={nameVertical * 2.6 + 72} textAnchor="middle" fontFamily="Impact,sans-serif" fontSize="72" fontWeight="900" fill={numberColor}>
//           {numberText}
//         </text>
//       )}
//       {view === 'back' && showTeam && (
//         <text x="150" y="314" textAnchor="middle" fontFamily='"Trebuchet MS",sans-serif' fontSize="10" fontWeight="700" fill={teamColor} letterSpacing="5">
//           {teamName}
//         </text>
//       )}
//     </svg>
//   );
// };

// export default function JerseyCustomizer({ product }) {
//   const [mounted, setMounted] = useState(false);
//   const [step, setStep] = useState(0);
//   const [jerseyColor, setJerseyColor] = useState(product?.colors?.[0] || '#DC2626');
//   const [sleeveColor, setSleeveColor] = useState('#111111');
//   const [collarType, setCollarType] = useState('round');
//   const [view, setView] = useState('front');
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [viewMode, setViewMode] = useState('glb');
//   const [isZoomed, setIsZoomed] = useState(false);

//   const [clubLogo, setClubLogo] = useState(null);
//   const [sponsorLogo, setSponsorLogo] = useState(null);

//   const [nameTextStyle, setNameTextStyle] = useState('straight');
//   const [nameStyleId, setNameStyleId] = useState('collegiate');
//   const [nameText, setNameText] = useState('PLAYER');
//   const [nameColor, setNameColor] = useState('#FFFFFF');
//   const [nameVertical, setNameVertical] = useState(38);

//   const [numberStyleId, setNumberStyleId] = useState('block');
//   const [numberText, setNumberText] = useState('10');
//   const [numberColor, setNumberColor] = useState('#F59E0B');

//   const [teamName, setTeamName] = useState('YOUR TEAM');
//   const [teamColor, setTeamColor] = useState('#64748B');
//   const [showTeam, setShowTeam] = useState(false);

//   const [selectedSize, setSelectedSize] = useState('L');
//   const [quantity, setQuantity] = useState(10);

//   const [fabOpen, setFabOpen] = useState(true);
//   const [collarOpen, setCollarOpen] = useState(false);
//   const [baseOpen, setBaseOpen] = useState(true);
//   const [sleeveOpen, setSleeveOpen] = useState(false);
//   const [nameOpen, setNameOpen] = useState(true);
//   const [numOpen, setNumOpen] = useState(false);
//   const [teamOpen, setTeamOpen] = useState(false);

//   useEffect(() => { setMounted(true); }, []);

//   const handleUpload = useCallback((setter) => (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith('image/')) { alert('Please upload an image file'); return; }
//     if (file.size > 5 * 1024 * 1024) { alert('File size should be less than 5MB'); return; }
//     const reader = new FileReader();
//     reader.onloadend = () => setter(reader.result);
//     reader.readAsDataURL(file);
//   }, []);

//   const reset = () => {
//     setJerseyColor(product?.colors?.[0] || '#DC2626');
//     setSleeveColor('#111111');
//     setCollarType('round');
//     setClubLogo(null);
//     setSponsorLogo(null);
//     setNameText('PLAYER');
//     setNumberText('10');
//     setTeamName('YOUR TEAM');
//     setNameColor('#FFFFFF');
//     setNumberColor('#F59E0B');
//     setNameVertical(38);
//     setShowTeam(false);
//     setNameStyleId('collegiate');
//     setNumberStyleId('block');
//     setNameTextStyle('straight');
//     setSelectedSize('L');
//     setQuantity(10);
//   };

//   const curColor = JERSEY_COLORS.find(c => c.code === jerseyColor);
//   const productImg = view === 'front' ? product?.mainImage : product?.hoverImage;
//   const F = { fontFamily: "'Poppins', sans-serif" };

//   const chip = {
//     background: 'rgba(255,255,255,0.93)',
//     backdropFilter: 'blur(14px)',
//     border: '1px solid rgba(255,255,255,0.75)',
//     boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
//     borderRadius: 12
//   };

//   const ColorSwatch = ({ color, selected, onSelect }) => {
//     const sel = (selected || jerseyColor) === color.code;
//     return (
//       <button onClick={() => onSelect ? onSelect(color.code) : setJerseyColor(color.code)} style={{
//         width: 32, height: 32, borderRadius: 8, cursor: 'pointer',
//         border: `2px solid ${sel ? '#003E9B' : '#E2E8F0'}`,
//         backgroundColor: color.code,
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         transform: sel ? 'scale(1.18)' : 'scale(1)',
//         transition: 'all 0.16s',
//       }}>
//         {sel && <Check size={9} strokeWidth={3.5} color={isLight(color.code) ? '#000' : '#fff'} />}
//       </button>
//     );
//   };

//   const ColorDots = ({ selected, onSelect }) => (
//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
//       {TEXT_COLORS.map(c => (
//         <button key={c} onClick={() => onSelect(c)} style={{
//           width: 28, height: 28, borderRadius: 7,
//           border: `2px solid ${selected === c ? '#003E9B' : 'transparent'}`,
//           backgroundColor: c, cursor: 'pointer',
//           transform: selected === c ? 'scale(1.2)' : 'scale(1)',
//           transition: 'all 0.16s',
//         }} />
//       ))}
//     </div>
//   );

//   const FontGrid = ({ selectedId, onSelect }) => (
//     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
//       {FONT_STYLES.map(f => {
//         const sel = selectedId === f.id;
//         return (
//           <button key={f.id} onClick={() => onSelect(f.id)} style={{
//             height: 56, borderRadius: 9, cursor: 'pointer',
//             border: `1.5px solid ${sel ? '#003E9B' : '#E2E8F0'}`,
//             background: sel ? 'rgba(0,62,155,0.10)' : '#F8FAFC',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>
//             <span style={{
//               fontFamily: f.fontFamily,
//               fontWeight: f.fontWeight,
//               fontSize: 10,
//               color: sel ? '#003E9B' : '#334155',
//             }}>{f.label}</span>
//           </button>
//         );
//       })}
//     </div>
//   );

//   const Section = ({ open, onToggle, label, badge, children }) => (
//     <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E8ECF0', overflow: 'hidden', marginBottom: 12 }}>
//       <button onClick={onToggle} style={{
//         width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//         padding: '14px 16px', border: 'none', cursor: 'pointer',
//         background: open ? 'rgba(0,62,155,0.05)' : '#FAFAFA',
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <span style={{ ...F, fontSize: 11, fontWeight: 700, color: open ? '#003E9B' : '#334155' }}>{label}</span>
//           {badge && <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 12, background: open ? 'rgba(0,62,155,0.1)' : '#EEF2FF', color: open ? '#003E9B' : '#4F46E5' }}>{badge}</span>}
//         </div>
//         <ChevronDown size={14} color={open ? '#003E9B' : '#94A3B8'} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
//       </button>
//       {open && <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>}
//     </div>
//   );

//   const UploadSlot = ({ label, type, state, setter }) => (
//     <div style={{ border: '1px solid #E8ECF0', borderRadius: 10, overflow: 'hidden', marginBottom: 10 }}>
//       <div style={{ padding: '10px 12px', background: '#F8FAFC', borderBottom: '1px solid #E8ECF0' }}>
//         <span style={{ fontSize: 11, fontWeight: 700 }}>{label}</span>
//       </div>
//       <div style={{ padding: 12 }}>
//         {state ? (
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
//             <img src={state} alt={label} style={{ maxHeight: 60, objectFit: 'contain' }} />
//             <button onClick={() => setter(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}>
//               <Trash2 size={14} />
//             </button>
//           </div>
//         ) : (
//           <button onClick={() => document.getElementById(`up-${type}`).click()} style={{
//             width: '100%', padding: '16px', border: '1.5px dashed #CBD5E1', borderRadius: 8, cursor: 'pointer',
//             display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
//             fontSize: 10, fontWeight: 700, color: '#94A3B8',
//           }}>
//             <Upload size={14} /> Upload Image
//           </button>
//         )}
//         <input id={`up-${type}`} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload(setter)} />
//       </div>
//     </div>
//   );

//   const NameStyleSelector = () => (
//     <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
//       {NAME_STYLES.map(ns => {
//         const sel = nameTextStyle === ns.id;
//         return (
//           <button key={ns.id} onClick={() => setNameTextStyle(ns.id)} style={{
//             flex: 1, padding: '12px', borderRadius: 10, cursor: 'pointer',
//             border: `2px solid ${sel ? '#003E9B' : '#E2E8F0'}`,
//             background: sel ? 'rgba(0,62,155,0.10)' : '#F8FAFC',
//             textAlign: 'center',
//           }}>
//             <span style={{ fontSize: 12, fontWeight: 700, color: sel ? '#003E9B' : '#64748B' }}>{ns.label}</span>
//           </button>
//         );
//       })}
//     </div>
//   );

//   const renderContent = () => {
//     if (step === 0) return (
//       <div>
//         <Section open={fabOpen} onToggle={() => setFabOpen(!fabOpen)} label="Fabric Technology">
//           <div style={{ display: 'flex', gap: 8 }}>
//             <button style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid #003E9B', background: 'rgba(0,62,155,0.10)', fontWeight: 700 }}>ClimateTech Pro</button>
//             <button style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid #E2E8F0', background: '#F8FAFC', fontWeight: 700 }}>CoolWeave</button>
//           </div>
//           <p style={{ fontSize: 11, color: '#64748B', marginTop: 8 }}>Bio-washed performance fabric with UV protection & elite moisture management.</p>
//         </Section>

//         <Section open={collarOpen} onToggle={() => setCollarOpen(!collarOpen)} label="Collar">
//           <div style={{ display: 'flex', gap: 8 }}>
//             {COLLAR_TYPES.map(c => {
//               const sel = collarType === c.id;
//               return (
//                 <button key={c.id} onClick={() => setCollarType(c.id)} style={{
//                   flex: 1, padding: '12px', borderRadius: 10, cursor: 'pointer', textAlign: 'center',
//                   border: `1.5px solid ${sel ? '#003E9B' : '#E2E8F0'}`,
//                   background: sel ? 'rgba(0,62,155,0.10)' : '#F8FAFC',
//                 }}>
//                   <span style={{ fontSize: 18 }}>{c.icon}</span>
//                   <span style={{ fontSize: 10, fontWeight: 700, display: 'block' }}>{c.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </Section>
//       </div>
//     );

//     if (step === 1) return (
//       <div>
//         <Section open={baseOpen} onToggle={() => setBaseOpen(!baseOpen)} label="Base Colour" badge={curColor?.name}>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
//             {JERSEY_COLORS.map(c => <ColorSwatch key={c.code} color={c} selected={jerseyColor} onSelect={setJerseyColor} />)}
//           </div>
//         </Section>

//         <Section open={sleeveOpen} onToggle={() => setSleeveOpen(!sleeveOpen)} label="Sleeve Colour">
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
//             {SLEEVE_COLORS.map(c => <ColorSwatch key={c.code} color={c} selected={sleeveColor} onSelect={setSleeveColor} />)}
//           </div>
//           <button onClick={() => setSleeveColor(jerseyColor)} style={{
//             fontSize: 10, fontWeight: 700, color: '#003E9B', background: 'rgba(0,62,155,0.10)',
//             border: '1px solid rgba(0,62,155,0.3)', borderRadius: 8, padding: '10px', cursor: 'pointer', width: '100%'
//           }}>↔ Match Base Colour</button>
//         </Section>
//       </div>
//     );

//     if (step === 2) return (
//       <div>
//         <UploadSlot label="Club Badge" type="club" state={clubLogo} setter={setClubLogo} />
//         <UploadSlot label="Sponsor Logo" type="sponsor" state={sponsorLogo} setter={setSponsorLogo} />
//       </div>
//     );

//     if (step === 3) return (
//       <div>
//         <Section open={nameOpen} onToggle={() => setNameOpen(!nameOpen)} label="Player Name">
//           <NameStyleSelector />
//           {nameTextStyle !== 'none' && (
//             <>
//               <input value={nameText} onChange={e => setNameText(e.target.value.toUpperCase())} placeholder="PLAYER NAME" style={{
//                 width: '100%', padding: '12px', border: '1.5px solid #E2E8F0', borderRadius: 10, marginBottom: 12,
//                 fontSize: 13, fontWeight: 700
//               }} />
//               <div style={{ marginBottom: 12 }}>
//                 <span style={{ fontSize: 10, fontWeight: 700, display: 'block', marginBottom: 8 }}>Font Style</span>
//                 <FontGrid selectedId={nameStyleId} onSelect={setNameStyleId} />
//               </div>
//               <div style={{ marginBottom: 12 }}>
//                 <span style={{ fontSize: 10, fontWeight: 700, display: 'block', marginBottom: 8 }}>Text Colour</span>
//                 <ColorDots selected={nameColor} onSelect={setNameColor} />
//               </div>
//               <div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
//                   <span style={{ fontSize: 10, fontWeight: 700 }}>Vertical Position</span>
//                   <span style={{ fontSize: 11, fontWeight: 700, color: '#003E9B' }}>{nameVertical}%</span>
//                 </div>
//                 <input type="range" min="20" max="65" value={nameVertical} onChange={e => setNameVertical(Number(e.target.value))} style={{ width: '100%', accentColor: '#003E9B' }} />
//               </div>
//             </>
//           )}
//         </Section>

//         <Section open={numOpen} onToggle={() => setNumOpen(!numOpen)} label="Player Number">
//           <input value={numberText} onChange={e => setNumberText(e.target.value)} maxLength={2} placeholder="NUMBER" style={{
//             width: '100%', padding: '12px', border: '1.5px solid #E2E8F0', borderRadius: 10, marginBottom: 12,
//             fontSize: 13, fontWeight: 700
//           }} />
//           <div>
//             <span style={{ fontSize: 10, fontWeight: 700, display: 'block', marginBottom: 8 }}>Number Colour</span>
//             <ColorDots selected={numberColor} onSelect={setNumberColor} />
//           </div>
//         </Section>

//         <div style={{ border: '1px solid #E8ECF0', borderRadius: 12, overflow: 'hidden' }}>
//           <button onClick={() => setTeamOpen(!teamOpen)} style={{
//             width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//             padding: '14px 16px', background: teamOpen ? 'rgba(0,62,155,0.05)' : '#FAFAFA', border: 'none', cursor: 'pointer'
//           }}>
//             <span style={{ fontSize: 11, fontWeight: 700 }}>Team Name</span>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//               <div onClick={e => { e.stopPropagation(); setShowTeam(!showTeam); }} style={{
//                 width: 40, height: 20, borderRadius: 99, cursor: 'pointer', position: 'relative',
//                 background: showTeam ? '#003E9B' : '#CBD5E1', transition: 'background 0.22s'
//               }}>
//                 <span style={{ position: 'absolute', top: 2, left: showTeam ? 20 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.22s' }} />
//               </div>
//               <ChevronDown size={14} color={teamOpen ? '#003E9B' : '#94A3B8'} style={{ transform: teamOpen ? 'rotate(180deg)' : 'none' }} />
//             </div>
//           </button>
//           {teamOpen && (
//             <div style={{ padding: '16px' }}>
//               {showTeam ? (
//                 <>
//                   <input value={teamName} onChange={e => setTeamName(e.target.value.toUpperCase())} placeholder="TEAM NAME" style={{
//                     width: '100%', padding: '12px', border: '1.5px solid #E2E8F0', borderRadius: 10, marginBottom: 12
//                   }} />
//                   <ColorDots selected={teamColor} onSelect={setTeamColor} />
//                 </>
//               ) : (
//                 <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center' }}>Toggle on to show team name on jersey</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     );

//     return (
//       <div>
//         <div style={{ padding: '12px 16px', background: '#F0FDF4', borderRadius: 10, border: '1px solid #BBF7D0', marginBottom: 12 }}>
//           <p style={{ fontSize: 12, color: '#166534' }}>Add players' names, numbers and sizes to complete your order.</p>
//         </div>

//         <div style={{ marginBottom: 16 }}>
//           <span style={{ fontSize: 10, fontWeight: 700, display: 'block', marginBottom: 8 }}>Select Size</span>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
//             {SIZES.map(s => {
//               const sel = selectedSize === s;
//               return (
//                 <button key={s} onClick={() => setSelectedSize(s)} style={{
//                   width: 50, height: 50, borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: 'pointer',
//                   border: `1.5px solid ${sel ? '#003E9B' : '#E2E8F0'}`,
//                   background: sel ? 'rgba(0,62,155,0.10)' : '#F8FAFC',
//                   color: sel ? '#003E9B' : '#64748B'
//                 }}>{s}</button>
//               );
//             })}
//           </div>
//         </div>

//         <div style={{ marginBottom: 16 }}>
//           <span style={{ fontSize: 10, fontWeight: 700, display: 'block', marginBottom: 8 }}>Quantity</span>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#F8FAFC', padding: 8, borderRadius: 10, justifyContent: 'center' }}>
//             <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 40, height: 40, borderRadius: 8, background: '#fff', border: '1px solid #E2E8F0', cursor: 'pointer' }}><Minus size={16} /></button>
//             <span style={{ fontSize: 18, fontWeight: 800, minWidth: 60, textAlign: 'center' }}>{quantity}</span>
//             <button onClick={() => setQuantity(quantity + 1)} style={{ width: 40, height: 40, borderRadius: 8, background: '#fff', border: '1px solid #E2E8F0', cursor: 'pointer' }}><Plus size={16} /></button>
//           </div>
//         </div>

//         <div style={{ border: '1px solid rgba(0,62,155,0.25)', borderRadius: 12, background: 'rgba(0,62,155,0.03)', padding: 16 }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
//             <Star size={16} color="#003E9B" fill="#003E9B" />
//             <span style={{ fontSize: 14, fontWeight: 800, color: '#003E9B' }}>Order Summary</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//             <span style={{ fontSize: 11, color: '#64748B' }}>Base Jersey</span>
//             <span style={{ fontSize: 12, fontWeight: 600 }}>${product?.price || 89}</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//             <span style={{ fontSize: 11, color: '#64748B' }}>Player Name & Number</span>
//             <span style={{ fontSize: 12, fontWeight: 600 }}>Included</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(0,62,155,0.12)', marginTop: 8 }}>
//             <span style={{ fontSize: 12, fontWeight: 700 }}>Total ({quantity} units)</span>
//             <span style={{ fontSize: 20, fontWeight: 900, color: '#003E9B' }}>${(product?.price || 89) * quantity}</span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const panelInner = (
//     <>
//       <div style={{ display: 'flex', borderBottom: '1px solid #E8ECF0' }}>
//         {STEPS.map((s, i) => {
//           const active = step === i;
//           const Icon = s.Icon;
//           return (
//             <button key={s.id} onClick={() => setStep(i)} style={{
//               flex: 1, padding: '12px 4px', border: 'none', cursor: 'pointer',
//               borderBottom: `2.5px solid ${active ? '#003E9B' : 'transparent'}`,
//               background: active ? 'rgba(0,62,155,0.05)' : 'transparent',
//               color: active ? '#003E9B' : '#94A3B8'
//             }}>
//               <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />
//               <span style={{ fontSize: 8, fontWeight: 700, marginTop: 4 }}>{s.label}</span>
//             </button>
//           );
//         })}
//       </div>

//       <div style={{ padding: '16px 18px', borderBottom: '1px solid #E8ECF0' }}>
//         <div style={{ fontSize: 18, fontWeight: 800 }}>{product?.name || 'Kit Designer'}</div>
//         <div style={{ fontSize: 9, color: '#94A3B8', marginTop: 2 }}>{['Style & Fabric', 'Colors', 'Logos', 'Text & Numbers', 'Order'][step]}</div>
//       </div>

//       <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: '#FAFAFA' }}>
//         {renderContent()}
//       </div>

//       <div style={{ padding: '14px 16px', borderTop: '1px solid #E8ECF0' }}>
//         <button onClick={() => step < 4 ? setStep(step + 1) : null} style={{
//           width: '100%', padding: '14px', borderRadius: 12, border: 'none', cursor: 'pointer',
//           fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//           background: 'linear-gradient(135deg, #0EA5E9, #0284C7, #1E3A8A)', color: '#fff'
//         }}>
//           {step < 4 ? <>Continue <ArrowRight size={16} /></> : <><ShoppingBag size={16} /> Place Order</>}
//         </button>
//         {step > 0 && (
//           <button onClick={() => setStep(step - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: '#94A3B8', marginTop: 10, width: '100%' }}>
//             ← Back to {STEPS[step - 1].label}
//           </button>
//         )}
//       </div>
//     </>
//   );

//   if (!mounted) return (
//     <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <div style={{ width: 40, height: 40, border: '3px solid #003E9B', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
//     </div>
//   );

//   return (
//     <div style={{ height: '100vh', overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
//       <header style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: '#fff', borderBottom: '1px solid #E8ECF0' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//           <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, #0EA5E9, #0284C7, #1E3A8A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <Paintbrush size={16} color="#fff" />
//           </div>
//           <div>
//             <div style={{ fontSize: 14, fontWeight: 800 }}>{product?.name || 'Kit Designer'}</div>
//             <div style={{ fontSize: 9, color: '#94A3B8' }}>Custom Kit Studio</div>
//           </div>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//           <button onClick={reset} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1px solid #E2E8F0', background: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
//             <RotateCcw size={12} /> Reset
//           </button>
//           <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg, #0EA5E9, #0284C7, #1E3A8A)', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
//             <Save size={12} /> Save
//           </button>
//           <button onClick={() => setMobileOpen(!mobileOpen)} className="mob-toggle" style={{ display: 'none', padding: '8px 12px', borderRadius: 8, background: 'rgba(0,62,155,0.10)', color: '#003E9B', cursor: 'pointer' }}>
//             <Menu size={18} />
//           </button>
//         </div>
//       </header>

//       <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
//         {/* LEFT PANEL - 3D/2D VIEWER */}
//         <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(135deg,#EEF2F7,#E2E8F0)', overflow: 'hidden' }}>
//           {/* View Toggle */}
//           <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', gap: 8 }}>
//             <button onClick={() => setViewMode('glb')} style={{
//               padding: '6px 14px', borderRadius: 30, fontSize: 10, fontWeight: 700, cursor: 'pointer',
//               background: viewMode === 'glb' ? 'linear-gradient(135deg, #0EA5E9, #0284C7, #1E3A8A)' : 'rgba(255,255,255,0.95)',
//               border: viewMode === 'glb' ? 'none' : '1px solid #003E9B',
//               color: viewMode === 'glb' ? '#fff' : '#003E9B'
//             }}>
//               3D 360° View
//             </button>
//             <button onClick={() => setViewMode('2d')} style={{
//               padding: '6px 14px', borderRadius: 30, fontSize: 10, fontWeight: 700, cursor: 'pointer',
//               background: viewMode === '2d' ? 'linear-gradient(135deg, #0EA5E9, #0284C7, #1E3A8A)' : 'rgba(255,255,255,0.95)',
//               border: viewMode === '2d' ? 'none' : '1px solid #003E9B',
//               color: viewMode === '2d' ? '#fff' : '#003E9B'
//             }}>
//               2D View
//             </button>
//           </div>

//           {/* Zoom Button */}
//           <button onClick={() => setIsZoomed(!isZoomed)} style={{ position: 'absolute', top: 16, right: 16, zIndex: 20, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', padding: 8, borderRadius: 40, border: 'none', cursor: 'pointer' }}>
//             <Maximize2 size={16} />
//           </button>

//           {/* 3D GLB View */}
//           {viewMode === 'glb' && (
//             <div style={{ position: 'absolute', inset: 0 }}>
//               <GLBViewer
//                 glbPath={getGlbPathForProduct()}
//                 autoRotate={true}
//                 backgroundColor="#E2E8F0"
//                 jerseyColor={jerseyColor}
//                 playerName={nameText}
//                 playerNumber={numberText}
//                 nameColor={nameColor}
//                 numberColor={numberColor}
//                 nameStyleId={nameStyleId}
//                 nameTextStyle={nameTextStyle}
//                 nameVertical={nameVertical}
//                 showText={nameTextStyle !== 'none'}
//               />
//             </div>
//           )}

//           {/* 2D SVG View */}
//           {viewMode === '2d' && (
//             <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isZoomed ? 20 : '64px 10%', transition: 'all 0.3s' }}>
//               <div style={{ width: '100%', maxWidth: isZoomed ? 500 : 340, transition: 'all 0.3s' }}>
//                 <JerseySVG
//                   jerseyColor={jerseyColor}
//                   sleeveColor={sleeveColor}
//                   collarType={collarType}
//                   view={view}
//                   clubLogo={clubLogo}
//                   sponsorLogo={sponsorLogo}
//                   nameText={nameText}
//                   nameStyleId={nameStyleId}
//                   nameTextStyle={nameTextStyle}
//                   nameColor={nameColor}
//                   nameVertical={nameVertical}
//                   numberText={numberText}
//                   numberStyleId={numberStyleId}
//                   numberColor={numberColor}
//                   showTeam={showTeam}
//                   teamName={teamName}
//                   teamColor={teamColor}
//                 />
//               </div>
//             </div>
//           )}

//           {/* 2D Controls */}
//           {viewMode === '2d' && (
//             <>
//               <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
//                 <div style={{ ...chip, borderRadius: 99, padding: 4, display: 'inline-flex', gap: 4 }}>
//                   {['front', 'back'].map(v => (
//                     <button key={v} onClick={() => setView(v)} style={{
//                       padding: '8px 28px', borderRadius: 99, fontSize: 10, fontWeight: 700, cursor: 'pointer',
//                       background: view === v ? 'linear-gradient(135deg, #0EA5E9, #0284C7, #1E3A8A)' : 'transparent',
//                       border: view === v ? 'none' : '1px solid #003E9B',
//                       color: view === v ? '#fff' : '#003E9B'
//                     }}>
//                       {v.toUpperCase()}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 20 }}>
//                 <div style={chip}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//                     <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: jerseyColor, border: '1px solid rgba(0,0,0,0.1)' }} />
//                     <div><span style={{ fontSize: 9, color: '#94A3B8' }}>Base</span><div style={{ fontSize: 11, fontWeight: 700 }}>{curColor?.name || jerseyColor}</div></div>
//                   </div>
//                 </div>
//               </div>

//               <div style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 20 }}>
//                 <div style={chip}>
//                   <div><span style={{ fontSize: 9, color: '#94A3B8' }}>Size</span><div style={{ fontSize: 13, fontWeight: 800, color: '#003E9B' }}>{selectedSize}</div></div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         {/* RIGHT PANEL - CUSTOMIZATION */}
//         <div className="desktop-cfg" style={{ width: 380, background: '#fff', borderLeft: '1px solid #E8ECF0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//           {panelInner}
//         </div>
//       </div>

//       {/* MOBILE BOTTOM NAV */}
//       <div className="mob-nav" style={{ display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)', borderTop: '1px solid #E8ECF0', zIndex: 40 }}>
//         {STEPS.map((s, i) => {
//           const Icon = s.Icon;
//           const active = step === i;
//           return (
//             <button key={s.id} onClick={() => { setStep(i); setMobileOpen(true); }} style={{
//               flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '10px 0', cursor: 'pointer',
//               border: 'none', background: 'transparent', color: active ? '#003E9B' : '#94A3B8'
//             }}>
//               <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
//               <span style={{ fontSize: 8, fontWeight: 700 }}>{s.label}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* MOBILE DRAWER */}
//       {mobileOpen && (
//         <div style={{ position: 'fixed', inset: 0, zIndex: 300 }}>
//           <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)} />
//           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '24px 24px 0 0', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #E8ECF0' }}>
//               <span style={{ fontSize: 16, fontWeight: 800 }}>Customize</span>
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
        
//         @media (max-width: 1023px) {
//           .desktop-cfg { display: none !important; }
//           .mob-nav, .mob-toggle { display: flex !important; }
//         }
        
//         @media (min-width: 1024px) {
//           .mob-nav, .mob-toggle { display: none !important; }
//         }
        
//         button { transition: all 0.2s ease; }
//         button:active { transform: scale(0.98); }
        
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 10px; }
//         ::-webkit-scrollbar-thumb { background: linear-gradient(135deg, #0EA5E9, #0284C7); border-radius: 10px; }
//       `}</style>
//     </div>
//   );
// }














'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  Upload, ChevronDown, Save, Check, Trash2,
  Type, Shield, Paintbrush, ShoppingBag, ArrowRight,
  RotateCcw, X, Menu, Star, Maximize2,
} from 'lucide-react';
import GLBViewer from '../common/GLBViewer';

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────

const JERSEY_COLORS = [
  { name: 'Obsidian',   code: '#111111' },
  { name: 'Crimson',    code: '#DC2626' },
  { name: 'Deep Navy',  code: '#1D3557' },
  { name: 'Royal Blue', code: '#1E40AF' },
  { name: 'Emerald',    code: '#059669' },
  { name: 'Gold',       code: '#D97706' },
  { name: 'Pure White', code: '#FFFFFF' },
  { name: 'Black',      code: '#000000' },
  { name: 'Purple',     code: '#7C3AED' },
  { name: 'Orange',     code: '#EA580C' },
  { name: 'Teal',       code: '#0D9488' },
  { name: 'Maroon',     code: '#9F1239' },
  { name: 'Sky Blue',   code: '#0EA5E9' },
  { name: 'Lime',       code: '#65A30D' },
  { name: 'Pink',       code: '#EC4899' },
  { name: 'Slate',      code: '#475569' },
];

const SLEEVE_COLORS = [
  { name: 'Obsidian',   code: '#111111' },
  { name: 'Crimson',    code: '#DC2626' },
  { name: 'Deep Navy',  code: '#1D3557' },
  { name: 'Pure White', code: '#FFFFFF' },
  { name: 'Royal Blue', code: '#1E40AF' },
  { name: 'Gold',       code: '#D97706' },
  { name: 'Emerald',    code: '#059669' },
  { name: 'Black',      code: '#000000' },
];

const TRIM_COLORS = [
  { name: 'White',  code: '#FFFFFF' },
  { name: 'Black',  code: '#000000' },
  { name: 'Gold',   code: '#D97706' },
  { name: 'Red',    code: '#DC2626' },
  { name: 'Navy',   code: '#1D3557' },
  { name: 'Silver', code: '#94A3B8' },
];

const TEXT_COLORS = [
  '#FFFFFF','#000000','#E8820C','#DC2626',
  '#1D3557','#F59E0B','#FFFF00','#00FF88',
  '#7C3AED','#EC4899','#0EA5E9','#059669',
  '#FF6B35','#C0C0C0','#FFD700','#FF4500',
];

const FONT_STYLES = [
  { id: 'collegiate', label: 'COLLEGIATE', fontFamily: '"Arial Black", sans-serif', fontWeight: '900', fontStyle: 'normal' },
  { id: 'block',      label: 'BLOCK',      fontFamily: 'Impact, sans-serif',         fontWeight: '900', fontStyle: 'normal' },
  { id: 'varsity',    label: 'VARSITY',    fontFamily: 'Georgia, serif',             fontWeight: '900', fontStyle: 'italic' },
  { id: 'sport',      label: 'SPORT',      fontFamily: 'Verdana, sans-serif',        fontWeight: '700', fontStyle: 'normal' },
  { id: 'modern',     label: 'MODERN',     fontFamily: 'Helvetica, sans-serif',      fontWeight: '900', fontStyle: 'normal' },
  { id: 'script',     label: 'Script',     fontFamily: 'Georgia, serif',             fontWeight: '700', fontStyle: 'italic' },
  { id: 'stencil',    label: 'STENCIL',    fontFamily: '"Courier New", monospace',   fontWeight: '900', fontStyle: 'normal' },
  { id: 'condensed',  label: 'CONDENSED',  fontFamily: '"Arial Narrow", sans-serif', fontWeight: '900', fontStyle: 'normal' },
  { id: 'brush',      label: 'Brush',      fontFamily: '"Palatino Linotype", serif', fontWeight: '700', fontStyle: 'italic' },
];

const COLLAR_TYPES  = [
  { id: 'round', label: 'Round',  icon: '○' },
  { id: 'v-neck',label: 'V-Neck', icon: '∨' },
  { id: 'polo',  label: 'Polo',   icon: '⊓' },
  { id: 'hood',  label: 'Hood',   icon: '∩' },
];
const FABRIC_TYPES  = [
  { id: 'climatech', label: 'ClimateTech Pro',  desc: 'UV protection & elite moisture management' },
  { id: 'coolweave', label: 'CoolWeave Lite',   desc: 'Lightweight breathable performance fabric' },
  { id: 'dryfit',    label: 'DriFit Ultra',     desc: 'Maximum sweat-wicking & comfort' },
  { id: 'interlock', label: 'Interlock Knit',   desc: 'Durable two-layer knit for heavy use' },
  { id: 'jacquard',  label: 'Jacquard Weave',   desc: 'Premium textured weave, pattern-defined' },
];
const FIT_TYPES     = [
  { id: 'slim',    label: 'Slim Fit' },
  { id: 'regular', label: 'Regular Fit' },
  { id: 'loose',   label: 'Loose Fit' },
  { id: 'athletic',label: 'Athletic Fit' },
];
const SLEEVE_LENGTHS = [
  { id: 'short',    label: 'Short Sleeve' },
  { id: 'long',     label: 'Long Sleeve' },
  { id: 'sleeveless',label: 'Sleeveless' },
];
const PATTERN_TYPES = [
  { id: 'solid',    label: 'Solid' },
  { id: 'gradient', label: 'Gradient' },
  { id: 'stripes',  label: 'Stripes' },
  { id: 'raglan',   label: 'Raglan' },
  { id: 'panel',    label: 'Side Panel' },
];
const PIPING_TYPES  = [
  { id: 'none',     label: 'None' },
  { id: 'shoulder', label: 'Shoulder' },
  { id: 'side',     label: 'Side Seam' },
  { id: 'sleeve',   label: 'Sleeve Edge' },
  { id: 'full',     label: 'Full Trim' },
];
const NAME_STYLES   = [
  { id: 'none',    label: 'None' },
  { id: 'straight',label: 'Straight' },
  { id: 'curved',  label: 'Curved' },
  { id: 'arched',  label: 'Arched' },
];
const NUMBER_POSITIONS = [
  { id: 'back',  label: 'Back Only' },
  { id: 'front', label: 'Front Only' },
  { id: 'both',  label: 'Both Sides' },
];
const BADGE_POSITIONS = [
  { id: 'left',  label: 'Left Chest' },
  { id: 'center',label: 'Center' },
  { id: 'right', label: 'Right Chest' },
];
const TEXT_EFFECTS  = [
  { id: 'none',    label: 'None' },
  { id: 'outline', label: 'Outline' },
  { id: 'shadow',  label: 'Shadow' },
  { id: 'both',    label: 'Outline+Shadow' },
];
const SPORT_TYPES = [
  { id: 'cricket',    label: 'Cricket' },
  { id: 'football',   label: 'Football' },
  { id: 'basketball', label: 'Basketball' },
  { id: 'tennis',     label: 'Tennis' },
  { id: 'other',      label: 'Other' },
];

const SIZES = ['XS','S','M','L','XL','XXL','3XL','4XL'];
const STEPS = [
  { id:'style',  label:'Style',  Icon: Paintbrush },
  { id:'colors', label:'Colors', Icon: Paintbrush },
  { id:'logos',  label:'Logos',  Icon: Shield },
  { id:'text',   label:'Text',   Icon: Type },
  { id:'order',  label:'Order',  Icon: ShoppingBag },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const isLight = (hex) => {
  if (!hex) return true;
  const h = hex.replace('#','');
  const r = parseInt(h.slice(0,2),16);
  const g = parseInt(h.slice(2,4),16);
  const b = parseInt(h.slice(4,6),16);
  return (r*299 + g*587 + b*114)/1000 > 155;
};

// ─────────────────────────────────────────────────────────────────────────────
// JERSEY 2D SVG
// ─────────────────────────────────────────────────────────────────────────────

const JerseySVG = (props) => {
  const {
    jerseyColor, sleeveColor, collarType, pattern, patternColor,
    pipingType, pipingColor, sleeveLength,
    view,
    clubLogo, clubLogoPos, clubLogoSize,
    sponsorLogo, sponsorLogoSize,
    sponsorBackLogo,
    nameText, nameStyleId, nameFont, nameColor, nameSize, nameVertical,
    nameEffect, nameEffectColor, nameOutlineWidth,
    numberText, numberFont, numberColor, numberSize, numberPosition,
    numberEffect, numberEffectColor,
    showTeam, teamName, teamColor, teamFont,
    showName, showNumber,
  } = props;

  const ns  = FONT_STYLES.find(f=>f.id===nameFont)   || FONT_STYLES[0];
  const nfs = FONT_STYLES.find(f=>f.id===numberFont) || FONT_STYLES[1];
  const tfs = FONT_STYLES.find(f=>f.id===teamFont)   || FONT_STYLES[0];
  const slv = sleeveColor || jerseyColor;
  const seam = isLight(jerseyColor) ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.10)';

  // Pattern defs
  const patDefs = [];
  let bodyFill = jerseyColor;
  if (pattern === 'gradient') {
    patDefs.push(
      <linearGradient key="jg" id="jg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={jerseyColor}/>
        <stop offset="100%" stopColor={patternColor||slv}/>
      </linearGradient>
    );
    bodyFill = 'url(#jg)';
  } else if (pattern === 'stripes') {
    patDefs.push(
      <pattern key="sp" id="sp" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <rect width="12" height="24" fill={jerseyColor}/>
        <rect x="12" width="12" height="24" fill={patternColor||slv}/>
      </pattern>
    );
    bodyFill = 'url(#sp)';
  } else if (pattern === 'raglan') {
    patDefs.push(
      <linearGradient key="rl" id="rl" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor={patternColor||slv}/>
        <stop offset="28%"  stopColor={jerseyColor}/>
        <stop offset="72%"  stopColor={jerseyColor}/>
        <stop offset="100%" stopColor={patternColor||slv}/>
      </linearGradient>
    );
    bodyFill = 'url(#rl)';
  }

  // Collar path
  const collarPath = collarType==='v-neck'
    ? 'M128,48 L150,76 L172,48'
    : collarType==='round'
    ? 'M122,47 Q150,58 178,47'
    : null;

  // Text rendering helpers
  const textFilter = (eff) => eff==='shadow'||eff==='both' ? 'url(#ts)' : undefined;
  const textStroke = (eff, col, w) =>
    eff==='outline'||eff==='both'
      ? { stroke: col||'#000', strokeWidth: w||1.5, paintOrder:'stroke' }
      : {};

  const nameY   = 85 + (nameVertical/100)*160;
  const numberY = nameY + (showName && nameText && nameStyleId!=='none' ? nameSize + 14 : 0) + numberSize*0.85;

  // badge x
  const bx = clubLogoPos==='center' ? 150 - clubLogoSize/2
            : clubLogoPos==='right'  ? 196
            : 80;

  return (
    <svg viewBox="0 0 300 380" style={{ width:'100%', height:'100%', filter:'drop-shadow(0 10px 30px rgba(0,0,0,0.22))' }}>
      <defs>
        {patDefs}
        <filter id="lf" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(255,255,255,0.6)"/>
        </filter>
        <filter id="ts" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="2.5" floodColor="rgba(0,0,0,0.75)"/>
        </filter>
      </defs>

      {/* ground ellipse */}
      <ellipse cx="150" cy="374" rx="80" ry="6" fill="rgba(0,0,0,0.13)"/>

      {/* LEFT sleeve */}
      <path d="M65,40 L8,80 L18,155 L56,140 L56,100 Z" fill={slv} stroke={seam} strokeWidth="1"/>
      <path d="M65,40 L28,68 L22,115 L38,108 Z" fill="rgba(255,255,255,0.12)"/>

      {/* RIGHT sleeve */}
      <path d="M235,40 L292,80 L282,155 L244,140 L244,100 Z" fill={slv} stroke={seam} strokeWidth="1"/>
      <path d="M235,40 L272,68 L278,115 L262,108 Z" fill="rgba(255,255,255,0.12)"/>

      {/* BODY */}
      <path d="M65,40 L56,100 L56,342 L244,342 L244,100 L235,40 L200,20 Q175,48 150,48 Q125,48 100,20 Z"
        fill={bodyFill} stroke={seam} strokeWidth="1.2"/>

      {/* body highlights */}
      <path d="M108,22 Q130,48 150,48 Q170,48 192,22 L186,18 Q165,44 150,44 Q135,44 114,18 Z" fill="rgba(255,255,255,0.18)"/>
      <path d="M57,100 L62,342 L67,342 L63,100 Z" fill="rgba(255,255,255,0.07)"/>

      {/* SIDE PANEL */}
      {pattern==='panel' && (
        <>
          <path d="M56,100 L56,342 L88,342 L88,100 Z" fill={patternColor||slv} opacity="0.85"/>
          <path d="M212,100 L212,342 L244,342 L244,100 Z" fill={patternColor||slv} opacity="0.85"/>
        </>
      )}

      {/* PIPING */}
      {(pipingType==='shoulder'||pipingType==='full') && <>
        <path d="M100,20 Q118,36 132,44" fill="none" stroke={pipingColor||'#fff'} strokeWidth="3"/>
        <path d="M200,20 Q182,36 168,44" fill="none" stroke={pipingColor||'#fff'} strokeWidth="3"/>
      </>}
      {(pipingType==='side'||pipingType==='full') && <>
        <line x1="56" y1="100" x2="56" y2="342" stroke={pipingColor||'#fff'} strokeWidth="2.5"/>
        <line x1="244" y1="100" x2="244" y2="342" stroke={pipingColor||'#fff'} strokeWidth="2.5"/>
      </>}
      {(pipingType==='sleeve'||pipingType==='full') && <>
        <path d="M8,80 L18,155" fill="none" stroke={pipingColor||'#fff'} strokeWidth="2.5"/>
        <path d="M292,80 L282,155" fill="none" stroke={pipingColor||'#fff'} strokeWidth="2.5"/>
      </>}

      {/* COLLAR */}
      {collarType==='polo' && <rect x="122" y="44" width="56" height="16" rx="3" fill={slv} stroke={seam} strokeWidth="1.5"/>}
      {collarType==='hood' && <path d="M118,40 Q150,10 182,40" fill="none" stroke={seam} strokeWidth="4" strokeLinecap="round"/>}
      {collarPath && <path d={collarPath} fill="none" stroke={seam} strokeWidth="3.5" strokeLinecap="round"/>}

      {/* LONG SLEEVE extension */}
      {sleeveLength==='long' && <>
        <rect x="0" y="152" width="22" height="50" rx="2" fill={slv}/>
        <rect x="278" y="152" width="22" height="50" rx="2" fill={slv}/>
      </>}

      {/* ══ FRONT ══ */}
      {view==='front' && <>
        {clubLogo && (
          <image href={clubLogo} x={bx} y="78" width={clubLogoSize} height={clubLogoSize} filter="url(#lf)"/>
        )}
        {sponsorLogo && (
          <image
            href={sponsorLogo}
            x={150-sponsorLogoSize/2} y="148"
            width={sponsorLogoSize} height={Math.round(sponsorLogoSize*0.34)}
            preserveAspectRatio="xMidYMid meet"
            filter="url(#lf)"
          />
        )}
        {/* number on front */}
        {showNumber && numberText && (numberPosition==='front'||numberPosition==='both') && (
          <text x="150" y="260" textAnchor="middle"
            fontFamily={nfs.fontFamily} fontSize={42} fontWeight={nfs.fontWeight}
            fill={numberColor}
            filter={textFilter(numberEffect)}
            {...textStroke(numberEffect,numberEffectColor,2)}
          >{numberText}</text>
        )}
      </>}

      {/* ══ BACK ══ */}
      {view==='back' && <>
        {sponsorBackLogo && (
          <image href={sponsorBackLogo} x="90" y="78" width="120" height="40" preserveAspectRatio="xMidYMid meet" filter="url(#lf)"/>
        )}

        {/* PLAYER NAME */}
        {showName && nameText && nameStyleId!=='none' && (() => {
          const common = {
            fontFamily: ns.fontFamily, fontSize: nameSize,
            fontWeight: ns.fontWeight, fontStyle: ns.fontStyle,
            fill: nameColor,
            filter: textFilter(nameEffect),
            ...textStroke(nameEffect,nameEffectColor,nameOutlineWidth),
          };
          if (nameStyleId==='curved') {
            const cy = nameY - 10;
            return (
              <>
                <defs><path id="nc" d={`M 70,${cy} Q 150,${cy-18} 230,${cy}`}/></defs>
                <text textAnchor="middle" {...common}>
                  <textPath href="#nc" startOffset="50%">{nameText}</textPath>
                </text>
              </>
            );
          }
          if (nameStyleId==='arched') {
            const ay = nameY - 6;
            return (
              <>
                <defs><path id="na" d={`M 70,${ay} Q 150,${ay-32} 230,${ay}`}/></defs>
                <text textAnchor="middle" {...common}>
                  <textPath href="#na" startOffset="50%">{nameText}</textPath>
                </text>
              </>
            );
          }
          return (
            <text x="150" y={nameY} textAnchor="middle" {...common}>{nameText}</text>
          );
        })()}

        {/* PLAYER NUMBER */}
        {showNumber && numberText && numberPosition!=='front' && (
          <text x="150" y={numberY} textAnchor="middle"
            fontFamily={nfs.fontFamily} fontSize={numberSize} fontWeight={nfs.fontWeight}
            fill={numberColor}
            filter={textFilter(numberEffect)}
            {...textStroke(numberEffect,numberEffectColor,2)}
          >{numberText}</text>
        )}

        {/* TEAM NAME */}
        {showTeam && teamName && (
          <text x="150" y="318" textAnchor="middle"
            fontFamily={tfs.fontFamily} fontSize="11" fontWeight="800" letterSpacing="4"
            fill={teamColor} filter="url(#ts)"
          >{teamName.toUpperCase()}</text>
        )}
      </>}
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function JerseyCustomizer({ product }) {
  const [mounted, setMounted]   = useState(false);
  const [step, setStep]         = useState(0);
  const [view, setView]         = useState('front');
  const [viewMode, setViewMode] = useState('glb');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Style
  const [fabric,       setFabric]       = useState('climatech');
  const [fit,          setFit]          = useState('regular');
  const [sleeveLength, setSleeveLength] = useState('short');
  const [collarType,   setCollarType]   = useState('round');
  const [pattern,      setPattern]      = useState('solid');
  const [patternColor, setPatternColor] = useState('#DC2626');
  const [pipingType,   setPipingType]   = useState('none');
  const [pipingColor,  setPipingColor]  = useState('#FFFFFF');

  // Colors - Changed initial base color to Black (#000000)
  const [jerseyColor, setJerseyColor] = useState('#FFFFFF');
  const [sleeveColor, setSleeveColor] = useState('#111111');
  const [collarColor, setCollarColor] = useState('#111111');
  const [trimColor,   setTrimColor]   = useState('#FFFFFF');

  // Logos
  const [clubLogo,       setClubLogo]       = useState(null);
  const [clubLogoPos,    setClubLogoPos]    = useState('left');
  const [clubLogoSize,   setClubLogoSize]   = useState(52);
  const [sponsorLogo,    setSponsorLogo]    = useState(null);
  const [sponsorLogoSize,setSponsorLogoSize]= useState(110);
  const [sponsorBackLogo,setSponsorBackLogo]= useState(null);

  // Name
  const [showName,        setShowName]        = useState(true);
  const [nameText,        setNameText]        = useState('PLAYER');
  const [nameStyleId,     setNameStyleId]     = useState('straight');
  const [nameFont,        setNameFont]        = useState('collegiate');
  const [nameColor,       setNameColor]       = useState('#FFFFFF');
  const [nameSize,        setNameSize]        = useState(22);
  const [nameVertical,    setNameVertical]    = useState(20);
  const [nameEffect,      setNameEffect]      = useState('none');
  const [nameEffectColor, setNameEffectColor] = useState('#000000');
  const [nameOutlineWidth,setNameOutlineWidth]= useState(1.5);

  // Number
  const [showNumber,        setShowNumber]        = useState(true);
  const [numberText,        setNumberText]        = useState('10');
  const [numberFont,        setNumberFont]        = useState('block');
  const [numberColor,       setNumberColor]       = useState('#F59E0B');
  const [numberSize,        setNumberSize]        = useState(72);
  const [numberPosition,    setNumberPosition]    = useState('back');
  const [numberEffect,      setNumberEffect]      = useState('none');
  const [numberEffectColor, setNumberEffectColor] = useState('#000000');

  // Team
  const [showTeam,  setShowTeam]  = useState(false);
  const [teamName,  setTeamName]  = useState('YOUR TEAM');
  const [teamColor, setTeamColor] = useState('#FFFFFF');
  const [teamFont,  setTeamFont]  = useState('sport');

  // Order
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity,     setQuantity]     = useState(10);
  const [sport,        setSport]        = useState('cricket');

  // Accordion state
  const [sec, setSec] = useState({
    fabric:true, fit:false, sleeveLen:false, collar:false, pattern:false, piping:false,
    base:true, sleeveCol:false, collarCol:false, trim:false,
    club:true, sponsor:false, sponsorBack:false,
    name:true, number:false, team:false,
  });
  const tog = (k) => setSec(p => ({ ...p, [k]: !p[k] }));

  useEffect(() => { setMounted(true); }, []);

  const handleUpload = useCallback((setter) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Please upload an image file'); return; }
    if (file.size > 8 * 1024 * 1024)    { alert('Max file size is 8 MB'); return; }
    const reader = new FileReader();
    reader.onloadend = () => setter(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const reset = () => {
    setJerseyColor('#000000'); // Changed to black
    setSleeveColor('#111111'); setCollarColor('#111111'); setTrimColor('#FFFFFF');
    setCollarType('round'); setPattern('solid'); setPipingType('none');
    setFabric('climatech'); setFit('regular'); setSleeveLength('short');
    setClubLogo(null); setSponsorLogo(null); setSponsorBackLogo(null);
    setClubLogoPos('left'); setClubLogoSize(52); setSponsorLogoSize(110);
    setNameText('PLAYER'); setNameFont('collegiate'); setNameColor('#FFFFFF');
    setNameSize(22); setNameVertical(20); setNameEffect('none'); setNameStyleId('straight');
    setNumberText('10'); setNumberFont('block'); setNumberColor('#F59E0B');
    setNumberSize(72); setNumberPosition('back'); setNumberEffect('none');
    setShowTeam(false); setShowName(true); setShowNumber(true);
    setTeamName('YOUR TEAM'); setTeamColor('#FFFFFF');
    setSelectedSize('L'); setQuantity(10);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // UI ATOMS
  // ─────────────────────────────────────────────────────────────────────────

  const Section = ({ k, title, badge, children }) => {
    const isOpen = sec[k];
    return (
      <div style={{
        background:'#fff', borderRadius:12,
        border:`1px solid ${isOpen ? 'rgba(0,62,155,0.2)' : '#E8ECF0'}`,
        overflow:'hidden', marginBottom:10,
        boxShadow: isOpen ? '0 2px 14px rgba(0,62,155,0.07)' : 'none',
      }}>
        <button onClick={() => tog(k)} style={{
          width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'13px 16px', border:'none', cursor:'pointer',
          background: isOpen ? 'rgba(0,62,155,0.04)' : '#FAFAFA',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:11, fontWeight:700, color: isOpen?'#003E9B':'#334155' }}>{title}</span>
            {badge && <span style={{ fontSize:9, padding:'2px 8px', borderRadius:12, background:'rgba(0,62,155,0.10)', color:'#003E9B', fontWeight:700 }}>{badge}</span>}
          </div>
          <ChevronDown size={14} color={isOpen?'#003E9B':'#94A3B8'} style={{ transform:isOpen?'rotate(180deg)':'none', transition:'transform 0.2s' }}/>
        </button>
        {isOpen && (
          <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:13 }}>
            {children}
          </div>
        )}
      </div>
    );
  };

  const ColorGrid = ({ colors, selected, onSelect, cols=8 }) => (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols},1fr)`, gap:7 }}>
      {colors.map(c => {
        const code = typeof c==='string' ? c : c.code;
        const name = typeof c==='string' ? c : c.name;
        const sel  = selected===code;
        return (
          <button key={code} title={name} onClick={() => onSelect(code)} style={{
            width:'100%', aspectRatio:'1', borderRadius:8, cursor:'pointer',
            border:`2.5px solid ${sel?'#003E9B':'#E2E8F0'}`, backgroundColor:code,
            position:'relative', transform:sel?'scale(1.18)':'scale(1)', transition:'all 0.15s',
            boxShadow: sel?'0 0 0 3px rgba(0,62,155,0.22)':'none',
          }}>
            {sel && <Check size={9} strokeWidth={3.5} color={isLight(code)?'#000':'#fff'} style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}/>}
          </button>
        );
      })}
    </div>
  );

  const FontGrid = ({ selectedId, onSelect }) => (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:7 }}>
      {FONT_STYLES.map(f => {
        const sel = selectedId===f.id;
        return (
          <button key={f.id} onClick={() => onSelect(f.id)} style={{
            height:52, borderRadius:9, cursor:'pointer',
            border:`2px solid ${sel?'#003E9B':'#E2E8F0'}`,
            background: sel?'rgba(0,62,155,0.09)':'#F8FAFC',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <span style={{ fontFamily:f.fontFamily, fontWeight:f.fontWeight, fontStyle:f.fontStyle, fontSize:10, color:sel?'#003E9B':'#334155' }}>{f.label}</span>
          </button>
        );
      })}
    </div>
  );

  const UploadSlot = ({ label, hint, state, setter, uid }) => (
    <div>
      <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:6 }}>{label}</div>
      {state ? (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', background:'#F8FAFC', borderRadius:10, border:'1px solid #E2E8F0' }}>
          <img src={state} alt={label} style={{ maxHeight:56, maxWidth:110, objectFit:'contain' }}/>
          <button onClick={() => setter(null)} style={{ background:'#FEF2F2', border:'1px solid #FECACA', color:'#EF4444', borderRadius:7, padding:'5px 10px', cursor:'pointer', fontSize:10, fontWeight:700, display:'flex', alignItems:'center', gap:4 }}>
            <Trash2 size={12}/> Remove
          </button>
        </div>
      ) : (
        <button onClick={() => document.getElementById(uid).click()} style={{
          width:'100%', padding:'16px', border:'2px dashed #CBD5E1', borderRadius:10, cursor:'pointer',
          background:'#F8FAFC', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          fontSize:11, fontWeight:700, color:'#000000', // Changed to black
        }}><Upload size={15}/> Upload Image</button>
      )}
      {hint && <p style={{ fontSize:9, color:'#64748B', marginTop:5 }}>{hint}</p>}
      <input id={uid} type="file" accept="image/*" style={{ display:'none' }} onChange={handleUpload(setter)}/>
    </div>
  );

  const Toggle = ({ value, onChange, label }) => (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
      <span style={{ fontSize:11, fontWeight:700, color:'#334155' }}>{label}</span>
      <button onClick={() => onChange(!value)} style={{ width:42, height:22, borderRadius:99, cursor:'pointer', position:'relative', border:'none', background:value?'#003E9B':'#CBD5E1', transition:'background 0.22s' }}>
        <span style={{ position:'absolute', top:2, left:value?20:2, width:18, height:18, borderRadius:'50%', background:'#fff', transition:'left 0.22s', boxShadow:'0 1px 4px rgba(0,0,0,0.25)' }}/>
      </button>
    </div>
  );

  const Slider = ({ label, value, onChange, min, max, unit='' }) => (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
        <span style={{ fontSize:10, fontWeight:700, color:'#64748B' }}>{label}</span>
        <span style={{ fontSize:11, fontWeight:800, color:'#003E9B' }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e=>onChange(Number(e.target.value))} style={{ width:'100%', accentColor:'#003E9B' }}/>
    </div>
  );

  const Pills = ({ items, selected, onSelect }) => (
    <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
      {items.map(it => {
        const id  = typeof it==='string'?it:it.id;
        const lbl = typeof it==='string'?it:(it.label||it.icon);
        const sel = selected===id;
        return (
          <button key={id} onClick={() => onSelect(id)} style={{
            padding:'9px 13px', borderRadius:10, cursor:'pointer',
            border:`2px solid ${sel?'#003E9B':'#E2E8F0'}`,
            background: sel?'rgba(0,62,155,0.09)':'#F8FAFC',
            fontSize:10, fontWeight:700, color:sel?'#003E9B':'#000000', // Changed to black
          }}>{lbl}</button>
        );
      })}
    </div>
  );

  const ColorPicker = ({ label, value, onChange, cols=8 }) => (
    <div>
      <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>{label}</div>
      <ColorGrid colors={TEXT_COLORS} selected={value} onSelect={onChange} cols={cols}/>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
        <div style={{ width:26, height:26, borderRadius:7, background:value, border:'2px solid #E2E8F0', flexShrink:0 }}/>
        <input type="color" value={value} onChange={e=>onChange(e.target.value)} style={{ width:32, height:32, borderRadius:7, border:'1px solid #E2E8F0', cursor:'pointer', padding:2 }}/>
        <span style={{ fontSize:9, color:'#64748B' }}>Custom picker</span>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // STEP CONTENT
  // ─────────────────────────────────────────────────────────────────────────

  const renderContent = () => {

    /* ── STEP 0: STYLE ────────────────────────────────────────────────── */
    if (step===0) return (
      <div>
        <Section k="fabric" title="Fabric Technology" badge={FABRIC_TYPES.find(f=>f.id===fabric)?.label}>
          {FABRIC_TYPES.map(f => (
            <button key={f.id} onClick={() => setFabric(f.id)} style={{
              padding:'11px 14px', borderRadius:10, cursor:'pointer', textAlign:'left',
              border:`2px solid ${fabric===f.id?'#003E9B':'#E2E8F0'}`,
              background: fabric===f.id?'rgba(0,62,155,0.07)':'#F8FAFC',
            }}>
              <div style={{ fontSize:11, fontWeight:800, color:fabric===f.id?'#003E9B':'#334155' }}>{f.label}</div>
              <div style={{ fontSize:9, color:'#64748B', marginTop:3 }}>{f.desc}</div>
            </button>
          ))}
        </Section>

        <Section k="fit" title="Fit Type" badge={FIT_TYPES.find(f=>f.id===fit)?.label}>
          <Pills items={FIT_TYPES} selected={fit} onSelect={setFit}/>
        </Section>

        <Section k="sleeveLen" title="Sleeve Length" badge={SLEEVE_LENGTHS.find(s=>s.id===sleeveLength)?.label}>
          <Pills items={SLEEVE_LENGTHS} selected={sleeveLength} onSelect={setSleeveLength}/>
        </Section>

        <Section k="collar" title="Collar Style" badge={COLLAR_TYPES.find(c=>c.id===collarType)?.label}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
            {COLLAR_TYPES.map(c => {
              const sel = collarType===c.id;
              return (
                <button key={c.id} onClick={() => setCollarType(c.id)} style={{
                  padding:'12px 6px', borderRadius:10, cursor:'pointer', textAlign:'center',
                  border:`2px solid ${sel?'#003E9B':'#E2E8F0'}`,
                  background: sel?'rgba(0,62,155,0.09)':'#F8FAFC',
                }}>
                  <div style={{ fontSize:22, marginBottom:4 }}>{c.icon}</div>
                  <div style={{ fontSize:9, fontWeight:700, color:sel?'#003E9B':'#000000' }}>{c.label}</div>
                </button>
              );
            })}
          </div>
        </Section>

        <Section k="pattern" title="Pattern Design" badge={PATTERN_TYPES.find(p=>p.id===pattern)?.label}>
          <Pills items={PATTERN_TYPES} selected={pattern} onSelect={setPattern}/>
          {pattern!=='solid' && (
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Accent / Secondary Color</div>
              <ColorGrid colors={JERSEY_COLORS} selected={patternColor} onSelect={setPatternColor} cols={8}/>
            </div>
          )}
        </Section>

        <Section k="piping" title="Piping & Trim" badge={PIPING_TYPES.find(p=>p.id===pipingType)?.label}>
          <Pills items={PIPING_TYPES} selected={pipingType} onSelect={setPipingType}/>
          {pipingType!=='none' && (
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Piping Color</div>
              <ColorGrid colors={TRIM_COLORS} selected={pipingColor} onSelect={setPipingColor} cols={6}/>
            </div>
          )}
        </Section>
      </div>
    );

    /* ── STEP 1: COLORS ───────────────────────────────────────────────── */
    if (step===1) return (
      <div>
        <Section k="base" title="Base Colour" badge={JERSEY_COLORS.find(c=>c.code===jerseyColor)?.name}>
          <ColorGrid colors={JERSEY_COLORS} selected={jerseyColor} onSelect={setJerseyColor} cols={8}/>
          <input type="color" value={jerseyColor} onChange={e=>setJerseyColor(e.target.value)} style={{ width:'100%', height:36, borderRadius:8, border:'1px solid #E2E8F0', cursor:'pointer', padding:2 }}/>
        </Section>

        <Section k="sleeveCol" title="Sleeve Colour" badge={JERSEY_COLORS.find(c=>c.code===sleeveColor)?.name}>
          <ColorGrid colors={SLEEVE_COLORS} selected={sleeveColor} onSelect={setSleeveColor} cols={8}/>
          <input type="color" value={sleeveColor} onChange={e=>setSleeveColor(e.target.value)} style={{ width:'100%', height:36, borderRadius:8, border:'1px solid #E2E8F0', cursor:'pointer', padding:2 }}/>
          <button onClick={() => setSleeveColor(jerseyColor)} style={{ fontSize:10, fontWeight:700, color:'#003E9B', background:'rgba(0,62,155,0.08)', border:'1px solid rgba(0,62,155,0.25)', borderRadius:8, padding:'9px', cursor:'pointer', width:'100%' }}>↔ Match Base Colour</button>
        </Section>

        <Section k="collarCol" title="Collar Colour" badge={JERSEY_COLORS.find(c=>c.code===collarColor)?.name}>
          <ColorGrid colors={JERSEY_COLORS} selected={collarColor} onSelect={setCollarColor} cols={8}/>
          <input type="color" value={collarColor} onChange={e=>setCollarColor(e.target.value)} style={{ width:'100%', height:36, borderRadius:8, border:'1px solid #E2E8F0', cursor:'pointer', padding:2 }}/>
        </Section>

        <Section k="trim" title="Trim / Cuff Colour">
          <ColorGrid colors={TRIM_COLORS} selected={trimColor} onSelect={setTrimColor} cols={6}/>
        </Section>

        <div style={{ padding:'12px 14px', background:'#F0F7FF', borderRadius:12, border:'1px solid #BFDBFE' }}>
          <div style={{ fontSize:10, fontWeight:700, color:'#1D4ED8', marginBottom:9 }}>🎨 Live Colour Preview</div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {[['Base',jerseyColor],['Sleeve',sleeveColor],['Collar',collarColor],['Trim',trimColor]].map(([l,c]) => (
              <div key={l} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <div style={{ width:32, height:32, borderRadius:8, background:c, border:'2px solid #E2E8F0', boxShadow:'0 2px 6px rgba(0,0,0,0.15)' }}/>
                <span style={{ fontSize:9, color:'#64748B', fontWeight:600 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    /* ── STEP 2: LOGOS ────────────────────────────────────────────────── */
    if (step===2) return (
      <div>
        <Section k="club" title="Club Badge">
          <UploadSlot label="Club / Team Badge (Front)" hint="PNG transparent bg, min 300×300px" state={clubLogo} setter={setClubLogo} uid="up-club"/>
          {clubLogo && (
            <>
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Badge Position on Front</div>
                <div style={{ display:'flex', gap:8 }}>
                  {BADGE_POSITIONS.map(p => {
                    const sel = clubLogoPos===p.id;
                    return (
                      <button key={p.id} onClick={() => setClubLogoPos(p.id)} style={{
                        flex:1, padding:'10px', borderRadius:9, cursor:'pointer',
                        border:`2px solid ${sel?'#003E9B':'#E2E8F0'}`,
                        background: sel?'rgba(0,62,155,0.09)':'#F8FAFC',
                        fontSize:10, fontWeight:700, color:sel?'#003E9B':'#000000'
                      }}>{p.label}</button>
                    );
                  })}
                </div>
              </div>
              <Slider label="Badge Size" value={clubLogoSize} onChange={setClubLogoSize} min={28} max={90} unit="px"/>
            </>
          )}
        </Section>

        <Section k="sponsor" title="Front Sponsor Logo">
          <UploadSlot label="Sponsor Logo (Center Chest)" hint="PNG/SVG transparent bg, min 600×200px" state={sponsorLogo} setter={setSponsorLogo} uid="up-sponsor"/>
          {sponsorLogo && <Slider label="Logo Width" value={sponsorLogoSize} onChange={setSponsorLogoSize} min={50} max={180} unit="px"/>}
        </Section>

        <Section k="sponsorBack" title="Back Logo / Sponsor">
          <UploadSlot label="Back Sponsor / Secondary Logo" hint="Shown at top-back of jersey" state={sponsorBackLogo} setter={setSponsorBackLogo} uid="up-back"/>
        </Section>

        <div style={{ padding:'12px 14px', background:'#FFF7ED', borderRadius:10, border:'1px solid #FED7AA' }}>
          <div style={{ fontSize:10, fontWeight:700, color:'#C2410C', marginBottom:5 }}>📋 Logo Print Guidelines</div>
          <div style={{ fontSize:10, color:'#9A3412', lineHeight:1.7 }}>
            • PNG/SVG with <b>transparent background</b> preferred<br/>
            • Minimum <b>300 DPI</b> for crisp sublimation print<br/>
            • Max file size: <b>8 MB</b><br/>
            • Switch to <b>2D → Back View</b> to preview back logos
          </div>
        </div>
      </div>
    );

    /* ── STEP 3: TEXT ─────────────────────────────────────────────────── */
    if (step===3) return (
      <div>

        {/* PLAYER NAME */}
        <Section k="name" title="Player Name">
          <Toggle value={showName} onChange={setShowName} label="Show Player Name"/>
          {showName && <>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:6 }}>Name Text</div>
              <input value={nameText} onChange={e=>setNameText(e.target.value.toUpperCase())} maxLength={22} placeholder="PLAYER NAME" style={{ width:'100%', padding:'11px 13px', border:'1.5px solid #E2E8F0', borderRadius:9, fontSize:13, fontWeight:700, color:'#000000', boxSizing:'border-box', outline:'none' }}/>
            </div>

            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Text Layout / Arc</div>
              <Pills items={NAME_STYLES} selected={nameStyleId} onSelect={setNameStyleId}/>
            </div>

            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Font Style (9 options)</div>
              <FontGrid selectedId={nameFont} onSelect={setNameFont}/>
            </div>

            <ColorPicker label="Text Color" value={nameColor} onChange={setNameColor}/>

            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Text Effect</div>
              <Pills items={TEXT_EFFECTS} selected={nameEffect} onSelect={setNameEffect}/>
            </div>

            {nameEffect!=='none' && <ColorPicker label="Effect Color (Outline / Shadow)" value={nameEffectColor} onChange={setNameEffectColor}/>}
            {(nameEffect==='outline'||nameEffect==='both') && <Slider label="Outline Width" value={nameOutlineWidth} onChange={setNameOutlineWidth} min={0.5} max={6} unit="px"/>}

            <Slider label="Font Size" value={nameSize} onChange={setNameSize} min={10} max={40} unit="pt"/>
            <Slider label="Vertical Position" value={nameVertical} onChange={setNameVertical} min={2} max={70} unit="%"/>
          </>}
        </Section>

        {/* PLAYER NUMBER */}
        <Section k="number" title="Player Number">
          <Toggle value={showNumber} onChange={setShowNumber} label="Show Player Number"/>
          {showNumber && <>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:6 }}>Number</div>
              <input value={numberText} onChange={e=>setNumberText(e.target.value)} maxLength={3} placeholder="10" style={{ width:'100%', padding:'11px 13px', border:'1.5px solid #E2E8F0', borderRadius:9, fontSize:13, fontWeight:700, color:'#000000', boxSizing:'border-box' }}/>
            </div>

            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Number Position</div>
              <Pills items={NUMBER_POSITIONS} selected={numberPosition} onSelect={setNumberPosition}/>
            </div>

            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Font Style</div>
              <FontGrid selectedId={numberFont} onSelect={setNumberFont}/>
            </div>

            <ColorPicker label="Number Color" value={numberColor} onChange={setNumberColor}/>

            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Text Effect</div>
              <Pills items={TEXT_EFFECTS} selected={numberEffect} onSelect={setNumberEffect}/>
            </div>

            {numberEffect!=='none' && <ColorPicker label="Effect Color" value={numberEffectColor} onChange={setNumberEffectColor}/>}

            <Slider label="Number Size" value={numberSize} onChange={setNumberSize} min={36} max={110} unit="pt"/>
          </>}
        </Section>

        {/* TEAM NAME */}
        <Section k="team" title="Team Name (Back Footer)">
          <Toggle value={showTeam} onChange={setShowTeam} label="Show Team Name"/>
          {showTeam && <>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:6 }}>Team Name</div>
              <input value={teamName} onChange={e=>setTeamName(e.target.value.toUpperCase())} maxLength={22} placeholder="YOUR TEAM" style={{ width:'100%', padding:'11px 13px', border:'1.5px solid #E2E8F0', borderRadius:9, fontSize:12, fontWeight:700, color:'#000000', boxSizing:'border-box' }}/>
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Font Style</div>
              <FontGrid selectedId={teamFont} onSelect={setTeamFont}/>
            </div>
            <ColorPicker label="Team Name Color" value={teamColor} onChange={setTeamColor}/>
          </>}
        </Section>

        <div style={{ padding:'10px 14px', background:'#F0FDF4', borderRadius:10, border:'1px solid #BBF7D0' }}>
          <div style={{ fontSize:10, color:'#166534' }}>
            💡 Switch to <b>2D View → Back</b> to preview name, number & team text on jersey.
          </div>
        </div>
      </div>
    );

    /* ── STEP 4: ORDER ────────────────────────────────────────────────── */
    return (
      <div>
        <div style={{ padding:'12px 14px', background:'#F0FDF4', borderRadius:10, border:'1px solid #BBF7D0', marginBottom:14 }}>
          <div style={{ fontSize:11, color:'#166534', fontWeight:600 }}>✅ Design ready! Complete the details below.</div>
        </div>

        {/* Sport */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, fontWeight:700, marginBottom:9, color:'#000000' }}>Sport Type</div>
          <Pills items={SPORT_TYPES} selected={sport} onSelect={setSport}/>
        </div>

        {/* Size */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, fontWeight:700, marginBottom:9, color:'#000000' }}>Select Size</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {SIZES.map(s => {
              const sel = selectedSize===s;
              return (
                <button key={s} onClick={() => setSelectedSize(s)} style={{
                  width:50, height:50, borderRadius:9, fontSize:11, fontWeight:700, cursor:'pointer',
                  border:`2px solid ${sel?'#003E9B':'#E2E8F0'}`,
                  background: sel?'rgba(0,62,155,0.10)':'#F8FAFC',
                  color: sel?'#003E9B':'#000000',
                }}>{s}</button>
              );
            })}
          </div>
        </div>

        {/* Quantity */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, fontWeight:700, marginBottom:9, color:'#000000' }}>Quantity <span style={{ fontWeight:400, color:'#64748B', fontSize:10 }}>(min 10)</span></div>
          <div style={{ display:'flex', alignItems:'center', gap:14, background:'#F8FAFC', padding:'8px 16px', borderRadius:10, justifyContent:'center' }}>
            <button onClick={() => setQuantity(Math.max(10,quantity-1))} style={{ width:38, height:38, borderRadius:8, background:'#fff', border:'1px solid #E2E8F0', cursor:'pointer', fontSize:20, color:'#003E9B' }}>−</button>
            <span style={{ fontSize:22, fontWeight:900, minWidth:64, textAlign:'center', color:'#003E9B' }}>{quantity}</span>
            <button onClick={() => setQuantity(quantity+1)} style={{ width:38, height:38, borderRadius:8, background:'#fff', border:'1px solid #E2E8F0', cursor:'pointer', fontSize:20, color:'#003E9B' }}>+</button>
          </div>
        </div>

        {/* Summary */}
        <div style={{ border:'1px solid rgba(0,62,155,0.2)', borderRadius:12, background:'rgba(0,62,155,0.03)', padding:16, marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
            <Star size={15} color="#003E9B" fill="#003E9B"/>
            <span style={{ fontSize:13, fontWeight:800, color:'#003E9B' }}>Order Summary</span>
          </div>
          {[
            ['Sport',         sport.charAt(0).toUpperCase()+sport.slice(1)],
            ['Fabric',        FABRIC_TYPES.find(f=>f.id===fabric)?.label],
            ['Fit',           FIT_TYPES.find(f=>f.id===fit)?.label],
            ['Sleeve',        SLEEVE_LENGTHS.find(f=>f.id===sleeveLength)?.label],
            ['Collar',        COLLAR_TYPES.find(c=>c.id===collarType)?.label],
            ['Pattern',       PATTERN_TYPES.find(p=>p.id===pattern)?.label],
            ['Piping',        PIPING_TYPES.find(p=>p.id===pipingType)?.label],
            ['Base Color',    JERSEY_COLORS.find(c=>c.code===jerseyColor)?.name],
            ['Sleeve Color',  JERSEY_COLORS.find(c=>c.code===sleeveColor)?.name||sleeveColor],
            ['Player Name',   showName?(nameText||'—'):'Hidden'],
            ['Name Effect',   nameEffect],
            ['Player Number', showNumber?`#${numberText} (${NUMBER_POSITIONS.find(p=>p.id===numberPosition)?.label})`:'Hidden'],
            ['Team Name',     showTeam?teamName:'Hidden'],
            ['Club Badge',    clubLogo?'✅ Uploaded':'—'],
            ['Sponsor Front', sponsorLogo?'✅ Uploaded':'—'],
            ['Size',          selectedSize],
          ].map(([k,v]) => (
            <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
              <span style={{ fontSize:10, color:'#64748B' }}>{k}</span>
              <span style={{ fontSize:11, fontWeight:600, color:'#1E293B', textAlign:'right' }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop:'1px solid rgba(0,62,155,0.12)', marginTop:10, paddingTop:10, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:12, fontWeight:700 }}>Total ({quantity} units)</span>
            <span style={{ fontSize:22, fontWeight:900, color:'#003E9B' }}>${((product?.price||89)*quantity).toLocaleString()}</span>
          </div>
        </div>

        <button style={{ width:'100%', padding:'14px', borderRadius:12, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)', color:'#fff', fontSize:13, fontWeight:800, letterSpacing:'0.5px' }}>
          📦 Request a Quote
        </button>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // PANEL INNER
  // ─────────────────────────────────────────────────────────────────────────

  const panelInner = (
    <>
      {/* Tab bar */}
      <div style={{ display:'flex', borderBottom:'1px solid #E8ECF0' }}>
        {STEPS.map((s,i) => {
          const active = step===i;
          const Icon   = s.Icon;
          return (
            <button key={s.id} onClick={() => setStep(i)} style={{
              flex:1, padding:'11px 4px 9px', border:'none', cursor:'pointer',
              borderBottom:`2.5px solid ${active?'#003E9B':'transparent'}`,
              background: active?'rgba(0,62,155,0.05)':'transparent',
              color: active?'#003E9B':'#94A3B8',
              display:'flex', flexDirection:'column', alignItems:'center', gap:3,
            }}>
              <Icon size={15} strokeWidth={active?2.5:1.8}/>
              <span style={{ fontSize:8, fontWeight:700 }}>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Title */}
      <div style={{ padding:'12px 16px', borderBottom:'1px solid #E8ECF0' }}>
        <div style={{ fontSize:17, fontWeight:800, color:'#0F172A' }}>{product?.name||'Kit Designer'}</div>
        <div style={{ fontSize:9, color:'#94A3B8', marginTop:2 }}>
          {['Style & Fabric','Colours','Logos & Badges','Text & Numbers','Order'][step]}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex:1, overflowY:'auto', padding:'14px', background:'#FAFAFA' }}>
        {renderContent()}
      </div>

      {/* Footer */}
      <div style={{ padding:'12px 14px', borderTop:'1px solid #E8ECF0', background:'#fff' }}>
        <button onClick={() => step<4?setStep(step+1):null} style={{
          width:'100%', padding:'14px', borderRadius:12, border:'none', cursor:'pointer',
          fontSize:13, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          background:'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)', color:'#fff',
        }}>
          {step<4 ? <>{STEPS[step+1]?.label} <ArrowRight size={16}/></> : <><ShoppingBag size={16}/> Place Order</>}
        </button>
        {step>0 && (
          <button onClick={() => setStep(step-1)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:11, color:'#94A3B8', marginTop:9, width:'100%', fontWeight:600 }}>
            ← Back to {STEPS[step-1]?.label}
          </button>
        )}
      </div>
    </>
  );

  if (!mounted) return (
    <div style={{ height:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:40, height:40, border:'3px solid #003E9B', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 1s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const chip = { background:'rgba(255,255,255,0.95)', backdropFilter:'blur(14px)', border:'1px solid rgba(255,255,255,0.7)', boxShadow:'0 4px 14px rgba(0,0,0,0.10)', borderRadius:10, padding:'8px 12px' };

  return (
    <div style={{ height:'100vh', overflow:'hidden', background:'#fff', display:'flex', flexDirection:'column', fontFamily:"'Poppins','Segoe UI',sans-serif",margin:"10px 0px" }}>

      {/* HEADER */}
      <header style={{ height:54, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0px 22px',background:'#fff', borderBottom:'1px solid #E8ECF0', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Paintbrush size={16} color="#fff"/>
          </div>
          <div>
            <div  className="text-primary" style={{ fontSize:14, fontWeight:800 }}>{product?.name||'Kit Designer'}</div>
            <div className="text-primary-blue " style={{ fontSize:9}}>Custom Kit Studio</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button onClick={reset} style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 13px', borderRadius:8, border:'1px solid #E2E8F0', background:'#fff', fontSize:10, fontWeight:700, cursor:'pointer', color:'#64748B' }}>
            <RotateCcw size={12}/> Reset
          </button>
          <button style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:8, border:'none', background:'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)', color:'#fff', fontSize:10, fontWeight:700, cursor:'pointer' }}>
            <Save size={12}/> Save
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="mob-toggle" style={{ display:'none', padding:'7px 11px', borderRadius:8, background:'rgba(0,62,155,0.1)', color:'#003E9B', border:'none', cursor:'pointer' }}>
            <Menu size={18}/>
          </button>
        </div>
      </header>

      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>

        {/* VIEWER */}
        <div style={{ flex:1, position:'relative', background:'linear-gradient(135deg,#EEF2F7,#E2E8F0)', overflow:'hidden' }}>

          {/* View mode toggle */}
          <div style={{ position:'absolute', top:14, left:'50%', transform:'translateX(-50%)', zIndex:20, display:'flex', gap:8 }}>
            {[['glb','3D 360° View'],['2d','2D View']].map(([m,lbl]) => (
              <button key={m} onClick={() => setViewMode(m)} style={{
                padding:'7px 16px', borderRadius:99, fontSize:10, fontWeight:700, cursor:'pointer', border:'none',
                background: viewMode===m?'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)':'rgba(255,255,255,0.95)',
                color: viewMode===m?'#fff':'#003E9B',
                boxShadow: viewMode===m?'0 2px 10px rgba(0,62,155,0.3)':'0 1px 4px rgba(0,0,0,0.1)',
              }}>{lbl}</button>
            ))}
          </div>

          {/* Zoom */}
          <button onClick={() => setIsZoomed(!isZoomed)} style={{ position:'absolute', top:14, right:14, zIndex:20, background:'rgba(255,255,255,0.92)', backdropFilter:'blur(8px)', padding:8, borderRadius:40, border:'none', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.12)' }}>
            <Maximize2 size={15}/>
          </button>

          {/* ── 3D GLB ── */}
          {viewMode==='glb' && (
            <div style={{ position:'absolute', inset:0 }}>
              <GLBViewer
                glbPath="/images/jerseys/jersey.glb"
                autoRotate={true}
                backgroundColor="#E2E8F0"
                jerseyColor={jerseyColor}
                playerName={nameText}
                playerNumber={numberText}
                nameColor={nameColor}
                numberColor={numberColor}
                nameStyleId={nameStyleId}
                nameFont={nameFont}
                nameTextStyle={nameStyleId}
                nameVertical={nameVertical}
                showText={showName && nameStyleId!=='none'}
                sleeveColor={sleeveColor}
                pattern={pattern}
                patternColor={patternColor}
              />
            </div>
          )}

          {/* ── 2D SVG ── */}
          {viewMode==='2d' && (
            <>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', padding:isZoomed?20:'62px 10%', transition:'all 0.3s' }}>
                <div style={{ width:'100%', maxWidth:isZoomed?500:320, transition:'all 0.3s' }}>
                  <JerseySVG
                    jerseyColor={jerseyColor} sleeveColor={sleeveColor}
                    collarType={collarType} pattern={pattern} patternColor={patternColor}
                    pipingType={pipingType} pipingColor={pipingColor} sleeveLength={sleeveLength}
                    view={view}
                    clubLogo={clubLogo} clubLogoPos={clubLogoPos} clubLogoSize={clubLogoSize}
                    sponsorLogo={sponsorLogo} sponsorLogoSize={sponsorLogoSize}
                    sponsorBackLogo={sponsorBackLogo}
                    nameText={nameText} nameStyleId={nameStyleId} nameFont={nameFont}
                    nameColor={nameColor} nameSize={nameSize} nameVertical={nameVertical}
                    nameEffect={nameEffect} nameEffectColor={nameEffectColor} nameOutlineWidth={nameOutlineWidth}
                    numberText={numberText} numberFont={numberFont}
                    numberColor={numberColor} numberSize={numberSize} numberPosition={numberPosition}
                    numberEffect={numberEffect} numberEffectColor={numberEffectColor}
                    showTeam={showTeam} teamName={teamName} teamColor={teamColor} teamFont={teamFont}
                    showName={showName} showNumber={showNumber}
                  />
                </div>
              </div>

              {/* Front/Back toggle */}
              <div style={{ position:'absolute', bottom:20, left:'50%', transform:'translateX(-50%)', zIndex:20 }}>
                <div style={{ ...chip, borderRadius:99, padding:4, display:'inline-flex', gap:4 }}>
                  {['front','back'].map(v => (
                    <button key={v} onClick={() => setView(v)} style={{
                      padding:'8px 26px', borderRadius:99, fontSize:10, fontWeight:700, cursor:'pointer',
                      background: view===v?'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)':'transparent',
                      border: view===v?'none':'1px solid #003E9B',
                      color: view===v?'#fff':'#003E9B',
                    }}>{v.toUpperCase()}</button>
                  ))}
                </div>
              </div>

              {/* Color chip BL */}
              <div style={{ position:'absolute', bottom:20, left:16, zIndex:20 }}>
                <div style={chip}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:14, height:14, borderRadius:'50%', background:jerseyColor, border:'1px solid rgba(0,0,0,0.1)' }}/>
                    <div>
                      <div style={{ fontSize:8, color:'#94A3B8' }}>Base</div>
                      <div style={{ fontSize:11, fontWeight:700 }}>{JERSEY_COLORS.find(c=>c.code===jerseyColor)?.name||jerseyColor}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Size chip BR */}
              <div style={{ position:'absolute', bottom:20, right:16, zIndex:20 }}>
                <div style={chip}>
                  <div style={{ fontSize:8, color:'#94A3B8' }}>Size</div>
                  <div style={{ fontSize:14, fontWeight:900, color:'#003E9B' }}>{selectedSize}</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* DESKTOP PANEL */}
        <div className="desktop-cfg" style={{ width:385, background:'#fff', borderLeft:'1px solid #E8ECF0', display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {panelInner}
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="mob-nav" style={{ display:'none', position:'fixed', bottom:0, left:0, right:0, background:'rgba(255,255,255,0.98)', backdropFilter:'blur(10px)', borderTop:'1px solid #E8ECF0', zIndex:40 }}>
        {STEPS.map((s,i) => {
          const Icon   = s.Icon;
          const active = step===i;
          return (
            <button key={s.id} onClick={() => { setStep(i); setMobileOpen(true); }} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2, padding:'10px 0', cursor:'pointer', border:'none', background:'transparent', color:active?'#003E9B':'#94A3B8' }}>
              <Icon size={18} strokeWidth={active?2.5:1.8}/>
              <span style={{ fontSize:8, fontWeight:700 }}>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div style={{ position:'fixed', inset:0, zIndex:300 }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(15,23,42,0.5)', backdropFilter:'blur(4px)' }} onClick={() => setMobileOpen(false)}/>
          <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'#fff', borderRadius:'24px 24px 0 0', maxHeight:'82vh', display:'flex', flexDirection:'column' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px', borderBottom:'1px solid #E8ECF0' }}>
              <span style={{ fontSize:16, fontWeight:800 }}>Customize</span>
              <button onClick={() => setMobileOpen(false)} style={{ background:'#F1F5F9', border:'none', borderRadius:'50%', width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                <X size={14}/>
              </button>
            </div>
            <div style={{ flex:1, overflow:'auto' }}>{panelInner}</div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 1023px) {
          .desktop-cfg { display: none !important; }
          .mob-nav, .mob-toggle { display: flex !important; }
        }
        @media (min-width: 1024px) {
          .mob-nav, .mob-toggle { display: none !important; }
        }
        button { transition: all 0.18s ease; }
        button:hover { opacity: 0.9; }
        button:active { transform: scale(0.97); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(135deg,#0EA5E9,#0284C7); border-radius: 10px; }
        input[type=range] { cursor: pointer; }
        input:focus { outline: 2px solid rgba(0,62,155,0.4); outline-offset: 2px; }
      `}</style>
    </div>
  );
}