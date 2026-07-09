import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMataKuliah,
  createMataKuliah,
  updateMataKuliah,
  deleteMataKuliah,
} from "../services/api";

export const useMataKuliah = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["mataKuliah"],
    queryFn: async () => {
      const res = await getMataKuliah();
      return res.data.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: createMataKuliah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mataKuliah"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ kode, data }) => updateMataKuliah(kode, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mataKuliah"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMataKuliah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mataKuliah"] });
    },
  });

  return {
    mataKuliah: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createMataKuliah: createMutation.mutateAsync,
    updateMataKuliah: updateMutation.mutateAsync,
    deleteMataKuliah: deleteMutation.mutateAsync,
  };
};
