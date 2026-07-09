import { useState, useEffect } from "react";

const DosenModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedDosen,
  existingNidns = [],
}) => {
  const [form, setForm] = useState({
    nidn: "",
    nama: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedDosen) {
      setForm({
        nidn: selectedDosen.nidn,
        nama: selectedDosen.nama,
        email: selectedDosen.email,
      });
    } else {
      setForm({
        nidn: "",
        nama: "",
        email: "",
      });
    }
    setErrors({});
  }, [selectedDosen, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nidn.trim()) {
      newErrors.nidn = "NIDN harus diisi";
    } else if (!/^\d+$/.test(form.nidn)) {
      newErrors.nidn = "NIDN harus berupa angka";
    } else if (!selectedDosen && existingNidns.includes(form.nidn)) {
      newErrors.nidn = "NIDN sudah terdaftar!";
    }

    if (!form.nama.trim()) {
      newErrors.nama = "Nama dosen harus diisi";
    } else if (form.nama.trim().length < 3) {
      newErrors.nama = "Nama minimal 3 karakter";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(form);
      setForm({ nidn: "", nama: "", email: "" });
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
              {selectedDosen ? "✏️ Edit Dosen" : "➕ Tambah Dosen"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {selectedDosen
                ? "Perbarui data dosen di bawah ini"
                : "Masukkan data dosen baru"}
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
          {/* NIDN Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              NIDN <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nidn"
              placeholder="Contoh: 0412088501"
              value={form.nidn}
              onChange={handleChange}
              disabled={!!selectedDosen}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.nidn ? "border-red-500 bg-red-50" : "border-gray-300"
              } ${selectedDosen ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {errors.nidn && (
              <p className="text-sm text-red-500 mt-1">⚠️ {errors.nidn}</p>
            )}
          </div>

          {/* Nama Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Lengkap & Gelar <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama"
              placeholder="Contoh: Siti Rahmawati, M.Cs."
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

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Contoh: dosen@kampus.ac.id"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">⚠️ {errors.email}</p>
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
              {selectedDosen ? "Update" : "Tambah"}
            </button>
          </div>
        </form>

        {/* Info Text */}
        <p className="text-xs text-gray-500 text-center">
          {selectedDosen
            ? "NIDN tidak dapat diubah"
            : "Pastikan data sudah benar"}
        </p>
      </div>
    </div>
  );
};

export default DosenModal;
