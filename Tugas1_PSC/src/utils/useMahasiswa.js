import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMahasiswa,
  createMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "../services/api";

export const useMahasiswa = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: async () => {
      const res = await getMahasiswa();
      // Map backend schema (nama) to local table/modal schema (name)
      return res.data.data.map((m) => ({
        nim: m.nim,
        name: m.nama,
        major: "Teknik Informatika", // fallback since major isn't stored on backend
      }));
    },
  });

  const createMutation = useMutation({
    mutationFn: createMahasiswa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ nim, data }) => updateMahasiswa(nim, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMahasiswa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });

  return {
    mahasiswa: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createMahasiswa: createMutation.mutateAsync,
    updateMahasiswa: updateMutation.mutateAsync,
    deleteMahasiswa: deleteMutation.mutateAsync,
  };
};
