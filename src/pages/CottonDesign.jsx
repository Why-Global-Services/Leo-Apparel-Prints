import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { IoAdd, IoChevronBack, IoChevronForward, IoClose, IoCloudUpload, IoCreate, IoEye, IoRefresh, IoShirtOutline, IoTrash } from "react-icons/io5";
import { createCottonDesign, deleteCottonDesign, getCottonDesigns, updateCottonDesign, updateCottonDesignStatus } from "../services/cottonDesign";

const IMAGE_MAX_MB = 20;
const APPAREL_OPTIONS = ["Mens Polo T-Shirts", "Mens Half Sleeve", "Mens Full Sleeve"];
const INITIAL_FORM = { name: "", designType: "OUR_DESIGN", apparel: "", baseColor: "", isActive: true };
const getImage = (design, side) => design?.[`${side}Image`] || design?.images?.[side] || "";
const getItems = (response) => {
  const data = response?.data?.data || response?.data?.designs || response?.data || [];
  return Array.isArray(data) ? data : [];
};
const designTypeLabel = (type) => type === "UPLOAD_DESIGN" ? "Upload Design" : "Our Design";

export default function CottonDesign() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("OUR_DESIGN");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApparel, setSelectedApparel] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [editingDesign, setEditingDesign] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontImagePreview, setFrontImagePreview] = useState("");
  const [backImagePreview, setBackImagePreview] = useState("");
  const frontImageInputRef = useRef(null);
  const backImageInputRef = useRef(null);
  const itemsPerPage = 10;

  const fetchDesigns = async () => {
    setLoading(true);
    try { setDesigns(getItems(await getCottonDesigns())); }
    catch (error) { setDesigns([]); toast.error(error?.response?.data?.message || "Failed to load designs"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDesigns(); }, []);

  const filteredDesigns = useMemo(() => designs.filter((design) => {
    const matchesName = design.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesApparel = selectedApparel === "ALL" || design.apparel === selectedApparel;
    const matchesStatus = statusFilter === "ALL" || (statusFilter === "ACTIVE" ? design.isActive : !design.isActive);
    return design.designType === activeTab && matchesName && matchesApparel && matchesStatus;
  }), [designs, activeTab, searchTerm, selectedApparel, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredDesigns.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDesigns = filteredDesigns.slice(startIndex, startIndex + itemsPerPage);

  const clearImages = () => {
    if (frontImagePreview.startsWith("blob:")) URL.revokeObjectURL(frontImagePreview);
    if (backImagePreview.startsWith("blob:")) URL.revokeObjectURL(backImagePreview);
    setFrontImage(null); setBackImage(null); setFrontImagePreview(""); setBackImagePreview("");
    if (frontImageInputRef.current) frontImageInputRef.current.value = "";
    if (backImageInputRef.current) backImageInputRef.current.value = "";
  };
  const closeModal = () => { clearImages(); setFormData(INITIAL_FORM); setEditingDesign(null); setShowModal(false); };
  const openAdd = () => { closeModal(); setFormData({ ...INITIAL_FORM, designType: activeTab }); setShowModal(true); };
  const openEdit = (design) => {
    clearImages(); setEditingDesign(design);
    setFormData({ name: design.name || "", designType: design.designType || "OUR_DESIGN", apparel: design.apparel || "", baseColor: design.baseColor || "", isActive: design.isActive !== false });
    setFrontImagePreview(getImage(design, "front")); setBackImagePreview(getImage(design, "back")); setShowModal(true);
  };
  const setField = (key, value) => setFormData((previous) => ({ ...previous, [key]: value }));
  const handleImageChange = (event, side) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select a valid image file"); return; }
    if (file.size > IMAGE_MAX_MB * 1024 * 1024) { toast.error(`Images must be under ${IMAGE_MAX_MB}MB`); return; }
    const preview = URL.createObjectURL(file);
    if (side === "front") { setFrontImage(file); setFrontImagePreview(preview); } else { setBackImage(file); setBackImagePreview(preview); }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.apparel) { toast.error("Name and apparel are required"); return; }
    if (formData.designType === "UPLOAD_DESIGN" && !formData.baseColor.trim()) { toast.error("Base color is required for upload design"); return; }
    if (!editingDesign && (!frontImage || !backImage)) { toast.error("Front and back images are required"); return; }
    const data = new FormData();
    data.append("name", formData.name.trim()); data.append("designType", formData.designType); data.append("apparel", formData.apparel); data.append("baseColor", formData.baseColor.trim()); data.append("isActive", String(formData.isActive));
    if (frontImage) data.append("frontImage", frontImage); if (backImage) data.append("backImage", backImage);
    setUploading(true);
    try { if (editingDesign) await updateCottonDesign(editingDesign._id, data); else await createCottonDesign(data); toast.success(editingDesign ? "Design updated successfully" : "Design created successfully"); closeModal(); await fetchDesigns(); }
    catch (error) { toast.error(error?.response?.data?.message || "Failed to save design"); }
    finally { setUploading(false); }
  };
  const handleDelete = async (design) => {
    if (!window.confirm(`Are you sure you want to delete "${design.name}"?`)) return;
    try { await deleteCottonDesign(design._id); toast.success("Design deleted successfully"); await fetchDesigns(); }
    catch (error) { toast.error(error?.response?.data?.message || "Failed to delete design"); }
  };
  const handleStatusToggle = async (design) => {
    try { await updateCottonDesignStatus(design._id, !design.isActive); setDesigns((items) => items.map((item) => item._id === design._id ? { ...item, isActive: !design.isActive } : item)); }
    catch (error) { toast.error(error?.response?.data?.message || "Failed to update status"); }
  };
  const changeTab = (tab) => { setActiveTab(tab); setSearchTerm(""); setSelectedApparel("ALL"); setStatusFilter("ALL"); setCurrentPage(1); };
  const colors = { bg: "#F8FAFC", card: "#FFFFFF", border: "#E2E8F0", text: "#0F172A", secondary: "#475569", muted: "#64748B" };
  const inputStyle = { width: "100%", padding: "10px 12px", border: `1px solid ${colors.border}`, borderRadius: "8px", background: colors.card, color: colors.text, boxSizing: "border-box" };
  const buttonStyle = { border: "none", borderRadius: "9px", padding: "10px 16px", cursor: "pointer", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "7px" };

  return <div style={{ padding: "24px", background: colors.bg, minHeight: "100vh" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}><div><div style={{ color: colors.muted, fontSize: "12px" }}><IoShirtOutline /> Custom Tees</div><h1 style={{ margin: "6px 0", color: colors.text, fontSize: "28px" }}>Cotton Tee Designs</h1><p style={{ margin: 0, color: colors.secondary }}>Manage printed designs and base jerseys.</p></div><div style={{ display: "flex", gap: "10px" }}><button onClick={fetchDesigns} disabled={loading} style={{ ...buttonStyle, background: colors.card, color: colors.secondary, border: `1px solid ${colors.border}` }}><IoRefresh /> Refresh</button><button onClick={openAdd} style={{ ...buttonStyle, background: "linear-gradient(135deg, #F5B800, #E8960A)", color: "#09185b" }}><IoAdd /> Add Design</button></div></div>
    <div style={{ display: "flex", gap: "6px", maxWidth: "560px", padding: "6px", marginBottom: "18px", background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "12px" }}><TabButton active={activeTab === "OUR_DESIGN"} onClick={() => changeTab("OUR_DESIGN")}>Our Designs</TabButton><TabButton active={activeTab === "UPLOAD_DESIGN"} onClick={() => changeTab("UPLOAD_DESIGN")}>Upload Design</TabButton></div>
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", padding: "14px", marginBottom: "18px", background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "12px" }}><input value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); setCurrentPage(1); }} placeholder="Search design..." style={{ ...inputStyle, flex: "1 1 220px" }} /><select value={selectedApparel} onChange={(event) => { setSelectedApparel(event.target.value); setCurrentPage(1); }} style={{ ...inputStyle, width: "220px" }}><option value="ALL">All Apparel</option>{APPAREL_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}</select><select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setCurrentPage(1); }} style={{ ...inputStyle, width: "150px" }}><option value="ALL">All Status</option><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option></select></div>
    <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "14px", overflowX: "auto" }}>{loading ? <div style={{ padding: "70px", textAlign: "center", color: colors.secondary }}>Loading designs...</div> : <table style={{ width: "100%", minWidth: "900px", borderCollapse: "collapse" }}><thead><tr style={{ background: "#F1F5F9" }}>{["S.No", "Image", "Name", "Design Type", "Apparel", "Base Color", "Status", "Actions"].map((item) => <th key={item} style={thStyle}>{item}</th>)}</tr></thead><tbody>{currentDesigns.map((design, index) => <tr key={design._id} style={{ borderTop: `1px solid ${colors.border}` }}><td style={tdStyle}>{startIndex + index + 1}</td><td style={tdStyle}><img src={getImage(design, "front")} alt={design.name} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "7px" }} /></td><td style={{ ...tdStyle, color: colors.text, fontWeight: 700 }}>{design.name}</td><td style={tdStyle}>{designTypeLabel(design.designType)}</td><td style={tdStyle}>{design.apparel || "-"}</td><td style={tdStyle}>{design.baseColor || "-"}</td><td style={tdStyle}><button onClick={() => handleStatusToggle(design)} style={{ ...buttonStyle, padding: "5px 10px", borderRadius: "20px", background: design.isActive ? "#D1FAE5" : "#FEE2E2", color: design.isActive ? "#047857" : "#B91C1C" }}>{design.isActive ? "Active" : "Inactive"}</button></td><td style={tdStyle}><div style={{ display: "flex", gap: "6px" }}><ActionButton title="View" onClick={() => setSelectedDesign(design)} color="#2563EB"><IoEye /></ActionButton><ActionButton title="Edit" onClick={() => openEdit(design)} color="#B45309"><IoCreate /></ActionButton><ActionButton title="Delete" onClick={() => handleDelete(design)} color="#DC2626"><IoTrash /></ActionButton></div></td></tr>)}</tbody></table>}{!loading && currentDesigns.length === 0 && <div style={{ padding: "60px", textAlign: "center", color: colors.secondary }}>No designs found</div>}</div>
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "8px", marginTop: "18px" }}><button disabled={currentPage === 1} onClick={() => setCurrentPage((value) => value - 1)} style={buttonStyle}><IoChevronBack /> Prev</button><span style={{ color: colors.secondary }}>Page {currentPage} of {totalPages}</span><button disabled={currentPage === totalPages} onClick={() => setCurrentPage((value) => value + 1)} style={buttonStyle}>Next <IoChevronForward /></button></div>
    {showModal && <div style={overlayStyle}><form onSubmit={handleSubmit} style={modalStyle}><div style={headerStyle}><h2 style={{ margin: 0 }}>{editingDesign ? "Edit Design" : "Add Cotton Tee Design"}</h2><button type="button" onClick={closeModal} disabled={uploading} style={closeButtonStyle}><IoClose /></button></div><div style={{ padding: "22px", overflowY: "auto" }}><div style={gridStyle}><Field label="Name *"><input value={formData.name} onChange={(event) => setField("name", event.target.value)} style={inputStyle} /></Field><Field label="Design Type *"><select value={formData.designType} onChange={(event) => setField("designType", event.target.value)} style={inputStyle}><option value="OUR_DESIGN">Our Design</option><option value="UPLOAD_DESIGN">Upload Design</option></select></Field><Field label="Apparel *"><select value={formData.apparel} onChange={(event) => setField("apparel", event.target.value)} style={inputStyle}><option value="">Select Apparel</option>{APPAREL_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}</select></Field>{formData.designType === "UPLOAD_DESIGN" && <Field label="Base Color *"><input value={formData.baseColor} onChange={(event) => setField("baseColor", event.target.value)} placeholder="Black" style={inputStyle} /></Field>}</div><div style={{ ...gridStyle, marginTop: "20px" }}><ImageUpload label="Front Image *" preview={frontImagePreview} inputRef={frontImageInputRef} onChange={(event) => handleImageChange(event, "front")} /><ImageUpload label="Back Image *" preview={backImagePreview} inputRef={backImageInputRef} onChange={(event) => handleImageChange(event, "back")} /></div><label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "18px", color: colors.secondary }}><input type="checkbox" checked={formData.isActive} onChange={(event) => setField("isActive", event.target.checked)} /> Active</label></div><div style={footerStyle}><button type="button" onClick={closeModal} disabled={uploading} style={buttonStyle}>Cancel</button><button type="submit" disabled={uploading} style={{ ...buttonStyle, background: "linear-gradient(135deg, #F5B800, #E8960A)", color: "#09185b" }}>{uploading ? "Saving..." : editingDesign ? "Update Design" : "Create Design"}</button></div></form></div>}
    {selectedDesign && <div style={overlayStyle} onClick={() => setSelectedDesign(null)}><div onClick={(event) => event.stopPropagation()} style={{ ...modalStyle, maxWidth: "760px" }}><div style={headerStyle}><h2 style={{ margin: 0 }}>{selectedDesign.name}</h2><button onClick={() => setSelectedDesign(null)} style={closeButtonStyle}><IoClose /></button></div><div style={{ padding: "22px" }}><p><strong>Design Type:</strong> {designTypeLabel(selectedDesign.designType)}</p><p><strong>Apparel:</strong> {selectedDesign.apparel}</p><p><strong>Base Color:</strong> {selectedDesign.baseColor || "Not Applicable"}</p><p><strong>Status:</strong> {selectedDesign.isActive ? "Active" : "Inactive"}</p><div style={gridStyle}><img src={getImage(selectedDesign, "front")} alt="Front" style={previewStyle} /><img src={getImage(selectedDesign, "back")} alt="Back" style={previewStyle} /></div></div></div></div>}
  </div>;
}

