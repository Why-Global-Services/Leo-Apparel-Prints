// const ApiError = require("../../../utils/apiError");
// const Customization = require("../../../models/customization.model");
// const Product = require("../../../models/Product.model");
// const Cart = require("../../../models/cart.model");

// const addToCart = async (req) => {
//   const { customizationId, quantity = 1 } = req.body;

//   if (quantity < 1) {
//   throw new ApiError(400, "Quantity must be at least 1");
// }

//   const userId = req.user?._id || null;
//   const guestId = req.headers.guestid || req.headers["guest-id"] || null;

//   if (!userId && !guestId) {
//     throw new ApiError(400, "User or Guest ID required");
//   }

//   const cartQuery = userId ? { userId } : { guestId };

//   // 🔥 Get customization
//   const customization = await Customization.findById(customizationId);
//   if (!customization) throw new ApiError(404, "Customization not found");

//   const product = await Product.findById(customization.productId);
//   if (!product) throw new ApiError(404, "Product not found");

//   let userCart = await Cart.findOne(cartQuery);

//   if (!userCart) {
//     userCart = await Cart.create({
//       ...cartQuery,
//       items: [{ customizationId, productId: product._id, quantity }]
//     });

//     return { success: true, message: "Added to cart", data: userCart };
//   }

//   const existingItem = userCart.items.find(
//     (item) => String(item.customizationId) === String(customizationId)
//   );

//   if (existingItem) {
//     existingItem.quantity += quantity;
//   } else {
//     userCart.items.push({
//       customizationId,
//       productId: product._id,
//       quantity
//     });
//   }

//   await userCart.save();

//   return { success: true, message: "Cart updated", data: userCart };
// };

// const getCart = async (req) => {
//   const userId = req.user?._id || null;
//   const guestId = req.headers.guestid || req.headers["guest-id"] || null;

//   const cartQuery = userId ? { userId } : { guestId };

//   const cart = await Cart.findOne(cartQuery).lean();

//   if (!cart || cart.items.length === 0) {
//     return {
//       success: true,
//       items: [],
//       grandTotal: 0
//     };
//   }

//   const itemsData = await Promise.all(
//     cart.items.map(async (item) => {
//       const [product, customization] = await Promise.all([
//         Product.findById(item.productId).lean(),
//         Customization.findById(item.customizationId).lean()
//       ]);

//       if (!product || !customization) return null;

//       const price = product.basePrice || 0;
//       const total = price * item.quantity;

//       return {
//         productId: product._id,
//         productName: product.name,
//         glbUrl: product.glbUrl,
//         basePrice: price,

//         customization: customization.customization,

//         quantity: item.quantity,
//         total
//       };
//     })
//   );

//   const filteredItems = itemsData.filter(Boolean);

//   const grandTotal = filteredItems.reduce((sum, item) => sum + item.total, 0);

//   return {
//     success: true,
//     items: filteredItems,
//     grandTotal
//   };
// };

// const editCart = async (req) => {
//   const { customizationId, quantity } = req.body;

//   const userId = req.user?._id || null;
//   const guestId = req.headers.guestid || req.headers["guest-id"] || null;

//   console.log("Editing cart for:", { userId, guestId, customizationId, quantity });
//   console.log("req user:", req.user);
//   if (!userId && !guestId) {
//     throw new ApiError(400, "User or Guest ID required");
//   }

//   if (quantity < 1) {
//     throw new ApiError(400, "Quantity must be at least 1");
//   }

//   const cartQuery = userId ? { userId } : { guestId };

//   const userCart = await Cart.findOne(cartQuery);
//   if (!userCart) throw new ApiError(404, "Cart not found");

//   const item = userCart.items.find(
//     (i) => String(i.customizationId) === String(customizationId)
//   );

//   if (!item) throw new ApiError(404, "Item not found in cart");

//   item.quantity = quantity;

//   await userCart.save();

//   return {
//     success: true,
//     message: "Cart updated",
//     data: userCart
//   };
// };

// const deleteCart = async (req) => {
//   const { customizationId } = req.body;

//   const userId = req.user?._id || null;
//   const guestId = req.headers.guestid || req.headers["guest-id"] || null;

//   if (!userId && !guestId) {
//     throw new ApiError(400, "User or Guest ID required");
//   }

//   const cartQuery = userId ? { userId } : { guestId };

//   const userCart = await Cart.findOne(cartQuery);
//   if (!userCart) throw new ApiError(404, "Cart not found");

//   userCart.items = userCart.items.filter(
//     (item) => String(item.customizationId) !== String(customizationId)
//   );

//   await userCart.save();

