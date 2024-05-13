import { axiosFetch } from '.';

export const getAllInterns = async () => await axiosFetch('interns');

export const getIntern = async (id) => (!id ? null : await axiosFetch(`interns/${id}`));

export const addIntern = async (data) => await axiosFetch('profiles', 'POST', { ...data, role: 'intern' });

export const updateIntern = async (id, data) => await axiosFetch(`profiles/${id}`, 'PUT', { ...data, role: 'intern' });

export const deleteIntern = async (id) => await axiosFetch(`profiles/${id}`, 'DELETE');

export const deleteInterns = async (ids) => await axiosFetch(`multiple/interns/delete`, 'POST', { ids });

export const getAcceptedUsers = async () => await axiosFetch('users/accepted');

export const acceptUsers = async (ids) => await axiosFetch('multiple/users/accept', 'POST', { ids });

export const generateAttestation = async (id) => await axiosFetch(`generate/attestation/${id}`, 'POST');

export const generateAttestations = async (ids) => await axiosFetch('multiple/attestations/generate', 'POST', { ids });
