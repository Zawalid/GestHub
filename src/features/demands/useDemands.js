import { useQuery } from '@tanstack/react-query';
import { getAllDemands, getDemand, addDemand, deleteDemand } from '@/services/demandsAPI';
import { useMutate } from '@/hooks/useMutate';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';

// Queries

const getAdditionalData = (demand) => {
  const {
    id,
    offer: { title, sector } = {},
    user: { firstName, lastName, email } = {},
    startDate,
    endDate,
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
  };
};

export function useDemands() {
  const { data, error, isPending } = useQuery({
    queryKey: ['demands'],
    queryFn: getAllDemands,
  });

  const demands = data?.map((demand) => getAdditionalData(demand));

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
    demand: getAdditionalData(data),
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

  const approve = () =>
    openModal({
      message: 'Are you sure you want to approve this demand?',
      title: 'Approve Demand',
      confirmText: 'Approve',
    });

  return { approve };
};

export const useRejectDemand = () => {
  const { openModal } = useConfirmationModal();

  const reject = () =>
    openModal({
      message: 'Are you sure you want to reject this demand?',
      title: 'Reject Demand',
      confirmText: 'Reject',
    });

  return { reject };
};
