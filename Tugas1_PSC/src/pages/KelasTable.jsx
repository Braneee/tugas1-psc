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
  const itemsPerPage = 5;

  const totalItems = kelas.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Sync current page if data changes (e.g. items deleted)
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
  const paginatedKelas = kelas.slice(startIndex, endIndex);

  return (
    <div>
      <div className="overflow-x-auto">
        {kelas.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Tidak ada data kelas</p>
          </div>
        ) : (
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Kode Kelas</th>
                <th className="py-3 px-4 text-left">Nama Kelas</th>
                <th className="py-3 px-4 text-left">Ruangan</th>
                <th className="py-3 px-4 text-left">Mata Kuliah</th>
                <th className="py-3 px-4 text-left">Dosen Pengampu</th>
                <th className="py-3 px-4 text-left">Daftar Mahasiswa</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedKelas.map((k) => {
                // Look up course
                const mk = mataKuliah.find((m) => m.kode === k.matkulKode);
                // Look up lecturer
                const ds = dosen.find((d) => d.nidn === k.dosenNidn);
                // Look up students
                const enrolled = k.mahasiswaNims || [];

                return (
                  <tr
                    key={k.kode}
                    className="even:bg-gray-100 odd:bg-white border-b hover:bg-gray-50 align-top"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-blue-600">{k.kode}</td>
                    <td className="py-3 px-4 font-semibold">{k.nama}</td>
                    <td className="py-3 px-4 font-mono text-gray-600">{k.ruangan}</td>
                    <td className="py-3 px-4">
                      {mk ? (
                        <div>
                          <div className="font-semibold text-gray-800">{mk.nama}</div>
                          <div className="text-xs text-blue-600 font-mono font-bold mt-0.5">{mk.kode} &bull; {mk.sks} SKS</div>
                        </div>
                      ) : (
                        <span className="text-gray-400 font-mono text-xs">Belum dipilih</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {ds ? (
                        <div>
                          <div className="font-semibold text-gray-800">{ds.nama}</div>
                          <div className="text-xs text-gray-500 font-mono mt-0.5">NIDN: {ds.nidn}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400 font-mono text-xs">Belum dipilih</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {enrolled.length === 0 ? (
                        <span className="text-gray-400 text-xs italic">Kosong</span>
                      ) : (
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {enrolled.map((nim) => {
                            const m = mahasiswa.find((x) => x.nim === nim);
                            const label = m ? m.name : nim;
                            return (
                              <span
                                key={nim}
                                className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded text-xs font-semibold"
                                title={`NIM: ${nim}`}
                              >
                                {label}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <div className="flex flex-col gap-1 items-center justify-center">
                        <Button
                          variant="warning"
                          className="px-3 py-1 text-sm w-16"
                          onClick={() => onEdit(k.kode)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          className="px-3 py-1 text-sm w-16"
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
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200 gap-4">
          <div className="text-sm text-gray-600">
            Menampilkan <strong className="font-semibold text-gray-800">{Math.min(startIndex + 1, totalItems)}</strong> sampai <strong className="font-semibold text-gray-800">{Math.min(endIndex, totalItems)}</strong> dari <strong className="font-semibold text-gray-800">{totalItems}</strong> data
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Sebelumnya
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 border rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
