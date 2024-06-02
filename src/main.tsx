import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import { configureI18n } from './i18n';
import './index.css';
import EquipmentPage from './pages/Equipment/index.tsx';
import EquipmentsPage from './pages/Equipments/index.tsx';
import { MissaoTipoCreateEditPage } from './pages/MissaoCreateEdit/index.tsx';
import { MissaoDashboardPage } from './pages/MissaoDashboard/index.tsx';
import MissionViewPage from './pages/Mission/index.tsx';
import { MissionsPage } from './pages/Missoes/index.tsx';
import { MissoesTiposPage } from './pages/MissoesTipos/index.tsx';
import SupplyMedicinePage from './pages/SupplyMedicine/index.tsx';
import SupplyMedicinesPage from './pages/SupplyMedicines/index.tsx';
import FilterBuilderTestPage from './pages/Test/index.tsx';
import { VoluntarioCreateEditPage } from './pages/VoluntarioCreateEdit/index.tsx';
import { VoluntariosPage } from './pages/Voluntarios/index.tsx';

configureI18n();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}></Route>
			<Route
				path="/acompanhamento-tempo-real"
				element={<MissaoDashboardPage />}
			></Route>
			<Route path="/missoes-tipos" element={<MissoesTiposPage />}></Route>
			<Route
				path="/missoes-tipos/:id/edit"
				element={<MissaoTipoCreateEditPage />}
			></Route>
			<Route path="/missions/:id/view" element={<MissionViewPage />}></Route>
			<Route path="/missions" element={<MissionsPage />}></Route>
			<Route
				path="/supplies-medicines"
				element={<SupplyMedicinesPage />}
			></Route>
			<Route
				path="/supplies-medicines/:id/view"
				element={<SupplyMedicinePage />}
			></Route>
			<Route path="/equipments" element={<EquipmentsPage />}></Route>
			<Route path="/equipments/:id/view" element={<EquipmentPage />} />
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
);
