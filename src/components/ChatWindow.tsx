import React, { useRef, useState, useEffect, useCallback } from 'react';
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import { Virtuoso } from 'react-virtuoso';
import ChatBubble from './ChatBubble';
import { db } from '../firebase';

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
		const q = query(
			collection(consultHistoryRef, 'ChatHistory'),
			orderBy('timestamp')
		);

		const virtuoso = useRef(null);

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			console.log('Received message list change!');
			const chat_history: VirtualListItem[] = [];
			querySnapshot.forEach((doc) => {
				chat_history.push({
					name: doc.data().name,
					message: doc.data().message,
				});
			});
			setVirtualList(chat_history.map((item) => item));
		});
	}, [props.path]);

	return (
		<Virtuoso
			ref={virtuoso}
			style={{ minHeight: '50vh', flexGrow: 1, display: 'flex' }}
			data={virtualList}
			initialTopMostItemIndex={virtualList.length - 1}
			followOutput='smooth'
			itemContent={(index, item: VirtualListItem) => {
				return (
					<ChatBubble
						message={item['message']}
						userName={item['name']}
						type={item['name'] == 'Doctor' ? 'sent' : 'received'}
					/>
				);
			}}
		></Virtuoso>
	);
}
