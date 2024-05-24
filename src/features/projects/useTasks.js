import { useMutate } from '@/hooks/useMutate';
import { addTask, deleteTask, getAllTasks, getTask, updateTask } from '@/services/tasksAPI';
import { useQuery } from '@tanstack/react-query';

// Queries
export function useTasks() {
  const { data, error, isPending } = useQuery({
    queryKey: ['tasks'],
    queryFn: getAllTasks,
  });

  return { tasks: data, error, isLoading: isPending };
}

export function useTask(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTask(id),
    enabled: !!id,
  });

  return { task: data, error, isLoading: isPending };
}

// Mutations

const onSuccess = (task, queryClient) =>
  queryClient.invalidateQueries({ queryKey: ['projects'] });

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
