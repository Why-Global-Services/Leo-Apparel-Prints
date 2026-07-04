// import { useState, useEffect, useRef } from "react";
// import {
//   IoAdd,
//   IoTrash,
//   IoCreate,
//   IoClose,
//   IoSearch,
//   IoChevronBack,
//   IoChevronForward,
//   IoEye,
//   IoSave,
//   IoRefresh,
//   IoVideocam,
//   IoCloudUpload,
//   IoTrashBin,
//   IoFolder,
//   IoFolderOpen,
//   IoImage,
//   IoCheckmark,
//   IoAlertCircle,
//   IoDocumentAttach,
//   IoCheckmarkCircle
// } from "react-icons/io5";
// import {
//   getProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   updateProductStatus
// } from "../services/product.service";
// import axiosInstance from "../api/axiosInstance";
// import PrintZoneEditor, { DEFAULT_ZONES } from './Printzoneditor';

// // File size constants
// const GLB_MAX_MB = 5;
// const IMAGE_MAX_MB = 2;
// const GLB_MAX_BYTES = GLB_MAX_MB * 1024 * 1024;
// const IMAGE_MAX_BYTES = IMAGE_MAX_MB * 1024 * 1024;


// export default function ProductPage() {
//   // Fixed dark mode - no theme switching
//   const isDark = true;

//   const [showModal, setShowModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const itemsPerPage = 10;

//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [templates, setTemplates] = useState([]);
//   const [patterns, setPatterns] = useState([]);

//   // Separate states for front and back images
//   const [frontImage, setFrontImage] = useState(null);
//   const [backImage, setBackImage] = useState(null);
//   const [frontImagePreview, setFrontImagePreview] = useState(null);
//   const [backImagePreview, setBackImagePreview] = useState(null);
//   const [existingFrontImage, setExistingFrontImage] = useState("");
//   const [existingBackImage, setExistingBackImage] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     categoryId: "",
//     subCategoryId: "",
//     basePrice: "",
//     templates: [],
//     allowedPatterns: [],
//     isActive: true,
//      segment: "",
//   sport: "",
//   apparel: "",
//     discountType: "percentage",
//     discountValue: "",
//     customFields: [],
//     printZones: {}
//   });

//   // GLB: dedicated states
//   const [glbFile, setGlbFile] = useState(null);
//   const [glbExistingUrl, setGlbExistingUrl] = useState("");
//   const glbInputRef = useRef(null);
//   const frontImageInputRef = useRef(null);
//   const backImageInputRef = useRef(null);

//   // Simple alert function
//   const showAlert = (message) => {
//     alert(message);
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//     fetchTemplates();
//     fetchPatterns();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axiosInstance.get("/getAllCategory");
//       setCategories(response?.data?.data || []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchTemplates = async () => {
//     try {
//       const response = await axiosInstance.get("/gettemplate");
//       setTemplates(response?.data?.data || []);
//     } catch (error) {
//       console.error("Error fetching templates:", error);
//     }
//   };

//   const fetchPatterns = async () => {
//     try {
//       const response = await axiosInstance.get("/allpattern");
//       setPatterns(response?.data?.data || []);
//     } catch (error) {
//       console.error("Error fetching patterns:", error);
//       setPatterns([]);
//     }
//   };

//   const togglePattern = (patternId) => {
//     setFormData((prev) => ({
//       ...prev,
//       allowedPatterns: prev.allowedPatterns && Array.isArray(prev.allowedPatterns)
//         ? prev.allowedPatterns.includes(patternId)
//           ? prev.allowedPatterns.filter((id) => id !== patternId)
//           : [...prev.allowedPatterns, patternId]
//         : [patternId],
//     }));
//   };

//   const addCustomField = () => {
//     setFormData(prev => ({
//       ...prev,
//       customFields: [...(prev.customFields || []), {
//         id: Date.now(),
//         fieldName: '',
//         label: '',
//         fieldType: 'text',
//         x: 0,
//         y: 0,
//         width: 100,
//         height: 50,
//         side: 'front'
//       }]
//     }));
//   };

//   const updateCustomField = (index, key, value) => {
//     setFormData(prev => {
//       const cf = [...(prev.customFields || [])];
//       cf[index] = { ...cf[index], [key]: value };
//       return { ...prev, customFields: cf };
//     });
//   };

//   const removeCustomField = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       customFields: (prev.customFields || []).filter((_, i) => i !== index)
//     }));
//   };

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await getProducts();
//       setProducts(response?.data || []);

//     } catch (error) {
//       console.error("Error fetching products:", error);
//       showAlert(error.response?.data?.message || "Failed to load products");
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // GLB file handler
//   const handleGLBFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.name.toLowerCase().endsWith('.glb')) {
//       showAlert("Please select a valid .glb file");
//       if (glbInputRef.current) glbInputRef.current.value = "";
//       return;
//     }
//     if (file.size > GLB_MAX_BYTES) {
//       showAlert(`GLB file must be under ${GLB_MAX_MB}MB. "${file.name}" is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
//       if (glbInputRef.current) glbInputRef.current.value = "";
//       return;
//     }

//     showAlert(`${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB) — ready to upload!`);
//     setGlbFile(file);
//     setGlbExistingUrl("");
//   };

//   // Front Image handler
//   const handleFrontImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > IMAGE_MAX_BYTES) {
//       showAlert(`Front image must be under ${IMAGE_MAX_MB}MB. "${file.name}" is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
//       if (frontImageInputRef.current) frontImageInputRef.current.value = "";
//       return;
//     }

//     if (!file.type.startsWith('image/')) {
//       showAlert("Please select a valid image file");
//       return;
//     }

//     setFrontImage(file);
//     const preview = URL.createObjectURL(file);
//     if (frontImagePreview) URL.revokeObjectURL(frontImagePreview);
//     setFrontImagePreview(preview);
//     setExistingFrontImage("");

//     showAlert(`Front image selected: ${file.name}`);
//   };

//   // Back Image handler
//   const handleBackImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > IMAGE_MAX_BYTES) {
//       showAlert(`Back image must be under ${IMAGE_MAX_MB}MB. "${file.name}" is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
//       if (backImageInputRef.current) backImageInputRef.current.value = "";
//       return;
//     }

//     if (!file.type.startsWith('image/')) {
//       showAlert("Please select a valid image file");
//       return;
//     }

//     setBackImage(file);
//     const preview = URL.createObjectURL(file);
//     if (backImagePreview) URL.revokeObjectURL(backImagePreview);
//     setBackImagePreview(preview);
//     setExistingBackImage("");

//     showAlert(`Back image selected: ${file.name}`);
//   };

//   const removeFrontImage = () => {
//     if (frontImagePreview) URL.revokeObjectURL(frontImagePreview);
//     setFrontImage(null);
//     setFrontImagePreview(null);
//     setExistingFrontImage("");
//     if (frontImageInputRef.current) frontImageInputRef.current.value = "";
//   };

//   const removeBackImage = () => {
//     if (backImagePreview) URL.revokeObjectURL(backImagePreview);
//     setBackImage(null);
//     setBackImagePreview(null);
//     setExistingBackImage("");
//     if (backImageInputRef.current) backImageInputRef.current.value = "";
//   };

//   const removeGLBFile = () => {
//     setGlbFile(null);
//     setGlbExistingUrl("");
//     if (glbInputRef.current) glbInputRef.current.value = "";
//   };

//   const handleCategoryChange = (e) => {
//     const categoryId = e.target.value;
//     setFormData({ ...formData, categoryId, subCategoryId: "" });
//   };

//   const toggleTemplate = (templateId) => {
//     setFormData(prev => ({
//       ...prev,
//       templates: prev.templates.includes(templateId)
//         ? prev.templates.filter(id => id !== templateId)
//         : [...prev.templates, templateId]
//     }));
//   };

