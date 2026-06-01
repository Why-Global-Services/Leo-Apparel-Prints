// DesignZonePage.jsx - Complete Working Code with Dynamic Colors
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
  IoRefresh
} from "react-icons/io5";
import axiosInstance from "../api/axiosInstance";

export default function DesignZonePage() {
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [editingZone, setEditingZone] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const [designZones, setDesignZones] = useState([]);

  const [formData, setFormData] = useState({
    zoneName: "",
    zoneKey: "",
    meshNames: [],
    allowedFields: []
  });

  const [meshNames, setMeshNames] = useState(['']);
  const [allowedFields, setAllowedFields] = useState([{ fieldName: '', fieldType: 'text', label: '', required: false }]);

  // Helper function for showing messages
  const showMessage = (message, type = "success") => {
    alert(message);
  };

  useEffect(() => {
    fetchDesignZones();
  }, []);

  const fetchDesignZones = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/getDigitalZone");
      const zones = response?.data?.data || [];
      setDesignZones(zones);

    } catch (error) {
      console.error("Error fetching design zones:", error);
      showMessage(error.response?.data?.message || "Failed to load design zones", "error");
      setDesignZones([]);
    } finally {
      setLoading(false);
    }
  };

  const addMesh = () => setMeshNames([...meshNames, '']);
  const updMesh = (i, v) => {
    const a = [...meshNames];
    a[i] = v;
    setMeshNames(a);
    // Update formData as well
    setFormData(prev => ({ ...prev, meshNames: a.filter(Boolean) }));
  };

  const addField = () => setAllowedFields([...allowedFields, { fieldName: '', fieldType: 'text', label: '', required: false }]);
  const updField = (i, k, v) => {
    const a = [...allowedFields];
    a[i] = { ...a[i], [k]: v };
    setAllowedFields(a);
    // Update formData as well
    setFormData(prev => ({ ...prev, allowedFields: a }));
  };

  const resetForm = () => {
    setFormData({ zoneName: "", zoneKey: "", meshNames: [], allowedFields: [] });
    setMeshNames(['']);
    setAllowedFields([{ fieldName: '', fieldType: 'text', label: '', required: false }]);
    setEditingZone(null);
  };

  const handleSubmit = async () => {
    if (!formData.zoneName || !formData.zoneKey) {
      showMessage("Zone name and key are required", "error");
      return;
    }

    setLoading(true);

    // Use meshNames and allowedFields directly since they contain the current values
    const payload = {
      zoneName: formData.zoneName,
      zoneKey: formData.zoneKey,
      meshNames: meshNames.filter(Boolean),
      allowedFields: allowedFields.filter(f => f.fieldName).map(f => ({
        fieldName: f.fieldName,
        fieldType: f.fieldType,
        label: f.label,
        required: f.required || false
      }))
    };

    console.log("Submitting payload:", payload); // Debug log

    try {
      if (editingZone) {
        await axiosInstance.put(`/updateDigitalZone/${editingZone._id}`, payload);
        showMessage("Design zone updated successfully!", "success");
      } else {
        await axiosInstance.post("/createDigitalZone", payload);
        showMessage("Design zone created successfully!", "success");
      }

      await fetchDesignZones();
      resetForm();
      setShowModal(false);

    } catch (error) {
      console.error("Error saving design zone:", error);
      showMessage(error.response?.data?.message || "Failed to save design zone", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (zone) => {
    if (!zone) return;
    setEditingZone(zone);
    setFormData({
      zoneName: zone.zoneName || "",
      zoneKey: zone.zoneKey || "",
      meshNames: zone.meshNames || [],
      allowedFields: zone.allowedFields || []
    });
    setMeshNames(zone.meshNames && zone.meshNames.length ? zone.meshNames : ['']);

    if (zone.allowedFields && zone.allowedFields.length) {
      setAllowedFields(zone.allowedFields.map(f => ({
        fieldName: f.fieldName || '',
        fieldType: f.fieldType || 'text',
        label: f.label || '',
        required: f.required || false
      })));
    } else {
      setAllowedFields([{ fieldName: '', fieldType: 'text', label: '', required: false }]);
    }

    setShowModal(true);
  };

  const handleView = (zone) => {
    setSelectedZone(zone);
    setShowViewModal(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setLoading(true);
      try {
        await axiosInstance.delete(`/deleteDigitalZone/${id}`);
        showMessage(`"${name}" deleted successfully!`, "success");
        await fetchDesignZones();
      } catch (error) {
        console.error("Error deleting design zone:", error);
        showMessage(error.response?.data?.message || "Failed to delete design zone", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredZones = designZones.filter(zone => {
    const name = zone?.zoneName || "";
    const key = zone?.zoneKey || "";
    const search = searchTerm.toLowerCase();
    return name.toLowerCase().includes(search) || key.toLowerCase().includes(search);
  });

  const totalPages = Math.ceil(filteredZones.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentZones = filteredZones.slice(startIndex, endIndex);

  // Color scheme - using your preferred light mode colors
  const bgColor = '#ffffff';
  const cardBg = '#ffffff';
  const borderColor = '#e5e7eb';
  const textColor = '#111827';
  const textSecondary = '#6b7280';
  const textMuted = '#9ca3af';
  const inputBg = '#f9fafb';
  const headerBg = '#f9fafb';
  const rowEvenBg = '#ffffff';
  const rowOddBg = '#f9fafb';
  const hoverBg = 'rgba(245, 184, 0, 0.1)';
  const primaryColor = '#f5b800';
  const primaryGradient = 'linear-gradient(135deg, #f5b800, #ffd84d)';
  const primaryLight = 'rgba(245, 184, 0, 0.2)';

  const tableStyle = {
    background: cardBg, borderRadius: '16px', border: `1px solid ${borderColor}`, overflowX: 'auto', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
  };

  const modalOverlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.3s ease'
  };

  const modalStyle = {
    background: cardBg, borderRadius: '16px', padding: '24px', width: '90%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
  };

  return (
    <div style={{ padding: '24px', background: bgColor, minHeight: '100vh', transition: 'all 0.3s ease' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, background: primaryGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>Design Zones</h1>
          <p style={{ color: textSecondary, fontSize: '14px' }}>Manage 3D design zones for product customization</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={fetchDesignZones} disabled={loading} style={{ background: cardBg, border: `1px solid ${borderColor}`, padding: '10px 20px', borderRadius: '10px', color: textColor, fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
            <IoRefresh size={20} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button onClick={() => { resetForm(); setShowModal(true); }} style={{ background: primaryGradient, border: 'none', padding: '10px 20px', borderRadius: '10px', color: '#09185b', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <IoAdd size={20} /> Add Zone
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: cardBg, padding: '12px 16px', borderRadius: '12px', border: `1px solid ${borderColor}`, maxWidth: '400px' }}>
          <IoSearch size={20} style={{ color: textSecondary }} />
          <input type="text" placeholder="Search by name or key..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: textColor, fontSize: '14px' }} />
        </div>
      </div>

      {/* Loading State */}
      {loading && designZones.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: textSecondary }}>
          <div className="spinner"></div>
          <p>Loading design zones...</p>
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div style={tableStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${borderColor}`, background: headerBg }}>
                <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>S.no</th>
                <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Zone Name</th>
                <th style={{ textAlign: 'left', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Zone Key</th>
                <th style={{ textAlign: 'center', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Meshes</th>
                <th style={{ textAlign: 'center', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Fields</th>
                <th style={{ textAlign: 'center', padding: '16px', color: textSecondary, fontSize: '13px', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentZones.map((zone, index) => (
                <tr key={zone?._id || index} style={{ borderBottom: `1px solid ${borderColor}`, transition: 'all 0.2s', background: index % 2 === 0 ? rowEvenBg : rowOddBg }} onMouseEnter={(e) => e.currentTarget.style.background = hoverBg} onMouseLeave={(e) => { e.currentTarget.style.background = index % 2 === 0 ? rowEvenBg : rowOddBg }}>
                  <td style={{ padding: '16px', fontSize: '14px', color: textSecondary }}>{startIndex + index + 1}</td>
                  <td style={{ padding: '16px', fontSize: '14px', fontWeight: 500, color: textColor }}>{zone?.zoneName || "N/A"}</td>
                  <td style={{ padding: '16px', fontSize: '13px', color: primaryColor, fontFamily: 'monospace' }}>{zone?.zoneKey || "N/A"}</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}><span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', background: 'rgba(14, 165, 233, 0.1)', color: '#0EA5E9' }}>{zone?.meshNames?.length || 0} meshes</span></td>
                  <td style={{ padding: '16px', textAlign: 'center' }}><span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>{zone?.allowedFields?.length || 0} fields</span></td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => handleView(zone)} style={{ background: 'rgba(59, 130, 246, 0.1)', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', color: '#3B82F6', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', transition: 'all 0.2s' }} title="View Details"><IoEye size={16} /></button>
                      <button onClick={() => handleEdit(zone)} style={{ background: primaryLight, border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', color: primaryColor, display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', transition: 'all 0.2s' }} title="Edit Zone"><IoCreate size={16} /></button>
                      <button onClick={() => handleDelete(zone?._id, zone?.zoneName)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', color: '#EF4444', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', transition: 'all 0.2s' }} title="Delete Zone"><IoTrash size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentZones.length === 0 && (<div style={{ textAlign: 'center', padding: '60px', color: textSecondary }}>No design zones found</div>)}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ fontSize: '14px', color: textSecondary }}>Showing {startIndex + 1} to {Math.min(endIndex, filteredZones.length)} of {filteredZones.length} entries</div>
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
                  <button key={i} onClick={() => setCurrentPage(pageNum)} style={{ padding: '8px 14px', background: currentPage === pageNum ? primaryGradient : cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', cursor: 'pointer', color: currentPage === pageNum ? '#09185b' : textColor, fontWeight: currentPage === pageNum ? 600 : 400 }}>
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

      {/* Add/Edit Modal - Now with all options (Mesh Names & Allowed Fields) */}
      {showModal && (
        <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: textColor }}>{editingZone ? 'Edit Design Zone' : 'Add New Design Zone'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: textSecondary }}><IoClose size={24} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: textColor, fontSize: '14px', fontWeight: 500 }}>Zone Name <span style={{ color: '#EF4444' }}>*</span></label>
                <input type="text" value={formData.zoneName} onChange={(e) => setFormData({ ...formData, zoneName: e.target.value })} required placeholder="Enter zone name (e.g., Front Side)" style={{ width: '100%', padding: '12px 14px', background: inputBg, border: `1px solid ${borderColor}`, borderRadius: '8px', color: textColor, fontSize: '14px', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: textColor, fontSize: '14px', fontWeight: 500 }}>Zone Key <span style={{ color: '#EF4444' }}>*</span></label>
                <input type="text" value={formData.zoneKey} onChange={(e) => setFormData({ ...formData, zoneKey: e.target.value })} required placeholder="Enter zone key (e.g., front, back)" style={{ width: '100%', padding: '12px 14px', background: inputBg, border: `1px solid ${borderColor}`, borderRadius: '8px', color: textColor, fontSize: '14px', outline: 'none' }} />
              </div>

              {/* Mesh Names Section */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: textColor, fontSize: '14px', fontWeight: 500 }}>Mesh Names</label>
                {meshNames.map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      style={{ flex: 1, width: '100%', padding: '10px 12px', background: inputBg, border: `1px solid ${borderColor}`, borderRadius: '8px', color: textColor, fontSize: '14px', outline: 'none' }}
                      placeholder={`Mesh ${i + 1}`}
                      value={m}
                      onChange={(e) => updMesh(i, e.target.value)}
                    />
                    {meshNames.length > 1 && (
                      <button type="button" style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', color: '#EF4444' }} onClick={() => {
                        const newMeshNames = meshNames.filter((_, j) => j !== i);
                        setMeshNames(newMeshNames);
                        setFormData(prev => ({ ...prev, meshNames: newMeshNames.filter(Boolean) }));
                      }}>✕</button>
                    )}
                  </div>
                ))}
                <button type="button" style={{ background: 'transparent', border: `1px solid ${borderColor}`, padding: '6px 12px', borderRadius: '6px', color: textColor, cursor: 'pointer', marginTop: '8px' }} onClick={addMesh}>+ Add Mesh</button>
              </div>

              {/* Allowed Fields Section */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <label style={{ color: textColor, fontSize: '14px', fontWeight: 500 }}>Allowed Fields</label>
                  <button type="button" style={{ background: 'transparent', border: `1px solid ${borderColor}`, padding: '4px 12px', borderRadius: '6px', color: textColor, cursor: 'pointer', fontSize: '12px' }} onClick={addField}>+ Add Field</button>
                </div>
                {allowedFields.map((f, i) => (
                  <div key={i} style={{ background: inputBg, border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '12px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', color: textMuted }}>FIELD {i + 1}</span>
                      {allowedFields.length > 1 && (
                        <button type="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#EF4444' }} onClick={() => {
                          const newAllowedFields = allowedFields.filter((_, j) => j !== i);
                          setAllowedFields(newAllowedFields);
                          setFormData(prev => ({ ...prev, allowedFields: newAllowedFields }));
                        }}>✕</button>
                      )}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                      <input style={{ width: '100%', padding: '10px 12px', background: inputBg, border: `1px solid ${borderColor}`, borderRadius: '8px', color: textColor, fontSize: '14px', outline: 'none' }} placeholder="Field Name" value={f.fieldName} onChange={(e) => updField(i, 'fieldName', e.target.value)} />
                      <select style={{ width: '100%', padding: '10px 12px', background: inputBg, border: `1px solid ${borderColor}`, borderRadius: '8px', color: textColor, fontSize: '14px', outline: 'none', cursor: 'pointer' }} value={f.fieldType} onChange={(e) => updField(i, 'fieldType', e.target.value)}>
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="image">Image</option>
                        <option value="color">Color</option>
                      </select>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
                      <input style={{ width: '100%', padding: '10px 12px', background: inputBg, border: `1px solid ${borderColor}`, borderRadius: '8px', color: textColor, fontSize: '14px', outline: 'none' }} placeholder="Label" value={f.label} onChange={(e) => updField(i, 'label', e.target.value)} />
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: textSecondary }}>
                        <input type="checkbox" checked={f.required} onChange={(e) => updField(i, 'required', e.target.checked)} style={{ accentColor: primaryColor }} /> Required
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 20px', background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', color: textColor, cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
                <button type="submit" disabled={loading} style={{ padding: '10px 24px', background: primaryGradient, border: 'none', borderRadius: '8px', color: '#09185b', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', opacity: loading ? 0.7 : 1 }}>
                  <IoSave size={16} />{loading ? 'Saving...' : (editingZone ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal - Enhanced with detailed field information */}
      {showViewModal && selectedZone && (
        <div style={modalOverlayStyle} onClick={() => setShowViewModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: textColor }}>Zone Details</h2>
              <button onClick={() => setShowViewModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: textSecondary }}><IoClose size={24} /></button>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: textSecondary, fontSize: '12px', marginBottom: '4px', display: 'block' }}>Zone Name</label>
              <div style={{ fontSize: '16px', fontWeight: 600, color: textColor }}>{selectedZone?.zoneName || "N/A"}</div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: textSecondary, fontSize: '12px', marginBottom: '4px', display: 'block' }}>Zone Key</label>
              <div style={{ fontSize: '14px', color: primaryColor, fontFamily: 'monospace' }}>{selectedZone?.zoneKey || "N/A"}</div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: textSecondary, fontSize: '12px', marginBottom: '4px', display: 'block' }}>Mesh Names</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedZone?.meshNames?.map((mesh, idx) => (
                  <span key={idx} style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0EA5E9', padding: '4px 10px', borderRadius: '6px', fontSize: '12px' }}>{mesh}</span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: textSecondary, fontSize: '12px', marginBottom: '4px', display: 'block' }}>Allowed Fields</label>
              {selectedZone?.allowedFields?.map((field, idx) => (
                <div key={idx} style={{ background: inputBg, padding: '10px', borderRadius: '8px', marginBottom: '8px' }}>
                  <div><strong>Field Name:</strong> {field.fieldName}</div>
                  <div><strong>Type:</strong> {field.fieldType}</div>
                  <div><strong>Label:</strong> {field.label || '-'}</div>
                  <div><strong>Required:</strong> {field.required ? 'Yes' : 'No'}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: textSecondary, fontSize: '12px', marginBottom: '4px', display: 'block' }}>Status</label>
              <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, background: selectedZone?.isActive ? '#D1FAE5' : '#FEE2E2', color: selectedZone?.isActive ? '#10B981' : '#EF4444' }}>
                {selectedZone?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: textSecondary, fontSize: '12px', marginBottom: '4px', display: 'block' }}>Created Date</label>
              <div style={{ fontSize: '14px', color: textSecondary }}>{selectedZone?.createdAt ? new Date(selectedZone.createdAt).toLocaleDateString() : 'N/A'}</div>
            </div>
            <button onClick={() => setShowViewModal(false)} style={{ width: '100%', padding: '10px', background: primaryGradient, border: 'none', borderRadius: '8px', color: '#09185b', cursor: 'pointer', fontWeight: 600 }}>Close</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
        .spinner { width: 40px; height: 40px; border: 3px solid #e5e7eb; border-top-color: ${primaryColor}; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px auto; }
        * { transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease; }
        button:hover { transform: translateY(-1px); }
        button:active { transform: scale(0.95); }
      `}</style>
    </div>
  );
}