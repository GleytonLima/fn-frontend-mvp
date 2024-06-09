import { BasicTable } from './basic-table';

export type Volunteer = {
	id: number;
	full_name: string;
	volunteer_degree: { degree: BasicTable }[];
	volunteer_postgraduate_degree: { postgraduate_degree: BasicTable }[];
	email: string;
};
