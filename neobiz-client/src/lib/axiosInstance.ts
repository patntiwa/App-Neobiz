import axios from 'axios';

// Configurer Axios pour envoyer les cookies (nécessaire pour Sanctum)
axios.defaults.withCredentials = true;

// Définir l'URL de base pour toutes les requêtes de cette instance
axios.defaults.baseURL = 'http://localhost:8000/api';

export default axios;