import axios from "axios";
import { apiConfig } from "../config/apiConfig";

const api = axios.create({
    baseURL: apiConfig.baseURL,
});

// ✅ Submit a Review
export const submitReview = async (reviewData) => {
    try {
        const response = await api.post("/products/createreview", reviewData);
        return response.data;
    } catch (error) {
        console.error("Error submitting review:", error);
        throw error;
    }
};

// ✅ Get All Reviews for a Product
export const getProductReviews = async (productId) => {
    try {
        const response = await api.get(`/reviews/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw error;
    }
};
export const getAllReviews = async (productId) => {
    try {
        const response = await api.get(`/reviews/all`);
        return response.data.products;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw error;
    }
};

// ✅ Delete a Review (Admin Only)
export const deleteReview = async (reviewId) => {
    try {
        const response = await api.delete(`/reviews/${reviewId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting review:", error);
        throw error;
    }
};

export default api;
