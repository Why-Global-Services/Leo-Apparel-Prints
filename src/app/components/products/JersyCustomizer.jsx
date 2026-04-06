"use client";

import { useState, useCallback, useEffect } from 'react';
import {
  Upload, ChevronDown, Save, Check, Trash2,
  Type, Shield, Paintbrush, ShoppingBag, ArrowRight,
  RotateCcw, X, Menu, Zap, Download, Star, Undo2, Redo2
} from 'lucide-react';

/* ══════════════════════ DATA ══════════════════════ */
const JERSEY_COLORS = [
  { name: 'Obsidian',      code: '#111111' },
  { name: 'Midnight Navy', code: '#0D1B2A' },
  { name: 'Deep Navy',     code: '#1D3557' },
  { name: 'Royal Blue',    code: '#1E40AF' },
  { name: 'Crimson',       code: '#DC2626' },
  { name: 'Scarlet',       code: '#EF4444' },
  { name: 'Forest',        code: '#14532D' },
  { name: 'Emerald',       code: '#059669' },
  { name: 'Gold',          code: '#D97706' },
  { name: 'Amber',         code: '#F59E0B' },
  { name: 'Pure White',    code: '#FFFFFF' },
  { name: 'Pearl',         code: '#F5F5DC' },
  { name: 'Slate',         code: '#334155' },
  { name: 'Burgundy',      code: '#7F1D1D' },
  { name: 'Purple',        code: '#6D28D9' },
  { name: 'Teal',          code: '#0F766E' },
];

const TEXT_COLORS = [
  '#FFFFFF','#F1F5F9','#94A3B8','#334155',
  '#FBBF24','#F59E0B','#EF4444','#DC2626',
  '#34D399','#10B981','#60A5FA','#3B82F6',
  '#C084FC','#A855F7','#FB7185','#F43F5E',
  '#000000','#1E293B',
];

const FONT_STYLES = [
  { id:'none',       label:'None', fontFamily:'',                          fontWeight:'normal', style:{} },
  { id:'collegiate', label:'COLL', fontFamily:'"Arial Black",sans-serif',  fontWeight:'900',   style:{ letterSpacing:'.05em' } },
  { id:'block',      label:'BLK',  fontFamily:'Impact,sans-serif',         fontWeight:'900',   style:{} },
  { id:'varsity',    label:'VAR',  fontFamily:'"Georgia",serif',           fontWeight:'900',   style:{ fontStyle:'italic' } },
  { id:'athletic',   label:'ATH',  fontFamily:'"Trebuchet MS",sans-serif', fontWeight:'800',   style:{ letterSpacing:'.08em' } },
  { id:'sport',      label:'SPT',  fontFamily:'"Verdana",sans-serif',      fontWeight:'700',   style:{ letterSpacing:'.04em' } },
  { id:'modern',     label:'MOD',  fontFamily:'"Helvetica",sans-serif',    fontWeight:'900',   style:{ letterSpacing:'.1em' } },
  { id:'retro',      label:'RTO',  fontFamily:'"Courier New",monospace',   fontWeight:'700',   style:{ letterSpacing:'.06em' } },
];

const SIZES = ['XS','S','M','L','XL','XXL','3XL'];
const STEPS = [
  { id:'style', label:'Style',  Icon:Paintbrush  },
  { id:'logos', label:'Logos',  Icon:Shield      },
  { id:'text',  label:'Text',   Icon:Type        },
  { id:'order', label:'Order',  Icon:ShoppingBag },
];

/* ══════════════════════ HELPERS ══════════════════════ */
const isLight = (h) => {
  if (!h||h==='transparent') return true;
  const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);
  return (r*299+g*587+b*114)/1000>160;
};