//   return {
//     success: true,
//     message: "Item removed from cart",
//     data: userCart
//   };
// };

// const addAddressToCart = async (req) => {
//   const { deliveryAddressId, billingAddressId } = req.body;

//   const userId = req.user._id;

//   if (!userId) {
//     throw new ApiError(401, "Unauthorized");
//   }

//   const updatedCart = await Cart.findOneAndUpdate(
//     { userId },
//     {
//       deliveryAddressId,
//       billingAddressId
//     },
//     { new: true }
//   );

//   if (!updatedCart) {
//     throw new ApiError(404, "Cart not found");
//   }

//   return {
//     success: true,
//     message: "Address added to cart",
//     data: updatedCart
//   };
// };

// module.exports = {
//   addToCart,
//   getCart,
//   deleteCart,
//   editCart,
//   addAddressToCart
// };

// const ApiError = require("../../../utils/apiError");
// const Customization = require("../../../models/customization.model");
// const Product = require("../../../models/Product.model");
// const Cart = require("../../../models/cart.model");

// const cleanCustomization = (customizationArray) => {
//   return customizationArray
//     .map(({ zoneKey, fieldName, value }) => ({
//       zoneKey,
//       fieldName,
//       value,
//     }))
//     .sort((a, b) => a.fieldName.localeCompare(b.fieldName));
// };

// // Add to cart
// const addToCart = async (req) => {
//   const { customizationId, quantity = 1 } = req.body;

//   if (quantity < 1) {
//     throw new ApiError(400, "Quantity must be at least 1");
//   }

//   const userId = req.user?._id || null;
//   const guestId = req.headers.guestid || req.headers["guest-id"] || null;

//   console.log("HEADERS:", req.headers);
// console.log("GUEST ID:", req.headers.guestid);

//   if (!userId && !guestId) {
//     throw new ApiError(400, "User ID or Guest ID required");
//   }

//   // Get customization
//   const customization = await Customization.findById(customizationId);
//   if (!customization) throw new ApiError(404, "Customization not found");

//   const product = await Product.findById(customization.productId);
//   if (!product) throw new ApiError(404, "Product not found");

//   const cartQuery = userId ? { userId } : { guestId };
//   let userCart = await Cart.findOne(cartQuery);

//   if (!userCart) {
//     userCart = await Cart.create({
//       ...cartQuery,
//       items: [{ customizationId, productId: product._id, quantity }]
//     });
//     return { success: true, message: "Added to cart", data: userCart };
//   }

// const existingItem = await Promise.all(
//   userCart.items.map(async (item) => {
//     const existingCustomization = await Customization.findById(item.customizationId);

//     return {
//       item,
//       isSame:
//         String(existingCustomization.productId) === String(customization.productId) &&
//         JSON.stringify(cleanCustomization(existingCustomization.customization)) ===
// JSON.stringify(cleanCustomization(customization.customization))
//     };
//   })
// );

// const match = existingItem.find((i) => i.isSame);

// if (match) {
//   match.item.quantity += quantity;
// } else {
//   userCart.items.push({ customizationId, productId: product._id, quantity });
// }

//   await userCart.save();
//   return { success: true, message: "Cart updated", data: userCart };
// };

// // Get cart
// const getCart = async (req) => {
//   const userId = req.user?._id || null;
//   const guestId = req.headers.guestid || req.headers["guest-id"] || null;

//   const cartQuery = userId ? { userId } : { guestId };
//   const cart = await Cart.findOne(cartQuery).lean();

//   if (!cart || cart.items.length === 0) {
//     return { success: true, items: [], grandTotal: 0 };
//   }

//   const itemsData = await Promise.all(
//     cart.items.map(async (item) => {
//       const [product, customization] = await Promise.all([
//         Product.findById(item.productId).lean(),
//         Customization.findById(item.customizationId).lean()
//       ]);

//       if (!product || !customization) return null;

//       const price = product.basePrice || 0;
//       const total = price * item.quantity;

//       return {
//         customizationId: item.customizationId,
//         productId: product._id,
//         productName: product.name,
//         mainImage: product.mainImage,
//         basePrice: price,
//         quantity: item.quantity,
//         total: total,
//         customization: customization.customization || {},
//         addedAt: item.addedAt,
//       };
//     })
//   );

//   const filteredItems = itemsData.filter(Boolean);
//   const grandTotal = filteredItems.reduce((sum, item) => sum + item.total, 0);

//   return { success: true, items: filteredItems, grandTotal };
// };

// // Edit cart item
// const editCart = async (req) => {
//   const { customizationId, quantity } = req.body;
//   const userId = req.user?._id || null;
//   const guestId = req.headers.guestid || req.headers["guest-id"] || null;

