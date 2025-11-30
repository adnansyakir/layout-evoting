import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Kandidat API (Public)
export const kandidatAPI = {
  getAll: async (params = {}) => {
    const response = await api.get("/kandidat/public", { params });
    return response.data;
  },
};

// Jurusan API (Public)
export const jurusanAPI = {
  getAll: async () => {
    const response = await api.get("/jurusan/public");
    return response.data;
  },
};

// Pemilihan API (Public)
export const pemilihanAPI = {
  getAll: async () => {
    const response = await api.get("/pemilihan/public");
    return response.data;
  },
};

// Suara/Vote API (Public - untuk Quick Count)
export const suaraAPI = {
  getResults: async (pemilihan_id, jurusan_id = null) => {
    const params = { pemilihan_id };
    if (jurusan_id) params.jurusan_id = jurusan_id;
    const response = await api.get("/vote/results", { params });
    return response.data;
  },
  getResultsPublic: async () => {
    const response = await api.get("/vote/results/public");
    return response.data;
  },
};

export default api;