/* ══════════════════════ JERSEY SVG ══════════════════════ */
const JerseySVG = ({ jerseyColor, view, clubLogo, sponsorLogo, nameText, nameStyleId, nameColor, nameVertical, numberText, numberStyleId, numberColor, showTeam, teamName, teamColor }) => {
  const ns=FONT_STYLES.find(f=>f.id===nameStyleId)||FONT_STYLES[1];
  const nu=FONT_STYLES.find(f=>f.id===numberStyleId)||FONT_STYLES[2];
  const light=isLight(jerseyColor);
  const seam=light?'rgba(0,0,0,0.13)':'rgba(255,255,255,0.12)';
  const panel=light?'rgba(0,0,0,0.07)':'rgba(255,255,255,0.07)';
  return (
    <svg viewBox="0 0 300 380" style={{ width:'100%',height:'100%',filter:'drop-shadow(0 28px 52px rgba(0,0,0,0.25))' }}>
      <defs>
        <linearGradient id="jS" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%"   stopColor={light?'rgba(255,255,255,0.32)':'rgba(255,255,255,0.10)'}/>
          <stop offset="55%"  stopColor="rgba(255,255,255,0)"/>
          <stop offset="100%" stopColor={light?'rgba(0,0,0,0.06)':'rgba(0,0,0,0.20)'}/>
        </linearGradient>
        <linearGradient id="jB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(0,0,0,0)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.30)"/>
        </linearGradient>
      </defs>
      <ellipse cx="150" cy="375" rx="82" ry="7" fill="rgba(0,0,0,0.12)"/>
      <path d="M65,38 L32,60 L8,78 L18,155 L56,140 L56,342 L244,342 L244,140 L282,155 L292,78 L268,60 L235,38 L202,18 Q175,46 150,46 Q125,46 98,18 Z"
        fill={jerseyColor} stroke={seam} strokeWidth="1.2"/>
      <path d="M65,38 L32,60 L8,78 L18,155 L56,140 L56,342 L244,342 L244,140 L282,155 L292,78 L268,60 L235,38 L202,18 Q175,46 150,46 Q125,46 98,18 Z"
        fill="url(#jS)"/>
      <path d="M56,230 L56,342 L244,342 L244,230 Z" fill="url(#jB)" opacity="0.45"/>
      <path d="M65,42 L56,140 L74,340 L90,340 L90,96 Z"  fill={panel}/>
      <path d="M235,42 L244,140 L226,340 L210,340 L210,96 Z" fill={panel}/>
      <path d="M98,18 Q125,46 150,46 Q175,46 202,18 L204,28 Q176,57 150,57 Q124,57 96,28 Z" fill={panel}/>
      {[62,78,94].map(cy=><circle key={cy} cx="150" cy={cy} r="2.5" fill={seam}/>)}
      <line x1="78"  y1="60" x2="72"  y2="338" stroke={seam} strokeWidth="1.2" strokeDasharray="4,3"/>
      <line x1="222" y1="60" x2="228" y2="338" stroke={seam} strokeWidth="1.2" strokeDasharray="4,3"/>
      {clubLogo    && view==='front' && <image href={clubLogo}    x="84" y="82"  width="46" height="46"/>}
      {sponsorLogo && view==='front' && <image href={sponsorLogo} x="98" y="142" width="104" height="34" preserveAspectRatio="xMidYMid meet"/>}
      {view==='back'&&nameStyleId!=='none'&&(
        <text x="150" y={nameVertical*2.6} textAnchor="middle"
          fontFamily={ns.fontFamily} fontSize="22" fontWeight={ns.fontWeight}
          fill={nameColor} letterSpacing={ns.style?.letterSpacing??'2'} fontStyle={ns.style?.fontStyle}>
          {nameText}
        </text>
      )}
      {view==='back'&&numberStyleId!=='none'&&(
        <text x="150" y={nameVertical*2.6+72} textAnchor="middle"
          fontFamily={nu.fontFamily} fontSize="72" fontWeight={nu.fontWeight} fill={numberColor}>
          {numberText}
        </text>
      )}
      {view==='back'&&showTeam&&(
        <text x="150" y="314" textAnchor="middle"
          fontFamily='"Trebuchet MS",sans-serif' fontSize="10" fontWeight="700"
          fill={teamColor} letterSpacing="5">{teamName}
        </text>
      )}
    </svg>
  );
};

