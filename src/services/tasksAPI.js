import { removePropsFromObject } from '@/utils/helpers';
import { axiosFetch } from '.';

const getNewData = (data) => {
  const newData = {
    ...removePropsFromObject(data, 'assignee'),
    intern_id: data.assignee === 'None' ? null : data.assignee?.id,
  };
  return newData;
};

export const getAllTasks = async () => await axiosFetch('tasks');

export const getTask = async (id) => (!id ? null : await axiosFetch(`tasks/${id}`));

export const addTask = async (data) => await axiosFetch('tasks', 'POST', getNewData(data));

export const updateTask = async (id, data) => await axiosFetch(`tasks/${id}`, 'PUT', getNewData(data));

export const deleteTask = async (id) => await axiosFetch(`tasks/${id}`, 'DELETE');
