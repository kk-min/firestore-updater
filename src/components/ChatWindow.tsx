import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
	onSnapshot,
	getDocs,
	query,
	collection,
	orderBy,
	limit,
} from 'firebase/firestore';
import ChatBubble from './ChatBubble';
import { db } from '../firebase';
import '../css/App.css';

export interface PropTypes {
	path: string;
}

export interface VirtualListItem {
	name: string;
	message: string;
}

export default function ChatWindow(props: PropTypes) {
	const [virtualList, setVirtualList] = useState<VirtualListItem[]>([]);
	const virtuoso = useRef(null);

	useEffect(() => {
		const consultHistoryRef = collection(db, props.path);
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
				const q = query(
					collection(latestDocRef, 'ChatHistory'),
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
			});
		};
		callFirebase();
	}, [props.path]);

	return (
		<div className='chatWindowContainer'>
			{virtualList.map((item) => (
				<ChatBubble
					userName={item.name}
					type={item.name === 'Doctor' ? 'sent' : 'received'}
					message={item.message}
				/>
			))}
		</div>
	);
}
