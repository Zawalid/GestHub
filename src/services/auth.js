import { useMutation } from '@tanstack/react-query';
import { axiosFetch } from '.';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { logUserIn, logUserOut } from '@/app/reducer';

const login = async (email, password) => await axiosFetch('auth/login', 'POST', { email, password });

const register = async (user) => await axiosFetch('auth/register', 'POST', user);

const logout = async () => await axiosFetch('/auth/logout', 'POST', null);

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
