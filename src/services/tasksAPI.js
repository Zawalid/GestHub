import { axiosFetch } from '.';

export const addTask = async (data) => await axiosFetch('tasks', 'POST', data);

export const updateTask = async (id, data) => await axiosFetch(`tasks/${id}`, 'PUT', data);

export const deleteTask = async (id) => await axiosFetch(`tasks/${id}`, 'DELETE');
