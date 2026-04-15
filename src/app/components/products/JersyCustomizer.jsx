'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
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

const TEXT_COLORS = [
  '#FFFFFF','#000000','#E8820C','#DC2626',
  '#1D3557','#F59E0B','#FFFF00','#00FF88',
  '#7C3AED','#EC4899','#0EA5E9','#059669',
  '#FF6B35','#C0C0C0','#FFD700','#FF4500',
];

const FONT_STYLES = [
  { id: 'collegiate', label: 'COLLEGIATE', fontFamily: '"Russo One", sans-serif',        fontWeight: '400', fontStyle: 'normal' },
  { id: 'block',      label: 'BLOCK',      fontFamily: '"Bebas Neue", sans-serif',        fontWeight: '400', fontStyle: 'normal' },
  { id: 'varsity',    label: 'VARSITY',    fontFamily: '"Teko", sans-serif',              fontWeight: '700', fontStyle: 'normal' },
  { id: 'sport',      label: 'SPORT',      fontFamily: '"Oswald", sans-serif',            fontWeight: '700', fontStyle: 'normal' },
  { id: 'modern',     label: 'MODERN',     fontFamily: '"Barlow Condensed", sans-serif',  fontWeight: '800', fontStyle: 'normal' },
  { id: 'script',     label: 'Script',     fontFamily: '"Satisfy", sans-serif',           fontWeight: '400', fontStyle: 'normal' },
  { id: 'stencil',    label: 'STENCIL',    fontFamily: '"Rajdhani", sans-serif',          fontWeight: '700', fontStyle: 'normal' },
  { id: 'condensed',  label: 'CONDENSED',  fontFamily: '"Saira Condensed", sans-serif',   fontWeight: '800', fontStyle: 'normal' },
  { id: 'brush',      label: 'Brush',      fontFamily: '"Pacifico", sans-serif',          fontWeight: '400', fontStyle: 'normal' },
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

const NAME_STYLES = [
  { id: 'none',     label: 'None',     preview: null },
  { id: 'straight', label: 'Straight', preview: 'straight' },
  { id: 'curved',   label: 'Curved',   preview: 'curved' },
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

// Main navigation tabs
const MAIN_TABS = [
  { id:'style',  label:'Style',  Icon: Paintbrush },
  { id:'logos',  label:'Logos',  Icon: Shield },
  { id:'nameNumber', label:'Name & Number', Icon: Type },
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
// PRODUCT IMAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const ProductImageViewer = ({ jerseyColor, view, product, children }) => {
  const productImage = view === "front"
    ? product?.mainImage || product?.image || "/images/jerseys/jersey-front.png"
    : product?.hoverImage || product?.backImage || product?.mainImage || product?.image || "/images/jerseys/jersey-back.png";
  
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg,#EEF2F7,#E2E8F0)'
    }}>
      <img 
        src={productImage} 
        alt={`Jersey ${view} view`}
        style={{
          maxWidth: '85%',
          maxHeight: '85%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.22))'
        }}
        onError={(e) => {
          e.target.src = "/images/jerseys/jersey-front.png";
        }}
      />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: jerseyColor,
        opacity: 0.35,
        mixBlendMode: 'multiply',
        pointerEvents: 'none',
        borderRadius: '12px'
      }} />
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// JERSEY 2D SVG (kept for compatibility)
// ─────────────────────────────────────────────────────────────────────────────

