import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { styled } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { ptBR } from 'date-fns/locale';
import { MaterialDesignContent, SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import { configureI18n } from './i18n';
import './index.css';
import { BasicTablesPage } from './pages/BasicTables/index.tsx';
import MissionViewPage from './pages/Mission/index.tsx';
import { MissaoDashboardPage } from './pages/MissionDashboard/index.tsx';
import { MissionsPage } from './pages/Missions/index.tsx';
import { TeamCreateEditPage } from './pages/TeamCreateEdit/index.tsx';
import { TeamsPage } from './pages/Teams/index.tsx';
import FilterBuilderTestPage from './pages/Test/index.tsx';
import { TrainingCreateEditPage } from './pages/TrainingCreateEdit/index.tsx';
import { TrainingsPage } from './pages/Trainings/index.tsx';
import { VolunteerAreaPage } from './pages/VolunteerArea/index.tsx';
import { VoluntarioCreateEditPage } from './pages/VolunteerCreateEdit/index.tsx';
import { VoluntariosPage } from './pages/Volunteers/index.tsx';

configureI18n();

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(
	() => ({
		'&.notistack-MuiContent-success': {
			backgroundColor: '#2D7738',
			fontFamily: 'Roboto'
		},
		'&.notistack-MuiContent-error': {
			backgroundColor: '#970C0C',
			fontFamily: 'Roboto'
		}
	})
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
		<SnackbarProvider
			Components={{
				success: StyledMaterialDesignContent,
				error: StyledMaterialDesignContent
			}}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />}></Route>
					<Route
						path="/acompanhamento-tempo-real"
						element={<MissaoDashboardPage />}
					></Route>
					<Route
						path="/missions/:id/view"
						element={<MissionViewPage />}
					></Route>
					<Route path="/missions" element={<MissionsPage />}></Route>
					<Route
						path="/voluntarios/create"
						element={<VoluntarioCreateEditPage />}
					></Route>
					<Route
						path="/voluntarios/:id/edit"
						element={<VoluntarioCreateEditPage />}
					></Route>
					<Route path="/teste" element={<FilterBuilderTestPage />}></Route>
					<Route path="/voluntarios" element={<VoluntariosPage />}></Route>
					<Route path="/basic-tables" element={<BasicTablesPage />}></Route>
					<Route path="/volunteer-area" element={<VolunteerAreaPage />}></Route>
					<Route
						path="/trainings/create"
						element={<TrainingCreateEditPage />}
					></Route>
					<Route
						path="/trainings/:id/edit"
						element={<TrainingCreateEditPage />}
					></Route>
					<Route path="/trainings" element={<TrainingsPage />}></Route>
					<Route path="/teams/create" element={<TeamCreateEditPage />}></Route>
					<Route
						path="/teams/:id/edit"
						element={<TeamCreateEditPage />}
					></Route>
					<Route path="/teams" element={<TeamsPage />}></Route>
				</Routes>
			</BrowserRouter>
		</SnackbarProvider>
	</LocalizationProvider>
);
