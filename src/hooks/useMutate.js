import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRef } from 'react';

export function useMutate({ queryKey, mutationFn, showToast = true, loadingMessage, successMessage, errorMessage }) {
  const queryClient = useQueryClient();
  const toastId = useRef(null);

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: queryKey,
    mutationFn,
    onMutate: () => {
      if (loadingMessage && showToast)
        toastId.current = toast.loading(loadingMessage, {
          id: toastId.current,
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      successMessage && showToast && toast.success(successMessage, { id: toastId.current });
    },
    onError: (error) => {
      console.log(error);
      errorMessage && showToast && toast.error(errorMessage, { id: toastId.current });
    },
  });

  return { mutate, isPending, error, isSuccess };
}
