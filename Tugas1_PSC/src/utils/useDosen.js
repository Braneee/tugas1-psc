import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDosen,
  createDosen,
  updateDosen,
  deleteDosen,
} from "../services/api";

export const useDosen = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["dosen"],
    queryFn: async () => {
      const res = await getDosen();
      return res.data.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: createDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ nidn, data }) => updateDosen(nidn, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
    },
  });

  return {
    dosen: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createDosen: createMutation.mutateAsync,
    updateDosen: updateMutation.mutateAsync,
    deleteDosen: deleteMutation.mutateAsync,
  };
};
