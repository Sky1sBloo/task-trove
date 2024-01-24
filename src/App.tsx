import Navbar from './Navbar';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import MainTaskWindow from './MainTaskWindow';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainTaskWindow />
	},
	{
		path: '/register',
		element: <RegisterForm />
	},
	{
		path: '/login',
		element: <LoginForm />
	},
	{
		path: '*',
		element: <h1>404 not found</h1>
	}
]);
/**
 * Root component of our application
 */
const App = () => {
	return (
		<>
		<Navbar />
		<div className="AppBody">
			<RouterProvider router = { router } />
		</div>
		</>
	);
}

export default App;
