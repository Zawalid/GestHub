import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingScreen } from './ui/LoadingScreen';
import { ErrorScreen } from './ui/ErrorScreen';

export function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, user, error } = useUser('detect');


  // return children;

  useEffect(() => {
    if (!user && !isLoading) navigate('/login', { replace: true });
  }, [user, isLoading, navigate]);

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;
  if (user) return children;
}
