import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BuildIcon from '@mui/icons-material/Build';
import BusinessIcon from '@mui/icons-material/Business';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ForumIcon from '@mui/icons-material/Forum';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import WarningIcon from '@mui/icons-material/Warning';
import { Collapse, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface TemporaryDrawerProps {
	open: boolean;
	toggleDrawer: (
		open: boolean
	) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}
export default function TemporaryDrawer({
	open,
	toggleDrawer
}: TemporaryDrawerProps) {
	const [openDesastres, setOpenDesastres] = useState(false);
	const [openEpidemias, setOpenEpidemias] = useState(false);
	const [openRecursos, setOpenRecursos] = useState(false);
	const [openComunicacao, setOpenComunicacao] = useState(false);
	const [openMissoes, setOpenMissoes] = useState(false);

	const handleClick = (menu: string) => {
		switch (menu) {
			case 'desastres':
				setOpenDesastres(!openDesastres);
				break;
			case 'epidemias':
				setOpenEpidemias(!openEpidemias);
				break;
			case 'recursos':
				setOpenRecursos(!openRecursos);
				break;
			case 'comunicacao':
				setOpenComunicacao(!openComunicacao);
				break;
			case 'missoes':
				setOpenMissoes(!openMissoes);
				break;
			default:
				break;
		}
	};

	const DrawerList = (
		<Box sx={{ width: 350 }} role="presentation">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
						FN - SUS
					</Link>
				</Typography>
			</Toolbar>
			<Divider />
			<List>
				<ListItemButton onClick={() => handleClick('missoes')}>
					<ListItemIcon>
						<FlightTakeoffIcon />
					</ListItemIcon>
					<ListItemText primary="Gestão de Missões" />
					{openMissoes ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={openMissoes} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/acompanhamento-tempo-real"
						>
							<ListItemIcon>
								<AccessTimeIcon />
							</ListItemIcon>
							<ListItemText primary="Acompanhamento em tempo real" />
						</ListItemButton>
						<ListItemButton sx={{ pl: 4 }} component={Link} to="/missions">
							<ListItemIcon>
								<CreateNewFolderIcon />
							</ListItemIcon>
							<ListItemText primary="Criação e planejamento de missões" />
						</ListItemButton>
					</List>
				</Collapse>
				<ListItemButton onClick={() => handleClick('recursos')}>
					<ListItemIcon>
						<BusinessCenterIcon />
					</ListItemIcon>
					<ListItemText primary="Gestão de Recursos" />
					{openRecursos ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={openRecursos} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton sx={{ pl: 4 }} component={Link} to="/voluntarios">
							<ListItemIcon>
								<VolunteerActivismIcon />
							</ListItemIcon>
							<ListItemText primary="Cadastro de Voluntários" />
						</ListItemButton>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/supplies-medicines"
						>
							<ListItemIcon>
								<Inventory2Icon />
							</ListItemIcon>
							<ListItemText primary="Gestão de Insumos e Medicamentos" />
						</ListItemButton>
						<ListItemButton sx={{ pl: 4 }} component={Link} to="/equipments">
							<ListItemIcon>
								<BuildIcon />
							</ListItemIcon>
							<ListItemText primary="Gestão de Equipamentos" />
						</ListItemButton>
					</List>
				</Collapse>

				<ListItemButton onClick={() => handleClick('epidemias')}>
					<ListItemIcon>
						<LocalHospitalIcon />
					</ListItemIcon>
					<ListItemText primary="Crises Epidemiológicas" />
					{openEpidemias ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={openEpidemias} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/vigilancia-epidemiologica"
						>
							<ListItemIcon>
								<HealthAndSafetyIcon />
							</ListItemIcon>
							<ListItemText primary="Vigilância Epidemiológica" />
						</ListItemButton>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/rastreamento-contatos"
						>
							<ListItemIcon>
								<TrackChangesIcon />
							</ListItemIcon>
							<ListItemText primary="Rastreamento de Contatos" />
						</ListItemButton>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/gestao-vacinacao"
						>
							<ListItemIcon>
								<LocalHospitalIcon />
							</ListItemIcon>
							<ListItemText primary="Gestão de Vacinação" />
						</ListItemButton>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/comunicacao-risco"
						>
							<ListItemIcon>
								<WarningIcon />
							</ListItemIcon>
							<ListItemText primary="Comunicação de Risco" />
						</ListItemButton>
					</List>
				</Collapse>

				<ListItemButton onClick={() => handleClick('comunicacao')}>
					<ListItemIcon>
						<ForumIcon />
					</ListItemIcon>
					<ListItemText primary="Comunicação e Coordenação" />
					{openComunicacao ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={openComunicacao} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/comunicacao-interna"
						>
							<ListItemIcon>
								<ForumIcon />
							</ListItemIcon>
							<ListItemText primary="Comunicação Interna" />
						</ListItemButton>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/comunicacao-instituicoes"
						>
							<ListItemIcon>
								<BusinessIcon />
							</ListItemIcon>
							<ListItemText primary="Comunicação com Instituições" />
						</ListItemButton>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/coordenacao-acoes"
						>
							<ListItemIcon>
								<GroupWorkIcon />
							</ListItemIcon>
							<ListItemText primary="Coordenação de Ações" />
						</ListItemButton>
					</List>
				</Collapse>
			</List>
		</Box>
	);

	return (
		<div>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{DrawerList}
			</Drawer>
		</div>
	);
}
