import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import React from 'react';

const VulnerablePopulationMonitor: React.FC = () => {
	const option: EChartsOption = {
		title: { text: 'População Vulnerável por Região' },
		tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
		legend: {
			top: '10%',
			type: 'scroll',
			orient: 'horizontal',
			right: 10,
			bottom: 0,
			data: [
				'Gestantes',
				'Hemodiálise',
				'Oncologia',
				'Fisioterapia',
				'Necessidades especiais',
				'Idosos',
				'Crianças'
			]
		},
		xAxis: { type: 'category', data: ['Todas Regiões'] },
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: function (value) {
					return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
				}
			}
		},
		series: [
			{ name: 'Gestantes', type: 'bar', data: [320] },
			{ name: 'Hemodiálise', type: 'bar', data: [220] },
			{ name: 'Oncologia', type: 'bar', data: [150] },
			{ name: 'Fisioterapia', type: 'bar', data: [200] },
			{ name: 'Necessidades especiais', type: 'bar', data: [98] },
			{ name: 'Idosos', type: 'bar', data: [900] },
			{ name: 'Crianças', type: 'bar', data: [180] }
		],
		stack: 'total'
	};

	return <ReactECharts option={option} />;
};

export default VulnerablePopulationMonitor;
