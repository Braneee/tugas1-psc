import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Authentication APIs
export const loginUser = (email, password) => {
  return API.post("/login", { email, password });
};

export const registerUser = (email, password) => {
  return API.post("/register", { email, password });
};

// Mahasiswa CRUD APIs
export const getMahasiswa = () => {
  return API.get("/mahasiswa");
};

export const createMahasiswa = (data) => {
  return API.post("/mahasiswa", data);
};

export const updateMahasiswa = (nim, data) => {
  return API.put(`/mahasiswa/${nim}`, data);
};

export const deleteMahasiswa = (nim) => {
  return API.delete(`/mahasiswa/${nim}`);
};

// Dosen CRUD APIs
export const getDosen = () => {
  return API.get("/dosen");
};

export const createDosen = (data) => {
  return API.post("/dosen", data);
};

export const updateDosen = (nidn, data) => {
  return API.put(`/dosen/${nidn}`, data);
};

export const deleteDosen = (nidn) => {
  return API.delete(`/dosen/${nidn}`);
};

// Mata Kuliah CRUD APIs
export const getMataKuliah = () => {
  return API.get("/matakuliah");
};

export const createMataKuliah = (data) => {
  return API.post("/matakuliah", data);
};

export const updateMataKuliah = (kode, data) => {
  return API.put(`/matakuliah/${kode}`, data);
};

export const deleteMataKuliah = (kode) => {
  return API.delete(`/matakuliah/${kode}`);
};

// User Access Control APIs
export const getUsers = () => {
  return API.get("/users");
};

export const updateUserRolePermissions = (email, data) => {
  return API.put(`/users/${email}/role-permissions`, data);
};

// Kelas CRUD APIs
export const getKelas = () => {
  return API.get("/kelas");
};

export const createKelas = (data) => {
  return API.post("/kelas", data);
};

export const updateKelas = (kode, data) => {
  return API.put(`/kelas/${kode}`, data);
};

export const deleteKelas = (kode) => {
  return API.delete(`/kelas/${kode}`);
};

export default API;
