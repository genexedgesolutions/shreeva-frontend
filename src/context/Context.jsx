import { getUserData } from "@/api/auth";
import {
  addToCart,
  addToWishlistBackend,
  removeWishlistItemBackend,
  updateCartItem,
} from "@/api/cart";
import ToastNotification from "@/components/modals/ToastNotification";
import useAuthorization from "@/hooks/userAuthorization";
import parseJwt from "@/utlis/jwt";
import { openCartModal } from "@/utlis/openCartModal";
import { openWistlistModal } from "@/utlis/openWishlist";

import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "./ToastContext";
import useProducts, { getProductsOnce } from "@/hooks/useProducts";
const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const isAuthorized = useAuthorization();
  const {products} = useProducts()
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [compareItem, setCompareItem] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);
const [quickAddItem, setQuickAddItem] = useState(null);
useEffect(() => {
  const fetchProducts = async () => {
    try {
      // Optionally set defaults
      if (products.length > 0) {
        setQuickViewItem(products[0]);
        setQuickAddItem(products[0].id);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  fetchProducts();
}, []);
    const [totalPrice, setTotalPrice] = useState(0);

  const [minThresholdFreeDelivery, setMinThresholdFreeDelivery] = useState(499);
  const [activeCoupon, setActiveCoupon] = useState("");
  const [orderNote, setOrderNote] = useState(null);
  const [discountDetails, setDiscountDetails] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState(
    null
  );
  const [finalOrderTotal, setFinalOrderTotal] = useState(0);
  // Add this state when initializing your component
  const { showToast } = useToast(); // ✅ Access toast function
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken._id) {
          const user = await getUserData(token);
          setUserId(user.user._id);
        }
      }
    };

    fetchUserData();
  }, [token]);

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
  
  
  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.offerPrice;
    }, 0);
    setTotalPrice(subtotal);
  
    const shippingCharge = selectedShippingOption?.charges || 0;
    const finalAmount = calculateFinalTotal(subtotal, shippingCharge, activeCoupon);
    setFinalOrderTotal(finalAmount);
  }, [cartProducts, selectedShippingOption, activeCoupon]);
  

  const applyCoupon = (coupon) => {
    if (!coupon) return;

    // Start fresh from the original total price
    let discountedPrice = totalPrice;

    let discountArray = []; // Clear previous coupons, only store the new one

    if (coupon.discountType === "flat") {
      discountedPrice -= coupon.discountValue;
      discountArray.push({
        value: coupon.discountValue,
        type: "Coupon",
        code: coupon.code,
        discount: `₹${coupon.discountValue} off`,
      });
    }
    if (coupon.discountType === "percentage") {
      const discountAmount = (totalPrice * coupon.discountValue) / 100;
      const finalDiscount = Math.min(
        discountAmount,
        coupon.maxDiscount || discountAmount
      );
      discountedPrice -= finalDiscount;

      discountArray.push({
        value: (totalPrice * coupon.discountValue) / 100,
        type: "Coupon",
        code: coupon.code,
        discount: `${coupon.discountValue}% off (₹${finalDiscount.toFixed(2)})`,
      });
    }

    // Apply free shipping
    if (coupon.isFreeShipping) {
      showToast("success", "Free Shipping Applied");
    }else{
      // Add shipping charges if any
    if (selectedShippingOption?.charges) {
      discountedPrice += selectedShippingOption.charges;
    }

    }
    // Update state with only the new coupon
    setDiscountDetails(discountArray);
    setFinalOrderTotal(Math.max(discountedPrice, 0));

    // Clear previous active coupon and set the new one
    setActiveCoupon(coupon);
    showToast("success", `Coupon ${coupon.code} Applied Successfully!`);
  };

  const isAddedToCartProducts = (id) => {
    return cartProducts.some((item) => item._id === id);
  };

  const addProductToCart = async (
    id,
    qty,
    product,
    activeSize,
    isModal = true
  ) => {
    const item = {
      productId: product._id,
      id: product._id,
      ...product,
      activeSize: activeSize || "",
      quantity: qty || 1,
    };

    if (!isAddedToCartProducts(id)) {
      // If user is not logged in, add to local state
      setCartProducts((prev) => [...prev, item]);
      if (isModal) {
        openCartModal();
      }

      // If user is logged in, send to backend
      if (isAuthorized) {
        try {
          await addToCart(userId, item.id, item.quantity, item.activeSize);
        } catch (error) {
          console.error("Error adding product to cart:", error);
        }
      }
    }
  };

  const updateQuantity = async (id, qty, activeSize) => {
    setCartProducts((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );

    // Update the quantity in the backend if the user is authorized
    if (isAuthorized && userId) {
      try {
        await updateCartItem(userId, id, qty, activeSize);
      } catch (error) {
        console.error("Error updating cart item quantity in backend:", error);
      }
    }
  };

  const addToWishlist = async (id) => {
    if (!wishList.includes(id)) {
      setWishList((pre) => [...pre, id]);
      if (isAuthorized && userId) {
        try {
          await addToWishlistBackend(userId, id);
        } catch (error) {
          console.error("Error updating cart item quantity in backend:", error);
        }
      }
      openWistlistModal();
    }
  };

  const removeFromWishlist = async (id) => {
    if (wishList.includes(id)) {
      setWishList((pre) => [...pre.filter((elm) => elm != id)]);
      if (isAuthorized && userId) {
        try {
          await removeWishlistItemBackend(userId, id);
        } catch (error) {
          console.error("Remove Error:", error);
        }
      }
    }
  };
  const addToCompareItem = (id) => {
    if (!compareItem.includes(id)) {
      setCompareItem((pre) => [...pre, id]);
    }
  };
  const removeFromCompareItem = (id) => {
    if (compareItem.includes(id)) {
      setCompareItem((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };
  const isAddedtoWishlist = (id) => {
    if (wishList.includes(id)) {
      return true;
    }
    return false;
  };
  const isAddedtoCompareItem = (id) => {
    if (compareItem.includes(id)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartList"));
    if (items?.length) {
      setCartProducts(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (items?.length) {
      setWishList(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const contextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
    updateQuantity,
    minThresholdFreeDelivery,
    applyCoupon,
    finalOrderTotal,
    setFinalOrderTotal,
    activeCoupon,
    setActiveCoupon,
    discountDetails,
    setDiscountDetails,
    setOrderNote,
    orderNote,
    setSelectedShippingOption,
    selectedShippingOption,
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
