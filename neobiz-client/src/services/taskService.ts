import axiosInstance from "@/lib/axiosInstance";

export const fetchAllTasks = async () => {
  const response = await axiosInstance.get("/tasks");
  return response.data;
};

export const getTaskById = async (id: string) => {
  const response = await axiosInstance.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData: any) => {
  const response = await axiosInstance.post("/tasks", taskData);
  return response.data;
};

export const updateTask = async (id: string, taskData: any) => {
  const response = await axiosInstance.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};