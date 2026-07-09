import { useState, useEffect } from "react";
import { Button } from "../components/atoms";

const MataKuliahTable = ({ mataKuliah = [], onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = mataKuliah.length;
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
  const paginatedMataKuliah = mataKuliah.slice(startIndex, endIndex);

  return (
    <div>
      <div className="overflow-x-auto">
        {mataKuliah.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Tidak ada data mata kuliah</p>
          </div>
        ) : (
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Kode</th>
                <th className="py-3 px-4 text-left">Nama Mata Kuliah</th>
                <th className="py-3 px-4 text-left">SKS</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMataKuliah.map((m) => (
                <tr
                  key={m.kode}
                  className="even:bg-gray-100 odd:bg-white border-b hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">{m.kode}</td>
                  <td className="py-3 px-4 font-semibold">{m.nama}</td>
                  <td className="py-3 px-4 font-mono">{m.sks} SKS</td>
                  <td className="py-3 px-4 text-center space-x-2 flex justify-center">
                    <Button
                      variant="warning"
                      className="px-3 py-1 text-sm"
                      onClick={() => onEdit(m.kode)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="px-3 py-1 text-sm"
                      onClick={() => handleDelete(m.kode)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
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

export default MataKuliahTable;
