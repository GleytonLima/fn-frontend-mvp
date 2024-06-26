import {
	SentimentDissatisfied,
	SentimentSatisfied,
	SentimentVeryDissatisfied,
	SentimentVerySatisfied
} from '@mui/icons-material';
import {
	Avatar,
	Box,
	Button,
	Menu,
	MenuItem,
	Paper,
	ThemeProvider,
	Typography,
	createTheme
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import useWindowDimensions from '../../../hooks/window-dimensions';

const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2'
		},
		secondary: {
			main: '#4caf50'
		}
	}
});

interface Mood {
	label: string;
	icon: React.ReactElement;
}

const moods: Mood[] = [
	{ label: 'Muito Bem', icon: <SentimentVerySatisfied /> },
	{ label: 'Bem', icon: <SentimentSatisfied /> },
	{ label: 'Mal', icon: <SentimentDissatisfied /> },
	{ label: 'Muito Mal', icon: <SentimentVeryDissatisfied /> }
];

const VolunteerArea: React.FC = () => {
	const { width, height } = useWindowDimensions();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMoodSelect = (mood: Mood) => {
		setSelectedMood(mood);
		handleClose();
		enqueueSnackbar(`Seu relato foi recebido. Obrigado!`, {
			variant: 'success'
		});
	};
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					background: 'linear-gradient(to bottom, #1976d2, #1976d2)',
					minHeight:
						width > 600
							? `${(15 / 100) * height}px`
							: `${(21 / 100) * height}px`,
					p: 2,
					display: 'flex',
					flexDirection: 'column',
					borderBottomLeftRadius: (width / 680) * 50,
					borderBottomRightRadius: (width / 680) * 50
				}}
			>
				<Box display="flex" alignItems="center" mb={2}>
					<Avatar sx={{ bgcolor: 'grey.500', mr: 2 }}>JS</Avatar>
					<Box>
						<Typography variant="h6" sx={{ color: 'white' }}>
							Olá, João
						</Typography>
						<Typography sx={{ color: 'white' }}>Voluntário</Typography>
					</Box>
				</Box>
			</Box>
			<Box padding={2} sx={{ marginTop: '-100px' }}>
				<Paper
					elevation={3}
					sx={{
						maxWidth: 400,
						minHeight: 100,
						mx: 'auto',
						p: 2,
						borderRadius: 4,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%'
					}}
				>
					<Typography mb={2} align="center">
						Como está se sentindo hoje?
					</Typography>

					<Box display="flex" gap={2} mb={2}>
						<Button
							variant="contained"
							onClick={handleClick}
							color="primary"
							startIcon={selectedMood ? selectedMood.icon : null}
						>
							{selectedMood ? selectedMood.label : 'Selecione'}
						</Button>
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							{moods.map((mood) => (
								<MenuItem
									key={mood.label}
									onClick={() => handleMoodSelect(mood)}
								>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										{mood.icon}
										<Typography sx={{ ml: 1 }}>{mood.label}</Typography>
									</Box>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Paper>
			</Box>
		</ThemeProvider>
	);
};

export default VolunteerArea;
