// 'use client';

// /**
//  * Canvas2DOverlay — v3
//  * ─────────────────────────────────────────────────────────────
//  * Renders name, number, clubLogo, sponsorLogo using printZones
//  * % coordinates from the DB, mapped onto the ACTUAL rendered
//  * jersey image position inside the container.
//  *
//  * Key fix v3: uses getBoundingClientRect() on BOTH the img element
//  * AND the container, then applies objectFit:contain math on the
//  * img element's own dimensions — no double-offset bug.
//  */

// import { useEffect, useRef, useCallback } from 'react';

// // ─── font map ────────────────────────────────────────────────────────────────

// const FONT_STYLES = [
//   { id: 'collegiate', canvasFont: 'Russo One',        fontWeight: '400' },
//   { id: 'block',      canvasFont: 'Bebas Neue',       fontWeight: '400' },
//   { id: 'varsity',    canvasFont: 'Teko',             fontWeight: '700' },
//   { id: 'sport',      canvasFont: 'Oswald',           fontWeight: '700' },
//   { id: 'modern',     canvasFont: 'Barlow Condensed', fontWeight: '800' },
//   { id: 'script',     canvasFont: 'Dancing Script',   fontWeight: '700' },
//   { id: 'stencil',    canvasFont: 'Archivo Black',    fontWeight: '900' },
//   { id: 'condensed',  canvasFont: 'Fjalla One',       fontWeight: '400' },
//   { id: 'brush',      canvasFont: 'Permanent Marker', fontWeight: '400' },
// ];

// const getFontObj = (id) => FONT_STYLES.find(f => f.id === id) || FONT_STYLES[0];

// const isLight = (hex) => {
//   if (!hex) return true;
//   const h = hex.replace('#', '');
//   const r = parseInt(h.slice(0, 2), 16);
//   const g = parseInt(h.slice(2, 4), 16);
//   const b = parseInt(h.slice(4, 6), 16);
//   return (r * 299 + g * 587 + b * 114) / 1000 > 155;
// };

// // ─── logo cache ───────────────────────────────────────────────────────────────

// const logoCache = new Map();

// function loadLogo(src) {
//   if (!src) return Promise.resolve(null);
//   if (logoCache.has(src)) return logoCache.get(src);
//   const p = new Promise((resolve) => {
//     const img = new Image();
//     img.crossOrigin = 'anonymous';
//     img.onload  = () => resolve(img);
//     img.onerror = () => resolve(null);
//     img.src = src;
//   });
//   logoCache.set(src, p);
//   return p;
// }

// // ─── THE CORRECT IMAGE RECT CALCULATION ──────────────────────────────────────
// /**
//  * Your jersey <img> has style: { maxWidth:'80%', maxHeight:'80%', objectFit:'contain' }
//  * inside a flex-centered div.
//  *
//  * The img ELEMENT itself is sized by the browser to the rendered dimensions
//  * (e.g. 400×500px). objectFit:contain then letterboxes the actual image
//  * pixels INSIDE that element box.
//  *
//  * So we need:
//  *   1. Where is the img element on screen? → getBoundingClientRect()
//  *   2. Where are the actual image pixels inside it? → contain math
//  *   3. Convert to canvas-local coords → subtract container's top-left
//  */
// function getActualImageRect(imgEl, canvasEl) {
//   if (!imgEl || !canvasEl) return null;

//   const nw = imgEl.naturalWidth;
//   const nh = imgEl.naturalHeight;
//   if (!nw || !nh) return null;

//   const imgElRect    = imgEl.getBoundingClientRect();     // img element on screen
//   const canvasRect   = canvasEl.getBoundingClientRect();  // canvas container on screen

//   const elW = imgElRect.width;   // rendered size of the <img> element
//   const elH = imgElRect.height;

//   // objectFit:contain letterbox math on the img element itself
//   const imgAspect = nw / nh;
//   const elAspect  = elW / elH;

