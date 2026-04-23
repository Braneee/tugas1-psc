import { useState } from "react";
import { Button } from "../components/atoms";
import { Header, Sidebar, Footer } from "../components/organisms";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";
import Notification from "../components/organisms/Notification";

const Mahasiswa = () => {
  // State mahasiswa
  const [mahasiswa, setMahasiswa] = useState([
    { nim: "20211002", name: "Siti Aminah", major: "Teknik Informatika" },
    { nim: "20211003", name: "Budi Santoso", major: "Sistem Informasi" },
  ]);

  // State selected mahasiswa
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);

  // State modal
  const [isModalOpen, setModalOpen] = useState(false);

  // State notification
  const [notification, setNotification] = useState(null);

  const sidebarItems = [
    { icon: "🏠", label: "Dashboard", href: "#" },
    { icon: "🎓", label: "Mahasiswa", href: "#" },
    { icon: "📊", label: "Laporan", href: "#" },
  ];

  // storeMahasiswa: tambah mahasiswa baru ke state mahasiswa
  const storeMahasiswa = (data) => {
    setMahasiswa([...mahasiswa, data]);
    setNotification({
      message: "Mahasiswa baru berhasil ditambahkan!",
      type: "success",
    });
  };

  // updateMahasiswa: update mahasiswa dengan nim dari state mahasiswa
  const updateMahasiswa = (nim, data) => {
    const updated = mahasiswa.map((m) => (m.nim === nim ? data : m));
    setMahasiswa(updated);
    setNotification({
      message: "Data mahasiswa berhasil diperbarui!",
      type: "success",
    });
  };

  // deleteMahasiswa: delete mahasiswa dengan nim dari state mahasiswa
  const deleteMahasiswa = (nim) => {
    const studentName = mahasiswa.find((m) => m.nim === nim)?.name;
    if (
      window.confirm(`Apakah Anda yakin ingin menghapus data ${studentName}?`)
    ) {
      setMahasiswa(mahasiswa.filter((m) => m.nim !== nim));
      setNotification({
        message: `Data ${studentName} berhasil dihapus!`,
        type: "success",
      });
    }
  };

  // openAddModal: set true pada state modal, set null pada state selected mahasiswa
  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  // openEditModal: set true pada state modal, set objek mahasiswa pada state selected mahasiswa
  const openEditModal = (nim) => {
    const selected = mahasiswa.find((m) => m.nim === nim);
    setSelectedMahasiswa(selected);
    setModalOpen(true);
  };

  // handleSubmit: kondisi ketika set selected mahasiswa terisi maka update, ketika tidak maka tambah baris baru
  const handleSubmit = (data) => {
    if (selectedMahasiswa) {
      updateMahasiswa(selectedMahasiswa.nim, data);
    } else {
      storeMahasiswa(data);
    }
    handleCloseModal();
  };

  // handleDelete: menerima parameter nim mahasiswa untuk dipassing ke deleteMahasiswa
  const handleDelete = (nim) => {
    deleteMahasiswa(nim);
  };

  // handleCloseModal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMahasiswa(null);
  };

  return (
    <div className="flex h-screen">
      <Sidebar items={sidebarItems} active="Mahasiswa" />

      <div className="flex flex-col flex-1">
        <Header
          title="Daftar Mahasiswa"
          onLogout={() => (window.location.href = "/")}
        />

        <main className="flex-1 p-6 overflow-auto bg-gray-100">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Data Mahasiswa
              </h2>
              <Button variant="primary" onClick={openAddModal}>
                + Tambah Mahasiswa
              </Button>
            </div>

            {/* Menampilkan komponen MahasiswaTable */}
            <MahasiswaTable
              mahasiswa={mahasiswa}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />

            <div className="mt-6 pt-6 border-t text-sm text-gray-600">
              <p>
                Total Mahasiswa: <strong>{mahasiswa.length}</strong>
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Menampilkan komponen MahasiswaModal */}
      <MahasiswaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
        existingNims={mahasiswa.map((m) => m.nim)}
      />

      {/* Notification */}
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </div>
  );
};

export default Mahasiswa;
