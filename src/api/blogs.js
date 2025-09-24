import axios from "axios";
import { apiConfig } from "../config/apiConfig";

const api = axios.create({
    baseURL: apiConfig.baseURL,
});

// Create Blog Post (with Image Upload)
export const createBlog = async (blogData) => {
    try {
        const formData = new FormData();
        Object.keys(blogData).forEach((key) => {
            if (key === "images") {
                blogData.images.forEach((image) => {
                    formData.append("image", image);
                });
            } else {
                formData.append(key, blogData[key]);
            }
        });

        const response = await api.post("/blogs/create", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Error creating blog:", error);
        throw error;
    }
};

// Get All Blogs
export const getAllBlogs = async () => {
    try {
        const response = await api.get("/blogs/get-all-blogs");
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error;
    }
};

// Get Blogs by Category
export const getBlogsByCategory = async (category) => {
    try {
        const response = await api.get(`/blogs/category/${category}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching blogs for category ${category}:`, error);
        throw error;
    }
};

// Get Blog by ID
export const getBlogBySlug = async (slug) => {
    try {
        const response = await api.get(`/blogs/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching blog:", error);
        throw error;
    }
};


// Update Blog Post
export const updateBlog = async (blogId, updatedData) => {
    try {
        const response = await api.put(`/blogs/update/${blogId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating blog:", error);
        throw error;
    }
};

// Delete Blog Post
export const deleteBlog = async (blogId) => {
    try {
        const response = await api.delete(`/blogs/delete/${blogId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting blog:", error);
        throw error;
    }
};

// Get Categories for Blogs
export const getAllBlogCategories = async () => {
    try {
        const response = await api.get("/blogs/get-categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching blog categories:", error);
        throw error;
    }
};

// Add a Comment
export const addComment = async (slug, commentData) => {
    try {
        const response = await api.post(`/blogs/${slug}/comment`, commentData);
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};

// Delete a Comment
export const deleteComment = async (slug, commentId) => {
    try {
        const response = await api.delete(`/blogs/${slug}/comment/${commentId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};

// Edit a Comment
export const editComment = async (slug, commentId, updatedText) => {
    try {
        const response = await api.put(`/blogs/${slug}/comment/${commentId}`, { text: updatedText });
        return response.data;
    } catch (error) {
        console.error("Error editing comment:", error);
        throw error;
    }
};

export default api;
