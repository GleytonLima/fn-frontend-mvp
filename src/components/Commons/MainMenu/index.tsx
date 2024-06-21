import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
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
	const [openBasicTables, setOpenBasicTables] = useState(false);

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
					</List>
				</Collapse>
				<ListItemButton onClick={() => handleClick('basic-tables')}>
					<ListItemIcon>
						<BusinessCenterIcon />
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
								<VolunteerActivismIcon />
							</ListItemIcon>
							<ListItemText primary="Graduações" />
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
								<VolunteerActivismIcon />
							</ListItemIcon>
							<ListItemText primary="Pós-graduações" />
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
