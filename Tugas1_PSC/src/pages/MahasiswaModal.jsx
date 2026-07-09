import { useState, useEffect } from "react";
import { Button } from "../components/atoms";

const MahasiswaModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedMahasiswa,
  existingNims = [],
}) => {
  // state form: form, setForm
  const [form, setForm] = useState({
    nim: "",
    name: "",
    major: "",
  });

  const [errors, setErrors] = useState({});

  // useEffect: ketika selectedMahasiswa ada maka setForm di isi dengan detail selectedMahasiswanya
  useEffect(() => {
    if (selectedMahasiswa) {
      setForm({
        nim: selectedMahasiswa.nim,
        name: selectedMahasiswa.name,
        major: selectedMahasiswa.major,
      });
    } else {
      setForm({
        nim: "",
        name: "",
        major: "",
      });
    }
    setErrors({});
  }, [selectedMahasiswa, isOpen]);

  // handleChange: untuk form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form validasi: berikan validasi yang diperlukan
  const validateForm = () => {
    const newErrors = {};

    if (!form.nim.trim()) {
      newErrors.nim = "NIM harus diisi";
    } else if (!/^\d+$/.test(form.nim)) {
      newErrors.nim = "NIM harus berupa angka";
    } else if (!selectedMahasiswa && existingNims.includes(form.nim)) {
      newErrors.nim = "NIM sudah terdaftar!";
    }

    if (!form.name.trim()) {
      newErrors.name = "Nama harus diisi";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Nama minimal 3 karakter";
    }

    if (!form.major.trim()) {
      newErrors.major = "Jurusan harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handleSubmit: panggil onSubmit dengan parameter state form lalu panggil onClose
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(form);
      setForm({ nim: "", name: "", major: "" });
      setErrors({});
    }
  };

  // ketika isModalOpen false maka null
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedMahasiswa ? "✏️ Edit Mahasiswa" : "➕ Tambah Mahasiswa"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {selectedMahasiswa
                ? "Perbarui data mahasiswa di bawah ini"
                : "Masukkan data mahasiswa baru"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mb-6">
          {/* NIM Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              NIM <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nim"
              placeholder="Contoh: 20211002"
              value={form.nim}
              onChange={handleChange}
              disabled={selectedMahasiswa ? true : false}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.nim ? "border-red-500 bg-red-50" : "border-gray-300"
              } ${selectedMahasiswa ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {errors.nim && (
              <p className="text-sm text-red-500 mt-1">⚠️ {errors.nim}</p>
            )}
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Contoh: Siti Aminah"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">⚠️ {errors.name}</p>
            )}
          </div>

          {/* Major Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Jurusan <span className="text-red-500">*</span>
            </label>
            <select
              name="major"
              value={form.major}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.major ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            >
              <option value="">-- Pilih Jurusan --</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Teknik Komputer">Teknik Komputer</option>
              <option value="Manajemen Informatika">
                Manajemen Informatika
              </option>
              <option value="Rekayasa Perangkat Lunak">
                Rekayasa Perangkat Lunak
              </option>
            </select>
            {errors.major && (
              <p className="text-sm text-red-500 mt-1">⚠️ {errors.major}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              {selectedMahasiswa ? "Update" : "Tambah"}
            </button>
          </div>
        </form>

        {/* Info Text */}
        <p className="text-xs text-gray-500 text-center">
          {selectedMahasiswa
            ? "NIM tidak dapat diubah"
            : "Pastikan data sudah benar"}
        </p>
      </div>
    </div>
  );
};

export default MahasiswaModal;
