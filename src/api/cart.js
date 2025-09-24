import axios from "axios";
import { apiConfig } from "../config/apiConfig";

const api = axios.create({
    baseURL: apiConfig.baseURL,
});

// CART API FUNCTIONS

// Add to Cart API
export const addToCart = async (userId=null, productId, quantity = 1, activeSize) => {
  try {
    const response = await api.post("/cart/add-to-cart", {userId, productId, quantity, activeSize });
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const updateCartQuantity = async (userId = null, productId, quantity, activeSize) => {
  try {
    const response = await api.post("/cart/update-quantity", {
      userId,
      productId,
      quantity,
      activeSize,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
};

// Get Cart Items
export const getCartItems = async (userId) => {
    try {
        const response = await api.get("/cart/get-cart", {
            params: { userId }, // 👈 Pass userId as query param
        });
        return response.data.cart;
    } catch (error) {
        console.error("Error fetching cart items:", error);
        throw error;
    }
};


// Update Cart Item Quantity
export const updateCartItem = async (userId=null,productId, quantity, activeSize=null) => {
    try {
        const response = await api.put("/cart/update-quantity", { userId, productId, quantity, activeSize });
        return response.data;
    } catch (error) {
        console.error("Error updating cart item:", error);
        throw error;
    }
};

// Remove Item from Cart
export const removeFromCart = async (userId = null, productId, activeSize) => {
  try {
    const response = await api.delete("/cart/remove-from-cart", {
      data: {
        userId,
        productId,
        activeSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
};

export const clearCart = async (userId) => {
  try {
    const response = await api.post("/cart/clear-cart", { userId });
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

// WISHLIST API FUNCTIONS

// Add to Wishlist
export const addToWishlistBackend = async (userId, productId) => {
  try {
    const response = await api.post("/wishlist/add-to-wishlist", { userId, productId });
    return response.data;
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    throw error;
  }
};

// Get Wishlist Items
export const getWishlistItems = async (userId) => {
  try {
    const response = await api.get(`/wishlist/get-wishlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    throw error;
  }
};

// Remove Item from Wishlist
export const removeWishlistItemBackend = async (userId, productId) => {
  try {
    const response = await api.post("/wishlist/remove-from-wishlist", { userId, productId });
    return response.data;
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    throw error;
  }
};

// Clear Wishlist
export const clearWishlist = async (userId) => {
  try {
    const response = await api.delete(`/wishlist/clear-wishlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    throw error;
  }
};



export default api;
