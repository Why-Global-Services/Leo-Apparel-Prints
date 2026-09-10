

// // src/services/customizationService.js

// import axiosClient from "@/lib/axios";

// // Save customization before adding to cart
// export const saveCustomizationAPI = async (
//   customizationData
// ) => {

//   const formData = new FormData();

//   formData.append(
//     "productId",
//     customizationData.productId
//   );

//   // ✅ ADD THIS
//   formData.append(
//     "customizationId",
//     customizationData.customizationId || ""
//   );

//   formData.append(
//     "customization",
//     JSON.stringify(
//       customizationData.customization || []
//     )
//   );

//   // ✅ CLUB LOGO
//   if (customizationData.clubLogo) {
//     formData.append(
//       "logo_jersey",
//       customizationData.clubLogo
//     );
//   }

//   // ✅ SPONSOR LOGO
//   if (customizationData.sponsorLogo) {
//     formData.append(
//       "sponsor_jersey",
//       customizationData.sponsorLogo
//     );
//   }

//   const res = await axiosClient.post(
//     "/v1/user/customization",
//     formData,
//     {
//       headers: {
//         "Content-Type":
//           "multipart/form-data",
//       },
//     }
//   );

//   return res.data;
// };





// src/services/customizationService.js

import axiosClient from "@/lib/axios";

// =============================================================
// Save customization before adding to cart.
//
// Supports BOTH:
//   1) Existing NORMAL Jersey customization (unchanged behavior)
//   2) New CUSTOM_COTTON_TEES / UPLOAD_DESIGN customization
//
// Existing call sites (Jersey) continue to work exactly as before —
// they don't need to pass customizationType / cottonTeeType / the
// cotton design files, since those all default to empty/"NORMAL".
// =============================================================
export const saveCustomizationAPI = async ({
  productId,
  customizationId = "",
  customizationType = "NORMAL",
  cottonTeeType = "",
  customization = [],

  // =============================
  // CUSTOM COTTON TEE
  // =============================
  frontDesign = null,
  backDesign = null,
  cottonLogo = null,

  // Existing Jersey
  clubLogo = null,
  sponsorLogo = null,
}) => {
  const formData = new FormData();

  formData.append("productId", productId);
  formData.append("customizationId", customizationId || "");

  // =============================
  // CUSTOM COTTON TEE
  // These two fields are new. For existing Jersey callers they simply
  // resolve to "NORMAL" / "" (the previous, implicit behavior), so
  // backend routes that don't yet look at them are unaffected.
  // =============================
  formData.append("customizationType", customizationType || "NORMAL");
  formData.append("cottonTeeType", cottonTeeType || "");

  formData.append("customization", JSON.stringify(customization || []));

  // =============================
  // CUSTOM COTTON TEE — uploaded files
  // =============================
  if (frontDesign) {
    formData.append("frontDesign", frontDesign);
  }

  if (backDesign) {
    formData.append("backDesign", backDesign);
  }

  if (cottonLogo) {
    formData.append("cottonLogo", cottonLogo);
  }

  // Existing Jersey — unchanged field names
  if (clubLogo) {
    formData.append("logo_jersey", clubLogo);
  }

  if (sponsorLogo) {
    formData.append("sponsor_jersey", sponsorLogo);
  }

  // IMPORTANT: do NOT manually set Content-Type: multipart/form-data.
  // Axios/the browser must generate the multipart boundary itself,
  // otherwise the request body will be malformed and rejected by the
  // backend. (The previous version of this file set this header
  // manually, which is a bug — removed here.)
  const res = await axiosClient.post("/v1/user/customization", formData);

  return res.data;
};