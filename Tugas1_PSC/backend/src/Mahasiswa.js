/**
 * Data Struktur - Menyimpan list mahasiswa
 */
const mahasiswaList = {
  mahasiswa: [
    {
      nim: "22001",
      nama: "Randi Pratama",
      status: true,
      matkul: [
        { matkulId: "MK001", tugas: 85, uts: 80, uas: 88 },
        { matkulId: "MK002", tugas: 90, uts: 85, uas: 92 },
      ],
    },
    {
      nim: "22002",
      nama: "Siti Nurhaliza",
      status: true,
      matkul: [
        { matkulId: "MK001", tugas: 75, uts: 70, uas: 78 },
        { matkulId: "MK002", tugas: 80, uts: 75, uas: 82 },
      ],
    },
    {
      nim: "22003",
      nama: "Gibran Rais Hilmy",
      status: true,
      matkul: [],
    },
    {
      nim: "22004",
      nama: "Andi Wijaya",
      status: true,
      matkul: [],
    },
    {
      nim: "22005",
      nama: "Budi Santoso",
      status: true,
      matkul: [],
    },
    {
      nim: "22006",
      nama: "Citra Lestari",
      status: true,
      matkul: [],
    },
    {
      nim: "22007",
      nama: "Dewi Anggraini",
      status: true,
      matkul: [],
    },
  ],
};

/**
 * Data Struktur - Menyimpan list mata kuliah
 */
const mataKuliahList = {
  mataKuliah: [
    { kode: "MK001", nama: "Pemrograman Komputer", sks: 3 },
    { kode: "MK002", nama: "Algoritma dan Struktur Data", sks: 4 },
    { kode: "MK003", nama: "Basis Data", sks: 3 },
    { kode: "MK004", nama: "Pemrograman Sisi Klien", sks: 3 },
    { kode: "MK005", nama: "Kecerdasan Buatan", sks: 3 },
    { kode: "MK006", nama: "Grafika Komputer", sks: 3 },
  ],
};

const show = () => {
  mahasiswaList.mahasiswa.forEach((mhs) => {
    console.log(
      `NIM: ${mhs.nim}, Nama: ${mhs.nama}, Status: ${mhs.status ? "Aktif" : "Tidak Aktif"}`,
    );
    console.log("Mata Kuliah:");

    mhs.matkul.forEach((mk) => {
      const matkulName = mataKuliahList.mataKuliah.find(
        (m) => m.kode === mk.matkulId,
      ).nama;
      console.log(
        `- ${matkulName}: Tugas ${mk.tugas}, UTS ${mk.uts}, UAS ${mk.uas}`,
      );
    });
  });
};

const add = (mahasiswa) => mahasiswaList.mahasiswa.push(mahasiswa);

const update = (nim, dataBaru) => {
  mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.map((m) =>
    m.nim === nim ? { ...m, ...dataBaru } : m,
  );
};

const deleteById = (nim) => {
  mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.filter(
    (m) => m.nim !== nim,
  );
};

const totalNilai = (nim) => {
  const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);
  if (!mahasiswa) return "Mahasiswa tidak ditemukan";

  return mahasiswa.matkul.map((mk) => {
    const total = mk.tugas + mk.uts + mk.uas;
    return { matkulId: mk.matkulId, total };
  });
};

const kategoriNilai = (nilai) => {
  if (nilai >= 85) return "A";
  if (nilai >= 75) return "B";
  if (nilai >= 65) return "C";
  if (nilai >= 50) return "D";

  return "E";
};

const IPS = (nim) => {
  const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);

  if (!mahasiswa) return "Mahasiswa tidak ditemukan";

  const totalSks = mahasiswa.matkul.reduce((sum, mk) => {
    const matkul = mataKuliahList.mataKuliah.find(
      (m) => m.kode === mk.matkulId,
    );
    return sum + matkul.sks;
  }, 0);

  const totalNilaiIps = mahasiswa.matkul.reduce((sum, mk) => {
    const total = mk.tugas * 0.3 + mk.uts * 0.3 + mk.uas * 0.4;
    const matkul = mataKuliahList.mataKuliah.find(
      (m) => m.kode === mk.matkulId,
    );

    return sum + total * matkul.sks;
  }, 0);

  return parseFloat((totalNilaiIps / totalSks).toFixed(2));
};

const jumlahMahasiswa = () => mahasiswaList.mahasiswa.length;

const sortByNIM = () =>
  mahasiswaList.mahasiswa.sort((a, b) => a.nim.localeCompare(b.nim));

const jumlahAktifTidak = () => {
  return {
    aktif: mahasiswaList.mahasiswa.filter((m) => m.status).length,
    tidakAktif: mahasiswaList.mahasiswa.filter((m) => !m.status).length,
  };
};

const clear = () => {
  mahasiswaList.mahasiswa = [];
};

const clearArray = () => {
  mahasiswaList.mahasiswa = [];
};

const sortByStatus = () =>
  mahasiswaList.mahasiswa.sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status ? -1 : 1;
  });

/**
 * Data Struktur - Menyimpan list dosen
 */
