// OrdersPage.jsx - Fixed Version (Exact Same UI, No Redux)
import { useState, useEffect } from "react";
import {
    IoEye,
    IoCreate,
    IoSearch,
    IoChevronBack,
    IoChevronForward,
    IoDownload,
    IoPerson,
    IoCalendar,
    IoWallet,
    IoCheckmarkCircle,
    IoTimer,
    IoSend,
    IoCube,
    IoRemoveCircle
} from "react-icons/io5";
import { orderService } from "../services/order.service";
import OrderViewModal from "./OrderViewModal";
import UpdateOrderModal from "./UpdateOrderModal";


const STATUS_TYPE = {

    Pending: {
        label: "Pending",
        color: "#D97706",
        bg: "#FEF3C7",
        icon: <IoTimer size={12} />
    },

    Ordered: {
        label: "Ordered",
        color: "#2563EB",
        bg: "#DBEAFE",
        icon: <IoCheckmarkCircle size={12} />
    },

    Processing: {
        label: "Processing",
        color: "#3B82F6",
        bg: "#DBEAFE",
        icon: <IoTimer size={12} />
    },

    Shipped: {
        label: "Shipped",
        color: "#0EA5E9",
        bg: "#E0F2FE",
        icon: <IoSend size={12} />
    },

    "Out For Delivery": {
        label: "Out For Delivery",
        color: "#8B5CF6",
        bg: "#EDE9FE",
        icon: <IoSend size={12} />
    },

    Delivered: {
        label: "Delivered",
        color: "#10B981",
        bg: "#D1FAE5",
        icon: <IoCheckmarkCircle size={12} />
    },

    Cancelled: {
        label: "Cancelled",
        color: "#EF4444",
        bg: "#FEE2E2",
        icon: <IoRemoveCircle size={12} />
    },

    "Return Request": {
        label: "Return Request",
        color: "#F59E0B",
        bg: "#FEF3C7",
        icon: <IoTimer size={12} />
    },

    "Return Approved": {
        label: "Return Approved",
        color: "#6366F1",
        bg: "#E0E7FF",
        icon: <IoCheckmarkCircle size={12} />
    },

    Returned: {
        label: "Returned",
        color: "#7C3AED",
        bg: "#EDE9FE",
        icon: <IoRemoveCircle size={12} />
    },

    Refunded: {
        label: "Refunded",
        color: "#059669",
        bg: "#D1FAE5",
        icon: <IoWallet size={12} />
    }

};
const PAYMENT_STATUS = {
    Pending: {
        color: "#D97706",
        bg: "#FEF3C7",
        label: "Pending",
    },

    Completed: {
        color: "#10B981",
        bg: "#D1FAE5",
        label: "Completed",
    },

    Failed: {
        color: "#EF4444",
        bg: "#FEE2E2",
        label: "Failed",
    },

    Refunded: {
        color: "#6366F1",
        bg: "#E0E7FF",
        label: "Refunded",
    },

    Partial: {
        color: "#2563EB",
        bg: "#DBEAFE",
        label: "Partial",
    },
};
const TABS = [
    { value: "all", label: "All Orders" },
    { value: "Ordered", label: "Ordered" },
    { value: "Processing", label: "Processing" },
    { value: "Shipped", label: "Shipped" },
    { value: "Delivered", label: "Delivered" },
    { value: "Cancelled", label: "Cancelled" }
];

