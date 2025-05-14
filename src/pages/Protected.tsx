import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api.service';

const Protected = () => {
	const { user } = useAuth();
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await api.get('/auth/profile');
				setUserData(response.data);
				setLoading(false);
			} catch (err) {
				console.error('Error fetching user data:', err);
				setError('Erreur lors du chargement des données utilisateur');
				setLoading(false);
			}
		};

		fetchUserData();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="max-w-3xl mx-auto">
				<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
					<p className="font-bold">Erreur</p>
					<p>{error}</p>
				</div>
			</div>
		);
	}

	// Utiliser les données du context ou les données récupérées de l'API
	const displayUser = userData || user;

	return (
		<div className="max-w-4xl mx-auto">
			<div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-xl p-8 mb-8 text-white">
				<h1 className="text-3xl font-bold mb-2">Espace Membre</h1>
				<p className="text-xl">
					Bienvenue dans votre espace sécurisé, {displayUser?.firstName} {displayUser?.lastName}!
				</p>
			</div>

			<div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
				<div className="p-6">
					<h2 className="text-2xl font-bold mb-4 text-gray-800">Profil Utilisateur</h2>

					<div className="flex flex-col md:flex-row items-start md:items-center mb-6">
						<div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full h-20 w-20 flex items-center justify-center text-white text-2xl font-bold mb-4 md:mb-0 md:mr-6">
							{displayUser?.firstName?.[0]}
							{displayUser?.lastName?.[0]}
						</div>
						<div>
							<h3 className="text-xl font-semibold text-gray-800">
								{displayUser?.firstName} {displayUser?.lastName}
							</h3>
							<p className="text-gray-600">{displayUser?.email}</p>
							<div className="mt-2">
								{displayUser?.roles?.map((role) => (
									<span key={role} className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mr-2 mb-2 ${role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
										{role}
									</span>
								))}
							</div>
						</div>
					</div>

					<div className="border-t border-gray-200 pt-6">
						<h3 className="text-lg font-semibold mb-4 text-gray-800">Informations détaillées</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="bg-gray-50 p-4 rounded">
								<p className="text-sm text-gray-500">ID utilisateur</p>
								<p className="font-mono text-gray-800 break-all">{displayUser?.id}</p>
							</div>
							<div className="bg-gray-50 p-4 rounded">
								<p className="text-sm text-gray-500">Email</p>
								<p className="text-gray-800">{displayUser?.email}</p>
							</div>
							<div className="bg-gray-50 p-4 rounded">
								<p className="text-sm text-gray-500">Prénom</p>
								<p className="text-gray-800">{displayUser?.firstName}</p>
							</div>
							<div className="bg-gray-50 p-4 rounded">
								<p className="text-sm text-gray-500">Nom</p>
								<p className="text-gray-800">{displayUser?.lastName}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
				<div className="p-6">
					<h2 className="text-2xl font-bold mb-4 text-gray-800">Information sur votre session</h2>
					<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
						<div className="flex">
							<div className="flex-shrink-0">
								<svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
								</svg>
							</div>
							<div className="ml-3">
								<p className="text-sm text-yellow-700">Votre session est active. Le token d'accès sera automatiquement renouvelé en arrière-plan lorsqu'il approchera de son expiration.</p>
							</div>
						</div>
					</div>

					<div className="mt-6">
						<p className="text-gray-600 mb-4">Cette page est protégée et n'est accessible qu'aux utilisateurs authentifiés. Les requêtes API utilisent votre token d'authentification pour accéder aux ressources protégées.</p>
						<p className="text-gray-600">Pour vous déconnecter, cliquez sur le bouton "Logout" dans la barre de navigation.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Protected;
