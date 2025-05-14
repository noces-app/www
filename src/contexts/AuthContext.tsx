import { createContext, useState, useEffect, useContext } from 'react';
import { checkSession, login as apiLogin, logout as apiLogout } from '../services/api.service';

// Création du contexte
const AuthContext = createContext(null);

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// Vérifier l'état d'authentification au chargement
	useEffect(() => {
		const verifySession = async () => {
			try {
				setIsLoading(true);
				const response = await checkSession();

				if (response.isAuthenticated && response.user) {
					setUser(response.user);
					setIsAuthenticated(true);
				} else {
					setUser(null);
					setIsAuthenticated(false);
				}
				setError(null);
			} catch (err) {
				console.error('Error checking auth status:', err);
				setUser(null);
				setIsAuthenticated(false);
				setError('Erreur lors de la vérification de la session');
			} finally {
				setIsLoading(false);
			}
		};

		verifySession();
	}, []);

	// Planifier un rafraîchissement périodique de la session
	useEffect(() => {
		if (!isAuthenticated) return;

		const refreshInterval = setInterval(async () => {
			try {
				// Vérifier périodiquement si la session est toujours valide
				await checkSession();
			} catch (err) {
				console.error('Session check failed:', err);
				// Si la session n'est plus valide, mettre à jour l'état
				setUser(null);
				setIsAuthenticated(false);
			}
		}, 5 * 60 * 1000); // 5 minutes

		return () => clearInterval(refreshInterval);
	}, [isAuthenticated]);

	// Fonction pour se connecter - redirige vers l'API
	const login = (redirectUri = '/protected') => {
		apiLogin(redirectUri);
	};

	// Fonction pour se déconnecter - via l'API
	const logout = () => {
		apiLogout();
	};

	// Valeur à fournir au contexte
	const value = {
		user,
		isLoading,
		error,
		isAuthenticated,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
