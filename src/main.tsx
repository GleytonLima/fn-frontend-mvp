import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { ptBR } from 'date-fns/locale';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import { configureI18n } from './i18n';
import './index.css';
import MissionViewPage from './pages/Mission/index.tsx';
import { MissaoDashboardPage } from './pages/MissionDashboard/index.tsx';
import { MissionsPage } from './pages/Missions/index.tsx';
import FilterBuilderTestPage from './pages/Test/index.tsx';
import { VoluntarioCreateEditPage } from './pages/VolunteerCreateEdit/index.tsx';
import { VoluntariosPage } from './pages/Volunteers/index.tsx';

configureI18n();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}></Route>
				<Route
					path="/acompanhamento-tempo-real"
					element={<MissaoDashboardPage />}
				></Route>
				<Route path="/missions/:id/view" element={<MissionViewPage />}></Route>
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
			</Routes>
		</BrowserRouter>
	</LocalizationProvider>
);
