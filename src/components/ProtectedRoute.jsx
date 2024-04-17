import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Status } from './ui/Status';
import LoadingScreen from './ui/LoadingScreen';

export function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, error } = useUser();

  // useEffect(() => {
  //   if (!isAuthenticated && !isLoading) navigate('/login');
  // }, [isAuthenticated, isLoading, navigate]);
  return children
  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <div className='relative grid h-screen place-content-center'>
        <Status status='error' message={error?.message} />
      </div>
    );
  // if (isAuthenticated) return children;
}
