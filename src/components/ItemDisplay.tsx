import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
	onSnapshot,
	getDocs,
	query,
	collection,
	orderBy,
	limit,
	CollectionReference,
	DocumentData,
	QueryDocumentSnapshot,
} from 'firebase/firestore';
import DocumentItem from './DocumentItem';
import { db } from '../firebase';
import '../css/App.css';
import { Type } from 'typescript';

export interface PropTypes {
	refPath: string;
}

export default function ItemDisplay(props: PropTypes) {
	const [virtualList, setVirtualList] = useState<any[]>([]);
	useEffect(() => {
		const callFirebase = async () => {
			const q = query(collection(db, props.refPath));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				console.log('Received message list change!');
				const chat_history: any[] = [];
				querySnapshot.forEach((chat_doc: any) => {
					const documentData = chat_doc.data();
					chat_history.push(documentData);
				});
				console.log('chat_history:');
				console.log(chat_history);
				setVirtualList((prev) => chat_history.map((item) => item));
			});
		};
		callFirebase();
	}, [props.refPath]);

	useEffect(() => {
		console.log(virtualList);
	}, [virtualList]);

	return (
		<div className='chatWindowContainer'>
			{virtualList.map((item) => (
				<DocumentItem data={item} />
			))}
		</div>
	);
}
