import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import * as React from 'react';

interface MissionConfigCardProps {
	title: string;
	imageUrl: string;
}

const MissionConfigCard: React.FC<MissionConfigCardProps> = ({
	title,
	imageUrl
}) => {
	return (
		<Card>
			<CardMedia component="img" height="140" image={imageUrl} alt={title} />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default MissionConfigCard;
