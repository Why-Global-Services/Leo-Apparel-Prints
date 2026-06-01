import { useState, useRef, useCallback, useEffect } from 'react';

const ZONE_TYPES = [
    { id: 'clubLogo', label: 'Club badge', color: '#3B82F6' },
    { id: 'sponsor', label: 'Sponsor logo', color: '#F59E0B' },
    { id: 'playerName', label: 'Player name', color: '#10B981' },
    { id: 'number', label: 'Number', color: '#EF4444' },
];

export const DEFAULT_ZONES = {
    front: [
        { id: 'clubLogo', label: 'Club badge', x: 10, y: 16, w: 20, h: 16 },
        { id: 'sponsor', label: 'Sponsor logo', x: 29, y: 28, w: 42, h: 12 },
        { id: 'playerName', label: 'Player name', x: 15, y: 50, w: 70, h: 9 },
        { id: 'number', label: 'Number', x: 30, y: 62, w: 40, h: 20 },
    ],
    back: [
        { id: 'playerName', label: 'Player name', x: 15, y: 17, w: 70, h: 9 },
        { id: 'number', label: 'Number', x: 30, y: 28, w: 40, h: 28 },
        { id: 'clubLogo', label: 'Club badge', x: 10, y: 72, w: 20, h: 14 },
        { id: 'sponsor', label: 'Sponsor logo', x: 34, y: 74, w: 36, h: 10 },
    ],
};

const HANDLE_SIZE = 8;

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function getImageRectInContainer(imgEl, containerEl) {
    if (!imgEl || !containerEl) return null;
    const nw = imgEl.naturalWidth;
    const nh = imgEl.naturalHeight;
    if (!nw || !nh) return null;

    const imgElRect = imgEl.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();
    const elW = imgElRect.width;
    const elH = imgElRect.height;
    const imgAspect = nw / nh;
    const elAspect = elW / elH;

    let renderedW, renderedH, innerOffsetX, innerOffsetY;
    if (imgAspect > elAspect) {
        renderedW = elW;
        renderedH = elW / imgAspect;
        innerOffsetX = 0;
        innerOffsetY = (elH - renderedH) / 2;
    } else {
        renderedH = elH;
        renderedW = elH * imgAspect;
        innerOffsetX = (elW - renderedW) / 2;
        innerOffsetY = 0;
    }

    return {
        x: (imgElRect.left - containerRect.left) + innerOffsetX,
        y: (imgElRect.top - containerRect.top) + innerOffsetY,
        w: renderedW,
        h: renderedH,
    };
}

