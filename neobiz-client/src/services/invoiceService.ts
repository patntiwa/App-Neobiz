import axiosInstance from "@/lib/axiosInstance";

export const fetchInvoices = async () => {
  try {
    const response = await axiosInstance.get("/invoices");
    return response.data;
  } catch (error) {
    console.error("Fetch invoices error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchInvoiceById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Fetch invoice by ID (${id}) error:`, error.response?.data || error.message);
    throw error;
  }
};

export const createInvoice = async (invoiceData: any) => {
  try {
    const response = await axiosInstance.post("/invoices", invoiceData);
    return response.data;
  } catch (error) {
    console.error("Create invoice error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateInvoice = async (id: string, invoiceData: any) => {
  try {
    const response = await axiosInstance.put(`/invoices/${id}`, invoiceData);
    return response.data;
  } catch (error) {
    console.error(`Update invoice (${id}) error:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteInvoice = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Delete invoice (${id}) error:`, error.response?.data || error.message);
    throw error;
  }
};

export const fetchInvoiceStats = async () => {
  try {
    const response = await axiosInstance.get("/invoices/stats");
    return response.data;
  } catch (error) {
    console.error("Fetch invoice stats error:", error.response?.data || error.message);
    throw error;
  }
};