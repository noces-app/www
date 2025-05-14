import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			{/* En-tête avec barre de navigation */}
			<Navbar />

			{/* Contenu principal */}
			<main className="flex-grow py-8">
				<div className="container mx-auto px-4">
					<Outlet />
				</div>
			</main>

			{/* Pied de page */}
			<footer className="bg-gray-800 text-white py-8">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div>
							<h3 className="text-lg font-semibold mb-4">Noces App</h3>
							<p className="text-gray-300">Une application moderne avec authentification sécurisée via OpenID Connect.</p>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
							<ul className="space-y-2">
								<li>
									<a href="/" className="text-gray-300 hover:text-white transition">
										Accueil
									</a>
								</li>
								<li>
									<a href="/protected" className="text-gray-300 hover:text-white transition">
										Espace membre
									</a>
								</li>
								<li>
									<a href="http://localhost:8080" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
										Keycloak Admin
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-4">Technologies</h3>
							<ul className="space-y-2">
								<li className="text-gray-300">React + Vite</li>
								<li className="text-gray-300">NestJS</li>
								<li className="text-gray-300">MongoDB</li>
								<li className="text-gray-300">Keycloak</li>
								<li className="text-gray-300">OpenID Connect</li>
							</ul>
						</div>
					</div>

					<div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
						<p>&copy; {new Date().getFullYear()} Noces App. Tous droits réservés.</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Layout;
