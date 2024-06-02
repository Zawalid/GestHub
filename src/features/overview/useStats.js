import { axiosFetch } from '@/services/index';
import { useQuery } from '@tanstack/react-query';

const getStats = async () => await axiosFetch('stats');

export const useStats = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
    retry: 1,
  });

  return {
    stats: data,
    isLoading: isPending,
    error,
  };
};
