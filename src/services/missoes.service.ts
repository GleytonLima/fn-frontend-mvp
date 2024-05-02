import { MissaoTipo } from '../models/missao';
import api from './api.config';

export const listarMissoesTipos = async () => {
	try {
		const response = await api.get(`/api/missoes-tipos`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const atualizarMissaoTipo = async (
	missaoId: string,
	missao: MissaoTipo
) => {
	try {
		const response = await api.put(`/api/missoes-tipos/${missaoId}`, missao);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
