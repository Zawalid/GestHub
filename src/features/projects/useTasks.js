import { useMutate } from '@/hooks/useMutate';
import { addTask, deleteTask, updateTask } from '@/services/tasksAPI';

// Mutations

const onSuccess = (task, queryClient) => queryClient.invalidateQueries({ queryKey: ['projects'] });

export const useAddTask = () =>
  useMutate({
    queryKey: ['tasks', 'add'],
    mutationFn: addTask,
    loadingMessage: 'Adding task...',
    successMessage: 'Task added successfully',
    errorMessage: 'Failed to add task',
    onSuccess,
  });

export const useUpdateTask = () =>
  useMutate({
    queryKey: ['tasks', 'update'],
    mutationFn: ({ id, data }) => updateTask(id, data),
    loadingMessage: 'Updating task...',
    successMessage: 'Task updated successfully',
    errorMessage: 'Failed to update task',
    onSuccess,
  });

export const useDeleteTask = () =>
  useMutate({
    queryKey: ['tasks', 'delete'],
    mutationFn: deleteTask,
    loadingMessage: 'Deleting task...',
    successMessage: 'Task deleted successfully',
    errorMessage: 'Failed to delete task',
    onSuccess,
  });
