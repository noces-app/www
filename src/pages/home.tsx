import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
	const { isAuthenticated } = useAuth();

	return (
		<div className="max-w-4xl mx-auto">
			<div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-xl p-8 mb-8 text-white">
				<h1 className="text-4xl font-bold mb-4">Bienvenue sur Noces App</h1>
				<p className="text-xl mb-6">Une application moderne avec authentification sécurisée via OpenID Connect</p>
				{!isAuthenticated && (
					<Link to="/login" className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
						Se connecter
					</Link>
				)}
				{isAuthenticated && (
					<Link to="/protected" className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
						Accéder à l'espace membre
					</Link>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-2xl font-bold mb-4 text-gray-800">Authentification OIDC</h2>
					<p className="text-gray-600 mb-4">Cette application utilise OpenID Connect (OIDC) avec Keycloak pour une authentification sécurisée et moderne.</p>
					<ul className="list-disc list-inside text-gray-600 space-y-2">
						<li>Authentification Single Sign-On (SSO)</li>
						<li>Renouvellement automatique des tokens</li>
						<li>Gestion sécurisée des sessions</li>
						<li>Rôles et permissions configurable</li>
					</ul>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-2xl font-bold mb-4 text-gray-800">Stack Technique</h2>
					<p className="text-gray-600 mb-4">Un stack moderne pour une application performante et sécurisée.</p>
					<ul className="list-disc list-inside text-gray-600 space-y-2">
						<li>Frontend: React, Vite, Tailwind CSS</li>
						<li>Backend: NestJS, MongoDB</li>
						<li>Authentification: Keycloak, OIDC</li>
						<li>Docker pour un déploiement facile</li>
					</ul>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow-md p-6 mt-8">
				<h2 className="text-2xl font-bold mb-4 text-gray-800">Pour commencer</h2>
				<p className="text-gray-600 mb-4">Pour explorer les fonctionnalités de cette application, vous pouvez vous connecter avec les identifiants suivants:</p>
				<div className="bg-gray-100 p-4 rounded-md mb-4">
					<p className="font-mono">
						<strong>Utilisateur:</strong> user@example.com
					</p>
					<p className="font-mono">
						<strong>Mot de passe:</strong> password123
					</p>
				</div>
				<p className="text-gray-600 mb-4">Ou avec un compte administrateur:</p>
				<div className="bg-gray-100 p-4 rounded-md">
					<p className="font-mono">
						<strong>Utilisateur:</strong> admin@example.com
					</p>
					<p className="font-mono">
						<strong>Mot de passe:</strong> password123
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
