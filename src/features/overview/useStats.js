import { axiosFetch } from '@/services/index';
import { useQuery } from '@tanstack/react-query';

const getStats = async () => await axiosFetch('stats');

const getCount = async () => await axiosFetch('count');

export const useStats = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
  });

  return {
    stats: data,
    isLoading: isPending,
    error,
  };
};

export const useCount = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ['count'],
    queryFn: getCount,
  });

  return { count: data, isLoading: isPending, error };
};
