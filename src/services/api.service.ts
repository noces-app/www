import axios from 'axios';

// URL de base de l'API (sous-domaine)
const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

// Création d'une instance axios avec une configuration pour le sous-domaine
const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // Essentiel pour les cookies cross-domain
});

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		// Si on reçoit une erreur 401 (non autorisé)
		if (error.response && error.response.status === 401) {
			// Rediriger vers la page de connexion avec le chemin actuel comme URI de redirection
			const currentPath = window.location.pathname;
			window.location.href = `${API_URL}/auth/login?redirect_uri=${encodeURIComponent(currentPath)}`;
			return Promise.reject(error);
		}
		return Promise.reject(error);
	}
);

// Fonction pour récupérer le profil utilisateur
export const getProfile = async () => {
	const response = await api.get('/auth/profile');
	return response.data;
};

// Fonction pour vérifier l'état d'authentification
export const checkSession = async () => {
	const response = await api.get('/auth/session');
	return response.data;
};

// Fonction pour se connecter (redirection)
export const login = (redirectUri) => {
	window.location.href = `${API_URL}/auth/login?redirect_uri=${encodeURIComponent(redirectUri)}`;
};

// Fonction pour se déconnecter (redirection)
export const logout = () => {
	window.location.href = `${API_URL}/auth/logout`;
};

// Fonction pour rafraîchir le token
export const refreshToken = async () => {
	const response = await api.post('/auth/refresh');
	return response.data;
};

// Fonction pour récupérer les données utilisateur protégées
export const getUserData = async () => {
	const response = await api.get('/users/me');
	return response.data;
};

export default api;