export default function Orderspage() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedViewOrder, setSelectedViewOrder] = useState(null);
    const [selectedEditOrder, setSelectedEditOrder] = useState(null); const [orders, setOrders] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const itemsPerPage = 10;


    // Define the CSS variables that were missing
    const primaryColor = '#F5B800';
    const primaryGradient = 'linear-gradient(135deg, #F5B800 0%, #F5B800 100%)';
    const primaryLight = 'rgba(245, 184, 0, 0.1)';

    const [isDark, setIsDark] = useState(false); // Default to light theme


    const handleViewOrder = (order) => {

        setSelectedViewOrder(order);
    };



    const handleEditOrder = (order) => {
        setSelectedEditOrder(order.fullData);
        setIsEditModalOpen(true);
    };

    const updateOrder = async (payload) => {
        try {

            await orderService.editOrder(
                selectedEditOrder._id,
                payload
            );

            await fetchOrders();

            setIsEditModalOpen(false);
            setSelectedOrder(null);

        } catch (error) {

            console.error(
                "UPDATE ORDER ERROR:",
                error
            );
        }
    };
    const handleExportOrders = () => {
        alert("Orders exported successfully!");
    };

    const getTabCount = (status) => {
        if (status === 'all') return orders.length;
        return orders.filter(o => o.status === status).length;
    };

    const filteredOrders = orders.filter(order => {
        const matchesTab =
            activeTab === "all" ||
            order.orderStatus === activeTab;
        const matchesSearch =
            (order.id || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||

            (order.customer || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||

            order.products.some((product) =>
                product.productName
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        return matchesTab && matchesSearch;
    });

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentOrders = filteredOrders.slice(startIndex, endIndex);
    console.log("current order", currentOrders)
    const bgColor = isDark ? '#0F172A' : '#F8FAFC';
    const cardBg = isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0';
    const textColor = isDark ? '#F1F5F9' : '#0F172A';
    const textSecondary = isDark ? '#94A3B8' : '#64748B';
    const textMuted = isDark ? '#64748B' : '#94A3B8';
    const headerBg = isDark ? 'rgba(255, 255, 255, 0.03)' : '#F9FAFB';
    const rowEvenBg = isDark ? 'rgba(255, 255, 255, 0.02)' : '#FFFFFF';
    const rowOddBg = isDark ? 'rgba(255, 255, 255, 0.05)' : '#F9FAFB';
    const hoverBg = isDark ? 'rgba(245, 184, 0, 0.1)' : primaryLight;
    const activeTabBg = primaryGradient;

    const tableStyle = {
        background: cardBg,
        borderRadius: '16px',
        border: `1px solid ${borderColor}`,
        overflowX: 'auto',
        boxShadow: isDark ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.05)'
    };

    const fetchOrders = async () => {

        try {

            const response =
                await orderService.getOrders();

            console.log(
                "ORDERS API:",
                response.data
            );

            const apiOrders =
                response?.data?.data || [];

            const formattedOrders = apiOrders.map((order) => ({
                id: order.orderId,

                backendId: order._id,

                customer:
                    order?.userDetails?.name || "Guest",

                email:
                    order?.userDetails?.email || "N/A",

                date:
                    new Date(order.createdAt)
                        .toLocaleDateString(),

                deliveryDays:
                    order.deliveryDays || "N/A",

                orderStatus:
                    order.orderStatus,

                paymentStatus:
                    order.paymentStatus,

                paymentMethod:
                    order.paymentMethod,

                total:
                    order.totalPrice || 0,

                products:
                    order?.orderDetails?.products || [],

                fullData: order,
            }));
            setOrders(formattedOrders);

        } catch (error) {

            console.error(
                "FETCH ORDERS ERROR:",
                error
            );
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);



    return (
        <div style={{ padding: '24px', background: bgColor, minHeight: '100vh', transition: 'all 0.3s ease' }}>
            {/* Inject CSS variables */}
            <style>{`
                :root {
                    --primary-color: ${primaryColor};
                    --primary-gradient: ${primaryGradient};
                    --primary-light: ${primaryLight};
                }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                * { transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease; }
                button:hover { transform: translateY(-1px); }
                button:active { transform: scale(0.95); }
            `}</style>

            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 700, background: primaryGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>Orders</h1>
                    <p style={{ color: textSecondary, fontSize: '14px' }}>Manage and track all customer orders</p>
                </div>
                <button onClick={handleExportOrders} style={{ background: primaryGradient, border: 'none', padding: '10px 20px', borderRadius: '10px', color: '#FFFFFF', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <IoDownload size={18} /> Export Orders
                </button>
            </div>

            {/* Tabs */}
            <div style={{ marginBottom: '24px', borderBottom: `1px solid ${borderColor}`, overflowX: 'auto' }}>
                <div style={{ display: 'flex', gap: '4px', minWidth: 'max-content' }}>
                    {TABS.map((tab) => (
                        <button key={tab.value} onClick={() => { setActiveTab(tab.value); setCurrentPage(1); }} style={{ padding: '10px 20px', background: activeTab === tab.value ? activeTabBg : 'transparent', color: activeTab === tab.value ? '#FFFFFF' : textColor, border: 'none', borderRadius: '8px 8px 0 0', cursor: 'pointer', fontSize: '14px', fontWeight: 500, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                            {tab.label}
                            <span style={{ background: activeTab === tab.value ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>{getTabCount(tab.value)}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: cardBg, padding: '12px 16px', borderRadius: '12px', border: `1px solid ${borderColor}`, maxWidth: '400px' }}>
                    <IoSearch size={20} style={{ color: textSecondary }} />
                    <input type="text" placeholder="Search by Order ID, Customer, or Product..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: textColor, fontSize: '14px' }} />
                </div>
            </div>

            {/* Table */}
            <div style={tableStyle}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: `1px solid ${borderColor}`, background: headerBg }}>
                            <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Order ID</th>
                            <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Product</th>
                            <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Customer</th>
                            <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Date</th>
                            <th style={{ textAlign: 'center', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Estimated Delivery</th>
                            <th style={{ textAlign: 'center', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Status</th>
                            {/* New Payment Status Column */}
                            <th style={{ textAlign: "center", padding: "16px", color: textSecondary, fontSize: "13px", fontWeight: 600, }}>Payment Status </th>
                            <th style={{ textAlign: 'center', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Price</th>
                            <th style={{ textAlign: 'center', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {currentOrders.map((order, index) => {
                            const status =
                                STATUS_TYPE[order.orderStatus] ||
                                STATUS_TYPE.Pending;
                            const paymentStatus =
                                PAYMENT_STATUS[order.paymentStatus] || {
                                    color: '#6B7280',
                                    bg: '#F3F4F6',
                                    label: order.paymentStatus || 'N/A'
                                };
                            return (
                                <tr key={order.id} style={{ borderBottom: `1px solid ${borderColor}`, transition: 'all 0.2s', background: index % 2 === 0 ? rowEvenBg : rowOddBg }} onMouseEnter={(e) => e.currentTarget.style.background = hoverBg} onMouseLeave={(e) => { e.currentTarget.style.background = index % 2 === 0 ? rowEvenBg : rowOddBg; }}>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{ color: '#0EA5E9', fontWeight: 700, fontSize: '12px', fontFamily: 'monospace' }}>{order.id}</span>
                                    </td>
                                    <td style={{ padding: "16px", minWidth: "250px" }}>
                                        {order.products.map((product, idx) => (
                                            <div
                                                key={product.productId}
                                                style={{
                                                    display: "flex",
                                                    gap: "10px",
                                                    marginBottom: "10px",
                                                    paddingBottom: "10px",
                                                    borderBottom:
                                                        idx !== order.products.length - 1
                                                            ? `1px solid ${borderColor}`
                                                            : "none",
                                                }}
                                            >
                                                <img
                                                    src={
                                                        product.frontImage ||
                                                        product.viewImages?.front
                                                    }
                                                    alt={product.productName}
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        borderRadius: "8px",
                                                        objectFit: "cover",
                                                    }}
                                                />

                                                <div>
                                                    <div
                                                        style={{
                                                            fontWeight: 600,
                                                            color: textColor,
                                                            fontSize: "13px",
                                                        }}
                                                    >
                                                        {product.productName}
                                                    </div>

                                                    <div
                                                        style={{
                                                            color: textSecondary,
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        Qty : {product.quantity}
                                                    </div>

                                                    <div
                                                        style={{
                                                            color: textMuted,
                                                            fontSize: "11px",
                                                        }}
                                                    >
                                                        ₹{product.subtotal}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontWeight: 500, color: textColor, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <IoPerson size={12} style={{ color: primaryColor }} />
                                            {order.customer}
                                        </div>
                                        <div style={{ fontSize: '11px', color: textMuted, marginTop: '2px' }}>{order.email}</div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <IoCalendar size={12} style={{ color: textMuted }} />
                                            <span style={{ fontSize: '13px', color: textSecondary }}>{order.date}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center' }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            <IoCalendar size={12} style={{ color: textMuted }} />
                                            <span
                                                style={{
                                                    fontSize: '13px',
                                                    color: textSecondary,
                                                    fontWeight: 500
                                                }}
                                            >
                                                {order.deliveryDays || 'N/A'} days
                                            </span>
                                        </div>
                                    </td>
                                    <td
                                        style={{
                                            padding: "16px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "4px",
                                                padding: "4px 12px",
                                                borderRadius: "20px",
                                                fontSize: "11px",
                                                fontWeight: 600,
                                                background: status.bg,
                                                color: status.color,
                                            }}
                                        >
                                            {status.icon}
                                            {status.label}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center' }}>
                                        <span
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '11px',
                                                fontWeight: 600,
                                                background: paymentStatus.bg,
                                                color: paymentStatus.color
                                            }}
                                        >
                                            {paymentStatus.label}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center' }}>
                                        <span style={{ fontWeight: 700, color: primaryColor, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                            <IoWallet size={12} />
                                            ₹{order.total.toLocaleString()}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button onClick={() => handleViewOrder(order)} style={{ background: isDark ? 'rgba(59, 130, 246, 0.1)' : '#DBEAFE', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', color: '#3B82F6', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', transition: 'all 0.2s' }} title="View Order"><IoEye size={16} /></button>
                                            <button onClick={() => handleEditOrder(order)} style={{ background: primaryLight, border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', color: primaryColor, display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', transition: 'all 0.2s' }} title="Edit Order"><IoCreate size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {currentOrders.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px', color: textSecondary }}>
                        <IoCube size={48} style={{ opacity: 0.5, marginBottom: '16px' }} />
                        <p>No orders found</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ fontSize: '14px', color: textSecondary }}>Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} entries</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} style={{ padding: '8px 12px', background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: textColor, display: 'flex', alignItems: 'center', gap: '4px', opacity: currentPage === 1 ? 0.5 : 1 }}>
                            <IoChevronBack size={16} /> Previous
                        </button>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                return (
                                    <button key={i} onClick={() => setCurrentPage(pageNum)} style={{ padding: '8px 14px', background: currentPage === pageNum ? primaryGradient : cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', cursor: 'pointer', color: currentPage === pageNum ? '#FFFFFF' : textColor, fontWeight: currentPage === pageNum ? 600 : 400 }}>
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} style={{ padding: '8px 12px', background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: textColor, display: 'flex', alignItems: 'center', gap: '4px', opacity: currentPage === totalPages ? 0.5 : 1 }}>
                            Next <IoChevronForward size={16} />
                        </button>
                    </div>
                </div>
            )}

            {
                selectedViewOrder && (
                    <OrderViewModal
                        order={selectedViewOrder}
                        onClose={() =>
                            setSelectedViewOrder(null)
                        }
                    />
                )
            }


            <UpdateOrderModal
                isOpen={isEditModalOpen}
                order={selectedEditOrder}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedEditOrder(null);
                }}
                onSave={updateOrder}
                refreshOrders={fetchOrders}
            />

        </div>
    );
}