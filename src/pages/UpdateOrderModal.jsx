// UpdateOrderModal.jsx - Full Screen Fixed Version
import { useState, useEffect } from "react";
import { orderService } from "../services/order.service";
import { toast } from "react-toastify";
import {
    IoClose,
    IoPencil,
    IoWallet,
    IoCalendar,
    IoCheckmarkCircle,
    IoTimer,
    IoSend,
    IoRemoveCircle,
    IoRefresh
} from "react-icons/io5";

const STATUS_OPTIONS = [
    { value: "Pending", label: "Pending", color: "#D97706", bg: "#FEF3C7" },
    { value: "Ordered", label: "Ordered", color: "#2563EB", bg: "#DBEAFE" },
    { value: "Processing", label: "Processing", color: "#3B82F6", bg: "#DBEAFE" },
    { value: "Shipped", label: "Shipped", color: "#0EA5E9", bg: "#E0F2FE" },
    { value: "Out For Delivery", label: "Out For Delivery", color: "#8B5CF6", bg: "#EDE9FE" },
    { value: "Delivered", label: "Delivered", color: "#10B981", bg: "#D1FAE5" },
    { value: "Cancelled", label: "Cancelled", color: "#EF4444", bg: "#FEE2E2" },
    { value: "Return Request", label: "Return Request", color: "#F59E0B", bg: "#FEF3C7" },
    { value: "Return Approved", label: "Return Approved", color: "#6366F1", bg: "#E0E7FF" },
    { value: "Returned", label: "Returned", color: "#7C3AED", bg: "#EDE9FE" },
    { value: "Refunded", label: "Refunded", color: "#059669", bg: "#D1FAE5" },
];

const PAYMENT_STATUS_OPTIONS = [
    { value: "Pending", label: "Pending", color: "#D97706", bg: "#FEF3C7" },
    { value: "Completed", label: "Completed", color: "#10B981", bg: "#D1FAE5" },
    { value: "Failed", label: "Failed", color: "#EF4444", bg: "#FEE2E2" },
    { value: "Refunded", label: "Refunded", color: "#6366F1", bg: "#E0E7FF" },
    { value: "Partial", label: "Partial", color: "#2563EB", bg: "#DBEAFE" },
];

