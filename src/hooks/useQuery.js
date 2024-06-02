import { useQuery as UQ, useQueryClient } from '@tanstack/react-query';

export const useQuery = (options) => {
  const { data, error, isPending } = UQ({
    queryKey: [GET_CARS, options],
    queryFn: () => getCars(options),
  });

  const { results, total_results, data: { cars } = {} } = data || {};

  // Prefetch the next and previous pages
  const queryClient = useQueryClient();
  const pageCount = Math.ceil(total_results / CARS_PER_PAGE);

  if (options.page < pageCount) {
    const newOptions = { ...options, page: options.page + 1 };
    queryClient.prefetchQuery({
      queryKey: [GET_CARS, newOptions],
      queryFn: () => getCars(newOptions),
    });
  }
  if (options.page > 1) {
    const newOptions = { ...options, page: options.page - 1 };
    queryClient.prefetchQuery({
      queryKey: [GET_CARS, newOptions],
      queryFn: () => getCars(newOptions),
    });
  }

  return { cars, results, total_results, error, isLoading: isPending };
};
