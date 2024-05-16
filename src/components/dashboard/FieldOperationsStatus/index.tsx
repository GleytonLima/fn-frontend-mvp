import { List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

interface Operation {
	name: string;
	status: string;
}

const FieldOperationsStatus: React.FC = () => {
	const operations: Operation[] = [
		{ name: 'Operação 1', status: 'Em andamento' },
		{ name: 'Operação 2', status: 'Concluída' },
		{ name: 'Operação 3', status: 'Planejada' }
	]; // Dados fictícios

	return (
		<div>
			<Typography variant="h6">Status das Operações de Campo</Typography>
			<List>
				{operations.map((op, index) => (
					<ListItem key={index}>
						<ListItemText primary={op.name} secondary={op.status} />
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default FieldOperationsStatus;
