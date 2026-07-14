import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import toast from 'react-hot-toast';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const data = await authApi.login(credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('adminToken', data.data.token);
      toast.success('Login successful');
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed');
    }
  });
};
