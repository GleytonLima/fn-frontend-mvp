import {
	Assignment,
	DateRange,
	Flag,
	KeyboardArrowRight
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

// Definição do tipo para uma tarefa
interface Task {
	id: number;
	description: string;
	status: string;
	priority: number;
	dueDate: string;
}

// Props do componente
interface VolunteerTaskListProps {
	tasks: Task[];
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

const getPriorityColor = (priority: number): string => {
	switch (priority) {
		case 1:
			return '#ff5252'; // Alta
		case 2:
			return '#ffa000'; // Média
		case 3:
			return '#4caf50'; // Baixa
		default:
			return '#757575'; // Padrão
	}
};

const getStatusColor = (status: string): string => {
	switch (status.toLowerCase()) {
		case 'pendente':
			return '#ffa000';
		case 'em andamento':
			return '#2196f3';
		case 'concluída':
			return '#4caf50';
		default:
			return '#757575';
	}
};

const VolunteerTasks: React.FC<VolunteerTaskListProps> = ({ tasks }) => {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ maxWidth: 600, margin: 'auto', p: 2 }}>
				<Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
					<Box sx={{ bgcolor: 'primary.main', p: 2, color: 'white' }}>
						<Typography variant="h6">Suas Tarefas</Typography>
					</Box>
					<List>
						{tasks.map((task) => (
							<ListItem
								key={task.id}
								secondaryAction={
									<IconButton edge="end">
										<KeyboardArrowRight />
									</IconButton>
								}
								sx={{ borderBottom: '1px solid #e0e0e0' }}
							>
								<ListItemText
									primary={
										<Typography variant="subtitle1" fontWeight="bold">
											{task.description}
										</Typography>
									}
									secondary={
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
												icon={<Flag />}
												label={`Prioridade ${task.priority}`}
												size="small"
												sx={{
													bgcolor: getPriorityColor(task.priority),
													color: 'white'
												}}
												component={'span'}
											/>
											<Chip
												icon={<Assignment />}
												label={task.status}
												size="small"
												sx={{
													bgcolor: getStatusColor(task.status),
													color: 'white'
												}}
												component={'span'}
											/>
											<Chip
												icon={<DateRange />}
												label={new Date(task.dueDate).toLocaleDateString()}
												size="small"
												variant="outlined"
												component={'span'}
											/>
										</Box>
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

export default VolunteerTasks;