//   let renderedW, renderedH, innerOffsetX, innerOffsetY;
//   if (imgAspect > elAspect) {
//     // wider than element → pillarbox (blank top/bottom)
//     renderedW    = elW;
//     renderedH    = elW / imgAspect;
//     innerOffsetX = 0;
//     innerOffsetY = (elH - renderedH) / 2;
//   } else {
//     // taller than element → letterbox (blank left/right)
//     renderedH    = elH;
//     renderedW    = elH * imgAspect;
//     innerOffsetX = (elW - renderedW) / 2;
//     innerOffsetY = 0;
//   }

//   // Position of actual image pixels, relative to the canvas container
//   return {
//     x: (imgElRect.left - canvasRect.left) + innerOffsetX,
//     y: (imgElRect.top  - canvasRect.top)  + innerOffsetY,
//     w: renderedW,
//     h: renderedH,
//   };
// }

// /**
//  * Convert a printZone (x/y/w/h in % of jersey image) → canvas px rect
//  */
// function zoneToRect(zone, imgRect) {
//   return {
//     x: imgRect.x + (zone.x / 100) * imgRect.w,
//     y: imgRect.y + (zone.y / 100) * imgRect.h,
//     w: (zone.w  / 100) * imgRect.w,
//     h: (zone.h  / 100) * imgRect.h,
//   };
// }

// // ─── component ────────────────────────────────────────────────────────────────

// export default function Canvas2DOverlay({
//   containerRef,
//   jerseyImageRef,
//   currentView   = 'front',
//   printZones,
//   playerName,   showName,   nameFont,   nameColor,   nameStyle,
//   playerNumber, showNumber, numberFont, numberColor,
//   textEffect,
//   clubLogo,
//   sponsorLogo,
// }) {
//   const canvasRef = useRef(null);

//   const draw = useCallback(async () => {
//     const canvas    = canvasRef.current;
//     const container = containerRef?.current;
//     const imgEl     = jerseyImageRef?.current;
//     if (!canvas || !container) return;

//     // ── size canvas to container ─────────────────────────────────────────
//     const { width: cw, height: ch } = container.getBoundingClientRect();
//     canvas.width  = cw;
//     canvas.height = ch;

//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, cw, ch);

//     // ── actual jersey image rect in canvas coords ────────────────────────
//     const imgRect = getActualImageRect(imgEl, container);
//     if (!imgRect || imgRect.w < 1) return;

//     // ── zones for this view ──────────────────────────────────────────────
//     const viewZones = printZones?.[currentView] || [];
//     const getZone   = (id) => viewZones.find(z => z.id === id);

//     // ── text effect helper ───────────────────────────────────────────────
//     const applyEffect = (color, effect) => {
//       ctx.shadowBlur    = 0;
//       ctx.shadowOffsetX = 0;
//       ctx.shadowOffsetY = 0;
//       ctx.fillStyle     = color;
//       ctx.strokeStyle   = 'transparent';
//       ctx.lineWidth     = 1;

//       if (effect === 'outline') {
//         ctx.strokeStyle = isLight(color) ? '#000' : '#fff';
//         ctx.lineWidth   = Math.max(1.5, imgRect.w * 0.003);
//       } else if (effect === 'shadow') {
//         ctx.shadowColor   = 'rgba(0,0,0,0.6)';
//         ctx.shadowOffsetX = imgRect.w * 0.004;
//         ctx.shadowOffsetY = imgRect.w * 0.004;
//         ctx.shadowBlur    = imgRect.w * 0.010;
//       }
//     };

//     // ── draw logo helper ─────────────────────────────────────────────────
//     const drawLogo = async (src, zone, fallbackRect, alpha = 0.95) => {
//       const logoImg = await loadLogo(src);
//       if (!logoImg) return;

//       const rect   = zone ? zoneToRect(zone, imgRect) : fallbackRect;
//       const aspect = logoImg.naturalWidth / logoImg.naturalHeight;

//       // fit inside zone box maintaining aspect ratio
//       let lw = rect.w;
//       let lh = rect.h;
//       if (lw / lh > aspect) { lw = lh * aspect; }
//       else                   { lh = lw / aspect; }

//       // center within zone
//       const lx = rect.x + (rect.w - lw) / 2;
//       const ly = rect.y + (rect.h - lh) / 2;

