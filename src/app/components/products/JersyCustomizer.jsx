'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Upload, ChevronDown, Save, Check, Trash2,
  Type, Shield, Paintbrush, ShoppingBag,
  X, Star, Maximize2, Minimize2,
} from 'lucide-react';
import GLBViewer from '../common/GLBViewer';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCart } from '@/features/cart/cartThunks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSearchParams } from "next/navigation";
import axiosClient from "@/lib/axios";
import { saveCustomizationAPI } from "@/services/customizationService";
import Canvas2DOverlay from '../common/Canvas2doverlay ';

const JERSEY_COLORS = [
  { name: 'Obsidian', code: '#111111' }, { name: 'Crimson', code: '#DC2626' },
  { name: 'Deep Navy', code: '#1D3557' }, { name: 'Royal Blue', code: '#1E40AF' },
  { name: 'Emerald', code: '#059669' }, { name: 'Gold', code: '#D97706' },
  { name: 'Pure White', code: '#FFFFFF' }, { name: 'Black', code: '#000000' },
  { name: 'Purple', code: '#7C3AED' }, { name: 'Orange', code: '#EA580C' },
  { name: 'Teal', code: '#0D9488' }, { name: 'Sky Blue', code: '#0EA5E9' },
];

const SLEEVE_COLORS = [
  { name: 'Obsidian', code: '#111111' }, { name: 'Crimson', code: '#DC2626' },
  { name: 'Deep Navy', code: '#1D3557' }, { name: 'Pure White', code: '#FFFFFF' },
  { name: 'Royal Blue', code: '#1E40AF' }, { name: 'Gold', code: '#D97706' },
  { name: 'Emerald', code: '#059669' }, { name: 'Black', code: '#000000' },
];

const TEXT_COLORS = [
  '#FFFFFF', '#000000', '#EA580C', '#DC2626', '#1D3557', '#F59E0B', '#FFFF00', '#00FF88',
  '#7C3AED', '#EC4899', '#0EA5E9', '#059669', '#7C3AED', '#EC4899', '#0EA5E9', '#D97706',
  '#EA580C', '#94A3B8',
];

const FONT_STYLES = [
  { id: 'collegiate', label: 'COLLEGIATE', fontFamily: '"Russo One", sans-serif', canvasFont: 'Russo One', fontWeight: '400' },
  { id: 'block', label: 'BLOCK', fontFamily: '"Bebas Neue", sans-serif', canvasFont: 'Bebas Neue', fontWeight: '400' },
  { id: 'varsity', label: 'VARSITY', fontFamily: '"Teko", sans-serif', canvasFont: 'Teko', fontWeight: '700' },
  { id: 'sport', label: 'SPORT', fontFamily: '"Oswald", sans-serif', canvasFont: 'Oswald', fontWeight: '700' },
  { id: 'modern', label: 'MODERN', fontFamily: '"Barlow Condensed", sans-serif', canvasFont: 'Barlow Condensed', fontWeight: '800' },
  { id: 'script', label: 'SCRIPT', fontFamily: '"Dancing Script", cursive', canvasFont: 'Dancing Script', fontWeight: '700' },
  { id: 'stencil', label: 'STENCIL', fontFamily: '"Archivo Black", sans-serif', canvasFont: 'Archivo Black', fontWeight: '900' },
  { id: 'condensed', label: 'CONDENSED', fontFamily: '"Fjalla One", sans-serif', canvasFont: 'Fjalla One', fontWeight: '400' },
  { id: 'brush', label: 'BRUSH', fontFamily: '"Permanent Marker", cursive', canvasFont: 'Permanent Marker', fontWeight: '400' },
];

const NAME_STYLES = [
  { id: 'none', label: 'None' },
  { id: 'straight', label: 'Straight' },
  { id: 'curved', label: 'Curved' },
];

