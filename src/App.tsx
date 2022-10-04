import React, { useEffect, useState } from 'react';
import './css/App.css';
import ChatBar from './components/ChatBar';
import ChatWindow from './components/ChatWindow';
import PathDisplay from './components/PathDisplay';
import {
	onSnapshot,
	getDocs,
	query,
	collection,
	orderBy,
	limit,
	DocumentReference,
} from 'firebase/firestore';
import { db } from './firebase';

export default function App() {
	const [refPath, setRefPath] = useState(
		'Users/Y0wdXpIeSTR9mBN6b5v22WUkF4o2/ConsultHistory/'
	);
	const [docRef, setDocRef] = useState<DocumentReference>();

	useEffect(() => {
		const consultHistoryRef = collection(db, refPath);
		const latestDocQ = query(
			consultHistoryRef,
			orderBy('timestamp'),
			limit(1)
		);

		const callFirebase = async () => {
			const latestDocSnapshot = await getDocs(latestDocQ);
			latestDocSnapshot.forEach((doc) => {
				const latestDocRef = doc.ref;
				console.log(latestDocRef);
				console.log(doc.data().type);
				setDocRef((prev) => latestDocRef);
			});
		};
		callFirebase();
	}, [refPath]);

	return (
		<div className='appContainer'>
			<PathDisplay path={refPath} setPath={setRefPath} />
			<ChatWindow docRef={docRef} />
			<ChatBar docRef={docRef} />
		</div>
	);
}
