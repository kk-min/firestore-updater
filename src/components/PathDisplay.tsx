import React, { useState } from 'react';
import '../css/App.css';

export interface propTypes {
	path: string;
	setPath: React.Dispatch<React.SetStateAction<string>>;
}

export default function PathDisplay(props: propTypes) {
	const [showPathChange, setShowPathChange] = useState(false);
	const [inputPath, setinputPath] = useState('');

	const changeHandler = () => {
		setShowPathChange((prev) => !prev);
	};

	const confirmHandler = () => {
		props.setPath(inputPath);
		setShowPathChange((prev) => !prev);
	};

	return (
		<div className='pathContainer'>
			<p className='pathDisplay'>Collection Path: {props.path}</p>
			<button className='btn' onClick={changeHandler}>
				Change Path
			</button>
			{showPathChange ? (
				<div className='pathUpdater'>
					<input
						className='pathInput'
						type='text'
						placeholder={'Enter new path'}
						onChange={(e) => setinputPath(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								confirmHandler();
							}
						}}
					/>
					<button className='btn' onClick={confirmHandler}>
						Confirm
					</button>
				</div>
			) : null}
		</div>
	);
}