//   const resetForm = () => {
//     if (frontImagePreview) URL.revokeObjectURL(frontImagePreview);
//     if (backImagePreview) URL.revokeObjectURL(backImagePreview);
//     setFrontImage(null);
//     setBackImage(null);
//     setFrontImagePreview(null);
//     setBackImagePreview(null);
//     setExistingFrontImage("");
//     setExistingBackImage("");
//     setGlbFile(null);
//     setGlbExistingUrl("");
//     if (glbInputRef.current) glbInputRef.current.value = "";
//     if (frontImageInputRef.current) frontImageInputRef.current.value = "";
//     if (backImageInputRef.current) backImageInputRef.current.value = "";
//     setFormData({
//       name: "",
//       categoryId: "",
//       subCategoryId: "",
//       basePrice: "",
//       templates: [],
//       isActive: true,
//       discountType: "percentage",
//       discountValue: "",
//       allowedPatterns: [],
//       customFields: [],
//       printZones: {}
//     });
//     setEditingProduct(null);
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.categoryId) {
//       showAlert("Product name and category are required");
//       return;
//     }

//     setUploading(true);
//     try {
//       const fd = new FormData();
//       fd.append("name", formData.name);
//       fd.append("categoryId", formData.categoryId);
//       if (formData.subCategoryId) fd.append("subCategoryId", formData.subCategoryId);
//       fd.append("basePrice", formData.basePrice || 0);
//       fd.append("isActive", formData.isActive);
//       fd.append("discountType", formData.discountType);
//       fd.append("discountValue", formData.discountValue || 0);
//       formData.templates.forEach(id => fd.append("templates[]", id));
//       formData.allowedPatterns.forEach(id => fd.append("allowedPatterns[]", id));
//       fd.append('customFields', JSON.stringify(formData.customFields || []));
//       fd.append('printZones', JSON.stringify(formData.printZones || {}));
//       fd.append("segment", formData.segment);
// fd.append("sport", formData.sport);
// fd.append("apparel", formData.apparel);

//       if (glbFile) fd.append("glbFile", glbFile);
//       if (frontImage) fd.append("frontImage", frontImage);
//       if (backImage) fd.append("backImage", backImage);

//       if (editingProduct) {
//         if (glbFile || frontImage || backImage) {
//           await axiosInstance.put(`/editproducts/${editingProduct._id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
//         } else {
//           await updateProduct(editingProduct._id, {
//             name: formData.name, categoryId: formData.categoryId,
//             subCategoryId: formData.subCategoryId || null,
//             basePrice: parseFloat(formData.basePrice) || 0,
//             templates: formData.templates, isActive: formData.isActive,
//             customFields: formData.customFields
//           });
//         }
//         showAlert("Product updated successfully!");
//       } else {
//         await axiosInstance.post("/createproducts", fd, { headers: { "Content-Type": "multipart/form-data" } });
//         showAlert("Product created successfully!");
//       }

//       await fetchProducts();
//       resetForm();
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error saving product:", error);
//       showAlert(error|| "Failed to save product");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     let productTemplates = product.templates || [];
//     if (typeof productTemplates === 'string') {
//       try { productTemplates = JSON.parse(productTemplates); } catch (e) { productTemplates = []; }
//     }
//     let productCustomFields = product.customFields || [];
//     if (typeof productCustomFields === 'string') {
//       try { productCustomFields = JSON.parse(productCustomFields); } catch (e) { productCustomFields = []; }
//     }

//     setFormData({
//       name: product.name,
//       categoryId: product.categoryId,
//       subCategoryId: product.subCategoryId || "",
//       basePrice: product.basePrice,
//       templates: productTemplates,
//       allowedPatterns: Array.isArray(product.allowedPatterns) ? product.allowedPatterns : [],
//       customFields: productCustomFields.map((field, idx) => ({
//         ...field,
//         id: field.id || Date.now() + idx
//       })),
//       isActive: product.isActive,
//       discountType: product.discountType || "percentage",
//       discountValue: product.discountValue ?? "",
//       printZones: product.printZones || {}
//     });

//     // Set existing files for edit mode
//     setGlbFile(null);
//     setGlbExistingUrl(product.glbUrl || "");

//     // Set existing images
//     setFrontImage(null);
//     setBackImage(null);
//     setFrontImagePreview(null);
//     setBackImagePreview(null);
//     setExistingFrontImage(product.frontImage || "");
//     setExistingBackImage(product.backImage || "");

//     if (glbInputRef.current) glbInputRef.current.value = "";
//     if (frontImageInputRef.current) frontImageInputRef.current.value = "";
//     if (backImageInputRef.current) backImageInputRef.current.value = "";

//     setShowModal(true);
//   };

//   const handleView = (product) => { setSelectedProduct(product); setShowViewModal(true); };

//   const handleDelete = async (id, name) => {
//     if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
//       setLoading(true);
//       try {
//         await deleteProduct(id);
//         showAlert(`"${name}" deleted successfully!`);
//         await fetchProducts();
//       } catch (error) {
//         showAlert(error.response?.data?.message || "Failed to delete product");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleStatusToggle = async (product) => {
//     const newStatus = !product.isActive;
//     try {
//       await updateProductStatus(product._id, newStatus);
//       showAlert(`Product status updated to ${newStatus ? 'Active' : 'Inactive'}`);
//       await fetchProducts();
//     } catch (error) {
//       showAlert(error.response?.data?.message || "Failed to update status");
//     }
//   };

//   const filteredProducts = products.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()));
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

//   // Fixed dark mode colors
//   const bgColor = '#F8FAFC';
//   const cardBg = '#FFFFFF';
//   const borderColor = '#E2E8F0';

//   const textColor = '#0F172A';
//   const textSecondary = '#475569';
//   const textMuted = '#64748B';

//   const inputBg = '#FFFFFF';
//   const headerBg = '#F1F5F9';

//   const rowEvenBg = '#FFFFFF';
//   const rowOddBg = '#F8FAFC';

//   const hoverBg = '#FEF3C7';
//   const sectionBg = '#F8FAFC';

//   const primaryGradient = 'linear-gradient(135deg, #F5B800, #E8960A)';
//   const primaryColor = '#F5B800';
//   const primaryLight = 'rgba(245, 184, 0, 0.15)';

//   // Button styles
//   const btnDanger = { background: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.25)' };
//   const btnInfo = { background: 'rgba(59,130,246,0.12)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.25)' };
//   const btnNeutral = { background: cardBg, color: textColor, border: `1px solid ${borderColor}` };

//   const tableStyle = { background: cardBg, borderRadius: '16px', border: `1px solid ${borderColor}`, overflowX: 'auto', boxShadow: 'none' };
//   const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s ease' };

//   const inputStyle = { width: '100%', padding: '10px 12px', background: inputBg, border: `1px solid ${borderColor}`, borderRadius: '8px', color: textColor, fontSize: '14px', outline: 'none', boxSizing: 'border-box' };
//   const labelStyle = { display: 'block', marginBottom: '6px', color: textSecondary, fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' };

//   const finalPrice = () => {
//     if (!formData.discountValue || !formData.basePrice) return null;
//     const base = parseFloat(formData.basePrice);
//     const disc = parseFloat(formData.discountValue);
//     if (isNaN(base) || isNaN(disc)) return null;
//     return formData.discountType === 'percentage'
//       ? Math.max(0, base - (base * disc / 100)).toFixed(2)
//       : Math.max(0, base - disc).toFixed(2);
//   };

//   const SEGMENTS = [
//   "Custom Sportswear",
//   "Uniforms",
// ];

// const SPORTS = [
//   "Cricket",
//   "Tennis",
//   "Football",
//   "Basketball",
//   "Badminton",
// ];

// const APPAREL = [
//   "Jersey / T-Shirt",
//   "Shorts",
//   "Track Pants",
// ];

//   return (
//     <div style={{ padding: '24px', background: bgColor, minHeight: '100vh' }}>

//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
//         <div>
//           <h1 style={{ fontSize: '28px', fontWeight: 700, background: primaryGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '6px' }}>Product Management</h1>
//           <p style={{ color: textSecondary, fontSize: '14px' }}>Manage your product catalogue with 3D models and templates</p>
//         </div>
//         <div style={{ display: 'flex', gap: '10px' }}>
//           <button onClick={fetchProducts} disabled={loading} style={{ ...btnNeutral, padding: '10px 18px', borderRadius: '10px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <IoRefresh size={18} className={loading ? 'animate-spin' : ''} /> Refresh
//           </button>
//           <button onClick={() => { resetForm(); setShowModal(true); }} style={{ background: primaryGradient, border: 'none', padding: '10px 20px', borderRadius: '10px', color: '#09185b', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <IoAdd size={20} /> Add Product
//           </button>
//         </div>
//       </div>

//       {/* Search */}
//       <div style={{ marginBottom: '20px' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: cardBg, padding: '10px 14px', borderRadius: '10px', border: `1px solid ${borderColor}`, maxWidth: '380px' }}>
//           <IoSearch size={18} style={{ color: textMuted }} />
//           <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: textColor, fontSize: '14px' }} />
//         </div>
//       </div>

//       {/* Loading */}
//       {loading && products.length === 0 && (
//         <div style={{ textAlign: 'center', padding: '60px', color: textSecondary }}>
//           <div className="spinner" /><p>Loading products...</p>
//         </div>
//       )}

//       {/* Table */}
//       {!loading && (
//         <div style={tableStyle}>
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr style={{ borderBottom: `1px solid ${borderColor}`, background: headerBg }}>
//                 {['S.no', 'Product Name', 'Category', 'Subcategory', 'Base Price', 'Status', 'Actions'].map((h, i) => (
//                   <th key={i} style={{ textAlign: i >= 4 ? 'center' : 'left', padding: '14px 16px', color: textMuted, fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {currentProducts.map((product, index) => (
//                 <tr key={product._id} style={{ borderBottom: `1px solid ${borderColor}`, transition: 'background 0.15s', background: index % 2 === 0 ? rowEvenBg : rowOddBg }}
//                   onMouseEnter={e => e.currentTarget.style.background = hoverBg}
//                   onMouseLeave={e => { e.currentTarget.style.background = index % 2 === 0 ? rowEvenBg : rowOddBg; }}>
//                   <td style={{ padding: '14px 16px', fontSize: '13px', color: textMuted }}>{startIndex + index + 1}</td>
//                   <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: 500, color: textColor }}>{product.name}</td>
//                   <td style={{ padding: '14px 16px' }}>
//                     <span style={{ background: 'rgba(14,165,233,0.1)', color: '#0EA5E9', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
//                       <IoFolder size={11} />{product.categoryName || product.categoryId}
//                     </span>
//                   </td>
//                   <td style={{ padding: '14px 16px' }}>
//                     {product.subCategoryName
//                       ? <span style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IoFolderOpen size={11} />{product.subCategoryName}</span>
//                       : <span style={{ color: textMuted, fontSize: '12px' }}>—</span>}
//                   </td>
//                   <td style={{ padding: '14px 16px', textAlign: 'center' }}>
//                     <span style={{ fontWeight: 700, color: primaryColor, fontSize: '14px' }}>₹{product.basePrice}</span>
//                   </td>
//                   <td style={{ padding: '14px 16px', textAlign: 'center' }}>
//                     <button onClick={() => handleStatusToggle(product)} style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, border: 'none', cursor: 'pointer', background: product.isActive ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)', color: product.isActive ? '#10B981' : '#EF4444' }}>
//                       {product.isActive ? 'Active' : 'Inactive'}
//                     </button>
//                   </td>
//                   <td style={{ padding: '14px 16px', textAlign: 'center' }}>
//                     <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
//                       <button onClick={() => handleView(product)} title="View" style={{ ...btnInfo, padding: '7px', borderRadius: '7px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}><IoEye size={15} /></button>
//                       <button onClick={() => handleEdit(product)} title="Edit" style={{ background: primaryLight, border: 'none', padding: '7px', borderRadius: '7px', cursor: 'pointer', color: primaryColor, display: 'inline-flex', alignItems: 'center' }}><IoCreate size={15} /></button>
//                       <button onClick={() => handleDelete(product._id, product.name)} title="Delete" style={{ ...btnDanger, padding: '7px', borderRadius: '7px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}><IoTrash size={15} /></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {currentProducts.length === 0 && <div style={{ textAlign: 'center', padding: '60px', color: textSecondary }}>No products found</div>}
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '12px' }}>
//           <div style={{ fontSize: '13px', color: textSecondary }}>Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length}</div>
//           <div style={{ display: 'flex', gap: '6px' }}>
//             <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} style={{ ...btnNeutral, padding: '7px 12px', borderRadius: '8px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '4px', opacity: currentPage === 1 ? 0.4 : 1 }}><IoChevronBack size={15} /> Prev</button>
//             {[...Array(Math.min(totalPages, 5))].map((_, i) => {
//               let p = totalPages <= 5 ? i + 1 : currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i;
//               return <button key={i} onClick={() => setCurrentPage(p)} style={{ padding: '7px 13px', background: currentPage === p ? primaryGradient : cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', cursor: 'pointer', color: currentPage === p ? '#09185b' : textColor, fontWeight: currentPage === p ? 700 : 400, fontSize: '13px' }}>{p}</button>;
//             })}
//             <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} style={{ ...btnNeutral, padding: '7px 12px', borderRadius: '8px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '4px', opacity: currentPage === totalPages ? 0.4 : 1 }}>Next <IoChevronForward size={15} /></button>
//           </div>
//         </div>
//       )}

