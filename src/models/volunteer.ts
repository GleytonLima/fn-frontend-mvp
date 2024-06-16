import { BasicTable } from './basic-table';
import { CustomLocation } from './location';

export type Volunteer = {
	id: number;
	full_name: string;
	location: CustomLocation;
	volunteer_degree: { degree: BasicTable }[];
	volunteer_postgraduate_degree: { postgraduate_degree: BasicTable }[];
	email: string;
};
