import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../css/App.css';

interface PropTypes {}

export default function Authenticator(props: PropTypes) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const authenticateHandler = () => {
		console.log('Authenticating...');
		setLoading(true);
		setTimeout(() => {
			signInWithEmailAndPassword(auth, username, password)
				.then((userCredential) => {
					console.log('Logged In Successfully');
					const user = userCredential.user;
					setLoading((prev) => false);
				})
				.catch((error) => {
					console.log('Wrong Email/Password.');
					setLoading((prev) => false);
				});
		}, 2000);
	};

	return (
		<div className='authenticator'>
			{loading ? (
				<div className='lds-ring'>
					<div />
					<div />
					<div />
					<div />
					<div />
				</div>
			) : error ? (
				<>
					<h1>Authentication failed!</h1>
					<button
						onClick={() => {
							setError((prev) => false);
						}}
					>
						Return
					</button>
				</>
			) : (
				<>
					<input
						type='text'
						placeholder='Email/Username'
						onChange={(event) => {
							setUsername((prev) => event.target.value);
						}}
					/>
					<input
						type='password'
						placeholder='Password'
						onChange={(event) => {
							setPassword((prev) => event.target.value);
						}}
					/>
					<button onClick={authenticateHandler}>Authenticate</button>
				</>
			)}
		</div>
	);
}
