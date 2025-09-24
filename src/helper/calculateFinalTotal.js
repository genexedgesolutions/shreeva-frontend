const calculateFinalTotal = (subtotal, shipping = 0, coupon = null) => {
    let discountedPrice = subtotal;
    let discountArray = [];
  
    if (coupon) {
      if (coupon.discountType === "flat") {
        discountedPrice -= coupon.discountValue;
        discountArray.push({
          value: coupon.discountValue,
          type: "Coupon",
          code: coupon.code,
          discount: `₹${coupon.discountValue} off`,
        });
      } else if (coupon.discountType === "percentage") {
        const discountAmount = (subtotal * coupon.discountValue) / 100;
        const finalDiscount = Math.min(discountAmount, coupon.maxDiscount || discountAmount);
        discountedPrice -= finalDiscount;
  
        discountArray.push({
          value: discountAmount,
          type: "Coupon",
          code: coupon.code,
          discount: `${coupon.discountValue}% off (₹${finalDiscount.toFixed(2)})`,
        });
      }
    }
  
    if (!coupon?.isFreeShipping) {
      discountedPrice += shipping;
    }
  
    setDiscountDetails(discountArray);
    return Math.max(discountedPrice, 0);
  };
  