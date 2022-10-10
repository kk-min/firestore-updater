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
		<Card
			variant='outlined'
			sx={{
				zIndex: 0,
				width: 'fit-content',
				alignSelf: 'center',
			}}
		>
			<CardContent>
				{Object.entries(props.data).map(([key, value]) => (
					<>
						<>{key} : </>
						<>{value}</>
						<br />
					</>
				))}
			</CardContent>
		</Card>
	);
}
