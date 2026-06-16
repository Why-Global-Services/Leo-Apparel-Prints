// DashboardPage.jsx - Fixed with proper export
import { useState, useEffect } from "react";
import {
    IoStatsChart,
    IoTrendingUp,
    IoTrendingDown,
} from "react-icons/io5";
import { FiUsers, FiPackage, FiShoppingBag, FiDollarSign } from "react-icons/fi";
import { FaRegChartBar } from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";

function Dashboardpage() {
    const isDark = false;

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Monthly");
    const [customDates, setCustomDates] = useState({ start: "", end: "" });

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                let url = `/dashboard?filter=${filter}`;
                if (filter === "Custom" && customDates.start && customDates.end) {
                    url += `&startDate=${customDates.start}&endDate=${customDates.end}`;
                } else if (filter === "Custom") {
                    setLoading(false);
                    return; // Wait for both dates to be set
                }
                const response = await axiosInstance.get(url);
                if (response.data && response.data.success !== false) {
                    const data = response.data.data || response.data;
                    setDashboardData(data);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [filter, customDates.start, customDates.end]);

    const primaryColor = '#F5B800';
    const primaryGradient = 'linear-gradient(135deg, #F5B800 0%, #F5B800 100%)';
    const primaryLight = 'rgba(245, 184, 0, 0.1)';

    const formatChange = (val) => {
        const num = parseFloat(val);
        if (isNaN(num)) return val;
        return num > 0 ? `+${num}%` : `${num}%`;
    };

    const stats = dashboardData ? [
        { title: "Total Users", value: dashboardData.userStats?.currentMonthCount?.toLocaleString() || "0", change: formatChange(dashboardData.userStats?.incrementPercentage || "0"), icon: <FiUsers size={24} />, color: primaryColor },
        { title: "Total Orders", value: dashboardData.orderStats?.currentMonthOrders?.toLocaleString() || "0", change: formatChange(dashboardData.orderStats?.increasePercentage || "0"), icon: <FiShoppingBag size={24} />, color: "#3B82F6" },
        { title: "Revenue", value: `$${parseFloat(dashboardData.revenueStats?.thistotal || 0).toLocaleString()}`, change: formatChange(dashboardData.revenueStats?.revenueIncreasePercentage || "0"), icon: <FiDollarSign size={24} />, color: "#10B981" },
        { title: "Products Sold", value: dashboardData.salesStats?.nowMonthSales?.toLocaleString() || "0", change: formatChange(dashboardData.salesStats?.salesIncrement || "0"), icon: <FiPackage size={24} />, color: "#EF4444" },
    ] : [
        { title: "Total Users", value: "...", change: "...", icon: <FiUsers size={24} />, color: primaryColor },
        { title: "Total Orders", value: "...", change: "...", icon: <FiShoppingBag size={24} />, color: "#3B82F6" },
        { title: "Revenue", value: "...", change: "...", icon: <FiDollarSign size={24} />, color: "#10B981" },
        { title: "Products Sold", value: "...", change: "...", icon: <FiPackage size={24} />, color: "#EF4444" },
    ];

    const recentOrders = dashboardData?.OrderDetails ? dashboardData.OrderDetails.map(order => {
        let customerName = "Unknown Customer";
        if (order.deliveryAddress && order.deliveryAddress.fullName) {
            customerName = order.deliveryAddress.fullName.trim();
        } else if (order.userName) {
            customerName = order.userName;
        }

        let productName = "Custom Apparel";
        if (order.orderDetails && order.orderDetails.length > 0) {
            const firstProduct = order.orderDetails[0].products?.[0];
            if (firstProduct && firstProduct.productName) {
                productName = firstProduct.productName;
                if (order.orderDetails.length > 1) {
                    productName += ` + ${order.orderDetails.length - 1} more`;
                }
            } else {
                productName = `${order.orderDetails.length} Items`;
            }
        }

        return {
            id: order.orderId || `#${(order._id || "").substring(order._id?.length - 6).toUpperCase()}`,
            customer: customerName,
            product: productName,
            amount: `$${order.totalAmount || order.totalPrice || order.orderDetails?.[0]?.finalAmount || 0}`,
            status: order.orderStatus || "Pending",
            date: order.createdAt ? new Date(order.createdAt).toISOString().split('T')[0] : "N/A"
        };
    }) : [];

    const topProducts = dashboardData?.bestSellers ? dashboardData.bestSellers.map(bs => ({
        name: bs.productInfo?.productName || "Unknown Product",
        sales: bs.totalBought || 0,
        revenue: "-",
        trend: "up"
    })) : [];

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered": case "Completed": return "#10B981";
            case "Processing": return "#3B82F6";
            case "Shipped": return "#F59E0B";
            case "Pending": case "Cancelled": return "#EF4444";
            default: return "#6B7280";
        }
    };

    const getStatusBgColor = (status) => {
        switch (status) {
            case "Delivered": case "Completed": return isDark ? "rgba(16, 185, 129, 0.1)" : "#D1FAE5";
            case "Processing": return isDark ? "rgba(59, 130, 246, 0.1)" : "#DBEAFE";
            case "Shipped": return isDark ? "rgba(245, 158, 11, 0.1)" : "#FEF3C7";
            case "Pending": case "Cancelled": return isDark ? "rgba(239, 68, 68, 0.1)" : "#FEE2E2";
            default: return isDark ? "rgba(107, 114, 128, 0.1)" : "#F3F4F6";
        }
    };

    const cardStyle = {
        background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: isDark ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E7EB',
        transition: 'all 0.3s ease'
    };

    const tableStyle = {
        background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
        borderRadius: '16px',
        padding: '20px',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E7EB',
        overflowX: 'auto'
    };

    if (loading) {
        return (
            <div style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
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

            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 700, color: isDark ? '#FFFFFF' : '#1E3A8A', marginBottom: '8px' }}>
                        Welcome back, Admin!
                    </h1>
                    <p style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '14px' }}>
                        Here's what's happening with your store today.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E7EB',
                            background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                            color: isDark ? '#FFFFFF' : '#111827',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                        <option value="Custom">Custom Date</option>
                    </select>

                    {filter === "Custom" && (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                                type="date"
                                value={customDates.start}
                                onChange={(e) => setCustomDates(prev => ({ ...prev, start: e.target.value }))}
                                style={{ padding: '8px', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                            />
                            <span>-</span>
                            <input
                                type="date"
                                value={customDates.end}
                                onChange={(e) => setCustomDates(prev => ({ ...prev, end: e.target.value }))}
                                style={{ padding: '8px', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {stats.map((stat, index) => (
                    <div key={index} style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div style={{ width: '48px', height: '48px', background: primaryLight, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                                {stat.icon}
                            </div>
                            <span style={{
                                color: String(stat.change).startsWith('-') ? '#EF4444' : '#10B981',
                                fontSize: '13px',
                                fontWeight: 600,
                                background: isDark ? (String(stat.change).startsWith('-') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)') : (String(stat.change).startsWith('-') ? '#FEE2E2' : '#D1FAE5'),
                                padding: '4px 8px',
                                borderRadius: '20px'
                            }}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', color: isDark ? '#FFFFFF' : '#111827' }}>{stat.value}</h3>
                        <p style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '14px' }}>{stat.title}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px', color: isDark ? '#FFFFFF' : '#111827' }}>Revenue Overview</h3>
                            <p style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '12px' }}>{filter} overview</p>
                        </div>
                        <IoStatsChart size={24} style={{ color: primaryColor, opacity: 0.7 }} />
                    </div>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '8px', paddingRight: '8px', overflowX: 'auto', overflowY: 'hidden', paddingBottom: '8px' }}>
                        {dashboardData?.chartData?.data ? dashboardData.chartData.data.map((amount, i) => {
                            const maxAmount = Math.max(...dashboardData.chartData.data, 1);
                            const heightPercentage = Math.max((amount / maxAmount) * 100, 2); // min 2% height
                            return (
                                <div key={i} style={{ flex: '1 0 30px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                                    <div style={{
                                        height: `${heightPercentage}%`,
                                        background: primaryGradient,
                                        borderRadius: '4px 4px 0 0',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                        title={`Revenue: $${amount}`}
                                    />
                                    <span style={{ fontSize: '10px', color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#9CA3AF', marginTop: '8px', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {dashboardData.chartData.labels[i]}
                                    </span>
                                </div>
                            );
                        }) : (
                            <p style={{ alignSelf: 'center', width: '100%', textAlign: 'center', color: '#6B7280' }}>No chart data available</p>
                        )}
                    </div>
                </div>

                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px', color: isDark ? '#FFFFFF' : '#111827' }}>Top Products</h3>
                            <p style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '12px' }}>Best selling items</p>
                        </div>
                        <FaRegChartBar size={24} style={{ color: primaryColor, opacity: 0.7 }} />
                    </div>
                    <div style={{ height: '200px', overflowY: 'auto', paddingRight: '8px' }}>
                        {topProducts.length > 0 ? topProducts.map((product, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < topProducts.length - 1 ? (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E7EB') : 'none' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, marginBottom: '4px', color: isDark ? '#FFFFFF' : '#111827' }}>{product.name}</div>
                                    <div style={{ fontSize: '12px', color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280' }}>{product.sales} sales</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 600, color: primaryColor }}>{product.revenue}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: product.trend === 'up' ? '#10B981' : '#EF4444' }}>
                                        {product.trend === 'up' ? <IoTrendingUp size={12} /> : <IoTrendingDown size={12} />}
                                        <span>{product.trend === 'up' ? 'Top' : ''}</span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <p style={{ color: '#6B7280', fontSize: '14px', textAlign: 'center', marginTop: '20px' }}>No top products available.</p>
                        )}
                    </div>
                </div>
            </div>

            <div style={tableStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px', color: isDark ? '#FFFFFF' : '#111827' }}>Recent Orders</h3>
                        <p style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '12px' }}>Latest transactions</p>
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E7EB' }}>
                            <th style={{ textAlign: 'left', padding: '12px', color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '12px', fontWeight: 500 }}>Order ID</th>
                            <th style={{ textAlign: 'left', padding: '12px', color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '12px', fontWeight: 500 }}>Customer</th>
                            <th style={{ textAlign: 'left', padding: '12px', color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '12px', fontWeight: 500 }}>Product</th>
                            <th style={{ textAlign: 'left', padding: '12px', color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '12px', fontWeight: 500 }}>Amount</th>
                            <th style={{ textAlign: 'left', padding: '12px', color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '12px', fontWeight: 500 }}>Status</th>
                            <th style={{ textAlign: 'left', padding: '12px', color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '12px', fontWeight: 500 }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.length > 0 ? recentOrders.map((order) => (
                            <tr key={order.id} style={{ borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #F3F4F6', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.03)' : '#F9FAFB'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                <td style={{ padding: '12px', fontSize: '13px', color: isDark ? '#FFFFFF' : '#111827' }}>{order.id}</td>
                                <td style={{ padding: '12px', fontSize: '13px', color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#374151' }}>{order.customer}</td>
                                <td style={{ padding: '12px', fontSize: '13px', color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#374151' }}>{order.product}</td>
                                <td style={{ padding: '12px', fontSize: '13px', fontWeight: 600, color: primaryColor }}>{order.amount}</td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{ background: getStatusBgColor(order.status), color: getStatusColor(order.status), padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>{order.status}</span>
                                </td>
                                <td style={{ padding: '12px', fontSize: '12px', color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280' }}>{order.date}</td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: '#6B7280' }}>No recent orders found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboardpage;