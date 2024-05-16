import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainBar from '../../components/Header';
import { MissaoTipoForm } from '../../components/MissaoTipoForm';
import { MissaoTipo } from '../../models/missao';

export const MissaoTipoCreateEditPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const missaoRecebida = location.state as MissaoTipo;
	const [missao, setMissao] = useState<MissaoTipo>(missaoRecebida);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		console.log(missao);
	};

	const handleCancel = () => {
		setMissao({ nome: '' } as MissaoTipo);
		navigate('/missoes-tipos');
	};

	return (
		<>
			<MainBar />
			<MissaoTipoForm
				missao={missao}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</>
	);
};
