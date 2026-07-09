/**
 * Backend Server Express - API untuk Manajemen Mahasiswa
 */

const express = require("express");
const cors = require("cors");
const {
  mahasiswaList,
  mataKuliahList,
  dosenList,
  users,
  kelasList,
  show,
  add,
  update,
  deleteById,
  totalNilai,
  kategoriNilai,
  IPS,
  jumlahMahasiswa,
  sortByNIM,
  sortByStatus,
  jumlahAktifTidak,
  clear,
  clearArray,
  addDosen,
  updateDosen,
  deleteDosenById,
  addMatkul,
  updateMatkul,
  deleteMatkulByKode,
  updateUserRolePermissions,
  addKelas,
  updateKelas,
  deleteKelasByKode,
} = require("./src/Mahasiswa");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ============================================
// API ENDPOINTS
// ============================================

// 1. GET - Menampilkan semua mahasiswa
app.get("/api/mahasiswa", (req, res) => {
  res.json({
    success: true,
    data: mahasiswaList.mahasiswa,
    count: mahasiswaList.mahasiswa.length,
  });
});

// 2. POST - Menambah mahasiswa baru
app.post("/api/mahasiswa", (req, res) => {
  const { nim, nama, status, matkul } = req.body;

  if (!nim || !nama) {
    return res.status(400).json({
      success: false,
      message: "NIM dan Nama wajib diisi",
    });
  }

  const newMahasiswa = {
    nim,
    nama,
    status: status || true,
    matkul: matkul || [],
  };

  add(newMahasiswa);

  res.status(201).json({
    success: true,
    message: `${nama} berhasil ditambahkan`,
    data: newMahasiswa,
  });
});

// 3. PUT - Mengupdate mahasiswa
app.put("/api/mahasiswa/:nim", (req, res) => {
  const { nim } = req.params;
  const dataBaru = req.body;

  const mahasiswaIndex = mahasiswaList.mahasiswa.findIndex(
    (m) => m.nim === nim,
  );
  if (mahasiswaIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan",
    });
  }

  update(nim, dataBaru);

  res.json({
    success: true,
    message: `Data mahasiswa ${nim} berhasil diupdate`,
    data: mahasiswaList.mahasiswa[mahasiswaIndex],
  });
});

// 4. DELETE - Menghapus mahasiswa
app.delete("/api/mahasiswa/:nim", (req, res) => {
  const { nim } = req.params;

  const mahasiswaIndex = mahasiswaList.mahasiswa.findIndex(
    (m) => m.nim === nim,
  );
  if (mahasiswaIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan",
    });
  }

  const deleted = mahasiswaList.mahasiswa[mahasiswaIndex];
  deleteById(nim);

  res.json({
    success: true,
    message: `${deleted.nama} berhasil dihapus`,
    data: deleted,
  });
});

// 5. GET - Total nilai mahasiswa
app.get("/api/mahasiswa/:nim/nilai", (req, res) => {
  const { nim } = req.params;
  const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);

  if (!mahasiswa) {
    return res.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan",
    });
  }

  const nilaiDetails = mahasiswa.matkul.map((mk) => {
    const total = mk.tugas + mk.uts + mk.uas;
    const matkulInfo = mataKuliahList.mataKuliah.find(
      (m) => m.kode === mk.matkulId,
    );
    return {
      matkulId: mk.matkulId,
      matkulNama: matkulInfo ? matkulInfo.nama : "Unknown",
      tugas: mk.tugas,
      uts: mk.uts,
      uas: mk.uas,
      total,
    };
  });

  // Hitung total keseluruhan dari semua mata kuliah
  const nilaiTotal = nilaiDetails.reduce((sum, mk) => sum + mk.total, 0);
  const rataRata =
    nilaiDetails.length > 0 ? nilaiTotal / nilaiDetails.length : 0;

  res.json({
    success: true,
    nim,
    nilaiTotal: nilaiTotal,
    rataRata: parseFloat(rataRata.toFixed(2)),
    details: nilaiDetails,
  });
});

// 6. GET - Kategori nilai
app.get("/api/kategori/:nilai", (req, res) => {
  const { nilai } = req.params;
  const kategori = kategoriNilai(parseFloat(nilai));

  res.json({
    success: true,
    nilai: parseFloat(nilai),
    kategori,
  });
});

