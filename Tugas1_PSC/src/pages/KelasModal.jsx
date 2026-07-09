import { useState, useEffect } from "react";

const KelasModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedKelas,
  existingKodes = [],
  mataKuliah = [],
  dosen = [],
  mahasiswa = [],
}) => {
  const [form, setForm] = useState({
    kode: "",
    nama: "",
    ruangan: "",
    matkulKode: "",
    dosenNidn: "",
    mahasiswaNims: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedKelas) {
      setForm({
        kode: selectedKelas.kode,
        nama: selectedKelas.nama,
        ruangan: selectedKelas.ruangan,
        matkulKode: selectedKelas.matkulKode || "",
        dosenNidn: selectedKelas.dosenNidn || "",
        mahasiswaNims: selectedKelas.mahasiswaNims || [],
      });
    } else {
      setForm({
        kode: "",
        nama: "",
        ruangan: "",
        matkulKode: "",
        dosenNidn: "",
        mahasiswaNims: [],
      });
    }
    setErrors({});
  }, [selectedKelas, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (nim) => {
    setForm((prev) => {
      const isChecked = prev.mahasiswaNims.includes(nim);
      const newNims = isChecked
        ? prev.mahasiswaNims.filter((x) => x !== nim)
        : [...prev.mahasiswaNims, nim];
      return {
        ...prev,
        mahasiswaNims: newNims,
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.kode.trim()) {
      newErrors.kode = "Kode kelas harus diisi";
    } else if (!/^[A-Za-z0-9-]+$/.test(form.kode)) {
      newErrors.kode = "Kode hanya boleh berisi huruf, angka, dan strip (-)";
    } else if (!selectedKelas && existingKodes.includes(form.kode)) {
      newErrors.kode = "Kode kelas sudah terdaftar!";
    }

    if (!form.nama.trim()) {
      newErrors.nama = "Nama kelas harus diisi";
    } else if (form.nama.trim().length < 3) {
      newErrors.nama = "Nama kelas minimal 3 karakter";
    }

    if (!form.ruangan.trim()) {
      newErrors.ruangan = "Ruangan harus diisi";
    } else if (form.ruangan.trim().length < 2) {
      newErrors.ruangan = "Nama ruangan minimal 2 karakter";
    }

    if (!form.matkulKode) {
      newErrors.matkulKode = "Mata kuliah harus dipilih";
    }

    if (!form.dosenNidn) {
      newErrors.dosenNidn = "Dosen pengampu harus dipilih";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(form);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md my-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedKelas ? "✏️ Edit Kelas" : "➕ Tambah Kelas"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {selectedKelas
                ? "Perbarui data kelas di bawah ini"
                : "Masukkan data kelas baru"}
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
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {/* Kode Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Kode Kelas <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="kode"
              placeholder="Contoh: K-001"
              value={form.kode}
              onChange={handleChange}
              disabled={!!selectedKelas}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.kode ? "border-red-500 bg-red-50" : "border-gray-300"
              } ${selectedKelas ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {errors.kode && (
              <p className="text-sm text-red-500 mt-1">⚠️ {errors.kode}</p>
            )}
          </div>

          {/* Nama Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Nama Kelas <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama"
              placeholder="Contoh: Kelas A"
              value={form.nama}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.nama ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.nama && (
              <p className="text-sm text-red-500 mt-1">⚠️ {errors.nama}</p>
            )}
          </div>

          {/* Ruangan Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Ruangan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ruangan"
              placeholder="Contoh: Lab 01 / R.302"
              value={form.ruangan}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.ruangan ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.ruangan && (
              <p className="text-sm text-red-500 mt-1">⚠️ {errors.ruangan}</p>
            )}
          </div>

          {/* Mata Kuliah Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Mata Kuliah <span className="text-red-500">*</span>
            </label>
            <select
              name="matkulKode"
              value={form.matkulKode}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.matkulKode ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            >
              <option value="">-- Pilih Mata Kuliah --</option>
              {mataKuliah.map((mk) => (
                <option key={mk.kode} value={mk.kode}>
                  {mk.nama} ({mk.sks} SKS)
                </option>
              ))}
            </select>
            {errors.matkulKode && (
              <p className="text-sm text-red-500 mt-1">⚠️ {errors.matkulKode}</p>
            )}
          </div>

          {/* Dosen Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Dosen Pengampu <span className="text-red-500">*</span>
            </label>
            <select
              name="dosenNidn"
              value={form.dosenNidn}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.dosenNidn ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            >
              <option value="">-- Pilih Dosen Pengampu --</option>
              {dosen.map((d) => (
                <option key={d.nidn} value={d.nidn}>
                  {d.nama} (Diajar: {d.sksTaught || 0}/12 SKS)
                </option>
              ))}
            </select>
            {errors.dosenNidn && (
              <p className="text-sm text-red-500 mt-1">⚠️ {errors.dosenNidn}</p>
            )}
          </div>

          {/* Mahasiswa checklist */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Pilih Mahasiswa Kelas
            </label>
            <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto space-y-2 bg-gray-50">
              {mahasiswa.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-2">Tidak ada mahasiswa terdaftar</p>
              ) : (
                mahasiswa.map((m) => {
                  const isChecked = form.mahasiswaNims.includes(m.nim);
                  return (
                    <label
                      key={m.nim}
                      className="flex items-start space-x-3 cursor-pointer hover:bg-gray-100 p-1.5 rounded transition"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(m.nim)}
                        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                      />
                      <div className="text-sm">
                        <div className="font-semibold text-gray-800 leading-tight">{m.name}</div>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">
                          NIM: {m.nim} &bull; Diambil: {m.sksTaken || 0}/24 SKS
                        </div>
                      </div>
                    </label>
                  );
                })
              )}
            </div>
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
              {selectedKelas ? "Update" : "Tambah"}
            </button>
          </div>
        </form>

        {/* Info Text */}
        <p className="text-xs text-gray-500 text-center">
          {selectedKelas
            ? "Kode tidak dapat diubah"
            : "Pastikan data sudah benar"}
        </p>
      </div>
    </div>
  );
};

export default KelasModal;
