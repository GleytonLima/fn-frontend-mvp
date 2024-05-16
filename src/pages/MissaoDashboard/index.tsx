import { Grid } from '@mui/material';
import MainBar from '../../components/Header';
import MissaoDashboard from '../../components/dashboard/MissaoDashboard';

export const MissaoDashboardPage = () => {
	return (
		<>
			<MainBar />
			<br />
			<Grid container spacing={2} padding="1rem 1rem">
				<MissaoDashboard />
			</Grid>
		</>
	);
};
