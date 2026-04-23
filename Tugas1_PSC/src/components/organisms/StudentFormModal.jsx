import { useState } from "react";
import { Button } from "../atoms";
import { FormGroup } from "../molecules";

const StudentFormModal = ({
  isOpen,
  onClose,
  onConfirm,
  initialData = { nim: "", name: "", major: "" },
  isEditing = false,
  existingNims = [],
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nim.trim()) {
      newErrors.nim = "NIM harus diisi";
    } else if (!/^\d+$/.test(formData.nim)) {
      newErrors.nim = "NIM harus berupa angka";
    } else if (!isEditing && existingNims.includes(formData.nim)) {
      newErrors.nim = "NIM sudah terdaftar!";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Nama harus diisi";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Nama minimal 3 karakter";
    }

    if (!formData.major.trim()) {
      newErrors.major = "Jurusan harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onConfirm(formData);
      setFormData({ nim: "", name: "", major: "" });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData(initialData);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditing ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isEditing
                ? "Perbarui data mahasiswa di bawah ini"
                : "Masukkan data mahasiswa baru"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form Content */}
        <div className="space-y-5 mb-6">
          {/* NIM Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              NIM <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: 20211002"
              value={formData.nim}
              onChange={(e) =>
                setFormData({ ...formData, nim: e.target.value })
              }
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.nim ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              disabled={isEditing}
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
              placeholder="Contoh: Siti Aminah"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
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
              value={formData.major}
              onChange={(e) =>
                setFormData({ ...formData, major: e.target.value })
              }
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
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {isEditing ? "Update" : "Tambah"}
          </button>
        </div>

        {/* Info Text */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          {isEditing ? "NIM tidak dapat diubah" : "Pastikan data sudah benar"}
        </p>
      </div>
    </div>
  );
};

export default StudentFormModal;
