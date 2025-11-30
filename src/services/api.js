import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api/public`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor untuk handle error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Kandidat API (Public - No Auth)
export const kandidatAPI = {
  getAll: async (params = {}) => {
    const response = await api.get("/kandidat", { params });
    return response.data;
  },

  getByKategori: async (kategori) => {
    const response = await api.get("/kandidat", {
      params: { kategori },
    });
    return response.data;
  },

  getByPemilihan: async (pemilihanId) => {
    const response = await api.get("/kandidat", {
      params: { pemilihan_id: pemilihanId },
    });
    return response.data;
  },
};

// Quick Count API (Public - No Auth)
// AMAN: Hanya menampilkan agregat, tidak ada data siapa voting siapa
export const quickCountAPI = {
  getHasil: async (pemilihanId, jurusanId = null) => {
    const params = { pemilihan_id: pemilihanId };
    if (jurusanId) {
      params.jurusan_id = jurusanId;
    }
    
    const response = await api.get("/quick-count", { params });
    return response.data;
  },
};

// Pemilihan API (Public - No Auth)
export const pemilihanAPI = {
  getAll: async (status = null) => {
    const params = status ? { status } : {};
    const response = await api.get("/pemilihan", { params });
    return response.data;
  },

  getActive: async () => {
    const response = await api.get("/pemilihan/active");
    return response.data;
  },
};

// Jurusan API (Public - No Auth)
export const jurusanAPI = {
  getAll: async () => {
    const response = await api.get("/jurusan");
    return response.data;
  },
};

export default {
  kandidatAPI,
  quickCountAPI,
  pemilihanAPI,
  jurusanAPI,
};