function Field({ label, children }) { return <div><label style={labelStyle}>{label}</label>{children}</div>; }
function TabButton({ active, onClick, children }) { return <button type="button" onClick={onClick} style={{ flex: 1, border: "none", borderRadius: "9px", padding: "11px", cursor: "pointer", background: active ? "linear-gradient(135deg, #F5B800, #E8960A)" : "transparent", fontWeight: 700 }}>{children}</button>; }
function ActionButton({ title, onClick, color, children }) { return <button type="button" title={title} onClick={onClick} style={{ border: `1px solid ${color}33`, background: `${color}12`, color, borderRadius: "7px", padding: "7px", cursor: "pointer" }}>{children}</button>; }
function ImageUpload({ label, preview, inputRef, onChange }) { return <div><label style={labelStyle}>{label}</label><input ref={inputRef} type="file" accept="image/*" onChange={onChange} style={{ display: "none" }} />{preview ? <img src={preview} alt={label} style={previewStyle} /> : <button type="button" onClick={() => inputRef.current?.click()} style={uploadStyle}><IoCloudUpload size={28} /><span>Upload image</span></button>}</div>; }

const thStyle = { padding: "13px", textAlign: "left", color: "#64748B", fontSize: "11px", textTransform: "uppercase", whiteSpace: "nowrap" };
const tdStyle = { padding: "12px 13px", color: "#475569", verticalAlign: "middle" };
const overlayStyle = { position: "fixed", inset: 0, zIndex: 1000, background: "rgba(15,23,42,.68)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" };
const modalStyle = { width: "min(760px, 100%)", maxHeight: "92vh", overflow: "hidden", background: "#FFFFFF", borderRadius: "16px", boxShadow: "0 25px 70px rgba(0,0,0,.3)" };
const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: "1px solid #E2E8F0", color: "#0F172A" };
const footerStyle = { display: "flex", justifyContent: "flex-end", gap: "10px", padding: "16px 22px", borderTop: "1px solid #E2E8F0" };
const closeButtonStyle = { border: "none", background: "transparent", fontSize: "20px", cursor: "pointer", color: "#475569" };
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px" };
const previewStyle = { width: "100%", height: "220px", objectFit: "contain", background: "#F8FAFC", borderRadius: "10px" };
const uploadStyle = { width: "100%", height: "220px", border: "2px dashed #CBD5E1", borderRadius: "10px", background: "#F8FAFC", color: "#64748B", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" };
const labelStyle = { display: "block", marginBottom: "6px", color: "#475569", fontSize: "12px", fontWeight: 700, textTransform: "uppercase" };
