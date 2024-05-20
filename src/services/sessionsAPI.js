import { axiosFetch } from '.';

export const getAllSessions = async () => await axiosFetch('sessions');

export const getSession = async (id) => (!id ? null : await axiosFetch(`sessions/${id}`));

export const deleteSession = async (id) => await axiosFetch(`sessions/${id}`, 'DELETE');

export const deleteSessions = async (ids) => await axiosFetch(`multiple/sessions/delete`, 'POST', { ids });