// 7. GET - IPS mahasiswa
app.get("/api/mahasiswa/:nim/ips", (req, res) => {
  const { nim } = req.params;
  const ips = IPS(nim);

  // Check if result is an error message (string)
  if (typeof ips === "string" && isNaN(ips)) {
    return res.status(404).json({
      success: false,
      message: ips,
    });
  }

  res.json({
    success: true,
    nim,
    ips: typeof ips === "string" ? parseFloat(ips) : ips,
  });
});

// 8. GET - Jumlah mahasiswa
app.get("/api/jumlah-mahasiswa", (req, res) => {
  res.json({
    success: true,
    jumlah: jumlahMahasiswa(),
  });
});

// 9. GET - Sort by NIM
app.get("/api/mahasiswa/sort/nim", (req, res) => {
  const sorted = [...mahasiswaList.mahasiswa].sort((a, b) =>
    a.nim.localeCompare(b.nim),
  );

  res.json({
    success: true,
    message: "Mahasiswa diurutkan berdasarkan NIM",
    data: sorted,
  });
});

// 9.1 GET - Sort by Status
app.get("/api/mahasiswa/sort/status", (req, res) => {
  const sorted = [...mahasiswaList.mahasiswa].sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status ? -1 : 1;
  });

  res.json({
    success: true,
    message: "Mahasiswa diurutkan berdasarkan Status",
    data: sorted,
  });
});

// 10. GET - Jumlah aktif/tidak aktif
app.get("/api/aktif-tidak-aktif", (req, res) => {
  const result = jumlahAktifTidak();

  res.json({
    success: true,
    ...result,
  });
});

// 11. GET - Mata kuliah list
app.get("/api/matakuliah", (req, res) => {
  res.json({
    success: true,
    data: mataKuliahList.mataKuliah,
  });
});

// 12. GET - Statistik lengkap
app.get("/api/statistik", (req, res) => {
  const aktifTidak = jumlahAktifTidak();
  const stats = {
    totalMahasiswa: mahasiswaList.mahasiswa.length,
    ...aktifTidak,
    mahasiswa: mahasiswaList.mahasiswa.map((mhs) => ({
      nim: mhs.nim,
      nama: mhs.nama,
      status: mhs.status ? "Aktif" : "Tidak Aktif",
      jumlahMataKuliah: mhs.matkul.length,
      ips: IPS(mhs.nim),
      kategori: kategoriNilai(parseFloat(IPS(mhs.nim))),
    })),
  };

  res.json({
    success: true,
    data: stats,
  });
});

// 13. DELETE - Clear semua mahasiswa
app.delete("/api/clear", (req, res) => {
  const count = mahasiswaList.mahasiswa.length;
  clear();

  res.json({
    success: true,
    message: `${count} mahasiswa berhasil dihapus semua`,
    deletedCount: count,
  });
});

// 14. DELETE - Clear array mahasiswa (sama dengan clear)
app.delete("/api/clearArray", (req, res) => {
  const count = mahasiswaList.mahasiswa.length;
  clearArray();

  res.json({
    success: true,
    message: `${count} mahasiswa berhasil dihapus semua dari array`,
    deletedCount: count,
  });
});

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================

// Register a new user
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan password wajib diisi",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const exists = users.find((u) => u.email === normalizedEmail);
  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Email sudah terdaftar",
    });
  }

  users.push({
    email: normalizedEmail,
    password,
    role: "Guest",
    permissions: ["read_mahasiswa"],
  });
  res.status(201).json({
    success: true,
    message: "Registrasi berhasil! Silakan login.",
  });
});

// Login user
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan password wajib diisi",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find(
    (u) => u.email === normalizedEmail && u.password === password
  );

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Email atau password salah",
    });
  }

  res.json({
    success: true,
    message: "Login berhasil",
  });
});

// ============================================
// DOSEN CRUD ENDPOINTS
// ============================================

// GET - Menampilkan semua dosen
app.get("/api/dosen", (req, res) => {
  res.json({
    success: true,
    data: dosenList.dosen,
    count: dosenList.dosen.length,
  });
});

