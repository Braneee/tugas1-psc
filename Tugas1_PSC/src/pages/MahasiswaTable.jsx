import { Button } from "../components/atoms";

const MahasiswaTable = ({ mahasiswa, onEdit, onDelete }) => {
  // handleDelete: panggil onDelete dengan parameter nim mahasiswa
  const handleDelete = (nim) => {
    onDelete(nim);
  };

  return (
    <div className="overflow-x-auto">
      {mahasiswa.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Tidak ada data mahasiswa</p>
        </div>
      ) : (
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">NIM</th>
              <th className="py-3 px-4 text-left">Nama</th>
              <th className="py-3 px-4 text-left">Jurusan</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((m) => (
              <tr
                key={m.nim}
                className="even:bg-gray-100 odd:bg-white border-b hover:bg-gray-50"
              >
                <td className="py-3 px-4">{m.nim}</td>
                <td className="py-3 px-4">{m.name}</td>
                <td className="py-3 px-4">{m.major}</td>
                <td className="py-3 px-4 text-center space-x-2 flex justify-center">
                  <Button
                    variant="warning"
                    className="px-3 py-1 text-sm"
                    onClick={() => onEdit(m.nim)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="px-3 py-1 text-sm"
                    onClick={() => handleDelete(m.nim)}
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
  );
};

export default MahasiswaTable;