//   if (!userId && !guestId) {
//     throw new ApiError(400, "User ID or Guest ID required");
//   }

//   if (quantity < 1) {
//     throw new ApiError(400, "Quantity must be at least 1");
//   }

//   const cartQuery = userId ? { userId } : { guestId };
//   const userCart = await Cart.findOne(cartQuery);
//   if (!userCart) throw new ApiError(404, "Cart not found");

//   const item = userCart.items.find(
//     (i) => String(i.customizationId) === String(customizationId)
//   );
//   if (!item) throw new ApiError(404, "Item not found in cart");

//   item.quantity = quantity;
//   await userCart.save();

//   return { success: true, message: "Cart updated", data: userCart };
// };

// // Delete cart item
// const deleteCart = async (req) => {
//   const { customizationId } = req.body;
//   const userId = req.user?._id || null;
//   const guestId = req.headers.guestid || req.headers["guest-id"] || null;

//   if (!userId && !guestId) {
//     throw new ApiError(400, "User ID or Guest ID required");
//   }

//   const cartQuery = userId ? { userId } : { guestId };
//   const userCart = await Cart.findOne(cartQuery);
//   if (!userCart) throw new ApiError(404, "Cart not found");

//   userCart.items = userCart.items.filter(
//     (item) => String(item.customizationId) !== String(customizationId)
//   );
//   await userCart.save();

//   return { success: true, message: "Item removed from cart", data: userCart };
// };

// // Merge guest cart with user cart (after login)
// const mergeCart = async (req) => {
//   const { items: guestItems } = req.body;
//   const userId = req.user?._id;

//   if (!userId) {
//     throw new ApiError(401, "User not authenticated");
//   }

//   if (!guestItems || guestItems.length === 0) {
//     return { success: true, message: "No items to merge", data: null };
//   }

//   let userCart = await Cart.findOne({ userId });

//   if (!userCart) {
//     userCart = await Cart.create({ userId, items: [] });
//   }

//   for (const guestItem of guestItems) {
//     const guestCustomization = await Customization.findById(guestItem.customizationId);

//     let match = null;

//     for (const item of userCart.items) {
//       const existingCustomization = await Customization.findById(item.customizationId);

// const isSame =
//   String(existingCustomization.productId) === String(guestCustomization.productId) &&
//   JSON.stringify(cleanCustomization(existingCustomization.customization)) ===
//   JSON.stringify(cleanCustomization(guestCustomization.customization));
//       if (isSame) {
//         match = item;
//         break;
//       }
//     }

//     if (match) {
//       match.quantity += guestItem.quantity;
//     } else {
//       userCart.items.push({
//         customizationId: guestItem.customizationId,
//         productId: guestItem.productId,
//         quantity: guestItem.quantity,
//       });
//     }
//   }

//   await userCart.save();

//   return { success: true, message: "Cart merged successfully", data: userCart };
// };

// // Clear cart (after successful order)
// const clearCart = async (req) => {
//   const userId = req.user?._id;

//   if (!userId) {
//     throw new ApiError(401, "User not authenticated");
//   }

//   const cart = await Cart.findOne({ userId });
//   if (cart) {
//     cart.items = [];
//     await cart.save();
//   }

//   return { success: true, message: "Cart cleared successfully" };
// };

// module.exports = {
//   addToCart,
//   getCart,
//   deleteCart,
//   editCart,
//   mergeCart,
//   clearCart,
// };

const ApiError = require("../../../utils/apiError");
const Customization = require("../../../models/customization.model");
const Product = require("../../../models/Product.model");
const Cart = require("../../../models/cart.model");

const cleanCustomization = (customizationArray) => {
  return customizationArray
    .map(({ zoneKey, fieldName, value }) => ({
      zoneKey,
      fieldName,
      value: String(value).trim().toLowerCase(), // 🔥 FIX
    }))
    .sort((a, b) => a.fieldName.localeCompare(b.fieldName));
};

