import {
	Campaign,
	ExpandMore,
	Group,
	LocationOn,
	WhatsApp
} from '@mui/icons-material';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Chip,
	Paper,
	ThemeProvider,
	Typography,
	createTheme
} from '@mui/material';
import React from 'react';

// Definição dos tipos
interface MissionTeam {
	missionId: number;
	missionName: string;
	teamId: number;
	teamName: string;
	specificObjectives: string;
	location: string;
	messagingPlatformLink: string;
}

// Props do componente
interface VolunteerTeamsAndMissionsProps {
	missionTeams: MissionTeam[];
}

const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2'
		},
		secondary: {
			main: '#5DD39E'
		}
	}
});

const VolunteerTeamsAndMissions: React.FC<VolunteerTeamsAndMissionsProps> = ({
	missionTeams
}) => {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ maxWidth: 600, margin: 'auto', p: 2 }}>
				<Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
					<Box sx={{ bgcolor: 'primary.main', p: 2, color: 'white' }}>
						<Typography variant="h6">Suas Equipes e Missões</Typography>
					</Box>
					{missionTeams.map((mt) => (
						<Box padding={1} key={`${mt.missionId}-${mt.teamId}`}>
							<Accordion defaultExpanded>
								<AccordionSummary
									expandIcon={<ExpandMore />}
									aria-controls={`panel${mt.missionId}${mt.teamId}-content`}
									id={`panel${mt.missionId}${mt.teamId}-header`}
								>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											flexWrap: 'wrap',
											gap: 1
										}}
									>
										<Chip
											icon={<Campaign />}
											label={mt.missionName}
											color="primary"
											size="small"
										/>
										<Chip
											icon={<Group />}
											label={mt.teamName}
											color="secondary"
											size="small"
										/>
									</Box>
								</AccordionSummary>
								<AccordionDetails>
									<Typography variant="body2" gutterBottom>
										<strong>Objetivos Específicos:</strong>{' '}
										{mt.specificObjectives}
									</Typography>
									<Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
										<LocationOn fontSize="small" color="action" />
										<Typography variant="body2" sx={{ ml: 1 }}>
											{mt.location}
										</Typography>
									</Box>
									<Button
										variant="outlined"
										startIcon={<WhatsApp />}
										href={mt.messagingPlatformLink}
										target="_blank"
										rel="noopener noreferrer"
										sx={{ mt: 2 }}
									>
										Grupo de Mensagens
									</Button>
								</AccordionDetails>
							</Accordion>
						</Box>
					))}
				</Paper>
			</Box>
		</ThemeProvider>
	);
};

export default VolunteerTeamsAndMissions;
