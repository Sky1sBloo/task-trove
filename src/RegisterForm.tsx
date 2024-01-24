import { useState } from 'react';
import { Link, useNavigate, NavigateFunction } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';
import './styles/LoginRegisterForm.css';

const RegisterForm = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
	const [showUserExistsMessage, setShowUserExistsMessage] = useState<boolean>(false);

	const navigate: NavigateFunction = useNavigate();

	const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!username || !password || !email) {
			setShowErrorMessage(true);
			return;
		}

		setShowUserExistsMessage(false);
		try {
			const response: AxiosResponse = await axios.post('/api/user/register', {username, password, email});
			if (response.data.error) {
				return;
			}	
			navigate('/', { replace: true });
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError: AxiosError = error;
				if (axiosError.response !== undefined && axiosError.response.status === 409) {
					setShowUserExistsMessage(true);
				}
				console.error(axiosError.message);
			} else {
				console.error(error);
			}
		}
	}
	return (
		<div className="login-register">
			<h1> Register </h1>
			<form onSubmit={registerUser}>
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
				<input className="textbox" 
					type="email" 
					placeholder="Email" 
					onChange={(event) => setEmail(event.target.value)}
					/>
				<input className="form-submit" 
					type="submit" 
					value="Submit" />
			</form>
			<hr />
			<p>Have an account? <Link to='/login'>Back to login!</Link></p>
			{ showErrorMessage && <p className="error-text">Invalid Input</p> }	
			{ showUserExistsMessage&& <p className="error-text">Username already exists</p> }	
		</div>
	);
}

export default RegisterForm;
