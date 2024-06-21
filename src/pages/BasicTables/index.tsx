import BasicFormDialog from '../../components/Commons/BasicFormDialog';
import { BasicTableComponent } from '../../components/Commons/BasicTable';
import MainBar from '../../components/Commons/Header';

export const BasicTablesPage = () => {
	return (
		<>
			<MainBar />
			<BasicTableComponent></BasicTableComponent>
			<BasicFormDialog></BasicFormDialog>
		</>
	);
};
