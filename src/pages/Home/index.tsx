import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainBar from '../../components/Header';

const HomePage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<>
			<MainBar />
			<Box component="section" sx={{ p: 2 }}>
				<Typography variant="h3" gutterBottom>
					Força Nacional do SUS - MVP
				</Typography>
				<Typography variant="body1" gutterBottom>
					A Força Nacional do Sistema Único de Saúde (FN-SUS) é um programa de
					cooperação criado em novembro de 2011 e voltado à execução de medidas
					de prevenção, assistência e repressão a situações epidemiológicas, de
					desastres ou de desassistência à população quando for esgotada a
					capacidade de resposta do estado ou município.
				</Typography>
				<Typography variant="body1" gutterBottom>
					Desde a sua criação, a Força Nacional do SUS realizou mais de 4
					missões de apoio a situações de desastres naturais (enchentes e
					deslizamentos), no apoio a gestão de grandes eventos (Rio+20 e eventos
					como Círio de Nazaré, Copa do Mundo e Olimpíadas 2016), desassistência
					(apoio a reorganização da Rede de Atenção à Saúde, como migração de
					haitianos e assistência indígena) e atuação relacionada a tragédias
					(incêndio em boate em Santa Maria/RS).
				</Typography>
				<Typography variant="body1" gutterBottom>
					Criada pelo mesmo decreto que dispões sobre a declaração de Emergência
					em Saúde Pública de Importância Nacional (ESPIN), a FN-SUS pode ser
					convocada pelo Ministro de Estado da Saúde nas seguintes hipóteses: Em
					caso de declaração de ESPIN, por solicitação do Comitê Gestor da
					FN-SUS, por solicitação dos entes Federados e para integrar ações
					humanitárias e em resposta internacional coordenada, quando solicitada
					pela Secretaria de Vigilância em Saúde (SVS/MS) e/ou Secretaria de
					Atenção à Saúde (SAS/MS).
				</Typography>
				<br />
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate('/voluntarios')}
				>
					Ir para listagem de voluntários
				</Button>
			</Box>
		</>
	);
};

export default HomePage;
