import api from './api.config';

export const listBasicTable = async (params: {
	tableName: string;
	name: string;
	limit: number;
	offset: number;
}) => {
	try {
		const { tableName, name, limit, offset } = params;
		if (!tableName) {
			// empty values
			return [];
		}
		const queryParams = new URLSearchParams();
		queryParams.append('table_name', tableName);
		queryParams.append('limit', `${limit}`);
		queryParams.append('offset', `${offset}`);
		if (name && name.length > 0) {
			queryParams.append('name', name);
		}
		const response = await api.get(`/basic-tables?${queryParams}`);
		return response.data.data as { id: number; name: string }[];
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
