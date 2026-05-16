// // src/services/customizationService.js

// import axiosClient from "@/lib/axios";

// // Save customization before adding to cart
// export const saveCustomizationAPI = async (customizationData) => {

//   const formData = new FormData();

//   formData.append(
//     "productId",
//     customizationData.productId
//   );

//   formData.append(
//     "customization",
//     JSON.stringify(customizationData.customization || [])
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
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return res.data;
// };



















// src/services/customizationService.js

import axiosClient from "@/lib/axios";

// Save customization before adding to cart
export const saveCustomizationAPI = async (
  customizationData
) => {

  const formData = new FormData();

  formData.append(
    "productId",
    customizationData.productId
  );

  // ✅ ADD THIS
  formData.append(
    "customizationId",
    customizationData.customizationId || ""
  );

  formData.append(
    "customization",
    JSON.stringify(
      customizationData.customization || []
    )
  );

  // ✅ CLUB LOGO
  if (customizationData.clubLogo) {
    formData.append(
      "logo_jersey",
      customizationData.clubLogo
    );
  }

  // ✅ SPONSOR LOGO
  if (customizationData.sponsorLogo) {
    formData.append(
      "sponsor_jersey",
      customizationData.sponsorLogo
    );
  }

  const res = await axiosClient.post(
    "/v1/user/customization",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};