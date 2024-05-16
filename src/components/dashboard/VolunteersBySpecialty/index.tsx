import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import React from 'react';

const VolunteersBySpecialty: React.FC = () => {
	const option: EChartsOption = {
		title: { text: 'Voluntários por Especialidade' },
		tooltip: { trigger: 'axis' },
		xAxis: {
			type: 'category',
			data: ['Medicina', 'Enfermagem', 'Sanitarista', 'Condução', 'Psicologia'],
			axisLabel: {
				rotate: 45,
				interval: 0
			}
		},
		yAxis: { type: 'value' },
		series: [
			{
				data: [120, 380, 1500, 250, 250], // Substitua por seus dados
				type: 'bar'
			}
		]
	};

	return <ReactECharts option={option} />;
};

export default VolunteersBySpecialty;
