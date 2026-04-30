
const ApiError = require("../../../utils/apiError");
const Customization = require("../../../models/customization.model");
const Product = require("../../../models/Product.model");
const Cart = require("../../../models/cart.model");

const addToCart = async (req) => {
  const { customizationId, quantity = 1 } = req.body;

  if (quantity < 1) {
  throw new ApiError(400, "Quantity must be at least 1");
}

  const userId = req.user?._id || null;
  const guestId = req.headers.guestid || req.headers["guest-id"] || null;

  if (!userId && !guestId) {
    throw new ApiError(400, "User or Guest ID required");
  }

  const cartQuery = userId ? { userId } : { guestId };

  // 🔥 Get customization
  const customization = await Customization.findById(customizationId);
  if (!customization) throw new ApiError(404, "Customization not found");

  const product = await Product.findById(customization.productId);
  if (!product) throw new ApiError(404, "Product not found");

  let userCart = await Cart.findOne(cartQuery);

  if (!userCart) {
    userCart = await Cart.create({
      ...cartQuery,
      items: [{ customizationId, productId: product._id, quantity }]
    });

    return { success: true, message: "Added to cart", data: userCart };
  }

  const existingItem = userCart.items.find(
    (item) => String(item.customizationId) === String(customizationId)
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    userCart.items.push({
      customizationId,
      productId: product._id,
      quantity
    });
  }

  await userCart.save();

  return { success: true, message: "Cart updated", data: userCart };
};




const getCart = async (req) => {
  const userId = req.user?._id || null;
  const guestId = req.headers.guestid || req.headers["guest-id"] || null;

  const cartQuery = userId ? { userId } : { guestId };

  const cart = await Cart.findOne(cartQuery).lean();

  if (!cart || cart.items.length === 0) {
    return {
      success: true,
      items: [],
      grandTotal: 0
    };
  }


  const itemsData = await Promise.all(
    cart.items.map(async (item) => {
      const [product, customization] = await Promise.all([
        Product.findById(item.productId).lean(),
        Customization.findById(item.customizationId).lean()
      ]);

      if (!product || !customization) return null;

      const price = product.basePrice || 0;
      const total = price * item.quantity;

      return {
        productId: product._id,
        productName: product.name,
        glbUrl: product.glbUrl,
        basePrice: price,

        customization: customization.customization,

        quantity: item.quantity,
        total
      };
    })
  );

  const filteredItems = itemsData.filter(Boolean);

  
  const grandTotal = filteredItems.reduce((sum, item) => sum + item.total, 0);

  return {
    success: true,
    items: filteredItems,
    grandTotal
  };
};





const editCart = async (req) => {
  const { customizationId, quantity } = req.body;

  const userId = req.user?._id || null; 
  const guestId = req.headers.guestid || req.headers["guest-id"] || null;


  console.log("Editing cart for:", { userId, guestId, customizationId, quantity });
  console.log("req user:", req.user);
  if (!userId && !guestId) {
    throw new ApiError(400, "User or Guest ID required");
  }

  if (quantity < 1) {
    throw new ApiError(400, "Quantity must be at least 1");
  }

  const cartQuery = userId ? { userId } : { guestId };

  const userCart = await Cart.findOne(cartQuery);
  if (!userCart) throw new ApiError(404, "Cart not found");

  const item = userCart.items.find(
    (i) => String(i.customizationId) === String(customizationId)
  );

  if (!item) throw new ApiError(404, "Item not found in cart");

  item.quantity = quantity;

  await userCart.save();

  return {
    success: true,
    message: "Cart updated",
    data: userCart
  };
};


const deleteCart = async (req) => {
  const { customizationId } = req.body;

  const userId = req.user?._id || null;
  const guestId = req.headers.guestid || req.headers["guest-id"] || null;

  if (!userId && !guestId) {
    throw new ApiError(400, "User or Guest ID required");
  }

  const cartQuery = userId ? { userId } : { guestId };

  const userCart = await Cart.findOne(cartQuery);
  if (!userCart) throw new ApiError(404, "Cart not found");

  userCart.items = userCart.items.filter(
    (item) => String(item.customizationId) !== String(customizationId)
  );

  await userCart.save();

  return {
    success: true,
    message: "Item removed from cart",
    data: userCart
  };
};


const addAddressToCart = async (req) => {
  const { deliveryAddressId, billingAddressId } = req.body;

  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const updatedCart = await Cart.findOneAndUpdate(
    { userId },
    {
      deliveryAddressId,
      billingAddressId
    },
    { new: true }
  );

  if (!updatedCart) {
    throw new ApiError(404, "Cart not found");
  }

  return {
    success: true,
    message: "Address added to cart",
    data: updatedCart
  };
};




module.exports = {
  addToCart,
  getCart,
  deleteCart,
  editCart,
  addAddressToCart
};