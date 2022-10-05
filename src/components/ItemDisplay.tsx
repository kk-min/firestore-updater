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
	cRef: any;
}

export default function ItemDisplay(props: PropTypes) {
	const [virtualList, setVirtualList] = useState<any[]>([]);
	const virtuoso = useRef(null);

	useEffect(() => {
		const callFirebase = async () => {
			const q = query(props.cRef, orderBy('timestamp'));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				console.log('Received message list change!');
				const chat_history: any[] = [];
				querySnapshot.forEach((chat_doc) => {
					const documentData = chat_doc.data();
					console.log(chat_doc);
					chat_history.push(documentData);
				});
				setVirtualList((prev) => chat_history.map((item) => item));
			});
		};
		callFirebase();
	}, [props.cRef]);

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
