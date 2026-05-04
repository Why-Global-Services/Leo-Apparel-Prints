const calculateFinalPrice = (basePrice, discountType, discountValue) => {
  let finalPrice = basePrice;

  if (discountType === "percentage") {
    finalPrice = basePrice - (basePrice * discountValue / 100);
  } else if (discountType === "amount") {
    finalPrice = basePrice - discountValue;
  }

  // Prevent negative price
  if (finalPrice < 0) finalPrice = 0;

  return finalPrice;
};





module.exports = calculateFinalPrice