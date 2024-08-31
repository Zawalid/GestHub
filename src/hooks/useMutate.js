import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRef } from 'react';

export function useMutate({
  queryKey,
  mutationFn,
  showToast = true,
  loadingMessage,
  successMessage,
  errorMessage,
  onSuccess,
}) {
  const queryClient = useQueryClient();
  const toastId = useRef(null);

  const { mutate, isPending, error, isSuccess, reset, } = useMutation({
    mutationKey: queryKey,
    mutationFn,
    onMutate: async () => {
      if (loadingMessage && showToast)
        toastId.current = toast.loading(loadingMessage, {
          id: toastId.current,
        });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey[0]],
      });
      onSuccess?.(data,queryClient);
      successMessage && showToast && toast.success(successMessage, { id: toastId.current });
    },
    onError: (error) => {
      console.log(error.message);
      showToast && toast.error(errorMessage || error.message, { id: toastId.current });
    },
  });

  return { mutate, isPending, error, isSuccess, reset };
}