//       {/* ADD / EDIT MODAL */}
//       {showModal && (
//         <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
//           <div
//             onClick={e => e.stopPropagation()}
//             style={{
//               background: '#FFFFFF',
//               borderRadius: '20px',
//               width: '92%',
//               maxWidth: '780px',
//               maxHeight: '92vh',
//               overflowY: 'auto',
//               boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
//               border: `1px solid ${borderColor}`,
//               display: 'flex',
//               flexDirection: 'column'
//             }}>

//             {/* Modal Header */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 28px', borderBottom: `1px solid ${borderColor}`, background: 'rgba(255,255,255,0.03)', borderRadius: '20px 20px 0 0', flexShrink: 0 }}>
//               <div>
//                 <h2 style={{ fontSize: '20px', fontWeight: 700, color: textColor, margin: 0 }}>
//                   {editingProduct ? 'Edit Product' : 'Add New Product'}
//                 </h2>
//                 <p style={{ margin: '3px 0 0', fontSize: '13px', color: textMuted }}>
//                   {editingProduct ? `Editing: ${editingProduct.name}` : 'Fill in the details to create a new product'}
//                 </p>
//               </div>
//               <button onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', color: textSecondary, borderRadius: '8px', padding: '6px', display: 'flex', alignItems: 'center' }}>
//                 <IoClose size={20} />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>

//               {/* Basic Info */}
//               <SectionHeader label="Basic Information" isDark={isDark} textMuted={textMuted} />
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
//                 <div style={{ gridColumn: '1 / -1' }}>
//                   <label style={labelStyle}>Product Name <span style={{ color: '#EF4444' }}>*</span></label>
//                   <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="product name" style={inputStyle} />
//                 </div>
//                 <div>
//   <label style={labelStyle}>Segment</label>

//   <select
//     value={formData.segment}
//     onChange={(e) =>
//       setFormData({
//         ...formData,
//         segment: e.target.value,
//       })
//     }
//     style={inputStyle}
//   >
//     <option value="">Select Segment</option>

//     {SEGMENTS.map((item) => (
//       <option key={item} value={item}>
//         {item}
//       </option>
//     ))}
//   </select>
// </div>

// <div>
//   <label style={labelStyle}>Sport</label>

//   <select
//     value={formData.sport}
//     onChange={(e) =>
//       setFormData({
//         ...formData,
//         sport: e.target.value,
//       })
//     }
//     style={inputStyle}
//   >
//     <option value="">Select Sport</option>

//     {SPORTS.map((item) => (
//       <option key={item} value={item}>
//         {item}
//       </option>
//     ))}
//   </select>
// </div>

// <div>
//   <label style={labelStyle}>Apparel</label>

//   <select
//     value={formData.apparel}
//     onChange={(e) =>
//       setFormData({
//         ...formData,
//         apparel: e.target.value,
//       })
//     }
//     style={inputStyle}
//   >
//     <option value="">Select Apparel</option>

//     {APPAREL.map((item) => (
//       <option key={item} value={item}>
//         {item}
//       </option>
//     ))}
//   </select>
// </div>
//                 <div>
//                   <label style={labelStyle}>Category <span style={{ color: '#EF4444' }}>*</span></label>
//                   <select value={formData.categoryId} onChange={handleCategoryChange} style={inputStyle}>
//                     <option value="">Select Category</option>
//                     {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
//                   </select>
//                 </div>
//               </div>

//               {/* Pricing */}
//               <SectionHeader label="Pricing" isDark={isDark} textMuted={textMuted} />
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 1fr', gap: '12px', marginBottom: '8px', alignItems: 'start' }}>
//                 <div>
//                   <label style={labelStyle}>Base Price (₹)</label>
//                   <input type="number" value={formData.basePrice} onChange={e => setFormData({ ...formData, basePrice: e.target.value })} placeholder="0" style={inputStyle} />
//                 </div>
//                 <div>
//                   <label style={labelStyle}>Discount Type</label>
//                   <select value={formData.discountType} onChange={e => setFormData({ ...formData, discountType: e.target.value })} style={inputStyle}>
//                     <option value="percentage">% Off</option>
//                     <option value="amount">₹ Off</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label style={labelStyle}>Discount Value</label>
//                   <input type="number" value={formData.discountValue} onChange={e => setFormData({ ...formData, discountValue: e.target.value })} placeholder={formData.discountType === 'percentage' ? 'e.g. 20' : 'e.g. 100'} min="0" max={formData.discountType === 'percentage' ? 100 : undefined} style={inputStyle} />
//                 </div>
//               </div>
//               {finalPrice() !== null && (
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px', padding: '8px 12px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)' }}>
//                   <IoCheckmark size={14} style={{ color: '#10B981' }} />
//                   <span style={{ fontSize: '13px', color: '#10B981', fontWeight: 600 }}>Final price: ₹{finalPrice()}</span>
//                 </div>
//               )}

//               {/* Status */}
//               <SectionHeader label="Status" isDark={isDark} textMuted={textMuted} />
//               <div style={{ marginBottom: '20px' }}>
//                 <button type="button" onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
//                   style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', background: formData.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${formData.isActive ? '#10B981' : '#EF4444'}`, borderRadius: '10px', cursor: 'pointer', color: formData.isActive ? '#10B981' : '#EF4444', fontWeight: 600, fontSize: '14px' }}>
//                   <span style={{ width: '32px', height: '18px', borderRadius: '9px', background: formData.isActive ? '#10B981' : '#CBD5E1', position: 'relative', display: 'inline-block', transition: 'background 0.2s' }}>
//                     <span style={{ position: 'absolute', top: '2px', left: formData.isActive ? '16px' : '2px', width: '14px', height: '14px', borderRadius: '50%', background: '#FFF', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
//                   </span>
//                   {formData.isActive ? 'Active — visible to customers' : 'Inactive — hidden from customers'}
//                 </button>
//               </div>

//               {/* 3D Model Section */}
//               <SectionHeader label="3D Model (GLB File)" isDark={isDark} textMuted={textMuted} />
//               <div style={{ marginBottom: '20px' }}>
//                 <input ref={glbInputRef} type="file" accept=".glb" onChange={handleGLBFileChange} style={{ display: 'none' }} />
//                 {!glbFile && !glbExistingUrl && (
//                   <div onClick={() => glbInputRef.current?.click()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: `2px dashed ${borderColor}`, borderRadius: '12px', padding: '28px', cursor: 'pointer', background: inputBg }}>
//                     <IoCloudUpload size={36} style={{ color: textMuted, marginBottom: '8px' }} />
//                     <span style={{ color: textSecondary, fontSize: '14px', fontWeight: 600 }}>Upload GLB File</span>
//                     <span style={{ color: textMuted, fontSize: '12px', marginTop: '4px' }}>Max {GLB_MAX_MB}MB · .glb format only</span>
//                   </div>
//                 )}
//                 {glbFile && (
//                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(255,255,255,0.05)', border: `2px solid ${borderColor}`, borderRadius: '12px' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
//                       <div style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                         <IoDocumentAttach size={28} style={{ color: '#3B82F6' }} />
//                       </div>
//                       <div>
//                         <div style={{ fontSize: '15px', fontWeight: 600, color: textColor }}>{glbFile.name}</div>
//                         <div style={{ fontSize: '13px', color: '#3B82F6' }}>{(glbFile.size / 1024 / 1024).toFixed(2)} MB</div>
//                       </div>
//                     </div>
//                     <button type="button" onClick={removeGLBFile} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', cursor: 'pointer', color: '#EF4444' }}><IoTrashBin size={16} /> Remove</button>
//                   </div>
//                 )}
//               </div>

//               {/* Product Images */}
//               <SectionHeader label={`Product Images — max ${IMAGE_MAX_MB}MB each`} isDark={isDark} textMuted={textMuted} />

