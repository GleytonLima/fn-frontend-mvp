import {
	Event as EventIcon,
	KeyboardArrowRight,
	Link as LinkIcon,
	LocationOn
} from '@mui/icons-material';
import {
	Box,
	Chip,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Paper,
	ThemeProvider,
	Typography,
	createTheme
} from '@mui/material';
import React from 'react';

// Definição do tipo para um evento
interface Event {
	id: number;
	title: string;
	description: string;
	dateTime: string;
	eventType: string;
	eventLink?: string;
	location?: string;
}

// Props do componente
interface EventCalendarProps {
	events: Event[];
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

const getEventTypeColor = (eventType: string): string => {
	switch (eventType.toLowerCase()) {
		case 'atividade':
			return '#ff9800';
		case 'treinamento':
			return '#2196f3';
		case 'reunião':
			return '#4caf50';
		case 'voluntariado':
			return '#9c27b0';
		default:
			return '#757575';
	}
};

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ maxWidth: 600, margin: 'auto', p: 2 }}>
				<Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
					<Box sx={{ bgcolor: 'primary.main', p: 2, color: 'white' }}>
						<Typography variant="h6">Agenda de Eventos</Typography>
					</Box>
					<List>
						{events
							.sort(
								(a, b) =>
									new Date(a.dateTime).getTime() -
									new Date(b.dateTime).getTime()
							)
							.map((event) => (
								<ListItem
									key={event.id}
									alignItems="flex-start"
									secondaryAction={
										<IconButton edge="end">
											<KeyboardArrowRight />
										</IconButton>
									}
									sx={{ borderBottom: '1px solid #e0e0e0' }}
								>
									<ListItemText
										primary={
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
													mb: 1
												}}
											>
												<Typography variant="subtitle1" fontWeight="bold">
													{event.title}
												</Typography>
												<Chip
													icon={<EventIcon />}
													label={event.eventType}
													size="small"
													sx={{
														bgcolor: getEventTypeColor(event.eventType),
														color: 'white'
													}}
												/>
											</Box>
										}
										secondary={
											<React.Fragment>
												<Typography
													component={'span'}
													variant="body2"
													color="text.secondary"
												>
													{event.description}
												</Typography>
												<Box
													sx={{
														display: 'flex',
														alignItems: 'center',
														flexWrap: 'wrap',
														gap: 1,
														mt: 1
													}}
													component={'span'}
												>
													<Chip
														icon={<EventIcon />}
														label={new Date(event.dateTime).toLocaleString()}
														size="small"
														component={'span'}
														variant="outlined"
													/>
													{event.location && (
														<Chip
															icon={<LocationOn />}
															label={event.location}
															size="small"
															component={'span'}
															variant="outlined"
														/>
													)}
													{event.eventLink && (
														<Chip
															icon={<LinkIcon />}
															label="Link"
															size="small"
															variant="outlined"
															component="a"
															href={event.eventLink}
															target="_blank"
															clickable
														/>
													)}
												</Box>
											</React.Fragment>
										}
									/>
								</ListItem>
							))}
					</List>
				</Paper>
			</Box>
		</ThemeProvider>
	);
};

export default EventCalendar;