const dosenList = {
  dosen: [
    { nidn: "0412088501", nama: "Dr. Ir. H. Ahmad Fauzi, M.T.", email: "ahmad.fauzi@example.ac.id" },
    { nidn: "0425118902", nama: "Siti Rahmawati, M.Cs.", email: "siti.rahma@example.ac.id" },
    { nidn: "0411129003", nama: "Hendra Kurniawan, M.T.", email: "hendra.k@example.ac.id" },
    { nidn: "0405068404", nama: "Dr. Diana Lestari, M.Kom.", email: "diana.l@example.ac.id" },
    { nidn: "0417038805", nama: "Rian Hidayat, M.Cs.", email: "rian.h@example.ac.id" },
    { nidn: "0422099106", nama: "Fitriani Siregar, M.IT.", email: "fitri.s@example.ac.id" },
  ],
};

/**
 * Data Struktur - Menyimpan list user terdaftar
 */
const users = [
  {
    email: "admin@example.com",
    password: "admin123",
    role: "Super Admin",
    permissions: ["manage_users", "manage_mahasiswa", "manage_dosen", "manage_matkul"],
  },
  {
    email: "dosen@example.com",
    password: "dosen123",
    role: "Dosen",
    permissions: ["read_mahasiswa", "manage_mahasiswa"],
  },
  {
    email: "user1@example.com",
    password: "user123",
    role: "Guest",
    permissions: ["read_mahasiswa"],
  },
  {
    email: "user2@example.com",
    password: "user123",
    role: "Guest",
    permissions: ["read_mahasiswa"],
  },
  {
    email: "user3@example.com",
    password: "user123",
    role: "Guest",
    permissions: ["read_mahasiswa"],
  },
  {
    email: "user4@example.com",
    password: "user123",
    role: "Guest",
    permissions: ["read_mahasiswa"],
  },
];

// CRUD Dosen
const addDosen = (dosen) => {
  dosenList.dosen.push(dosen);
  return dosen;
};

const updateDosen = (nidn, dataBaru) => {
  dosenList.dosen = dosenList.dosen.map((d) =>
    d.nidn === nidn ? { ...d, ...dataBaru } : d
  );
};

const deleteDosenById = (nidn) => {
  dosenList.dosen = dosenList.dosen.filter((d) => d.nidn !== nidn);
};

// CRUD Mata Kuliah
const addMatkul = (matkul) => {
  mataKuliahList.mataKuliah.push(matkul);
  return matkul;
};

const updateMatkul = (kode, dataBaru) => {
  mataKuliahList.mataKuliah = mataKuliahList.mataKuliah.map((m) =>
    m.kode === kode ? { ...m, ...dataBaru } : m
  );
};

const deleteMatkulByKode = (kode) => {
  mataKuliahList.mataKuliah = mataKuliahList.mataKuliah.filter((m) => m.kode !== kode);
};

// Update User Role & Permissions
const updateUserRolePermissions = (email, role, permissions) => {
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (user) {
    user.role = role;
    user.permissions = permissions;
    return user;
  }
  return null;
};

/**
 * Data Struktur - Menyimpan list kelas
 */
const kelasList = {
  kelas: [
    {
      kode: "KL001",
      nama: "Kelas Pemrograman Sisi Klien A",
      ruangan: "Lab Komputer 3",
      matkulKode: "MK004",
      dosenNidn: "0425118902",
      mahasiswaNims: ["22001", "22002"]
    },
    {
      kode: "KL002",
      nama: "Kelas Algoritma B",
      ruangan: "Ruang Teori 204",
      matkulKode: "MK002",
      dosenNidn: "0412088501",
      mahasiswaNims: ["22001", "22003"]
    },
    {
      kode: "KL003",
      nama: "Kelas Basis Data C",
      ruangan: "Lab Komputer 1",
      matkulKode: "MK003",
      dosenNidn: "0411129003",
      mahasiswaNims: ["22001", "22002", "22004"]
    },
    {
      kode: "KL004",
      nama: "Kelas Desain Web D",
      ruangan: "Lab Desain",
      matkulKode: "MK001",
      dosenNidn: "0405068404",
      mahasiswaNims: ["22005", "22006"]
    },
    {
      kode: "KL005",
      nama: "Kelas Kecerdasan Buatan E",
      ruangan: "Ruang Teori 105",
      matkulKode: "MK005",
      dosenNidn: "0417038805",
      mahasiswaNims: ["22007"]
    },
    {
      kode: "KL006",
      nama: "Kelas Sistem Operasi F",
      ruangan: "Lab Komputer 2",
      matkulKode: "MK006",
      dosenNidn: "0422099106",
      mahasiswaNims: ["22003"]
    }
  ]
};

// CRUD Kelas
const addKelas = (kls) => {
  kelasList.kelas.push(kls);
  return kls;
};

const updateKelas = (kode, dataBaru) => {
  kelasList.kelas = kelasList.kelas.map((k) =>
    k.kode === kode ? { ...k, ...dataBaru } : k
  );
};

const deleteKelasByKode = (kode) => {
  kelasList.kelas = kelasList.kelas.filter((k) => k.kode !== kode);
};

// Export functions dan data
module.exports = {
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
};
