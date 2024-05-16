import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { SupplyMedicine } from '../SupplyMedicine';

interface SupplyMedicineTableProps {
	suppliesMedicines: SupplyMedicine[];
}

const SupplyMedicineTable: React.FC<SupplyMedicineTableProps> = ({
	suppliesMedicines
}) => {
	const navigate = useNavigate();
	const columns = [
		{ field: 'nome', headerName: 'Nome', flex: 1, minWidth: 150 },
		{ field: 'categoria', headerName: 'Categoria', flex: 1, minWidth: 150 },
		{ field: 'quantidade', headerName: 'Quantidade', flex: 1, minWidth: 150 },
		{ field: 'unidade', headerName: 'Unidade', flex: 1, minWidth: 150 },
		{
			field: 'validade',
			headerName: 'Data de Validade',
			flex: 1,
			minWidth: 150
		},
		{ field: 'fornecedor', headerName: 'Fornecedor', flex: 1, minWidth: 150 }
	];

	const rows = suppliesMedicines.map((supplyMedicine) => ({
		...supplyMedicine,
		expiryDate: supplyMedicine.validade.toLocaleDateString()
	}));

	const handleRowClick = (param: GridRowParams) => {
		navigate(`/supplies-medicines/${param.id}/view`);
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

export default SupplyMedicineTable;
