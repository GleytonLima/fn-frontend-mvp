import { CustomLocation } from '../models/location';
import api from './api.config';

export const listLocations = async (params: {
	name: string;
	type_id: number | null | undefined;
	limit: number;
	offset: number;
}) => {
	try {
		const { name, limit, offset, type_id } = params;
		const queryParams = new URLSearchParams();
		queryParams.append('limit', `${limit}`);
		queryParams.append('offset', `${offset}`);
		if (!!type_id && type_id > 0) {
			queryParams.append('type_id', `${type_id}`);
		}
		if (name && name.length > 0) {
			queryParams.append('name', name);
		}
		const response = await api.get(`/locations?${queryParams}`);
		return response.data as { data: CustomLocation[] };
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
