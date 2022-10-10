import React, { useState } from 'react';

interface PropTypes {}

export default function Authenticator(props: PropTypes) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const authenticateHandler = () => {
		console.log('Authenticating...');
	};

	return (
		<div>
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
		</div>
	);
}
