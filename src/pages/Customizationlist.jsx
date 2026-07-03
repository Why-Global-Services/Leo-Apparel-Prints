// CustomizationList.jsx
import { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axiosInstance";

// ─── helpers ────────────────────────────────────────────────────────────────

const getResponseItems = (payload) => {
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload)) return payload;
    return [];
};

const getField = (fields, name) =>
    fields.find((f) => f.fieldName?.toLowerCase() === name.toLowerCase())?.value || "";

// ─── Canvas Preview Modal ────────────────────────────────────────────────────

function PreviewModal({ item, onClose }) {
    const canvasRef = useRef(null);
    const [view, setView] = useState("front");
    const [rendering, setRendering] = useState(false);

    useEffect(() => {
        if (!item) return;
        renderCanvas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item, view]);

    const loadImage = (src) =>
        new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = src;
        });

    const renderCanvas = async () => {
        const canvas = canvasRef.current;
        if (!canvas || !item) return;
        setRendering(true);

        const ctx = canvas.getContext("2d");
        const fields = item.customization || [];
        const printZones = item.PrintZoneFront || [];
        console.log(item);
        console.log(fields);
        // ── 1. Decide base image ──────────────────────────────────────────
        // If a pattern exists for this view, use it; otherwise use product image
        let patternFrontUrl = fields.find(
            (f) => f.fieldName?.toLowerCase() === "patternfront"
        )?.value;
        let patternBackUrl = fields.find(
            (f) => f.fieldName?.toLowerCase() === "patternback"
        )?.value;
        console.log("Pattern URLs:", { patternFrontUrl, patternBackUrl });
        let baseUrl;
        if (view === "front") {
            baseUrl = patternFrontUrl || item.ProductImage?.front || "";
        } else {
            baseUrl = patternBackUrl || item.ProductImage?.back || "";
        }
        console.log(baseUrl)
        if (!baseUrl) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setRendering(false);
            return;
        }

        const baseImg = await loadImage(baseUrl);
        if (!baseImg) { setRendering(false); return; }

        canvas.width = baseImg.naturalWidth;
        canvas.height = baseImg.naturalHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseImg, 0, 0);


        // ── 3. Helper: percent → pixels ───────────────────────────────────
        const px = (pct) => (pct / 100) * canvas.width;
        const py = (pct) => (pct / 100) * canvas.height;

        // ── 4. Draw each customization field ─────────────────────────────
        // Only draw front-zone fields when view=front (PrintZoneFront contains zones)
        // For back we skip (no back zones in this dataset)
        if (view === "front") {
            for (const zone of printZones) {
                const zoneId = zone.id?.toLowerCase(); // "clublogo" | "playername" | "number"

                const x = px(zone.x);
                const y = py(zone.y);
                const w = px(zone.w);
                const h = py(zone.h);

                if (zoneId === "clublogo") {
                    // Logo image
                    const logoField = fields.find(
                        (f) =>
                            f.fieldName?.toLowerCase() === "logo" &&
                            (f.zoneKey === "jersey" || f.zoneKey === "pants")
                    );
                    if (logoField?.value) {
                        const logoImg = await loadImage(logoField.value);
                        if (logoImg) {
                            ctx.drawImage(logoImg, x, y, w, h);
                        }
                    }
                } else if (zoneId === "playername") {
                    const nameField = fields.find(
                        (f) => f.fieldName?.toLowerCase() === "playername"
                    );
                    if (nameField?.value) {
                        const color = getField(fields, "nameColor") || "#FFFFFF";
                        const fontName = getField(fields, "nameFont") || "Arial";
                        const fontSize = Math.max(14, Math.round(h * 0.75));
                        const nameStyle = getField(fields, "nameStyle") || "straight";

                        ctx.save();
                        ctx.font = `bold ${fontSize}px ${fontName}, Arial`;
                        ctx.fillStyle = color;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";

                        if (nameStyle === "curved") {
                            const text = nameField.value;

                            // Same curve as SVG:
                            // M 6,32 Q 42,4 78,32

                            const startX = x;
                            const startY = y + h * 0.8;

                            const controlX = x + w / 2;
                            const controlY = y - h * 0.3;

                            const endX = x + w;
                            const endY = y + h * 0.8;

                            const getQuadraticPoint = (t) => {
                                const xt =
                                    (1 - t) * (1 - t) * startX +
                                    2 * (1 - t) * t * controlX +
                                    t * t * endX;

                                const yt =
                                    (1 - t) * (1 - t) * startY +
                                    2 * (1 - t) * t * controlY +
                                    t * t * endY;

                                return { x: xt, y: yt };
                            };

                            const getQuadraticTangent = (t) => {
                                const dx =
                                    2 * (1 - t) * (controlX - startX) +
                                    2 * t * (endX - controlX);

                                const dy =
                                    2 * (1 - t) * (controlY - startY) +
                                    2 * t * (endY - controlY);

                                return Math.atan2(dy, dx);
                            };

                            const len = text.length;

                            for (let i = 0; i < len; i++) {
                                const t = len === 1 ? 0.5 : i / (len - 1);

                                const pos = getQuadraticPoint(t);
                                const angle = getQuadraticTangent(t);

                                ctx.save();
                                ctx.translate(pos.x, pos.y);
                                ctx.rotate(angle);

                                ctx.fillText(text[i], 0, 0);

                                ctx.restore();
                            }

                        } else {
                            ctx.fillText(
                                nameField.value,
                                x + w / 2,
                                y + h / 2
                            );
                        }

                        ctx.restore();
                    }
                } else if (zoneId === "number") {
                    const numField = fields.find(
                        (f) => f.fieldName?.toLowerCase() === "playernumber"
                    );
                    if (numField?.value) {
                        const color = getField(fields, "numberColor") || "#FFFFFF";
                        const fontName = getField(fields, "numberFont") || "Arial";
                        const fontSize = Math.max(14, Math.round(h * 0.85));

                        ctx.save();
                        ctx.font = `bold ${fontSize}px ${fontName}, Arial`;
                        ctx.fillStyle = color;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(numField.value, x + w / 2, y + h / 2);
                        ctx.restore();
                    }
                }
            }
        }

        setRendering(false);
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div
                style={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={styles.modalHeader}>
                    <div>
                        <h2 style={styles.modalTitle}>Customization Preview</h2>
                        <p style={styles.modalSub}>
                            {item?.UserName} · {item?.ProductName}
                        </p>
                    </div>
                    <button style={styles.closeBtn} onClick={onClose}>✕</button>
                </div>

                {/* View Toggle */}
                <div style={styles.toggleRow}>
                    {["front", "back"].map((v) => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            style={{
                                ...styles.toggleBtn,
                                ...(view === v ? styles.toggleActive : {}),
                            }}
                        >
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                        </button>
                    ))}
                    {rendering && (
                        <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 12 }}>
                            Rendering…
                        </span>
                    )}
                </div>

                {/* Canvas */}
                <div style={styles.canvasWrap}>
                    <canvas
                        ref={canvasRef}
                        style={styles.canvas}
                    />
                </div>

                {/* Field Summary */}
                <div style={styles.fieldGrid}>
                    {(item?.customization || [])
                        .filter(
                            (f) =>
                                !["patternfront", "patternback", "patternid"].includes(
                                    f.fieldName?.toLowerCase()
                                )
                        )
                        .map((f, i) => (
                            <div key={i} style={styles.fieldChip}>
                                <span style={styles.chipLabel}>{f.fieldName}</span>
                                {f.value?.startsWith("http") ? (
                                    <img
                                        src={f.value}
                                        alt={f.fieldName}
                                        style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 4 }}
                                    />
                                ) : f.value?.startsWith("#") ? (
                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: 18,
                                            height: 18,
                                            borderRadius: 4,
                                            background: f.value,
                                            border: "1px solid #e2e8f0",
                                            verticalAlign: "middle",
                                        }}
                                    />
                                ) : (
                                    <span style={styles.chipValue}>{f.value}</span>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

// ─── Main List Component ─────────────────────────────────────────────────────

export default function CustomizationList() {
    const [rows, setRows] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        limit: 10,
    });
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState(null);

    const fetchData = async (p = 1) => {
        setLoading(true);

        try {
            const res = await axiosInstance.get("/viewcustomization", {
                params: {
                    page: p,
                    limit: 10,
                },
            });

            if (res.data) {
                const data = getResponseItems(res.data);
                console.log("Customization data",data)
                // Show only products with customization
                const customizedOnly = data.filter((item) => {
                    const fields = item.customization || [];

                    const actualCustomizations = fields.filter(
                        (field) =>
                            ![
                                "patternfront",
                                "patternback",
                                "patternid",
                            ].includes(
                                field.fieldName?.toLowerCase()
                            ) &&
                            field.value &&
                            field.value !== ""
                    );

                    return actualCustomizations.length > 0;
                });

                setRows(customizedOnly);

                setPagination({
                    ...res.data.pagination,
                    totalRecords: customizedOnly.length,
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const filtered = rows.filter((r) => {
        const s = search.toLowerCase();

        return (
            r.UserName?.toLowerCase().includes(s) ||
            r.ProductName?.toLowerCase().includes(s)
        );
    });

    const getPatternPreview = (item) => {
        const pf = item.customization?.find(
            (f) => f.fieldName?.toLowerCase() === "patternfront"
        )?.value;
        return pf || item.ProductImage?.front || "";
    };

    const getPlayerName = (item) =>
        item.customization?.find(
            (f) => f.fieldName?.toLowerCase() === "playername"
        )?.value || "—";

    const getPlayerNumber = (item) =>
        item.customization?.find(
            (f) => f.fieldName?.toLowerCase() === "playernumber"
        )?.value || "—";

    const getPlayerSize = (item) =>
        item.customization?.find(
            (f) => f.fieldName?.toLowerCase().includes("size")
        )?.value || "—";

    const getPlayerSleeve = (item) =>
        item.customization?.find(
            (f) => f.fieldName?.toLowerCase().includes("sleeve")
        )?.value || "—";

    const getJerseyColor = (item) =>
        item.customization?.find(
            (f) => f.fieldName?.toLowerCase() === "jerseycolor"
        )?.value || null;

    const formatDate = (iso) => {
        if (!iso) return "—";
        return new Date(iso).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div style={styles.page}>
            {/* Page Header */}
            <div style={styles.pageHeader}>
                <div>
                    <h1 style={styles.pageTitle}>Customization Requests</h1>
                    <p style={styles.pageSub}>
                        {filtered.length} total customized records
                    </p>
                </div>

                {/* Search */}
                <div style={styles.searchBox}>
                    <svg width="16" height="16" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        style={styles.searchInput}
                        placeholder="Search user or product…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div style={styles.tableWrap}>
                {loading ? (
                    <div style={styles.loading}>Loading…</div>
                ) : filtered.length === 0 ? (
                    <div style={styles.loading}>No records found.</div>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                {["#", "Product", "Customer", "Player", "Number", "Size", "Sleeve", "Color", "Date", "Preview"].map(
                                    (h) => (
                                        <th key={h} style={styles.th}>
                                            {h}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((item, idx) => {
                                const jerseyColor = getJerseyColor(item);
                                const thumb = getPatternPreview(item);
                                return (
                                    <tr
                                        key={`${item.userId}-${item.createdAt}-${idx}`}
                                        style={styles.tr}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.background = "#F8FAFF")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.background = "")
                                        }
                                    >
                                        <td style={styles.td}>
                                            <span style={styles.indexBadge}>
                                                {(page - 1) * 10 + idx + 1}
                                            </span>
                                        </td>

                                        {/* Product */}
                                        <td style={styles.td}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <div style={styles.thumbWrap}>
                                                    {thumb ? (
                                                        <img
                                                            src={thumb}
                                                            alt=""
                                                            style={styles.thumb}
                                                        />
                                                    ) : (
                                                        <div style={styles.thumbPlaceholder} />
                                                    )}
                                                </div>
                                                <div>
                                                    <div style={styles.productName}>{item.ProductName}</div>
                                                    <div style={styles.productSub}>
                                                        {item.customization?.length || 0} fields
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Customer */}
                                        <td style={styles.td}>
                                            <div style={styles.customerName}>{item.UserName}</div>
                                        </td>

                                        {/* Player */}
                                        <td style={styles.td}>
                                            <span style={styles.pill}>{getPlayerName(item)}</span>
                                        </td>

                                        {/* Number */}
                                        <td style={styles.td}>
                                            <span style={styles.numberBadge}>{getPlayerNumber(item)}</span>
                                        </td>

                                        {/* Size */}
                                        <td style={styles.td}>
                                            <span style={styles.pill}>{getPlayerSize(item)}</span>
                                        </td>

                                        {/* Sleeve */}
                                        <td style={styles.td}>
                                            <span style={styles.pill}>{getPlayerSleeve(item)}</span>
                                        </td>

                                        {/* Jersey Color */}
                                        <td style={styles.td}>
                                            {jerseyColor ? (
                                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                    <div
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 4,
                                                            background: jerseyColor,
                                                            border: "1px solid #e2e8f0",
                                                        }}
                                                    />
                                                    <span style={{ fontSize: 12, color: "#64748b" }}>
                                                        {jerseyColor}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span style={{ color: "#cbd5e1", fontSize: 12 }}>—</span>
                                            )}
                                        </td>

                                        {/* Date */}
                                        <td style={styles.td}>
                                            <span style={styles.dateBadge}>{formatDate(item.createdAt)}</span>
                                        </td>

                                        {/* Preview Button */}
                                        <td style={{ ...styles.td, textAlign: "center" }}>
                                            <button
                                                style={styles.previewBtn}
                                                onClick={() => setPreview(item)}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.background = "#e8a800")
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.background = "#F5B800")
                                                }
                                            >
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                                Preview
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
                <div style={styles.paginationRow}>
                    <span style={{ fontSize: 13, color: "#64748b" }}>
                        Page {pagination.currentPage} of {pagination.totalPages} —{" "}
                        {pagination.totalRecords} records
                    </span>
                    <div style={{ display: "flex", gap: 6 }}>
                        <button
                            style={styles.pageBtn}
                            disabled={page === 1}
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        >
                            ‹ Prev
                        </button>
                        {[...Array(Math.min(pagination.totalPages, 5))].map((_, i) => {
                            const pn = i + 1;
                            return (
                                <button
                                    key={pn}
                                    onClick={() => setPage(pn)}
                                    style={{
                                        ...styles.pageBtn,
                                        ...(page === pn ? styles.pageBtnActive : {}),
                                    }}
                                >
                                    {pn}
                                </button>
                            );
                        })}
                        <button
                            style={styles.pageBtn}
                            disabled={page === pagination.totalPages}
                            onClick={() =>
                                setPage((p) => Math.min(p + 1, pagination.totalPages))
                            }
                        >
                            Next ›
                        </button>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {preview && (
                <PreviewModal item={preview} onClose={() => setPreview(null)} />
            )}
        </div>
    );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = {
    page: {
        padding: "28px 32px",
        background: "#F8FAFC",
        minHeight: "100vh",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    },
    pageHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 28,
        flexWrap: "wrap",
        gap: 16,
    },
    pageTitle: {
        fontSize: 26,
        fontWeight: 700,
        color: "#0F172A",
        margin: 0,
        letterSpacing: "-0.5px",
    },
    pageSub: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 4,
    },
    searchBox: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 10,
        padding: "9px 14px",
        minWidth: 260,
    },
    searchInput: {
        border: "none",
        outline: "none",
        fontSize: 14,
        color: "#0F172A",
        background: "transparent",
        width: "100%",
    },
    tableWrap: {
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #E2E8F0",
        overflowX: "auto",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        padding: "14px 16px",
        textAlign: "left",
        fontSize: 12,
        fontWeight: 600,
        color: "#64748B",
        background: "#F9FAFB",
        borderBottom: "1px solid #E2E8F0",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
    },
    tr: {
        borderBottom: "1px solid #F1F5F9",
        transition: "background 0.15s",
        cursor: "default",
    },
    td: {
        padding: "14px 16px",
        fontSize: 14,
        color: "#334155",
        verticalAlign: "middle",
    },
    indexBadge: {
        display: "inline-block",
        minWidth: 26,
        height: 26,
        lineHeight: "26px",
        textAlign: "center",
        background: "#F1F5F9",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
        color: "#64748B",
    },
    thumbWrap: {
        width: 48,
        height: 48,
        borderRadius: 8,
        overflow: "hidden",
        background: "#F1F5F9",
        border: "1px solid #E2E8F0",
        flexShrink: 0,
    },
    thumb: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    thumbPlaceholder: {
        width: "100%",
        height: "100%",
        background: "#E2E8F0",
    },
    productName: {
        fontWeight: 600,
        color: "#0F172A",
        fontSize: 13,
        maxWidth: 160,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    productSub: {
        fontSize: 11,
        color: "#94A3B8",
        marginTop: 2,
    },
    customerName: {
        fontWeight: 500,
        color: "#334155",
    },
    pill: {
        background: "#EFF6FF",
        color: "#3B82F6",
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 500,
    },
    numberBadge: {
        background: "#FEF3C7",
        color: "#D97706",
        padding: "3px 10px",
        borderRadius: 6,
        fontSize: 13,
        fontWeight: 700,
    },
    dateBadge: {
        fontSize: 12,
        color: "#64748B",
        whiteSpace: "nowrap",
    },
    previewBtn: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 14px",
        background: "#F5B800",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        transition: "background 0.15s",
    },
    loading: {
        padding: 60,
        textAlign: "center",
        color: "#94A3B8",
        fontSize: 15,
    },
    paginationRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        flexWrap: "wrap",
        gap: 12,
    },
    pageBtn: {
        padding: "7px 14px",
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 13,
        color: "#334155",
    },
    pageBtnActive: {
        background: "#F5B800",
        color: "#fff",
        border: "1px solid #F5B800",
        fontWeight: 600,
    },

    // Modal
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        backdropFilter: "blur(3px)",
    },
    modal: {
        width: "92%",
        maxWidth: 860,
        background: "#fff",
        borderRadius: 16,
        padding: "24px 28px",
        maxHeight: "92vh",
        overflowY: "auto",
        boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
    },
    modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
        gap: 12,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 700,
        color: "#0F172A",
        margin: 0,
    },
    modalSub: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 4,
    },
    closeBtn: {
        background: "#F1F5F9",
        border: "none",
        width: 34,
        height: 34,
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 16,
        color: "#334155",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    toggleRow: {
        display: "flex",
        gap: 8,
        marginBottom: 18,
        alignItems: "center",
    },
    toggleBtn: {
        padding: "8px 22px",
        borderRadius: 8,
        border: "1px solid #E2E8F0",
        background: "#F8FAFC",
        color: "#64748B",
        fontWeight: 500,
        fontSize: 14,
        cursor: "pointer",
    },
    toggleActive: {
        background: "#F5B800",
        color: "#fff",
        border: "1px solid #F5B800",
        fontWeight: 700,
    },
    canvasWrap: {
        display: "flex",
        justifyContent: "center",
        background: "#F8FAFC",
        borderRadius: 12,
        padding: 16,
        border: "1px solid #E2E8F0",
        marginBottom: 20,
        minHeight: 200,
    },
    canvas: {
        maxWidth: "100%",
        maxHeight: 480,
        borderRadius: 6,
        display: "block",
    },
    fieldGrid: {
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
    },
    fieldChip: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "#F8FAFC",
        border: "1px solid #E2E8F0",
        borderRadius: 8,
        padding: "5px 10px",
        fontSize: 12,
    },
    chipLabel: {
        color: "#64748B",
        fontWeight: 500,
        textTransform: "capitalize",
    },
    chipValue: {
        color: "#0F172A",
        fontWeight: 600,
    },
};