//       ctx.globalAlpha = alpha;
//       ctx.drawImage(logoImg, lx, ly, lw, lh);
//       ctx.globalAlpha = 1;
//     };

//     // ── 1. CLUB LOGO ─────────────────────────────────────────────────────
//     if (clubLogo) {
//       await drawLogo(
//         clubLogo,
//         getZone('clubLogo'),
//         {
//           x: imgRect.x + imgRect.w * 0.10,
//           y: imgRect.y + imgRect.h * 0.16,
//           w: imgRect.w * 0.20,
//           h: imgRect.h * 0.16,
//         }
//       );
//     }

//     // ── 2. SPONSOR LOGO ──────────────────────────────────────────────────
//     if (sponsorLogo) {
//       await drawLogo(
//         sponsorLogo,
//         getZone('sponsor'),
//         {
//           x: imgRect.x + imgRect.w * 0.29,
//           y: imgRect.y + imgRect.h * 0.28,
//           w: imgRect.w * 0.42,
//           h: imgRect.h * 0.12,
//         },
//         0.92
//       );
//     }

//     // ── 3. PLAYER NAME ───────────────────────────────────────────────────
//     const trimmedName = (playerName || '').trim();
//     if (showName && trimmedName && nameStyle !== 'none') {
//       const zone = getZone('playerName');
//       const fo   = getFontObj(nameFont);

//       const rect = zone
//         ? zoneToRect(zone, imgRect)
//         : {
//             x: imgRect.x + imgRect.w * 0.15,
//             y: imgRect.y + imgRect.h * 0.17,
//             w: imgRect.w * 0.70,
//             h: imgRect.h * 0.09,
//           };

//       // font height fills the zone box
//       const fontSize = Math.round(rect.h * 0.80);
//       const cx = rect.x + rect.w / 2;
//       const cy = rect.y + rect.h / 2;

//       applyEffect(nameColor, textEffect);
//       ctx.font = `${fo.fontWeight} ${fontSize}px "${fo.canvasFont}", sans-serif`;

//       if (nameStyle === 'curved') {
//         const radius        = rect.w * 0.50;
//         const arcCenterY    = cy + radius * 0.35;
//         const chars         = trimmedName.split('');
//         const totalAngleDeg = Math.min(chars.length * 11, 100);
//         const totalAngleRad = (totalAngleDeg * Math.PI) / 180;
//         const startAngle    = -Math.PI / 2 - totalAngleRad / 2;
//         const step          = chars.length > 1 ? totalAngleRad / (chars.length - 1) : 0;

//         ctx.textAlign    = 'center';
//         ctx.textBaseline = 'middle';
//         chars.forEach((char, i) => {
//           const angle = startAngle + i * step;
//           const charX = cx + radius * Math.cos(angle);
//           const charY = arcCenterY + radius * Math.sin(angle);
//           ctx.save();
//           ctx.translate(charX, charY);
//           ctx.rotate(angle + Math.PI / 2);
//           if (textEffect === 'outline') ctx.strokeText(char, 0, 0);
//           ctx.fillText(char, 0, 0);
//           ctx.restore();
//         });
//       } else {
//         ctx.textAlign    = 'center';
//         ctx.textBaseline = 'middle';
//         if (textEffect === 'outline') ctx.strokeText(trimmedName, cx, cy);
//         ctx.fillText(trimmedName, cx, cy);
//       }
//     }

//     // ── 4. PLAYER NUMBER ─────────────────────────────────────────────────
//     const trimmedNumber = (playerNumber || '').trim();
//     if (showNumber && trimmedNumber) {
//       const zone = getZone('number');
//       const fo   = getFontObj(numberFont);

//       const rect = zone
//         ? zoneToRect(zone, imgRect)
//         : {
//             x: imgRect.x + imgRect.w * 0.30,
//             y: imgRect.y + imgRect.h * 0.40,
//             w: imgRect.w * 0.40,
//             h: imgRect.h * 0.28,
//           };

//       // fill zone height, capped by zone width
//       const fontSize = Math.round(Math.min(rect.h * 0.85, rect.w * 0.75));
//       const cx = rect.x + rect.w / 2;
//       const cy = rect.y + rect.h / 2;

