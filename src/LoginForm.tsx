import { useState } from 'react';
import { Link, useNavigate, NavigateFunction } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';
import './styles/LoginRegisterForm.css';

const LoginForm = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const navigate: NavigateFunction = useNavigate();

	const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!username || !password) {
			setErrorMessage('Invalid Input');
			return;
		}

		try {
			const response: AxiosResponse = await axios.post('/api/user/login', {username, password});
			if (response.data.error) {
				return;
			}
			navigate('/', { replace: true });
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError: AxiosError = error;
				setErrorMessage('Internal server error');
				console.error(axiosError.message);
			} else {
				console.error(error);
			}
		}
	}
	return (
		<div className="login-register">
			<h1> Login </h1>
			<form onSubmit={loginUser}>
				<input className="textbox" 
					type="text" 
					placeholder="Username" 
					onChange={(event) => setUsername(event.target.value)}
					/>
				<input className="textbox" 
					type="password" 
					placeholder="Password" 
					onChange={(event) => setPassword(event.target.value)}
					/>
				<input className="form-submit" 
					type="submit" 
					value="Submit" />
			</form>
			<hr />
			<p>No account? <Link to='/register'>Register now!</Link></p>
			{ errorMessage && <p className="error-text">{errorMessage}</p> }	
		</div>
	);
}

export default LoginForm;
