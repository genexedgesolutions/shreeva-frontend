const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const apiConfig = {
    baseURL: API_BASE_URL || 'https://backend.shreevajewels.com/api/v1',
};
export { apiConfig };