//               {/* Front Image */}
//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{ ...labelStyle, color: '#3B82F6' }}>FRONT IMAGE</label>
//                 <input ref={frontImageInputRef} type="file" accept="image/*" onChange={handleFrontImageChange} style={{ display: 'none' }} />
//                 {!frontImage && !existingFrontImage && (
//                   <div onClick={() => frontImageInputRef.current?.click()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: `2px dashed ${borderColor}`, borderRadius: '12px', padding: '24px', cursor: 'pointer', background: inputBg }}>
//                     <IoImage size={32} style={{ color: textMuted, marginBottom: '8px' }} />
//                     <span style={{ color: textSecondary, fontSize: '14px', fontWeight: 600 }}>Upload Front Image</span>
//                   </div>
//                 )}
//                 {(frontImagePreview || existingFrontImage) && (
//                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(59,130,246,0.1)', border: '2px solid rgba(59,130,246,0.3)', borderRadius: '12px' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
//                       <img src={frontImagePreview || existingFrontImage} alt="Front" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
//                       <div><div style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>{frontImage ? frontImage.name : 'Front Image'}</div></div>
//                     </div>
//                     <button type="button" onClick={removeFrontImage} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', cursor: 'pointer', color: '#EF4444' }}><IoTrashBin size={16} /> Remove</button>
//                   </div>
//                 )}
//               </div>

//               {/* Back Image */}
//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{ ...labelStyle, color: '#10B981' }}>BACK IMAGE</label>
//                 <input ref={backImageInputRef} type="file" accept="image/*" onChange={handleBackImageChange} style={{ display: 'none' }} />
//                 {!backImage && !existingBackImage && (
//                   <div onClick={() => backImageInputRef.current?.click()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: `2px dashed ${borderColor}`, borderRadius: '12px', padding: '24px', cursor: 'pointer', background: inputBg }}>
//                     <IoImage size={32} style={{ color: textMuted, marginBottom: '8px' }} />
//                     <span style={{ color: textSecondary, fontSize: '14px', fontWeight: 600 }}>Upload Back Image</span>
//                   </div>
//                 )}
//                 {(backImagePreview || existingBackImage) && (
//                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(16,185,129,0.1)', border: '2px solid rgba(16,185,129,0.3)', borderRadius: '12px' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
//                       <img src={backImagePreview || existingBackImage} alt="Back" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
//                       <div><div style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>{backImage ? backImage.name : 'Back Image'}</div></div>
//                     </div>
//                     <button type="button" onClick={removeBackImage} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', cursor: 'pointer', color: '#EF4444' }}><IoTrashBin size={16} /> Remove</button>
//                   </div>
//                 )}
//               </div>

//               {/* Templates */}
//               <SectionHeader label="Templates" isDark={isDark} textMuted={textMuted} />
//               <div style={{ marginBottom: '20px' }}>
//                 {templates.length === 0
//                   ? <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'rgba(239,68,68,0.08)', borderRadius: '8px' }}>
//                     <IoAlertCircle size={15} style={{ color: '#EF4444' }} />
//                     <span style={{ fontSize: '13px', color: '#EF4444' }}>No templates available. Please create templates first.</span>
//                   </div>
//                   : <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
//                     {templates.map(t => {
//                       const selected = formData.templates.includes(t._id);
//                       return (
//                         <button key={t._id} type="button" onClick={() => toggleTemplate(t._id)} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', background: selected ? primaryGradient : inputBg, color: selected ? '#09185b' : textColor, border: selected ? 'none' : `1px solid ${borderColor}` }}>
//                           {selected ? <IoCheckmark size={13} /> : null}{t.name}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 }
//               </div>

//               {/* Print Zones */}
//               <SectionHeader label="Print Zones (drag to position)" isDark={isDark} textMuted={textMuted} />
//               <PrintZoneEditor
//                 frontImageUrl={frontImagePreview || existingFrontImage}
//                 backImageUrl={backImagePreview || existingBackImage}
//                 zones={formData.printZones || DEFAULT_ZONES}
//                 onChange={(newZones) => setFormData(prev => ({ ...prev, printZones: newZones }))}
//               />

//               {/* Custom Fields */}
//               <SectionHeader label="Custom Fields" isDark={isDark} textMuted={textMuted} />
//               <div style={{ marginBottom: '16px' }}>
//                 {(formData.customFields || []).map((f, i) => (
//                   <div key={f.id || i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px 80px', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
//                     <input
//                       placeholder="Field name"
//                       value={f.fieldName}
//                       onChange={e => updateCustomField(i, 'fieldName', e.target.value)}
//                       style={inputStyle}
//                     />
//                     <input
//                       placeholder="Label"
//                       value={f.label}
//                       onChange={e => updateCustomField(i, 'label', e.target.value)}
//                       style={inputStyle}
//                     />
//                     <select
//                       value={f.fieldType}
//                       onChange={e => updateCustomField(i, 'fieldType', e.target.value)}
//                       style={inputStyle}
//                     >
//                       <option value="text">Text</option>
//                       <option value="logo">Logo</option>
//                       <option value="number">Number</option>
//                     </select>
//                     <div style={{ display: 'flex', gap: '6px' }}>
//                       <button
//                         type="button"
//                         onClick={() => removeCustomField(i)}
//                         style={{ ...btnDanger, padding: '8px', borderRadius: '6px', fontSize: '12px' }}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={addCustomField}
//                   style={{ background: primaryGradient, color: '#fff', padding: '8px 12px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
//                 >
//                   + Add Field
//                 </button>
//               </div>

//               {/* Patterns */}
//               <SectionHeader label="Patterns" isDark={isDark} textMuted={textMuted} />
//               <div style={{ marginBottom: "20px" }}>
//                 {patterns.length === 0 ? (
//                   <div style={{ padding: "12px", borderRadius: "8px", background: "#FEF2F2", color: "#EF4444" }}>No patterns found</div>
//                 ) : (
//                   <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: "12px" }}>
//                     {patterns.map((pattern) => {
//                       const selected = formData.allowedPatterns && Array.isArray(formData.allowedPatterns)
//                         ? formData.allowedPatterns.includes(pattern._id)
//                         : false;
//                       return (
//                         <button key={pattern._id} type="button" onClick={() => togglePattern(pattern._id)} style={{ border: selected ? "2px solid #F59E0B" : `1px solid ${borderColor}`, borderRadius: "12px", overflow: "hidden", background: cardBg, cursor: "pointer", padding: 0 }}>
//                           <img src={pattern.thumbnail} alt={pattern.name} style={{ width: "100%", height: "100px", objectFit: "cover" }} onError={(e) => { e.target.src = "https://via.placeholder.com/120x100?text=No+Image"; }} />
//                           <div style={{ padding: "8px", fontSize: "13px", fontWeight: "600", color: textColor }}>{pattern.name}</div>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div style={{ padding: '16px 28px', borderTop: `1px solid ${borderColor}`, background: 'rgba(255,255,255,0.02)', borderRadius: '0 0 20px 20px', display: 'flex', gap: '10px', justifyContent: 'flex-end', flexShrink: 0 }}>
//               <button type="button" onClick={() => setShowModal(false)} style={{ ...btnNeutral, padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>Cancel</button>
//               <button type="button" onClick={handleSubmit} disabled={uploading} style={{ background: primaryGradient, border: 'none', padding: '10px 28px', borderRadius: '10px', color: '#09185b', cursor: uploading ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', opacity: uploading ? 0.65 : 1 }}>
//                 <IoSave size={17} />
//                 {uploading ? 'Saving…' : editingProduct ? 'Update Product' : 'Create Product'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* VIEW MODAL */}
//       {showViewModal && selectedProduct && (
//         <div style={modalOverlayStyle} onClick={() => setShowViewModal(false)}>
//           <div onClick={e => e.stopPropagation()} style={{ background: '#ffffff', borderRadius: '20px', width: '92%', maxWidth: '520px', maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.6)', border: `1px solid ${borderColor}` }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: `1px solid ${borderColor}`, background: 'rgba(255,255,255,0.03)', borderRadius: '20px 20px 0 0' }}>
//               <h2 style={{ fontSize: '18px', fontWeight: 700, color: textColor, margin: 0 }}>Product Details</h2>
//               <button onClick={() => setShowViewModal(false)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', color: textSecondary, borderRadius: '8px', padding: '6px', display: 'flex', alignItems: 'center' }}><IoClose size={18} /></button>
//             </div>
//             <div style={{ padding: '20px 24px' }}>
//               <ViewRow label="Product Name" value={<span style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>{selectedProduct.name}</span>} textSecondary={textSecondary} />
//               <ViewRow label="Category" value={<span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0EA5E9' }}><IoFolder size={14} />{selectedProduct.categoryName || selectedProduct.categoryId}</span>} textSecondary={textSecondary} />
//               {selectedProduct.subCategoryName && <ViewRow label="Subcategory" value={<span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981' }}><IoFolderOpen size={14} />{selectedProduct.subCategoryName}</span>} textSecondary={textSecondary} />}
//               <ViewRow label="Base Price" value={<span style={{ fontSize: '22px', fontWeight: 800, color: primaryColor }}>₹{selectedProduct.basePrice}</span>} textSecondary={textSecondary} />
//               <ViewRow label="Status" value={<span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, background: selectedProduct.isActive ? '#D1FAE5' : '#FEE2E2', color: selectedProduct.isActive ? '#10B981' : '#EF4444' }}>{selectedProduct.isActive ? 'Active' : 'Inactive'}</span>} textSecondary={textSecondary} />
//               {selectedProduct.frontImage && (<ViewRow label="Front Image" value={<img src={selectedProduct.frontImage} alt="Front" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: `1px solid ${borderColor}` }} />} textSecondary={textSecondary} />)}
//               {selectedProduct.backImage && (<ViewRow label="Back Image" value={<img src={selectedProduct.backImage} alt="Back" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: `1px solid ${borderColor}` }} />} textSecondary={textSecondary} />)}
//               {selectedProduct.glbUrl && (<ViewRow label="3D Model" value={<a href={selectedProduct.glbUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(14,165,233,0.1)', color: '#0EA5E9', padding: '5px 12px', borderRadius: '8px', fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}><IoVideocam size={14} /> View 3D Model</a>} textSecondary={textSecondary} />)}
//               <ViewRow label="Created" value={<span style={{ color: textSecondary, fontSize: '13px' }}>{selectedProduct.createdAt ? new Date(selectedProduct.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}</span>} textSecondary={textSecondary} />
//             </div>
//             <div style={{ padding: '14px 24px', borderTop: `1px solid ${borderColor}`, display: 'flex', gap: '10px', justifyContent: 'flex-end', background: 'rgba(255,255,255,0.02)', borderRadius: '0 0 20px 20px' }}>
//               <button onClick={() => { setShowViewModal(false); handleEdit(selectedProduct); }} style={{ background: primaryLight, border: 'none', padding: '9px 18px', borderRadius: '9px', cursor: 'pointer', color: primaryColor, fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}><IoCreate size={15} /> Edit</button>
//               <button onClick={() => setShowViewModal(false)} style={{ background: primaryGradient, border: 'none', padding: '9px 22px', borderRadius: '9px', color: '#09185b', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
//         @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
//         .animate-spin { animation: spin 1s linear infinite; }
//         .spinner { width: 36px; height: 36px; border: 3px solid rgba(255,255,255,0.1); border-top-color: ${primaryColor}; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 14px; }
//         * { box-sizing: border-box; }
//       `}</style>
//     </div>
//   );
// }

