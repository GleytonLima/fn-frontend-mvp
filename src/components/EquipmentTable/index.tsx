import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Equipment } from '../Equipment'; // Importe o modelo de dados de Equipamento, se necessário

interface EquipmentTableProps {
	equipments: Equipment[]; // Substitua Equipment por seu modelo de dados de equipamento, se aplicável
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({ equipments }) => {
	const navigate = useNavigate();
	const columns = [
		{ field: 'nome', headerName: 'Nome', flex: 1 },
		{ field: 'tipo', headerName: 'Tipo', flex: 1 }, // Renomeie 'categoria' para 'tipo'
		{ field: 'quantidade', headerName: 'Quantidade', flex: 1 },
		{ field: 'status', headerName: 'Status', flex: 1 },
		{ field: 'localizacao', headerName: 'Localização', flex: 1 } // Adicione uma coluna para localização, se necessário
	];

	const rows = equipments.map((equipment) => ({
		...equipment
		// Se necessário, faça alterações nos dados para correspondência com as colunas
	}));

	const handleRowClick = (param: GridRowParams) => {
		navigate(`/equipments/${param.id}/view`); // Atualize o link conforme a rota de visualização dos equipamentos
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

export default EquipmentTable;
