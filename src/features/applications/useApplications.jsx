import { useQuery } from '@tanstack/react-query';
import {
  getAllApplications,
  getApplication,
  addApplication,
  deleteApplication,
  approveApplication,
  rejectApplication,
  markAsRead,
} from '@/services/applicationsAPI';
import { useMutate } from '@/hooks/useMutate';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { getFile } from '@/utils/helpers';
import { FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6';
import { useUser } from '@/hooks/useUser';

// Queries

const getApplicationData = (application) => {
  const {
    id,
    offer: { title, sector } = {},
    owner: { firstName, lastName, email } = {},
    startDate,
    endDate,
    status,
    motivationLetter,
    isRead,
    created_at,
    updated_at,
  } = application || {};
  return {
    id,
    firstName,
    lastName,
    email,
    startDate,
    endDate,
    offer: title,
    sector,
    status,
    isRead: isRead === 'true',
    created_at,
    updated_at,
    motivationLetter,
    cv: getFile(application?.owner, 'cv'),
    demandeStage: getFile(application, 'demandeStage'),
  };
};

export function useApplications() {
  const { data, error, isPending } = useQuery({
    queryKey: ['applications'],
    queryFn: getAllApplications,
  });

  const applications = data?.map((application) => getApplicationData(application));

  return {
    applications,
    error,
    isLoading: isPending,
  };
}
export const useApplication = (id) => {
  const { data, error, isPending } = useQuery({
    queryKey: ['application', id],
    queryFn: () => getApplication(id),
  });
  return {
    application: getApplicationData(data),
    error,
    isLoading: isPending,
  };
};

export const useUserApplications = () => {
  const { user } = useUser();
  const ids = user?.applications?.map((d) => d.id) || [];

  const { data, error, isPending } = useQuery({
    queryKey: ['applications', ...ids],
    queryFn: () => Promise.all(ids.map((id) => getApplication(id))),
  });

  const applications = data?.map((application) => getApplicationData(application)).filter((d) => d.status !== 'Rejected');

  return { applications, error, isLoading: isPending };
};

// Mutations

export const useAddApplication = ({ showToast } = {}) =>
  useMutate({
    queryKey: ['applications', 'add'],
    mutationFn: addApplication,
    showToast,
    loadingMessage: null,
    successMessage: null,
    errorMessage: null,
  });

export const useDeleteApplication = () =>
  useMutate({
    queryKey: ['applications', 'delete'],
    mutationFn: deleteApplication,
    loadingMessage: 'Deleting application...',
    successMessage: 'Application deleted successfully',
    errorMessage: 'Failed to delete application',
  });

export const useApproveApplication = () => {
  const { openModal } = useConfirmationModal();

  const approvement = useMutate({
    queryKey: ['applications', 'approve'],
    mutationFn: approveApplication,
    loadingMessage: 'Approving application...',
    successMessage: 'Application approved successfully',
    errorMessage: 'Failed to approve application',
  });

  const approve = (id, options) =>
    openModal({
      message: 'Are you sure you want to approve this application?',
      title: 'Approve Application',
      confirmText: 'Approve',
      icon: <FaRegCircleCheck />,
      iconBg: 'bg-green-600',
      buttonClassName: 'bg-green-600 hover:bg-green-700',
      onConfirm: () => approvement.mutate(id, options),
    });

  return { ...approvement, approve };
};

export const useRejectApplication = () => {
  const { openModal } = useConfirmationModal();

  const rejection = useMutate({
    queryKey: ['applications', 'reject'],
    mutationFn: rejectApplication,
    loadingMessage: 'Rejecting application...',
    successMessage: 'Application rejected successfully',
    errorMessage: 'Failed to reject application',
  });

  const reject = (id, options) =>
    openModal({
      message: 'Are you sure you want to reject this application?',
      title: 'Reject Application',
      confirmText: 'Reject',
      icon: <FaRegCircleXmark />,
      iconBg: 'bg-red-600',
      onConfirm: () => rejection.mutate(id, options),
    });

  return { ...rejection, reject };
};

export const useMarkAsRead = () =>
  useMutate({
    queryKey: ['applications', 'read'],
    mutationFn: markAsRead,
    loadingMessage: null,
    successMessage: null,
    errorMessage: null,
  });