// POST - Menambah dosen baru
app.post("/api/dosen", (req, res) => {
  const { nidn, nama, email } = req.body;

  if (!nidn || !nama || !email) {
    return res.status(400).json({
      success: false,
      message: "NIDN, Nama, dan Email wajib diisi",
    });
  }

  // Check if NIDN exists
  const exists = dosenList.dosen.find((d) => d.nidn === nidn);
  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Dosen dengan NIDN tersebut sudah terdaftar",
    });
  }

  const newDosen = { nidn, nama, email };
  addDosen(newDosen);

  res.status(201).json({
    success: true,
    message: `Dosen ${nama} berhasil ditambahkan`,
    data: newDosen,
  });
});

// PUT - Mengupdate data dosen
app.put("/api/dosen/:nidn", (req, res) => {
  const { nidn } = req.params;
  const dataBaru = req.body;

  const dosenIndex = dosenList.dosen.findIndex((d) => d.nidn === nidn);
  if (dosenIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Dosen tidak ditemukan",
    });
  }

  updateDosen(nidn, dataBaru);

  res.json({
    success: true,
    message: `Data dosen ${nidn} berhasil diupdate`,
    data: dosenList.dosen[dosenIndex],
  });
});

// DELETE - Menghapus dosen
app.delete("/api/dosen/:nidn", (req, res) => {
  const { nidn } = req.params;

  const dosenIndex = dosenList.dosen.findIndex((d) => d.nidn === nidn);
  if (dosenIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Dosen tidak ditemukan",
    });
  }

  const deleted = dosenList.dosen[dosenIndex];
  deleteDosenById(nidn);

  res.json({
    success: true,
    message: `Dosen ${deleted.nama} berhasil dihapus`,
    data: deleted,
  });
});

// ============================================
// MATA KULIAH CRUD ENDPOINTS
// ============================================

// POST - Menambah mata kuliah baru
app.post("/api/matakuliah", (req, res) => {
  const { kode, nama, sks } = req.body;

  if (!kode || !nama || !sks) {
    return res.status(400).json({
      success: false,
      message: "Kode, Nama, dan SKS wajib diisi",
    });
  }

  const exists = mataKuliahList.mataKuliah.find((m) => m.kode === kode);
  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Mata kuliah dengan kode tersebut sudah terdaftar",
    });
  }

  const newMatkul = { kode, nama, sks: parseInt(sks) };
  addMatkul(newMatkul);

  res.status(201).json({
    success: true,
    message: `Mata kuliah ${nama} berhasil ditambahkan`,
    data: newMatkul,
  });
});

// PUT - Mengupdate mata kuliah
app.put("/api/matakuliah/:kode", (req, res) => {
  const { kode } = req.params;
  const dataBaru = req.body;

  const matkulIndex = mataKuliahList.mataKuliah.findIndex((m) => m.kode === kode);
  if (matkulIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Mata kuliah tidak ditemukan",
    });
  }

  if (dataBaru.sks) {
    dataBaru.sks = parseInt(dataBaru.sks);
  }

  updateMatkul(kode, dataBaru);

  res.json({
    success: true,
    message: `Mata kuliah ${kode} berhasil diupdate`,
    data: mataKuliahList.mataKuliah[matkulIndex],
  });
});

// DELETE - Menghapus mata kuliah
app.delete("/api/matakuliah/:kode", (req, res) => {
  const { kode } = req.params;

  const matkulIndex = mataKuliahList.mataKuliah.findIndex((m) => m.kode === kode);
  if (matkulIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Mata kuliah tidak ditemukan",
    });
  }

  const deleted = mataKuliahList.mataKuliah[matkulIndex];
  deleteMatkulByKode(kode);

  res.json({
    success: true,
    message: `Mata kuliah ${deleted.nama} berhasil dihapus`,
    data: deleted,
  });
});

// ============================================
// USER ROLE & PERMISSION ENDPOINTS
// ============================================

// GET - Menampilkan semua user terdaftar beserta role & permissions
app.get("/api/users", (req, res) => {
  res.json({
    success: true,
    data: users.map((u) => ({
      email: u.email,
      role: u.role || "Guest",
      permissions: u.permissions || ["read_mahasiswa"],
    })),
    count: users.length,
  });
});

// PUT - Mengupdate role & permissions user
app.put("/api/users/:email/role-permissions", (req, res) => {
  const { email } = req.params;
  const { role, permissions } = req.body;

  if (!role || !permissions) {
    return res.status(400).json({
      success: false,
      message: "Role dan Permissions wajib diisi",
    });
  }

  const updatedUser = updateUserRolePermissions(email, role, permissions);
  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: "User tidak ditemukan",
    });
  }

  res.json({
    success: true,
    message: `Hak akses untuk ${email} berhasil diperbarui`,
    data: {
      email: updatedUser.email,
      role: updatedUser.role,
      permissions: updatedUser.permissions,
    },
  });
});

