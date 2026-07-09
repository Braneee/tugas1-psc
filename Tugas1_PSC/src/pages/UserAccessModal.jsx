import { useState, useEffect } from "react";

const UserAccessModal = ({ isOpen, onClose, onSubmit, selectedUser }) => {
  const [role, setRole] = useState("Guest");
  const [permissions, setPermissions] = useState([]);

  const availablePermissions = [
    { key: "manage_users", label: "Manage Users (Mengelola User)" },
    { key: "manage_mahasiswa", label: "Manage Mahasiswa (Mengelola Mahasiswa)" },
    { key: "manage_dosen", label: "Manage Dosen (Mengelola Dosen)" },
    { key: "manage_matkul", label: "Manage Mata Kuliah (Mengelola Mata Kuliah)" },
  ];

  useEffect(() => {
    if (selectedUser) {
      setRole(selectedUser.role || "Guest");
      setPermissions(selectedUser.permissions || ["read_mahasiswa"]);
    }
  }, [selectedUser, isOpen]);

  const handlePermissionChange = (key) => {
    setPermissions((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      email: selectedUser.email,
      role,
      permissions,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">🔑 Edit Hak Akses</h2>
            <p className="text-sm text-gray-500 mt-1">
              Sesuaikan Role &amp; Permission untuk user di bawah ini
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
          {/* User Email (Read-Only) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email User
            </label>
            <input
              type="text"
              value={selectedUser?.email || ""}
              disabled
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed font-medium"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Role / Peran <span className="text-red-500">*</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Dosen">Dosen</option>
              <option value="Guest">Guest</option>
            </select>
          </div>

          {/* Permissions Checkboxes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Permissions / Hak Akses
            </label>
            <div className="space-y-2.5 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
              {availablePermissions.map((p) => (
                <label key={p.key} className="flex items-start cursor-pointer hover:bg-gray-100 p-1.5 rounded transition">
                  <input
                    type="checkbox"
                    checked={permissions.includes(p.key)}
                    onChange={() => handlePermissionChange(p.key)}
                    className="mt-1 mr-3 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 font-medium select-none">
                    {p.label}
                  </span>
                </label>
              ))}
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
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAccessModal;
