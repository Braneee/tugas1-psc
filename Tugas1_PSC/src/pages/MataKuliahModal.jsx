import { useState, useEffect } from "react";

const MataKuliahModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedMataKuliah,
  existingKodes = [],
}) => {
  const [form, setForm] = useState({
    kode: "",
    nama: "",
    sks: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedMataKuliah) {
      setForm({
        kode: selectedMataKuliah.kode,
        nama: selectedMataKuliah.nama,
        sks: selectedMataKuliah.sks.toString(),
      });
    } else {
      setForm({
        kode: "",
        nama: "",
        sks: "",
      });
    }
    setErrors({});
  }, [selectedMataKuliah, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.kode.trim()) {
      newErrors.kode = "Kode harus diisi";
    } else if (!/^[A-Za-z0-9]+$/.test(form.kode)) {
      newErrors.kode = "Kode hanya boleh berisi huruf dan angka";
    } else if (!selectedMataKuliah && existingKodes.includes(form.kode)) {
      newErrors.kode = "Kode mata kuliah sudah terdaftar!";
    }

    if (!form.nama.trim()) {
      newErrors.nama = "Nama mata kuliah harus diisi";
    } else if (form.nama.trim().length < 3) {
      newErrors.nama = "Nama minimal 3 karakter";
    }

    if (!form.sks.trim()) {
      newErrors.sks = "SKS harus diisi";
    } else {
      const sksVal = parseInt(form.sks);
      if (isNaN(sksVal) || sksVal < 1 || sksVal > 6) {
        newErrors.sks = "SKS harus bernilai antara 1 s/d 6";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        ...form,
        sks: parseInt(form.sks),
      });
      setForm({ kode: "", nama: "", sks: "" });
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedMataKuliah ? "✏️ Edit Mata Kuliah" : "➕ Tambah Mata Kuliah"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {selectedMataKuliah
                ? "Perbarui data mata kuliah di bawah ini"
                : "Masukkan data mata kuliah baru"}
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
          {/* Kode Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kode Mata Kuliah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="kode"
              placeholder="Contoh: MK004"
              value={form.kode}
              onChange={handleChange}
              disabled={!!selectedMataKuliah}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.kode ? "border-red-500 bg-red-50" : "border-gray-300"
              } ${selectedMataKuliah ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {errors.kode && (
              <p className="text-sm text-red-500 mt-1">⚠️ {errors.kode}</p>
            )}
          </div>

          {/* Nama Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Mata Kuliah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama"
              placeholder="Contoh: Pemrograman Sisi Klien"
              value={form.nama}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.nama ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.nama && (
              <p className="text-sm text-red-500 mt-1">⚠️ {errors.nama}</p>
            )}
          </div>

          {/* SKS Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              SKS <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="sks"
              min="1"
              max="6"
              placeholder="Contoh: 3"
              value={form.sks}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.sks ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.sks && (
              <p className="text-sm text-red-500 mt-1">⚠️ {errors.sks}</p>
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
              {selectedMataKuliah ? "Update" : "Tambah"}
            </button>
          </div>
        </form>

        {/* Info Text */}
        <p className="text-xs text-gray-500 text-center">
          {selectedMataKuliah
            ? "Kode tidak dapat diubah"
            : "Pastikan data sudah benar"}
        </p>
      </div>
    </div>
  );
};

export default MataKuliahModal;