// ============================================
// KELAS CRUD ENDPOINTS
// ============================================

// GET - Menampilkan semua kelas
app.get("/api/kelas", (req, res) => {
  res.json({
    success: true,
    data: kelasList.kelas,
    count: kelasList.kelas.length,
  });
});

// POST - Menambah kelas baru
app.post("/api/kelas", (req, res) => {
  const { kode, nama, ruangan, matkulKode, dosenNidn, mahasiswaNims = [] } = req.body;

  if (!kode || !nama || !ruangan || !matkulKode || !dosenNidn) {
    return res.status(400).json({
      success: false,
      message: "Kode, Nama Kelas, Ruangan, Mata Kuliah, dan Dosen wajib diisi",
    });
  }

  const exists = kelasList.kelas.find((k) => k.kode === kode);
  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Kelas dengan kode tersebut sudah terdaftar",
    });
  }

  // Find Course SKS
  const targetMatkul = mataKuliahList.mataKuliah.find((m) => m.kode === matkulKode);
  if (!targetMatkul) {
    return res.status(400).json({
      success: false,
      message: "Mata Kuliah tidak ditemukan",
    });
  }
  const newSks = targetMatkul.sks;

  // 1. Validate: 1 Mata Kuliah only has 1 Dosen
  const existingMapping = kelasList.kelas.find((k) => k.matkulKode === matkulKode);
  if (existingMapping && existingMapping.dosenNidn !== dosenNidn) {
    const activeDosen = dosenList.dosen.find((d) => d.nidn === existingMapping.dosenNidn);
    const activeDosenName = activeDosen ? activeDosen.nama : existingMapping.dosenNidn;
    return res.status(400).json({
      success: false,
      message: `Mata Kuliah "${targetMatkul.nama}" sudah diampu oleh dosen lain: ${activeDosenName} (NIDN: ${existingMapping.dosenNidn}).`,
    });
  }

  // 2. Validate Dosen Max SKS
  let totalDosenSks = 0;
  kelasList.kelas.forEach((kls) => {
    if (kls.dosenNidn === dosenNidn) {
      const mk = mataKuliahList.mataKuliah.find((m) => m.kode === kls.matkulKode);
      if (mk) totalDosenSks += mk.sks;
    }
  });
  if (totalDosenSks + newSks > 12) {
    const targetDosen = dosenList.dosen.find((d) => d.nidn === dosenNidn);
    const dosenName = targetDosen ? targetDosen.nama : dosenNidn;
    return res.status(400).json({
      success: false,
      message: `Dosen "${dosenName}" melebihi batas SKS mengajar (maksimal 12 SKS). Saat ini mengajar ${totalDosenSks} SKS, ditambah kelas baru ${newSks} SKS.`,
    });
  }

  // 3. Validate Mahasiswa Max SKS
  for (const nim of mahasiswaNims) {
    let totalMhsSks = 0;
    kelasList.kelas.forEach((kls) => {
      if (kls.mahasiswaNims && kls.mahasiswaNims.includes(nim)) {
        const mk = mataKuliahList.mataKuliah.find((m) => m.kode === kls.matkulKode);
        if (mk) totalMhsSks += mk.sks;
      }
    });
    if (totalMhsSks + newSks > 24) {
      const mhsInfo = mahasiswaList.mahasiswa.find((m) => m.nim === nim);
      const mhsName = mhsInfo ? mhsInfo.nama : nim;
      return res.status(400).json({
        success: false,
        message: `Mahasiswa "${mhsName}" (${nim}) melebihi batas SKS kuliah (maksimal 24 SKS). Saat ini menempuh ${totalMhsSks} SKS, ditambah kelas baru ${newSks} SKS.`,
      });
    }
  }

  const newKelas = { kode, nama, ruangan, matkulKode, dosenNidn, mahasiswaNims };
  addKelas(newKelas);

  res.status(201).json({
    success: true,
    message: `Kelas ${nama} berhasil ditambahkan`,
    data: newKelas,
  });
});

