import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import React from 'react';

const RegionalComparison: React.FC = () => {
	const option: EChartsOption = {
		title: { text: 'Comparação de Atendimentos por Região' },
		tooltip: { trigger: 'axis' },
		legend: {
			top: '10%',
			type: 'scroll',
			orient: 'horizontal',
			right: 10,
			bottom: 0,
			data: ['Emergências', 'Consultas', 'Cirurgias', 'Outros']
		},
		xAxis: {
			type: 'category',
			data: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
			axisLabel: {
				rotate: 45,
				interval: 0
			}
		},
		yAxis: { type: 'value' },
		series: [
			{ name: 'Emergências', type: 'bar', data: [120, 200, 150, 80, 70] },
			{ name: 'Consultas', type: 'bar', data: [100, 150, 120, 180, 190] },
			{ name: 'Cirurgias', type: 'bar', data: [90, 120, 100, 140, 130] },
			{ name: 'Outros', type: 'bar', data: [60, 80, 70, 110, 90] }
		]
	};

	return <ReactECharts option={option} />;
};

export default RegionalComparison;
