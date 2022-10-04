import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export interface PropTypes {
	userName: string;
	type: string;
	message: string;
}

export default function ChatBubble(props: PropTypes) {
	const [type, setType] = useState<string>('');
	const [color, setColor] = useState<string>('');
	const [alignment, setAlignment] = useState<string>('');

	useEffect(() => {
		setType(props.type);
		// sent
		if (type == 'sent') {
			setAlignment('flex-end');
			setColor('dodgerblue');
		} else {
			// received
			setAlignment('flex-start');
			setColor('#00172D');
		}
		console.log('In ChatBubble useEffect');
	});

	return (
		<Card
			variant='outlined'
			sx={{ bgcolor: color, maxWidth: '90%', alignSelf: alignment }}
		>
			<CardContent>
				<Typography color={'white'} sx={{ fontSize: 12 }}>
					<b>{props.userName}</b>
				</Typography>
				<Typography color={'white'}>{props.message}</Typography>
			</CardContent>
		</Card>
	);
}
