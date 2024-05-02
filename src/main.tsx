import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { MissaoTipoCreateEdit } from './pages/MissaoCreateEdit/index.tsx';
import { Missoes } from './pages/MissoesTipos/index.tsx';
import { Voluntarios } from './pages/Voluntarios/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}></Route>
			<Route path="/missoes-tipos" element={<Missoes />}></Route>
			<Route
				path="/missoes-tipos/:id/edit"
				element={<MissaoTipoCreateEdit />}
			></Route>
			<Route path="/voluntarios" element={<Voluntarios />}></Route>
		</Routes>
	</BrowserRouter>
);
