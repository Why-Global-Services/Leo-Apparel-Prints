import { useState, useEffect } from "react";
import { getPatternsAPI, deletePatternAPI, createPatternAPI } from "../services/pattern.service";

const MAX_FILE_MB = 5;
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

export default function Patterns() {
    const [patterns, setPatterns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedPattern, setSelectedPattern] = useState(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addModalType, setAddModalType] = useState("pattern");
    const [formData, setFormData] = useState({
        name: "",
        parent: "",
        frontPattern: null,
        backPattern: null,
        thumbnail: null,
        status: "Active"
    });

    const [previews, setPreviews] = useState({
        frontPattern: null,
        backPattern: null,
        thumbnail: null,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await getPatternsAPI();
            const data = response.data || response || [];
            setPatterns(data);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            setIsLoading(true);
            try {
                await deletePatternAPI(id);
                setPatterns(patterns.filter(p => p.id !== id && p._id !== id));
            } catch (error) {
                console.error("Failed to delete item:", error);
                alert("Failed to delete the item. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleViewClick = (pattern) => {
        setSelectedPattern(pattern);
        setIsViewModalOpen(true);
    };

    const openAddModal = (type) => {
        setAddModalType(type);
        setFormData({ name: "", parent: "", frontPattern: null, backPattern: null, thumbnail: null, status: "Active" });
        setPreviews({ frontPattern: null, backPattern: null, thumbnail: null });
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        Object.values(previews).forEach(url => url && URL.revokeObjectURL(url));
        setFormData({ name: "", parent: "", frontPattern: null, backPattern: null, thumbnail: null, status: "Active" });
        setPreviews({ frontPattern: null, backPattern: null, thumbnail: null });
    };

    const handleFileChange = (field, file) => {
        if (!file) return;

        if (file.size > MAX_FILE_BYTES) {
            alert(`"${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(2)} MB). Maximum allowed size is ${MAX_FILE_MB} MB. Please compress or resize the image before uploading.`);
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file (PNG, JPG, WEBP).");
            return;
        }

        if (previews[field]) URL.revokeObjectURL(previews[field]);
        const url = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, [field]: file }));
        setPreviews(prev => ({ ...prev, [field]: url }));
    };

    const removeFile = (field) => {
        if (previews[field]) URL.revokeObjectURL(previews[field]);
        setFormData(prev => ({ ...prev, [field]: null }));
        setPreviews(prev => ({ ...prev, [field]: null }));
    };

    const handleCreate = async () => {
        if (!formData.name) { alert("Name is required"); return; }

        setIsCreating(true);
        try {
            const submitData = new FormData();
            submitData.append("name", formData.name);
            submitData.append("status", formData.status);
            if (addModalType === "subpattern" && formData.parent) {
                submitData.append("parent", formData.parent);
            }
            if (formData.frontPattern) submitData.append("frontPattern", formData.frontPattern);
            if (formData.backPattern) submitData.append("backPattern", formData.backPattern);
            if (formData.thumbnail) submitData.append("thumbnail", formData.thumbnail);

            await createPatternAPI(submitData);
            await fetchData();
            closeAddModal();
        } catch (error) {
            console.error("Failed to create pattern:", error);
            const msg = error?.response?.data?.message || "";
            if (msg.toLowerCase().includes("too large") || msg.toLowerCase().includes("file")) {
                alert(`Upload failed: File too large. Please use images under ${MAX_FILE_MB}MB.`);
            } else {
                alert("Failed to create. Please try again.");
            }
        } finally {
            setIsCreating(false);
        }
    };

    const filteredPatterns = patterns.filter(pattern =>
        pattern.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ImageUploadField = ({ label, field, required = false }) => (
        <div>
            <label className="block text-[14px] font-bold text-[#374151] mb-1.5">
                {label} {required && <span className="text-[#EF4444]">*</span>}
                <span className="ml-1 text-[11px] font-normal text-gray-400">(max {MAX_FILE_MB}MB)</span>
            </label>
            {previews[field] ? (
                <div className="relative w-full h-36 rounded-xl overflow-hidden border border-gray-200 group">
                    <img src={previews[field]} alt={label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <label className="cursor-pointer bg-white text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                            Change
                            <input type="file" accept="image/*" className="hidden"
                                onChange={e => handleFileChange(field, e.target.files[0])} />
                        </label>
                        <button onClick={() => removeFile(field)}
                            className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors">
                            Remove
                        </button>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {formData[field]?.name} · {(formData[field]?.size / 1024 / 1024).toFixed(2)}MB
                    </div>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/40 transition-colors group">
                    <svg className="w-8 h-8 text-gray-300 group-hover:text-blue-400 mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[13px] font-semibold text-gray-400 group-hover:text-blue-500 transition-colors">Click to upload</span>
                    <span className="text-[11px] text-gray-300 mt-0.5">PNG, JPG, WEBP · max {MAX_FILE_MB}MB</span>
                    <input type="file" accept="image/*" className="hidden"
                        onChange={e => handleFileChange(field, e.target.files[0])} />
                </label>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-white p-8 font-sans relative">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm mb-4">
                <span className="text-gray-500">Dashboard</span>
                <span className="mx-2 text-gray-300">›</span>
                <span className="text-[#ECA143]">Pattern</span>
            </div>

            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold text-[#ECA143] mb-2">Pattern</h1>
                    <p className="text-gray-500 text-base">Manage your product Pattern</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={fetchData} disabled={isLoading}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors shadow-sm disabled:opacity-50">
                        <svg className={`w-5 h-5 text-gray-500 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                    </button>
                    <button onClick={() => openAddModal("pattern")}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#5382F6] text-white rounded-lg hover:bg-blue-600 font-semibold transition-colors shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Pattern
                    </button>
                    <button onClick={() => openAddModal("subpattern")}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#ECA143] text-white rounded-lg hover:bg-orange-500 font-semibold transition-colors shadow-sm">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0v8h12V8h-6.828l-2-2H4z" clipRule="evenodd" />
                        </svg>
                        Add SubPattern
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative w-[320px]">
                    <svg className="absolute left-4 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" placeholder="Search patterns..." value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-600 placeholder-gray-400" />
                </div>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-white">
                        <tr>
                            <th className="px-8 py-5 text-left text-sm font-bold text-gray-500 w-24">S.No</th>
                            <th className="px-8 py-5 text-left text-sm font-bold text-gray-500">Thumbnail</th>
                            <th className="px-8 py-5 text-left text-sm font-bold text-gray-500">Name</th>
                            <th className="px-8 py-5 text-left text-sm font-bold text-gray-500">Status</th>
                            <th className="px-8 py-5 text-left text-sm font-bold text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {isLoading && patterns.length === 0 ? (
                            <tr><td colSpan="5" className="px-8 py-8 text-center text-gray-500">Loading data...</td></tr>
                        ) : filteredPatterns.length === 0 ? (
                            <tr><td colSpan="5" className="px-8 py-8 text-center text-gray-500">No records found</td></tr>
                        ) : (
                            filteredPatterns.map((pattern, index) => (
                                <tr key={pattern.id || pattern._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5 whitespace-nowrap text-[15px] font-medium text-gray-500">{index + 1}</td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        {pattern.thumbnail
                                            ? <img src={pattern.thumbnail} alt={pattern.name} className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
                                            : <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        }
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {pattern.parent && pattern.parent !== "—" && (
                                                <svg className="w-5 h-5 text-[#ECA143] ml-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 5v6h6m0 0l-3-3m3 3l-3 3" />
                                                </svg>
                                            )}
                                            <span className="text-[15px] font-bold text-gray-900">{pattern.name || "Unnamed"}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <span className="px-4 py-1.5 inline-flex text-sm font-bold rounded-full bg-[#E5F5E9] text-[#28A745]">
                                            {pattern.status || "Active"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="flex gap-3">
                                            <button onClick={() => handleViewClick(pattern)}
                                                className="w-9 h-9 rounded bg-[#EBF2FF] text-[#5382F6] flex items-center justify-center hover:bg-blue-100 transition-colors" title="View">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleDelete(pattern.id || pattern._id, pattern.name)}
                                                className="w-9 h-9 rounded bg-[#FDEAEA] text-[#DC3545] flex items-center justify-center hover:bg-red-100 transition-colors" title="Delete">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                    <div className="bg-white rounded-[16px] w-full max-w-[560px] shadow-2xl relative flex flex-col" style={{ maxHeight: '92vh' }}>

                        <div className="flex justify-between items-center px-7 py-5 border-b border-gray-100 flex-shrink-0">
                            <h2 className="text-[20px] font-extrabold text-[#111827] tracking-tight">
                                {addModalType === 'subpattern' ? 'Add SubPattern' : 'Add Pattern'}
                            </h2>
                            <button onClick={closeAddModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-1 px-7 py-6 space-y-5">
                            <div>
                                <label className="block text-[14px] font-bold text-[#374151] mb-1.5">
                                    Name <span className="text-[#EF4444]">*</span>
                                </label>
                                <input type="text" placeholder="Enter pattern name" value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[14px] placeholder-gray-400" />
                            </div>

                            {addModalType === 'subpattern' && (
                                <div>
                                    <label className="block text-[14px] font-bold text-[#374151] mb-1.5">
                                        Select Parent Pattern <span className="text-[#EF4444]">*</span>
                                    </label>
                                    <select value={formData.parent}
                                        onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-[14px] bg-white">
                                        <option value="">-- Choose a parent pattern --</option>
                                        {patterns.filter(p => !p.parent || p.parent === "—").map(p => (
                                            <option key={p.id || p._id} value={p.id || p._id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <ImageUploadField label="Front Pattern Image" field="frontPattern" />
                            <ImageUploadField label="Back Pattern Image" field="backPattern" />
                            <ImageUploadField label="Thumbnail Image" field="thumbnail" />

                            <div>
                                <label className="block text-[14px] font-bold text-[#374151] mb-1.5">Status</label>
                                <div onClick={() => setFormData({ ...formData, status: formData.status === "Active" ? "Inactive" : "Active" })}
                                    className="w-full px-4 py-2.5 bg-[#e6f7ea] border border-[#a3e0b5] rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-[#d6f0dd] transition-colors">
                                    <div className={`w-2.5 h-2.5 rounded-full ${formData.status === "Active" ? "bg-[#339955]" : "bg-red-500"}`}></div>
                                    <span className={`font-bold text-[14px] ${formData.status === "Active" ? "text-[#339955]" : "text-red-600"}`}>
                                        {formData.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 px-7 py-5 border-t border-gray-100 flex-shrink-0">
                            <button onClick={closeAddModal}
                                className="py-2.5 px-6 border border-gray-200 text-[#4B5563] rounded-lg font-bold text-[14px] hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleCreate} disabled={isCreating}
                                className="py-2.5 px-6 bg-[#ECA143] text-white rounded-lg font-bold text-[14px] hover:bg-orange-500 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70">
                                {isCreating ? 'Creating...' : (
                                    <>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0017.414 6L15 3.586A2 2 0 0013.586 3H4zm2 2h7v3H6V5zm0 10v-4h8v4H6z" />
                                        </svg>
                                        Create
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {isViewModalOpen && selectedPattern && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                    <div className="bg-white rounded-[24px] w-full max-w-[480px] p-8 shadow-2xl relative">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[22px] font-bold text-gray-900">Pattern Details</h2>
                            <button onClick={() => setIsViewModalOpen(false)}
                                className="w-9 h-9 flex items-center justify-center bg-[#F3F4F6] text-gray-500 rounded-xl hover:bg-gray-200 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Name</p>
                                <p className="text-[16px] font-bold text-gray-800">{selectedPattern.name || "—"}</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Status</p>
                                <span className="px-3 py-1 inline-flex text-[12px] font-bold rounded-full bg-[#E5F5E9] text-[#28A745]">
                                    {selectedPattern.status || "Active"}
                                </span>
                            </div>
                            {(selectedPattern.frontPattern || selectedPattern.backPattern || selectedPattern.thumbnail) && (
                                <div className="grid grid-cols-3 gap-3 pt-1">
                                    {[
                                        { key: 'frontPattern', label: 'Front' },
                                        { key: 'backPattern', label: 'Back' },
                                        { key: 'thumbnail', label: 'Thumb' },
                                    ].map(({ key, label }) => selectedPattern[key] && (
                                        <div key={key} className="flex flex-col items-center gap-1">
                                            <img src={selectedPattern[key]} alt={label}
                                                className="w-full h-24 object-cover rounded-lg border border-gray-100" />
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button onClick={() => setIsViewModalOpen(false)}
                            className="w-full mt-8 py-3.5 bg-[#ECA143] text-white rounded-xl font-bold text-[16px] hover:bg-orange-500 transition-colors shadow-sm">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}