import axios from 'axios';
import { axiosFetch } from '.';

export const getAllEmails = async () => await axiosFetch('emails');

export const getEmail = async (id) => (!id ? null : await axiosFetch(`emails/${id}`));

export const contact = async (data) => {
  const ip = await axios.get('https://api64.ipify.org');
  console.log(ip)
  return await axiosFetch('emails', 'POST', data, { 'Accept-For': ip.data });
};

export const deleteEmail = async (id) => await axiosFetch(`emails/${id}`, 'DELETE');

export const deleteEmails = async (ids) => await axiosFetch(`multiple/emails/delete`, 'POST', { ids });

export const replyToEmail = async (data) => await axiosFetch('emails/reply', 'POST', data);
