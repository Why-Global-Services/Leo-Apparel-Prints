// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   createDesignZone,
//   getDesignZoneById,
//   updateDesignZone,
// } from "../../services/DesignZone";

// const emptyField = { name: "", type: "text", required: false };

// const DesignForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEditMode = Boolean(id);

//   const [formData, setFormData] = useState({
//     zoneName: "",
//     zoneKey: "",
//     meshNames: [""],
//     allowedFields: [emptyField],
//     isActive: true,
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isEditMode) {
//       loadZone();
//     }
//   }, [id]);

//   const loadZone = async () => {
//     setLoading(true);
//     try {
//       const response = await getDesignZoneById(id);
//       const zone = response.data;
//       if (zone) {
//         setFormData({
//           zoneName: zone.zoneName || "",
//           zoneKey: zone.zoneKey || "",
//           meshNames: zone.meshNames?.length ? zone.meshNames : [""],
//           allowedFields:
//             zone.allowedFields?.length > 0 ? zone.allowedFields : [emptyField],
//           isActive: zone.isActive !== false,
//         });
//       } else {
//         toast.error("Design zone not found.");
//         navigate("/designzone");
//       }
//     } catch (error) {
//       console.error("Failed to load design zone", error);
//       toast.error("Unable to load design zone.");
//       navigate("/designzone");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const setField = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const updateMeshName = (index, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       meshNames: prev.meshNames.map((item, idx) =>
//         idx === index ? value : item
//       ),
//     }));
//   };

//   const addMeshName = () => {
//     setFormData((prev) => ({
//       ...prev,
//       meshNames: [...prev.meshNames, ""],
//     }));
//   };

//   const removeMeshName = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       meshNames: prev.meshNames.filter((_, idx) => idx !== index),
//     }));
//   };

//   const updateAllowedField = (index, key, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       allowedFields: prev.allowedFields.map((field, idx) =>
//         idx === index ? { ...field, [key]: value } : field
//       ),
//     }));
//   };

//   const addAllowedField = () => {
//     setFormData((prev) => ({
//       ...prev,
//       allowedFields: [...prev.allowedFields, emptyField],
//     }));
//   };

//   const removeAllowedField = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       allowedFields: prev.allowedFields.filter((_, idx) => idx !== index),
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.zoneName.trim()) return "Zone name is required.";
//     if (!formData.zoneKey.trim()) return "Zone key is required.";
//     return "";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const error = validateForm();
//     if (error) {
//       toast.error(error);
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = {
//         zoneName: formData.zoneName.trim(),
//         zoneKey: formData.zoneKey.trim(),
//         meshNames: formData.meshNames.filter((name) => name.trim() !== ""),
//         allowedFields: formData.allowedFields.map((field) => ({
//           name: field.name.trim(),
//           type: field.type,
//           required: field.required,
//         })),
//         isActive: formData.isActive,
//       };

//       if (isEditMode) {
//         await updateDesignZone(id, data);
//         toast.success("Design zone updated successfully.");
//       } else {
//         await createDesignZone(data);
//         toast.success("Design zone created successfully.");
//       }

//       navigate("/designzone");
//     } catch (error) {
//       console.error("Failed to save design zone", error);
//       toast.error("Unable to save design zone.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 w-full bg-gray-100 min-h-[calc(100vh-100px)]">
//       <div className="bg-white p-6 rounded-md shadow-md">
//         <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {isEditMode ? "Edit Design Zone" : "Add Design Zone"}
//             </h2>
//             <p className="text-sm text-gray-500 mt-1">
//               Configure zone name, key, mesh names, and allowed field settings.
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid gap-6 md:grid-cols-2">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Zone Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.zoneName}
//                 onChange={(e) => setField("zoneName", e.target.value)}
//                 placeholder="e.g. Front Zone"
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Zone Key <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.zoneKey}
//                 onChange={(e) => setField("zoneKey", e.target.value)}
//                 placeholder="e.g. front"
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
//               />
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-gray-800">Mesh Names</h3>
//               <button
//                 type="button"
//                 onClick={addMeshName}
//                 className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
//               >
//                 + Add Mesh
//               </button>
//             </div>
//             <div className="space-y-3">
//               {formData.meshNames.map((mesh, index) => (
//                 <div key={`mesh-${index}`} className="flex gap-3">
//                   <input
//                     type="text"
//                     value={mesh}
//                     onChange={(e) => updateMeshName(index, e.target.value)}
//                     placeholder={`Mesh ${index + 1}`}
//                     className="flex-1 rounded border border-gray-300 px-3 py-2 text-gray-900"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeMeshName(index)}
//                     className="rounded bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-gray-800">Allowed Fields</h3>
//               <button
//                 type="button"
//                 onClick={addAllowedField}
//                 className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
//               >
//                 + Field
//               </button>
//             </div>

