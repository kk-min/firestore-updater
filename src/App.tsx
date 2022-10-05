import React, { useEffect, useState } from 'react';
import './css/App.css';
import UpdateBar from './components/UpdateBar';
import ItemDisplay from './components/ItemDisplay';
import PathDisplay from './components/PathDisplay';
import {
	onSnapshot,
	getDocs,
	query,
	collection,
	orderBy,
	limit,
	CollectionReference,
	DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';

export default function App() {
	const [refPath, setRefPath] = useState(
		'Users/Y0wdXpIeSTR9mBN6b5v22WUkF4o2/ConsultHistory/rTlk5YYUGW7Ecok9xFD0/ChatHistory'
	);
	const [cRef, setCRef] = useState<CollectionReference<DocumentData>>();

	useEffect(() => {
		setCRef((prev) => collection(db, refPath));
	}, [refPath]);

	return (
		<div className='appContainer'>
			<PathDisplay path={refPath} setPath={setRefPath} />
			<ItemDisplay cRef={cRef} />
			<UpdateBar cRef={cRef} />
		</div>
	);
}