//       applyEffect(numberColor, textEffect);
//       ctx.font         = `${fo.fontWeight} ${fontSize}px "${fo.canvasFont}", sans-serif`;
//       ctx.textAlign    = 'center';
//       ctx.textBaseline = 'middle';
//       if (textEffect === 'outline') ctx.strokeText(trimmedNumber, cx, cy);
//       ctx.fillText(trimmedNumber, cx, cy);
//     }

//   }, [
//     containerRef, jerseyImageRef, currentView, printZones,
//     playerName, showName, nameFont, nameColor, nameStyle,
//     playerNumber, showNumber, numberFont, numberColor, textEffect,
//     clubLogo, sponsorLogo,
//   ]);

//   useEffect(() => { draw(); }, [draw]);

//   // Redraw on container resize
//   useEffect(() => {
//     const el = containerRef?.current;
//     if (!el) return;
//     const ro = new ResizeObserver(draw);
//     ro.observe(el);
//     return () => ro.disconnect();
//   }, [containerRef, draw]);

//   // Redraw when jersey image loads (handles src changes too)
//   useEffect(() => {
//     const img = jerseyImageRef?.current;
//     if (!img) return;
//     const onLoad = () => draw();
//     img.addEventListener('load', onLoad);
//     // fire immediately if already loaded
//     if (img.complete && img.naturalWidth) draw();
//     return () => img.removeEventListener('load', onLoad);
//   }, [jerseyImageRef, draw]);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position:      'absolute',
//         inset:         0,
//         width:         '100%',
//         height:        '100%',
//         pointerEvents: 'none',
//         zIndex:        5,
//       }}
//     />
//   );
// }











'use client';

/**
 * Canvas2DOverlay — v4
 * ─────────────────────────────────────────────────────────────
 * FIXES:
 * 1. clubLogo only draws if 'clubLogo' zone exists in currentView's printZones
 * 2. sponsorLogo only draws if 'sponsor' zone exists in currentView's printZones
 * 3. playerName only draws if 'playerName' zone exists in currentView's printZones
 * 4. number only draws if 'number' zone exists in currentView's printZones
 * 5. Correct image rect using getBoundingClientRect on both img + container
 *
 * Rule: If admin didn't place a zone for this view → don't draw it.
 * This means front zones ONLY appear on front, back zones ONLY on back.
 */

import { useEffect, useRef, useCallback } from 'react';

const FONT_STYLES = [
  { id: 'collegiate', canvasFont: 'Russo One',        fontWeight: '400' },
  { id: 'block',      canvasFont: 'Bebas Neue',       fontWeight: '400' },
  { id: 'varsity',    canvasFont: 'Teko',             fontWeight: '700' },
  { id: 'sport',      canvasFont: 'Oswald',           fontWeight: '700' },
  { id: 'modern',     canvasFont: 'Barlow Condensed', fontWeight: '800' },
  { id: 'script',     canvasFont: 'Dancing Script',   fontWeight: '700' },
  { id: 'stencil',    canvasFont: 'Archivo Black',    fontWeight: '900' },
  { id: 'condensed',  canvasFont: 'Fjalla One',       fontWeight: '400' },
  { id: 'brush',      canvasFont: 'Permanent Marker', fontWeight: '400' },
];

const getFontObj = (id) => FONT_STYLES.find(f => f.id === id) || FONT_STYLES[0];

const isLight = (hex) => {
  if (!hex) return true;
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
};

// ─── Logo cache ───────────────────────────────────────────────────────────────
const logoCache = new Map();

function loadLogo(src) {
  if (!src) return Promise.resolve(null);
  if (logoCache.has(src)) return logoCache.get(src);
  const p = new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload  = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
  logoCache.set(src, p);
  return p;
}

