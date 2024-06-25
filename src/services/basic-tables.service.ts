import { GridSortItem } from '@mui/x-data-grid';
import { BasicTable } from '../models/basic-table';
import { SortParam } from '../models/pagination';
import api from './api.config';

export const listBasicTable = async (params: {
	tableName: string;
	name: string;
	limit: number;
	offset: number;
	sortingParams?: SortParam[];
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
		queryParams.append('offset', `${offset * limit}`);
		if (name && name.length > 0) {
			queryParams.append('name', name);
		}
		if (params.sortingParams) {
			params.sortingParams.forEach((sortItem) => {
				queryParams.append('sort', `${sortItem.field},${sortItem.sort}`);
			});
		}
		const response = await api.get(`/basic-tables?${queryParams}`);
		return response.data.data as { id: number; name: string }[];
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const listBasicTableWithPagination = async (params: {
	tableName: string;
	name: string;
	limit: number;
	offset: number;
	sortingParams?: GridSortItem[];
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
		queryParams.append('offset', `${offset * limit}`);
		if (name && name.length > 0) {
			queryParams.append('name', name);
		}
		if (params.sortingParams) {
			params.sortingParams.forEach((sortItem) => {
				queryParams.append('sort', `${sortItem.field},${sortItem.sort}`);
			});
		}
		const response = await api.get(`/basic-tables?${queryParams}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const createBasicTable = async (params: {
	tableName: string;
	data: BasicTable;
}) => {
	try {
		const response = await api.post(`/basic-tables/${params.tableName}`, {
			name: params.data.name
		});
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const updateBasicTable = async (params: {
	tableName: string;
	data: BasicTable;
}) => {
	try {
		const response = await api.patch(
			`/basic-tables/${params.tableName}/${params.data.id}`,
			{
				name: params.data.name
			}
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const deleteBasicTable = async (params: {
	tableName: string;
	id: number;
}) => {
	try {
		const response = await api.delete(
			`/basic-tables/${params.tableName}/${params.id}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
