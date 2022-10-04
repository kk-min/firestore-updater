import React, { useState } from 'react';
import './css/App.css';
import ChatBar from './components/ChatBar';
import ChatWindow from './components/ChatWindow';
//import PathDisplay from './components/PathDisplay';

function App() {
	const [refPath, setRefPath] = useState(
		'Users/Y0wdXpIeSTR9mBN6b5v22WUkF4o2/ConsultHistory//ChatHistory'
	);
	return (
		<div className='appContainer'>
			<ChatWindow />
			<ChatBar />
		</div>
	);
}

export default App;
