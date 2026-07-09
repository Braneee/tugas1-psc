import { useState, useEffect } from "react";
import { Button } from "../components/atoms";

const DosenTable = ({ dosen = [], onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = dosen.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Sync current page if data changes (e.g. items deleted)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalItems, totalPages, currentPage]);

  const handleDelete = (nidn) => {
    onDelete(nidn);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDosen = dosen.slice(startIndex, endIndex);

  return (
    <div>
      <div className="overflow-x-auto">
        {dosen.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Tidak ada data dosen</p>
          </div>
        ) : (
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">NIDN</th>
                <th className="py-3 px-4 text-left">Nama Dosen</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">SKS Diajar</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDosen.map((d) => (
                <tr
                  key={d.nidn}
                  className="even:bg-gray-100 odd:bg-white border-b hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-mono font-bold">{d.nidn}</td>
                  <td className="py-3 px-4 font-semibold">{d.nama}</td>
                  <td className="py-3 px-4">{d.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      (d.sksTaught || 0) >= 10 ? "bg-red-100 text-red-800" :
                      (d.sksTaught || 0) >= 6 ? "bg-amber-100 text-amber-800" :
                      (d.sksTaught || 0) > 0 ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {d.sksTaught || 0} / 12 SKS
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center space-x-2 flex justify-center">
                    <Button
                      variant="warning"
                      className="px-3 py-1 text-sm"
                      onClick={() => onEdit(d.nidn)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="px-3 py-1 text-sm"
                      onClick={() => handleDelete(d.nidn)}
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

export default DosenTable;
