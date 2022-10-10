import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export interface PropTypes {
	data: Object[];
}

export default function DocumentItem(props: PropTypes) {
	useEffect(() => {
		console.log('DocumentItem: ', props.data);
	}, [props.data]);

	return (
		<div className='card-container'
		>
				{Object.entries(props.data).map(([key, value]) => (
					<>
						<>{key} : </>
						<>{value}</>
						<br />
					</>
				))}
		</div>
	);
}
