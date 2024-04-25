import { axiosFetch } from '.';

export const getAllTasks = async () => await axiosFetch('tasks');

export const getTask = async (id) => (!id ? null : await axiosFetch(`tasks/${id}`));

export const addTask = async (data) => await axiosFetch('tasks', 'POST', data);

export const updateTask = async (id, data) => await axiosFetch(`tasks/${id}`, 'PUT', data);

export const deleteTask = async (id) => await axiosFetch(`tasks/${id}`, 'DELETE');