const JerseySVG = (props) => {
  const {
    jerseyColor, sleeveColor, collarType,
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

  const textFilter = (eff) => eff==='shadow'||eff==='both' ? 'url(#ts)' : undefined;
  const textStroke = (eff, col, w) =>
    eff==='outline'||eff==='both'
      ? { stroke: col||'#000', strokeWidth: w||1.5, paintOrder:'stroke' }
      : {};

  const nameY   = 85 + (nameVertical/100)*160;
  const numberY = nameY + (showName && nameText && nameStyleId!=='none' ? nameSize + 14 : 0) + numberSize*0.85;

  const bx = clubLogoPos==='center' ? 150 - clubLogoSize/2
            : clubLogoPos==='right'  ? 196
            : 80;

  return (
    <svg viewBox="0 0 300 380" style={{ width:'100%', height:'100%', filter:'drop-shadow(0 10px 30px rgba(0,0,0,0.22))' }}>
      <defs>
        <filter id="lf" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(255,255,255,0.6)"/>
        </filter>
        <filter id="ts" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="2.5" floodColor="rgba(0,0,0,0.75)"/>
        </filter>
      </defs>

      <ellipse cx="150" cy="374" rx="80" ry="6" fill="rgba(0,0,0,0.13)"/>

      <path d="M65,40 L8,80 L18,155 L56,140 L56,100 Z" fill={slv} stroke={seam} strokeWidth="1"/>
      <path d="M65,40 L28,68 L22,115 L38,108 Z" fill="rgba(255,255,255,0.12)"/>

      <path d="M235,40 L292,80 L282,155 L244,140 L244,100 Z" fill={slv} stroke={seam} strokeWidth="1"/>
      <path d="M235,40 L272,68 L278,115 L262,108 Z" fill="rgba(255,255,255,0.12)"/>

      <path d="M65,40 L56,100 L56,342 L244,342 L244,100 L235,40 L200,20 Q175,48 150,48 Q125,48 100,20 Z"
        fill={jerseyColor} stroke={seam} strokeWidth="1.2"/>

      <path d="M108,22 Q130,48 150,48 Q170,48 192,22 L186,18 Q165,44 150,44 Q135,44 114,18 Z" fill="rgba(255,255,255,0.18)"/>
      <path d="M57,100 L62,342 L67,342 L63,100 Z" fill="rgba(255,255,255,0.07)"/>

      {collarType==='polo' && <rect x="122" y="44" width="56" height="16" rx="3" fill={slv} stroke={seam} strokeWidth="1.5"/>}
      {collarType==='hood' && <path d="M118,40 Q150,10 182,40" fill="none" stroke={seam} strokeWidth="4" strokeLinecap="round"/>}
      {collarType==='v-neck' && <path d="M128,48 L150,76 L172,48" fill="none" stroke={seam} strokeWidth="3.5" strokeLinecap="round"/>}
      {collarType==='round' && <path d="M122,47 Q150,58 178,47" fill="none" stroke={seam} strokeWidth="3.5" strokeLinecap="round"/>}

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
        {showNumber && numberText && (numberPosition==='front'||numberPosition==='both') && (
          <text x="150" y="260" textAnchor="middle"
            fontFamily={nfs.fontFamily} fontSize={42} fontWeight={nfs.fontWeight}
            fill={numberColor}
            filter={textFilter(numberEffect)}
            {...textStroke(numberEffect,numberEffectColor,2)}
          >{numberText}</text>
        )}
      </>}

      {view==='back' && <>
        {sponsorBackLogo && (
          <image href={sponsorBackLogo} x="90" y="78" width="120" height="40" preserveAspectRatio="xMidYMid meet" filter="url(#lf)"/>
        )}

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

        {showNumber && numberText && numberPosition!=='front' && (
          <text x="150" y={numberY} textAnchor="middle"
            fontFamily={nfs.fontFamily} fontSize={numberSize} fontWeight={nfs.fontWeight}
            fill={numberColor}
            filter={textFilter(numberEffect)}
            {...textStroke(numberEffect,numberEffectColor,2)}
          >{numberText}</text>
        )}

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
  const [activeTab, setActiveTab] = useState('style');
  const [view, setView]         = useState('front');
  const [viewMode, setViewMode] = useState('product');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Style
  const [fabric, setFabric] = useState('climatech');
  const [collarType, setCollarType] = useState('round');

  // Colors
  const [jerseyColor, setJerseyColor] = useState('#FFFFFF');
  const [sleeveColor, setSleeveColor] = useState('#111111');
  const [collarColor, setCollarColor] = useState('#111111');

  // Logos
  const [clubLogo, setClubLogo] = useState(null);
  const [clubLogoPos, setClubLogoPos] = useState('left');
  const [clubLogoSize, setClubLogoSize] = useState(52);
  const [sponsorLogo, setSponsorLogo] = useState(null);
  const [sponsorLogoSize, setSponsorLogoSize] = useState(110);
  const [sponsorBackLogo, setSponsorBackLogo] = useState(null);

  // Name
  const [showName, setShowName] = useState(true);
  const [nameText, setNameText] = useState('PLAYER');
  const [nameStyleId, setNameStyleId] = useState('straight');
  const [nameFont, setNameFont] = useState('collegiate');
  const [nameColor, setNameColor] = useState('#FFFFFF');
  const [nameSize, setNameSize] = useState(22);
  const [nameVertical, setNameVertical] = useState(20);
  const [nameEffect, setNameEffect] = useState('none');
  const [nameEffectColor, setNameEffectColor] = useState('#000000');
  const [nameOutlineWidth, setNameOutlineWidth] = useState(1.5);

  // Number
  const [showNumber, setShowNumber] = useState(true);
  const [numberText, setNumberText] = useState('10');
  const [numberFont, setNumberFont] = useState('block');
  const [numberColor, setNumberColor] = useState('#F59E0B');
  const [numberSize, setNumberSize] = useState(72);
  const [numberPosition, setNumberPosition] = useState('back');
  const [numberEffect, setNumberEffect] = useState('none');
  const [numberEffectColor, setNumberEffectColor] = useState('#000000');

  // Team
  const [showTeam, setShowTeam] = useState(false);
  const [teamName, setTeamName] = useState('YOUR TEAM');
  const [teamColor, setTeamColor] = useState('#FFFFFF');
  const [teamFont, setTeamFont] = useState('sport');

  // Order
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [sport, setSport] = useState('cricket');

  const viewerRef = useRef(null);

  // Accordion state
  const [sec, setSec] = useState({
    fabric: true,
    collar: false,
    base: true,
    sleeveCol: false,
    collarCol: false,
    club: true,
    sponsor: false,
    sponsorBack: false,
    name: true,
    number: false,
    team: false,
  });
  const tog = (k) => setSec(p => ({ ...p, [k]: !p[k] }));

  // Chip style constant - moved here to be available before JSX
  const chip = { 
    background: 'rgba(255,255,255,0.95)', 
    backdropFilter: 'blur(14px)', 
    border: '1px solid rgba(255,255,255,0.7)', 
    boxShadow: '0 4px 14px rgba(0,0,0,0.10)', 
    borderRadius: 10, 
    padding: '8px 12px' 
  };

  useEffect(() => { setMounted(true); }, []);


  const handleFullscreen = () => {
  const el = viewerRef.current;

  if (!el) return;

  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    el.requestFullscreen();
  }
};

  const handleUpload = useCallback((setter) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Please upload an image file'); return; }
    if (file.size > 8 * 1024 * 1024) { alert('Max file size is 8 MB'); return; }
    const reader = new FileReader();
    reader.onloadend = () => setter(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const reset = () => {
    setJerseyColor('#FFFFFF');
    setSleeveColor('#111111');
    setCollarColor('#111111');
    setCollarType('round');
    setFabric('climatech');
    setClubLogo(null);
    setSponsorLogo(null);
    setSponsorBackLogo(null);
    setClubLogoPos('left');
    setClubLogoSize(52);
    setSponsorLogoSize(110);
    setNameText('PLAYER');
    setNameFont('collegiate');
    setNameColor('#FFFFFF');
    setNameSize(22);
    setNameVertical(20);
    setNameEffect('none');
    setNameStyleId('straight');
    setNumberText('10');
    setNumberFont('block');
    setNumberColor('#F59E0B');
    setNumberSize(72);
    setNumberPosition('back');
    setNumberEffect('none');
    setShowTeam(false);
    setShowName(true);
    setShowNumber(true);
    setTeamName('YOUR TEAM');
    setTeamColor('#FFFFFF');
    setSelectedSize('L');
    setQuantity(10);
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

const FontGrid = ({ selectedId, onSelect, styleMode = 'straight' }) => (
  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
    {FONT_STYLES.map((f) => {
      const sel = selectedId === f.id;
      const pathId = `arch-${f.id}`;
      const isCurved = styleMode === 'curved';

      return (
        <button key={f.id} onClick={() => onSelect(f.id)} style={{
          height:72, borderRadius:12, cursor:'pointer',
          border:`2px solid ${sel ? '#003E9B' : '#E2E8F0'}`,
          background: sel ? 'rgba(0,62,155,0.09)' : '#F8FAFC',
          display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center',
          gap:2, padding:'6px 4px', overflow:'hidden',
        }}>
          <svg width="90" height="44" viewBox="0 0 90 44" style={{ overflow:'visible' }}>
            {isCurved ? (
              <>
                <defs>
                  <path id={pathId} d="M 8,36 Q 45,10 82,36"/>
                </defs>
                <text
                  fontFamily={f.fontFamily}
                  fontWeight={f.fontWeight}
                  fontStyle={f.fontStyle}
                  fontSize="18"
                  fill={sel ? '#003E9B' : '#1E293B'}
                  letterSpacing="1"
                >
                  <textPath xlinkHref={`#${pathId}`} startOffset="50%" textAnchor="middle">
                    PLAYER
                  </textPath>
                </text>
              </>
            ) : (
              <text
                x="45" y="30"
                textAnchor="middle"
                fontFamily={f.fontFamily}
                fontWeight={f.fontWeight}
                fontStyle={f.fontStyle}
                fontSize="18"
                fill={sel ? '#003E9B' : '#1E293B'}
                letterSpacing="1"
              >
                PLAYER
              </text>
            )}
          </svg>
          <span style={{
            fontSize:8, fontWeight:700,
            color: sel ? '#003E9B' : '#94A3B8',
            textTransform:'uppercase', letterSpacing:'0.5px',
            marginTop:2,
          }}>{f.label}</span>
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
                fontSize:11, fontWeight:700, color:'#000000',
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
                  fontSize:10, fontWeight:700, color:sel?'#003E9B':'#000000',
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
        // TAB CONTENT
        // ─────────────────────────────────────────────────────────────────────────

        const renderTabContent = () => {
          if (activeTab === 'style') return (
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

              <Section k="base" title="Base Colour" badge={JERSEY_COLORS.find(c=>c.code===jerseyColor)?.name}>
                <ColorGrid colors={JERSEY_COLORS} selected={jerseyColor} onSelect={setJerseyColor} cols={8}/>
                <input type="color" value={jerseyColor} onChange={e=>setJerseyColor(e.target.value)} style={{ width:'100%', height:36, borderRadius:8, border:'1px solid #E2E8F0', cursor:'pointer', padding:2, marginTop:8 }}/>
              </Section>

              <Section k="sleeveCol" title="Sleeve Colour" badge={JERSEY_COLORS.find(c=>c.code===sleeveColor)?.name}>
                <ColorGrid colors={SLEEVE_COLORS} selected={sleeveColor} onSelect={setSleeveColor} cols={8}/>
                <input type="color" value={sleeveColor} onChange={e=>setSleeveColor(e.target.value)} style={{ width:'100%', height:36, borderRadius:8, border:'1px solid #E2E8F0', cursor:'pointer', padding:2, marginTop:8 }}/>
                <button onClick={() => setSleeveColor(jerseyColor)} style={{ fontSize:10, fontWeight:700, color:'#003E9B', background:'rgba(0,62,155,0.08)', border:'1px solid rgba(0,62,155,0.25)', borderRadius:8, padding:'9px', cursor:'pointer', width:'100%', marginTop:8 }}>↔ Match Base Colour</button>
              </Section>

              <Section k="collarCol" title="Collar Colour" badge={JERSEY_COLORS.find(c=>c.code===collarColor)?.name}>
                <ColorGrid colors={JERSEY_COLORS} selected={collarColor} onSelect={setCollarColor} cols={8}/>
                <input type="color" value={collarColor} onChange={e=>setCollarColor(e.target.value)} style={{ width:'100%', height:36, borderRadius:8, border:'1px solid #E2E8F0', cursor:'pointer', padding:2, marginTop:8 }}/>
              </Section>
            </div>
          );

          if (activeTab === 'logos') return (
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
                  • Switch to <b>Back View</b> to preview back logos
                </div>
              </div>
            </div>
          );

          if (activeTab === 'nameNumber') return (
            <div>
              <Section k="name" title="Player Name">
                <Toggle value={showName} onChange={setShowName} label="Show Player Name"/>
                {showName && <>
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:6 }}>Name Text</div>
                    <input value={nameText} onChange={e=>setNameText(e.target.value.toUpperCase())} maxLength={22} placeholder="PLAYER NAME" style={{ width:'100%', padding:'11px 13px', border:'1.5px solid #E2E8F0', borderRadius:9, fontSize:13, fontWeight:700, color:'#000000', boxSizing:'border-box', outline:'none' }}/>
                  </div>

                    <div>
        <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Name Style</div>
        <div style={{ display:'flex', gap:8 }}>
          {[
            { id:'none',     label:'None' },
            { id:'straight', label:'Straight' },
            { id:'curved',   label:'Curved' },
          ].map(ns => {
            const sel = nameStyleId === ns.id;
            const col = sel ? '#003E9B' : '#1E293B';
            return (
              <button key={ns.id} onClick={() => setNameStyleId(ns.id)} style={{
                flex:1, height:76, borderRadius:10, cursor:'pointer',
                border:`2px solid ${sel ? '#003E9B' : '#E2E8F0'}`,
                background: sel ? 'rgba(0,62,155,0.09)' : '#F8FAFC',
                display:'flex', flexDirection:'column', alignItems:'center',
                justifyContent:'center', gap:6, padding:'8px 4px',
              }}>
                {ns.id === 'none' && (
                  <svg width="38" height="26" viewBox="0 0 38 26">
                    <circle cx="19" cy="13" r="11" fill="none" stroke="#DC2626" strokeWidth="2.2"/>
                    <line x1="10" y1="4" x2="28" y2="22" stroke="#DC2626" strokeWidth="2.2"/>
                  </svg>
                )}
                {ns.id === 'straight' && (
                  <svg width="60" height="26" viewBox="0 0 60 26">
                    <text x="30" y="20" textAnchor="middle"
                      fontFamily="'Arial Black', sans-serif" fontSize="16"
                      fontWeight="900" fill={col} letterSpacing="1">NAME</text>
                  </svg>
                )}
                {ns.id === 'curved' && (
                  <svg width="60" height="32" viewBox="0 0 60 32">
                    <defs>
                      <path id="curvedNamePath" d="M 4,28 Q 30,6 56,28"/>
                    </defs>
                    <text fontFamily="'Arial Black', sans-serif" fontSize="13"
                      fontWeight="900" fill={col}>
                      <textPath xlinkHref="#curvedNamePath" startOffset="50%" textAnchor="middle">NAME</textPath>
                    </text>
                  </svg>
                )}
                <span style={{ fontSize:9, fontWeight:700, color: sel ? '#003E9B' : '#64748B' }}>
                  {ns.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

           {nameStyleId !== 'none' && (
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Font Style</div>
              <FontGrid selectedId={nameFont} onSelect={setNameFont} styleMode={nameStyleId} />
            </div>
          )}

            <ColorPicker label="Name Color" value={nameColor} onChange={setNameColor}/>

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

        <Section k="number" title="Player Number">
          <Toggle value={showNumber} onChange={setShowNumber} label="Show Player Number"/>
          {showNumber && <>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:6 }}>Number</div>
              <input value={numberText} onChange={e=>setNumberText(e.target.value)} maxLength={3} placeholder="10" style={{ width:'100%', padding:'11px 13px', border:'1.5px solid #E2E8F0', borderRadius:9, fontSize:13, fontWeight:700, color:'#000000', boxSizing:'border-box' }}/>
            </div>

            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Number Style</div>
              <Pills items={['None', 'Block', 'Outline', 'Shadow']} selected={numberEffect === 'none' ? 'None' : numberEffect === 'outline' ? 'Outline' : numberEffect === 'shadow' ? 'Shadow' : 'Block'} onSelect={(val) => {
                if (val === 'None') setNumberEffect('none');
                else if (val === 'Outline') setNumberEffect('outline');
                else if (val === 'Shadow') setNumberEffect('shadow');
                else setNumberEffect('outline');
              }}/>
            </div>

            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Number Position</div>
              <Pills items={NUMBER_POSITIONS} selected={numberPosition} onSelect={setNumberPosition}/>
            </div>

            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Font Style</div>
              <FontGrid selectedId={numberFont} onSelect={setNumberFont} styleMode="straight" />
            </div>

            <ColorPicker label="Number Color" value={numberColor} onChange={setNumberColor}/>

            <Slider label="Number Size" value={numberSize} onChange={setNumberSize} min={36} max={110} unit="pt"/>
          </>}
        </Section>

        <Section k="team" title="Team Name (Back Footer)">
          <Toggle value={showTeam} onChange={setShowTeam} label="Show Team Name"/>
          {showTeam && <>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:6 }}>Team Name</div>
              <input value={teamName} onChange={e=>setTeamName(e.target.value.toUpperCase())} maxLength={22} placeholder="YOUR TEAM" style={{ width:'100%', padding:'11px 13px', border:'1.5px solid #E2E8F0', borderRadius:9, fontSize:12, fontWeight:700, color:'#000000', boxSizing:'border-box' }}/>
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Font Style</div>
              <FontGrid selectedId={teamFont} onSelect={setTeamFont} styleMode="straight" />
            </div>
            <ColorPicker label="Team Name Color" value={teamColor} onChange={setTeamColor}/>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#64748B', marginBottom:7 }}>Team Name Position</div>
              <Pills items={['Vertical', 'Horizontal']} selected="Vertical" onSelect={() => {}}/>
            </div>
          </>}
        </Section>

        <div style={{ padding:'10px 14px', background:'#F0FDF4', borderRadius:10, border:'1px solid #BBF7D0' }}>
          <div style={{ fontSize:10, color:'#166534' }}>
            💡 Switch to <b>Back View</b> to preview name, number & team text on jersey.
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <div style={{ padding:'12px 14px', background:'#F0FDF4', borderRadius:10, border:'1px solid #BBF7D0', marginBottom:14 }}>
          <div style={{ fontSize:11, color:'#166534', fontWeight:600 }}>Design ready! Complete the details below.</div>
        </div>

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

        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, fontWeight:700, marginBottom:9, color:'#000000' }}>Quantity</div>
          <div style={{ display:'flex', alignItems:'center', gap:14, background:'#F8FAFC', padding:'8px 16px', borderRadius:10, justifyContent:'center' }}>
            <button onClick={() => setQuantity(Math.max(10,quantity-1))} style={{ width:38, height:38, borderRadius:8, background:'#fff', border:'1px solid #E2E8F0', cursor:'pointer', fontSize:20, color:'#003E9B' }}>−</button>
            <span style={{ fontSize:22, fontWeight:900, minWidth:64, textAlign:'center', color:'#003E9B' }}>{quantity}</span>
            <button onClick={() => setQuantity(quantity+1)} style={{ width:38, height:38, borderRadius:8, background:'#fff', border:'1px solid #E2E8F0', cursor:'pointer', fontSize:20, color:'#003E9B' }}>+</button>
          </div>
        </div>

        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, fontWeight:700, marginBottom:9, color:'#000000' }}>Player List</div>
          <div style={{ background:'#F8FAFC', borderRadius:10, padding:12, border:'1px solid #E2E8F0' }}>
            <div style={{ fontSize:10, color:'#64748B', marginBottom:10 }}>Download our template, fill in player names, numbers and sizes, and upload your player list below.</div>
            <button style={{ width:'100%', padding:'10px', borderRadius:8, border:'1px solid #003E9B', background:'#fff', color:'#003E9B', fontSize:11, fontWeight:700, cursor:'pointer', marginBottom:10 }}>
              📥 DOWNLOAD TEMPLATE
            </button>
            <UploadSlot label="Upload Spreadsheet" hint="" state={null} setter={()=>{}} uid="up-spreadsheet"/>
          </div>
        </div>

        <div style={{ border:'1px solid rgba(0,62,155,0.2)', borderRadius:12, background:'rgba(0,62,155,0.03)', padding:16, marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
            <Star size={15} color="#003E9B" fill="#003E9B"/>
            <span style={{ fontSize:13, fontWeight:800, color:'#003E9B' }}>Order Summary</span>
          </div>
          {[
            ['Sport', sport.charAt(0).toUpperCase()+sport.slice(1)],
            ['Fabric', FABRIC_TYPES.find(f=>f.id===fabric)?.label],
            ['Collar', COLLAR_TYPES.find(c=>c.id===collarType)?.label],
            ['Base Color', JERSEY_COLORS.find(c=>c.code===jerseyColor)?.name],
            ['Player Name', showName?(nameText||'—'):'Hidden'],
            ['Player Number', showNumber?`#${numberText}`:'Hidden'],
            ['Team Name', showTeam?teamName:'Hidden'],
            ['Club Badge', clubLogo?'Uploaded':'—'],
            ['Sponsor Front', sponsorLogo?'Uploaded':'—'],
            ['Size', selectedSize],
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
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // PANEL INNER
  // ─────────────────────────────────────────────────────────────────────────

  const panelInner = (
    <>
      <div style={{ display:'flex', borderBottom:'1px solid #E8ECF0', background:'#fff' }}>
        {MAIN_TABS.map((tab) => {
          const active = activeTab === tab.id;
          const Icon = tab.Icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '12px 4px 10px',
                border: 'none',
                cursor: 'pointer',
                borderBottom: `2.5px solid ${active ? '#003E9B' : 'transparent'}`,
                background: active ? 'rgba(0,62,155,0.05)' : 'transparent',
                color: active ? '#003E9B' : '#94A3B8',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />
              <span style={{ fontSize: 9, fontWeight: 700 }}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ padding: '12px 16px', borderBottom: '1px solid #E8ECF0' }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#0F172A' }}>
          {product?.name || 'Kit Designer'}
        </div>
        <div style={{ fontSize: 9, color: '#94A3B8', marginTop: 2 }}>
          {activeTab === 'style' && 'Style & Colors'}
          {activeTab === 'logos' && 'Logos & Badges'}
          {activeTab === 'nameNumber' && 'Name & Number'}
          {activeTab === 'order' && 'Order Details'}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px', background: '#FAFAFA' }}>
        {renderTabContent()}
      </div>

      <div style={{ padding: '12px 14px', borderTop: '1px solid #E8ECF0', background: '#fff' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={reset}
            style={{
              flex: 1,
              padding: '4px',
              borderRadius: 10,
              border: '1px solid #E2E8F0',
              background: '#fff',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 700,
              color: '#64748B',
            }}
          >
            Reset
          </button>
          <button
            style={{
              flex: 2,
              padding: '12px',
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: 'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)',
              color: '#fff',
            }}
          >
            <Save size={16} /> Save Design
          </button>
        </div>
      </div>
    </>
  );

  if (!mounted) return (
    <div style={{ height:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:40, height:40, border:'3px solid #003E9B', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 1s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{ height:'100vh', overflow:'hidden', background:'#fff', display:'flex', flexDirection:'column', fontFamily:"'Poppins','Segoe UI',sans-serif", margin:"10px 0px" }}>

      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>

        <div style={{ flex:1, position:'relative', background:'linear-gradient(135deg,#EEF2F7,#E2E8F0)', overflow:'hidden' }}>

          <div style={{ position:'absolute', top:14, left:'50%', transform:'translateX(-50%)', zIndex:20, display:'flex', gap:8 }}>
            <button onClick={() => setViewMode('product')} style={{
              padding:'7px 16px', borderRadius:99, fontSize:10, fontWeight:700, cursor:'pointer', border:'none',
              background: viewMode==='product' ? 'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)' : 'rgba(255,255,255,0.95)',
              color: viewMode==='product' ? '#fff' : '#003E9B',
              boxShadow: viewMode==='product' ? '0 2px 10px rgba(0,62,155,0.3)' : '0 1px 4px rgba(0,0,0,0.1)',
            }}>Product View</button>
            <button onClick={() => setViewMode('glb')} style={{
              padding:'7px 16px', borderRadius:99, fontSize:10, fontWeight:700, cursor:'pointer', border:'none',
              background: viewMode==='glb' ? 'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)' : 'rgba(255,255,255,0.95)',
              color: viewMode==='glb' ? '#fff' : '#003E9B',
              boxShadow: viewMode==='glb' ? '0 2px 10px rgba(0,62,155,0.3)' : '0 1px 4px rgba(0,0,0,0.1)',
            }}>3D View</button>
          </div>

         {viewMode === "glb" && (
  <button  
    onClick={handleFullscreen} 
    style={{
      position:'absolute',
      top:14,
      right:14,
      zIndex:20,
      background:'rgba(255,255,255,0.92)',
      backdropFilter:'blur(8px)',
      padding:8,
      borderRadius:40,
      border:'none',
      cursor:'pointer',
      boxShadow:'0 2px 8px rgba(0,0,0,0.12)'
    }}
  >
    <Maximize2 size={15}/>
  </button>
)}

          {viewMode === 'product' && (
            <ProductImageViewer jerseyColor={jerseyColor} view={view} product={product}>
              <div style={{ position:'absolute', bottom:20, left:'50%', transform:'translateX(-50%)', zIndex:20 }}>
                <div style={{ ...chip, borderRadius:99, padding:4, display:'inline-flex', gap:4 }}>
                  {['front','back'].map(v => (
                    <button key={v} onClick={() => setView(v)} style={{
                      padding:'8px 26px', borderRadius:99, fontSize:10, fontWeight:700, cursor:'pointer',
                      background: view===v ? 'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)' : 'transparent',
                      border: view===v ? 'none' : '1px solid #003E9B',
                      color: view===v ? '#fff' : '#003E9B',
                    }}>{v.toUpperCase()}</button>
                  ))}
                </div>
              </div>
            </ProductImageViewer>
          )}

          {viewMode === 'glb' && (
            <div ref={viewerRef} style={{ width: "100%", height: "100%" }}>
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
              />
            
            </div>
          )}

          {/* <div style={{ position:'absolute', bottom:20, left:16, zIndex:20 }}>
            <div style={chip}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:14, height:14, borderRadius:'50%', background:jerseyColor, border:'1px solid rgba(0,0,0,0.1)' }}/>
                <div>
                  <div style={{ fontSize:8, color:'#94A3B8' }}>Base</div>
                  <div style={{ fontSize:11, fontWeight:700 ,color:"#000000"}}>{JERSEY_COLORS.find(c=>c.code===jerseyColor)?.name||jerseyColor}</div>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div style={{ position:'absolute', bottom:20, right:16, zIndex:20 }}>
            <div style={chip}>
              <div style={{ fontSize:8, color:'#94A3B8' }}>Size</div>
              <div style={{ fontSize:14, fontWeight:900, color:'#003E9B' }}>{selectedSize}</div>
            </div>
          </div> */}
        </div>

        <div className="desktop-cfg" style={{ width:385, background:'#fff', borderLeft:'1px solid #E8ECF0', display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {panelInner}
        </div>
      </div>

      <div className="mob-nav" style={{ display:'none', position:'fixed', bottom:0, left:0, right:0, background:'rgba(255,255,255,0.98)', backdropFilter:'blur(10px)', borderTop:'1px solid #E8ECF0', zIndex:40 }}>
        {MAIN_TABS.map((tab) => {
          const Icon = tab.Icon;
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileOpen(true); }} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2, padding:'10px 0', cursor:'pointer', border:'none', background:'transparent', color:active?'#003E9B':'#94A3B8' }}>
              <Icon size={18} strokeWidth={active?2.5:1.8}/>
              <span style={{ fontSize:8, fontWeight:700 }}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {mobileOpen && (
        <div style={{ position:'fixed', inset:0, zIndex:300 }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(15,23,42,0.5)', backdropFilter:'blur(4px)' }} onClick={() => setMobileOpen(false)}/>
          <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'#fff', borderRadius:'24px 24px 0 0', maxHeight:'82vh', display:'flex', flexDirection:'column' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px', borderBottom:'1px solid #E8ECF0' }}>
              <span style={{ fontSize:16, fontWeight:800,color:"#000000" }}>Customize</span>
              <button onClick={() => setMobileOpen(false)} style={{ background:'#F1F5F9', border:'none', borderRadius:'50%', width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:"#000000" }}>
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