// PUT - Mengupdate kelas
app.put("/api/kelas/:kode", (req, res) => {
  const { kode } = req.params;
  const { nama, ruangan, matkulKode, dosenNidn, mahasiswaNims = [] } = req.body;

  const kelasIndex = kelasList.kelas.findIndex((k) => k.kode === kode);
  if (kelasIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Kelas tidak ditemukan",
    });
  }

  if (!nama || !ruangan || !matkulKode || !dosenNidn) {
    return res.status(400).json({
      success: false,
      message: "Nama Kelas, Ruangan, Mata Kuliah, dan Dosen wajib diisi",
    });
  }

  // Find Course SKS
  const targetMatkul = mataKuliahList.mataKuliah.find((m) => m.kode === matkulKode);
  if (!targetMatkul) {
    return res.status(400).json({
      success: false,
      message: "Mata Kuliah tidak ditemukan",
    });
  }
  const newSks = targetMatkul.sks;

  // 1. Validate: 1 Mata Kuliah only has 1 Dosen
  const existingMapping = kelasList.kelas.find((k) => k.kode !== kode && k.matkulKode === matkulKode);
  if (existingMapping && existingMapping.dosenNidn !== dosenNidn) {
    const activeDosen = dosenList.dosen.find((d) => d.nidn === existingMapping.dosenNidn);
    const activeDosenName = activeDosen ? activeDosen.nama : existingMapping.dosenNidn;
    return res.status(400).json({
      success: false,
      message: `Mata Kuliah "${targetMatkul.nama}" sudah diampu oleh dosen lain: ${activeDosenName} (NIDN: ${existingMapping.dosenNidn}).`,
    });
  }

  // 2. Validate Dosen Max SKS
  let totalDosenSks = 0;
  kelasList.kelas.forEach((kls) => {
    if (kls.kode !== kode && kls.dosenNidn === dosenNidn) {
      const mk = mataKuliahList.mataKuliah.find((m) => m.kode === kls.matkulKode);
      if (mk) totalDosenSks += mk.sks;
    }
  });
  if (totalDosenSks + newSks > 12) {
    const targetDosen = dosenList.dosen.find((d) => d.nidn === dosenNidn);
    const dosenName = targetDosen ? targetDosen.nama : dosenNidn;
    return res.status(400).json({
      success: false,
      message: `Dosen "${dosenName}" melebihi batas SKS mengajar (maksimal 12 SKS). Saat ini mengajar ${totalDosenSks} SKS, ditambah kelas baru ${newSks} SKS.`,
    });
  }

  // 3. Validate Mahasiswa Max SKS
  for (const nim of mahasiswaNims) {
    let totalMhsSks = 0;
    kelasList.kelas.forEach((kls) => {
      if (kls.kode !== kode && kls.mahasiswaNims && kls.mahasiswaNims.includes(nim)) {
        const mk = mataKuliahList.mataKuliah.find((m) => m.kode === kls.matkulKode);
        if (mk) totalMhsSks += mk.sks;
      }
    });
    if (totalMhsSks + newSks > 24) {
      const mhsInfo = mahasiswaList.mahasiswa.find((m) => m.nim === nim);
      const mhsName = mhsInfo ? mhsInfo.nama : nim;
      return res.status(400).json({
        success: false,
        message: `Mahasiswa "${mhsName}" (${nim}) melebihi batas SKS kuliah (maksimal 24 SKS). Saat ini menempuh ${totalMhsSks} SKS, ditambah kelas baru ${newSks} SKS.`,
      });
    }
  }

  const dataBaru = { nama, ruangan, matkulKode, dosenNidn, mahasiswaNims };
  updateKelas(kode, dataBaru);

  res.json({
    success: true,
    message: `Data kelas ${kode} berhasil diupdate`,
    data: kelasList.kelas[kelasIndex],
  });
});

// DELETE - Menghapus kelas
app.delete("/api/kelas/:kode", (req, res) => {
  const { kode } = req.params;

  const kelasIndex = kelasList.kelas.findIndex((k) => k.kode === kode);
  if (kelasIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Kelas tidak ditemukan",
    });
  }

  const deleted = kelasList.kelas[kelasIndex];
  deleteKelasByKode(kode);

  res.json({
    success: true,
    message: `Kelas ${deleted.nama} berhasil dihapus`,
    data: deleted,
  });
});

// Error handling
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Server berjalan di http://localhost:${PORT}`);
  console.log(`📋 Buka browser dan akses aplikasi\n`);
});

module.exports = app;