export default function PrintZoneEditor({ frontImageUrl, backImageUrl, zones, onChange }) {
    const [view, setView] = useState('front');
    const [selectedId, setSelectedId] = useState(null);
    const [dragging, setDragging] = useState(null);
    const [imgLoaded, setImgLoaded] = useState(false);

    const containerRef = useRef(null);
    const imgRef = useRef(null);

    // Always read zones directly from props — never stale
    const viewZones = zones?.[view] ?? DEFAULT_ZONES[view];
    const imgUrl = view === 'front' ? frontImageUrl : backImageUrl;

    // ── Helpers that call onChange with a plain new object (no functional updater) ──

    const updateZone = useCallback((id, patch) => {
        const current = zones?.[view] ?? DEFAULT_ZONES[view];
        onChange({ ...zones, [view]: current.map(z => z.id === id ? { ...z, ...patch } : z) });
    }, [zones, view, onChange]);

    const addZone = useCallback((typeId) => {
        const type = ZONE_TYPES.find(t => t.id === typeId);
        const current = zones?.[view] ?? DEFAULT_ZONES[view];
        if (!type || current.some(z => z.id === typeId)) return;
        onChange({ ...zones, [view]: [...current, { id: typeId, label: type.label, x: 20, y: 20, w: 30, h: 15 }] });
    }, [zones, view, onChange]);

    const removeZone = useCallback((id) => {
        const current = zones?.[view] ?? DEFAULT_ZONES[view];
        onChange({ ...zones, [view]: current.filter(z => z.id !== id) });
        setSelectedId(sel => sel === id ? null : sel);
    }, [zones, view, onChange]);

    // ── Mouse / touch helpers ────────────────────────────────────────────────

    const getRelativePos = useCallback((e) => {
        const imgRect = getImageRectInContainer(imgRef.current, containerRef.current);
        if (!imgRect) return { px: 0, py: 0 };
        const containerRect = containerRef.current.getBoundingClientRect();
        const client = e.touches ? e.touches[0] : e;
        return {
            px: ((client.clientX - containerRect.left - imgRect.x) / imgRect.w) * 100,
            py: ((client.clientY - containerRect.top - imgRect.y) / imgRect.h) * 100,
        };
    }, []);

    const onMouseDown = useCallback((e, zoneId, handle) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedId(zoneId);
        const zone = (zones?.[view] ?? DEFAULT_ZONES[view]).find(z => z.id === zoneId);
        if (!zone) return;
        const { px, py } = getRelativePos(e);
        setDragging({ zoneId, handle, startX: px, startY: py, startZone: { ...zone } });
    }, [zones, view, getRelativePos]);

    // Keep a ref to dragging so onMouseMove is never stale
    const draggingRef = useRef(null);
    draggingRef.current = dragging;

    const onMouseMove = useCallback((e) => {
        const d = draggingRef.current;
        if (!d) return;
        const { px, py } = getRelativePos(e);
        const dx = px - d.startX;
        const dy = py - d.startY;
        const sz = d.startZone;
        if (d.handle === 'move') {
            updateZone(d.zoneId, {
                x: clamp(sz.x + dx, 0, 100 - sz.w),
                y: clamp(sz.y + dy, 0, 100 - sz.h),
            });
        } else {
            updateZone(d.zoneId, {
                w: clamp(sz.w + dx, 4, 100 - sz.x),
                h: clamp(sz.h + dy, 4, 100 - sz.y),
            });
        }
    }, [getRelativePos, updateZone]);

    const onMouseUp = useCallback(() => setDragging(null), []);

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('touchmove', onMouseMove, { passive: false });
        window.addEventListener('touchend', onMouseUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onMouseMove);
            window.removeEventListener('touchend', onMouseUp);
        };
    }, [onMouseMove, onMouseUp]);

    const getZoneColor = (id) => ZONE_TYPES.find(t => t.id === id)?.color || '#888';

    const getZoneStyle = (zone) => {
        const imgRect = getImageRectInContainer(imgRef.current, containerRef.current);
        if (!imgRect) return { display: 'none' };
        return {
            position: 'absolute',
            left: imgRect.x + (zone.x / 100) * imgRect.w,
            top: imgRect.y + (zone.y / 100) * imgRect.h,
            width: (zone.w / 100) * imgRect.w,
            height: (zone.h / 100) * imgRect.h,
        };
    };

    return (
        <div style={{ fontFamily: "'Poppins','Segoe UI',sans-serif" }}>

            {/* View toggle */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {['front', 'back'].map(v => (
                    <button key={v} onClick={() => { setView(v); setImgLoaded(false); setSelectedId(null); }} style={{
                        padding: '7px 20px', borderRadius: 8, fontWeight: 700, fontSize: 12,
                        border: '1.5px solid', cursor: 'pointer',
                        background: v === view ? '#003E9B' : '#fff',
                        color: v === view ? '#fff' : '#003E9B',
                        borderColor: '#003E9B',
                    }}>{v.toUpperCase()} VIEW</button>
                ))}
            </div>

            {/* Legend */}
            <div style={{
                display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 8,
                padding: '6px 10px', background: '#F8FAFC', borderRadius: 8,
                border: '1px solid #E2E8F0', fontSize: 10,
            }}>
                {ZONE_TYPES.map(t => (
                    <span key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 2, background: t.color, display: 'inline-block' }} />
                        <span style={{ color: '#64748B', fontWeight: 600 }}>{t.label}</span>
                    </span>
                ))}
            </div>

            {/* Add-zone buttons */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                {ZONE_TYPES.map(t => {
                    const exists = viewZones.some(z => z.id === t.id);
                    return (
                        <button key={t.id} onClick={() => addZone(t.id)} disabled={exists} style={{
                            padding: '5px 12px', borderRadius: 7, fontSize: 11, fontWeight: 700,
                            cursor: exists ? 'not-allowed' : 'pointer',
                            background: exists ? '#F1F5F9' : t.color + '18',
                            color: exists ? '#94A3B8' : t.color,
                            border: `1.5px solid ${exists ? '#E2E8F0' : t.color}`,
                        }}>
                            {exists ? '✓' : '+'} {t.label}
                        </button>
                    );
                })}
            </div>

            {/* Canvas */}
            <div ref={containerRef} style={{
                position: 'relative', width: '100%', aspectRatio: '4/3',
                background: '#F1F5F9', borderRadius: 12, overflow: 'hidden',
                border: '1.5px solid #E2E8F0', userSelect: 'none',
            }}>
                {imgUrl
                    ? <img ref={imgRef} src={imgUrl} alt="garment" onLoad={() => setImgLoaded(true)}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }} />
                    : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: 13, fontWeight: 600 }}>
                        Upload a {view} image first
                    </div>
                }

                {imgLoaded && viewZones.map(zone => {
                    const col = getZoneColor(zone.id);
                    const isSel = selectedId === zone.id;

                    return (
                        <div key={zone.id}
                            style={{
                                ...getZoneStyle(zone),
                                border: `2px solid ${col}`,
                                background: col + (isSel ? '28' : '14'),
                                borderRadius: 4,
                                boxSizing: 'border-box',
                                cursor: 'move',
                                zIndex: isSel ? 10 : 5,
                                outline: isSel ? `2px solid ${col}` : 'none',
                                outlineOffset: 2,
                            }}
                            onMouseDown={e => onMouseDown(e, zone.id, 'move')}
                            onTouchStart={e => onMouseDown(e, zone.id, 'move')}
                        >
                            {/* Label */}
                            <span style={{
                                position: 'absolute', top: -20, left: 0,
                                fontSize: 9, fontWeight: 800, color: col,
                                background: '#fff', padding: '1px 5px', borderRadius: 4,
                                border: `1px solid ${col}`, whiteSpace: 'nowrap', lineHeight: 1.6,
                                pointerEvents: 'none',
                            }}>{zone.label}</span>

                            {/* Resize handle */}
                            <div
                                onMouseDown={e => onMouseDown(e, zone.id, 'resize')}
                                onTouchStart={e => onMouseDown(e, zone.id, 'resize')}
                                style={{
                                    position: 'absolute',
                                    bottom: -HANDLE_SIZE / 2, right: -HANDLE_SIZE / 2,
                                    width: HANDLE_SIZE * 2, height: HANDLE_SIZE * 2,
                                    background: col, borderRadius: 3,
                                    cursor: 'se-resize', zIndex: 20, border: '2px solid #fff',
                                }}
                            />

                            {/* Delete button — fully stops all mouse events from bubbling */}
                            {isSel && (
                                <button
                                    onMouseDown={e => { e.stopPropagation(); e.preventDefault(); }}
                                    onMouseUp={e => { e.stopPropagation(); e.preventDefault(); }}
                                    onClick={e => { e.stopPropagation(); e.preventDefault(); removeZone(zone.id); }}
                                    style={{
                                        position: 'absolute', top: -20, right: 0,
                                        background: '#EF4444', color: '#fff', border: 'none',
                                        borderRadius: 4, padding: '1px 6px', fontSize: 9,
                                        cursor: 'pointer', fontWeight: 800, lineHeight: 1.6,
                                        zIndex: 30,
                                    }}
                                >✕</button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Manual % inputs */}
            {viewZones.length > 0 && (
                <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Zone positions (% of jersey image) — drag or type
                    </div>
                    {viewZones.map(zone => {
                        const col = getZoneColor(zone.id);
                        return (
                            <div key={zone.id} style={{
                                display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6,
                                padding: '7px 10px', background: '#F8FAFC', borderRadius: 8,
                                border: `1.5px solid ${selectedId === zone.id ? col : '#E2E8F0'}`,
                            }}>
                                <div style={{ width: 8, height: 8, borderRadius: 2, background: col, flexShrink: 0 }} />
                                <span style={{ fontSize: 10, fontWeight: 700, color: col, minWidth: 80 }}>{zone.label}</span>
                                {['x', 'y', 'w', 'h'].map(k => (
                                    <div key={k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                        <span style={{ fontSize: 8, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>{k}%</span>
                                        <input
                                            type="number" min={0} max={100}
                                            value={Math.round(zone[k] * 10) / 10}
                                            onChange={e => updateZone(zone.id, { [k]: Number(e.target.value) })}
                                            style={{
                                                width: 44, padding: '3px 4px', borderRadius: 5,
                                                border: '1px solid #E2E8F0', fontSize: 11,
                                                fontWeight: 700, textAlign: 'center', color: '#000',
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Info banner */}
            <div style={{
                marginTop: 10, padding: '8px 12px', background: '#EFF6FF', borderRadius: 8,
                border: '1px solid #BFDBFE', fontSize: 10, color: '#1D4ED8', fontWeight: 600,
            }}>
                ✓ All 4 zones available on both Front &amp; Back — drag to position, resize from the corner handle.
            </div>
        </div>
    );
}