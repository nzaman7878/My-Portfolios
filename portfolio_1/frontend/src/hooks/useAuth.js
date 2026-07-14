import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import toast from 'react-hot-toast';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const data = await authApi.login(credentials);
      return data;
    },
    onSuccess: () => {
      toast.success('Login successful');
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed');
    }
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const data = await authApi.logout();
      return data;
    },
    onSuccess: () => {
      toast.success('Logged out successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Logout failed');
    }
  });
};
