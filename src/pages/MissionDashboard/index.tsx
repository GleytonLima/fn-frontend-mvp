import { Grid } from '@mui/material';
import MainBar from '../../components/Commons/Header';
import MissaoDashboardComponent from '../../components/Dashboard/MissaoDashboard';

export const MissaoDashboardPage = () => {
	return (
		<>
			<MainBar />
			<br />
			<Grid container spacing={2} padding="1rem 1rem">
				<MissaoDashboardComponent />
			</Grid>
		</>
	);
};
