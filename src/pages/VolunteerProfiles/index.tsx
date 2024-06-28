import { Box, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MainBar from '../../components/Commons/Header';
import { VolunteerProfileTable } from '../../components/Volunteers/VolunteerProfileTable';

export const VolunteerProfilesPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<>
			<MainBar />
			<VolunteerProfileTable />
			<Box component="section" sx={{ p: 2 }}>
				<Grid item xs={12}>
					<Box display="flex" justifyContent="center" gap="20px">
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								navigate('/volunteer-profiles/create');
							}}
						>
							{t('commons.create')}
						</Button>
					</Box>
				</Grid>
			</Box>
		</>
	);
};
