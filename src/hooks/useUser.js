import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  login,
  register,
  logout,
  getUser,
} from '@/services/usersAPI';
import {  getFile } from '@/utils/helpers';
import { useConfirmationModal } from './useConfirmationModal';

const useRedirect = () => {
  const navigate = useNavigate();
  const source = useLocation().state?.source;

  return (message, role) => {
    localStorage.setItem('in', 'true');
    toast.success(message);
    navigate(source ? source : role === 'user' ? '/' : '/app');
  };
};

export function useLogin() {
  const redirect = useRedirect();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (data) => redirect("Logged in successfully. You'll be redirected now.", data?.role || data?.data?.role),
    onError: (error) => toast.error(error.message),
  });

  return { login: mutate, isLogging: isPending, error };
}

export function useRegister() {
  const redirect = useRedirect();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['register'],
    mutationFn: (user) => register(user),
    onSuccess: (data) =>
      redirect("Registered in successfully. You'll be redirected now.", data?.role || data?.data?.role),
    onError: (error) => toast.error(error.message),
  });

  return { register: mutate, isRegistering: isPending, error };
}

export function useLogout() {
  const { mutate, isPending, error } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem('in');
      location.assign('/');
    },
    onError: (error) => toast.error(error.message),
  });
  const { openModal } = useConfirmationModal();

  const logoutFn = () =>
    openModal({
      message: 'You are about to log out. Do you wish to proceed?',
      title: 'Logout',
      confirmText: 'Logout',
      onConfirm: mutate,
    });

  return { logout: logoutFn, isLoggingOut: isPending, error };
}

export const formatUserData = (data, includeCv, isUser) => {
  const avatar = getFile(data, 'avatar');
  return {
    ...(data || {}),
    fullName: `${data?.firstName} ${data?.lastName}`,
    avatar: isUser ? { src: avatar, file: null } : avatar,
    ...(includeCv && { cv: getFile(data, 'cv') }),
  };
};

const getUserCv = (user) => {
  const cv = getFile(user, 'cv');
  const extension = cv?.split('.').pop() || 'pdf';

  return cv ? { file: { name: `${user?.firstName} ${user?.lastName} CV.${extension}` }, src: cv } : null;
};

export function useUser(reason) {
  const { data, error, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: 1,
    enabled: localStorage.getItem('in') === 'true' || reason === 'detect',
  });

  return {
    user: data
      ? {
          ...formatUserData(data, true, true),
          ...(data?.role === 'intern' && {
            cv: getUserCv(data),
            attestation: getFile(data, 'attestation'),
            report: getFile(data, 'report'),
          }),
          // role : 'supervisor'
        }
      : null,
    isLoading: isPending,
    error,
  };
}

