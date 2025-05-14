import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
			<div className="space-y-6 max-w-lg">
				<div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">404</div>

				<h1 className="text-3xl font-bold text-gray-800">Page non trouvée</h1>

				<p className="text-gray-600 text-lg">La page que vous recherchez semble avoir disparu dans le cyberespace...</p>

				<div className="h-0.5 w-16 bg-gray-200 mx-auto"></div>

				<p className="text-gray-500">La page demandée n'existe pas ou a été déplacée. Vérifiez l'URL ou retournez à la page d'accueil.</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
					<Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
						Retour à l'accueil
					</Link>

					<Link to="/protected" className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-lg transition duration-300">
						Espace membre
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
