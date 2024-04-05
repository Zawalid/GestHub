import { axiosFetch } from ".";

export const getAllProjects = async () => await axiosFetch("projects");

export const getProject = async (id) => await axiosFetch(`projects/${id}`);

export const addProject = async (data) =>
  await axiosFetch("projects", {
    method: "POST",
    data,
  });

export const updateProject = async (id, data) =>
  await axiosFetch(`projects/${id}`, {
    method: "PUT",
    data,
  });

export const deleteProject = async (id) =>
  await axiosFetch(`projects/${id}`, {
    method: "DELETE",
  });
