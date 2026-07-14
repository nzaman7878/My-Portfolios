import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillsApi } from '../api/skills';
import toast from 'react-hot-toast';

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => skillsApi.getSkills().then(res => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: skillsApi.createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill created successfully');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to create skill');
    }
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => skillsApi.updateSkill(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill updated successfully');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update skill');
    }
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: skillsApi.deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill deleted successfully');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete skill');
    }
  });
};
