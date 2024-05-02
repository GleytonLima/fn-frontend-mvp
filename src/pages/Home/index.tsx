import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainBar from '../../components/Header';

const HomePage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<>
			<MainBar />
			<Container>
				<Typography variant="h2" gutterBottom>
					Bem-vindo à nossa aplicação!
				</Typography>
				<Typography variant="body1" gutterBottom>
					Esta é a nossa página inicial. Use o botão abaixo para ir para a
					página de listagem de voluntarios.
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate('/voluntarios')}
				>
					Ir para listagem de voluntários
				</Button>
			</Container>
		</>
	);
};

export default HomePage;
