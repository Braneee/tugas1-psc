import { Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardContent = ({ mahasiswa = [], dosen = [], mataKuliah = [], kelas = [], users = [] }) => {
  
  // Cohesive Modern Color Palette
  const chartColors = {
    blue: "rgb(37, 99, 235)",
    blueLight: "rgba(37, 99, 235, 0.75)",
    emerald: "rgb(16, 185, 129)",
    emeraldLight: "rgba(16, 185, 129, 0.75)",
    amber: "rgb(245, 158, 11)",
    amberLight: "rgba(245, 158, 11, 0.75)",
    violet: "rgb(139, 92, 246)",
    violetLight: "rgba(139, 92, 246, 0.75)",
    slate: "rgb(100, 116, 139)",
    slateLight: "rgba(100, 116, 139, 0.75)",
    rose: "rgb(244, 63, 94)",
    roseLight: "rgba(244, 63, 94, 0.75)"
  };

  // Chart 1: Bar Chart (Jumlah Data per Entitas)
  const barData = {
    labels: ["Mahasiswa", "Dosen", "Mata Kuliah", "Kelas", "User"],
    datasets: [
      {
        label: "Jumlah Data",
        data: [mahasiswa.length, dosen.length, mataKuliah.length, kelas.length, users.length],
        backgroundColor: [
          chartColors.blueLight,
          chartColors.emeraldLight,
          chartColors.amberLight,
          chartColors.violetLight,
          chartColors.slateLight,
        ],
        borderColor: [
          chartColors.blue,
          chartColors.emerald,
          chartColors.amber,
          chartColors.violet,
          chartColors.slate,
        ],
        borderWidth: 1.5,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Inter, sans-serif",
            weight: "500",
          },
          color: "#64748b",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#f1f5f9",
        },
        ticks: {
          stepSize: 1,
          font: {
            family: "Inter, sans-serif",
          },
          color: "#64748b",
        },
      },
    },
  };

  // Chart 2: Pie Chart (Distribusi Role User)
  const rolesCount = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});
  const roleLabels = Object.keys(rolesCount);
  const roleValues = Object.values(rolesCount);

  const pieData = {
    labels: roleLabels,
    datasets: [
      {
        label: "Jumlah User",
        data: roleValues,
        backgroundColor: [
          chartColors.violetLight,
          chartColors.blueLight,
          chartColors.emeraldLight,
          chartColors.amberLight,
          chartColors.slateLight,
        ],
        borderColor: [
          chartColors.violet,
          chartColors.blue,
          chartColors.emerald,
          chartColors.amber,
          chartColors.slate,
        ],
        borderWidth: 1.5,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            family: "Inter, sans-serif",
            size: 11,
            weight: "500",
          },
          color: "#334155",
        },
      },
    },
  };

  // Chart 3: Doughnut Chart (Proporsi SKS Mata Kuliah)
  const sksCount = mataKuliah.reduce((acc, mk) => {
    const sksLabel = `${mk.sks} SKS`;
    acc[sksLabel] = (acc[sksLabel] || 0) + 1;
    return acc;
  }, {});
  const sksLabels = Object.keys(sksCount);
  const sksValues = Object.values(sksCount);

  const doughnutData = {
    labels: sksLabels,
    datasets: [
      {
        label: "Jumlah Matkul",
        data: sksValues,
        backgroundColor: [
          chartColors.amberLight,
          chartColors.blueLight,
          chartColors.emeraldLight,
          chartColors.roseLight,
        ],
        borderColor: [
          chartColors.amber,
          chartColors.blue,
          chartColors.emerald,
          chartColors.rose,
        ],
        borderWidth: 1.5,
        cutout: "65%",
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            family: "Inter, sans-serif",
            size: 11,
            weight: "500",
          },
          color: "#334155",
        },
      },
    },
  };

  return (
    <div className="space-y-8 p-2">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            📊 Dashboard Analisis Akademik
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Ringkasan data administrasi akademik secara real-time dan interaktif.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Sistem Aktif (Vercel Cloud)</span>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Mahasiswa */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Mahasiswa
            </span>
            <h3 className="text-3xl font-extrabold text-slate-800">
              {mahasiswa.length}
            </h3>
            <span className="inline-flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              🎓 Terdaftar aktif
            </span>
          </div>
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            🎓
          </div>
        </div>

        {/* Card 2: Dosen */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Dosen
            </span>
            <h3 className="text-3xl font-extrabold text-slate-800">
              {dosen.length}
            </h3>
            <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              👨‍🏫 Staf Pengajar
            </span>
          </div>
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            👨‍🏫
          </div>
        </div>

        {/* Card 3: Mata Kuliah */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Mata Kuliah
            </span>
            <h3 className="text-3xl font-extrabold text-slate-800">
              {mataKuliah.length}
            </h3>
            <span className="inline-flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
              📚 Silabus Aktif
            </span>
          </div>
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            📚
          </div>
        </div>

        {/* Card 4: Kelas */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Kelas
            </span>
            <h3 className="text-3xl font-extrabold text-slate-800">
              {kelas.length}
            </h3>
            <span className="inline-flex items-center text-xs font-medium text-violet-600 bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-100">
              🏫 Jadwal Kuliah
            </span>
          </div>
          <div className="w-14 h-14 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            🏫
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Bar Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-96">
          <div className="mb-4">
            <h4 className="font-bold text-slate-800 text-sm tracking-tight">📊 Jumlah Data Entitas</h4>
            <p className="text-xs text-slate-400 mt-0.5">Perbandingan total baris data per tabel akademik</p>
          </div>
          <div className="flex-1 relative">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Chart 2: Pie Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-96">
          <div className="mb-4">
            <h4 className="font-bold text-slate-800 text-sm tracking-tight">🍰 Distribusi Role Akun</h4>
            <p className="text-xs text-slate-400 mt-0.5">Persentase pembagian hak akses pengguna terdaftar</p>
          </div>
          <div className="flex-1 relative">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        {/* Chart 3: Doughnut Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-96">
          <div className="mb-4">
            <h4 className="font-bold text-slate-800 text-sm tracking-tight">🍩 Beban SKS Mata Kuliah</h4>
            <p className="text-xs text-slate-400 mt-0.5">Proporsi pembagian nilai SKS mata kuliah</p>
          </div>
          <div className="flex-1 relative">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
