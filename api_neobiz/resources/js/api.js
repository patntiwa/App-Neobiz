import axios from 'axios';

// Authentification
export const login = (credentials) => axios.post('/auth/login', credentials);
export const register = (data) => axios.post('/auth/register', data);
export const logout = () => axios.post('/auth/logout');
export const verifyTwoFactor = (data) => axios.post('/auth/2fa/verify', data);
export const resetPassword = (data) => axios.post('/auth/password/reset', data);
export const requestPasswordReset = (email) => axios.post('/auth/password/email', { email });

// Dashboard
export const fetchDashboardData = () => axios.get('/dashboard');

// Clients
export const fetchClients = () => axios.get('/clients');
export const createClient = (data) => axios.post('/clients', data);
export const updateClient = (id, data) => axios.put(`/clients/${id}`, data);
export const deleteClient = (id) => axios.delete(`/clients/${id}`);

// Projets
export const fetchProjects = () => axios.get('/projects');
export const createProject = (data) => axios.post('/projects', data);
export const updateProject = (id, data) => axios.put(`/projects/${id}`, data);
export const deleteProject = (id) => axios.delete(`/projects/${id}`);

// Paiements
export const fetchPayments = () => axios.get('/payments');
export const createPayment = (data) => axios.post('/payments', data);
