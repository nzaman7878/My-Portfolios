import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../api/auth';

export default function ProtectedRoute({ children }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authApi.getMe,
    retry: 1, // Only retry once if unauthorized
  });
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--color-secondary-text)]">
        Verifying session...
      </div>
    );
  }

  if (isError || !data?.success) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
