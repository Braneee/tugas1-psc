import { useState, useEffect } from "react";
import { Button } from "../components/atoms";

const KelasTable = ({
  kelas = [],
  mataKuliah = [],
  dosen = [],
  mahasiswa = [],
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMatkul, setFilterMatkul] = useState("");
  const itemsPerPage = 5;

  // Filter and search logic
  const filteredKelas = kelas.filter((k) => {
    const mk = mataKuliah.find((m) => m.kode === k.matkulKode);
    const mkName = mk ? mk.nama : "";
    const ds = dosen.find((d) => d.nidn === k.dosenNidn);
    const dsName = ds ? ds.nama : "";

    const matchesSearch =
      k.kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.ruangan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mkName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dsName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMatkul = filterMatkul ? k.matkulKode === filterMatkul : true;
    return matchesSearch && matchesMatkul;
  });

  const totalItems = filteredKelas.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Sync current page if filtered data changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalItems, totalPages, currentPage]);

  const handleDelete = (kode) => {
    onDelete(kode);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedKelas = filteredKelas.slice(startIndex, endIndex);

  // Export to CSV helper
  const exportToCSV = () => {
    const headers = ["Kode Kelas", "Nama Kelas", "Ruangan", "Mata Kuliah", "Dosen", "Jumlah Mahasiswa"];
    const rows = filteredKelas.map((k) => {
      const mk = mataKuliah.find((m) => m.kode === k.matkulKode);
      const ds = dosen.find((d) => d.nidn === k.dosenNidn);
      return [
        k.kode,
        k.nama,
        k.ruangan,
        mk ? mk.nama : "-",
        ds ? ds.nama : "-",
        k.mahasiswaNims ? k.mahasiswaNims.length : 0
      ];
    });
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data_kelas.csv");
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
              placeholder="Cari kode, kelas, ruangan, dosen..."
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
            value={filterMatkul}
            onChange={(e) => {
              setFilterMatkul(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-600 focus:outline-none focus:border-blue-500 max-w-xs truncate"
          >
            <option value="">Semua Mata Kuliah</option>
            {mataKuliah.map((mk) => (
              <option key={mk.kode} value={mk.kode}>{mk.nama}</option>
            ))}
          </select>
        </div>

        {/* Export Button */}
        <button
          onClick={exportToCSV}
          disabled={filteredKelas.length === 0}
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
        {filteredKelas.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <svg className="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5M14 10h1"></path>
            </svg>
            <p className="text-sm font-medium text-slate-500">Tidak ada data kelas</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Kode Kelas</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Kelas</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Ruangan</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Mata Kuliah</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Dosen Pengampu</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Daftar Mahasiswa</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedKelas.map((k) => {
                const mk = mataKuliah.find((m) => m.kode === k.matkulKode);
                const ds = dosen.find((d) => d.nidn === k.dosenNidn);
                const enrolled = k.mahasiswaNims || [];

                return (
                  <tr
                    key={k.kode}
                    className="hover:bg-slate-50/50 transition-colors duration-150 align-middle"
                  >
                    <td className="py-4 px-6 font-mono text-xs font-bold text-blue-600 tracking-wide">{k.kode}</td>
                    <td className="py-4 px-6 text-sm font-bold text-slate-800">{k.nama}</td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-500">{k.ruangan}</td>
                    <td className="py-4 px-6">
                      {mk ? (
                        <div className="space-y-0.5">
                          <div className="text-sm font-semibold text-slate-850">{mk.nama}</div>
                          <div className="text-[10px] text-blue-600 font-mono font-bold">{mk.kode} &bull; {mk.sks} SKS</div>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-mono text-xs">Belum dipilih</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {ds ? (
                        <div className="space-y-0.5">
                          <div className="text-sm font-semibold text-slate-800">{ds.nama}</div>
                          <div className="text-[10px] text-slate-400 font-mono">NIDN: {ds.nidn}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-mono text-xs">Belum dipilih</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {enrolled.length === 0 ? (
                        <span className="text-slate-400 text-xs italic">Kosong</span>
                      ) : (
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {enrolled.map((nim) => {
                            const m = mahasiswa.find((x) => x.nim === nim);
                            const label = m ? m.name : nim;
                            return (
                              <span
                                key={nim}
                                className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-md text-[10px] font-bold"
                                title={`NIM: ${nim}`}
                              >
                                {label}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex flex-col gap-1 items-center justify-center">
                        <Button
                          variant="warning"
                          size="sm"
                          className="w-16 text-center"
                          onClick={() => onEdit(k.kode)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="w-16 text-center"
                          onClick={() => handleDelete(k.kode)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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

export default KelasTable;
