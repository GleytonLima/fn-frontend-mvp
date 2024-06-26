import { Announcement, Campaign, Group, Person } from '@mui/icons-material';
import {
	Box,
	Chip,
	List,
	ListItem,
	ListItemText,
	Paper,
	ThemeProvider,
	Typography,
	createTheme
} from '@mui/material';
import React from 'react';

// Definição do tipo para um comunicado
export interface Communication {
	id: number;
	title: string;
	message: string;
	dateTime: string;
	communicationType: 'mission' | 'team' | 'individual';
}

// Props do componente
interface CommunicationListProps {
	communications: Communication[];
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

const getTypeIcon = (type: string) => {
	switch (type) {
		case 'mission':
			return <Campaign />;
		case 'team':
			return <Group />;
		case 'individual':
			return <Person />;
		default:
			return <Announcement />;
	}
};

const getTypeColor = (type: string): string => {
	switch (type) {
		case 'mission':
			return '#ff9800';
		case 'team':
			return '#2196f3';
		case 'individual':
			return '#4caf50';
		default:
			return '#757575';
	}
};

const getName = (type: string): string => {
	switch (type) {
		case 'mission':
			return 'Missão';
		case 'team':
			return 'Equipe';
		case 'individual':
			return 'Individual';
		default:
			return 'Comunicado';
	}
};

const CommunicationList: React.FC<CommunicationListProps> = ({
	communications
}) => {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ maxWidth: 600, margin: 'auto', p: 2 }}>
				<Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
					<Box sx={{ bgcolor: 'primary.main', p: 2, color: 'white' }}>
						<Typography variant="h6">Comunicados</Typography>
					</Box>
					<List>
						{communications.map((comm) => (
							<ListItem
								key={comm.id}
								alignItems="flex-start"
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
												{comm.title}
											</Typography>
											<Chip
												icon={getTypeIcon(comm.communicationType)}
												label={getName(comm.communicationType)}
												size="small"
												sx={{
													bgcolor: getTypeColor(comm.communicationType),
													color: 'white'
												}}
											/>
										</Box>
									}
									secondary={
										<React.Fragment>
											<Typography
												sx={{ display: 'inline' }}
												component="span"
												variant="body2"
												color="text.primary"
											>
												{comm.message}
											</Typography>
											<Typography
												variant="caption"
												display="block"
												sx={{ mt: 1 }}
											>
												{new Date(comm.dateTime).toLocaleString()}
											</Typography>
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

export default CommunicationList;
