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
  
  // Chart 1: Bar Chart (Jumlah Data per Entitas)
  const barData = {
    labels: ["Mahasiswa", "Dosen", "Mata Kuliah", "Kelas", "User"],
    datasets: [
      {
        label: "Jumlah Data",
        data: [mahasiswa.length, dosen.length, mataKuliah.length, kelas.length, users.length],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",  // Blue
          "rgba(16, 185, 129, 0.7)",  // Green
          "rgba(245, 158, 11, 0.7)",  // Orange
          "rgba(139, 92, 246, 0.7)",  // Purple
          "rgba(107, 114, 128, 0.7)", // Gray
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(16, 185, 129)",
          "rgb(245, 158, 11)",
          "rgb(139, 92, 246)",
          "rgb(107, 114, 128)",
        ],
        borderWidth: 1.5,
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
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
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
          "rgba(139, 92, 246, 0.7)", // Purple
          "rgba(59, 130, 246, 0.7)",  // Blue
          "rgba(16, 185, 129, 0.7)",  // Green
          "rgba(245, 158, 11, 0.7)",  // Orange
          "rgba(107, 114, 128, 0.7)", // Gray
        ],
        borderColor: [
          "rgb(139, 92, 246)",
          "rgb(59, 130, 246)",
          "rgb(16, 185, 129)",
          "rgb(245, 158, 11)",
          "rgb(107, 114, 128)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
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
          "rgba(245, 158, 11, 0.7)",  // Orange
          "rgba(59, 130, 246, 0.7)",  // Blue
          "rgba(16, 185, 129, 0.7)",  // Green
          "rgba(239, 68, 68, 0.7)",   // Red
        ],
        borderColor: [
          "rgb(245, 158, 11)",
          "rgb(59, 130, 246)",
          "rgb(16, 185, 129)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">📊 Dashboard Analisis Akademik</h2>
        <p className="text-sm text-gray-500 mt-1">Ringkasan statistik data akademik secara real-time</p>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Mahasiswa */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm flex items-center justify-between transition hover:shadow-md">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Total Mahasiswa</p>
            <h3 className="text-3xl font-extrabold text-blue-900 mt-2">{mahasiswa.length}</h3>
          </div>
          <span className="text-4xl bg-blue-200 p-3 rounded-xl">🎓</span>
        </div>

        {/* Card 2: Dosen */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-5 shadow-sm flex items-center justify-between transition hover:shadow-md">
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Total Dosen</p>
            <h3 className="text-3xl font-extrabold text-emerald-900 mt-2">{dosen.length}</h3>
          </div>
          <span className="text-4xl bg-emerald-200 p-3 rounded-xl">👨‍🏫</span>
        </div>

        {/* Card 3: Mata Kuliah */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-5 shadow-sm flex items-center justify-between transition hover:shadow-md">
          <div>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Total Mata Kuliah</p>
            <h3 className="text-3xl font-extrabold text-amber-900 mt-2">{mataKuliah.length}</h3>
          </div>
          <span className="text-4xl bg-amber-200 p-3 rounded-xl">📚</span>
        </div>

        {/* Card 4: Kelas */}
        <div className="bg-gradient-to-br from-violet-50 to-violet-100 border border-violet-200 rounded-xl p-5 shadow-sm flex items-center justify-between transition hover:shadow-md">
          <div>
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider">Total Kelas</p>
            <h3 className="text-3xl font-extrabold text-violet-900 mt-2">{kelas.length}</h3>
          </div>
          <span className="text-4xl bg-violet-200 p-3 rounded-xl">🏫</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Bar Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col h-96">
          <div className="mb-4">
            <h4 className="font-bold text-gray-800 text-base">📊 Jumlah Data Entitas</h4>
            <p className="text-xs text-gray-500">Perbandingan total baris data per tabel akademik</p>
          </div>
          <div className="flex-1 relative">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Chart 2: Pie Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col h-96">
          <div className="mb-4">
            <h4 className="font-bold text-gray-800 text-base">🍰 Distribusi Role Akun</h4>
            <p className="text-xs text-gray-500">Persentase pembagian hak akses pengguna terdaftar</p>
          </div>
          <div className="flex-1 relative">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        {/* Chart 3: Doughnut Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col h-96">
          <div className="mb-4">
            <h4 className="font-bold text-gray-800 text-base">🍩 Beban SKS Mata Kuliah</h4>
            <p className="text-xs text-gray-500">Proporsi pembagian nilai SKS mata kuliah</p>
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
