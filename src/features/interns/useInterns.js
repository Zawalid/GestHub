import { useMutate } from '@/hooks/useMutate';
import { formatUserData, useUser } from '@/hooks/useUser';
import {
  acceptUsers,
  addIntern,
  deleteIntern,
  deleteInterns,
  generateAttestation,
  generateAttestations,
  getAcceptedUsers,
  getAllInterns,
  getIntern,
  updateIntern,
} from '@/services/internsAPI';
import { uploadFile } from '@/services/usersAPI';
import { getFile, getTimelineDates } from '@/utils/helpers';
import { useQuery } from '@tanstack/react-query';

// Queries

const getAdditionalData = (data) => {
  const { isOverdue, daysToStart } = getTimelineDates(data?.startDate, data?.endDate);
  const status = isOverdue
    ? 'Completed'
    : daysToStart > 1
      ? 'Upcoming'
      : daysToStart === 1
        ? 'Starting Today'
        : 'Ongoing';

  return {
    ...formatUserData(data, true),
    attestation: getFile(data, 'attestation'),
    status,
  };
};

export function useInterns() {
  const { data, error, isPending } = useQuery({
    queryKey: ['interns'],
    queryFn: getAllInterns,
  });

  const interns = data?.map((intern) => ({
    ...intern,
    ...getAdditionalData(intern),
  }));

  return { interns, error, isLoading: isPending };
}

export function useInternsByIds(ids) {
  const { data, error, isPending } = useQuery({
    queryKey: ['interns', ...(ids.length ? ids : ['loading'])],
    queryFn: () => Promise.all(ids.map((id) => getIntern(id))),
  });

  const interns = data?.map((intern) => ({ ...intern, ...getAdditionalData(intern) }));

  return { interns, error, isLoading: isPending };
}

export function useIntern(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ['interns', id],
    queryFn: () => getIntern(id),
  });

  const intern = { ...data, ...getAdditionalData(data) };

  return { intern, error, isLoading: isPending };
}

export function useAcceptedUsers() {
  const { data, error, isPending } = useQuery({
    queryKey: ['acceptedUsers'],
    queryFn: getAcceptedUsers,
  });

  const acceptedUsers = data?.map((intern) => ({ ...intern, ...getAdditionalData(intern) }));

  return { acceptedUsers, error, isLoading: isPending };
}

// Mutations

export const useAddIntern = () =>
  useMutate({
    queryKey: ['interns', 'add'],
    mutationFn: addIntern,
    loadingMessage: 'Adding intern...',
    successMessage: 'Intern added successfully',
  });

export const useUpdateIntern = () =>
  useMutate({
    queryKey: ['interns', 'update'],
    mutationFn: ({ id, data }) => updateIntern(id, data),
    loadingMessage: 'Updating intern...',
    successMessage: 'Intern updated successfully',
  });

export const useDeleteIntern = () =>
  useMutate({
    queryKey: ['interns', 'delete'],
    mutationFn: deleteIntern,
    loadingMessage: 'Deleting intern...',
    successMessage: 'Intern deleted successfully',
    errorMessage: 'Failed to delete intern',
  });

export const useDeleteInterns = () =>
  useMutate({
    queryKey: ['interns', 'delete', 'multiple'],
    mutationFn: deleteInterns,
    loadingMessage: 'Deleting interns...',
    successMessage: 'Interns deleted successfully',
    errorMessage: 'Failed to delete interns',
  });

export const useGenerateAttestation = () =>
  useMutate({
    queryKey: ['interns', 'generateAttestation'],
    mutationFn: generateAttestation,
    loadingMessage: 'Generating attestation...',
    successMessage: 'Attestation generated successfully',
    errorMessage: 'Failed to generate attestation',
  });

export const useGenerateAttestations = () =>
  useMutate({
    queryKey: ['interns', 'generateAttestations'],
    mutationFn: generateAttestations,
    loadingMessage: 'Generating attestations...',
    successMessage: 'Attestations generated successfully',
    errorMessage: 'Failed to generate attestations',
  });

export const useAcceptUsers = () =>
  useMutate({
    queryKey: ['interns', 'acceptUsers'],
    mutationFn: acceptUsers,
    loadingMessage: 'Accepting users...',
    successMessage: 'Users accepted successfully',
    errorMessage: 'Failed to accept users',
  });

export const useSendInfo = () => {
  const { user } = useUser();

  return useMutate({
    queryKey: ['user', 'info'],
    mutationFn: async ({projectLink, report}) => {
      await updateIntern(user?.profile_id, { projectLink });
      await uploadFile(user?.profile_id, report, 'report');
    },
    loadingMessage: 'Sending info...',
    successMessage: 'Info sent successfully',
    errorMessage: 'Failed to send info',
  });
};
