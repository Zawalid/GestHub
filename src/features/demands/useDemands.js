import { useQuery } from '@tanstack/react-query';
import { getAllDemands, getDemand, addDemand, deleteDemand, approveDemand, rejectDemand } from '@/services/demandsAPI';
import { useMutate } from '@/hooks/useMutate';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { getFile } from '@/utils/helpers';

// Queries

const getDemandData = (demand) => {
  const {
    id,
    offer: { title, sector } = {},
    owner: { firstName, lastName, email } = {},
    startDate,
    endDate,
    status,
    motivationLetter,
  } = demand || {};
  return {
    id,
    firstName,
    lastName,
    email,
    startDate,
    endDate,
    offer: title,
    sector: sector,
    status,
    motivationLetter,
    cv: getFile(demand?.owner, 'cv'),
    demandeStage: getFile(demand, 'demandeStage'),
  };
};

export function useDemands() {
  const { data, error, isPending } = useQuery({
    queryKey: ['demands'],
    queryFn: getAllDemands,
  });

  const demands = data?.map((demand) => getDemandData(demand));

  return {
    demands,
    error,
    isLoading: isPending,
  };
}
export const useDemand = (id) => {
  const { data, error, isPending } = useQuery({
    queryKey: ['demand', id],
    queryFn: () => getDemand(id),
  });
  return {
    demand: getDemandData(data),
    error,
    isLoading: isPending,
  };
};

// Mutations

export const useAddDemand = ({ showToast } = {}) =>
  useMutate({
    queryKey: ['demands', 'add'],
    mutationFn: addDemand,
    showToast,
    loadingMessage: 'Adding demand...',
    successMessage: 'Demand added successfully',
    errorMessage: 'Failed to add demand',
  });

export const useDeleteDemand = () =>
  useMutate({
    queryKey: ['demands', 'delete'],
    mutationFn: deleteDemand,
    loadingMessage: 'Deleting demand...',
    successMessage: 'Demand deleted successfully',
    errorMessage: 'Failed to delete demand',
  });

export const useApproveDemand = () => {
  const { openModal } = useConfirmationModal();

  const approvement = useMutate({
    queryKey: ['demands', 'approve'],
    mutationFn: approveDemand,
    loadingMessage: 'Approveing demand...',
    successMessage: 'Demand approved successfully',
    errorMessage: 'Failed to approve demand',
  });

  const approve = (id, options) =>
    openModal({
      message: 'Are you sure you want to approve this demand?',
      title: 'Approve Demand',
      confirmText: 'Approve',
      onConfirm: () => approvement.mutate(id, options),
    });

  return { ...approvement, approve };
};

export const useRejectDemand = () => {
  const { openModal } = useConfirmationModal();

  const rejection = useMutate({
    queryKey: ['demands', 'reject'],
    mutationFn: rejectDemand,
    loadingMessage: 'Rejecting demand...',
    successMessage: 'Demand rejected successfully',
    errorMessage: 'Failed to reject demand',
  });

  const reject = (id, options) =>
    openModal({
      message: 'Are you sure you want to reject this demand?',
      title: 'Reject Demand',
      confirmText: 'Reject',
      onConfirm: () => rejection.mutate(id, options),
    });

  return { ...rejection, reject };
};
