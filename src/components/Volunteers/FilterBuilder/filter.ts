export type FilterFieldType = {
	field: string;
	operator: string; // 'equals', 'contains', etc.
	value: { id: number; name: string } | null;
};

export type FilterGroupType = {
	operator: 'AND' | 'OR';
	filters: (FilterFieldType | FilterGroupType)[];
};
