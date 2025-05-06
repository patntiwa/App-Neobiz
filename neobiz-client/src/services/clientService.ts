import axiosInstance from "@/lib/axiosInstance";

export const fetchAllClients = async () => {
  const response = await axiosInstance.get("/clients");
  return response.data;
};

export const getClientById = async (id: string) => {
  const response = await axiosInstance.get(`/clients/${id}`);
  return response.data;
};

export const createClient = async (clientData: any) => {
  const response = await axiosInstance.post("/clients", clientData);
  return response.data;
};

export const updateClient = async (id: string, clientData: any) => {
  const response = await axiosInstance.put(`/clients/${id}`, clientData);
  return response.data;
};

export const deleteClient = async (id: string) => {
  const response = await axiosInstance.delete(`/clients/${id}`);
  return response.data;
};