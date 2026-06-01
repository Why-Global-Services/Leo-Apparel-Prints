// TemplatePage.jsx - No UI Slice, No Theme, Fixed Dark Mode
import { useState, useEffect } from "react";
import { 
  IoAdd, 
  IoTrash, 
  IoCreate, 
  IoClose,
  IoSearch,
  IoChevronBack,
  IoChevronForward,
  IoEye,
  IoSave,
  IoRefresh,
  IoCheckmarkCircle,
  IoCloseCircle
} from "react-icons/io5";
import axiosInstance from "../api/axiosInstance";

export default function Templatepage() {
  // Fixed dark mode - no theme switching
  const isDark = true;
  
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  
  const [templates, setTemplates] = useState([]);
  const [availableZones, setAvailableZones] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    zones: []
  });

  // Simple alert function
  const showAlert = (message) => {
    alert(message);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchTemplates(),
      fetchZones()
    ]);
  };

  const fetchZones = async () => {
    try {
      const response = await axiosInstance.get("/getDigitalZone");
      const zones = response?.data?.data || [];
      setAvailableZones(zones.map(zone => ({
        id: zone._id,
        key: zone.zoneKey,
        name: zone.zoneName,
        allowedFields: zone.allowedFields
      })));
    } catch (error) {
      console.error("Error fetching zones:", error);
      showAlert("Failed to load zones");
    }
  };

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/gettemplate");
      const data = response?.data?.data || [];
      setTemplates(data);
     
    } catch (error) {
      console.error("Error fetching templates:", error);
      showAlert(error.response?.data?.message || "Failed to load templates");
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleZone = (zone) => {
    setFormData(prev => {
      const isSelected = prev.zones.some(z => z.zoneId === zone.id);
      if (isSelected) {
        return {
          ...prev,
          zones: prev.zones.filter(z => z.zoneId !== zone.id)
        };
      } else {
        return {
          ...prev,
          zones: [...prev.zones, { 
            zoneId: zone.id, 
            zoneKey: zone.key, 
            activeFields: [] 
          }]
        };
      }
    });
  };

  const toggleFieldForZone = (zoneId, fieldName) => {
    setFormData(prev => {
      const updatedZones = prev.zones.map(zone => {
        if (zone.zoneId === zoneId) {
          const isSelected = zone.activeFields.includes(fieldName);
          return {
            ...zone,
            activeFields: isSelected
              ? zone.activeFields.filter(f => f !== fieldName)
              : [...zone.activeFields, fieldName]
          };
        }
        return zone;
      });
      return { ...prev, zones: updatedZones };
    });
  };

  const resetForm = () => {
    setFormData({ name: "", zones: [] });
    setEditingTemplate(null);
  };

  const handleSubmit = async () => {
    if (!formData.name || formData.zones.length === 0) {
      showAlert("Template name and at least one zone are required");
      return;
    }
    
    const hasActiveFields = formData.zones.some(zone => zone.activeFields.length > 0);
    if (!hasActiveFields) {
      showAlert("At least one zone must have active fields selected");
      return;
    }
    
    setLoading(true);
    
    const payload = {
      name: formData.name,
      zones: formData.zones
    };
    
    try {
      if (editingTemplate) {
        await axiosInstance.put(`/updatetemplate/${editingTemplate._id}`, payload);
        showAlert("Template updated successfully!");
      } else {
        await axiosInstance.post("/createtemplate", payload);
        showAlert("Template created successfully!");
      }
      
      await fetchTemplates();
      resetForm();
      setShowModal(false);
      
    } catch (error) {
      console.error("Error saving template:", error);
      showAlert(error.response?.data?.message || "Failed to save template");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      zones: template.zones.map(zone => ({
        zoneId: zone.zoneId,
        zoneKey: zone.zoneKey,
        activeFields: zone.activeFields || []
      }))
    });
    setShowModal(true);
  };

  const handleView = (template) => {
    setSelectedTemplate(template);
    setShowViewModal(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setLoading(true);
      try {
        await axiosInstance.delete(`/deletetemplate/${id}`);
        showAlert(`"${name}" deleted successfully!`);
        await fetchTemplates();
      } catch (error) {
        console.error("Error deleting template:", error);
        showAlert(error.response?.data?.message || "Failed to delete template");
      } finally {
        setLoading(false);
      }
    }
  };

  const isZoneSelected = (zoneId) => {
    return formData.zones.some(z => z.zoneId === zoneId);
  };

  const getZoneDisplayName = (zoneId) => {
    const found = availableZones.find(z => z.id === zoneId);
    return found ? found.name : zoneId;
  };

  const getZoneActiveFields = (zoneId) => {
    const zone = formData.zones.find(z => z.zoneId === zoneId);
    return zone ? zone.activeFields : [];
  };

  const getFieldLabel = (fieldName) => {
    for (const zone of availableZones) {
      const found = zone.allowedFields?.find(f => f.fieldName === fieldName);
      if (found) {
        return found.label;
      }
    }
    return fieldName;
  };

  const getAllFieldsFromTemplate = (zones) => {
    const allFields = [];
    zones.forEach(zone => {
      if (zone.activeFields) {
        allFields.push(...zone.activeFields);
      }
    });
    return [...new Set(allFields)];
  };

  const filteredTemplates = templates.filter(template =>
    template.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTemplates = filteredTemplates.slice(startIndex, endIndex);

  // Fixed dark mode colors
  const bgColor = '#FFFFFF';
const cardBg = '#FFFFFF';
const borderColor = '#E2E8F0';

const textColor = '#0F172A';
const textSecondary = '#475569';
const textMuted = '#64748B';

const inputBg = '#F8FAFC';
const headerBg = '#F8FAFC';

const rowEvenBg = '#FFFFFF';
const rowOddBg = '#F8FAFC';
const hoverBg = '#FEF3C7';

const primaryColor = '#F5B800';
const primaryLight = 'rgba(245, 184, 0, 0.15)';
const primaryGradient = 'linear-gradient(135deg, #F5B800, #FFD84D)';
  const tableStyle = {
    background: cardBg, 
    borderRadius: '16px', 
    border: `1px solid ${borderColor}`, 
    overflowX: 'auto', 
    boxShadow: 'none'
  };

  const modalOverlayStyle = {
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
   background: 'rgba(15, 23, 42, 0.2)',
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    zIndex: 1000, 
    animation: 'fadeIn 0.3s ease'
  };

  const modalStyle = {
    background: cardBg, 
    borderRadius: '20px', 
    padding: '32px', 
    width: '90%', 
    maxWidth: '750px', 
    maxHeight: '90vh', 
    overflowY: 'auto', 
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
  };

  const selectedItemStyle = {
    background: primaryGradient,
    color: '#09185b',
    border: 'none',
    boxShadow: '0 2px 8px rgba(245, 184, 0, 0.3)'
  };

  const unselectedItemStyle = {
    background: inputBg,
    color: textColor,
    border: `1px solid ${borderColor}`
  };

  return (
    <div style={{ padding: '24px', background: bgColor, minHeight: '100vh' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 700, 
            background: primaryGradient, 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            marginBottom: '8px' 
          }}>
            Template Management
          </h1>
          <p style={{ color: textSecondary, fontSize: '14px' }}>Manage design templates with dynamic zones and field configurations</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={fetchTemplates} 
            disabled={loading} 
            style={{ 
              background: cardBg, 
              border: `1px solid ${borderColor}`, 
              padding: '10px 20px', 
              borderRadius: '10px', 
              color: textColor, 
              fontWeight: 600, 
              fontSize: '14px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px' 
            }}
          >
            <IoRefresh size={20} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button 
            onClick={() => { resetForm(); setShowModal(true); }} 
            style={{ 
              background: primaryGradient, 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '10px', 
              color: '#09185b', 
              fontWeight: 600, 
              fontSize: '14px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px' 
            }}
          >
            <IoAdd size={20} /> Create Template
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          background: cardBg, 
          padding: '12px 16px', 
          borderRadius: '12px', 
          border: `1px solid ${borderColor}`, 
          maxWidth: '400px' 
        }}>
          <IoSearch size={20} style={{ color: textSecondary }} />
          <input 
            type="text" 
            placeholder="Search templates..." 
            value={searchTerm} 
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
            style={{ 
              flex: 1, 
              background: 'transparent', 
              border: 'none', 
              outline: 'none', 
              color: textColor, 
              fontSize: '14px' 
            }} 
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && templates.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: textSecondary }}>
          <div className="spinner"></div>
          <p>Loading templates...</p>
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div style={tableStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${borderColor}`, background: headerBg }}>
                <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>S.no</th>
                <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Template Name</th>
                <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Zones</th>
                <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Active Fields</th>
                <th style={{ textAlign: 'center', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTemplates.map((template, index) => (
                <tr 
                  key={template._id} 
                  style={{ 
                    borderBottom: `1px solid ${borderColor}`, 
                    background: index % 2 === 0 ? rowEvenBg : rowOddBg 
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = hoverBg}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.background = index % 2 === 0 ? rowEvenBg : rowOddBg 
                  }}
                >
                  <td style={{ padding: '16px', fontSize: '14px', color: textSecondary }}>{startIndex + index + 1}</td>
                  <td style={{ padding: '16px', fontSize: '14px', fontWeight: 500, color: textColor }}>{template.name}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {template.zones?.map((zone, idx) => (
                        <span key={idx} style={{ 
                          background: 'rgba(14, 165, 233, 0.1)', 
                          color: '#0EA5E9', 
                          padding: '4px 10px', 
                          borderRadius: '6px', 
                          fontSize: '11px', 
                          fontWeight: 500, 
                          textTransform: 'capitalize' 
                        }}>
                          {getZoneDisplayName(zone.zoneId)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {getAllFieldsFromTemplate(template.zones).map((field, idx) => (
                        <span key={idx} style={{ 
                          background: 'rgba(16, 185, 129, 0.1)', 
                          color: '#10B981', 
                          padding: '4px 10px', 
                          borderRadius: '6px', 
                          fontSize: '11px', 
                          fontWeight: 500 
                        }}>
                          {getFieldLabel(field)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => handleView(template)} 
                        style={{ 
                          background: 'rgba(59, 130, 246, 0.1)', 
                          border: 'none', 
                          padding: '8px', 
                          borderRadius: '6px', 
                          cursor: 'pointer', 
                          color: '#3B82F6', 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '4px', 
                          fontSize: '12px' 
                        }} 
                        title="View Details"
                      >
                        <IoEye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEdit(template)} 
                        style={{ 
                          background: primaryLight, 
                          border: 'none', 
                          padding: '8px', 
                          borderRadius: '6px', 
                          cursor: 'pointer', 
                          color: primaryColor, 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '4px', 
                          fontSize: '12px' 
                        }} 
                        title="Edit Template"
                      >
                        <IoCreate size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(template._id, template.name)} 
                        style={{ 
                          background: 'rgba(239, 68, 68, 0.1)', 
                          border: 'none', 
                          padding: '8px', 
                          borderRadius: '6px', 
                          cursor: 'pointer', 
                          color: '#EF4444', 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '4px', 
                          fontSize: '12px' 
                        }} 
                        title="Delete Template"
                      >
                        <IoTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentTemplates.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: textSecondary }}>
              No templates found
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ fontSize: '14px', color: textSecondary }}>
            Showing {startIndex + 1} to {Math.min(endIndex, filteredTemplates.length)} of {filteredTemplates.length} entries
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
                      background: currentPage === pageNum ? primaryGradient : cardBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: currentPage === pageNum ? '#09185b' : textColor,
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

      {/* Create/Edit Modal */}
      {showModal && (
        <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: textColor }}>
                {editingTemplate ? 'Edit Template' : 'Create New Template'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: textSecondary, fontSize: '20px' }}>
                <IoClose size={24} />
              </button>
            </div>
            <div>
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: textColor, fontSize: '14px', fontWeight: 600 }}>Template Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  placeholder="e.g., PREMIUM IPL JERSEY" 
                  style={{ 
                    width: '100%', 
                    padding: '14px 16px', 
                    background: inputBg, 
                    border: `1px solid ${borderColor}`, 
                    borderRadius: '12px', 
                    color: textColor, 
                    fontSize: '15px', 
                    outline: 'none' 
                  }} 
                />
              </div>
              
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', marginBottom: '12px', color: textColor, fontSize: '14px', fontWeight: 600 }}>Select Zones (from Design Zones)</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {availableZones.map((zone) => (
                    <button 
                      key={zone.id} 
                      type="button" 
                      onClick={() => toggleZone(zone)} 
                      style={{ 
                        padding: '10px 20px', 
                        borderRadius: '10px', 
                        fontSize: '14px', 
                        fontWeight: 600, 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        textTransform: 'capitalize',
                        ...(isZoneSelected(zone.id) ? selectedItemStyle : unselectedItemStyle)
                      }}
                    >
                      {isZoneSelected(zone.id) ? <IoCheckmarkCircle size={18} /> : <IoCloseCircle size={18} />}
                      {zone.name}
                    </button>
                  ))}
                </div>
                {availableZones.length === 0 && (
                  <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '8px' }}>
                    No zones available. Please create zones in Design Zone page first.
                  </p>
                )}
                <p style={{ fontSize: '12px', color: textMuted, marginTop: '8px' }}>
                  {formData.zones.length === 0 ? '⚠️ Select at least one zone' : `✓ ${formData.zones.length} zone(s) selected`}
                </p>
              </div>

              {formData.zones.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', marginBottom: '12px', color: textColor, fontSize: '14px', fontWeight: 600 }}>Configure Active Fields for Each Zone</label>
                  {formData.zones.map((zone) => (
                    <div key={zone.zoneId} style={{ 
                      marginBottom: '20px', 
                      padding: '16px', 
                   background: '#F8FAFC',
                      borderRadius: '12px', 
                      border: `1px solid ${borderColor}` 
                    }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 600, color: primaryColor, marginBottom: '12px' }}>
                        {getZoneDisplayName(zone.zoneId)}
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '8px' }}>
                        {(() => {
                          const zoneData = availableZones.find(z => z.id === zone.zoneId);
                          return zoneData?.allowedFields?.map((field) => {
                            const isSelected = getZoneActiveFields(zone.zoneId).includes(field.fieldName);
                            return (
                              <button 
                                key={field.fieldName} 
                                type="button" 
                                onClick={() => toggleFieldForZone(zone.zoneId, field.fieldName)} 
                                style={{ 
                                  padding: '6px 12px', 
                                  borderRadius: '8px', 
                                  fontSize: '12px', 
                                  fontWeight: 500, 
                                  cursor: 'pointer', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: '6px',
                                  ...(isSelected ? selectedItemStyle : unselectedItemStyle)
                                }}
                              >
                                {isSelected ? <IoCheckmarkCircle size={14} /> : <IoCloseCircle size={14} />}
                                {field.label}
                              </button>
                            );
                          });
                        })()}
                      </div>
                      <p style={{ fontSize: '11px', color: textMuted, marginTop: '8px' }}>
                        {getZoneActiveFields(zone.zoneId).length} field(s) selected for this zone
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {(formData.name || formData.zones.length > 0) && (
                <div style={{ 
                  marginBottom: '24px', 
                  padding: '16px', 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  borderRadius: '12px', 
                  border: `1px solid ${borderColor}` 
                }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, color: textColor, marginBottom: '12px' }}>Preview</h3>
                  <div style={{ fontSize: '12px', color: textSecondary }}>
                    <div><strong>Name:</strong> {formData.name || '—'}</div>
                    <div><strong>Zones:</strong> {formData.zones.length}</div>
                    <div><strong>Total Fields:</strong> {formData.zones.reduce((sum, z) => sum + z.activeFields.length, 0)}</div>
                  </div>
                </div>
              )}

              <button 
                type="button" 
                onClick={handleSubmit} 
                disabled={loading || !formData.name || formData.zones.length === 0} 
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  background: primaryGradient, 
                  border: 'none', 
                  borderRadius: '12px', 
                  color: '#09185b', 
                  cursor: (loading || !formData.name || formData.zones.length === 0) ? 'not-allowed' : 'pointer', 
                  fontWeight: 700, 
                  fontSize: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px', 
                  opacity: (loading || !formData.name || formData.zones.length === 0) ? 0.6 : 1 
                }}
              >
                <IoSave size={20} />
                {loading ? 'Creating...' : (editingTemplate ? 'Update Template' : 'Create Template')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedTemplate && (
        <div style={modalOverlayStyle} onClick={() => setShowViewModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: textColor }}>Template Details</h2>
              <button onClick={() => setShowViewModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: textSecondary }}>
                <IoClose size={24} />
              </button>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: textSecondary, fontSize: '12px', marginBottom: '4px', display: 'block' }}>Template Name</label>
              <div style={{ fontSize: '16px', fontWeight: 600, color: textColor }}>{selectedTemplate.name}</div>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: textSecondary, fontSize: '12px', marginBottom: '4px', display: 'block' }}>Zones & Fields Configuration</label>
              {selectedTemplate.zones?.map((zone, idx) => (
                <div key={idx} style={{ marginBottom: '12px', padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 600, color: primaryColor, marginBottom: '8px' }}>{getZoneDisplayName(zone.zoneId)}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(zone.activeFields || []).map((field, fIdx) => (
                      <span key={fIdx} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 500 }}>
                        {getFieldLabel(field)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: textSecondary, fontSize: '12px', marginBottom: '4px', display: 'block' }}>Created Date</label>
              <div style={{ fontSize: '14px', color: textSecondary }}>
                {selectedTemplate.createdAt ? new Date(selectedTemplate.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
            
            <button 
              onClick={() => setShowViewModal(false)} 
              style={{ 
                width: '100%', 
                padding: '12px', 
                background: primaryGradient, 
                border: 'none', 
                borderRadius: '10px', 
                color: '#09185b', 
                cursor: 'pointer', 
                fontWeight: 600 
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
        .spinner { 
          width: 40px; 
          height: 40px; 
          border: 3px solid rgba(255, 255, 255, 0.1); 
          border-top-color: ${primaryColor}; 
          border-radius: 50%; 
          animation: spin 0.8s linear infinite; 
          margin: 0 auto 16px auto; 
        }
        button { transition: all 0.2s ease; cursor: pointer; }
        button:hover { transform: translateY(-1px); }
        button:active { transform: scale(0.98); }
      `}</style>
    </div>
  );
}