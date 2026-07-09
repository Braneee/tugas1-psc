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
        borderRadius: 6,
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
            Dashboard Analisis Akademik
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Ringkasan data administrasi akademik secara real-time dan interaktif.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Sistem Aktif (Vercel Cloud)</span>
        </div>
      </div>

      {/* Summary Cards Grid (AdminLTE Info Box style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Mahasiswa */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex overflow-hidden h-28">
          <div className="w-20 bg-blue-600 flex items-center justify-center text-white">
            <svg className="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            </svg>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-center space-y-0.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Mahasiswa
            </span>
            <h3 className="text-2xl font-extrabold text-slate-800">
              {mahasiswa.length}
            </h3>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
              Terdaftar Aktif
            </span>
          </div>
        </div>

        {/* Card 2: Dosen */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex overflow-hidden h-28">
          <div className="w-20 bg-emerald-600 flex items-center justify-center text-white">
            <svg className="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-center space-y-0.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Dosen
            </span>
            <h3 className="text-2xl font-extrabold text-slate-800">
              {dosen.length}
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
              Staf Pengajar
            </span>
          </div>
        </div>

        {/* Card 3: Mata Kuliah */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex overflow-hidden h-28">
          <div className="w-20 bg-amber-500 flex items-center justify-center text-white">
            <svg className="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-center space-y-0.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Mata Kuliah
            </span>
            <h3 className="text-2xl font-extrabold text-slate-800">
              {mataKuliah.length}
            </h3>
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wide">
              Silabus Aktif
            </span>
          </div>
        </div>

        {/* Card 4: Kelas */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex overflow-hidden h-28">
          <div className="w-20 bg-violet-600 flex items-center justify-center text-white">
            <svg className="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-center space-y-0.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Kelas
            </span>
            <h3 className="text-2xl font-extrabold text-slate-800">
              {kelas.length}
            </h3>
            <span className="text-[10px] font-bold text-violet-600 uppercase tracking-wide">
              Jadwal Kuliah
            </span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Bar Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-96">
          <div className="mb-4">
            <h4 className="font-bold text-slate-800 text-sm tracking-tight">Jumlah Data Entitas</h4>
            <p className="text-xs text-slate-400 mt-0.5">Perbandingan total baris data per tabel akademik</p>
          </div>
          <div className="flex-1 relative">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Chart 2: Pie Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-96">
          <div className="mb-4">
            <h4 className="font-bold text-slate-800 text-sm tracking-tight">Distribbusi Role Akun</h4>
            <p className="text-xs text-slate-400 mt-0.5">Persentase pembagian hak akses pengguna terdaftar</p>
          </div>
          <div className="flex-1 relative">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        {/* Chart 3: Doughnut Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-96">
          <div className="mb-4">
            <h4 className="font-bold text-slate-800 text-sm tracking-tight">Beban SKS Mata Kuliah</h4>
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
