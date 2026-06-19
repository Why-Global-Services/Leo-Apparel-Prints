import { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  IoAddOutline,
  IoTrashOutline,
  IoPencilOutline,
  IoImageOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoReorderFourOutline,
} from "react-icons/io5";

const BASE_URL = "http://localhost:5001/v1/admin";

export default function BannerPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    altText: "",
    order: "0",
    isActive: "true",
    desktopImage: null,
    mobileImage: null,
  });

  const [previews, setPreviews] = useState({ desktop: null, mobile: null });

  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/heroBanner");
      setBanners(res.data?.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const resetForm = () => {
    setForm({ altText: "", order: "0", isActive: "true", desktopImage: null, mobileImage: null });
    setPreviews({ desktop: null, mobile: null });
    setEditingBanner(null);
    setError("");
  };

  const openAdd = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (banner) => {
    setEditingBanner(banner);
    setForm({
      altText: banner.altText || "",
      order: String(banner.order ?? 0),
      isActive: String(banner.isActive),
      desktopImage: null,
      mobileImage: null,
    });
    setPreviews({ desktop: banner.desktopImage, mobile: banner.mobileImage });
    setShowForm(true);
  };

  const handleFile = (type, file) => {
    if (!file) return;
    setForm((f) => ({ ...f, [type === "desktop" ? "desktopImage" : "mobileImage"]: file }));
    const url = URL.createObjectURL(file);
    setPreviews((p) => ({ ...p, [type]: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!editingBanner && (!form.desktopImage || !form.mobileImage)) {
      setError("Please upload both Desktop and Mobile images.");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("altText", form.altText);
      fd.append("order", form.order);
      fd.append("isActive", form.isActive);
      if (form.desktopImage) fd.append("desktopImage", form.desktopImage);
      if (form.mobileImage) fd.append("mobileImage", form.mobileImage);

      if (editingBanner) {
        await axiosInstance.put(`/heroBanner/${editingBanner._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMsg("Banner updated successfully!");
      } else {
        await axiosInstance.post("/heroBanner", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMsg("Banner created successfully!");
      }

      setShowForm(false);
      resetForm();
      fetchBanners();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (banner) => {
    try {
      await axiosInstance.patch(`/heroBanner/${banner._id}/toggle`);
      fetchBanners();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this banner slide?")) return;
    try {
      await axiosInstance.delete(`/heroBanner/${id}`);
      setSuccessMsg("Banner deleted.");
      fetchBanners();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Hero Banners
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>
            Manage homepage hero carousel slides — upload separate images for Desktop & Mobile.
          </p>
        </div>
        <button
          onClick={openAdd}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "linear-gradient(135deg, #09185b, #1E3A8A)",
            color: "#fff", border: "none", borderRadius: "10px",
            padding: "10px 20px", cursor: "pointer", fontWeight: 600,
            fontSize: "14px", boxShadow: "0 4px 12px rgba(9,24,91,0.25)",
          }}
        >
          <IoAddOutline size={20} /> Add Banner
        </button>
      </div>

      {/* Toast messages */}
      {successMsg && (
        <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "#166534", display: "flex", alignItems: "center", gap: "8px" }}>
          <IoCheckmarkCircleOutline size={20} /> {successMsg}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px",
        }}>
          <div style={{
            background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "680px",
            maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }}>
            <div style={{ padding: "24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
                {editingBanner ? "Edit Banner Slide" : "Add New Banner Slide"}
              </h2>
              <button onClick={() => { setShowForm(false); resetForm(); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
                <IoCloseCircleOutline size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
              {error && (
                <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", padding: "12px", marginBottom: "16px", color: "#dc2626", fontSize: "14px" }}>
                  {error}
                </div>
              )}

              {/* Image Uploads */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                {/* Desktop Image */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
                    🖥️ Desktop Image <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <div
                    onClick={() => desktopRef.current?.click()}
                    style={{
                      border: "2px dashed #cbd5e1", borderRadius: "10px", padding: "12px",
                      cursor: "pointer", textAlign: "center", background: "#f8fafc",
                      transition: "border-color 0.2s", minHeight: "130px",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {previews.desktop ? (
                      <img src={previews.desktop} alt="Desktop" style={{ width: "100%", height: "110px", objectFit: "cover", borderRadius: "6px" }} />
                    ) : (
                      <>
                        <IoImageOutline size={32} style={{ color: "#94a3b8", marginBottom: "8px" }} />
                        <span style={{ fontSize: "12px", color: "#64748b" }}>Click to upload<br /><strong>Recommended: 1920×600px</strong></span>
                      </>
                    )}
                  </div>
                  <input ref={desktopRef} type="file" accept="image/*" style={{ display: "none" }}
                    onChange={(e) => handleFile("desktop", e.target.files[0])} />
                  {previews.desktop && (
                    <button type="button" onClick={() => { setPreviews(p => ({ ...p, desktop: null })); setForm(f => ({ ...f, desktopImage: null })); }}
                      style={{ marginTop: "6px", fontSize: "12px", color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>
                      Remove
                    </button>
                  )}
                </div>

                {/* Mobile Image */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
                    📱 Mobile Image <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <div
                    onClick={() => mobileRef.current?.click()}
                    style={{
                      border: "2px dashed #cbd5e1", borderRadius: "10px", padding: "12px",
                      cursor: "pointer", textAlign: "center", background: "#f8fafc",
                      transition: "border-color 0.2s", minHeight: "130px",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {previews.mobile ? (
                      <img src={previews.mobile} alt="Mobile" style={{ width: "100%", height: "110px", objectFit: "cover", borderRadius: "6px" }} />
                    ) : (
                      <>
                        <IoImageOutline size={32} style={{ color: "#94a3b8", marginBottom: "8px" }} />
                        <span style={{ fontSize: "12px", color: "#64748b" }}>Click to upload<br /><strong>Recommended: 768×1024px</strong></span>
                      </>
                    )}
                  </div>
                  <input ref={mobileRef} type="file" accept="image/*" style={{ display: "none" }}
                    onChange={(e) => handleFile("mobile", e.target.files[0])} />
                  {previews.mobile && (
                    <button type="button" onClick={() => { setPreviews(p => ({ ...p, mobile: null })); setForm(f => ({ ...f, mobileImage: null })); }}
                      style={{ marginTop: "6px", fontSize: "12px", color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Alt Text + Order + Status */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Alt Text</label>
                  <input
                    type="text"
                    value={form.altText}
                    onChange={(e) => setForm(f => ({ ...f, altText: e.target.value }))}
                    placeholder="e.g. LEO CULT Sportswear"
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm(f => ({ ...f, order: e.target.value }))}
                    min="0"
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Status</label>
                  <select
                    value={form.isActive}
                    onChange={(e) => setForm(f => ({ ...f, isActive: e.target.value }))}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }}
                  style={{ padding: "10px 20px", border: "1px solid #e2e8f0", borderRadius: "8px", cursor: "pointer", background: "#fff", color: "#374151", fontWeight: 600 }}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  style={{
                    padding: "10px 24px", borderRadius: "8px", border: "none", cursor: submitting ? "not-allowed" : "pointer",
                    background: "linear-gradient(135deg, #09185b, #1E3A8A)", color: "#fff", fontWeight: 600,
                    opacity: submitting ? 0.7 : 1, display: "flex", alignItems: "center", gap: "8px"
                  }}>
                  {submitting ? "Saving..." : editingBanner ? "Update Banner" : "Create Banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== BANNER TABLE (UPDATED) ===================== */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ background: "#fff", borderRadius: "14px", height: "220px", animation: "pulse 1.5s ease-in-out infinite", background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)" }} />
          ))}
        </div>
      ) : banners.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
          <IoImageOutline size={64} style={{ marginBottom: "16px", opacity: 0.4 }} />
          <p style={{ fontSize: "16px", fontWeight: 500 }}>No banner slides yet.</p>
          <p style={{ fontSize: "14px" }}>Click "Add Banner" to create your first slide.</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto", background: "#fff", borderRadius: "14px", border: "1px solid #f1f5f9" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
              <tr>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#475569" }}>S.No</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#475569" }}>Desktop</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#475569" }}>Mobile</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#475569" }}>Alt Text</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#475569" }}>Order</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#475569" }}>Status</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#475569" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, index) => (
                <tr key={banner._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px", color: "#0f172a" }}>{index + 1}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <img src={banner.desktopImage} alt={banner.altText} style={{ width: "80px", height: "50px", objectFit: "cover", borderRadius: "6px" }} />
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <img src={banner.mobileImage} alt={banner.altText} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }} />
                  </td>
                  <td style={{ padding: "12px 16px", color: "#0f172a" }}>{banner.altText || "—"}</td>
                  <td style={{ padding: "12px 16px", color: "#0f172a" }}>{banner.order}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      onClick={() => handleToggle(banner)}
                      style={{
                        padding: "4px 12px",
                        borderRadius: "20px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: 600,
                        background: banner.isActive ? "#dcfce7" : "#fef2f2",
                        color: banner.isActive ? "#166534" : "#dc2626",
                      }}
                    >
                      {banner.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                      <button
                        onClick={() => openEdit(banner)}
                        style={{
                          padding: "6px 12px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "6px",
                          cursor: "pointer",
                          background: "#f8fafc",
                          color: "#374151",
                          fontSize: "13px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <IoPencilOutline size={15} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(banner._id)}
                        style={{
                          padding: "6px 12px",
                          border: "1px solid #fecaca",
                          borderRadius: "6px",
                          cursor: "pointer",
                          background: "#fef2f2",
                          color: "#dc2626",
                          fontSize: "13px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <IoTrashOutline size={15} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}