// // Helper sub-components
// function SectionHeader({ label, isDark, textMuted }) {
//   return (
//     <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', marginTop: '4px' }}>
//       <span style={{ fontSize: '11px', fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{label}</span>
//       <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
//     </div>
//   );
// }

// function ViewRow({ label, value, textSecondary }) {
//   return (
//     <div style={{ marginBottom: '14px' }}>
//       <div style={{ fontSize: '11px', color: textSecondary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '5px' }}>{label}</div>
//       <div>{value}</div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
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
  IoVideocam,
  IoCloudUpload,
  IoTrashBin,
  IoFolder,
  IoFolderOpen,
  IoImage,
  IoCheckmark,
  IoAlertCircle,
  IoDocumentAttach,
  IoCheckmarkCircle
} from "react-icons/io5";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStatus
} from "../services/product.service";
import axiosInstance from "../api/axiosInstance";
import PrintZoneEditor, { DEFAULT_ZONES } from './Printzoneditor';

// File size constants
const GLB_MAX_MB = 5;
const IMAGE_MAX_MB = 2;
const GLB_MAX_BYTES = GLB_MAX_MB * 1024 * 1024;
const IMAGE_MAX_BYTES = IMAGE_MAX_MB * 1024 * 1024;

// Helper: pull the front/back image URL from a product no matter which
// shape the API returned it in (viewImages.front/back, frontImage/backImage,
// or a plain images[] array as a last resort).
const getProductFrontImage = (product) => {
  if (!product) return "";
  return (
    product.viewImages?.front ||
    product.frontImage ||
    (Array.isArray(product.images) ? product.images[0] : "") ||
    ""
  );
};

const getProductBackImage = (product) => {
  if (!product) return "";
  return (
    product.viewImages?.back ||
    product.backImage ||
    (Array.isArray(product.images) ? product.images[1] : "") ||
    ""
  );
};