const FABRIC_TYPES = [
  { id: 'climatech', label: 'ClimateTech Pro', desc: 'UV protection & elite moisture management' },
  { id: 'coolweave', label: 'CoolWeave Lite', desc: 'Lightweight breathable performance fabric' },
  { id: 'dryfit', label: 'DriFit Ultra', desc: 'Maximum sweat-wicking & comfort' },
  { id: 'interlock', label: 'Interlock Knit', desc: 'Durable two-layer knit for heavy use' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

const MAIN_TABS_FULL = [
  { id: 'style', label: 'Style', Icon: Paintbrush },
  { id: 'logos', label: 'Logos', Icon: Shield },
  { id: 'nameNumber', label: 'Name & Number', Icon: Type },
  { id: 'order', label: 'Order', Icon: ShoppingBag },
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

// ── UI ATOMS ──────────────────────────────────────────────────────────────
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

const ColorGrid = ({ colors, selected, onSelect, pickerId, isMobile }) => (
  <div>
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${isMobile ? 6 : 8},1fr)`, gap: 7, marginBottom: 10 }}>
      {colors.map(c => {
        const code = typeof c === 'string' ? c : c.code, name = typeof c === 'string' ? c : c.name, sel = selected === code;
        return (
          <button key={code} title={name} onClick={() => onSelect(code)} style={{ width: '100%', aspectRatio: '1', borderRadius: 8, cursor: 'pointer', border: `2.5px solid ${sel ? '#003E9B' : '#E2E8F0'}`, backgroundColor: code, position: 'relative', transform: sel ? 'scale(1.12)' : 'scale(1)', transition: 'all 0.15s', boxShadow: sel ? '0 0 0 3px rgba(0,62,155,0.22)' : 'none' }}>
            {sel && <Check size={9} strokeWidth={3.5} color={isLight(code) ? '#000' : '#fff'} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />}
          </button>
        );
      })}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
          <button key={i} onClick={() => onSelect(c)} style={{ width: '100%', aspectRatio: '1', borderRadius: 7, cursor: 'pointer', border: `2px solid ${sel ? '#003E9B' : '#E2E8F0'}`, backgroundColor: c, position: 'relative', transform: sel ? 'scale(1.12)' : 'scale(1)', transition: 'all 0.15s' }}>
            {sel && <Check size={8} strokeWidth={3.5} color={isLight(c) ? '#000' : '#fff'} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />}
          </button>
        );
      })}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: 30, height: 30, borderRadius: 7, border: '2px solid #E2E8F0', overflow: 'hidden', background: selected }}>
        <input type="color" id={pickerId} value={selected} onChange={e => onSelect(e.target.value)} style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer', border: 'none' }} />
      </div>
      <label htmlFor={pickerId} style={{ fontSize: 10, color: '#94A3B8', cursor: 'pointer' }}>Custom picker</label>
    </div>
  </div>
);

const UploadSlot = ({ label, hint, state, setter, fileRef, uid, onRemove, onUpload }) => (
  <div>
    <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 6 }}>{label}</div>
    {state ? (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
        <img src={state} alt={label} style={{ maxHeight: 56, maxWidth: 110, objectFit: 'contain' }} />
        <button onClick={() => onRemove(setter, fileRef, state)} style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', borderRadius: 7, padding: '5px 10px', cursor: 'pointer', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Trash2 size={12} /> Remove
        </button>
      </div>
    ) : (
      <button onClick={() => document.getElementById(uid)?.click()} style={{ width: '100%', padding: '16px', border: '2px dashed #CBD5E1', borderRadius: 10, cursor: 'pointer', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 11, fontWeight: 700, color: '#475569' }}>
        <Upload size={15} /> Upload Image
      </button>
    )}
    {hint && <p style={{ fontSize: 9, color: '#64748B', marginTop: 5 }}>{hint}</p>}
    <input id={uid} type="file" accept="image/*" style={{ display: 'none' }} onChange={onUpload(setter, fileRef)} />
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

const NameStyleSelect = ({ selected, onSelect, sampleText, sampleFontId }) => {
  const fo = getFontObj(sampleFontId), displayText = (sampleText || 'NAME').slice(0, 8);
  const curvedFontSize = Math.max(9, Math.min(13, 60 / Math.max(1, displayText.length)));
  const straightFontSize = Math.max(9, Math.min(15, 65 / Math.max(1, displayText.length)));
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
      {NAME_STYLES.map(ns => {
        const isSel = selected === ns.id, col = isSel ? '#003E9B' : '#334155';
        return (
          <button key={ns.id} onClick={() => onSelect(ns.id)} style={{ padding: '10px 6px 8px', borderRadius: 10, cursor: 'pointer', border: `2px solid ${isSel ? '#003E9B' : '#E2E8F0'}`, background: isSel ? 'rgba(0,62,155,0.07)' : '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minHeight: 80 }}>
            <svg viewBox="0 0 84 38" width="84" height="38" style={{ overflow: 'visible' }}>
              {ns.id === 'none' && (<><circle cx="42" cy="19" r="14" fill="none" stroke={isSel ? '#003E9B' : '#CBD5E1'} strokeWidth="2" /><line x1="30" y1="29" x2="54" y2="9" stroke={isSel ? '#003E9B' : '#CBD5E1'} strokeWidth="2.5" strokeLinecap="round" /></>)}
              {ns.id === 'straight' && (<text x="42" y="24" textAnchor="middle" fontFamily={`${fo.canvasFont}, sans-serif`} fontWeight={fo.fontWeight} fontSize={straightFontSize} fill={col}>{displayText}</text>)}
              {ns.id === 'curved' && (<><path id={`arc-prev-${ns.id}`} d="M 6,32 Q 42,4 78,32" fill="none" /><text fontFamily={`${fo.canvasFont}, sans-serif`} fontWeight={fo.fontWeight} fontSize={curvedFontSize} fill={col}><textPath href={`#arc-prev-${ns.id}`} startOffset="50%" textAnchor="middle">{displayText}</textPath></text></>)}
            </svg>
            <span style={{ fontSize: 9, fontWeight: 700, color: isSel ? '#003E9B' : '#64748B' }}>{ns.label}</span>
          </button>
        );
      })}
    </div>
  );
};

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

