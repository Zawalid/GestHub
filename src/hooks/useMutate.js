import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRef } from 'react';

export function useMutate({ queryKey, mutationFn, loadingMessage, successMessage, errorMessage }) {
  const queryClient = useQueryClient();
  const toastId = useRef(null);

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: queryKey,
    mutationFn,
    onMutate: () => {
      if (loadingMessage)
        toastId.current = toast.loading(loadingMessage, {
          id: toastId.current,
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      successMessage && toast.success(successMessage, { id: toastId.current });
    },
    onError: (error) => {
      console.log(error);
      errorMessage && toast.error(errorMessage, { id: toastId.current });
    },
  });

  return { mutate, isPending, error, isSuccess };
}
