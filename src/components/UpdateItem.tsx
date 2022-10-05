import React, { useState } from 'react';
import '../css/App.css';

export interface PropTypes {
	updateData: any;
	id: any;
}

export default function UpdateItem(props: PropTypes) {
	const [id, setID] = useState(props.id);
	const [label, setLabel] = useState('');
	const [value, setValue] = useState('');

	const onChangeHandler = (e: any, flag: number) => {
		if (flag == 0) {
		} else if (flag == 1) {
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
