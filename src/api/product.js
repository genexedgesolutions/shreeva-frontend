import axios from "axios";
import { apiConfig } from "../config/apiConfig";

const api = axios.create({
    baseURL: apiConfig.baseURL,
});

// Create Product (with Image Upload)
export const createProduct = async (productData) => {
    try {
        const formData = new FormData();
        Object.keys(productData).forEach((key) => {
            if (key === "images") {
                productData.images.forEach((image) => {
                    formData.append("image", image);
                });
            } else {
                formData.append(key, productData[key]);
            }
        });

        const response = await api.post("/products/create-product", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

// Get All Products
export const getAllProducts = async () => {
    try {
        const response = await api.get("/products/get-all-product");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

// Get Single Product
export const getSingleProduct = async (productSlug) => {
    try {
        const response = await api.get(`/products/get-single-product/${productSlug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};

// Update Product
export const updateProduct = async (productId, updatedData) => {
    try {
        const formData = new FormData();
        Object.keys(updatedData).forEach((key) => {
            if (key === "images") {
                updatedData.images.forEach((image) => {
                    formData.append("image", image);
                });
            } else {
                formData.append(key, updatedData[key]);
            }
        });

        const response = await api.put(`/products/update-product/${productId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

// Delete Product
export const deleteProduct = async (productId) => {
    try {
        const response = await api.delete(`/products/delete-product/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

// Insert Multiple Products
export const insertManyProducts = async (products) => {
    try {
        const response = await api.post("/products/many-products", products);
        return response.data;
    } catch (error) {
        console.error("Error inserting multiple products:", error);
        throw error;
    }
};

// Get All Products (Alternative Route)
export const getAllProductsTwo = async () => {
    try {
        const response = await api.get("/products/get-products");
        return response.data;
    } catch (error) {
        console.error("Error fetching products (alternative route):", error);
        throw error;
    }
};

export default api;
