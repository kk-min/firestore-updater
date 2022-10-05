import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
	onSnapshot,
	getDocs,
	query,
	collection,
	orderBy,
	limit,
	DocumentReference,
} from 'firebase/firestore';
import DocumentItem from './DocumentItem';
import { db } from '../firebase';
import '../css/App.css';

export interface PropTypes {
	docRef: any;
}

export interface VirtualListItem {
	name: string;
	message: string;
}

export default function ItemDisplay(props: PropTypes) {
	const [virtualList, setVirtualList] = useState<VirtualListItem[]>([]);
	const virtuoso = useRef(null);

	useEffect(() => {
		const callFirebase = async () => {
			const q = query(
				collection(props.docRef, 'ChatHistory'),
				orderBy('timestamp')
			);
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				console.log('Received message list change!');
				const chat_history: VirtualListItem[] = [];
				querySnapshot.forEach((chat_doc) => {
					chat_history.push({
						name: chat_doc.data().from,
						message: chat_doc.data().msg,
					});
				});
				setVirtualList(chat_history.map((item) => item));
			});
		};
		callFirebase();
	}, [props.docRef]);

	return (
		<div className='chatWindowContainer'>
			{virtualList.map((item) => (
				<DocumentItem
					userName={item.name}
					type={item.name === 'Doctor' ? 'sent' : 'received'}
					message={item.message}
				/>
			))}
		</div>
	);
}
