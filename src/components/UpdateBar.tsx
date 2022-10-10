import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import UpdateItem from './UpdateItem';

export interface PropTypes {
	cRef: any;
}

const createDocument = async (cRef: any, data: any) => {
	/* create new chat history document to store chat msg */
	/* 1 msg per document */
	await addDoc(cRef, data);
};

export default function UpdateBar(props: PropTypes) {
	const [data, setData] = useState<any[]>([]);
	const [idList, setIDList] = useState<number[]>([]);

	const sendHandler = () => {
		const dataObj: any = {};
		console.log(data);
		data.forEach((item) => {
			dataObj[item.label] = item.value;
		});
		createDocument(props.cRef, dataObj);
		console.log('Sent!');
	};

	const addHandler = () => {
		setIDList([...idList, idList.length]);
		let temp_array: any[] = data;
		temp_array.push({ id: data.length, label: '', value: '' });
		setData((prev: any[]) => temp_array);
	};

	const updateData = (newData: any) => {
		const id = newData.id;
		let temp_array: any[] = data.map((item) => {
			return newData.id == item.id ? newData : item;
		});
		setData((prev: any[]) => temp_array);
		console.log('parent data:');
		console.log(data);
	};
	return (
		<div className='chatBarContainer'>
			<button onClick={addHandler}>(+)</button>
			{idList.map((id) => {
				return <UpdateItem updateData={updateData} id={id} />;
			})}
			<button onClick={sendHandler}>Send</button>
		</div>
	);
}
