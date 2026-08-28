import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoWallet, IoSave, IoPricetag, IoGift, IoRefresh } from "react-icons/io5";
import {
    getShippingChargeAPI,
    createOrUpdateShippingChargeAPI,
} from "../services/shippingChargeService";

const ShippingCharge = () => {
    const [formData, setFormData] = useState({
        shippingCharge: "",
        freeShipping: false,
        freeShippingMinimumAmount: "",
    });

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [isDark, setIsDark] = useState(false);

    // Define consistent colors
    const primaryColor = '#F5B800';
    const primaryGradient = 'linear-gradient(135deg, #F5B800 0%, #F5B800 100%)';
    const primaryLight = 'rgba(245, 184, 0, 0.1)';

    const bgColor = isDark ? '#0F172A' : '#F8FAFC';
    const cardBg = isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0';
    const textColor = isDark ? '#F1F5F9' : '#0F172A';
    const textSecondary = isDark ? '#94A3B8' : '#64748B';
    const textMuted = isDark ? '#64748B' : '#94A3B8';
    const inputBg = isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF';

    // ==========================================
    // GET SHIPPING SETTINGS
    // ==========================================

    const getShippingCharge = async () => {
        try {
            setFetchLoading(true);
            const response = await getShippingChargeAPI();

            if (response?.data) {
                const data = response.data;
                setFormData({
                    shippingCharge: data.shippingCharge ?? "",
                    freeShipping: data.freeShipping ?? false,
                    freeShippingMinimumAmount: data.freeShippingMinimumAmount ?? "",
                });
            }
        } catch (error) {
            console.error("Get shipping charge error:", error);
            toast.error("Failed to load shipping settings");
        } finally {
            setFetchLoading(false);
        }
    };

    // ==========================================
    // LOAD DATA
    // ==========================================

    useEffect(() => {
        getShippingCharge();
    }, []);

    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.shippingCharge === "" || Number(formData.shippingCharge) < 0) {
            toast.error("Please enter a valid shipping charge");
            return;
        }

        if (formData.freeShipping && formData.freeShippingMinimumAmount === "") {
            toast.error("Please enter minimum amount for free shipping");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                shippingCharge: Number(formData.shippingCharge),
                freeShipping: formData.freeShipping,
                freeShippingMinimumAmount: Number(formData.freeShippingMinimumAmount) || 0,
            };

            const response = await createOrUpdateShippingChargeAPI(payload);

            if (response?.success) {
                toast.success("Shipping settings saved successfully! 🎉");
                await getShippingCharge();
            }
        } catch (error) {
            console.error("Save shipping charge error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (fetchLoading) {
        return (
            <div
                style={{
                    padding: '24px',
                    background: bgColor,
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{ textAlign: 'center', color: textSecondary }}>
                    <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        border: `3px solid ${borderColor}`,
                        borderTop: `3px solid ${primaryColor}`,
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px'
                    }} />
                    <p>Loading shipping settings...</p>
                </div>
                <style>{`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <div
            style={{
                padding: '24px',
                background: bgColor,
                minHeight: '100vh',
                transition: 'all 0.3s ease',
                width: '100%',
                overflowX: 'hidden',
                boxSizing: 'border-box',
            }}
        >
            {/* Inject CSS variables */}
            <style>{`
                :root {
                    --primary-color: ${primaryColor};
                    --primary-gradient: ${primaryGradient};
                    --primary-light: ${primaryLight};
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                * {
                    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
                }
                button:hover {
                    transform: translateY(-1px);
                }
                button:active {
                    transform: scale(0.95);
                }
                input:focus {
                    border-color: ${primaryColor} !important;
                    box-shadow: 0 0 0 3px ${primaryLight} !important;
                }
                input[type="number"]::-webkit-inner-spin-button {
                    opacity: 1;
                }
            `}</style>

            {/* Header Section */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                    flexWrap: 'wrap',
                    gap: '16px',
                }}
            >
                <div>
                    <h1
                        style={{
                            fontSize: '28px',
                            fontWeight: 700,
                            background: primaryGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '8px',
                        }}
                    >
                        Shipping Charges
                    </h1>
                    <p style={{ color: textSecondary, fontSize: '14px' }}>
                        Manage shipping charges and free shipping settings
                    </p>
                </div>
                <button
                    onClick={getShippingCharge}
                    style={{
                        background: cardBg,
                        border: `1px solid ${borderColor}`,
                        padding: '10px 20px',
                        borderRadius: '10px',
                        color: textColor,
                        fontWeight: 500,
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = primaryColor}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = borderColor}
                >
                    <IoRefresh size={18} /> Refresh
                </button>
            </div>

            {/* Main Card */}
            <div
                style={{
                    background: cardBg,
                    borderRadius: '16px',
                    border: `1px solid ${borderColor}`,
                    padding: '32px',
                    maxWidth: '700px',
                    boxShadow: isDark ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.05)',
                    animation: 'fadeIn 0.3s ease',
                }}
            >
                <form onSubmit={handleSubmit}>
                    {/* SHIPPING CHARGE */}
                    <div style={{ marginBottom: '24px' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: textColor,
                            }}
                        >
                            <IoPricetag size={16} style={{ marginRight: '8px', color: primaryColor }} />
                            Shipping Charge
                        </label>

                        <div
                            style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <span
                                style={{
                                    position: 'absolute',
                                    left: '14px',
                                    color: textMuted,
                                    fontSize: '16px',
                                    fontWeight: 600,
                                }}
                            >
                                ₹
                            </span>

                            <input
                                type="number"
                                name="shippingCharge"
                                value={formData.shippingCharge}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                placeholder="Enter shipping charge"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px 12px 36px',
                                    background: inputBg,
                                    border: `1px solid ${borderColor}`,
                                    borderRadius: '10px',
                                    outline: 'none',
                                    color: textColor,
                                    fontSize: '15px',
                                    transition: 'all 0.2s',
                                }}
                            />
                        </div>

                        <p style={{ marginTop: '6px', fontSize: '12px', color: textMuted }}>
                            Shipping charge applied to eligible orders
                        </p>
                    </div>

                    {/* FREE SHIPPING TOGGLE */}
                    <div
                        style={{
                            marginBottom: '24px',
                            padding: '20px',
                            background: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFC',
                            borderRadius: '12px',
                            border: `1px solid ${borderColor}`,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>
                                <h3
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 600,
                                        color: textColor,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    <IoGift size={18} style={{ color: primaryColor }} />
                                    Free Shipping
                                </h3>
                                <p style={{ fontSize: '13px', color: textMuted, marginTop: '4px' }}>
                                    Enable free shipping based on order amount
                                </p>
                            </div>

                            {/* Toggle Switch */}
                            <label
                                style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    width: '48px',
                                    height: '28px',
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                }}
                            >
                                <input
                                    type="checkbox"
                                    name="freeShipping"
                                    checked={formData.freeShipping}
                                    onChange={handleChange}
                                    style={{
                                        opacity: 0,
                                        width: 0,
                                        height: 0,
                                        position: 'absolute',
                                    }}
                                />
                                <span
                                    style={{
                                        position: 'absolute',
                                        cursor: 'pointer',
                                        inset: 0,
                                        background: formData.freeShipping ? primaryColor : '#CBD5E1',
                                        borderRadius: '34px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: formData.freeShipping ? `0 0 0 3px ${primaryLight}` : 'none',
                                    }}
                                >
                                    <span
                                        style={{
                                            position: 'absolute',
                                            content: '""',
                                            height: '20px',
                                            width: '20px',
                                            left: '4px',
                                            bottom: '4px',
                                            background: 'white',
                                            borderRadius: '50%',
                                            transition: 'all 0.3s ease',
                                            transform: formData.freeShipping ? 'translateX(20px)' : 'translateX(0)',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                        }}
                                    />
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* MINIMUM AMOUNT - Conditional */}
                    {formData.freeShipping && (
                        <div
                            style={{
                                marginBottom: '24px',
                                animation: 'fadeIn 0.3s ease',
                            }}
                        >
                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: textColor,
                                }}
                            >
                                Free Shipping Minimum Amount
                            </label>

                            <div style={{ position: 'relative' }}>
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: '14px',
                                        color: textMuted,
                                        fontSize: '16px',
                                        fontWeight: 600,
                                    }}
                                >
                                    ₹
                                </span>

                                <input
                                    type="number"
                                    name="freeShippingMinimumAmount"
                                    value={formData.freeShippingMinimumAmount}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    placeholder="Example: 999"
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px 12px 36px',
                                        background: inputBg,
                                        border: `1px solid ${borderColor}`,
                                        borderRadius: '10px',
                                        outline: 'none',
                                        color: textColor,
                                        fontSize: '15px',
                                        transition: 'all 0.2s',
                                    }}
                                />
                            </div>

                            <p style={{ marginTop: '6px', fontSize: '12px', color: textMuted }}>
                                Orders equal to or above this amount get free shipping
                            </p>
                        </div>
                    )}

                    {/* PREVIEW */}
                    <div
                        style={{
                            marginBottom: '24px',
                            padding: '20px',
                            background: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFC',
                            borderRadius: '12px',
                            border: `1px dashed ${borderColor}`,
                        }}
                    >
                        <h3
                            style={{
                                fontSize: '14px',
                                fontWeight: 600,
                                color: textColor,
                                marginBottom: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <IoWallet size={18} style={{ color: primaryColor }} />
                            Shipping Preview
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                                <span style={{ color: textMuted, fontSize: '14px' }}>Shipping Charge</span>
                                <span style={{ fontWeight: 600, color: textColor, fontSize: '14px' }}>
                                    ₹{Number(formData.shippingCharge || 0).toFixed(2)}
                                </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                                <span style={{ color: textMuted, fontSize: '14px' }}>Free Shipping</span>
                                <span
                                    style={{
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        color: formData.freeShipping ? '#10B981' : textMuted,
                                    }}
                                >
                                    {formData.freeShipping ? '✅ Enabled' : 'Disabled'}
                                </span>
                            </div>

                            {formData.freeShipping && (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '6px 0',
                                        animation: 'fadeIn 0.3s ease',
                                    }}
                                >
                                    <span style={{ color: textMuted, fontSize: '14px' }}>Free Shipping Above</span>
                                    <span style={{ fontWeight: 600, color: textColor, fontSize: '14px' }}>
                                        ₹{Number(formData.freeShippingMinimumAmount || 0).toFixed(2)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SAVE BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            background: loading ? '#94A3B8' : primaryGradient,
                            border: 'none',
                            padding: '14px 24px',
                            borderRadius: '12px',
                            color: '#FFFFFF',
                            fontWeight: 600,
                            fontSize: '15px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            transition: 'all 0.2s',
                            opacity: loading ? 0.6 : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = `0 4px 12px ${primaryLight}`;
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <IoSave size={20} />
                        {loading ? 'Saving...' : 'Save Shipping Settings'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingCharge;