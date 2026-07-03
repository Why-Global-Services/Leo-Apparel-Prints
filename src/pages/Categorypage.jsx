// CategoryPage.jsx - Matches screenshot UI exactly
import { useState, useEffect } from "react";
import {
    IoTrash,
    IoCreate,
    IoClose,
    IoSearch,
    IoChevronBack,
    IoChevronForward,
    IoEye,
    IoSave,
    IoRefresh,
    IoFolderOpen,
    IoAdd,
} from "react-icons/io5";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../services/category.service";

const showToast = (message) => {
    alert(message);
};

export default function CategoryPage() {
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState("category");
    const itemsPerPage = 10;

    const [categories, setCategories] = useState([]);
    const [allCategoriesFlat, setAllCategoriesFlat] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await getCategories();
            const flattened = [];

            const flattenCategories = (cats, parentName = "-", parentId = null, level = 0) => {
                cats.forEach((cat) => {
                    flattened.push({
                        id: cat._id,
                        name: cat.name,
                        parentId: parentId,
                        parent: parentName,
                        status: cat.isActive ? "Active" : "Inactive",
                        slug: cat.slug,
                        products: cat.subcategories?.length || 0,
                        created: cat.createdAt
                            ? new Date(cat.createdAt).toISOString().split("T")[0]
                            : new Date().toISOString().split("T")[0],
                        description: cat.description || "",
                        isParent: parentId === null,
                        level: level,
                    });

                    if (cat.subcategories && cat.subcategories.length > 0) {
                        flattenCategories(cat.subcategories, cat.name, cat._id, level + 1);
                    }
                });
            };

            flattenCategories(res.data.data);
            setAllCategoriesFlat(flattened);
            setCategories(flattened);
        } catch (error) {
            console.error("Error fetching categories:", error);
            showToast(error.response?.data?.message || "Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    const getParentOptions = () => {
        let parentCategories = allCategoriesFlat.filter((cat) => cat.parentId === null);
        if (editingCategory) {
            parentCategories = parentCategories.filter((cat) => cat.id !== editingCategory.id);
        }
        return parentCategories;
    };

    const [formData, setFormData] = useState({
        name: "",
        parentId: null,
        status: "Active",
        description: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "parentId") {
            setFormData((prev) => ({ ...prev, parentId: value === "-" ? null : value }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleToggleStatus = () => {
        setFormData((prev) => ({
            ...prev,
            status: prev.status === "Active" ? "Inactive" : "Active",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) { showToast("Category name is required"); return; }
        if (mode === "subcategory" && !formData.parentId) { showToast("Please select a parent category"); return; }

        setLoading(true);
        try {
            const payload = {
                name: formData.name,
                parentId: mode === "category" ? null : formData.parentId,
                isActive: formData.status === "Active",
                description: formData.description || "",
            };

            if (editingCategory) {
                await updateCategory(editingCategory.id, payload);
                showToast(`${mode === "category" ? "Category" : "Subcategory"} updated successfully!`);
            } else {
                await createCategory(payload);
                showToast(`${mode === "category" ? "Category" : "Subcategory"} created successfully!`);
            }

            await fetchCategories();
            setShowModal(false);
            setEditingCategory(null);
            setFormData({ name: "", parentId: null, status: "Active", description: "" });
        } catch (error) {
            console.error("Error saving:", error);
            showToast(error.response?.data?.message || "Failed to save");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setMode(category.parentId === null ? "category" : "subcategory");
        setFormData({
            name: category.name,
            parentId: category.parentId,
            status: category.status,
            description: category.description || "",
        });
        setShowModal(true);
    };

    const handleView = (category) => {
        setSelectedCategory(category);
        setShowViewModal(true);
    };

    const handleDelete = async (id, name) => {
        const hasChildren = allCategoriesFlat.some((cat) => cat.parentId === id);
        if (hasChildren) { showToast("Cannot delete category with subcategories"); return; }
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            setLoading(true);
            try {
                await deleteCategory(id);
                showToast(`"${name}" deleted successfully!`);
                await fetchCategories();
            } catch (error) {
                console.error("Error deleting:", error);
                showToast(error.response?.data?.message || "Failed to delete");
            } finally {
                setLoading(false);
            }
        }
    };

    const openCategoryModal = () => {
        setMode("category");
        setEditingCategory(null);
        setFormData({ name: "", parentId: null, status: "Active", description: "" });
        setShowModal(true);
    };

    const openSubcategoryModal = () => {
        setMode("subcategory");
        setEditingCategory(null);
        setFormData({ name: "", parentId: null, status: "Active", description: "" });
        setShowModal(true);
    };

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <style>{`
        .cat-page * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .cat-page { background: #ffffff; min-height: 100vh; padding: 24px 28px; }

        /* Breadcrumb */
        .breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #6b7280; margin-bottom: 20px; }
        .breadcrumb .sep { color: #d1d5db; }
        .breadcrumb .active { color: #f59e0b; font-weight: 500; }

        /* Header row */
        .header-row { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
        .header-title { font-size: 26px; font-weight: 700; color: #f59e0b; line-height: 1.2; }
        .header-sub { font-size: 13px; color: #6b7280; margin-top: 4px; }
        .header-actions { display: flex; gap: 10px; align-items: center; flex-shrink: 0; }

        /* Buttons */
        .btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px; border-radius: 8px; font-size: 13.5px; font-weight: 600; cursor: pointer; border: none; transition: opacity 0.15s, box-shadow 0.15s; white-space: nowrap; }
        .btn:hover { opacity: 0.88; }
        .btn-refresh { background: #fff; border: 1.5px solid #e5e7eb; color: #374151; }
        .btn-refresh:hover { background: #f9fafb; opacity: 1; }
        .btn-add-cat { background: #3b82f6; color: #fff; }
        .btn-add-sub { background: #f59e0b; color: #fff; }

        /* Search */
        .search-wrap { position: relative; width: 320px; margin-bottom: 20px; }
        .search-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: #9ca3af; display: flex; }
        .search-input { width: 100%; padding: 10px 14px 10px 38px; border: 1.5px solid #e5e7eb; border-radius: 10px; font-size: 14px; color: #374151; background: #fff; outline: none; transition: border-color 0.15s; }
        .search-input:focus { border-color: #93c5fd; }
        .search-input::placeholder { color: #9ca3af; }

        /* Table card */
        .table-card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
        .data-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
        .data-table col.col-sno     { width: 10%; }
        .data-table col.col-name    { width: 34%; }
        .data-table col.col-parent  { width: 22%; }
        .data-table col.col-status  { width: 16%; }
        .data-table col.col-actions { width: 18%; }

        /* Header row */
        .data-table thead tr { border-bottom: 1px solid #e2e8f0; }
        .data-table th {
          padding: 14px 24px;
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          text-align: left;
          background: #fff;
        }
        .data-table th.col-actions-th { text-align: center; }

        /* Body rows */
        .data-table tbody tr { border-bottom: 1px solid #f1f5f9; transition: background 0.1s; }
        .data-table tbody tr:last-child { border-bottom: none; }
        .data-table tbody tr:hover { background: #fafafa; }
        .data-table td {
          padding: 18px 24px;
          font-size: 14px;
          color: #1e293b;
          vertical-align: middle;
        }

        /* Name cell */
        .name-cell { display: flex; align-items: center; }
        .indent-wrap { display: inline-flex; align-items: center; margin-right: 8px; }
        .indent-icon { color: #f59e0b; font-size: 14px; line-height: 1; }
        .name-parent { font-weight: 600; color: #0f172a; font-size: 14px; }
        .name-child  { font-weight: 500; color: #334155; font-size: 14px; }

        /* Parent cell */
        .parent-dash { color: #cbd5e1; font-size: 16px; font-weight: 600; line-height: 1; }
        .parent-name { color: #64748b; font-size: 13.5px; font-weight: 400; }

        /* Status badge — left-aligned in its cell */
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
        }
        .badge-active   { background: #dcfce7; color: #16a34a; }
        .badge-inactive { background: #fee2e2; color: #dc2626; }

        /* Actions cell — centered */
        .td-actions { text-align: center; padding: 18px 16px; }
        .actions { display: inline-flex; align-items: center; gap: 10px; }
        .action-btn {
          width: 34px; height: 34px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: filter 0.15s;
        }
        .action-btn:hover { filter: brightness(0.9); }
        .action-view   { background: #dbeafe; color: #2563eb; }
        .action-edit   { background: #fef3c7; color: #d97706; }
        .action-delete { background: #fee2e2; color: #dc2626; }

        /* Empty state */
        .empty { text-align: center; padding: 60px; color: #9ca3af; font-size: 14px; }

        /* Pagination */
        .pagination-row { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; flex-wrap: wrap; gap: 12px; }
        .pagination-info { font-size: 13px; color: #6b7280; }
        .pagination-btns { display: flex; gap: 6px; align-items: center; }
        .pg-btn { padding: 7px 13px; border-radius: 8px; border: 1.5px solid #e5e7eb; background: #fff; color: #374151; font-size: 13px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 0.12s; }
        .pg-btn:hover:not(:disabled) { border-color: #93c5fd; }
        .pg-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .pg-btn.active { background: #f59e0b; border-color: #f59e0b; color: #fff; font-weight: 700; }

        /* Modal overlay */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-box { background: #fff; border-radius: 14px; padding: 28px; width: 90%; max-width: 480px; box-shadow: 0 20px 60px rgba(0,0,0,0.18); }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; }
        .modal-title { font-size: 18px; font-weight: 700; color: #111827; }
        .modal-close { background: none; border: none; cursor: pointer; color: #6b7280; display: flex; padding: 2px; border-radius: 6px; }
        .modal-close:hover { background: #f3f4f6; color: #374151; }

        /* Form fields */
        .field { margin-bottom: 16px; }
        .field label { display: block; margin-bottom: 6px; font-size: 13.5px; font-weight: 600; color: #374151; }
        .field label span { color: #ef4444; }
        .field input, .field select, .field textarea { width: 100%; padding: 9px 12px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 14px; color: #111827; background: #fff; outline: none; transition: border-color 0.15s; font-family: inherit; }
        .field input:focus, .field select:focus, .field textarea:focus { border-color: #93c5fd; }
        .field textarea { resize: vertical; }

        /* Status toggle btn */
        .status-toggle { width: 100%; padding: 9px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; border: 1.5px solid; display: flex; align-items: center; justify-content: center; gap: 7px; transition: opacity 0.15s; }
        .status-toggle.active { background: #d1fae5; border-color: #6ee7b7; color: #059669; }
        .status-toggle.inactive { background: #fee2e2; border-color: #fca5a5; color: #dc2626; }

        /* Modal footer */
        .modal-footer { display: flex; gap: 10px; justify-content: flex-end; margin-top: 22px; }
        .btn-cancel { padding: 9px 18px; background: #fff; border: 1.5px solid #e5e7eb; border-radius: 8px; color: #374151; font-size: 14px; font-weight: 600; cursor: pointer; }
        .btn-cancel:hover { background: #f9fafb; }
        .btn-submit { padding: 9px 22px; background: #f59e0b; border: none; border-radius: 8px; color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 7px; }
        .btn-submit:hover { background: #d97706; }
        .btn-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        /* View modal rows */
        .view-row { margin-bottom: 16px; }
        .view-label { font-size: 12px; color: #9ca3af; font-weight: 500; margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.04em; }
        .view-value { font-size: 14.5px; color: #111827; font-weight: 500; }
        .view-value.muted { color: #9ca3af; font-weight: 400; }
        .view-value.accent { color: #f59e0b; }

        /* Loading */
        .loading-state { text-align: center; padding: 60px; color: #9ca3af; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinner { width: 36px; height: 36px; border: 3px solid #e5e7eb; border-top-color: #f59e0b; border-radius: 50%; animation: spin 0.7s linear infinite; margin: 0 auto 14px; }
      `}</style>

            <div className="cat-page">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <span>Dashboard</span>
                    <span className="sep">›</span>
                    <span className="active">Category</span>
                </div>

                {/* Header + Actions */}
                <div className="header-row">
                    <div>
                        <div className="header-title">Categories</div>
                        <div className="header-sub">Manage your product categories</div>
                    </div>
                    <div className="header-actions">
                        <button className="btn btn-refresh" onClick={fetchCategories} disabled={loading}>
                            <IoRefresh size={15} /> Refresh
                        </button>
                        <button className="btn btn-add-cat" onClick={openCategoryModal}>
                            <IoAdd size={15} /> Add Category
                        </button>
                        {/* <button className="btn btn-add-sub" onClick={openSubcategoryModal}>
                            <IoFolderOpen size={15} /> Add Subcategory
                        </button> */}
                    </div>
                </div>

                {/* Search */}
                <div className="search-wrap">
                    <span className="search-icon"><IoSearch size={16} /></span>
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>

                {/* Table */}
                {loading && categories.length === 0 ? (
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>Loading categories...</p>
                    </div>
                ) : (
                    <div className="table-card">
                        <table className="data-table">
                            <colgroup>
                                <col className="col-sno" />
                                <col className="col-name" />
                                <col className="col-parent" />
                                <col className="col-status" />
                                <col className="col-actions" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Parent</th>
                                    <th>Status</th>
                                    <th className="col-actions-th">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCategories.map((category, index) => (
                                    <tr key={category.id}>
                                        <td style={{ padding: '18px 24px', fontSize: '14px', color: '#1e293b' }}>
                                            {startIndex + index + 1}
                                        </td>
                                        {/* Name */}
                                        <td style={{
                                            paddingLeft: category.level > 0 ? `${24 + category.level * 32}px` : '24px'
                                        }}>
                                            <div className="name-cell">
                                                {category.level > 0 && (
                                                    <span className="indent-wrap">
                                                        <span className="indent-icon">↳</span>
                                                    </span>
                                                )}
                                                <span className={category.parentId === null ? 'name-parent' : 'name-child'}>
                                                    {category.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Parent */}
                                        <td>
                                            {category.parent === "-" ? (
                                                <span className="parent-dash">—</span>
                                            ) : (
                                                <span className="parent-name">{category.parent}</span>
                                            )}
                                        </td>

                                        {/* Status — left aligned like screenshot */}
                                        <td>
                                            <span className={`badge ${category.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                                                {category.status}
                                            </span>
                                        </td>

                                        {/* Actions — centered */}
                                        <td className="td-actions">
                                            <div className="actions">
                                                <button className="action-btn action-view" onClick={() => handleView(category)} title="View">
                                                    <IoEye size={15} />
                                                </button>
                                                <button className="action-btn action-edit" onClick={() => handleEdit(category)} title="Edit">
                                                    <IoCreate size={15} />
                                                </button>
                                                <button className="action-btn action-delete" onClick={() => handleDelete(category.id, category.name)} title="Delete">
                                                    <IoTrash size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {currentCategories.length === 0 && (
                            <div className="empty">No categories found</div>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="pagination-row">
                        <div className="pagination-info">
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCategories.length)} of {filteredCategories.length} entries
                        </div>
                        <div className="pagination-btns">
                            <button
                                className="pg-btn"
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <IoChevronBack size={14} /> Previous
                            </button>
                            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                                let pageNum;
                                if (totalPages <= 5) pageNum = i + 1;
                                else if (currentPage <= 3) pageNum = i + 1;
                                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                                else pageNum = currentPage - 2 + i;
                                return (
                                    <button
                                        key={i}
                                        className={`pg-btn${currentPage === pageNum ? ' active' : ''}`}
                                        onClick={() => setCurrentPage(pageNum)}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            <button
                                className="pg-btn"
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next <IoChevronForward size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title">
                                {mode === "category"
                                    ? editingCategory ? "Edit Category" : "Add Category"
                                    : editingCategory ? "Edit Subcategory" : "Add Subcategory"}
                            </div>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                <IoClose size={22} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label>Name <span>*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter category name"
                                />
                            </div>

                            {mode === "subcategory" && (
                                <div className="field">
                                    <label>Parent Category <span>*</span></label>
                                    <select name="parentId" value={formData.parentId || "-"} onChange={handleInputChange}>
                                        <option value="-">Select Parent Category</option>
                                        {getParentOptions().map((parent) => (
                                            <option key={parent.id} value={parent.id}>{parent.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* <div className="field">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    placeholder="Enter description"
                                />
                            </div> */}

                            <div className="field">
                                <label>Status</label>
                                <button
                                    type="button"
                                    className={`status-toggle ${formData.status === 'Active' ? 'active' : 'inactive'}`}
                                    onClick={handleToggleStatus}
                                >
                                    {formData.status === 'Active' ? '● Active' : '● Inactive'}
                                </button>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit" disabled={loading}>
                                    <IoSave size={15} />
                                    {loading ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {showViewModal && selectedCategory && (
                <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title">Category Details</div>
                            <button className="modal-close" onClick={() => setShowViewModal(false)}>
                                <IoClose size={22} />
                            </button>
                        </div>

                        <div className="view-row">
                            <div className="view-label">Name</div>
                            <div className="view-value">{selectedCategory.name}</div>
                        </div>
                        <div className="view-row">
                            <div className="view-label">Parent</div>
                            <div className={`view-value ${selectedCategory.parent === "-" ? 'muted' : 'accent'}`}>
                                {selectedCategory.parent === "-" ? "— (No Parent)" : selectedCategory.parent}
                            </div>
                        </div>
                        <div className="view-row">
                            <div className="view-label">Slug</div>
                            <div className="view-value muted">{selectedCategory.slug}</div>
                        </div>
                        <div className="view-row">
                            <div className="view-label">Status</div>
                            <span className={`badge ${selectedCategory.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                                {selectedCategory.status}
                            </span>
                        </div>
                        <div className="view-row">
                            <div className="view-label">Description</div>
                            <div className="view-value">{selectedCategory.description || "No description"}</div>
                        </div>
                        <div className="view-row">
                            <div className="view-label">Created</div>
                            <div className="view-value muted">{selectedCategory.created}</div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn-submit" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setShowViewModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}