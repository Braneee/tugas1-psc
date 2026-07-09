import { useState, useEffect } from "react";
import { Button } from "../components/atoms";
import { Header, Sidebar, Footer } from "../components/organisms";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";
import DosenTable from "./DosenTable";
import DosenModal from "./DosenModal";
import MataKuliahTable from "./MataKuliahTable";
import MataKuliahModal from "./MataKuliahModal";
import KelasTable from "./KelasTable";
import KelasModal from "./KelasModal";
import UserTable from "./UserTable";
import UserAccessModal from "./UserAccessModal";
import { showConfirmDialog } from "../helpers/swalHelper";
import { showToast } from "../helpers/toastHelper";
import {
  getUsers,
  updateUserRolePermissions,
} from "../services/api";
import { useMahasiswa } from "../utils/useMahasiswa";
import { useDosen } from "../utils/useDosen";
import { useMataKuliah } from "../utils/useMataKuliah";
import { useKelas } from "../utils/useKelas";
import DashboardContent from "./DashboardContent";

const Mahasiswa = () => {
  // State Active Menu
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // React Query Hooks
  const {
    mahasiswa,
    isLoading: isMahasiswaLoading,
    createMahasiswa: mutationCreateMahasiswa,
    updateMahasiswa: mutationUpdateMahasiswa,
    deleteMahasiswa: mutationDeleteMahasiswa,
  } = useMahasiswa();

  const {
    dosen,
    isLoading: isDosenLoading,
    createDosen: mutationCreateDosen,
    updateDosen: mutationUpdateDosen,
    deleteDosen: mutationDeleteDosen,
  } = useDosen();

  const {
    mataKuliah,
    isLoading: isMatkulLoading,
    createMataKuliah: mutationCreateMataKuliah,
    updateMataKuliah: mutationUpdateMataKuliah,
    deleteMataKuliah: mutationDeleteMataKuliah,
  } = useMataKuliah();

  const {
    kelas,
    isLoading: isKelasLoading,
    createKelas: mutationCreateKelas,
    updateKelas: mutationUpdateKelas,
    deleteKelas: mutationDeleteKelas,
  } = useKelas();

  // Helper functions for SKS calculation
  const getSksTakenByMahasiswa = (nim) => {
    let totalSks = 0;
    kelas.forEach((kls) => {
      if (kls.mahasiswaNims && kls.mahasiswaNims.includes(nim)) {
        const mk = mataKuliah.find((m) => m.kode === kls.matkulKode);
        if (mk) {
          totalSks += mk.sks;
        }
      }
    });
    return totalSks;
  };

  const getSksTaughtByDosen = (nidn) => {
    let totalSks = 0;
    kelas.forEach((kls) => {
      if (kls.dosenNidn === nidn) {
        const mk = mataKuliah.find((m) => m.kode === kls.matkulKode);
        if (mk) {
          totalSks += mk.sks;
        }
      }
    });
    return totalSks;
  };

  const mahasiswaWithSks = mahasiswa.map((m) => ({
    ...m,
    sksTaken: getSksTakenByMahasiswa(m.nim),
  }));

  const dosenWithSks = dosen.map((d) => ({
    ...d,
    sksTaught: getSksTaughtByDosen(d.nidn),
  }));

  // State List Data (only users uses local state now)
  const [users, setUsers] = useState([]);

  // State Selected Data for Edit
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [selectedDosen, setSelectedDosen] = useState(null);
  const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // State Modals
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDosenModalOpen, setDosenModalOpen] = useState(false);
  const [isMatkulModalOpen, setMatkulModalOpen] = useState(false);
  const [isKelasModalOpen, setKelasModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);

  // Sidebar Items configuration
  const sidebarItems = [
    { icon: "📊", label: "Dashboard", onClick: () => setActiveMenu("Dashboard") },
    { icon: "🎓", label: "Mahasiswa", onClick: () => setActiveMenu("Mahasiswa") },
    { icon: "👨‍🏫", label: "Dosen", onClick: () => setActiveMenu("Dosen") },
    { icon: "📚", label: "Mata Kuliah", onClick: () => setActiveMenu("Mata Kuliah") },
    { icon: "🏫", label: "Kelas", onClick: () => setActiveMenu("Kelas") },
    { icon: "🔑", label: "Manajemen User", onClick: () => setActiveMenu("Manajemen User") },
  ];

  // Fetch Data on Load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      showToast.error("Gagal mengambil data user dari server!");
    }
  };

  // ============================================
  // MAHASISWA CRUD HANDLERS
  // ============================================
  const storeMahasiswaData = async (data) => {
    try {
      const res = await mutationCreateMahasiswa(data);
      if (res.data.success) {
        showToast.success("Mahasiswa baru berhasil ditambahkan!");
      } else {
        showToast.error(res.data.message || "Gagal menambahkan mahasiswa!");
      }
    } catch (err) {
      showToast.error(err.response?.data?.message || "Gagal menambahkan mahasiswa!");
    }
  };

  const updateMahasiswaData = async (nim, data) => {
    try {
      const res = await mutationUpdateMahasiswa({ nim, data });
      if (res.data.success) {
        showToast.success("Data mahasiswa berhasil diperbarui!");
      } else {
        showToast.error(res.data.message || "Gagal memperbarui data mahasiswa!");
      }
    } catch (err) {
      showToast.error(err.response?.data?.message || "Gagal memperbarui data mahasiswa!");
    }
  };

  const handleDeleteMahasiswa = (nim) => {
    const student = mahasiswa.find((m) => m.nim === nim);
    if (!student) return;
    const studentName = student.name;
    showConfirmDialog({
      title: "Konfirmasi Hapus",
      text: `Apakah Anda yakin ingin menghapus data mahasiswa "${studentName}"?`,
      icon: "warning",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mutationDeleteMahasiswa(nim);
          if (res.data.success) {
            showToast.success(`Data mahasiswa "${studentName}" berhasil dihapus!`);
          } else {
            showToast.error(res.data.message || "Gagal menghapus data!");
          }
        } catch (err) {
          showToast.error(err.response?.data?.message || "Gagal menghapus data!");
        }
      }
    });
  };

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (nim) => {
    const selected = mahasiswa.find((m) => m.nim === nim);
    setSelectedMahasiswa(selected);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMahasiswa(null);
  };

  const handleSubmitMahasiswa = (data) => {
    const isEdit = !!selectedMahasiswa;
    showConfirmDialog({
      title: isEdit ? "Konfirmasi Edit" : "Konfirmasi Simpan",
      text: isEdit
        ? `Apakah Anda yakin ingin menyimpan perubahan data untuk "${data.name}"?`
        : `Apakah Anda yakin ingin menyimpan data mahasiswa baru "${data.name}"?`,
      icon: "question",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        const backendData = {
          nim: data.nim,
          nama: data.name,
          status: true,
          matkul: [],
        };
        if (selectedMahasiswa) {
          updateMahasiswaData(selectedMahasiswa.nim, backendData);
        } else {
          storeMahasiswaData(backendData);
        }
        handleCloseModal();
      }
    });
  };

  // ============================================
  // DOSEN CRUD HANDLERS
  // ============================================
  const storeDosenData = async (data) => {
    try {
      const res = await mutationCreateDosen(data);
      if (res.data.success) {
        showToast.success("Dosen baru berhasil ditambahkan!");
      } else {
        showToast.error(res.data.message || "Gagal menambahkan dosen!");
      }
    } catch (err) {
      showToast.error(err.response?.data?.message || "Gagal menambahkan dosen!");
    }
  };

  const updateDosenData = async (nidn, data) => {
    try {
      const res = await mutationUpdateDosen({ nidn, data });
      if (res.data.success) {
        showToast.success("Data dosen berhasil diperbarui!");
      } else {
        showToast.error(res.data.message || "Gagal memperbarui data dosen!");
      }
    } catch (err) {
      showToast.error(err.response?.data?.message || "Gagal memperbarui data dosen!");
    }
  };

  const handleDeleteDosen = (nidn) => {
    const d = dosen.find((x) => x.nidn === nidn);
    if (!d) return;
    showConfirmDialog({
      title: "Konfirmasi Hapus",
      text: `Apakah Anda yakin ingin menghapus data dosen "${d.nama}"?`,
      icon: "warning",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mutationDeleteDosen(nidn);
          if (res.data.success) {
            showToast.success(`Data dosen "${d.nama}" berhasil dihapus!`);
          } else {
            showToast.error(res.data.message || "Gagal menghapus data!");
          }
        } catch (err) {
          showToast.error(err.response?.data?.message || "Gagal menghapus data!");
        }
      }
    });
  };

  const openAddDosenModal = () => {
    setSelectedDosen(null);
    setDosenModalOpen(true);
  };

  const openEditDosenModal = (nidn) => {
    const selected = dosen.find((x) => x.nidn === nidn);
    setSelectedDosen(selected);
    setDosenModalOpen(true);
  };

  const handleCloseDosenModal = () => {
    setDosenModalOpen(false);
    setSelectedDosen(null);
  };

  const handleSubmitDosen = (data) => {
    const isEdit = !!selectedDosen;
    showConfirmDialog({
      title: isEdit ? "Konfirmasi Edit" : "Konfirmasi Simpan",
      text: isEdit
        ? `Apakah Anda yakin ingin menyimpan perubahan data untuk "${data.nama}"?`
        : `Apakah Anda yakin ingin menyimpan data dosen baru "${data.nama}"?`,
      icon: "question",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        if (selectedDosen) {
          updateDosenData(selectedDosen.nidn, data);
        } else {
          storeDosenData(data);
        }
        handleCloseDosenModal();
      }
    });
  };

  // ============================================
  // MATA KULIAH CRUD HANDLERS
  // ============================================
  const storeMataKuliahData = async (data) => {
    try {
      const res = await mutationCreateMataKuliah(data);
      if (res.data.success) {
        showToast.success("Mata kuliah baru berhasil ditambahkan!");
      } else {
        showToast.error(res.data.message || "Gagal menambahkan mata kuliah!");
      }
    } catch (err) {
      showToast.error(err.response?.data?.message || "Gagal menambahkan mata kuliah!");
    }
  };

  const updateMataKuliahData = async (kode, data) => {
    try {
      const res = await mutationUpdateMataKuliah({ kode, data });
      if (res.data.success) {
        showToast.success("Data mata kuliah berhasil diperbarui!");
      } else {
        showToast.error(res.data.message || "Gagal memperbarui data mata kuliah!");
      }
    } catch (err) {
      showToast.error(err.response?.data?.message || "Gagal memperbarui data mata kuliah!");
    }
  };

  const handleDeleteMatkul = (kode) => {
    const m = mataKuliah.find((x) => x.kode === kode);
    if (!m) return;
    showConfirmDialog({
      title: "Konfirmasi Hapus",
      text: `Apakah Anda yakin ingin menghapus mata kuliah "${m.nama}"?`,
      icon: "warning",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mutationDeleteMataKuliah(kode);
          if (res.data.success) {
            showToast.success(`Mata kuliah "${m.nama}" berhasil dihapus!`);
          } else {
            showToast.error(res.data.message || "Gagal menghapus data!");
          }
        } catch (err) {
          showToast.error(err.response?.data?.message || "Gagal menghapus data!");
        }
      }
    });
  };

  const openAddMatkulModal = () => {
    setSelectedMataKuliah(null);
    setMatkulModalOpen(true);
  };

  const openEditMatkulModal = (kode) => {
    const selected = mataKuliah.find((x) => x.kode === kode);
    setSelectedMataKuliah(selected);
    setMatkulModalOpen(true);
  };

  const handleCloseMatkulModal = () => {
    setMatkulModalOpen(false);
    setSelectedMataKuliah(null);
  };

  const handleSubmitMatkul = (data) => {
    const isEdit = !!selectedMataKuliah;
    showConfirmDialog({
      title: isEdit ? "Konfirmasi Edit" : "Konfirmasi Simpan",
      text: isEdit
        ? `Apakah Anda yakin ingin menyimpan perubahan data untuk "${data.nama}"?`
        : `Apakah Anda yakin ingin menyimpan data mata kuliah baru "${data.nama}"?`,
      icon: "question",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        if (selectedMataKuliah) {
          updateMataKuliahData(selectedMataKuliah.kode, data);
        } else {
          storeMataKuliahData(data);
        }
        handleCloseMatkulModal();
      }
    });
  };

  // ============================================
  // KELAS CRUD HANDLERS
  // ============================================
  const storeKelasData = async (data) => {
    try {
      const res = await mutationCreateKelas(data);
      if (res.data.success) {
        showToast.success("Kelas baru berhasil ditambahkan!");
      } else {
        showToast.error(res.data.message || "Gagal menambahkan kelas!");
      }
    } catch (err) {
      showToast.error(err.response?.data?.message || "Gagal menambahkan kelas!");
    }
  };

  const updateKelasData = async (kode, data) => {
    try {
      const res = await mutationUpdateKelas({ kode, data });
      if (res.data.success) {
        showToast.success("Data kelas berhasil diperbarui!");
      } else {
        showToast.error(res.data.message || "Gagal memperbarui data kelas!");
      }
    } catch (err) {
      showToast.error(err.response?.data?.message || "Gagal memperbarui data kelas!");
    }
  };

  const handleDeleteKelas = (kode) => {
    const k = kelas.find((x) => x.kode === kode);
    if (!k) return;
    showConfirmDialog({
      title: "Konfirmasi Hapus",
      text: `Apakah Anda yakin ingin menghapus kelas "${k.nama}"?`,
      icon: "warning",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mutationDeleteKelas(kode);
          if (res.data.success) {
            showToast.success(`Kelas "${k.nama}" berhasil dihapus!`);
          } else {
            showToast.error(res.data.message || "Gagal menghapus data!");
          }
        } catch (err) {
          showToast.error(err.response?.data?.message || "Gagal menghapus data!");
        }
      }
    });
  };

  const openAddKelasModal = () => {
    setSelectedKelas(null);
    setKelasModalOpen(true);
  };

  const openEditKelasModal = (kode) => {
    const selected = kelas.find((x) => x.kode === kode);
    setSelectedKelas(selected);
    setKelasModalOpen(true);
  };

  const handleCloseKelasModal = () => {
    setKelasModalOpen(false);
    setSelectedKelas(null);
  };

  const handleSubmitKelas = (data) => {
    const isEdit = !!selectedKelas;
    showConfirmDialog({
      title: isEdit ? "Konfirmasi Edit" : "Konfirmasi Simpan",
      text: isEdit
        ? `Apakah Anda yakin ingin menyimpan perubahan data untuk "${data.nama}"?`
        : `Apakah Anda yakin ingin menyimpan data kelas baru "${data.nama}"?`,
      icon: "question",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        if (selectedKelas) {
          updateKelasData(selectedKelas.kode, data);
        } else {
          storeKelasData(data);
        }
        handleCloseKelasModal();
      }
    });
  };

  // ============================================
  // USER ACCESS CONTROL HANDLERS
  // ============================================
  const openEditUserModal = (email) => {
    const selected = users.find((u) => u.email === email);
    setSelectedUser(selected);
    setUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleSubmitUserAccess = (data) => {
    showConfirmDialog({
      title: "Konfirmasi Akses",
      text: `Apakah Anda yakin ingin mengubah hak akses untuk "${data.email}"?`,
      icon: "question",
      confirmButtonText: "Ya, Ubah",
      cancelButtonText: "Batal",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateUserRolePermissions(data.email, {
            role: data.role,
            permissions: data.permissions,
          });
          if (res.data.success) {
            showToast.success("Hak akses user berhasil diperbarui!");
            fetchUsers();
          } else {
            showToast.error(res.data.message || "Gagal memperbarui hak akses!");
          }
        } catch (err) {
          showToast.error(err.response?.data?.message || "Gagal memperbarui hak akses!");
        }
        handleCloseUserModal();
      }
    });
  };

  // Global Logout Dialog
  const handleLogout = () => {
    showConfirmDialog({
      title: "Konfirmasi Logout",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "question",
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
    });
  };

  // Render loading indicator
  const renderLoading = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-gray-600 font-medium">Memuat data...</span>
    </div>
  );

  // Render Table & Add Button based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return (
          <DashboardContent
            mahasiswa={mahasiswaWithSks}
            dosen={dosenWithSks}
            mataKuliah={mataKuliah}
            kelas={kelas}
            users={users}
          />
        );
      case "Mahasiswa":
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Data Mahasiswa
              </h2>
              <Button variant="primary" onClick={openAddModal}>
                + Tambah Mahasiswa
              </Button>
            </div>

            {isMahasiswaLoading ? (
              renderLoading()
            ) : (
              <>
                <MahasiswaTable
                  mahasiswa={mahasiswaWithSks}
                  onEdit={openEditModal}
                  onDelete={handleDeleteMahasiswa}
                />

                <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                  <p>
                    Total Mahasiswa: <strong>{mahasiswa.length}</strong>
                  </p>
                </div>
              </>
            )}
          </>
        );
      case "Dosen":
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Data Dosen
              </h2>
              <Button variant="primary" onClick={openAddDosenModal}>
                + Tambah Dosen
              </Button>
            </div>

            {isDosenLoading ? (
              renderLoading()
            ) : (
              <>
                <DosenTable
                  dosen={dosenWithSks}
                  onEdit={openEditDosenModal}
                  onDelete={handleDeleteDosen}
                />

                <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                  <p>
                    Total Dosen: <strong>{dosen.length}</strong>
                  </p>
                </div>
              </>
            )}
          </>
        );
      case "Mata Kuliah":
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Data Mata Kuliah
              </h2>
              <Button variant="primary" onClick={openAddMatkulModal}>
                + Tambah Mata Kuliah
              </Button>
            </div>

            {isMatkulLoading ? (
              renderLoading()
            ) : (
              <>
                <MataKuliahTable
                  mataKuliah={mataKuliah}
                  onEdit={openEditMatkulModal}
                  onDelete={handleDeleteMatkul}
                />

                <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                  <p>
                    Total Mata Kuliah: <strong>{mataKuliah.length}</strong>
                  </p>
                </div>
              </>
            )}
          </>
        );
      case "Kelas":
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Data Kelas
              </h2>
              <Button variant="primary" onClick={openAddKelasModal}>
                + Tambah Kelas
              </Button>
            </div>

            {isKelasLoading ? (
              renderLoading()
            ) : (
              <>
                <KelasTable
                  kelas={kelas}
                  mataKuliah={mataKuliah}
                  dosen={dosenWithSks}
                  mahasiswa={mahasiswaWithSks}
                  onEdit={openEditKelasModal}
                  onDelete={handleDeleteKelas}
                />

                <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                  <p>
                    Total Kelas: <strong>{kelas.length}</strong>
                  </p>
                </div>
              </>
            )}
          </>
        );
      case "Manajemen User":
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Manajemen Role &amp; Permission User
              </h2>
            </div>

            <UserTable
              users={users}
              onEdit={openEditUserModal}
            />

            <div className="mt-6 pt-6 border-t text-sm text-gray-600">
              <p>
                Total User Terdaftar: <strong>{users.length}</strong>
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar items={sidebarItems} active={activeMenu} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          title={`Manajemen ${activeMenu}`}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6 overflow-auto bg-gray-100">
          {activeMenu === "Dashboard" ? (
            renderContent()
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              {renderContent()}
            </div>
          )}
        </main>

        <Footer />
      </div>

      {/* Mahasiswa Modal */}
      <MahasiswaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitMahasiswa}
        selectedMahasiswa={selectedMahasiswa}
        existingNims={mahasiswa.map((m) => m.nim)}
      />

      {/* Dosen Modal */}
      <DosenModal
        isOpen={isDosenModalOpen}
        onClose={handleCloseDosenModal}
        onSubmit={handleSubmitDosen}
        selectedDosen={selectedDosen}
        existingNidns={dosen.map((d) => d.nidn)}
      />

      {/* Mata Kuliah Modal */}
      <MataKuliahModal
        isOpen={isMatkulModalOpen}
        onClose={handleCloseMatkulModal}
        onSubmit={handleSubmitMatkul}
        selectedMataKuliah={selectedMataKuliah}
        existingKodes={mataKuliah.map((m) => m.kode)}
      />

      {/* Kelas Modal */}
      <KelasModal
        isOpen={isKelasModalOpen}
        onClose={handleCloseKelasModal}
        onSubmit={handleSubmitKelas}
        selectedKelas={selectedKelas}
        existingKodes={kelas.map((k) => k.kode)}
        mataKuliah={mataKuliah}
        dosen={dosenWithSks}
        mahasiswa={mahasiswaWithSks}
      />

      {/* User Access Modal */}
      <UserAccessModal
        isOpen={isUserModalOpen}
        onClose={handleCloseUserModal}
        onSubmit={handleSubmitUserAccess}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default Mahasiswa;
