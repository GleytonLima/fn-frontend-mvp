import { BasicTable } from './basic-table';
import { CustomLocation } from './location';

export type Volunteer = {
	id: number;
	name: string;
	location: CustomLocation;
	volunteer_degree: { degree: BasicTable }[];
	volunteer_language: { language: BasicTable }[];
	volunteer_postgraduate_degree: { postgraduate_degree: BasicTable }[];
	email: string;
};
