import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingScreen } from './ui/LoadingScreen';
import { ErrorScreen } from './ui/ErrorScreen';

export function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const {  isLoading, isAuthenticated, error } = useUser();

  // return children;

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login', { replace: true });
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;
  if (isAuthenticated) return children;
}
