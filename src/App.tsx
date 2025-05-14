import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Callback from './pages/Callback';
import Layout from './components/Layout';
import Home from './pages/home';
import Protected from './pages/Protected';
import NotFound from './pages/NotFound';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="auth/callback" element={<Callback />} />
				<Route
					path="protected"
					element={
						<ProtectedRoute>
							<Protected />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