//             <div className="space-y-4">
//               {formData.allowedFields.map((field, index) => (
//                 <div
//                   key={`allowed-${index}`}
//                   className="rounded border border-gray-200 bg-gray-50 p-4"
//                 >
//                   <div className="grid gap-4 md:grid-cols-3">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Field Name
//                       </label>
//                       <input
//                         type="text"
//                         value={field.name}
//                         onChange={(e) =>
//                           updateAllowedField(index, "name", e.target.value)
//                         }
//                         placeholder="fieldName"
//                         className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Type
//                       </label>
//                       <select
//                         value={field.type}
//                         onChange={(e) =>
//                           updateAllowedField(index, "type", e.target.value)
//                         }
//                         className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
//                       >
//                         <option value="text">text</option>
//                         <option value="number">number</option>
//                         <option value="date">date</option>
//                         <option value="textarea">textarea</option>
//                       </select>
//                     </div>

//                     <div className="flex items-end justify-between gap-3">
//                       <label className="flex items-center gap-2 text-sm text-gray-700">
//                         <input
//                           type="checkbox"
//                           checked={field.required}
//                           onChange={(e) =>
//                             updateAllowedField(index, "required", e.target.checked)
//                           }
//                           className="h-4 w-4 rounded border-gray-300 text-blue-600"
//                         />
//                         Required
//                       </label>
//                       <button
//                         type="button"
//                         onClick={() => removeAllowedField(index)}
//                         className="rounded bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div className="flex items-center gap-3">
//               <span className="text-sm font-medium text-gray-700">Status</span>
//               <button
//                 type="button"
//                 onClick={() => setField("isActive", !formData.isActive)}
//                 className={`relative inline-flex h-7 w-14 items-center rounded-full p-1 transition ${
//                   formData.isActive ? "bg-green-500" : "bg-gray-300"
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
//                     formData.isActive ? "translate-x-7" : "translate-x-0"
//                   }`}
//                 />
//               </button>
//               <span className="text-sm text-gray-700">
//                 {formData.isActive ? "Active" : "Inactive"}
//               </span>
//             </div>

//             <div className="flex flex-wrap gap-3">
//               <button
//                 type="button"
//                 onClick={() => navigate("/designzone")}
//                 className="rounded bg-gray-500 px-5 py-2 text-sm font-medium text-white hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="rounded bg-table px-5 py-2 text-sm font-medium text-white hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {loading ? "Saving..." : isEditMode ? "Update Zone" : "Save Zone"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DesignForm;



import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createDesignZone,
  getDesignZoneById,
  updateDesignZone,
} from "../../services/DesignZone";
import { FaPlus, FaTrash, FaSave, FaTimes, FaCube, FaListAlt } from "react-icons/fa";

const emptyField = { name: "", type: "text", required: false };

const DesignForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    zoneName: "",
    zoneKey: "",
    meshNames: [""],
    allowedFields: [emptyField],
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      loadZone();
    }
  }, [id]);

  const loadZone = async () => {
    setLoading(true);
    try {
      const response = await getDesignZoneById(id);
      const zone = response.data;
      if (zone) {
        setFormData({
          zoneName: zone.zoneName || "",
          zoneKey: zone.zoneKey || "",
          meshNames: zone.meshNames?.length ? zone.meshNames : [""],
          allowedFields:
            zone.allowedFields?.length > 0 ? zone.allowedFields : [emptyField],
          isActive: zone.isActive !== false,
        });
      } else {
        toast.error("Design zone not found.");
        navigate("/designzone");
      }
    } catch (error) {
      console.error("Failed to load design zone", error);
      toast.error("Unable to load design zone.");
      navigate("/designzone");
    } finally {
      setLoading(false);
    }
  };

  const setField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateMeshName = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      meshNames: prev.meshNames.map((item, idx) =>
        idx === index ? value : item
      ),
    }));
  };

  const addMeshName = () => {
    setFormData((prev) => ({
      ...prev,
      meshNames: [...prev.meshNames, ""],
    }));
  };

  const removeMeshName = (index) => {
    setFormData((prev) => ({
      ...prev,
      meshNames: prev.meshNames.filter((_, idx) => idx !== index),
    }));
  };

  const updateAllowedField = (index, key, value) => {
    setFormData((prev) => ({
      ...prev,
      allowedFields: prev.allowedFields.map((field, idx) =>
        idx === index ? { ...field, [key]: value } : field
      ),
    }));
  };

  const addAllowedField = () => {
    setFormData((prev) => ({
      ...prev,
      allowedFields: [...prev.allowedFields, emptyField],
    }));
  };

  const removeAllowedField = (index) => {
    setFormData((prev) => ({
      ...prev,
      allowedFields: prev.allowedFields.filter((_, idx) => idx !== index),
    }));
  };

  const validateForm = () => {
    if (!formData.zoneName.trim()) return "Zone name is required.";
    if (!formData.zoneKey.trim()) return "Zone key is required.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    try {
      const data = {
        zoneName: formData.zoneName.trim(),
        zoneKey: formData.zoneKey.trim(),
        meshNames: formData.meshNames.filter((name) => name.trim() !== ""),
        allowedFields: formData.allowedFields.map((field) => ({
          name: field.name.trim(),
          type: field.type,
          required: field.required,
        })),
        isActive: formData.isActive,
      };

      if (isEditMode) {
        await updateDesignZone(id, data);
        toast.success("Design zone updated successfully.");
      } else {
        await createDesignZone(data);
        toast.success("Design zone created successfully.");
      }

      navigate("/designzone");
    } catch (error) {
      console.error("Failed to save design zone", error);
      toast.error("Unable to save design zone.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-primary-blue to-primary-blue-dark px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <FaCube className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {isEditMode ? "Edit Design Zone" : "Create New Design Zone"}
                </h2>
                <p className="text-primary-blue-light text-sm mt-1">
                  Configure zone details, mesh names, and custom fields
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-primary-blue pl-3">
                Basic Information
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zone Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.zoneName}
                    onChange={(e) => setField("zoneName", e.target.value)}
                    placeholder="e.g., Front Zone, Hero Section"
                    className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zone Key <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.zoneKey}
                    onChange={(e) => setField("zoneKey", e.target.value)}
                    placeholder="e.g., front, hero"
                    className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-all duration-200 font-mono"
                  />
                  <p className="text-xs text-gray-400 mt-1">Unique identifier for this zone</p>
                </div>
              </div>
            </div>

            {/* Mesh Names Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-primary-blue pl-3">
                  Mesh Names
                </h3>
                <button
                  type="button"
                  onClick={addMeshName}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-blue/10 px-4 py-2 text-sm font-medium text-primary-blue hover:bg-primary-blue hover:text-white transition-all duration-200"
                >
                  <FaPlus className="text-xs" /> Add Mesh
                </button>
              </div>
              <div className="space-y-3">
                {formData.meshNames.map((mesh, index) => (
                  <div key={`mesh-${index}`} className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={mesh}
                      onChange={(e) => updateMeshName(index, e.target.value)}
                      placeholder={`Mesh ${index + 1} name`}
                      className="flex-1 rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                    />
                    <button
                      type="button"
                      onClick={() => removeMeshName(index)}
                      className="rounded-xl bg-red-50 p-2.5 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Allowed Fields Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-primary-blue pl-3">
                  Allowed Fields
                </h3>
                <button
                  type="button"
                  onClick={addAllowedField}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-blue/10 px-4 py-2 text-sm font-medium text-primary-blue hover:bg-primary-blue hover:text-white transition-all duration-200"
                >
                  <FaPlus className="text-xs" /> Add Field
                </button>
              </div>

              <div className="space-y-4">
                {formData.allowedFields.map((field, index) => (
                  <div
                    key={`allowed-${index}`}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <FaListAlt className="text-primary-blue" />
                        <span className="text-sm font-medium text-gray-500">
                          Field #{index + 1}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAllowedField(index)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Field Name
                        </label>
                        <input
                          type="text"
                          value={field.name}
                          onChange={(e) =>
                            updateAllowedField(index, "name", e.target.value)
                          }
                          placeholder="e.g., custom_text"
                          className="w-full rounded-xl border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type
                        </label>
                        <select
                          value={field.type}
                          onChange={(e) =>
                            updateAllowedField(index, "type", e.target.value)
                          }
                          className="w-full rounded-xl border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                        >
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="date">Date</option>
                          <option value="textarea">Textarea</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) =>
                              updateAllowedField(index, "required", e.target.checked)
                            }
                            className="h-4 w-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                          />
                          Required field
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex flex-col gap-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Status</span>
                  <button
                    type="button"
                    onClick={() => setField("isActive", !formData.isActive)}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full p-1 transition-all duration-300 ${
                      formData.isActive ? "bg-primary-blue" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                        formData.isActive ? "translate-x-7" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className={`text-sm font-medium ${formData.isActive ? "text-green-600" : "text-gray-500"}`}>
                    {formData.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/designzone")}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-blue px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-blue-dark hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <FaSave /> {loading ? "Saving..." : isEditMode ? "Update Zone" : "Save Zone"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DesignForm;