// =========================
// ✅ ADD TO CART (FINAL)
// =========================
const addToCart = async (req) => {
  const { customizationId, sizes = [] } = req.body;

  if (!sizes.length) {
    throw new ApiError(400, "At least one size required");
  }

  const userId = req.user?._id || null;
  const guestId =
    req.headers["guestid"] ||
    req.headers["guest-id"] ||
    null;

  if (!userId && !guestId) {
    throw new ApiError(400, "User ID or Guest ID required");
  }

  // ==========================================
  // MERGE GUEST CART TO USER CART
  // ==========================================
  if (userId && guestId) {
    const guestCart = await Cart.findOne({ guestId });

    if (guestCart && guestCart.items.length > 0) {
      let userCart = await Cart.findOne({ userId });

      if (!userCart) {
        userCart = await Cart.create({
          userId,
          items: [],
        });
      }

      for (const guestItem of guestCart.items) {
        const existingIndex = userCart.items.findIndex(
          (item) =>
            String(item.customizationId) ===
            String(guestItem.customizationId)
        );

        if (existingIndex !== -1) {
          userCart.items[existingIndex] = {
            ...userCart.items[existingIndex]._doc,
            customizationId: guestItem.customizationId,
            sizes: guestItem.sizes,
            image: guestItem.image,
          };
        } else {
          userCart.items.push(guestItem);
        }
      }

      await userCart.save();

      await Customization.updateMany(
        { guestId },
        {
          $set: {
            userId,
            guestId: null,
          },
        }
      );

      await Cart.deleteOne({ guestId });

      console.log("✅ Guest cart merged");
    }
  }

  // ==========================================
  // GET CUSTOMIZATION
  // ==========================================
  const customization = await Customization.findById(
    customizationId
  );

  if (!customization) {
    throw new ApiError(
      404,
      "Customization not found"
    );
  }

  // ==========================================
  // GET PRODUCT
  // ==========================================
  const product = await Product.findById(
    customization.productId
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // ==========================================
  // FIND CART
  // ==========================================
  const cartQuery = userId
    ? { userId }
    : { guestId };

  let userCart = await Cart.findOne(cartQuery);

  // ==========================================
  // CREATE CART
  // ==========================================
  if (!userCart) {
    userCart = await Cart.create({
      ...cartQuery,
      items: [
        {
          customizationId,
          productId: product._id,
          sizes,
          image:
            product?.viewImages?.front ||
            product?.images?.[0] ||
            "",
        },
      ],
    });

    return {
      success: true,
      message: "Added to cart",
      data: userCart,
    };
  }

  // ==========================================
  // CHECK PRODUCT EXISTS
  // ==========================================
  const existingIndex =
    userCart.items.findIndex(
      (item) =>
        String(item.customizationId) ===
        String(customizationId)
    );

  // ==========================================
  // UPDATE EXISTING PRODUCT
  // ==========================================
  if (existingIndex !== -1) {
    userCart.items[existingIndex] = {
      ...userCart.items[existingIndex]._doc,

      customizationId,
      productId: product._id,
      sizes,

      image:
        product?.viewImages?.front ||
        product?.images?.[0] ||
        "",
    };

    await userCart.save();

    return {
      success: true,
      message: "Cart updated",
      data: userCart,
    };
  }

  // ==========================================
  // ADD NEW PRODUCT
  // ==========================================
  userCart.items.push({
    customizationId,
    productId: product._id,
    sizes,
    image:
      product?.viewImages?.front ||
      product?.images?.[0] ||
      "",
  });

  await userCart.save();

  return {
    success: true,
    message: "Added to cart",
    data: userCart,
  };
};
// =========================
// ✅ GET CART
// =========================
const getCart = async (req) => {
  const userId = req.user?._id || null;
  const guestId = req.headers["guestid"] || req.headers["guest-id"] || null;

  console.log("REQ USER:", req.user);
  console.log("USER ID:", userId);
  console.log("GUEST ID:", guestId);

  // =========================
  // 🔥 AUTO MERGE (IMPORTANT)
  // =========================
  if (userId && guestId) {
    const guestCart = await Cart.findOne({ guestId });

    if (guestCart && guestCart.items.length > 0) {
      let userCart = await Cart.findOne({ userId });

      if (!userCart) {
        userCart = await Cart.create({ userId, items: [] });
      }

      for (const guestItem of guestCart.items) {
        // ✅ Get guest customization
        const guestCustomization = await Customization.findById(
          guestItem.customizationId,
        );
        if (!guestCustomization) {

          console.log("❌ Guest customization missing");

          continue;
        }

        let match = null;

        for (const item of userCart.items) {
          const existingCustomization = await Customization.findById(
            item.customizationId,
          );

          if (!existingCustomization) {

            console.log("❌ Existing customization missing");

            // 🔥 REMOVE INVALID ITEM
            userCart.items = userCart.items.filter(
              (cartItem) =>
                String(cartItem.customizationId) !==
                String(item.customizationId)
            );

            continue;
          }

          const isSame =
            String(existingCustomization.productId) ===
            String(guestCustomization.productId) &&
            JSON.stringify(
              cleanCustomization(existingCustomization.customization),
            ) ===
            JSON.stringify(
              cleanCustomization(guestCustomization.customization),
            );

          if (isSame) {
            match = item;
            break;
          }
        }

        // ✅ Merge sizes
        if (match) {
          guestItem.sizes.forEach((newSize) => {
            const existing = match.sizes.find((s) => s.size === newSize.size);

            if (existing) {
              existing.quantity += newSize.quantity;
            } else {
              match.sizes.push(newSize);
            }
          });
        } else {
          // ✅ Add new item
          userCart.items.push(guestItem);
        }
      }

      await userCart.save();

      await Customization.updateMany(
        { guestId: guestId },
        {
          $set: { userId: userId, guestId: null },
        },
      );

      if (guestCart._id) {
        await Cart.deleteOne({ _id: guestCart._id });
      }

      console.log("✅ Guest cart merged during getCart");
    }
  }

  // =========================
  // 🔥 FETCH FINAL CART
  // =========================
  const cartQuery = userId ? { userId } : { guestId };

  const cart = await Cart.findOne(cartQuery).lean();

  if (!cart || cart.items.length === 0) {
    return {
      success: true,
      items: [],
      grandTotal: 0,
    };
  }

  const itemsData = await Promise.all(
    cart.items.map(async (item) => {
      // const [product, customization] = await Promise.all([
      //   Product.findById(item.productId).lean(),
      //   Customization.findById(item.customizationId).lean(),
      // ]);

      const [product, customization] = await Promise.all([
        Product.findOne({ _id: item.productId }).lean(),
        Customization.findOne({ _id: item.customizationId }).lean(),
      ]);

      if (!product || !customization) return null;

      const price = product.finalPrice || 0;

      const totalQty = item.sizes.reduce((sum, s) => sum + s.quantity, 0);

      return {
        customizationId: item.customizationId,
        productId: product._id,
        productName: product.name,
        basePrice: price,
        total: price * totalQty,
        totalQuantity: totalQty,
        customization: customization.customization,
        sizes: item.sizes,
        image: product?.viewImages?.front || product?.images?.[0] || "",
      };
    }),
  );

  const filteredItems = itemsData.filter(Boolean);

  const grandTotal = filteredItems.reduce((sum, item) => {
    return sum + item.total;
  }, 0);

  return {
    success: true,
    items: filteredItems,
    grandTotal,
  };
};

// =========================
// ✅ EDIT CART
// =========================
const editCart = async (req) => {
  const { customizationId, sizes } = req.body;

  const userId = req.user?._id || null;
  const guestId = req.headers["guestid"] || req.headers["guest-id"] || null;

  if (!userId && !guestId) {
    throw new ApiError(400, "User ID or Guest ID required");
  }

  if (!sizes || sizes.length === 0) {
    throw new ApiError(400, "At least one size required");
  }

  const cartQuery = userId ? { userId } : { guestId };

  const userCart = await Cart.findOne(cartQuery);
  if (!userCart) throw new ApiError(404, "Cart not found");

  const item = userCart.items.find(
    (i) => String(i.customizationId) === String(customizationId),
  );

  if (!item) throw new ApiError(404, "Item not found");

  item.sizes = sizes;
  await userCart.save();

  return { success: true, message: "Cart updated", data: userCart };
};

// =========================
// ✅ DELETE CART ITEM
// =========================
const deleteCart = async (req) => {
  const { customizationId } = req.body;

  const userId = req.user?._id || null;
  const guestId = req.headers["guestid"] || req.headers["guest-id"] || null;

  if (!userId && !guestId) {
    throw new ApiError(400, "User ID or Guest ID required");
  }

  const cartQuery = userId ? { userId } : { guestId };

  const userCart = await Cart.findOne(cartQuery);
  if (!userCart) throw new ApiError(404, "Cart not found");

  // 🔥 find removed item
  const removedItem = userCart.items.find(
    (item) => String(item.customizationId) === String(customizationId),
  );

  // 🔥 remove from cart
  userCart.items = userCart.items.filter(
    (item) => String(item.customizationId) !== String(customizationId),
  );

  await userCart.save();

  // 🔥 DELETE customization (IMPORTANT)
  if (removedItem) {
    await Customization.findByIdAndDelete(removedItem.customizationId);
  }

  return { success: true, message: "Item removed", data: userCart };
};

// =========================
// ✅ CLEAR CART
// =========================
const clearCart = async (req) => {
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "Unauthorized");

  const cart = await Cart.findOne({ userId });

  if (cart) {
    cart.items = [];
    await cart.save();
  }

  return { success: true, message: "Cart cleared" };
};

module.exports = {
  addToCart,
  getCart,
  editCart,
  deleteCart,
  clearCart,
};
