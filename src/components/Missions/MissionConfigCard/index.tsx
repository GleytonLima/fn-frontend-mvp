import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography
} from '@mui/material';
import * as React from 'react';

interface MissionConfigCardProps {
	id: string;
	title: string;
	imageUrl: string;
	onClick: (id: string) => void;
}

const MissionConfigCard: React.FC<MissionConfigCardProps> = ({
	id,
	title,
	imageUrl,
	onClick
}) => {
	return (
		<Card>
			<CardActionArea onClick={() => onClick(id)}>
				<CardMedia
					component="img"
					sx={{ height: 140 }}
					image={imageUrl}
					alt={title}
				/>
				<CardContent>
					<Typography gutterBottom variant="h6" component="div">
						{title}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default MissionConfigCard;
