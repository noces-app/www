import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const performLogout = async () => {
			try {
				await logout();
				// La redirection sera gérée par le service d'authentification
			} catch (error) {
				console.error('Erreur lors de la déconnexion:', error);
				// En cas d'erreur, rediriger vers la page d'accueil
				navigate('/', { replace: true });
			}
		};

		performLogout();
	}, [logout, navigate]);

	return (
		<div className="flex justify-center items-center h-64">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
				<p className="text-gray-600">Déconnexion en cours...</p>
			</div>
		</div>
	);
};

export default Logout;
