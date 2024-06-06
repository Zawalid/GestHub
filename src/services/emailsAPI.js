import { axiosFetch } from '.';

export const getAllEmails = async () => await axiosFetch('emails');

export const getEmail = async (id) => (!id ? null : await axiosFetch(`emails/${id}`));

export const contact = async (data) => await axiosFetch('emails', 'POST', data);

export const deleteEmail = async (id) => await axiosFetch(`emails/${id}`, 'DELETE');

export const deleteEmails = async (ids) => await axiosFetch(`multiple/emails/delete`, 'POST', { ids });
