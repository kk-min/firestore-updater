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
import Authenticator from './components/Authenticator';

export default function App() {
	const [refPath, setRefPath] = useState('TestCollection');
	const [cRef, setCRef] = useState<CollectionReference<DocumentData>>();

	useEffect(() => {
		setCRef((prev) => collection(db, refPath));
	}, [refPath]);

	return (
		<div className='appContainer'>
			<div className='configContainer'>
				<PathDisplay path={refPath} setPath={setRefPath} />
				<Authenticator />
			</div>
			<ItemDisplay cRef={cRef} />
			<UpdateBar cRef={cRef} />
		</div>
	);
}
