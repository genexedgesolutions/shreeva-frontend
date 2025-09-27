// frontend/src/lib/api.js
import axios from "axios";
import { apiConfig } from "../config/apiConfig";

const api = axios.create({
  baseURL: apiConfig.baseURL,
  withCredentials: true, // if your API uses cookies / auth
  headers: {
    "Accept": "application/json",
  },
});

export default api;
