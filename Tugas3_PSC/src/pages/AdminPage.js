import React, { useState } from "react";
import Sidebar from "../components/organisms/Sidebar";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import Modal from "../components/molecules/Modal";
import Button from "../components/atoms/Button";
import FormGroup from "../components/molecules/FormGroup";

function AdminPage({ onLogout }) {
  const [activeMenu, setActiveMenu] = useState("mahasiswa");
  const [showAddModal, setShowAddModal] = useState(false);
  const [students, setStudents] = useState([
    {
      id: 1,
      nama: "Ahmad Rizki",
      email: "ahmad@example.com",
      nim: "21001",
      angkatan: 2021,
    },
    {
      id: 2,
      nama: "Siti Nurhaliza",
      email: "siti@example.com",
      nim: "21002",
      angkatan: 2021,
    },
  ]);
  const [newStudent, setNewStudent] = useState({
    nama: "",
    email: "",
    nim: "",
    angkatan: 2024,
  });

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (newStudent.nama && newStudent.email && newStudent.nim) {
      setStudents([...students, { id: students.length + 1, ...newStudent }]);
      setNewStudent({ nama: "", email: "", nim: "", angkatan: 2024 });
      setShowAddModal(false);
    }
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

        {/* Main Content */}
        <div className="flex flex-col flex-1 bg-gray-50 overflow-auto">
          <Header
            title={activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
            onLogout={onLogout}
          />

          <main className="flex-1 p-6">
            {activeMenu === "dashboard" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-600 text-sm font-medium">
                    Total Mahasiswa
                  </h3>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {students.length}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-600 text-sm font-medium">Courses</h3>
                  <p className="text-3xl font-bold text-green-600 mt-2">12</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-600 text-sm font-medium">
                    Enrollment
                  </h3>
                  <p className="text-3xl font-bold text-purple-600 mt-2">45</p>
                </div>
              </div>
            )}

            {activeMenu === "mahasiswa" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Daftar Mahasiswa
                  </h2>
                  <Button
                    variant="primary"
                    onClick={() => setShowAddModal(true)}
                  >
                    + Tambah Mahasiswa
                  </Button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="px-6 py-3 text-left">Nama</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">NIM</th>
                        <th className="px-6 py-3 text-left">Angkatan</th>
                        <th className="px-6 py-3 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr
                          key={student.id}
                          className="border-t hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 text-gray-800">
                            {student.nama}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {student.email}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {student.nim}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {student.angkatan}
                          </td>
                          <td className="px-6 py-4 text-center space-x-2">
                            <Button
                              variant="secondary"
                              className="text-sm px-4 py-1"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              className="text-sm px-4 py-1"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              Hapus
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeMenu === "courses" && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Manajemen Courses
                </h2>
                <p className="text-gray-600">
                  Fitur manajemen courses akan segera hadir...
                </p>
              </div>
            )}

            {activeMenu === "settings" && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Pengaturan
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-700 font-medium">
                      Nama Sistem
                    </label>
                    <p className="text-gray-600">Sistem Manajemen Mahasiswa</p>
                  </div>
                  <div>
                    <label className="text-gray-700 font-medium">Versi</label>
                    <p className="text-gray-600">1.0.0</p>
                  </div>
                </div>
              </div>
            )}
          </main>

          <Footer />
        </div>
      </div>

      {/* Add Student Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Tambah Mahasiswa Baru"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleAddStudent}>
              Simpan
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <FormGroup
            id="nama"
            label="Nama Lengkap"
            placeholder="Masukkan nama"
            value={newStudent.nama}
            onChange={(e) =>
              setNewStudent({ ...newStudent, nama: e.target.value })
            }
            required
          />
          <FormGroup
            id="email"
            label="Email"
            type="email"
            placeholder="Masukkan email"
            value={newStudent.email}
            onChange={(e) =>
              setNewStudent({ ...newStudent, email: e.target.value })
            }
            required
          />
          <FormGroup
            id="nim"
            label="NIM"
            placeholder="Masukkan NIM"
            value={newStudent.nim}
            onChange={(e) =>
              setNewStudent({ ...newStudent, nim: e.target.value })
            }
            required
          />
          <FormGroup
            id="angkatan"
            label="Angkatan"
            type="number"
            value={newStudent.angkatan}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                angkatan: parseInt(e.target.value),
              })
            }
            required
          />
        </form>
      </Modal>
    </div>
  );
}

export default AdminPage;
