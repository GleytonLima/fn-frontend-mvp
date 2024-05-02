import ChecklistIcon from '@mui/icons-material/Checklist';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();
	const DrawerList = (
		<Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					FN - SUS
				</Typography>
			</Toolbar>
			<Divider />
			<List>
				<ListItem disablePadding onClick={() => navigate('/missoes-tipos')}>
					<ListItemButton>
						<ListItemIcon>
							<ChecklistIcon />
						</ListItemIcon>
						<ListItemText primary="Missões - Tipos" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding onClick={() => navigate('/voluntarios')}>
					<ListItemButton>
						<ListItemIcon>
							<PeopleAltIcon />
						</ListItemIcon>
						<ListItemText primary="Voluntários" />
					</ListItemButton>
				</ListItem>
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
