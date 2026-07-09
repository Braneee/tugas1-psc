import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getKelas,
  createKelas,
  updateKelas,
  deleteKelas,
} from "../services/api";

export const useKelas = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["kelas"],
    queryFn: async () => {
      const res = await getKelas();
      return res.data.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: createKelas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ kode, data }) => updateKelas(kode, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteKelas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });

  return {
    kelas: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createKelas: createMutation.mutateAsync,
    updateKelas: updateMutation.mutateAsync,
    deleteKelas: deleteMutation.mutateAsync,
  };
};
