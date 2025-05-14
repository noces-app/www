import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
	const { isAuthenticated, user, logout } = useAuth();

	const handleLogout = async () => {
		await logout();
		// La redirection sera gérée par le service OIDC
	};

	return (
		<nav className="bg-gray-800 text-white">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
						<Link to="/" className="flex-shrink-0 text-white text-xl font-bold">
							Noces App
						</Link>
						<div className="ml-10 flex items-baseline space-x-4">
							<Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
								Home
							</Link>
							<Link to="/protected" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
								Protected
							</Link>
						</div>
					</div>
					<div className="flex items-center">
						{isAuthenticated ? (
							<div className="flex items-center space-x-4">
								<span className="text-sm">
									{user?.firstName} {user?.lastName}
								</span>
								<button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700">
									Logout
								</button>
							</div>
						) : (
							<Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700">
								Login
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