export default function ProductPage() {
  // Fixed dark mode - no theme switching
  const isDark = true;

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const itemsPerPage = 10;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [patterns, setPatterns] = useState([]);

  // Separate states for front and back images
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);
  const [existingFrontImage, setExistingFrontImage] = useState("");
  const [existingBackImage, setExistingBackImage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    subCategoryId: "",
    basePrice: "",
    templates: [],
    allowedPatterns: [],
    isActive: true,
    segment: "",
    sport: "",
    apparel: "",
    discountType: "percentage",
    discountValue: "",
    customFields: [],
    printZones: {}
  });

  // GLB: dedicated states
  const [glbFile, setGlbFile] = useState(null);
  const [glbExistingUrl, setGlbExistingUrl] = useState("");
  const glbInputRef = useRef(null);
  const frontImageInputRef = useRef(null);
  const backImageInputRef = useRef(null);

  // Simple alert function
  const showAlert = (message) => {
    alert(message);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchTemplates();
    fetchPatterns();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/getAllCategory");
      setCategories(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await axiosInstance.get("/gettemplate");
      setTemplates(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const fetchPatterns = async () => {
    try {
      const response = await axiosInstance.get("/allpattern");
      setPatterns(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching patterns:", error);
      setPatterns([]);
    }
  };

  const togglePattern = (patternId) => {
    setFormData((prev) => ({
      ...prev,
      allowedPatterns: prev.allowedPatterns && Array.isArray(prev.allowedPatterns)
        ? prev.allowedPatterns.includes(patternId)
          ? prev.allowedPatterns.filter((id) => id !== patternId)
          : [...prev.allowedPatterns, patternId]
        : [patternId],
    }));
  };

  const addCustomField = () => {
    setFormData(prev => ({
      ...prev,
      customFields: [...(prev.customFields || []), {
        id: Date.now(),
        fieldName: '',
        label: '',
        fieldType: 'text',
        x: 0,
        y: 0,
        width: 100,
        height: 50,
        side: 'front'
      }]
    }));
  };

  const updateCustomField = (index, key, value) => {
    setFormData(prev => {
      const cf = [...(prev.customFields || [])];
      cf[index] = { ...cf[index], [key]: value };
      return { ...prev, customFields: cf };
    });
  };

  const removeCustomField = (index) => {
    setFormData(prev => ({
      ...prev,
      customFields: (prev.customFields || []).filter((_, i) => i !== index)
    }));
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      setProducts(response?.data || []);

    } catch (error) {
      console.error("Error fetching products:", error);
      showAlert(error.response?.data?.message || "Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // GLB file handler
  const handleGLBFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.glb')) {
      showAlert("Please select a valid .glb file");
      if (glbInputRef.current) glbInputRef.current.value = "";
      return;
    }
    if (file.size > GLB_MAX_BYTES) {
      showAlert(`GLB file must be under ${GLB_MAX_MB}MB. "${file.name}" is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      if (glbInputRef.current) glbInputRef.current.value = "";
      return;
    }

    showAlert(`${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB) — ready to upload!`);
    setGlbFile(file);
    setGlbExistingUrl("");
  };

  // Front Image handler
  const handleFrontImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > IMAGE_MAX_BYTES) {
      showAlert(`Front image must be under ${IMAGE_MAX_MB}MB. "${file.name}" is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      if (frontImageInputRef.current) frontImageInputRef.current.value = "";
      return;
    }

    if (!file.type.startsWith('image/')) {
      showAlert("Please select a valid image file");
      return;
    }

    setFrontImage(file);
    const preview = URL.createObjectURL(file);
    if (frontImagePreview) URL.revokeObjectURL(frontImagePreview);
    setFrontImagePreview(preview);
    setExistingFrontImage("");

    showAlert(`Front image selected: ${file.name}`);
  };

  // Back Image handler
  const handleBackImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > IMAGE_MAX_BYTES) {
      showAlert(`Back image must be under ${IMAGE_MAX_MB}MB. "${file.name}" is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      if (backImageInputRef.current) backImageInputRef.current.value = "";
      return;
    }

    if (!file.type.startsWith('image/')) {
      showAlert("Please select a valid image file");
      return;
    }

    setBackImage(file);
    const preview = URL.createObjectURL(file);
    if (backImagePreview) URL.revokeObjectURL(backImagePreview);
    setBackImagePreview(preview);
    setExistingBackImage("");

    showAlert(`Back image selected: ${file.name}`);
  };

  const removeFrontImage = () => {
    if (frontImagePreview) URL.revokeObjectURL(frontImagePreview);
    setFrontImage(null);
    setFrontImagePreview(null);
    setExistingFrontImage("");
    if (frontImageInputRef.current) frontImageInputRef.current.value = "";
  };

  const removeBackImage = () => {
    if (backImagePreview) URL.revokeObjectURL(backImagePreview);
    setBackImage(null);
    setBackImagePreview(null);
    setExistingBackImage("");
    if (backImageInputRef.current) backImageInputRef.current.value = "";
  };

  const removeGLBFile = () => {
    setGlbFile(null);
    setGlbExistingUrl("");
    if (glbInputRef.current) glbInputRef.current.value = "";
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, categoryId, subCategoryId: "" });
  };

  const toggleTemplate = (templateId) => {
    setFormData(prev => ({
      ...prev,
      templates: prev.templates.includes(templateId)
        ? prev.templates.filter(id => id !== templateId)
        : [...prev.templates, templateId]
    }));
  };

  const resetForm = () => {
    if (frontImagePreview) URL.revokeObjectURL(frontImagePreview);
    if (backImagePreview) URL.revokeObjectURL(backImagePreview);
    setFrontImage(null);
    setBackImage(null);
    setFrontImagePreview(null);
    setBackImagePreview(null);
    setExistingFrontImage("");
    setExistingBackImage("");
    setGlbFile(null);
    setGlbExistingUrl("");
    if (glbInputRef.current) glbInputRef.current.value = "";
    if (frontImageInputRef.current) frontImageInputRef.current.value = "";
    if (backImageInputRef.current) backImageInputRef.current.value = "";
    setFormData({
      name: "",
      categoryId: "",
      subCategoryId: "",
      basePrice: "",
      templates: [],
      isActive: true,
      segment: "",
      sport: "",
      apparel: "",
      discountType: "percentage",
      discountValue: "",
      allowedPatterns: [],
      customFields: [],
      printZones: { front: DEFAULT_ZONES.front, back: DEFAULT_ZONES.back }
    });
    setEditingProduct(null);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.categoryId) {
      showAlert("Product name and category are required");
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("categoryId", formData.categoryId);
      if (formData.subCategoryId) fd.append("subCategoryId", formData.subCategoryId);
      fd.append("basePrice", formData.basePrice || 0);
      fd.append("isActive", formData.isActive);
      fd.append("discountType", formData.discountType);
      fd.append("discountValue", formData.discountValue || 0);
      formData.templates.forEach(id => fd.append("templates[]", id));
      formData.allowedPatterns.forEach(id => fd.append("allowedPatterns[]", id));
      fd.append('customFields', JSON.stringify(formData.customFields || []));
      fd.append('printZones', JSON.stringify(formData.printZones || {}));
      fd.append("segment", formData.segment);
      fd.append("sport", formData.sport);
      fd.append("apparel", formData.apparel);

      if (glbFile) fd.append("glbFile", glbFile);
      if (frontImage) fd.append("frontImage", frontImage);
      if (backImage) fd.append("backImage", backImage);

      if (editingProduct) {
        if (glbFile || frontImage || backImage) {
          await axiosInstance.put(`/editproducts/${editingProduct._id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        } else {
          await updateProduct(editingProduct._id, {
            name: formData.name, categoryId: formData.categoryId,
            subCategoryId: formData.subCategoryId || null,
            basePrice: parseFloat(formData.basePrice) || 0,
            templates: formData.templates, isActive: formData.isActive,
            customFields: formData.customFields,
            segment: formData.segment,
            sport: formData.sport,
            apparel: formData.apparel,
            // These two were missing here, so any print-zone or pattern
            // changes made while editing (without touching an image/GLB
            // file) were silently discarded on save.
            printZones: formData.printZones || {},
            allowedPatterns: formData.allowedPatterns || [],
            discountType: formData.discountType,
            discountValue: parseFloat(formData.discountValue) || 0
          });
        }
        showAlert("Product updated successfully!");
      } else {
        await axiosInstance.post("/createproducts", fd, { headers: { "Content-Type": "multipart/form-data" } });
        showAlert("Product created successfully!");
      }

      await fetchProducts();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving product:", error);
      showAlert(error || "Failed to save product");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = async (productFromList) => {
    let product = productFromList;
    try {
      const res = await axiosInstance.get(`/getsingleproducts/${productFromList._id}`);
      if (res?.data?.data) product = res.data.data;
    } catch (error) {
      console.error("Error fetching full product details:", error);
      // fall back to the list-row data if the single-product fetch fails
    }

    setEditingProduct(product);
    let productTemplates = product.templates || [];
    if (typeof productTemplates === 'string') {
      try { productTemplates = JSON.parse(productTemplates); } catch (e) { productTemplates = []; }
    }
    let productCustomFields = product.customFields || [];
    if (typeof productCustomFields === 'string') {
      try { productCustomFields = JSON.parse(productCustomFields); } catch (e) { productCustomFields = []; }
    }

    setFormData({
      name: product.name,
      categoryId: product.categoryId,
      subCategoryId: product.subCategoryId || "",
      basePrice: product.basePrice,
      templates: productTemplates,
      allowedPatterns: Array.isArray(product.allowedPatterns) ? product.allowedPatterns : [],
      customFields: productCustomFields.map((field, idx) => ({
        ...field,
        id: field.id || Date.now() + idx
      })),
      isActive: product.isActive,
      // These three were previously missing, so Segment/Sport/Apparel
      // always reset to blank when opening Edit.
      segment: product.segment || "",
      sport: product.sport || "",
      apparel: product.apparel || "",
      discountType: product.discountType || "percentage",
      discountValue: product.discountValue ?? "",
      // Normalize front/back independently: only fall back to the full
      // default zone set for a view that was truly never saved (undefined),
      // not for a view whose array exists but was intentionally trimmed.
      printZones: {
        front: Array.isArray(product.printZones?.front) ? product.printZones.front : DEFAULT_ZONES.front,
        back: Array.isArray(product.printZones?.back) ? product.printZones.back : DEFAULT_ZONES.back
      }
    });

    // Set existing files for edit mode
    setGlbFile(null);
    setGlbExistingUrl(product.glbUrl || "");

    // Set existing images.
    // API returns these under viewImages.front / viewImages.back (with a
    // plain frontImage/backImage or images[] fallback for older records) —
    // reading product.frontImage directly (as before) was always undefined.
    setFrontImage(null);
    setBackImage(null);
    setFrontImagePreview(null);
    setBackImagePreview(null);
    setExistingFrontImage(getProductFrontImage(product));
    setExistingBackImage(getProductBackImage(product));

    if (glbInputRef.current) glbInputRef.current.value = "";
    if (frontImageInputRef.current) frontImageInputRef.current.value = "";
    if (backImageInputRef.current) backImageInputRef.current.value = "";

    setShowModal(true);
  };

  const handleView = (product) => { setSelectedProduct(product); setShowViewModal(true); };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setLoading(true);
      try {
        await deleteProduct(id);
        showAlert(`"${name}" deleted successfully!`);
        await fetchProducts();
      } catch (error) {
        showAlert(error.response?.data?.message || "Failed to delete product");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStatusToggle = async (product) => {
    const newStatus = !product.isActive;
    try {
      await updateProductStatus(product._id, newStatus);
      showAlert(`Product status updated to ${newStatus ? 'Active' : 'Inactive'}`);
      await fetchProducts();
    } catch (error) {
      showAlert(error.response?.data?.message || "Failed to update status");
    }
  };

  const filteredProducts = products.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Fixed dark mode colors
  const bgColor = '#F8FAFC';
  const cardBg = '#FFFFFF';
  const borderColor = '#E2E8F0';

  const textColor = '#0F172A';
  const textSecondary = '#475569';
  const textMuted = '#64748B';

  const inputBg = '#FFFFFF';
  const headerBg = '#F1F5F9';

  const rowEvenBg = '#FFFFFF';
  const rowOddBg = '#F8FAFC';

  const hoverBg = '#FEF3C7';
  const sectionBg = '#F8FAFC';

  const primaryGradient = 'linear-gradient(135deg, #F5B800, #E8960A)';
  const primaryColor = '#F5B800';
  const primaryLight = 'rgba(245, 184, 0, 0.15)';

  // Button styles
  const btnDanger = { background: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.25)' };
  const btnInfo = { background: 'rgba(59,130,246,0.12)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.25)' };
  const btnNeutral = { background: cardBg, color: textColor, border: `1px solid ${borderColor}` };

  const tableStyle = { background: cardBg, borderRadius: '16px', border: `1px solid ${borderColor}`, overflowX: 'auto', boxShadow: 'none' };
  const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s ease' };

  const inputStyle = { width: '100%', padding: '10px 12px', background: inputBg, border: `1px solid ${borderColor}`, borderRadius: '8px', color: textColor, fontSize: '14px', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', marginBottom: '6px', color: textSecondary, fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' };

  const finalPrice = () => {
    if (!formData.discountValue || !formData.basePrice) return null;
    const base = parseFloat(formData.basePrice);
    const disc = parseFloat(formData.discountValue);
    if (isNaN(base) || isNaN(disc)) return null;
    return formData.discountType === 'percentage'
      ? Math.max(0, base - (base * disc / 100)).toFixed(2)
      : Math.max(0, base - disc).toFixed(2);
  };

  const SEGMENTS = [
    "Custom Sportswear",
    "Uniforms",
  ];

  const SPORTS = [
    "Cricket",
    "Soccer",
    "Kabbadi",
    "Volleyball",
    "Athletes",
  ];

  const APPAREL = [
    "Jersey / T-Shirt",
    "Shorts",
    "Track Pants",
  ];

  return (
    <div style={{ padding: '24px', background: bgColor, minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, background: primaryGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '6px' }}>Product Management</h1>
          <p style={{ color: textSecondary, fontSize: '14px' }}>Manage your product catalogue with 3D models and templates</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={fetchProducts} disabled={loading} style={{ ...btnNeutral, padding: '10px 18px', borderRadius: '10px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IoRefresh size={18} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button onClick={() => { resetForm(); setShowModal(true); }} style={{ background: primaryGradient, border: 'none', padding: '10px 20px', borderRadius: '10px', color: '#09185b', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IoAdd size={20} /> Add Product
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: cardBg, padding: '10px 14px', borderRadius: '10px', border: `1px solid ${borderColor}`, maxWidth: '380px' }}>
          <IoSearch size={18} style={{ color: textMuted }} />
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: textColor, fontSize: '14px' }} />
        </div>
      </div>

      {/* Loading */}
      {loading && products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: textSecondary }}>
          <div className="spinner" /><p>Loading products...</p>
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div style={tableStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${borderColor}`, background: headerBg }}>
                {['S.no', 'Product Name', 'Images', 'Category',  'Base Price', 'Status', 'Actions'].map((h, i) => (
                  <th key={i} style={{ textAlign: i >= 5 ? 'center' : 'left', padding: '14px 16px', color: textMuted, fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const frontThumb = getProductFrontImage(product);
                const backThumb = getProductBackImage(product);
                return (
                  <tr key={product._id} style={{ borderBottom: `1px solid ${borderColor}`, transition: 'background 0.15s', background: index % 2 === 0 ? rowEvenBg : rowOddBg }}
                    onMouseEnter={e => e.currentTarget.style.background = hoverBg}
                    onMouseLeave={e => { e.currentTarget.style.background = index % 2 === 0 ? rowEvenBg : rowOddBg; }}>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: textMuted }}>{startIndex + index + 1}</td>
                    <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: 500, color: textColor }}>{product.name}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {frontThumb ? (
                          <img
                            src={frontThumb}
                            alt="Front"
                            title="Front"
                            style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '6px', border: '2px solid #3B82F6' }}
                            onError={(e) => { e.target.style.visibility = 'hidden'; }}
                          />
                        ) : (
                          <div style={{ width: '38px', height: '38px', borderRadius: '6px', border: `1px dashed ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IoImage size={14} style={{ color: textMuted }} />
                          </div>
                        )}
                        {backThumb ? (
                          <img
                            src={backThumb}
                            alt="Back"
                            title="Back"
                            style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '6px', border: '2px solid #10B981' }}
                            onError={(e) => { e.target.style.visibility = 'hidden'; }}
                          />
                        ) : (
                          <div style={{ width: '38px', height: '38px', borderRadius: '6px', border: `1px dashed ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IoImage size={14} style={{ color: textMuted }} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ background: 'rgba(14,165,233,0.1)', color: '#0EA5E9', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <IoFolder size={11} />{product.categoryName || product.categoryId}
                      </span>
                    </td>
                    {/* <td style={{ padding: '14px 16px' }}>
                      {product.subCategoryName
                        ? <span style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IoFolderOpen size={11} />{product.subCategoryName}</span>
                        : <span style={{ color: textMuted, fontSize: '12px' }}>—</span>}
                    </td> */}
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <span style={{ fontWeight: 700, color: primaryColor, fontSize: '14px' }}>₹{product.basePrice}</span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <button onClick={() => handleStatusToggle(product)} style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, border: 'none', cursor: 'pointer', background: product.isActive ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)', color: product.isActive ? '#10B981' : '#EF4444' }}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                        <button onClick={() => handleView(product)} title="View" style={{ ...btnInfo, padding: '7px', borderRadius: '7px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}><IoEye size={15} /></button>
                        <button onClick={() => handleEdit(product)} title="Edit" style={{ background: primaryLight, border: 'none', padding: '7px', borderRadius: '7px', cursor: 'pointer', color: primaryColor, display: 'inline-flex', alignItems: 'center' }}><IoCreate size={15} /></button>
                        <button onClick={() => handleDelete(product._id, product.name)} title="Delete" style={{ ...btnDanger, padding: '7px', borderRadius: '7px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}><IoTrash size={15} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {currentProducts.length === 0 && <div style={{ textAlign: 'center', padding: '60px', color: textSecondary }}>No products found</div>}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '13px', color: textSecondary }}>Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length}</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} style={{ ...btnNeutral, padding: '7px 12px', borderRadius: '8px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '4px', opacity: currentPage === 1 ? 0.4 : 1 }}><IoChevronBack size={15} /> Prev</button>
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              let p = totalPages <= 5 ? i + 1 : currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i;
              return <button key={i} onClick={() => setCurrentPage(p)} style={{ padding: '7px 13px', background: currentPage === p ? primaryGradient : cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', cursor: 'pointer', color: currentPage === p ? '#09185b' : textColor, fontWeight: currentPage === p ? 700 : 400, fontSize: '13px' }}>{p}</button>;
            })}
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} style={{ ...btnNeutral, padding: '7px 12px', borderRadius: '8px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '4px', opacity: currentPage === totalPages ? 0.4 : 1 }}>Next <IoChevronForward size={15} /></button>
          </div>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              width: '92%',
              maxWidth: '780px',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
              border: `1px solid ${borderColor}`,
              display: 'flex',
              flexDirection: 'column'
            }}>

            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 28px', borderBottom: `1px solid ${borderColor}`, background: 'rgba(255,255,255,0.03)', borderRadius: '20px 20px 0 0', flexShrink: 0 }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: textColor, margin: 0 }}>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <p style={{ margin: '3px 0 0', fontSize: '13px', color: textMuted }}>
                  {editingProduct ? `Editing: ${editingProduct.name}` : 'Fill in the details to create a new product'}
                </p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', color: textSecondary, borderRadius: '8px', padding: '6px', display: 'flex', alignItems: 'center' }}>
                <IoClose size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>

              {/* Basic Info */}
              <SectionHeader label="Basic Information" isDark={isDark} textMuted={textMuted} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Product Name <span style={{ color: '#EF4444' }}>*</span></label>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="product name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Segment</label>
                  <select
                    value={formData.segment}
                    onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="">Select Segment</option>
                    {SEGMENTS.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Sport</label>
                  <select
                    value={formData.sport}
                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="">Select Sport</option>
                    {SPORTS.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Apparel</label>
                  <select
                    value={formData.apparel}
                    onChange={(e) => setFormData({ ...formData, apparel: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="">Select Apparel</option>
                    {APPAREL.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Category <span style={{ color: '#EF4444' }}>*</span></label>
                  <select value={formData.categoryId} onChange={handleCategoryChange} style={inputStyle}>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Pricing */}
              <SectionHeader label="Pricing" isDark={isDark} textMuted={textMuted} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 1fr', gap: '12px', marginBottom: '8px', alignItems: 'start' }}>
                <div>
                  <label style={labelStyle}>Base Price (₹)</label>
                  <input type="number" value={formData.basePrice} onChange={e => setFormData({ ...formData, basePrice: e.target.value })} placeholder="0" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Discount Type</label>
                  <select value={formData.discountType} onChange={e => setFormData({ ...formData, discountType: e.target.value })} style={inputStyle}>
                    <option value="percentage">% Off</option>
                    <option value="amount">₹ Off</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Discount Value</label>
                  <input type="number" value={formData.discountValue} onChange={e => setFormData({ ...formData, discountValue: e.target.value })} placeholder={formData.discountType === 'percentage' ? 'e.g. 20' : 'e.g. 100'} min="0" max={formData.discountType === 'percentage' ? 100 : undefined} style={inputStyle} />
                </div>
              </div>
              {finalPrice() !== null && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px', padding: '8px 12px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <IoCheckmark size={14} style={{ color: '#10B981' }} />
                  <span style={{ fontSize: '13px', color: '#10B981', fontWeight: 600 }}>Final price: ₹{finalPrice()}</span>
                </div>
              )}

              {/* Status */}
              <SectionHeader label="Status" isDark={isDark} textMuted={textMuted} />
              <div style={{ marginBottom: '20px' }}>
                <button type="button" onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', background: formData.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${formData.isActive ? '#10B981' : '#EF4444'}`, borderRadius: '10px', cursor: 'pointer', color: formData.isActive ? '#10B981' : '#EF4444', fontWeight: 600, fontSize: '14px' }}>
                  <span style={{ width: '32px', height: '18px', borderRadius: '9px', background: formData.isActive ? '#10B981' : '#CBD5E1', position: 'relative', display: 'inline-block', transition: 'background 0.2s' }}>
                    <span style={{ position: 'absolute', top: '2px', left: formData.isActive ? '16px' : '2px', width: '14px', height: '14px', borderRadius: '50%', background: '#FFF', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                  </span>
                  {formData.isActive ? 'Active — visible to customers' : 'Inactive — hidden from customers'}
                </button>
              </div>

              {/* 3D Model Section */}
              <SectionHeader label="3D Model (GLB File)" isDark={isDark} textMuted={textMuted} />
              <div style={{ marginBottom: '20px' }}>
                <input ref={glbInputRef} type="file" accept=".glb" onChange={handleGLBFileChange} style={{ display: 'none' }} />
                {!glbFile && !glbExistingUrl && (
                  <div onClick={() => glbInputRef.current?.click()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: `2px dashed ${borderColor}`, borderRadius: '12px', padding: '28px', cursor: 'pointer', background: inputBg }}>
                    <IoCloudUpload size={36} style={{ color: textMuted, marginBottom: '8px' }} />
                    <span style={{ color: textSecondary, fontSize: '14px', fontWeight: 600 }}>Upload GLB File</span>
                    <span style={{ color: textMuted, fontSize: '12px', marginTop: '4px' }}>Max {GLB_MAX_MB}MB · .glb format only</span>
                  </div>
                )}
                {glbFile && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(255,255,255,0.05)', border: `2px solid ${borderColor}`, borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                      <div style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IoDocumentAttach size={28} style={{ color: '#3B82F6' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 600, color: textColor }}>{glbFile.name}</div>
                        <div style={{ fontSize: '13px', color: '#3B82F6' }}>{(glbFile.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                    </div>
                    <button type="button" onClick={removeGLBFile} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', cursor: 'pointer', color: '#EF4444' }}><IoTrashBin size={16} /> Remove</button>
                  </div>
                )}
              </div>

              {/* Product Images */}
              <SectionHeader label={`Product Images — max ${IMAGE_MAX_MB}MB each`} isDark={isDark} textMuted={textMuted} />

              {/* Front Image */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ ...labelStyle, color: '#3B82F6' }}>FRONT IMAGE</label>
                <input ref={frontImageInputRef} type="file" accept="image/*" onChange={handleFrontImageChange} style={{ display: 'none' }} />
                {!frontImage && !existingFrontImage && (
                  <div onClick={() => frontImageInputRef.current?.click()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: `2px dashed ${borderColor}`, borderRadius: '12px', padding: '24px', cursor: 'pointer', background: inputBg }}>
                    <IoImage size={32} style={{ color: textMuted, marginBottom: '8px' }} />
                    <span style={{ color: textSecondary, fontSize: '14px', fontWeight: 600 }}>Upload Front Image</span>
                  </div>
                )}
                {(frontImagePreview || existingFrontImage) && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(59,130,246,0.1)', border: '2px solid rgba(59,130,246,0.3)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                      <img src={frontImagePreview || existingFrontImage} alt="Front" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div><div style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>{frontImage ? frontImage.name : 'Front Image'}</div></div>
                    </div>
                    <button type="button" onClick={removeFrontImage} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', cursor: 'pointer', color: '#EF4444' }}><IoTrashBin size={16} /> Remove</button>
                  </div>
                )}
              </div>

              {/* Back Image */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ ...labelStyle, color: '#10B981' }}>BACK IMAGE</label>
                <input ref={backImageInputRef} type="file" accept="image/*" onChange={handleBackImageChange} style={{ display: 'none' }} />
                {!backImage && !existingBackImage && (
                  <div onClick={() => backImageInputRef.current?.click()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: `2px dashed ${borderColor}`, borderRadius: '12px', padding: '24px', cursor: 'pointer', background: inputBg }}>
                    <IoImage size={32} style={{ color: textMuted, marginBottom: '8px' }} />
                    <span style={{ color: textSecondary, fontSize: '14px', fontWeight: 600 }}>Upload Back Image</span>
                  </div>
                )}
                {(backImagePreview || existingBackImage) && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(16,185,129,0.1)', border: '2px solid rgba(16,185,129,0.3)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                      <img src={backImagePreview || existingBackImage} alt="Back" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div><div style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>{backImage ? backImage.name : 'Back Image'}</div></div>
                    </div>
                    <button type="button" onClick={removeBackImage} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', cursor: 'pointer', color: '#EF4444' }}><IoTrashBin size={16} /> Remove</button>
                  </div>
                )}
              </div>

              {/* Templates */}
              <SectionHeader label="Templates" isDark={isDark} textMuted={textMuted} />
              <div style={{ marginBottom: '20px' }}>
                {templates.length === 0
                  ? <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'rgba(239,68,68,0.08)', borderRadius: '8px' }}>
                    <IoAlertCircle size={15} style={{ color: '#EF4444' }} />
                    <span style={{ fontSize: '13px', color: '#EF4444' }}>No templates available. Please create templates first.</span>
                  </div>
                  : <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {templates.map(t => {
                      const selected = formData.templates.includes(t._id);
                      return (
                        <button key={t._id} type="button" onClick={() => toggleTemplate(t._id)} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', background: selected ? primaryGradient : inputBg, color: selected ? '#09185b' : textColor, border: selected ? 'none' : `1px solid ${borderColor}` }}>
                          {selected ? <IoCheckmark size={13} /> : null}{t.name}
                        </button>
                      );
                    })}
                  </div>
                }
              </div>

              {/* Print Zones */}
              <SectionHeader label="Print Zones (drag to position)" isDark={isDark} textMuted={textMuted} />
              <PrintZoneEditor
                frontImageUrl={frontImagePreview || existingFrontImage}
                backImageUrl={backImagePreview || existingBackImage}
                zones={formData.printZones || DEFAULT_ZONES}
                onChange={(newZones) => setFormData(prev => ({ ...prev, printZones: newZones }))}
              />

              {/* Custom Fields */}
              <SectionHeader label="Custom Fields" isDark={isDark} textMuted={textMuted} />
              <div style={{ marginBottom: '16px' }}>
                {(formData.customFields || []).map((f, i) => (
                  <div key={f.id || i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px 80px', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <input
                      placeholder="Field name"
                      value={f.fieldName}
                      onChange={e => updateCustomField(i, 'fieldName', e.target.value)}
                      style={inputStyle}
                    />
                    <input
                      placeholder="Label"
                      value={f.label}
                      onChange={e => updateCustomField(i, 'label', e.target.value)}
                      style={inputStyle}
                    />
                    <select
                      value={f.fieldType}
                      onChange={e => updateCustomField(i, 'fieldType', e.target.value)}
                      style={inputStyle}
                    >
                      <option value="text">Text</option>
                      <option value="logo">Logo</option>
                      <option value="number">Number</option>
                    </select>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => removeCustomField(i)}
                        style={{ ...btnDanger, padding: '8px', borderRadius: '6px', fontSize: '12px' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCustomField}
                  style={{ background: primaryGradient, color: '#fff', padding: '8px 12px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
                >
                  + Add Field
                </button>
              </div>

              {/* Patterns */}
              <SectionHeader label="Patterns" isDark={isDark} textMuted={textMuted} />
              <div style={{ marginBottom: "20px" }}>
                {patterns.length === 0 ? (
                  <div style={{ padding: "12px", borderRadius: "8px", background: "#FEF2F2", color: "#EF4444" }}>No patterns found</div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: "12px" }}>
                    {patterns.map((pattern) => {
                      const selected = formData.allowedPatterns && Array.isArray(formData.allowedPatterns)
                        ? formData.allowedPatterns.includes(pattern._id)
                        : false;
                      return (
                        <button key={pattern._id} type="button" onClick={() => togglePattern(pattern._id)} style={{ border: selected ? "2px solid #F59E0B" : `1px solid ${borderColor}`, borderRadius: "12px", overflow: "hidden", background: cardBg, cursor: "pointer", padding: 0 }}>
                          <img src={pattern.thumbnail} alt={pattern.name} style={{ width: "100%", height: "100px", objectFit: "cover" }} onError={(e) => { e.target.src = "https://via.placeholder.com/120x100?text=No+Image"; }} />
                          <div style={{ padding: "8px", fontSize: "13px", fontWeight: "600", color: textColor }}>{pattern.name}</div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '16px 28px', borderTop: `1px solid ${borderColor}`, background: 'rgba(255,255,255,0.02)', borderRadius: '0 0 20px 20px', display: 'flex', gap: '10px', justifyContent: 'flex-end', flexShrink: 0 }}>
              <button type="button" onClick={() => setShowModal(false)} style={{ ...btnNeutral, padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>Cancel</button>
              <button type="button" onClick={handleSubmit} disabled={uploading} style={{ background: primaryGradient, border: 'none', padding: '10px 28px', borderRadius: '10px', color: '#09185b', cursor: uploading ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', opacity: uploading ? 0.65 : 1 }}>
                <IoSave size={17} />
                {uploading ? 'Saving…' : editingProduct ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {showViewModal && selectedProduct && (
        <div style={modalOverlayStyle} onClick={() => setShowViewModal(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#ffffff', borderRadius: '20px', width: '92%', maxWidth: '520px', maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.6)', border: `1px solid ${borderColor}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: `1px solid ${borderColor}`, background: 'rgba(255,255,255,0.03)', borderRadius: '20px 20px 0 0' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: textColor, margin: 0 }}>Product Details</h2>
              <button onClick={() => setShowViewModal(false)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', color: textSecondary, borderRadius: '8px', padding: '6px', display: 'flex', alignItems: 'center' }}><IoClose size={18} /></button>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <ViewRow label="Product Name" value={<span style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>{selectedProduct.name}</span>} textSecondary={textSecondary} />
              <ViewRow label="Category" value={<span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0EA5E9' }}><IoFolder size={14} />{selectedProduct.categoryName || selectedProduct.categoryId}</span>} textSecondary={textSecondary} />
              {selectedProduct.subCategoryName && <ViewRow label="Subcategory" value={<span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981' }}><IoFolderOpen size={14} />{selectedProduct.subCategoryName}</span>} textSecondary={textSecondary} />}
              {selectedProduct.segment && <ViewRow label="Segment" value={<span style={{ color: textColor, fontSize: '14px' }}>{selectedProduct.segment}</span>} textSecondary={textSecondary} />}
              {selectedProduct.sport && <ViewRow label="Sport" value={<span style={{ color: textColor, fontSize: '14px' }}>{selectedProduct.sport}</span>} textSecondary={textSecondary} />}
              {selectedProduct.apparel && <ViewRow label="Apparel" value={<span style={{ color: textColor, fontSize: '14px' }}>{selectedProduct.apparel}</span>} textSecondary={textSecondary} />}
              <ViewRow label="Base Price" value={<span style={{ fontSize: '22px', fontWeight: 800, color: primaryColor }}>₹{selectedProduct.basePrice}</span>} textSecondary={textSecondary} />
              <ViewRow label="Status" value={<span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, background: selectedProduct.isActive ? '#D1FAE5' : '#FEE2E2', color: selectedProduct.isActive ? '#10B981' : '#EF4444' }}>{selectedProduct.isActive ? 'Active' : 'Inactive'}</span>} textSecondary={textSecondary} />
              {getProductFrontImage(selectedProduct) && (<ViewRow label="Front Image" value={<img src={getProductFrontImage(selectedProduct)} alt="Front" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: `1px solid ${borderColor}` }} />} textSecondary={textSecondary} />)}
              {getProductBackImage(selectedProduct) && (<ViewRow label="Back Image" value={<img src={getProductBackImage(selectedProduct)} alt="Back" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: `1px solid ${borderColor}` }} />} textSecondary={textSecondary} />)}
              {selectedProduct.glbUrl && (<ViewRow label="3D Model" value={<a href={selectedProduct.glbUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(14,165,233,0.1)', color: '#0EA5E9', padding: '5px 12px', borderRadius: '8px', fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}><IoVideocam size={14} /> View 3D Model</a>} textSecondary={textSecondary} />)}
              <ViewRow label="Created" value={<span style={{ color: textSecondary, fontSize: '13px' }}>{selectedProduct.createdAt ? new Date(selectedProduct.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}</span>} textSecondary={textSecondary} />
            </div>
            <div style={{ padding: '14px 24px', borderTop: `1px solid ${borderColor}`, display: 'flex', gap: '10px', justifyContent: 'flex-end', background: 'rgba(255,255,255,0.02)', borderRadius: '0 0 20px 20px' }}>
              <button onClick={() => { setShowViewModal(false); handleEdit(selectedProduct); }} style={{ background: primaryLight, border: 'none', padding: '9px 18px', borderRadius: '9px', cursor: 'pointer', color: primaryColor, fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}><IoCreate size={15} /> Edit</button>
              <button onClick={() => setShowViewModal(false)} style={{ background: primaryGradient, border: 'none', padding: '9px 22px', borderRadius: '9px', color: '#09185b', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
        .spinner { width: 36px; height: 36px; border: 3px solid rgba(255,255,255,0.1); border-top-color: ${primaryColor}; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 14px; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

// Helper sub-components
function SectionHeader({ label, isDark, textMuted }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', marginTop: '4px' }}>
      <span style={{ fontSize: '11px', fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
    </div>
  );
}

function ViewRow({ label, value, textSecondary }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ fontSize: '11px', color: textSecondary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '5px' }}>{label}</div>
      <div>{value}</div>
    </div>
  );
}