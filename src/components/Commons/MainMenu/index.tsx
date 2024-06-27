import {
	AccountCircle,
	Assignment,
	Business,
	Category,
	ExpandLess,
	ExpandMore,
	Group
} from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import TableChartIcon from '@mui/icons-material/TableChart';
import TranslateIcon from '@mui/icons-material/Translate';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import WorkIcon from '@mui/icons-material/Work';
import { Collapse, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
	const [openBasicTables, setOpenBasicTables] = useState(false);
	const [openVolunteerArea, setOpenVolunteerArea] = useState(false);
	const { t } = useTranslation();

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
			case 'basic-tables':
				setOpenBasicTables(!openBasicTables);
				break;
			case 'volunteer-area':
				setOpenVolunteerArea(!openVolunteerArea);
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
				<ListItemButton component={Link} to="/volunteer-area">
					<ListItemIcon>
						<VolunteerActivismIcon />
					</ListItemIcon>
					<ListItemText primary="Área do Voluntário" />
				</ListItemButton>
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
							to="/volunteer-profiles"
						>
							<ListItemIcon>
								<AccountCircle />
							</ListItemIcon>
							<ListItemText primary="Perfis de Voluntário" />
						</ListItemButton>
						<ListItemButton sx={{ pl: 4 }} component={Link} to="/teams">
							<ListItemIcon>
								<Group />
							</ListItemIcon>
							<ListItemText primary="Equipes" />
						</ListItemButton>
					</List>
				</Collapse>
				<ListItemButton onClick={() => handleClick('basic-tables')}>
					<ListItemIcon>
						<TableChartIcon />
					</ListItemIcon>
					<ListItemText primary="Tabelas Básicas" />
					{openBasicTables ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={openBasicTables} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/basic-tables?tableName=degree"
							onClick={toggleDrawer(false)}
						>
							<ListItemIcon>
								<SchoolIcon />
							</ListItemIcon>
							<ListItemText primary={t('MainMenu.degrees')} />
						</ListItemButton>
					</List>
					<List component="div" disablePadding>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/basic-tables?tableName=postgraduate_degree"
							onClick={toggleDrawer(false)}
						>
							<ListItemIcon>
								<EngineeringIcon />
							</ListItemIcon>
							<ListItemText primary={t('MainMenu.postgraduateDegrees')} />
						</ListItemButton>
					</List>
					<List component="div" disablePadding>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/basic-tables?tableName=language"
							onClick={toggleDrawer(false)}
						>
							<ListItemIcon>
								<TranslateIcon />
							</ListItemIcon>
							<ListItemText primary={t('MainMenu.languages')} />
						</ListItemButton>
					</List>
					<List component="div" disablePadding>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/basic-tables?tableName=medical_specialization"
							onClick={toggleDrawer(false)}
						>
							<ListItemIcon>
								<LocalHospitalIcon />
							</ListItemIcon>
							<ListItemText primary={t('MainMenu.medicalSpecializations')} />
						</ListItemButton>
					</List>
					<List component="div" disablePadding>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/basic-tables?tableName=health_status"
							onClick={toggleDrawer(false)}
						>
							<ListItemIcon>
								<FavoriteIcon />
							</ListItemIcon>
							<ListItemText primary={t('MainMenu.healthStatuses')} />
						</ListItemButton>
					</List>
					<List component="div" disablePadding>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/basic-tables?tableName=medical_exam"
							onClick={toggleDrawer(false)}
						>
							<ListItemIcon>
								<AssignmentIcon />
							</ListItemIcon>
							<ListItemText primary={t('MainMenu.medicalExams')} />
						</ListItemButton>
					</List>
					<List component="div" disablePadding>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/basic-tables?tableName=professional_board"
							onClick={toggleDrawer(false)}
						>
							<ListItemIcon>
								<WorkIcon />
							</ListItemIcon>
							<ListItemText primary={t('MainMenu.professionalBoards')} />
						</ListItemButton>
					</List>
					<List component="div" disablePadding>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/basic-tables?tableName=training_type"
							onClick={toggleDrawer(false)}
						>
							<ListItemIcon>
								<Category />
							</ListItemIcon>
							<ListItemText primary={t('MainMenu.trainingTypes')} />
						</ListItemButton>
					</List>
					<List component="div" disablePadding>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/basic-tables?tableName=training_area"
							onClick={toggleDrawer(false)}
						>
							<ListItemIcon>
								<Business />
							</ListItemIcon>
							<ListItemText primary={t('MainMenu.trainingAreas')} />
						</ListItemButton>
					</List>
					<List component="div" disablePadding>
						<ListItemButton
							sx={{ pl: 4 }}
							component={Link}
							to="/trainings"
							onClick={toggleDrawer(false)}
						>
							<ListItemIcon>
								<Assignment />
							</ListItemIcon>
							<ListItemText primary={t('MainMenu.trainings')} />
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