// ─── Get actual rendered image rect inside canvas container ──────────────────
// Matches PrintZoneEditor's getImageRectInContainer() exactly.
function getActualImageRect(imgEl, canvasEl) {
  if (!imgEl || !canvasEl) return null;
  const nw = imgEl.naturalWidth;
  const nh = imgEl.naturalHeight;
  if (!nw || !nh) return null;

  const imgElRect  = imgEl.getBoundingClientRect();
  const canvasRect = canvasEl.getBoundingClientRect();

  const elW = imgElRect.width;
  const elH = imgElRect.height;

  const imgAspect = nw / nh;
  const elAspect  = elW / elH;

  let renderedW, renderedH, innerOffsetX, innerOffsetY;
  if (imgAspect > elAspect) {
    renderedW    = elW;
    renderedH    = elW / imgAspect;
    innerOffsetX = 0;
    innerOffsetY = (elH - renderedH) / 2;
  } else {
    renderedH    = elH;
    renderedW    = elH * imgAspect;
    innerOffsetX = (elW - renderedW) / 2;
    innerOffsetY = 0;
  }

  return {
    x: (imgElRect.left - canvasRect.left) + innerOffsetX,
    y: (imgElRect.top  - canvasRect.top)  + innerOffsetY,
    w: renderedW,
    h: renderedH,
  };
}

