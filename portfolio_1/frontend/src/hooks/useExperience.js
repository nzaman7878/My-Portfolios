import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { experienceApi } from '../api/experience';
import toast from 'react-hot-toast';

export const useExperience = () => {
  return useQuery({
    queryKey: ['experience'],
    queryFn: () => experienceApi.getExperiences().then(res => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: experienceApi.createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] });
      toast.success('Experience created successfully');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to create experience');
    }
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => experienceApi.updateExperience(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] });
      toast.success('Experience updated successfully');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update experience');
    }
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: experienceApi.deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] });
      toast.success('Experience deleted successfully');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete experience');
    }
  });
};
