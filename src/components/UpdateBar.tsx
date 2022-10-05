import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import UpdateItem from './UpdateItem';

export interface PropTypes {
	docRef: any;
}

const createDocument = async (cRef: any, data: any) => {
	/* create new chat history document to store chat msg */
	/* 1 msg per document */
	await addDoc(cRef, data);
};

export default function UpdateBar(props: PropTypes) {
	const [data, setData] = useState<any[]>([]);
	const [labelList, setLabelList] = useState<string[]>([]);

	const sendHandler = () => {
		createDocument(props.docRef, data);
		console.log('Sent!');
	};

	const addHandler = () => {
		setLabelList([...labelList, '']);
		let temp_array: any[] = data;
		temp_array.push({ id: data.length, label: '', value: '' }),
			setData((prev: any[]) => temp_array);
	};

	const updateData = (newData: any) => {
		const id = newData.id;
		let temp_array: any[] = data;
		temp_array.forEach((item) => {
			if (item.id === id) {
				item.label = newData.label;
				item.value = newData.value;
			}
		});
	};
	return (
		<div className='chatBarContainer'>
			<button onClick={addHandler}>(+)</button>
			{labelList.map((label) => {
				return <UpdateItem updateData={updateData} id={label} />;
			})}
			<button onClick={sendHandler}>Send</button>
		</div>
	);
}