// Convert zone % → canvas px rect
function zoneToRect(zone, imgRect) {
  return {
    x: imgRect.x + (zone.x / 100) * imgRect.w,
    y: imgRect.y + (zone.y / 100) * imgRect.h,
    w: (zone.w  / 100) * imgRect.w,
    h: (zone.h  / 100) * imgRect.h,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Canvas2DOverlay({
  containerRef,
  jerseyImageRef,
  currentView   = 'front',   // 'front' | 'back'
  printZones,                // product.printZones from API
  playerName,   showName,   nameFont,   nameColor,   nameStyle,
  playerNumber, showNumber, numberFont, numberColor,
  textEffect,
  clubLogo,
  sponsorLogo,
}) {
  const canvasRef = useRef(null);

  const draw = useCallback(async () => {
    const canvas    = canvasRef.current;
    const container = containerRef?.current;
    const imgEl     = jerseyImageRef?.current;
    if (!canvas || !container) return;

    const { width: cw, height: ch } = container.getBoundingClientRect();
    canvas.width  = cw;
    canvas.height = ch;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, cw, ch);

    // Get actual jersey image bounding box
    const imgRect = getActualImageRect(imgEl, container);
    if (!imgRect || imgRect.w < 1) return;

    // ── CRITICAL: only use zones for the CURRENT VIEW ────────────────────
    // If a zone doesn't exist in this view's printZones → don't draw it
    const viewZones = printZones?.[currentView] || [];
    const getZone   = (id) => viewZones.find(z => z.id === id) || null;

    // ── Text effect helper ───────────────────────────────────────────────
    const applyEffect = (color, effect) => {
      ctx.shadowBlur    = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle     = color;
      ctx.strokeStyle   = 'transparent';
      ctx.lineWidth     = 1;
      if (effect === 'outline') {
        ctx.strokeStyle = isLight(color) ? '#000' : '#fff';
        ctx.lineWidth   = Math.max(1.5, imgRect.w * 0.003);
      } else if (effect === 'shadow') {
        ctx.shadowColor   = 'rgba(0,0,0,0.6)';
        ctx.shadowOffsetX = imgRect.w * 0.004;
        ctx.shadowOffsetY = imgRect.w * 0.004;
        ctx.shadowBlur    = imgRect.w * 0.010;
      }
    };

    // ── Draw logo in zone ────────────────────────────────────────────────
    const drawLogoInZone = async (src, zone, alpha = 0.95) => {
      // ✅ KEY FIX: zone must exist in THIS view — no zone = don't draw
      if (!src || !zone) return;

      const logoImg = await loadLogo(src);
      if (!logoImg) return;

      const rect   = zoneToRect(zone, imgRect);
      const aspect = logoImg.naturalWidth / logoImg.naturalHeight;

      // Fit logo inside zone maintaining aspect ratio
      let lw = rect.w;
      let lh = rect.h;
      if (lw / lh > aspect) { lw = lh * aspect; }
      else                   { lh = lw / aspect; }

      // Center within zone
      const lx = rect.x + (rect.w - lw) / 2;
      const ly = rect.y + (rect.h - lh) / 2;

      ctx.globalAlpha = alpha;
      ctx.drawImage(logoImg, lx, ly, lw, lh);
      ctx.globalAlpha = 1;
    };

    // ── 1. CLUB LOGO — only if 'clubLogo' zone exists in this view ───────
    // front view → clubLogo zone → draw; back view → no clubLogo zone → skip
    await drawLogoInZone(clubLogo, getZone('clubLogo'), 0.95);

    // ── 2. SPONSOR LOGO — only if 'sponsor' zone exists in this view ─────
    await drawLogoInZone(sponsorLogo, getZone('sponsor'), 0.92);

    // ── 3. PLAYER NAME — only if 'playerName' zone exists in this view ───
    const trimmedName = (playerName || '').trim();
    const nameZone    = getZone('playerName');
    // ✅ Only draw if: user typed something + zone exists in this view
    if (showName && trimmedName && nameStyle !== 'none' && nameZone) {
      const fo   = getFontObj(nameFont);
      const rect = zoneToRect(nameZone, imgRect);

      const fontSize = Math.round(rect.h * 0.80);
      const cx = rect.x + rect.w / 2;
      const cy = rect.y + rect.h / 2;

      applyEffect(nameColor, textEffect);
      ctx.font = `${fo.fontWeight} ${fontSize}px "${fo.canvasFont}", sans-serif`;

      if (nameStyle === 'curved') {
        const radius        = rect.w * 0.50;
        const arcCenterY    = cy + radius * 0.35;
        const chars         = trimmedName.split('');
        const totalAngleDeg = Math.min(chars.length * 11, 100);
        const totalAngleRad = (totalAngleDeg * Math.PI) / 180;
        const startAngle    = -Math.PI / 2 - totalAngleRad / 2;
        const step          = chars.length > 1 ? totalAngleRad / (chars.length - 1) : 0;

        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        chars.forEach((char, i) => {
          const angle = startAngle + i * step;
          const charX = cx + radius * Math.cos(angle);
          const charY = arcCenterY + radius * Math.sin(angle);
          ctx.save();
          ctx.translate(charX, charY);
          ctx.rotate(angle + Math.PI / 2);
          if (textEffect === 'outline') ctx.strokeText(char, 0, 0);
          ctx.fillText(char, 0, 0);
          ctx.restore();
        });
      } else {
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        if (textEffect === 'outline') ctx.strokeText(trimmedName, cx, cy);
        ctx.fillText(trimmedName, cx, cy);
      }
    }

    // ── 4. PLAYER NUMBER — only if 'number' zone exists in this view ─────
    const trimmedNumber = (playerNumber || '').trim();
    const numberZone    = getZone('number');
    // ✅ Only draw if: user typed something + zone exists in this view
    if (showNumber && trimmedNumber && numberZone) {
      const fo   = getFontObj(numberFont);
      const rect = zoneToRect(numberZone, imgRect);

      const fontSize = Math.round(Math.min(rect.h * 0.85, rect.w * 0.75));
      const cx = rect.x + rect.w / 2;
      const cy = rect.y + rect.h / 2;

      applyEffect(numberColor, textEffect);
      ctx.font         = `${fo.fontWeight} ${fontSize}px "${fo.canvasFont}", sans-serif`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      if (textEffect === 'outline') ctx.strokeText(trimmedNumber, cx, cy);
      ctx.fillText(trimmedNumber, cx, cy);
    }

  }, [
    containerRef, jerseyImageRef, currentView, printZones,
    playerName, showName, nameFont, nameColor, nameStyle,
    playerNumber, showNumber, numberFont, numberColor, textEffect,
    clubLogo, sponsorLogo,
  ]);

  useEffect(() => { draw(); }, [draw]);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef, draw]);

  useEffect(() => {
    const img = jerseyImageRef?.current;
    if (!img) return;
    const onLoad = () => draw();
    img.addEventListener('load', onLoad);
    if (img.complete && img.naturalWidth) draw();
    return () => img.removeEventListener('load', onLoad);
  }, [jerseyImageRef, draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        5,
      }}
    />
  );
}