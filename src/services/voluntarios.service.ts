import { MissaoTipo } from '../models/missao';
import api from './api.config';

export const listarVoluntariosElegiveisPorMissao = async (filtros: {
	missaoTipo: MissaoTipo | null;
	nome: string;
}) => {
	try {
		const { missaoTipo: missao, nome } = filtros;
		const queryParams = new URLSearchParams();
		if (missao?._id) {
			queryParams.append('missao_id', missao._id);
		}
		if (nome) {
			queryParams.append('nome_completo', nome);
		}
		const response = await api.get(`/api/voluntarios?${queryParams}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
