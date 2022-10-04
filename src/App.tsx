import React, { useState } from 'react';
import './css/App.css';
import ChatBar from './components/ChatBar';
import ChatWindow from './components/ChatWindow';
import PathDisplay from './components/PathDisplay';

export default function App() {
	const [refPath, setRefPath] = useState(
		'Users/Y0wdXpIeSTR9mBN6b5v22WUkF4o2/ConsultHistory/'
	);

	return (
		<div className='appContainer'>
			<PathDisplay path={refPath} setPath={setRefPath} />
			<ChatWindow path={refPath} />
			<ChatBar />
		</div>
	);
}