/* ══════════════════════ MAIN ══════════════════════ */
export default function JerseyCustomizer({ product }) {
  const [mounted,      setMounted]      = useState(false);
  const [step,         setStep]         = useState(0);
  const [jerseyColor,  setJerseyColor]  = useState('#1D3557');
  const [view,         setView]         = useState('front');
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [fabricChoice, setFabricChoice] = useState('AirMesh Pro');

  const [clubLogo,    setClubLogo]    = useState(null);
  const [sponsorLogo, setSponsorLogo] = useState(null);
  const [leftSleeve,  setLeftSleeve]  = useState(null);
  const [rightSleeve, setRightSleeve] = useState(null);

  const [nameStyleId,  setNameStyleId]  = useState('collegiate');
  const [nameText,     setNameText]     = useState('PLAYER');
  const [nameColor,    setNameColor]    = useState('#FFFFFF');
  const [nameVertical, setNameVertical] = useState(38);

  const [numberStyleId, setNumberStyleId] = useState('block');
  const [numberText,    setNumberText]    = useState('10');
  const [numberColor,   setNumberColor]   = useState('#F59E0B');

  const [teamName,  setTeamName]  = useState('YOUR TEAM');
  const [teamColor, setTeamColor] = useState('#64748B');
  const [showTeam,  setShowTeam]  = useState(false);

  const [selectedSize, setSelectedSize] = useState('L');
  const [nameOpen, setNameOpen] = useState(true);
  const [numOpen,  setNumOpen]  = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [fabOpen,  setFabOpen]  = useState(false);
  const [colOpen,  setColOpen]  = useState(true);

  useEffect(()=>{ setMounted(true); },[]);

 const handleUpload = useCallback((setter) => (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file');
    return;
  }
  
  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('File size should be less than 5MB');
    return;
  }
  
  const reader = new FileReader();
  reader.onloadend = () => {
    setter(reader.result);
  };
  reader.onerror = () => {
    alert('Error reading file');
  };
  reader.readAsDataURL(file);
}, []);

  const reset=()=>{
    setJerseyColor('#1D3557'); setClubLogo(null); setSponsorLogo(null);
    setLeftSleeve(null); setRightSleeve(null); setNameText('PLAYER');
    setNumberText('10'); setTeamName('YOUR TEAM'); setNameColor('#FFFFFF');
    setNumberColor('#F59E0B'); setNameVertical(38); setShowTeam(false);
    setNameStyleId('collegiate'); setNumberStyleId('block');
  };

  const curColor   = JERSEY_COLORS.find(c=>c.code===jerseyColor);
  const productImg = product?.mainImage||product?.image||null;

  /* tokens */
  const P    = 'var(--primary,#E8820C)';
  const Pmid = 'rgba(232,130,12,0.10)';
  const F    = { fontFamily:"var(--font-primary,'Poppins'),sans-serif" };

  const labelSt = { ...F, fontSize:9, fontWeight:700, textTransform:'uppercase',
    letterSpacing:'.18em', color:'#94A3B8', marginBottom:7, display:'block' };

  const inputSt = { ...F, width:'100%', padding:'10px 13px', borderRadius:10,
    border:'1.5px solid #E2E8F0', background:'#fff', color:'#0F172A',
    fontSize:13, fontWeight:700, outline:'none', boxSizing:'border-box' };

  const card = { background:'#fff', borderRadius:12, border:'1px solid #E8ECF0',
    overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,0.04)' };

  /* glass overlay chip style */
  const chip = { background:'rgba(255,255,255,0.93)', backdropFilter:'blur(14px)',
    border:'1px solid rgba(255,255,255,0.75)', boxShadow:'0 4px 18px rgba(0,0,0,0.10)', borderRadius:12 };

  /* ── sub-components ── */
  const ColorSwatch = ({ color }) => {
    const sel=jerseyColor===color.code;
    return (
      <button title={color.name} onClick={()=>setJerseyColor(color.code)} style={{
        aspectRatio:'1', borderRadius:9, cursor:'pointer',
        border:`2px solid ${sel?P:'#E2E8F0'}`,
        backgroundColor:color.code,
        display:'flex', alignItems:'center', justifyContent:'center',
        transform:sel?'scale(1.12)':'scale(1)', transition:'all 0.16s',
        boxShadow:sel?`0 0 0 3px rgba(232,130,12,0.22),0 4px 10px rgba(0,0,0,0.14)`
          :color.code==='#FFFFFF'?'inset 0 0 0 1px #E2E8F0':'none',
      }}>
        {sel&&<Check size={9} strokeWidth={3.5} color={isLight(color.code)?'#000':'#fff'}/>}
      </button>
    );
  };

  const ColorDots = ({ selected, onSelect }) => (
    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
      {TEXT_COLORS.map(c=>(
        <button key={c} onClick={()=>onSelect(c)} style={{
          width:22, height:22, borderRadius:7,
          border:`2px solid ${selected===c?P:'transparent'}`,
          backgroundColor:c, cursor:'pointer',
          transform:selected===c?'scale(1.3)':'scale(1)', transition:'all 0.16s',
          boxShadow:c==='#FFFFFF'?'inset 0 0 0 1px #CBD5E1'
            :selected===c?`0 0 0 2px rgba(232,130,12,0.3)`:'none',
        }}/>
      ))}
    </div>
  );

  const FontGrid = ({ selectedId, onSelect }) => (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:7 }}>
      {FONT_STYLES.map(f=>{
        const sel=selectedId===f.id;
        return (
          <button key={f.id} onClick={()=>onSelect(f.id)} style={{
            height:46, borderRadius:9, cursor:'pointer', position:'relative',
            border:`1.5px solid ${sel?P:'#E2E8F0'}`,
            background:sel?Pmid:'#F8FAFC',
            display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.16s',
          }}>
            {sel&&<span style={{ position:'absolute', top:3, right:3, width:10, height:10,
              borderRadius:'50%', background:P,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Check size={5} strokeWidth={4} color="#fff"/>
            </span>}
            <span style={{ ...f.style, fontFamily:f.fontFamily||'sans-serif',
              fontWeight:f.fontWeight, fontSize:9, color:sel?P:'#475569' }}>
              {f.label}
            </span>
          </button>
        );
      })}
    </div>
  );

const UploadSlot = ({ label, type, state, setter }) => (
  <div style={{ ...card, borderRadius: 10 }}>
    <div style={{ padding:'9px 12px', background:'#F8FAFC', borderBottom:'1px solid #E8ECF0',
      display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <span style={{ ...F, fontSize:10, fontWeight:700, color:'#334155' }}>{label}</span>
      {state && (
        <button 
          onClick={() => {
            setter(null);
            // Clear the file input value to allow re-uploading the same file
            const input = document.getElementById(`up-${type}`);
            if (input) input.value = '';
          }} 
          style={{ background:'none', border:'none', cursor:'pointer', color:'#EF4444' }}
        >
          <Trash2 size={11}/>
        </button>
      )}
    </div>
    <div style={{ padding:10 }}>
      {state ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: 60
        }}>
          <img 
            src={state} 
            alt={label} 
            style={{ 
              maxHeight: 48, 
              maxWidth: '100%', 
              display: 'block', 
              objectFit: 'contain',
              borderRadius: 6,
              border: '1px solid #E8ECF0',
              padding: 4,
              background: '#fff'
            }}
            onError={(e) => {
              console.error(`Failed to load ${label} image`);
              e.target.style.display = 'none';
            }}
          />
        </div>
      ) : (
        <>
          <button 
            onClick={() => document.getElementById(`up-${type}`).click()} 
            style={{
              width:'100%', padding:'13px 8px', border:'1.5px dashed #CBD5E1', borderRadius:9,
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
              gap:6, background:'transparent', ...F, fontSize:9, fontWeight:700,
              color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.1em', transition:'all 0.18s',
            }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=P; e.currentTarget.style.color=P; e.currentTarget.style.background=Pmid; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='#CBD5E1'; e.currentTarget.style.color='#94A3B8'; e.currentTarget.style.background='transparent'; }}
          >
            <Upload size={12}/> Upload Image
          </button>
          <input 
            id={`up-${type}`} 
            type="file" 
            accept="image/*" 
            style={{ display:'none' }} 
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              
              // Validate file type
              if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
              }
              
              // Validate file size (max 5MB)
              if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
              }
              
              const reader = new FileReader();
              reader.onloadend = () => {
                setter(reader.result);
              };
              reader.onerror = () => {
                alert('Error reading file');
              };
              reader.readAsDataURL(file);
            }}
          />
        </>
      )}
    </div>
  </div>
);

  const Section = ({ open, onToggle, label, badge, children }) => (
    <div style={card}>
      <button onClick={onToggle} style={{
        width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'12px 16px', border:'none', cursor:'pointer',
        background:open?Pmid:'#F8FAFC', transition:'all 0.18s',
        borderBottom:open?`1.5px solid rgba(232,130,12,0.18)`:'1.5px solid transparent',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ ...F, fontSize:10, fontWeight:700, textTransform:'uppercase',
            letterSpacing:'.14em', color:open?P:'#334155' }}>{label}</span>
          {badge&&<span style={{ ...F, padding:'2px 8px', borderRadius:6,
            background:open?`rgba(232,130,12,0.15)`:'#EEF2FF',
            fontSize:9, fontWeight:700, color:open?P:'#4F46E5' }}>{badge}</span>}
        </div>
        <ChevronDown size={13} color={open?P:'#94A3B8'}
          style={{ transform:open?'rotate(180deg)':'none', transition:'transform 0.2s' }}/>
      </button>
      {open&&(
        <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:13 }}>
          {children}
        </div>
      )}
    </div>
  );

  /* ═══ STEP CONTENT ═══ */
  const renderContent = () => {

    if (step===0) return (
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        <Section open={fabOpen} onToggle={()=>setFabOpen(v=>!v)} label="Fabric Technology">
          <div style={{ display:'flex', gap:8 }}>
            {['AirMesh Pro','CoolWeave'].map(f=>{
              const sel=fabricChoice===f;
              return (
                <button key={f} onClick={()=>setFabricChoice(f)} style={{
                  flex:1, padding:'10px 12px', borderRadius:10, cursor:'pointer',
                  border:`1.5px solid ${sel?P:'#E2E8F0'}`,
                  background:sel?Pmid:'#F8FAFC', ...F,
                  fontSize:11, fontWeight:700, color:sel?P:'#64748B', transition:'all 0.18s',
                }}>{f}</button>
              );
            })}
          </div>
          <p style={{ ...F, fontSize:11, color:'#94A3B8', lineHeight:1.7, margin:0 }}>
            Bio-washed performance fabric with UV protection &amp; elite moisture management.
          </p>
        </Section>

        <Section open={colOpen} onToggle={()=>setColOpen(v=>!v)} label="Base Colour" badge={curColor?.name}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:7 }}>
            {JERSEY_COLORS.map(c=><ColorSwatch key={c.code} color={c}/>)}
          </div>
        </Section>
      </div>
    );

    if (step===1) return (
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ padding:'11px 14px', borderRadius:10,
          background:'rgba(232,130,12,0.07)', border:'1px solid rgba(232,130,12,0.2)',
          display:'flex', gap:9, alignItems:'flex-start' }}>
          <Zap size={13} color={P} style={{ flexShrink:0, marginTop:1 }}/>
          <p style={{ ...F, fontSize:10, color:'#64748B', lineHeight:1.65, margin:0 }}>
            <span style={{ color:P, fontWeight:700 }}>Vector (SVG/EPS)</span> gives sharpest print.
            PNG/JPG needs 300 DPI+ with transparent background.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          <UploadSlot label="Club Badge"   type="club"     state={clubLogo}    setter={setClubLogo}/>
          <UploadSlot label="Sponsor Logo" type="sponsor"  state={sponsorLogo} setter={setSponsorLogo}/>
          <UploadSlot label="Left Sleeve"  type="left"     state={leftSleeve}  setter={setLeftSleeve}/>
          <UploadSlot label="Right Sleeve" type="right"    state={rightSleeve} setter={setRightSleeve}/>
        </div>
      </div>
    );

    if (step===2) return (
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        <Section open={nameOpen} onToggle={()=>setNameOpen(v=>!v)} label="Player Name">
          <div>
            <span style={labelSt}>Name</span>
            <input value={nameText} onChange={e=>setNameText(e.target.value.toUpperCase())}
              placeholder="YOUR NAME" style={inputSt}
              onFocus={e=>e.target.style.borderColor=P}
              onBlur={e=>e.target.style.borderColor='#E2E8F0'}/>
          </div>
          <div><span style={labelSt}>Font Style</span><FontGrid selectedId={nameStyleId} onSelect={setNameStyleId}/></div>
          <div><span style={labelSt}>Colour</span><ColorDots selected={nameColor} onSelect={setNameColor}/></div>
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
              <span style={labelSt}>Vertical Position</span>
              <span style={{ ...F, fontSize:10, fontWeight:700, color:P }}>{nameVertical}%</span>
            </div>
            <input type="range" min="20" max="65" value={nameVertical}
              onChange={e=>setNameVertical(Number(e.target.value))}
              style={{ width:'100%', accentColor:P, cursor:'pointer' }}/>
          </div>
        </Section>

        <Section open={numOpen} onToggle={()=>setNumOpen(v=>!v)} label="Player Number">
          <div>
            <span style={labelSt}>Number</span>
            <input value={numberText} onChange={e=>setNumberText(e.target.value)} maxLength={2} style={inputSt}/>
          </div>
          <div><span style={labelSt}>Font Style</span><FontGrid selectedId={numberStyleId} onSelect={setNumberStyleId}/></div>
          <div><span style={labelSt}>Colour</span><ColorDots selected={numberColor} onSelect={setNumberColor}/></div>
        </Section>

        <div style={card}>
          <button onClick={()=>setTeamOpen(v=>!v)} style={{
            width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'12px 16px', border:'none', cursor:'pointer',
            background:teamOpen?Pmid:'#F8FAFC',
            borderBottom:teamOpen?`1.5px solid rgba(232,130,12,0.18)`:'1.5px solid transparent',
            transition:'all 0.18s',
          }}>
            <span style={{ ...F, fontSize:10, fontWeight:700, textTransform:'uppercase',
              letterSpacing:'.14em', color:teamOpen?P:'#334155' }}>Team Name</span>
            <div style={{ display:'flex', alignItems:'center', gap:9 }}>
              <div onClick={e=>{ e.stopPropagation(); setShowTeam(v=>!v); }}
                style={{ width:36, height:20, borderRadius:99, cursor:'pointer', position:'relative',
                  background:showTeam?P:'#CBD5E1', transition:'background 0.22s' }}>
                <span style={{ position:'absolute', top:3,
                  left:showTeam?17:3, width:14, height:14, borderRadius:'50%',
                  background:'#fff', transition:'left 0.22s', boxShadow:'0 1px 4px rgba(0,0,0,0.2)' }}/>
              </div>
              <ChevronDown size={13} color={teamOpen?P:'#94A3B8'}
                style={{ transform:teamOpen?'rotate(180deg)':'none', transition:'transform 0.2s' }}/>
            </div>
          </button>
          {teamOpen&&(
            <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:13 }}>
              {showTeam
                ? <>
                    <div>
                      <span style={labelSt}>Team Name</span>
                      <input value={teamName} onChange={e=>setTeamName(e.target.value.toUpperCase())} style={inputSt}/>
                    </div>
                    <div><span style={labelSt}>Colour</span><ColorDots selected={teamColor} onSelect={setTeamColor}/></div>
                  </>
                : <p style={{ ...F, fontSize:11, color:'#94A3B8', textAlign:'center', padding:'4px 0', margin:0 }}>
                    Toggle on to show team name
                  </p>
              }
            </div>
          )}
        </div>
      </div>
    );

    return (
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ padding:'11px 14px', borderRadius:10, background:'#F0FDF4', border:'1px solid #BBF7D0' }}>
          <p style={{ ...F, fontSize:11, color:'#166534', margin:0 }}>
            Add players' names, numbers and sizes to complete your order.{' '}
            <a href="#" style={{ fontWeight:700, color:'#059669' }}>Size Guide →</a>
          </p>
        </div>

        <div style={card}>
          <div style={{ padding:'11px 14px', background:'#F8FAFC', borderBottom:'1px solid #E8ECF0' }}>
            <span style={{ ...F, fontSize:11, fontWeight:700, color:'#0F172A' }}>Player List</span>
          </div>
          <div style={{ padding:12, display:'flex', flexDirection:'column', gap:8 }}>
            <a href="#" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7,
              padding:'10px 14px', border:`1.5px solid ${P}`, borderRadius:10,
              fontSize:10, fontWeight:700, color:P, textDecoration:'none', background:Pmid,
              ...F, textTransform:'uppercase', letterSpacing:'.08em' }}>
              <Download size={11}/> Download Template
            </a>
            <label style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7,
              padding:'10px 14px', border:'1.5px dashed #CBD5E1', borderRadius:10,
              fontSize:10, fontWeight:600, cursor:'pointer', ...F,
              color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.08em' }}>
              <Upload size={11}/> Upload Player List
              <input type="file" style={{ display:'none' }}/>
            </label>
          </div>
        </div>

        <div>
          <span style={labelSt}>Select Size</span>
          <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
            {SIZES.map(s=>{
              const sel=selectedSize===s;
              return (
                <button key={s} onClick={()=>setSelectedSize(s)} style={{
                  width:46, height:46, borderRadius:9, ...F,
                  fontSize:11, fontWeight:700, cursor:'pointer',
                  border:`1.5px solid ${sel?P:'#E2E8F0'}`,
                  background:sel?Pmid:'#F8FAFC', color:sel?P:'#64748B', transition:'all 0.18s',
                }}>{s}</button>
              );
            })}
          </div>
        </div>

        <div style={{ border:`1.5px solid rgba(232,130,12,0.25)`, borderRadius:12,
          overflow:'hidden', background:'rgba(232,130,12,0.03)' }}>
          <div style={{ padding:'11px 16px', borderBottom:'1px solid rgba(232,130,12,0.12)',
            display:'flex', alignItems:'center', gap:8 }}>
            <Star size={13} color={P} fill={P}/>
            <span style={{ ...F, fontSize:12, fontWeight:800, color:P }}>Order Summary</span>
          </div>
          <div style={{ padding:'12px 16px', display:'flex', flexDirection:'column', gap:9 }}>
            {[
              ['Colour', curColor?.name??jerseyColor],
              ['Player', `${nameText} — #${numberText}`],
              ['Team',   showTeam?teamName:'—'],
              ['Fabric', fabricChoice],
              ['Size',   selectedSize],
            ].map(([k,v])=>(
              <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ ...F, fontSize:9, color:'#94A3B8', fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em' }}>{k}</span>
                <span style={{ ...F, fontSize:11, color:'#0F172A', fontWeight:700 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ padding:'12px 16px', borderTop:'1px solid rgba(232,130,12,0.12)',
            display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
            <span style={{ ...F, fontSize:9, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.12em' }}>Unit Price</span>
            <div style={{ display:'flex', alignItems:'baseline', gap:2 }}>
              <span style={{ ...F, fontSize:15, color:P, fontWeight:700 }}>$</span>
              <span style={{ ...F, fontSize:32, fontWeight:900, color:P }}>{product?.price??'149'}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ═══ PANEL SHELL ═══ */
  const panelInner = (
    <>
      <div style={{ display:'flex', borderBottom:'1px solid #E8ECF0', flexShrink:0, background:'#fff' }}>
        {STEPS.map((s,i)=>{
          const active=step===i; const Icon=s.Icon;
          return (
            <button key={s.id} onClick={()=>setStep(i)} style={{
              flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4,
              padding:'11px 4px', border:'none', cursor:'pointer',
              borderBottom:`2.5px solid ${active?P:'transparent'}`,
              background:active?Pmid:'transparent',
              color:active?P:'#94A3B8', transition:'all 0.2s',
            }}>
              <Icon size={16} strokeWidth={active?2.5:1.8}/>
              <span style={{ ...F, fontSize:8, fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em' }}>{s.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ padding:'14px 18px 12px', borderBottom:'1px solid #E8ECF0', flexShrink:0 }}>
        <div style={{ ...F, fontSize:17, fontWeight:800, color:'#0F172A', letterSpacing:'-0.01em' }}>
          {['Style','Logos','Name & Number','Your Order'][step]}
        </div>
        <div style={{ ...F, fontSize:9, color:'#94A3B8', marginTop:3, textTransform:'uppercase', letterSpacing:'.16em' }}>
          {['Colour & fabric','Badges & sponsors','Fonts & placement','Sizing & players'][step]}
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'14px 16px 10px', background:'#F8FAFC' }}>
        {renderContent()}
      </div>

      <div style={{ padding:'12px 16px', borderTop:'1px solid #E8ECF0',
        flexShrink:0, display:'flex', flexDirection:'column', gap:8, background:'#fff' }}>
        <button
          onClick={()=>step<STEPS.length-1?setStep(s=>s+1):null}
          style={{
            ...F, width:'100%', padding:'13px', borderRadius:12, border:'none', cursor:'pointer',
            fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:'.12em',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            background:`linear-gradient(135deg, ${P}, #F59E0B)`,
            color:'#fff', boxShadow:`0 6px 20px rgba(232,130,12,0.32)`, transition:'all 0.2s',
          }}
          onMouseEnter={e=>e.currentTarget.style.transform='translateY(-1px)'}
          onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
        >
          {step<STEPS.length-1
            ?<>{step===STEPS.length-2?'Review Order':'Continue'} <ArrowRight size={14}/></>
            :<><Save size={13}/> Save &amp; Order</>
          }
        </button>
        {step>0&&(
          <button onClick={()=>setStep(s=>s-1)} style={{ background:'none', border:'none', cursor:'pointer',
            ...F, fontSize:10, color:'#94A3B8', textAlign:'center', padding:2 }}>
            ← Back to {STEPS[step-1].label}
          </button>
        )}
      </div>
    </>
  );

  if (!mounted) return (
    <div style={{ height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#fff' }}>
      <div style={{ width:38, height:38, border:`3px solid ${P}`, borderTopColor:'transparent',
        borderRadius:'50%', animation:'spin 1s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div suppressHydrationWarning style={{
      height:'100vh', overflow:'hidden', background:'#fff',
      fontFamily:"var(--font-primary,'Poppins'),sans-serif",
      display:'flex', flexDirection:'column',
    }}>

      {/* HEADER */}
      <header style={{
        height:54, flexShrink:0, zIndex:100,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 20px', background:'#fff', borderBottom:'1px solid #E8ECF0',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:30, height:30, borderRadius:8,
            background:`linear-gradient(135deg, ${P}, #F59E0B)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 3px 10px rgba(232,130,12,0.32)` }}>
            <Paintbrush size={14} color="#fff"/>
          </div>
          <div>
            <div style={{ ...F, fontSize:13, fontWeight:800, color:'#0F172A' }}>
              {product?.name??'Kit Designer'}
            </div>
            <div style={{ ...F, fontSize:8, color:'#94A3B8', letterSpacing:'.2em', textTransform:'uppercase' }}>
              Custom Kit Studio
            </div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <button onClick={reset} style={{ display:'flex', alignItems:'center', gap:5,
            padding:'7px 13px', borderRadius:8, border:'1px solid #E2E8F0',
            background:'#fff', color:'#64748B', ...F, fontSize:10, fontWeight:700, cursor:'pointer' }}>
            <RotateCcw size={10}/> Reset
          </button>
          <button style={{ display:'flex', alignItems:'center', gap:6,
            padding:'7px 15px', borderRadius:9,
            background:`linear-gradient(135deg, ${P}, #F59E0B)`,
            border:'none', color:'#fff', ...F, fontSize:10, fontWeight:800, cursor:'pointer',
            boxShadow:`0 3px 12px rgba(232,130,12,0.28)` }}>
            <Save size={10}/> Save
          </button>
          <button onClick={()=>setMobileOpen(v=>!v)} className="mob-toggle" style={{
            display:'none', alignItems:'center', gap:5, padding:'7px 12px', borderRadius:8,
            border:`1.5px solid rgba(232,130,12,0.4)`, background:Pmid,
            color:P, ...F, fontSize:10, fontWeight:700, cursor:'pointer',
          }}>
            <Menu size={14}/>
          </button>
        </div>
      </header>

      {/* BODY */}
      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>

        {/* ══════════════════════════════════
            LEFT — FULL-BLEED PRODUCT STAGE
            No padding, no centering box.
            Image fills every pixel.
        ══════════════════════════════════ */}
      <div style={{
  flex:1,
  position:'relative',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  background:'linear-gradient(135deg,#EEF2F7,#E2E8F0)'
}}>

          {/* ── Full-bleed product image ── */}
          {productImg ? (
            <img
              src={productImg}
              alt="Jersey preview"
              style={{
                position:'absolute', inset:0,
                width:'100%', height:'100%',
                objectFit:'contain',          /* no empty space */
                objectPosition:'center top',
              }}
            />
          ) : (
            /* SVG centred in available space — no tiny box */
            <div style={{ position:'absolute', inset:0, display:'flex',
              alignItems:'center', justifyContent:'center', padding:'64px 10%' }}>
              <div style={{ width:'100%', maxWidth:340, height:'100%', maxHeight:480 }}>
                <JerseySVG
                  jerseyColor={jerseyColor} view={view}
                  clubLogo={clubLogo} sponsorLogo={sponsorLogo}
                  nameText={nameText} nameStyleId={nameStyleId} nameColor={nameColor} nameVertical={nameVertical}
                  numberText={numberText} numberStyleId={numberStyleId} numberColor={numberColor}
                  showTeam={showTeam} teamName={teamName} teamColor={teamColor}
                />
              </div>
            </div>
          )}

          {/* Back-view text overlay for real product image */}
          {productImg && view==='back' && (
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
              alignItems:'center', paddingTop:`${nameVertical*0.9}%`, pointerEvents:'none' }}>
              {nameStyleId!=='none'&&(
                <span style={{ fontFamily:FONT_STYLES.find(f=>f.id===nameStyleId)?.fontFamily,
                  fontWeight:FONT_STYLES.find(f=>f.id===nameStyleId)?.fontWeight,
                  color:nameColor, fontSize:'clamp(12px,2.8vw,24px)', letterSpacing:2, textShadow:'0 2px 6px rgba(0,0,0,0.3)' }}>
                  {nameText}
                </span>
              )}
              {numberStyleId!=='none'&&(
                <span style={{ fontFamily:FONT_STYLES.find(f=>f.id===numberStyleId)?.fontFamily,
                  fontWeight:FONT_STYLES.find(f=>f.id===numberStyleId)?.fontWeight,
                  color:numberColor, fontSize:'clamp(36px,9vw,80px)', lineHeight:1, textShadow:'0 2px 8px rgba(0,0,0,0.3)' }}>
                  {numberText}
                </span>
              )}
            </div>
          )}

          {/* ── FLOATING OVERLAY CONTROLS (glass-morphism chips) ── */}

          {/* View toggle — TOP CENTRE */}
          <div style={{ position:'absolute', top:14, left:'50%', transform:'translateX(-50%)', zIndex:20 }}>
            <div style={{ ...chip, borderRadius:99, padding:4, display:'inline-flex', gap:3 }}>
              {['front','back'].map(v=>(
                <button key={v} onClick={()=>setView(v)} style={{
                  padding:'6px 22px', borderRadius:99, fontSize:9, fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'.14em', border:'none', cursor:'pointer',
                  background:view===v?`linear-gradient(135deg, ${P}, #F59E0B)`:'transparent',
                  color:view===v?'#fff':'#64748B', transition:'all 0.2s', ...F,
                  boxShadow:view===v?`0 3px 10px rgba(232,130,12,0.35)`:'none',
                }}>{v}</button>
              ))}
            </div>
          </div>

          {/* Product name + price — TOP LEFT */}
          <div style={{ position:'absolute', top:14, left:14, zIndex:20 }}>
            <div style={{ ...chip, padding:'8px 14px' }}>
              <div style={{ ...F, fontSize:11, fontWeight:800, color:'#0F172A' }}>{product?.name??'Custom Kit'}</div>
              <div style={{ ...F, fontSize:8, color:P, fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', marginTop:1 }}>
                ${product?.price??'149'} per unit
              </div>
            </div>
          </div>

          {/* Colour chip — BOTTOM LEFT */}
          <div style={{ position:'absolute', bottom:16, left:16, zIndex:20 }}>
            <div style={{ ...chip, padding:'9px 14px', display:'flex', alignItems:'center', gap:9 }}>
              <div style={{ width:16, height:16, borderRadius:'50%', backgroundColor:jerseyColor,
                border:'2px solid rgba(0,0,0,0.08)', flexShrink:0 }}/>
              <div>
                <div style={{ ...F, fontSize:8, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.14em', lineHeight:1 }}>Colour</div>
                <div style={{ ...F, fontSize:11, fontWeight:700, color:'#0F172A', marginTop:2 }}>{curColor?.name??jerseyColor}</div>
              </div>
            </div>
          </div>

          {/* Size — BOTTOM CENTRE */}
          <div style={{ position:'absolute', bottom:16, left:'50%', transform:'translateX(-50%)', zIndex:20 }}>
            <div style={{ ...chip, padding:'8px 18px', display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ ...F, fontSize:9, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.12em' }}>Size</span>
              <span style={{ ...F, fontSize:13, fontWeight:800, color:P }}>{selectedSize}</span>
            </div>
          </div>

          {/* UNDO / REDO — BOTTOM RIGHT */}
          <div style={{ position:'absolute', bottom:16, right:16, zIndex:20, display:'flex', flexDirection:'column', gap:7 }}>
            <button style={{
              display:'flex', alignItems:'center', gap:7, padding:'9px 16px',
              borderRadius:10, border:'none', cursor:'pointer',
              background:`linear-gradient(135deg, ${P}, #F59E0B)`,
              color:'#fff', boxShadow:`0 4px 14px rgba(232,130,12,0.38)`,
              ...F, fontSize:11, fontWeight:800,
            }}>
              <Undo2 size={14}/> UNDO
            </button>
            <button style={{
              display:'flex', alignItems:'center', gap:7, padding:'9px 16px',
              borderRadius:10, border:'1px solid rgba(255,255,255,0.7)', cursor:'pointer',
              background:'rgba(255,255,255,0.92)', backdropFilter:'blur(14px)',
              color:'#64748B', boxShadow:'0 4px 14px rgba(0,0,0,0.09)',
              ...F, fontSize:11, fontWeight:700,
            }}>
              <Redo2 size={14}/> REDO
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="desktop-cfg" style={{
          width:400, flexShrink:0, background:'#fff',
          borderLeft:'1px solid #E8ECF0',
          display:'flex', flexDirection:'column', overflow:'hidden',
        }}>
          {panelInner}
        </div>

        {/* MOBILE SHEET */}
        {mobileOpen&&(
          <div style={{ position:'fixed', inset:0, zIndex:300, display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
            <div style={{ position:'absolute', inset:0, background:'rgba(15,23,42,0.4)', backdropFilter:'blur(6px)' }}
              onClick={()=>setMobileOpen(false)}/>
            <div style={{ position:'relative', background:'#fff', borderRadius:'20px 20px 0 0',
              maxHeight:'92vh', display:'flex', flexDirection:'column',
              boxShadow:'0 -8px 40px rgba(0,0,0,0.14)' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'14px 18px', borderBottom:'1px solid #E8ECF0' }}>
                <span style={{ ...F, fontSize:15, fontWeight:800, color:'#0F172A' }}>Customise</span>
                <button onClick={()=>setMobileOpen(false)} style={{ background:'#F1F5F9', border:'none',
                  borderRadius:'50%', width:30, height:30, display:'flex', alignItems:'center',
                  justifyContent:'center', cursor:'pointer' }}>
                  <X size={13} color="#64748B"/>
                </button>
              </div>
              <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>{panelInner}</div>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE NAV */}
      <div className="mob-nav" style={{ display:'none', position:'fixed', bottom:0, insetInline:0,
        background:'rgba(255,255,255,0.97)', backdropFilter:'blur(20px)',
        borderTop:'1px solid #E8ECF0', zIndex:40 }}>
        {STEPS.map((s,i)=>{
          const Icon=s.Icon; const active=step===i;
          return (
            <button key={s.id} onClick={()=>{ setStep(i); setMobileOpen(true); }} style={{
              flex:1, display:'flex', flexDirection:'column', alignItems:'center',
              justifyContent:'center', gap:3, padding:'9px 0', cursor:'pointer',
              border:'none', background:'transparent', color:active?P:'#94A3B8',
            }}>
              <Icon size={18} strokeWidth={active?2.5:1.8}/>
              <span style={{ ...F, fontSize:7, fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em' }}>{s.label}</span>
            </button>
          );
        })}
      </div>

      <style jsx>{`
        @media(max-width:1023px){
          .desktop-cfg { display:none!important; }
          .mob-nav     { display:flex!important; }
          .mob-toggle  { display:flex!important; }
        }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#F1F5F9; border-radius:10px; }
        ::-webkit-scrollbar-thumb { background:rgba(232,130,12,0.4); border-radius:10px; }
        ::-webkit-scrollbar-thumb:hover { background:var(--primary,#E8820C); }
      `}</style>
    </div>
  );
}