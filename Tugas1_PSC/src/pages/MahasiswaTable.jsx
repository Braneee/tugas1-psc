import { useState, useEffect } from "react";
import { Button } from "../components/atoms";

const MahasiswaTable = ({ mahasiswa = [], onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMajor, setFilterMajor] = useState("");
  const itemsPerPage = 5;

  // Filter and search logic
  const filteredMahasiswa = mahasiswa.filter((m) => {
    const matchesSearch =
      m.nim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.name && m.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesMajor = filterMajor ? m.major === filterMajor : true;
    return matchesSearch && matchesMajor;
  });

  const totalItems = filteredMahasiswa.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Sync current page if filtered data changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalItems, totalPages, currentPage]);

  const handleDelete = (nim) => {
    onDelete(nim);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMahasiswa = filteredMahasiswa.slice(startIndex, endIndex);

  // Get unique majors for filter dropdown
  const uniqueMajors = [...new Set(mahasiswa.map((m) => m.major).filter(Boolean))];

  // Export to CSV helper
  const exportToCSV = () => {
    const headers = ["NIM", "Nama", "Jurusan", "SKS Diambil"];
    const rows = filteredMahasiswa.map((m) => [
      m.nim,
      m.name,
      m.major || "-",
      m.sksTaken || 0
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data_mahasiswa.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      {/* Table Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div className="flex flex-1 flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Cari NIM atau nama..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-2.5 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
          </div>

          {/* Filter Dropdown */}
          <select
            value={filterMajor}
            onChange={(e) => {
              setFilterMajor(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-600 focus:outline-none focus:border-blue-500"
          >
            <option value="">Semua Jurusan</option>
            {uniqueMajors.map((major) => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        </div>

        {/* Export Button */}
        <button
          onClick={exportToCSV}
          disabled={filteredMahasiswa.length === 0}
          className="px-4 py-2 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors cursor-pointer border border-slate-200"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          <span>Ekspor CSV</span>
        </button>
      </div>

      {/* Table Data */}
      <div className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm">
        {filteredMahasiswa.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <svg className="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5M14 10h1"></path>
            </svg>
            <p className="text-sm font-medium text-slate-500">Tidak ada data mahasiswa</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">NIM</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Jurusan</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">SKS Diambil</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedMahasiswa.map((m) => (
                <tr
                  key={m.nim}
                  className="hover:bg-slate-50/50 transition-colors duration-150"
                >
                  <td className="py-4 px-6 font-mono text-xs font-bold text-slate-500 tracking-wide">{m.nim}</td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-800">{m.name}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{m.major}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      (m.sksTaken || 0) > 20 ? "bg-rose-50 text-rose-700 border border-rose-100" :
                      (m.sksTaken || 0) > 12 ? "bg-amber-50 text-amber-700 border border-amber-100" :
                      (m.sksTaken || 0) > 0 ? "bg-blue-50 text-blue-700 border border-blue-100" :
                      "bg-slate-50 text-slate-600 border border-slate-200"
                    }`}>
                      {m.sksTaken || 0} / 24 SKS
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => onEdit(m.nim)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(m.nim)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalItems > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-xs text-slate-500 font-medium">
            Menampilkan <strong className="font-semibold text-slate-700">{Math.min(startIndex + 1, totalItems)}</strong> sampai <strong className="font-semibold text-slate-700">{Math.min(endIndex, totalItems)}</strong> dari <strong className="font-semibold text-slate-700">{totalItems}</strong> data
          </div>
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            >
              Sebelumnya
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MahasiswaTable;
