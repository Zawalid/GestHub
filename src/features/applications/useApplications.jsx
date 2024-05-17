import { useQuery } from '@tanstack/react-query';
import {
  getAllApplications,
  getApplication,
  addApplication,
  deleteApplication,
  approveApplication,
  rejectApplication,
  markAsRead,
  deleteApplications,
  approveApplications,
  rejectApplications,
} from '@/services/applicationsAPI';
import { useMutate } from '@/hooks/useMutate';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { getFile } from '@/utils/helpers';
import { FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6';

// Queries

const getApplicationData = (application) => {
  const {
    id,
    offer: { title, sector } = {},
    owner: { firstName, lastName, email, gender } = {},
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
    fullName: `${firstName} ${lastName}`,
    email,
    gender,
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
    applicationStage: getFile(application, 'applicationStage'),
  };
};

export function useApplications() {
  const { data, error, isPending } = useQuery({
    queryKey: ['applications'],
    queryFn: getAllApplications,
  });

  const applications = Array.isArray(data) ? data.map((application) => getApplicationData(application)) : [];

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

export const useDeleteApplications = () =>
  useMutate({
    queryKey: ['applications', 'delete', 'multiple'],
    mutationFn: deleteApplications,
    loadingMessage: 'Deleting applications...',
    successMessage: 'Applications deleted successfully',
    errorMessage: 'Failed to delete applications',
  });

// Approve and Reject
const getApprovementOptions = (isMultiple, number) => {
  const mutation = {
    queryKey: ['applications', 'approve', isMultiple ? 'multiple' : ''],
    mutationFn: isMultiple ? approveApplications : approveApplication,
    loadingMessage: `Approving application${isMultiple ? 's' : ''}...`,
    successMessage: `Application${isMultiple ? 's' : ''} approved successfully`,
    errorMessage: `Failed to approve application${isMultiple ? 's' : ''}`,
  };

  const approve = {
    message: `Are you sure you want to approve ${isMultiple ? number : 'this'} application${isMultiple ? 's' : ''}?`,
    title: `Approve Application${isMultiple ? 's' : ''}`,
    confirmText: 'Approve',
    icon: <FaRegCircleCheck />,
    iconBg: 'bg-green-600',
    buttonClassName: 'bg-green-600 hover:bg-green-700',
  };
  return { mutation, approve };
};

export const useApproveApplication = () => {
  const { openModal } = useConfirmationModal();
  const approvement = useMutate(getApprovementOptions().mutation);

  const approve = (id, options) =>
    openModal({ ...getApprovementOptions().approve, onConfirm: () => approvement.mutate(id, options) });

  return { ...approvement, approve };
};

export const useApproveApplications = () => {
  const { openModal } = useConfirmationModal();
  const approvement = useMutate(getApprovementOptions(true).mutation);

  const approve = (ids, options) =>
    openModal({
      ...getApprovementOptions(true, ids.length).approve,
      onConfirm: () => {
        options.onConfirm?.();
        approvement.mutate(ids, options);
      },
    });

  return { ...approvement, approve };
};

const getRejectionOptions = (isMultiple, number) => {
  const mutation = {
    queryKey: ['applications', 'reject', isMultiple ? 'multiple' : ''],
    mutationFn: isMultiple ? rejectApplications : rejectApplication,
    loadingMessage: `Rejecting application${isMultiple ? 's' : ''}...`,
    successMessage: `Application${isMultiple ? 's' : ''} rejected successfully`,
    errorMessage: `Failed to reject application${isMultiple ? 's' : ''}`,
  };

  const reject = {
    message: `Are you sure you want to reject ${isMultiple ? number : 'this'} application${isMultiple ? 's' : ''}?`,
    title: `Reject Application${isMultiple ? 's' : ''}`,
    confirmText: 'Reject',
    icon: <FaRegCircleXmark />,
    iconBg: 'bg-red-600',
  };
  return { mutation, reject };
};
export const useRejectApplication = () => {
  const { openModal } = useConfirmationModal();
  const rejection = useMutate(getRejectionOptions().mutation);

  const reject = (id, options) =>
    openModal({ ...getRejectionOptions().reject, onConfirm: () => rejection.mutate(id, options) });

  return { ...rejection, reject };
};
export const useRejectApplications = () => {
  const { openModal } = useConfirmationModal();
  const rejection = useMutate(getRejectionOptions(true).mutation);

  const reject = (ids, options) =>
    openModal({
      ...getRejectionOptions(true, ids.length).reject,
      onConfirm: () => {
        options.onConfirm?.();
        rejection.mutate(ids, options);
      },
    });

  return { ...rejection, reject };
};

//
export const useMarkAsRead = () =>
  useMutate({
    queryKey: ['applications', 'read'],
    mutationFn: markAsRead,
    loadingMessage: null,
    successMessage: null,
    errorMessage: null,
  });
