import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactApi } from '../api/contact';
import toast from 'react-hot-toast';

export const useMessages = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn: () => contactApi.getMessages().then(res => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSubmitMessage = () => {
  return useMutation({
    mutationFn: contactApi.submitMessage,
    onSuccess: () => {
      // Don't invalidate because public users submit messages
      toast.success('Message sent successfully!');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to send message');
    }
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contactApi.deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast.success('Message deleted');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete message');
    }
  });
};
