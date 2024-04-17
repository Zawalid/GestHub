import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { logUserIn, logUserOut } from '@/app/reducer';
import { login, register, logout, getUser } from '@/services/usersAPI';
import { useEffect } from 'react';

const useRedirect = (isLogout) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLogout)
    return () => {
      dispatch(logUserOut());
      navigate('/');
    };

  return (message, user) => {
    toast.success(message);
    dispatch(logUserIn(user));
    navigate('/app');
  };
};

export function useLogin() {
  const redirect = useRedirect();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (data) => redirect("Logged in successfully. You'll be redirected now.", data),
    onError: (error) => toast.error(error.message),
  });

  return { login: mutate, isLogging: isPending, error };
}

export function useRegister() {
  const redirect = useRedirect();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['register'],
    mutationFn: (user) => register(user),
    onSuccess: (data) => redirect("Registered in successfully. You'll be redirected now.", data),
    onError: (error) => toast.error(error.message),
  });

  return { register: mutate, isRegistering: isPending, error };
}

export function useLogout() {
  const redirect = useRedirect(true);
  const { mutate, isPending, error } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: (data) => redirect(null, data),
    onError: (error) => toast.error(error.message),
  });

  return { logout: mutate, isLoggingOut: isPending, error };
}

export function useUser() {
  const dispatch = useDispatch();
  const { data, error, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  useEffect(() => {
    if (data) dispatch(logUserIn(data));
  }, [data, dispatch]);

  return { user: data, isAuthenticated: Boolean(data), isLoading: isPending, error };
}
