import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export interface PropTypes {
	data: any;
}

export default function DocumentItem(props: PropTypes) {
	const [type, setType] = useState<string>('');
	const [color, setColor] = useState<string>('');
	const [alignment, setAlignment] = useState<string>('');

	return (
		<Card
			variant='outlined'
			sx={{
				maxWidth: '90%',
				alignSelf: alignment,
				zIndex: 0,
			}}
		>
			<CardContent>
				{props.data.array.forEach((element: Object) => {
					return <Typography>{JSON.stringify(element)}</Typography>;
				})}
			</CardContent>
		</Card>
	);
}
