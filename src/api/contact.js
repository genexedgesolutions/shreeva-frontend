import axios from "axios";
import { apiConfig } from "../config/apiConfig";

const api = axios.create({
  baseURL: apiConfig.baseURL,
  headers: { "Content-Type": "application/json" }, // Default Headers
});

// Send Contact Message
export const sendContactMessage = async (contactData) => {
  try {
    const response = await api.post("/contact", JSON.stringify(contactData), {
      headers: { "Content-Type": "application/json" }, // Ensure Headers
    });

    return response.data;
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw error;
  }
};

export default api;
