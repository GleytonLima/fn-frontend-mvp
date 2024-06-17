import {
	Container,
	Grid,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Typography
} from '@mui/material';
import React from 'react';
import AttendancesByType from '../AttendancesByType';
import DailyAttendances from '../DailyAttendances';
import DiseasesAndConditionsFrequency from '../DiseasesAndConditionsFrequency';
import DisplacedAgeDistribution from '../DisplacedAgeDistribution';
import DonationsControl from '../DonationsControl';
import FieldOperationsStatus from '../FieldOperationsStatus';
import GeographicalDistribution from '../GeographicalDistribution';
import MedicinesAndSuppliesUsage from '../MedicinesAndSuppliesUsage';
import NewsTrendingTopics from '../NewsTrendingTopics';
import RegionalComparison from '../RegionalComparison';
import ShelterStatus from '../ShelterStatus';
import TotalAttendances from '../TotalAttendances';
import TotalDisplaced from '../TotalDisplaced';
import TotalVolunteers from '../TotalVolunteers';
import VolunteersBySpecialty from '../VolunteersBySpecialty';
import VulnerablePopulationMonitor from '../VulnerablePopulationMonitor';

const MissaoDashboard: React.FC = () => {
	const [dashboard, setDashboard] = React.useState(
		'Missão 05/2024 - Rio Grande do Sul'
	);

	const handleChange = (event: SelectChangeEvent<string>) => {
		setDashboard(event.target.value as string);
	};
	return (
		<Container>
			<Grid container justifyContent="space-between" alignItems="center">
				<Grid item>
					<Typography variant="h5" gutterBottom>
						{dashboard} - Dashboard
					</Typography>
				</Grid>
				<Grid item>
					<Select value={dashboard} onChange={handleChange}>
						<MenuItem value="Missão 05/2024 - Rio Grande do Sul">
							Missão 05/2024
						</MenuItem>
						<MenuItem value="Missão 06/2024 - São Paulo">
							Missão 06/2024
						</MenuItem>
						{/* Adicione mais MenuItem conforme necessário */}
					</Select>
				</Grid>
			</Grid>
			<br />
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Paper style={{ minHeight: '100%' }}>
						<TotalVolunteers />
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper style={{ minHeight: '100%' }}>
						<VolunteersBySpecialty />
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper style={{ minHeight: '100%' }}>
						<TotalAttendances
							data={[
								320, 302, 301, 220, 182, 191, 150, 232, 201, 200, 202, 290, 98,
								77, 101, 390, 330, 320, 180, 173, 190
							]}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper>
						<DailyAttendances />
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper>
						<AttendancesByType />
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper>
						<GeographicalDistribution />
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper>
						<RegionalComparison />
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper style={{ minHeight: '100%' }}>
						<TotalDisplaced displacedData={[320, 302, 301, 220]} />
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper>
						<DisplacedAgeDistribution />
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper>
						<ShelterStatus />
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper>
						<VulnerablePopulationMonitor />
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper>
						<MedicinesAndSuppliesUsage />
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper>
						<DiseasesAndConditionsFrequency />
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper>
						<DonationsControl />
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper style={{ minHeight: '100%' }}>
						<NewsTrendingTopics />
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper style={{ minHeight: '100%' }}>
						<FieldOperationsStatus />
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default MissaoDashboard;
