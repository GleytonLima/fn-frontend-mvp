import { Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import BasicFormDialog from '../../components/Commons/BasicFormDialog';
import { BasicTableComponent } from '../../components/Commons/BasicTable';
import MainBar from '../../components/Commons/Header';
import { BasicTable } from '../../models/basic-table';
import { deleteBasicTable } from '../../services/basic-tables.service';

export const BasicTablesPage = () => {
	const [key, setKey] = useState(0);
	const { enqueueSnackbar } = useSnackbar();
	const [searchParams] = useSearchParams();
	const tableName = searchParams.get('tableName') || '';
	const [currentState, setCurrentState] = useState({
		open: false,
		value: {} as BasicTable
	});
	const { t } = useTranslation();

	const handleClickOpen = () => {
		setCurrentState({ open: true, value: {} as BasicTable });
	};

	const handleDelete = (data: BasicTable) => {
		if (!data.id) {
			return;
		}
		deleteBasicTable({
			id: data.id,
			tableName: tableName
		})
			.then(() => {
				enqueueSnackbar(t('BasicTablesPage.deleteSuccess'), {
					variant: 'success'
				});
				refreshTable();
			})
			.catch((error) => {
				console.error(error);
				enqueueSnackbar(t('BasicTables.deleleTable'), {
					variant: 'error'
				});
			});
	};

	const refreshTable = () => {
		setKey((prev) => prev + 1);
	};

	return (
		<>
			<MainBar />
			<BasicTableComponent
				key={key}
				handleEdit={(data: BasicTable) => {
					setCurrentState({ open: true, value: data });
				}}
				handleDelete={handleDelete}
			></BasicTableComponent>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: '100px'
				}}
			>
				<Button variant="contained" onClick={handleClickOpen}>
					{t('commons.create')}
				</Button>
			</Box>
			<BasicFormDialog
				onCreated={() => {
					setCurrentState({ open: false, value: {} as BasicTable });
					refreshTable();
				}}
				onClose={() =>
					setCurrentState({ open: false, value: {} as BasicTable })
				}
				currentState={currentState}
			></BasicFormDialog>
		</>
	);
};
