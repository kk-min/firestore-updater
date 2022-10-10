import React, { useEffect, useState } from 'react';
import '../css/App.css';

export interface PropTypes {
	updateData: any;
	id: any;
}

export default function UpdateItem(props: PropTypes) {
	const [id, setID] = useState(props.id);
	const [label, setLabel] = useState('');
	const [value, setValue] = useState('');

	useEffect(() => {
		props.updateData({ id: id, label: label, value: value });
		console.log('UpdateItem: ', id, label, value);
	}, [label, value]);

	const onChangeHandler = (e: any, flag: number) => {
		if (flag == 0) {
			// Change label
			setLabel((prev) => e.target.value);
		} else if (flag == 1) {
			// Change value
			setValue((prev) => e.target.value);
		}
	};

	return (
		<div className='updateItemContainer'>
			<input
				type='text'
				placeholder='Label'
				onChange={(e) => onChangeHandler(e, 0)}
			/>
			<input
				type='text'
				placeholder='Value'
				onChange={(e) => onChangeHandler(e, 1)}
			/>
		</div>
	);
}
