import axiosInstance from "@/lib/axiosInstance";

export const fetchAllProjects = async () => {
  const response = await axiosInstance.get("/projects");
  return response.data;
};

export const getProjectById = async (id: string) => {
  const response = await axiosInstance.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (projectData: any) => {
  const response = await axiosInstance.post("/projects", projectData);
  return response.data;
};

export const updateProject = async (id: string, projectData: any) => {
  const response = await axiosInstance.put(`/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id: string) => {
  const response = await axiosInstance.delete(`/projects/${id}`);
  return response.data;
};