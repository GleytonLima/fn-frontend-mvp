import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

interface Mission {
	id: number;
	name: string;
	location: string;
	startDate: Date;
	endDate: Date;
}

interface MissionsTableProps {
	missions: Mission[];
}

const MissionsTable: React.FC<MissionsTableProps> = ({ missions }) => {
	const navigate = useNavigate();
	const columns = [
		{ field: 'name', headerName: 'Nome', flex: 1, minWidth: 150 },
		{
			field: 'responseLevel',
			headerName: 'Nível de Resposta',
			flex: 1,
			minWidth: 150
		},
		{ field: 'location', headerName: 'Localização', flex: 1, minWidth: 150 },
		{
			field: 'startDate',
			headerName: 'Data de Início',
			flex: 1,
			minWidth: 150
		},
		{ field: 'endDate', headerName: 'Data de Término', flex: 1, minWidth: 150 }
	];

	const rows = missions.map((mission) => ({
		...mission,
		startDate: mission.startDate.toLocaleDateString(),
		endDate: mission.endDate.toLocaleDateString()
	}));

	const handleRowClick = (param: GridRowParams) => {
		navigate(`/missions/${param.id}/view`);
	};

	return (
		<div style={{ height: '100%', width: '100%' }}>
			<DataGrid
				autoHeight
				rows={rows}
				columns={columns}
				pageSizeOptions={[5, 10, 20]}
				onRowClick={handleRowClick}
			/>
		</div>
	);
};

export default MissionsTable;
