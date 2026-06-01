// DashboardPage.jsx - Fixed with proper export
import { useState, useEffect } from "react";
import {
    IoStatsChart,
    IoTrendingUp,
    IoTrendingDown,
} from "react-icons/io5";
import { FiUsers, FiPackage, FiShoppingBag, FiDollarSign } from "react-icons/fi";
import { FaRegChartBar } from "react-icons/fa";

function Dashboardpage() {
    // Set theme to light mode (exact same colors as original)
    const isDark = false;

    // Define CSS variables that were missing
    const primaryColor = '#F5B800';
    const primaryGradient = 'linear-gradient(135deg, #F5B800 0%, #F5B800 100%)';
    const primaryLight = 'rgba(245, 184, 0, 0.1)';

    const stats = [
        { title: "Total Users", value: "12,543", change: "+12%", icon: <FiUsers size={24} />, color: primaryColor },
        { title: "Total Orders", value: "3,452", change: "+8%", icon: <FiShoppingBag size={24} />, color: "#3B82F6" },
        { title: "Revenue", value: "$54,239", change: "+23%", icon: <FiDollarSign size={24} />, color: "#10B981" },
        { title: "Products", value: "1,234", change: "-3%", icon: <FiPackage size={24} />, color: "#EF4444" },
    ];

    const recentOrders = [
        { id: "#12345", customer: "John Doe", product: "Premium Jersey", amount: "$129", status: "Delivered", date: "2024-01-15" },
        { id: "#12346", customer: "Jane Smith", product: "Training Shoes", amount: "$89", status: "Processing", date: "2024-01-14" },
        { id: "#12347", customer: "Mike Johnson", product: "Sports Cap", amount: "$29", status: "Shipped", date: "2024-01-14" },
        { id: "#12348", customer: "Sarah Williams", product: "Winter Jacket", amount: "$199", status: "Delivered", date: "2024-01-13" },
        { id: "#12349", customer: "Tom Brown", product: "Running Shorts", amount: "$49", status: "Pending", date: "2024-01-13" },
    ];

    const topProducts = [
        { name: "Premium Jersey", sales: 1234, revenue: "$15,987", trend: "up" },
        { name: "Training Shoes", sales: 982, revenue: "$8,764", trend: "up" },
        { name: "Sports Cap", sales: 756, revenue: "$2,186", trend: "down" },
        { name: "Winter Jacket", sales: 543, revenue: "$10,789", trend: "up" },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered": return "#10B981";
            case "Processing": return "#3B82F6";
            case "Shipped": return "#F59E0B";
            case "Pending": return "#EF4444";
            default: return "#6B7280";
        }
    };

    const getStatusBgColor = (status) => {
        switch (status) {
            case "Delivered": return isDark ? "rgba(16, 185, 129, 0.1)" : "#D1FAE5";
            case "Processing": return isDark ? "rgba(59, 130, 246, 0.1)" : "#DBEAFE";
            case "Shipped": return isDark ? "rgba(245, 158, 11, 0.1)" : "#FEF3C7";
            case "Pending": return isDark ? "rgba(239, 68, 68, 0.1)" : "#FEE2E2";
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

    return (
        <div style={{ padding: '24px' }}>
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

            {/* Welcome Section */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: isDark ? '#FFFFFF' : '#1E3A8A',
                    marginBottom: '8px'
                }}>
                    Welcome back, Admin!
                </h1>
                <p style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '14px' }}>
                    Here's what's happening with your store today.
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
            }}>
                {stats.map((stat, index) => (
                    <div key={index} style={cardStyle}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: stat.color === primaryColor
                                    ? primaryLight
                                    : isDark
                                        ? `rgba(${parseInt(stat.color.slice(1, 3), 16)}, ${parseInt(stat.color.slice(3, 5), 16)}, ${parseInt(stat.color.slice(5, 7), 16)}, 0.1)`
                                        : '#F3F4F6',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: stat.color
                            }}>
                                {stat.icon}
                            </div>
                            <span style={{
                                color: stat.change.startsWith('+') ? '#10B981' : '#EF4444',
                                fontSize: '13px',
                                fontWeight: 600,
                                background: isDark
                                    ? (stat.change.startsWith('+') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)')
                                    : (stat.change.startsWith('+') ? '#D1FAE5' : '#FEE2E2'),
                                padding: '4px 8px',
                                borderRadius: '20px'
                            }}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', color: isDark ? '#FFFFFF' : '#111827' }}>
                            {stat.value}
                        </h3>
                        <p style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '14px' }}>{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Charts and Analytics Row */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
            }}>
                {/* Revenue Chart */}
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px', color: isDark ? '#FFFFFF' : '#111827' }}>
                                Revenue Overview
                            </h3>
                            <p style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '12px' }}>Last 7 days</p>
                        </div>
                        <IoStatsChart size={24} style={{ color: primaryColor, opacity: 0.7 }} />
                    </div>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                        {[42, 58, 35, 72, 68, 85, 65].map((height, i) => (
                            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{
                                    height: `${height * 2}px`,
                                    background: primaryGradient,
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                />
                                <span style={{ fontSize: '10px', color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#9CA3AF', marginTop: '8px', display: 'block' }}>
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px', color: isDark ? '#FFFFFF' : '#111827' }}>
                                Top Products
                            </h3>
                            <p style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '12px' }}>Best selling items</p>
                        </div>
                        <FaRegChartBar size={24} style={{ color: primaryColor, opacity: 0.7 }} />
                    </div>
                    {topProducts.map((product, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 0',
                            borderBottom: i < topProducts.length - 1 ? (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E7EB') : 'none'
                        }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, marginBottom: '4px', color: isDark ? '#FFFFFF' : '#111827' }}>{product.name}</div>
                                <div style={{ fontSize: '12px', color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280' }}>{product.sales} sales</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 600, color: primaryColor }}>{product.revenue}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: product.trend === 'up' ? '#10B981' : '#EF4444' }}>
                                    {product.trend === 'up' ? <IoTrendingUp size={12} /> : <IoTrendingDown size={12} />}
                                    <span>{product.trend === 'up' ? '+12%' : '-5%'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Orders Table */}
            <div style={tableStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px', color: isDark ? '#FFFFFF' : '#111827' }}>
                            Recent Orders
                        </h3>
                        <p style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', fontSize: '12px' }}>Latest transactions</p>
                    </div>
                    <button style={{
                        background: isDark ? 'rgba(245, 184, 0, 0.1)' : primaryLight,
                        border: isDark ? '1px solid rgba(245, 184, 0, 0.3)' : `1px solid ${primaryColor}`,
                        padding: '8px 16px',
                        borderRadius: '8px',
                        color: primaryColor,
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 500,
                        transition: 'all 0.2s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.background = isDark ? 'rgba(245, 184, 0, 0.2)' : '#FDE68A'}
                        onMouseLeave={(e) => e.currentTarget.style.background = isDark ? 'rgba(245, 184, 0, 0.1)' : primaryLight}
                    >
                        View All
                    </button>
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
                        {recentOrders.map((order) => (
                            <tr key={order.id} style={{ borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #F3F4F6', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.03)' : '#F9FAFB'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <td style={{ padding: '12px', fontSize: '13px', color: isDark ? '#FFFFFF' : '#111827' }}>{order.id}</td>
                                <td style={{ padding: '12px', fontSize: '13px', color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#374151' }}>{order.customer}</td>
                                <td style={{ padding: '12px', fontSize: '13px', color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#374151' }}>{order.product}</td>
                                <td style={{ padding: '12px', fontSize: '13px', fontWeight: 600, color: primaryColor }}>{order.amount}</td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{
                                        background: getStatusBgColor(order.status),
                                        color: getStatusColor(order.status),
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '11px',
                                        fontWeight: 600
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={{ padding: '12px', fontSize: '12px', color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280' }}>{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Make sure to export default at the end
export default Dashboardpage;