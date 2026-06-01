// components/Admin/CustomizationList.jsx
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance"; // Adjust path as needed
import {
    IoEye,
    IoTrash,
    IoCheckmarkCircle,
    IoCloseCircle,
    IoTime,
    IoSearch,
    IoChevronBack,
    IoChevronForward
} from "react-icons/io5";

const TABS = [
    { value: 'all', label: 'All', count: 0 },
    { value: 'Pending', label: 'Pending', count: 0 },
    { value: 'Approved', label: 'Approved', count: 0 },
    { value: 'Rejected', label: 'Rejected', count: 0 },
];

export default function Customizationlist() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [customizations, setCustomizations] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });

    const itemsPerPage = 10;

    // Fetch real data from backend
    const fetchCustomizations = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/getallcustomize', {
                params: {
                    page: currentPage,
                    limit: itemsPerPage
                }
            });

            console.log('API Response:', response.data);

            if (response.data.success) {
                // Transform backend data to match component format
                const transformedData = response.data.data.map((item) => ({
                    id: item._id,
                    user: item.userData?.name || 'Guest User',
                    email: item.userData?.email || 'No email',
                    product: item.productData?.name || 'Unknown Product',
                    zone: getPrintZone(item.customization),
                    status: item.status || 'Pending', // Add status field to your schema
                    date: new Date(item.createdAt).toLocaleDateString('en-CA'),
                    price: item.productData?.finalPrice || 0,
                    customizations: item.customization || [],
                    productData: item.productData,
                    userData: item.userData,
                    createdAt: item.createdAt,
                    customizationCount: item.customization?.length || 0
                }));

                setCustomizations(transformedData);
                setPagination({
                    currentPage: response.data.pagination.currentPage,
                    totalPages: response.data.pagination.totalPages,
                    totalItems: response.data.pagination.totalItems,
                    itemsPerPage: response.data.pagination.itemsPerPage
                });
            }
        } catch (error) {
            console.error('Error fetching customizations:', error);
            alert('Failed to fetch customizations. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    // Helper function to extract print zone from customizations
    const getPrintZone = (customizations) => {
        if (!customizations || customizations.length === 0) return 'N/A';
        const zoneField = customizations.find(c => c.zoneKey);
        if (zoneField && zoneField.zoneKey) {
            return zoneField.zoneKey.charAt(0).toUpperCase() + zoneField.zoneKey.slice(1);
        }
        return 'Front';
    };

    useEffect(() => {
        fetchCustomizations();
    }, [currentPage]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            // Update local state optimistically
            setCustomizations(prev => prev.map(item =>
                item.id === id ? { ...item, status: newStatus } : item
            ));

            // You can implement API call here
            // const response = await axiosInstance.put(`/customization/${id}/status`, { status: newStatus });

            alert(`Status changed to ${newStatus}`);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
            fetchCustomizations(); // Refresh to revert optimistic update
        }
    };

    const handleDelete = async (id, userName) => {
        if (window.confirm(`Are you sure you want to delete customization request from "${userName}"?`)) {
            try {
                // Implement delete API call
                // const response = await axiosInstance.delete(`/customization/${id}`);

                // Remove from local state
                setCustomizations(prev => prev.filter(item => item.id !== id));
                alert("Customization request deleted successfully!");
            } catch (error) {
                console.error('Error deleting:', error);
                alert("Failed to delete customization");
            }
        }
    };

    const handleView = (customization) => {
        // Create formatted details message
        const customizationDetails = customization.customizations.map((c, i) =>
            `${i + 1}. ${c.fieldName || c.zoneKey}: ${c.value}`
        ).join('\n');

        const details = `📦 CUSTOMIZATION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━

👤 Customer: ${customization.user}
📧 Email: ${customization.email}

🛍️ Product: ${customization.product}
💰 Price: ₹${customization.price}
📍 Zone: ${customization.zone}

⚙️ Customizations (${customization.customizationCount}):
${customizationDetails || '   No customizations'}

📅 Created: ${new Date(customization.createdAt).toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━`;

        alert(details);
    };

    // Calculate tab counts based on current data
    const getTabCounts = () => {
        return {
            all: customizations.length,
            Pending: customizations.filter(c => c.status === 'Pending').length,
            Approved: customizations.filter(c => c.status === 'Approved').length,
            Rejected: customizations.filter(c => c.status === 'Rejected').length
        };
    };

    const tabCounts = getTabCounts();

    // Filter customizations
    const filteredCustomizations = customizations.filter(item => {
        const matchesTab = activeTab === 'all' || item.status === activeTab;
        const matchesSearch = item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    // Pagination for filtered results
    const totalPages = Math.ceil(filteredCustomizations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCustomizations = filteredCustomizations.slice(startIndex, endIndex);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Approved':
                return { bg: '#D1FAE5', color: '#10B981', icon: <IoCheckmarkCircle size={12} /> };
            case 'Pending':
                return { bg: '#FEF3C7', color: '#D97706', icon: <IoTime size={12} /> };
            case 'Rejected':
                return { bg: '#FEE2E2', color: '#EF4444', icon: <IoCloseCircle size={12} /> };
            default:
                return { bg: '#E5E7EB', color: '#6B7280', icon: null };
        }
    };

    // Styles (light theme only since no theme selector)
    const bgColor = '#F8FAFC';
    const cardBg = '#FFFFFF';
    const borderColor = '#E2E8F0';
    const textColor = '#0F172A';
    const textSecondary = '#64748B';
    const textMuted = '#94A3B8';
    const headerBg = '#F9FAFB';
    const rowEvenBg = '#FFFFFF';
    const rowOddBg = '#F9FAFB';
    const hoverBg = 'rgba(245, 184, 0, 0.1)';
    const activeTabBg = 'linear-gradient(135deg, #F5B800 0%, #F5B800 100%)';

    if (loading) {
        return (
            <div style={{ padding: '24px', background: bgColor, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', color: textSecondary }}>
                    <div style={{ fontSize: '18px', marginBottom: '12px' }}>Loading customizations...</div>
                    <div>Please wait while we fetch the data</div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '24px', background: bgColor, minHeight: '100vh' }}>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 700, background: 'linear-gradient(135deg, #F5B800 0%, #F5B800 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
                        Customization Requests
                    </h1>
                    <p style={{ color: textSecondary, fontSize: '14px' }}>
                        Total: {pagination.totalItems} customization requests
                    </p>
                </div>
                <div style={{ background: '#FEF3C7', padding: '8px 16px', borderRadius: '20px', color: '#F5B800', fontWeight: 600, fontSize: '14px' }}>
                    {tabCounts.Pending} Pending Requests
                </div>
            </div>

            {/* Tabs */}
            <div style={{ marginBottom: '24px', borderBottom: `1px solid ${borderColor}` }}>
                <div style={{ display: 'flex', gap: '4px', overflowX: 'auto' }}>
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => { setActiveTab(tab.value); setCurrentPage(1); }}
                            style={{
                                padding: '10px 20px',
                                background: activeTab === tab.value ? activeTabBg : 'transparent',
                                color: activeTab === tab.value ? '#FFFFFF' : textColor,
                                border: 'none',
                                borderRadius: '8px 8px 0 0',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            {tab.label}
                            <span style={{
                                background: activeTab === tab.value ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                                padding: '2px 6px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: 600
                            }}>
                                {tabCounts[tab.value] || 0}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: cardBg, padding: '12px 16px', borderRadius: '12px', border: `1px solid ${borderColor}`, maxWidth: '400px' }}>
                    <IoSearch size={20} style={{ color: textSecondary }} />
                    <input
                        type="text"
                        placeholder="Search by customer, email or product..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: textColor, fontSize: '14px' }}
                    />
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div style={{ background: cardBg, padding: '16px', borderRadius: '12px', border: `1px solid ${borderColor}` }}>
                    <div style={{ fontSize: '12px', color: textSecondary, marginBottom: '4px' }}>Total Customizations</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: textColor }}>{pagination.totalItems}</div>
                </div>
                <div style={{ background: cardBg, padding: '16px', borderRadius: '12px', border: `1px solid ${borderColor}` }}>
                    <div style={{ fontSize: '12px', color: textSecondary, marginBottom: '4px' }}>Current Page</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: textColor }}>{currentPage} / {totalPages || 1}</div>
                </div>
                <div style={{ background: cardBg, padding: '16px', borderRadius: '12px', border: `1px solid ${borderColor}` }}>
                    <div style={{ fontSize: '12px', color: textSecondary, marginBottom: '4px' }}>Unique Products</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: textColor }}>
                        {new Set(customizations.map(c => c.product)).size}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div style={{ background: cardBg, borderRadius: '16px', border: `1px solid ${borderColor}`, overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: `1px solid ${borderColor}`, background: headerBg }}>
                            <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>#</th>
                            <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Customer</th>
                            <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Product</th>
                            <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Zone</th>
                            <th style={{ textAlign: 'center', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Price</th>
                            <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Date</th>
                            <th style={{ textAlign: 'center', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Status</th>
                            <th style={{ textAlign: 'center', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCustomizations.length === 0 ? (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center', padding: '60px', color: textSecondary }}>
                                    No customization requests found
                                </td>
                            </tr>
                        ) : (
                            currentCustomizations.map((item, index) => {
                                const statusStyle = getStatusBadge(item.status);
                                return (
                                    <tr
                                        key={item.id}
                                        style={{
                                            borderBottom: `1px solid ${borderColor}`,
                                            background: index % 2 === 0 ? rowEvenBg : rowOddBg
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = hoverBg}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = index % 2 === 0 ? rowEvenBg : rowOddBg;
                                        }}
                                    >
                                        <td style={{ padding: '16px', fontSize: '14px', color: textSecondary }}>{startIndex + index + 1}</td>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ fontWeight: 500, color: textColor }}>{item.user}</div>
                                            <div style={{ fontSize: '11px', color: textMuted }}>{item.email}</div>
                                            <div style={{ fontSize: '10px', color: '#F5B800', marginTop: '2px' }}>
                                                {item.customizationCount} customization{item.customizationCount !== 1 ? 's' : ''}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px', fontSize: '14px', color: textSecondary }}>{item.product}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{ background: '#E0F2FE', color: '#0EA5E9', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 500 }}>
                                                {item.zone}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'center' }}>
                                            <span style={{ fontWeight: 700, color: '#F5B800', fontSize: '14px' }}>
                                                ₹{item.price}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px', fontSize: '13px', color: textSecondary }}>{item.date}</td>
                                        <td style={{ padding: '16px', textAlign: 'center' }}>
                                            <select
                                                value={item.status}
                                                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                                style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '6px',
                                                    fontSize: '12px',
                                                    fontWeight: 500,
                                                    border: `1px solid ${statusStyle.color}`,
                                                    background: statusStyle.bg,
                                                    color: statusStyle.color,
                                                    cursor: 'pointer',
                                                    outline: 'none'
                                                }}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                <button
                                                    onClick={() => handleView(item)}
                                                    style={{
                                                        background: '#DBEAFE',
                                                        border: 'none',
                                                        padding: '8px',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        color: '#3B82F6',
                                                        display: 'inline-flex',
                                                        alignItems: 'center'
                                                    }}
                                                    title="View Details"
                                                >
                                                    <IoEye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.user)}
                                                    style={{
                                                        background: '#FEE2E2',
                                                        border: 'none',
                                                        padding: '8px',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        color: '#EF4444',
                                                        display: 'inline-flex',
                                                        alignItems: 'center'
                                                    }}
                                                    title="Delete Request"
                                                >
                                                    <IoTrash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ fontSize: '14px', color: textSecondary }}>
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredCustomizations.length)} of {filteredCustomizations.length} entries
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            style={{
                                padding: '8px 12px',
                                background: cardBg,
                                border: `1px solid ${borderColor}`,
                                borderRadius: '8px',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                color: textColor,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                opacity: currentPage === 1 ? 0.5 : 1
                            }}
                        >
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
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(pageNum)}
                                        style={{
                                            padding: '8px 14px',
                                            background: currentPage === pageNum ? 'linear-gradient(135deg, #F5B800 0%, #F5B800 100%)' : cardBg,
                                            border: `1px solid ${borderColor}`,
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            color: currentPage === pageNum ? '#FFFFFF' : textColor,
                                            fontWeight: currentPage === pageNum ? 600 : 400
                                        }}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: '8px 12px',
                                background: cardBg,
                                border: `1px solid ${borderColor}`,
                                borderRadius: '8px',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                color: textColor,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                opacity: currentPage === totalPages ? 0.5 : 1
                            }}
                        >
                            Next <IoChevronForward size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}