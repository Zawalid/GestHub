import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { login, register, logout, getUser } from '@/services/usersAPI';

const useRedirect = (isLogout) => {
  const navigate = useNavigate();

  if (isLogout) return () => navigate('/');
  return (message) => {
    toast.success(message);
    navigate('/app');
  };
};

export function useLogin() {
  const redirect = useRedirect();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: () => redirect("Logged in successfully. You'll be redirected now."),
    onError: (error) => toast.error(error.message),
  });

  return { login: mutate, isLogging: isPending, error };
}

export function useRegister() {
  const redirect = useRedirect();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['register'],
    mutationFn: (user) => register(user),
    onSuccess: () => redirect("Registered in successfully. You'll be redirected now."),
    onError: (error) => toast.error(error.message),
  });

  return { register: mutate, isRegistering: isPending, error };
}

export function useLogout() {
  const queryClient = useQueryClient();
  const redirect = useRedirect(true);

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: (data) => {
      redirect(null, data);
      queryClient.removeQueries('user');
    },
    onError: (error) => toast.error(error.message),
  });

  return { logout: mutate, isLoggingOut: isPending, error };
}

export function useUser() {
  const { data, error, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  return {
    user: { ...data,
      role : 'admin',projects : [1,2],id : 1 
    },
    isAuthenticated: Boolean(data),
    isLoading: isPending,
    error,
  };
}
