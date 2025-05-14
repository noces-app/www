import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Callback = () => {
	const [error, setError] = useState(null);
	const { handleCallback } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const processCallback = async () => {
			try {
				// Process the callback
				await handleCallback();

				// Redirect to the protected page or a specified redirect page
				const searchParams = new URLSearchParams(location.search);
				const redirectUri = searchParams.get('redirect_uri') || '/protected';
				navigate(redirectUri, { replace: true });
			} catch (err) {
				console.error('Error processing callback:', err);
				setError(err.message || 'Authentication failed');
			}
		};

		processCallback();
	}, [handleCallback, navigate, location]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
			<div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
				<h1 className="text-2xl font-bold text-center mb-4">Processing Login</h1>

				{error ? (
					<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
						<p className="font-bold">Error</p>
						<p>{error}</p>
						<div className="mt-4 flex justify-center">
							<button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
								Try Again
							</button>
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
						<p className="text-gray-600">Please wait while we complete your authentication...</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Callback;