export default function JerseyCustomizer({ product }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(s => s.auth);

  const cartState = useSelector((state) => state.cart);

  useEffect(() => {
    console.log("Redux Cart State:", cartState);
  }, [cartState]);

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('style');
  const [view, setView] = useState('front');
  const [viewMode, setViewMode] = useState('product');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [roster, setRoster] = useState([{ id: '1', size: 'M', sleeve: 'Half', name: '', number: '' }]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const getProductType = () => {
    const n = product?.name?.toLowerCase() || '';
    const c = product?.category?.slug?.toLowerCase() || '';
    const cn = product?.categoryName?.toLowerCase() || '';
    if (n.includes('short') || c.includes('short') || cn.includes('short')) return 'shorts';
    if (n.includes('pant') || n.includes('lower') || c.includes('pant') || c.includes('lower')) return 'pants';
    return 'jersey';
  };
  const productType = product ? getProductType() : 'jersey';

  // ── Customization capability detection ─────────────────────────────────────
  const hasPrintZones = (product?.printZones?.front?.length || 0) > 0
                      || (product?.printZones?.back?.length || 0) > 0;
  const hasPatterns = (product?.allowedPatterns?.length || 0) > 0;
  const isCustomizable = hasPrintZones || hasPatterns;

  // KEY FIX: if the product has a GLB file, show all tabs regardless of
  // printZones — logos/name/number are rendered directly on the 3D model.
  const hasGlb = !!product?.glbUrl;

  const visibleTabs = (isCustomizable || hasGlb)
    ? MAIN_TABS_FULL
    : MAIN_TABS_FULL.filter(t => t.id !== 'logos');

  // If the active tab becomes unavailable, fall back to Style.
  useEffect(() => {
    if (!isCustomizable && !hasGlb && activeTab === 'logos') {
      setActiveTab('style');
    }
  }, [isCustomizable, hasGlb, activeTab]);

  const [jerseyColor, setJerseyColor] = useState('#1E40AF');
  const [sleeveColor, setSleeveColor] = useState('#111111');
  const [collarColor, setCollarColor] = useState('#DC2626');
  const [fabric, setFabric] = useState('climatech');

  const [clubLogo, setClubLogo] = useState(null);
  const [sponsorLogo, setSponsorLogo] = useState(null);
  const clubLogoFileRef = useRef(null);
  const sponsorLogoFileRef = useRef(null);

  const [playerName, setPlayerName] = useState('');
  const [playerNumber, setPlayerNumber] = useState('');
  const [nameStyle, setNameStyle] = useState('straight');
  const [nameFont, setNameFont] = useState('collegiate');
  const [nameColor, setNameColor] = useState('#FFFFFF');
  const [numberFont, setNumberFont] = useState('block');
  const [numberColor, setNumberColor] = useState('#F59E0B');
  const [showName, setShowName] = useState(true);
  const [showNumber, setShowNumber] = useState(true);
  const [textEffect, setTextEffect] = useState('none');

  const [fabricOpen, setFabricOpen] = useState(true);
  const [baseOpen, setBaseOpen] = useState(true);
  const [sleeveOpen, setSleeveOpen] = useState(false);
  const [collarOpen, setCollarOpen] = useState(false);
  const [clubOpen, setClubOpen] = useState(true);
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [nameOpen, setNameOpen] = useState(true);
  const [numberOpen, setNumberOpen] = useState(false);

  const [patterns, setPatterns] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState(null);

  const [frontImage, setFrontImage] = useState(product?.viewImages?.front || product?.images?.[0]);
  const [backImage, setBackImage] = useState(product?.viewImages?.back || product?.images?.[1]);

  const viewerContainerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const jerseyImageRef = useRef(null);

  const searchParams = useSearchParams();
  const customizationId = searchParams.get('customizationId');

  const [customizedFields, setCustomizedFields] = useState({
    jerseyColor: false, sleeveColor: false, collarColor: false, fabric: false,
    playerName: false, playerNumber: false, nameFont: false, nameColor: false,
    numberFont: false, numberColor: false, nameStyle: false, textEffect: false, pattern: false,
  });

  const handleJerseyColorChange = (c) => { setJerseyColor(c); setCustomizedFields(p => ({ ...p, jerseyColor: true })); };
  const handleSleeveColorChange = (c) => { setSleeveColor(c); setCustomizedFields(p => ({ ...p, sleeveColor: true })); };
  const handleCollarColorChange = (c) => { setCollarColor(c); setCustomizedFields(p => ({ ...p, collarColor: true })); };
  const handleFabricChange = (f) => { setFabric(f); setCustomizedFields(p => ({ ...p, fabric: true })); };

  const handlePlayerNameChange = useCallback((value) => {
    const upperValue = value.toUpperCase();
    setPlayerName(upperValue);
    if (upperValue.trim()) {
      setCustomizedFields(p => ({ ...p, playerName: true }));
    }
  }, []);

  const handlePlayerNumberChange = useCallback((value) => {
    setPlayerNumber(value);
    if (value.trim()) {
      setCustomizedFields(p => ({ ...p, playerNumber: true }));
    }
  }, []);

  const handleNameFontChange = (f) => { setNameFont(f); setCustomizedFields(p => ({ ...p, nameFont: true })); };
  const handleNameColorChange = (c) => { setNameColor(c); setCustomizedFields(p => ({ ...p, nameColor: true })); };
  const handleNameStyleChange = (s) => { setNameStyle(s); setCustomizedFields(p => ({ ...p, nameStyle: true })); };
  const handleNumberFontChange = (f) => { setNumberFont(f); setCustomizedFields(p => ({ ...p, numberFont: true })); };
  const handleNumberColorChange = (c) => { setNumberColor(c); setCustomizedFields(p => ({ ...p, numberColor: true })); };
  const handleTextEffectChange = (e) => { setTextEffect(e); setCustomizedFields(p => ({ ...p, textEffect: true })); };

  const handlePatternSelectWithTracking = (pattern) => {
    if (!pattern.frontPattern && !pattern.backPattern) { toast.error('This pattern has no images available'); return; }
    setSelectedPattern(pattern);
    const nf = pattern.frontPattern || product?.viewImages?.front || product?.images?.[0];
    const nb = pattern.backPattern || product?.viewImages?.back || product?.images?.[1];
    setFrontImage(nf); setBackImage(nb);
    setCustomizedFields(p => ({ ...p, pattern: true }));
    toast.success(`Pattern "${pattern.name}" applied`);
  };

  useEffect(() => {
    if (viewMode === 'product' && jerseyImageRef.current) {
      const src = view === 'front' ? frontImage : backImage;
      if (jerseyImageRef.current.src !== src) jerseyImageRef.current.src = src;
    }
  }, [view, frontImage, backImage, viewMode]);

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        if (!product?.allowedPatterns?.length) return;
        const ids = product.allowedPatterns.map(p => (typeof p === 'string' ? p : p._id));
        const alreadyHydrated = product.allowedPatterns.every(p => typeof p === 'object' && p?.frontPattern);
        if (alreadyHydrated) {
          setPatterns(product.allowedPatterns);
          return;
        }
        const res = await axiosClient.post('/v1/admin/patterns/by-ids', { ids });
        setPatterns(res.data?.data || []);
      } catch (err) { console.error(err); }
    };
    fetchPatterns();
  }, [product]);

  useEffect(() => {
    if (!customizationId) return;
    const fetchCustomization = async () => {
      try {
        const res = await axiosClient.get(`/v1/user/customization/${customizationId}`);
        const data = res.data?.data;
        if (!data) return;
        const gf = name => data.customization.find(c => c.fieldName === name)?.value;

        const newRoster = [];
        let pIdx = 1;
        while (true) {
          const pSize = gf(`playerSize_${pIdx}`);
          if (!pSize) break;
          newRoster.push({
            id: Date.now().toString() + pIdx,
            size: pSize,
            sleeve: gf(`playerSleeve_${pIdx}`) || 'Half',
            name: gf(`playerName_${pIdx}`) || '',
            number: gf(`playerNumber_${pIdx}`) || ''
          });
          pIdx++;
        }
        
        // Fallback for older items that just had sizes or no indexed fields
        if (newRoster.length === 0) {
          (data.sizes || []).forEach(s => { 
            for (let i = 0; i < s.quantity; i++) {
              newRoster.push({ id: Date.now().toString() + Math.random(), size: s.size, sleeve: 'Half', name: '', number: '' });
            }
          });
        }
        if (newRoster.length > 0) setRoster(newRoster);
        setClubLogo(gf('logo') || null); setSponsorLogo(gf('sponsor') || null);
        setJerseyColor(gf('jerseyColor') || '#1E40AF'); setSleeveColor(gf('sleeveColor') || '#111111');
        setCollarColor(gf('collarColor') || '#DC2626'); setPlayerName(gf('playerName') || '');
        setPlayerNumber(gf('playerNumber') || ''); setFabric(gf('fabric') || 'climatech');
        setNameFont(gf('nameFont') || 'collegiate'); setNameColor(gf('nameColor') || '#FFFFFF');
        setNumberFont(gf('numberFont') || 'block'); setNumberColor(gf('numberColor') || '#F59E0B');
        setNameStyle(gf('nameStyle') || 'straight'); setTextEffect(gf('textEffect') || 'none');
        const patternId = gf('patternId'), patternFront = gf('patternFront'), patternBack = gf('patternBack');
        if (patternId && patternFront && patternBack) {
          setSelectedPattern({ _id: patternId, frontPattern: patternFront, backPattern: patternBack, name: 'Saved Pattern' });
          setFrontImage(patternFront); setBackImage(patternBack);
          setCustomizedFields(p => ({ ...p, pattern: true }));
        } else {
          setSelectedPattern(null);
          setFrontImage(product?.viewImages?.front || product?.images?.[0]);
          setBackImage(product?.viewImages?.back || product?.images?.[1]);
        }
        if (gf('jerseyColor')) setCustomizedFields(p => ({ ...p, jerseyColor: true }));
        if (gf('sleeveColor')) setCustomizedFields(p => ({ ...p, sleeveColor: true }));
        if (gf('collarColor')) setCustomizedFields(p => ({ ...p, collarColor: true }));
        if (gf('fabric')) setCustomizedFields(p => ({ ...p, fabric: true }));
        if (gf('playerName')) setCustomizedFields(p => ({ ...p, playerName: true }));
        if (gf('playerNumber')) setCustomizedFields(p => ({ ...p, playerNumber: true }));
      } catch (err) { console.error(err); toast.error('Failed to load customization'); }
    };
    fetchCustomization();
  }, [customizationId, product]);

  useEffect(() => {
    const check = () => { setIsMobile(window.innerWidth < 768); setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024); };
    check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check);
  }, []);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const fn = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fn); return () => document.removeEventListener('fullscreenchange', fn);
  }, []);

  const handleLogoUpload = useCallback((setter, fileRef) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please upload an image'); return; }
    if (file.size > 8 * 1024 * 1024) { toast.error('Max file size 8 MB'); return; }
    if (fileRef) fileRef.current = file;
    if (typeof setter === 'function') {
      setter(prev => { if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev); return URL.createObjectURL(file); });
    }
    e.target.value = '';
  }, []);

  const removeLogo = (setter, fileRef, currentUrl) => {
    if (currentUrl?.startsWith('blob:')) URL.revokeObjectURL(currentUrl);
    setter(null); if (fileRef) fileRef.current = null;
  };

  const handleSaveDesign = async () => {
    if (!product) { toast.error('Product not loaded'); return; }
    if (!roster.length) { toast.error('Please add at least one player to the order'); return; }
    
    const zk = productType;
    const baseCf = [];
    if (customizedFields.fabric) baseCf.push({ zoneKey: zk, fieldName: 'fabric', value: String(fabric) });
    if (customizedFields.jerseyColor) baseCf.push({ zoneKey: zk, fieldName: 'jerseyColor', value: String(jerseyColor) });
    if (productType === 'jersey' && customizedFields.sleeveColor && viewMode === 'glb') baseCf.push({ zoneKey: zk, fieldName: 'sleeveColor', value: String(sleeveColor) });
    if (productType === 'jersey' && customizedFields.collarColor && viewMode === 'glb') baseCf.push({ zoneKey: zk, fieldName: 'collarColor', value: String(collarColor) });
    
    if (customizedFields.nameFont && showName) baseCf.push({ zoneKey: zk, fieldName: 'nameFont', value: String(nameFont) });
    if (customizedFields.nameColor && showName) baseCf.push({ zoneKey: zk, fieldName: 'nameColor', value: String(nameColor) });
    if (customizedFields.nameStyle && showName) baseCf.push({ zoneKey: zk, fieldName: 'nameStyle', value: String(nameStyle) });
    
    if (customizedFields.numberFont && showNumber) baseCf.push({ zoneKey: zk, fieldName: 'numberFont', value: String(numberFont) });
    if (customizedFields.numberColor && showNumber) baseCf.push({ zoneKey: zk, fieldName: 'numberColor', value: String(numberColor) });
    if (customizedFields.textEffect && showName && textEffect !== 'none') baseCf.push({ zoneKey: zk, fieldName: 'textEffect', value: String(textEffect) });
    
    if (customizedFields.pattern && selectedPattern?._id) {
      baseCf.push({ zoneKey: zk, fieldName: 'patternId', value: selectedPattern._id });
      baseCf.push({ zoneKey: zk, fieldName: 'patternFront', value: selectedPattern.frontPattern || '' });
      baseCf.push({ zoneKey: zk, fieldName: 'patternBack', value: selectedPattern.backPattern || '' });
    }

    try {
      let successCount = 0;
      
      const allSizes = {};
      let playerIndex = 1;
      const cf = [...baseCf];

      for (const player of roster) {
        if (!player.size) continue;
        const finalName = player.name?.trim() || (customizedFields.playerName ? playerName?.trim() : '');
        const finalNumber = player.number?.trim() || (customizedFields.playerNumber ? playerNumber?.trim() : '');
        
        // Aggregate sizes for the cart
        allSizes[player.size] = (allSizes[player.size] || 0) + 1;
        
        // Add distinct fields for each player in the roster so the Admin Panel can read them natively
        if (showName && finalName) {
          cf.push({ zoneKey: zk, fieldName: `playerName_${playerIndex}`, value: String(finalName) });
        }
        if (showNumber && finalNumber) {
          cf.push({ zoneKey: zk, fieldName: `playerNumber_${playerIndex}`, value: String(finalNumber) });
        }
        cf.push({ zoneKey: zk, fieldName: `playerSize_${playerIndex}`, value: String(player.size) });
        cf.push({ zoneKey: zk, fieldName: `playerSleeve_${playerIndex}`, value: String(player.sleeve || 'Half') });
        
        playerIndex++;
      }

      if (Object.keys(allSizes).length === 0) {
        toast.error('Please add at least one valid size.');
        return;
      }

      // Add a single 'playerName' and 'playerNumber' without suffix for the primary preview to work seamlessly
      const firstValidPlayer = roster.find(p => p.size);
      if (firstValidPlayer) {
        const firstFinalName = firstValidPlayer.name?.trim() || (customizedFields.playerName ? playerName?.trim() : '');
        const firstFinalNumber = firstValidPlayer.number?.trim() || (customizedFields.playerNumber ? playerNumber?.trim() : '');
        if (showName && firstFinalName) cf.push({ zoneKey: zk, fieldName: 'playerName', value: String(firstFinalName) });
        if (showNumber && firstFinalNumber) cf.push({ zoneKey: zk, fieldName: 'playerNumber', value: String(firstFinalNumber) });
      }

      const res = await saveCustomizationAPI({ 
        productId: product?._id || product?.id, 
        customizationId: '', // Create a single customization instance for the entire grouped roster
        customization: cf, 
        clubLogo: clubLogoFileRef.current, 
        sponsorLogo: sponsorLogoFileRef.current 
      });
      
      const finalId = res?.data?._id || res?._id;
      if (!finalId) throw new Error('No customization ID returned');
      
      const sizesArray = Object.entries(allSizes).map(([size, quantity]) => ({ size, quantity }));
      await dispatch(addToCart({ customizationId: finalId, sizes: sizesArray })).unwrap();
      
      successCount = sizesArray.reduce((acc, curr) => acc + curr.quantity, 0);
      
      if (successCount === 0) {
        toast.error('Please add valid player details.');
        return;
      }
      
      await dispatch(fetchCart());
      toast.success(`${product?.name} (${successCount} items) added to cart!`);
    } catch (error) {
      toast.error(typeof error === 'string' ? error : error?.message || 'Failed to add to cart');
    }
  };

  const reset = () => {
    setJerseyColor('#1E40AF'); setSleeveColor('#111111'); setCollarColor('#DC2626'); setFabric('climatech');
    removeLogo(setClubLogo, clubLogoFileRef, clubLogo); removeLogo(setSponsorLogo, sponsorLogoFileRef, sponsorLogo);
    setPlayerName(''); setPlayerNumber(''); setNameStyle('straight'); setNameFont('collegiate'); setNameColor('#FFFFFF');
    setNumberFont('block'); setNumberColor('#F59E0B'); setShowName(true); setShowNumber(true); setTextEffect('none');
    setRoster([{ id: Date.now().toString(), size: 'M', name: '', number: '' }]);
    setSelectedPattern(null);
    setFrontImage(product?.viewImages?.front || product?.images?.[0]);
    setBackImage(product?.viewImages?.back || product?.images?.[1]);
    setCustomizedFields({ jerseyColor: false, sleeveColor: false, collarColor: false, fabric: false, playerName: false, playerNumber: false, nameFont: false, nameColor: false, numberFont: false, numberColor: false, nameStyle: false, textEffect: false, pattern: false });
    toast.success('Reset complete');
  };

  const handleFullscreen = async () => {
    const el = viewerContainerRef.current; if (!el) return;
    try { if (!document.fullscreenElement) await el.requestFullscreen(); else await document.exitFullscreen(); }
    catch (err) { console.error(err); }
  };

  // ── ROSTER MANAGEMENT ──────────────────────────────────────────────────────
  const addRosterItem = () => {
    setRoster(prev => [...prev, { id: Date.now().toString(), size: 'M', sleeve: 'Half', name: '', number: '' }]);
  };
  
  const updateRosterItem = (id, field, value) => {
    const finalValue = field === 'name' ? value.toUpperCase() : value;
    setRoster(prev => prev.map(item => item.id === id ? { ...item, [field]: finalValue } : item));
  };
  
  const removeRosterItem = (id) => {
    setRoster(prev => prev.filter(item => item.id !== id));
  };

  // ── TAB CONTENT ──────────────────────────────────────────────────────────
  const renderTabContent = () => {
    if (activeTab === 'style') return (
      <>
        {!isCustomizable && !hasGlb && (
          <div style={{ padding: '10px 14px', background: '#F1F5F9', borderRadius: 10, border: '1px solid #E2E8F0', marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: '#475569', fontWeight: 600 }}>
              ℹ️ This product ships as-is — no logo, name/number, or pattern customization available. Just pick a base colour, fabric and your sizes.
            </div>
          </div>
        )}

        <Section title="Fabric Technology" open={fabricOpen} onToggle={() => setFabricOpen(v => !v)} badge={FABRIC_TYPES.find(f => f.id === fabric)?.label}>
          {FABRIC_TYPES.map(f => (
            <button key={f.id} onClick={() => handleFabricChange(f.id)} style={{ padding: '11px 14px', borderRadius: 10, cursor: 'pointer', textAlign: 'left', width: '100%', border: `2px solid ${fabric === f.id ? '#003E9B' : '#E2E8F0'}`, background: fabric === f.id ? 'rgba(0,62,155,0.07)' : '#F8FAFC' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: fabric === f.id ? '#003E9B' : '#334155' }}>{f.label}</div>
              <div style={{ fontSize: 9, color: '#64748B', marginTop: 3 }}>{f.desc}</div>
            </button>
          ))}
        </Section>

        {patterns.length > 0 && (
          <Section title="Patterns" open={true} onToggle={() => { }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              <button
                onClick={() => { setSelectedPattern(null); const df = product?.viewImages?.front || product?.images?.[0], db = product?.viewImages?.back || product?.images?.[1]; setFrontImage(df); setBackImage(db); setCustomizedFields(p => ({ ...p, pattern: false })); }}
                style={{ border: !selectedPattern ? '2px solid #003E9B' : '1px solid #E2E8F0', borderRadius: 10, padding: 6, background: '#fff', cursor: 'pointer' }}
              >
                <div style={{ width: '100%', height: 60, background: '#F1F5F9', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#64748B', fontWeight: 700 }}>None</div>
              </button>
              {patterns.map(pattern => (
                <button key={pattern._id} onClick={() => handlePatternSelectWithTracking(pattern)} style={{ border: selectedPattern?._id === pattern._id ? '2px solid #003E9B' : '1px solid #E2E8F0', borderRadius: 10, padding: 6, background: '#fff', cursor: 'pointer' }}>
                  <img src={pattern.thumbnail} alt={pattern.name} style={{ width: '100%', borderRadius: 8 }} onError={e => { e.target.src = '/images/placeholder-pattern.jpg'; }} />
                  <div style={{ fontSize: 10, fontWeight: 700, marginTop: 5 }}>{pattern.name}</div>
                </button>
              ))}
            </div>
          </Section>
        )}

        <Section title="Base Colour" open={baseOpen} onToggle={() => setBaseOpen(v => !v)} badge={JERSEY_COLORS.find(c => c.code === jerseyColor)?.name || jerseyColor}>
          <ColorGrid colors={JERSEY_COLORS} selected={jerseyColor} onSelect={handleJerseyColorChange} pickerId="base-cp" isMobile={isMobile} />
        </Section>

        {productType === 'jersey' && viewMode === 'glb' && (
          <>
            <Section title="Sleeve Colour" open={sleeveOpen} onToggle={() => setSleeveOpen(v => !v)} badge={SLEEVE_COLORS.find(c => c.code === sleeveColor)?.name || sleeveColor}>
              <ColorGrid colors={SLEEVE_COLORS} selected={sleeveColor} onSelect={handleSleeveColorChange} pickerId="sleeve-cp" isMobile={isMobile} />
              <button onClick={() => handleSleeveColorChange(jerseyColor)} style={{ fontSize: 10, fontWeight: 700, color: '#003E9B', background: 'rgba(0,62,155,0.08)', border: '1px solid rgba(0,62,155,0.25)', borderRadius: 8, padding: '9px', cursor: 'pointer', width: '100%' }}>↔ Match Base Colour</button>
            </Section>
            <Section title="Collar Colour" open={collarOpen} onToggle={() => setCollarOpen(v => !v)} badge={JERSEY_COLORS.find(c => c.code === collarColor)?.name || collarColor}>
              <ColorGrid colors={JERSEY_COLORS} selected={collarColor} onSelect={handleCollarColorChange} pickerId="collar-cp" isMobile={isMobile} />
              <button onClick={() => handleCollarColorChange(jerseyColor)} style={{ fontSize: 10, fontWeight: 700, color: '#003E9B', background: 'rgba(0,62,155,0.08)', border: '1px solid rgba(0,62,155,0.25)', borderRadius: 8, padding: '9px', cursor: 'pointer', width: '100%' }}>↔ Match Base Colour</button>
            </Section>
          </>
        )}
        {productType !== 'jersey' && (
          <div style={{ padding: '10px 14px', background: '#EFF6FF', borderRadius: 10, border: '1px solid #BFDBFE', marginTop: 10 }}>
            <div style={{ fontSize: 10, color: '#1D4ED8', fontWeight: 600 }}>💡 Customize base color and pattern for this {productType}</div>
          </div>
        )}
        {productType === 'jersey' && viewMode !== 'glb' && hasGlb && (
          <div style={{ padding: '10px 14px', background: '#EFF6FF', borderRadius: 10, border: '1px solid #BFDBFE', marginTop: 10 }}>
            <div style={{ fontSize: 10, color: '#1D4ED8', fontWeight: 600 }}>💡 Switch to <b>3D View</b> to customize sleeve & collar colors</div>
          </div>
        )}
      </>
    );

    if (activeTab === 'logos') return (
      <>
        <Section title="Team Logo" open={clubOpen} onToggle={() => setClubOpen(v => !v)}>
          <UploadSlot label="Team Logo / Badge" hint="PNG/SVG with transparent background preferred" state={clubLogo} setter={setClubLogo} fileRef={clubLogoFileRef} uid="up-club" onRemove={removeLogo} onUpload={handleLogoUpload} />
        </Section>
        <Section title="Sponsor Logo" open={sponsorOpen} onToggle={() => setSponsorOpen(v => !v)}>
          <UploadSlot label="Sponsor Logo" hint="PNG/SVG transparent bg, min 600×200px" state={sponsorLogo} setter={setSponsorLogo} fileRef={sponsorLogoFileRef} uid="up-sponsor" onRemove={removeLogo} onUpload={handleLogoUpload} />
        </Section>
        {!hasPrintZones && hasGlb && (
          <div style={{ padding: '10px 14px', background: '#EFF6FF', borderRadius: 10, border: '1px solid #BFDBFE', marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: '#1D4ED8', fontWeight: 600 }}>💡 Logos are applied on the <b>3D model</b>. Switch to 3D View to see them live.</div>
          </div>
        )}
        <div style={{ padding: '12px 14px', background: '#FFF7ED', borderRadius: 10, border: '1px solid #FED7AA' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#C2410C', marginBottom: 5 }}>📋 Logo Print Guidelines</div>
          <div style={{ fontSize: 10, color: '#9A3412', lineHeight: 1.7 }}>
            • PNG/SVG with <b>transparent background</b> preferred<br />
            • Minimum <b>300 DPI</b> for crisp sublimation print<br />
            • Max file size: <b>8 MB</b>
          </div>
        </div>
      </>
    );

    if (activeTab === 'nameNumber') return (
      <>
        {!hasPrintZones && hasGlb && (
          <div style={{ padding: '10px 14px', background: '#EFF6FF', borderRadius: 10, border: '1px solid #BFDBFE', marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: '#1D4ED8', fontWeight: 600 }}>💡 Name & Number are applied on the <b>3D model</b>. Switch to 3D View to see them live.</div>
          </div>
        )}
        <Section title="Players & Sizes" open={nameOpen} onToggle={() => setNameOpen(v => !v)}>
          <Toggle label="Show Player Name & Number" value={showName} onChange={(val) => { setShowName(val); setShowNumber(val); }} />
          {showName && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
                {roster.map((player, idx) => (
                  <div key={player.id} style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '10px', border: '1px solid #E2E8F0', borderRadius: '10px', background: '#FAFAFA' }}>
                    <select value={player.size} onChange={(e) => updateRosterItem(player.id, 'size', e.target.value)} style={{ padding: '8px 4px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: 11, outline: 'none', background: '#fff', color: '#000', fontWeight: 600 }}>
                      {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select value={player.sleeve || 'Half'} onChange={(e) => updateRosterItem(player.id, 'sleeve', e.target.value)} style={{ padding: '8px 4px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: 11, outline: 'none', background: '#fff', color: '#000', fontWeight: 600 }}>
                      <option value="Half">Half</option>
                      <option value="Full">Full</option>
                    </select>
                    <input type="text" placeholder="Name" value={player.name} onChange={(e) => {
                      updateRosterItem(player.id, 'name', e.target.value);
                      if (idx === 0) handlePlayerNameChange(e.target.value);
                    }} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: 11, outline: 'none', width: '100%', minWidth: 0, color: '#000', fontWeight: 600 }} />
                    <input type="text" placeholder="No." value={player.number} onChange={(e) => {
                      updateRosterItem(player.id, 'number', e.target.value);
                      if (idx === 0) handlePlayerNumberChange(e.target.value);
                    }} maxLength={2} style={{ width: 40, padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: 11, outline: 'none', textAlign: 'center', color: '#000', fontWeight: 600 }} />
                    {roster.length > 1 && (
                      <button onClick={() => removeRosterItem(player.id)} style={{ padding: '6px', background: '#FEE2E2', color: '#EF4444', border: '1px solid #FECACA', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={14} /></button>
                    )}
                  </div>
                ))}
                <button onClick={addRosterItem} style={{ padding: '10px', background: 'rgba(0,62,155,0.05)', color: '#003E9B', border: '1px dashed #003E9B', borderRadius: '10px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>+ Add Player</button>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 8 }}>Name Style</div>
                <NameStyleSelect selected={nameStyle} onSelect={handleNameStyleChange} sampleText={playerName || 'NAME'} sampleFontId={nameFont} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 8 }}>Font Style</div>
                <FontStyleCards selected={nameFont} onSelect={handleNameFontChange} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 7 }}>Name Color</div>
                <TextColorGrid colors={TEXT_COLORS} selected={nameColor} onSelect={handleNameColorChange} pickerId="name-cp" />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 7 }}>Number Color</div>
                <TextColorGrid colors={TEXT_COLORS} selected={numberColor} onSelect={handleNumberColorChange} pickerId="number-cp" />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginBottom: 7 }}>Text Effect</div>
                <TextEffectSelect selected={textEffect} onSelect={handleTextEffectChange} />
              </div>
            </>
          )}
        </Section>
        <div style={{ padding: '10px 14px', background: '#EFF6FF', borderRadius: 10, border: '1px solid #BFDBFE' }}>
          <div style={{ fontSize: 10, color: '#1D4ED8', fontWeight: 600 }}>✦ The first player's name & number update live on previews</div>
        </div>
      </>
    );

    // Order tab
    const aggregatedSizes = roster.reduce((acc, curr) => {
      acc[curr.size] = (acc[curr.size] || 0) + 1;
      return acc;
    }, {});
    
    const summaryRows = [
      ['Fabric', FABRIC_TYPES.find(f => f.id === fabric)?.label],
      ['Base Color', JERSEY_COLORS.find(c => c.code === jerseyColor)?.name || jerseyColor],
      ['Player Name', showName ? (playerName || '—') : 'Hidden'],
      ['Player Number', showNumber ? (playerNumber || '—') : 'Hidden'],      ['Sizes', Object.entries(aggregatedSizes).map(([size, qty]) => `${size} × ${qty}`).join(', ') || '—'],
    ];

    return (
      <>
        <div style={{ padding: '10px 12px', background: '#F0FDF4', borderRadius: 10, marginBottom: 12, fontSize: 11, color: '#166534', fontWeight: 600 }}>Design ready! Complete your order below.</div>
        <div style={{ border: '1px solid rgba(0,62,155,0.2)', borderRadius: 12, background: 'rgba(0,62,155,0.03)', padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Star size={15} color="#003E9B" fill="#003E9B" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#003E9B' }}>Order Summary</span>
          </div>
          {summaryRows.map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 10, color: '#64748B' }}>{k}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#1E293B' }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(0,62,155,0.12)', marginTop: 10, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700 }}>Total ({roster.length} units)</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#003E9B' }}>₹{((product?.finalPrice || 899) * roster.length).toLocaleString()}</span>
          </div>
        </div>
      </>
    );
  };

  const panelInner = (
    <>
      <div style={{ display: 'flex', borderBottom: '1px solid #E8ECF0', background: '#fff', flexShrink: 0 }}>
        {visibleTabs.map(tab => {
          const active = activeTab === tab.id, Icon = tab.Icon;
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
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px', background: '#FAFAFA', paddingBottom: 20 }}>
        {renderTabContent()}
      </div>
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
  if (!product) return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}><div style={{ width: 40, height: 40, border: '3px solid #E2E8F0', borderTopColor: '#003E9B', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /><p style={{ color: '#64748B', fontSize: 14 }}>Loading product…</p><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;

  const showDesktopSidebar = !isMobile && !isTablet;
  const configPanelWidth = isTablet ? 320 : 370;

  return (
    <div style={{ display: 'flex', height: 'calc(100dvh - 72px)', minHeight: 500, overflow: 'visible', background: '#fff', fontFamily: "'Poppins','Segoe UI',sans-serif", position: 'relative' }}>

      {/* ── Viewer ── */}
      <div ref={viewerContainerRef} style={{ flex: 1, position: 'relative', background: '#ffffff', overflow: 'hidden', minHeight: 'calc(100vh - 120px)' }}>

        {/* View mode toggle */}
        <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: 6, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', padding: '3px', borderRadius: 30 }}>
          {[
            { id: 'product', label: isMobile ? '2D' : 'Product View' },
            ...(product?.glbUrl ? [{ id: 'glb', label: isMobile ? '3D' : '3D View' }] : []),
          ].map(v => (
            <button key={v.id} onClick={() => setViewMode(v.id)} style={{ padding: isMobile ? '4px 14px' : '5px 20px', borderRadius: 30, fontSize: isMobile ? 10 : 11, fontWeight: 700, background: viewMode === v.id ? '#fff' : 'transparent', color: viewMode === v.id ? '#003E9B' : '#fff', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>{v.label}</button>
          ))}
        </div>

        <button onClick={handleFullscreen} style={{ position: 'absolute', top: 14, right: 14, zIndex: 10, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: 8, borderRadius: 40, border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>

        {/* Front/Back toggle */}
        {viewMode === 'product' && (
          <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 99, padding: 4, display: 'inline-flex', gap: 4, boxShadow: '0 4px 14px rgba(0,0,0,0.10)' }}>
              {['front', 'back'].map(v => (
                <button key={v} onClick={() => setView(v)} style={{ padding: '8px 26px', borderRadius: 99, fontSize: 10, fontWeight: 700, cursor: 'pointer', background: view === v ? 'linear-gradient(135deg,#0EA5E9,#0284C7,#1E3A8A)' : 'transparent', border: view === v ? 'none' : '1px solid #003E9B', color: view === v ? '#fff' : '#003E9B' }}>{v.toUpperCase()}</button>
              ))}
            </div>
          </div>
        )}

        {/* 3D */}
        {viewMode === 'glb' && (
          <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <GLBViewer
              glbPath={product?.glbUrl || '/images/jerseys/TSHIRT.glb'}
              autoRotate={true} backgroundColor="#E2E8F0"
              jerseyColor={jerseyColor} sleeveColor={sleeveColor} collarColor={collarColor}
              playerName={showName ? playerName : ''} playerNumber={showNumber ? playerNumber : ''}
              nameColor={nameColor} numberColor={numberColor}
              nameStyleId={nameFont} nameArcStyle={nameStyle} textEffect={textEffect}
              showText={showName} clubLogo={clubLogo} sponsorLogo={sponsorLogo}
            />
          </div>
        )}

        {/* 2D Product View */}
        {viewMode === 'product' && (
          <div
            ref={imageWrapperRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              key={`${view}-${frontImage}-${backImage}`}
              ref={jerseyImageRef}
              src={view === 'front' ? frontImage : backImage}
              alt={`Product ${view} view`}
              style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain', display: 'block' }}
              onError={e => { e.target.src = '/images/jerseys/front.jpg'; }}
            />
            {hasPrintZones && (
              <Canvas2DOverlay
                containerRef={imageWrapperRef}
                debugZones={false}
                jerseyImageRef={jerseyImageRef}
                currentView={view}
                printZones={product?.printZones}
                playerName={playerName} showName={showName}
                nameFont={nameFont} nameColor={nameColor} nameStyle={nameStyle}
                playerNumber={playerNumber} showNumber={showNumber}
                numberFont={numberFont} numberColor={numberColor}
                textEffect={textEffect}
                clubLogo={clubLogo} sponsorLogo={sponsorLogo}
              />
            )}
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      {showDesktopSidebar && (
        <div style={{ width: configPanelWidth, background: '#fff', borderLeft: '1px solid #E8ECF0', display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%', flexShrink: 0 }}>
          {panelInner}
        </div>
      )}

      {/* Mobile bottom nav */}
      {(isMobile || isTablet) && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)', borderTop: '1px solid #E8ECF0', zIndex: 40, display: 'flex' }}>
          {visibleTabs.map(tab => {
            const Icon = tab.Icon, active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileOpen(true); }} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '10px 0', cursor: 'pointer', border: 'none', background: 'transparent', color: active ? '#003E9B' : '#94A3B8' }}>
                <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
                <span style={{ fontSize: 8, fontWeight: 700 }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Mobile sheet */}
      {(isMobile || isTablet) && mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '24px 24px 0 0', maxHeight: '82vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #E8ECF0' }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#000' }}>Customize</span>
              <button onClick={() => setMobileOpen(false)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={14} /></button>
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