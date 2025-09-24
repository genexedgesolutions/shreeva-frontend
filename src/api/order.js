import axios from "axios";
import { apiConfig } from "../config/apiConfig";

const api = axios.create({
    baseURL: apiConfig.baseURL,
});

// Create Order (Checkout)
export const createOrder = async (orderData) => {
    try {
        const response = await api.post("/order/checkout", { orderData });
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

// Process Payment
export const processPayment = async (orderData) => {
    try {
        const response = await api.post("/orders/pay", orderData);
        return response.data;
    } catch (error) {
        console.error("Error processing payment:", error);
        throw error;
    }
};

// Verify Payment
export const verifyPayment = async (transactionId) => {
    try {
        const response = await api.post("/orders/verify-payment", { transactionId });
        return response.data;
    } catch (error) {
        console.error("Error verifying payment:", error);
        throw error;
    }
};

// Get User Orders
export const getUserOrders = async (userId) => {
    try {
        const response = await api.get(`/order/user-order/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user orders:", error);
        throw error;
    }
};

// Get Single Order Details
export const getOrderDetails = async (orderId) => {
    try {
        const response = await api.get(`/order/order-details/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order details:", error);
        throw error;
    }
};

// Cancel Order
export const cancelOrder = async (orderId) => {
    try {
        const response = await api.put(`/orders/cancel-order/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error canceling order:", error);
        throw error;
    }
};

// Update Order Status (Admin)
export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await api.put(`/orders/update-status/${orderId}`, { status });
        return response.data;
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
};

// Track Order by ID and Email
export const trackOrderById = async (email, orderId) => {
    try {
      const response = await api.post("/order/track-order", {
        email,
        orderId,
      });
  
      return response.data;
    } catch (error) {
      console.error("Error tracking order:", error);
      throw error;
    }
  };
  

export default api;
