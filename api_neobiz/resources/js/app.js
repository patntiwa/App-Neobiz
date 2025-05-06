import './bootstrap';
import axios from 'axios';

// Configuration globale d'Axios
axios.defaults.baseURL = 'http://localhost:8000/api'; // Remplacez par votre URL de base
axios.defaults.withCredentials = true; // Pour inclure les cookies dans les requêtes
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Gestionnaire d'erreurs global
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = '/login';
            } else if (error.response.status === 403) {
                alert('Accès refusé. Veuillez vérifier vos permissions.');
            }
        }
        return Promise.reject(error);
    }
);