export default function UpdateOrderModal({
    order,
    isOpen,
    onClose,
    refreshOrders,
}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        orderStatus: "",
        paymentStatus: "",
        deliveryDays: "",
    });

    const primaryColor = '#F5B800';
    const primaryGradient = 'linear-gradient(135deg, #F5B800 0%, #F5B800 100%)';
    const primaryLight = 'rgba(245, 184, 0, 0.1)';

    useEffect(() => {
        if (order) {
            setFormData({
                orderStatus: order.orderStatus || "Pending",
                paymentStatus: order.paymentStatus || "Pending",
                deliveryDays: order.deliveryDays?.toString() || "",
            });
        }
    }, [order]);

    const handleSave = async () => {
        if (!formData.orderStatus) {
            toast.error("Please select an order status");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                orderStatus: formData.orderStatus,
                paymentStatus: formData.paymentStatus,
                deliveryDays: Number(formData.deliveryDays) || 0,
            };

            console.log("UPDATE PAYLOAD:", payload);

            const response = await orderService.editOrder(
                order._id,
                payload
            );

            if (response?.data?.success) {
                toast.success("Order updated successfully! ✅");

                if (refreshOrders) {
                    await refreshOrders();
                }

                onClose();
            }
        } catch (error) {
            console.error("UPDATE ORDER ERROR:", error?.response?.data || error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to update order"
            );
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !order) return null;

    const getStatusStyle = (statusValue) => {
        const status = STATUS_OPTIONS.find(s => s.value === statusValue);
        return status || { color: '#6B7280', bg: '#F3F4F6', label: statusValue };
    };

    const getPaymentStatusStyle = (statusValue) => {
        const status = PAYMENT_STATUS_OPTIONS.find(s => s.value === statusValue);
        return status || { color: '#6B7280', bg: '#F3F4F6', label: statusValue };
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 99999,
                padding: '20px',
                margin: 0,
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget && !loading) onClose();
            }}
        >
            <style>{`
                @keyframes slideIn {
                    from { 
                        opacity: 0; 
                        transform: translateY(30px) scale(0.95); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>

            <div 
                className="bg-white rounded-2xl w-full max-w-2xl overflow-y-auto shadow-2xl"
                style={{
                    maxHeight: '90vh',
                    animation: 'slideIn 0.3s ease',
                    width: '100%',
                    maxWidth: '640px',
                }}
            >
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: '#0F172A' }}>
                                <IoPencil size={20} style={{ color: primaryColor }} />
                                Update Order
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {order.orderId || order.id || 'N/A'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <IoClose size={24} />
                        </button>
                    </div>

                    {/* Order Info Card */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: primaryLight }}>
                                <IoRefresh size={24} style={{ color: primaryColor }} />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Order ID</div>
                                <div className="font-medium" style={{ color: '#0F172A' }}>
                                    {order.orderId || order.id || 'N/A'}
                                </div>
                            </div>
                            <div className="ml-auto text-right">
                                <div className="text-sm text-gray-500">Total Amount</div>
                                <div className="font-bold text-lg" style={{ color: primaryColor }}>
                                    ₹{(order.totalPrice || 0).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Status Display */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-gray-50 rounded-xl p-4">
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Current Order Status</div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
                                  style={{ 
                                      background: getStatusStyle(order.orderStatus).bg,
                                      color: getStatusStyle(order.orderStatus).color
                                  }}>
                                {order.orderStatus || 'Pending'}
                            </span>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Current Payment Status</div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                                  style={{ 
                                      background: getPaymentStatusStyle(order.paymentStatus).bg,
                                      color: getPaymentStatusStyle(order.paymentStatus).color
                                  }}>
                                {order.paymentStatus || 'Pending'}
                            </span>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Delivery Days</div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700">
                                {order.deliveryDays || 'N/A'} days
                            </span>
                        </div>
                    </div>

                    {/* Update Form */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                        {/* Order Status */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>
                                Order Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.orderStatus}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        orderStatus: e.target.value,
                                    })
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 transition-all"
                                style={{ 
                                    borderColor: '#E2E8F0',
                                }}
                            >
                                {STATUS_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Payment Status */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>
                                Payment Status
                            </label>
                            <select
                                value={formData.paymentStatus}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        paymentStatus: e.target.value,
                                    })
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 transition-all"
                                style={{ 
                                    borderColor: '#E2E8F0',
                                }}
                            >
                                {PAYMENT_STATUS_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Delivery Days */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>
                                Delivery Days
                            </label>
                            <div className="relative">
                                <IoCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.deliveryDays}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            deliveryDays: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 transition-all"
                                    style={{ 
                                        borderColor: '#E2E8F0',
                                    }}
                                    placeholder="Enter days"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Products Summary (Read-only) */}
                    <div className="mb-6 bg-gray-50 rounded-xl p-4">
                        <h3 className="text-sm font-semibold mb-3" style={{ color: '#0F172A' }}>
                            Products in Order ({order.orderDetails?.products?.length || 0})
                        </h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {order.orderDetails?.products?.map((product, index) => (
                                <div key={product.productId || index} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        {product.frontImage || product.viewImages?.front || product.images?.[0] ? (
                                            <img 
                                                src={product.frontImage || product.viewImages?.front || product.images?.[0]} 
                                                alt={product.productName}
                                                className="w-8 h-8 rounded object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-400">
                                                No img
                                            </div>
                                        )}
                                        <span style={{ color: '#0F172A' }}>{product.productName}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-500">
                                        <span>Qty: {product.quantity}</span>
                                        <span>₹{product.subtotal}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="px-6 py-2.5 rounded-xl text-white font-medium transition-all hover:shadow-lg disabled:opacity-50"
                            style={{ 
                                background: primaryGradient,
                                cursor: loading ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </span>
                            ) : (
                                'Update Order'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}