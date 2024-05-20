import { axiosFetch } from '.';

export const getAllSessions = async () => await axiosFetch('sessions');

export const getSession = async (id) => (!id ? null : await axiosFetch(`sessions/${id}`));

export const deleteSession = async (id) => await axiosFetch(`multiple/sessions/delete`, 'POST', { ids: [id] });

export const deleteSessions = async (ids) => await axiosFetch(`multiple/sessions/delete`, 'POST', { ids });

export const abortSession = async (id) => await axiosFetch(`sessions/${id}/abort`, 'POST');

export const abortSessions = async (ids) => await axiosFetch(`multiple/sessions/abort`, 'POST', { ids });
