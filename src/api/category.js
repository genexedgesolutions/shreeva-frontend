import axios from "axios";
import { apiConfig } from "../config/apiConfig";

const api = axios.create({
    baseURL: apiConfig.baseURL,
});

// Create Category (with Image Upload)
export const createCategory = async (categoryData) => {
    try {
        const formData = new FormData();
        Object.keys(categoryData).forEach((key) => {
            if (key === "images") {
                categoryData.images.forEach((image) => {
                    formData.append("image", image);
                });
            } else {
                formData.append(key, categoryData[key]);
            }
        });

        const response = await api.post("/products/create-category", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

// Get All Categories
export const getAllCategories = async () => {
    try {
        const response = await api.get("/products/get-all-categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// get single category by slug
export const getCategoryBySlug = async (slug, page = 1, limit = 50) => {
  try {
    const response = await api.get(
      `/products/get-product-category-by-slug/${slug}`,
      {
        params: { page, limit }, // optional pagination
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching category by slug "${slug}":`, error);
    throw error;
  }
};

// Delete Category
export const deleteCategory = async (categoryId) => {
    try {
        const response = await api.delete(`/products/delete-category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};

export default api;
