import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import React from 'react';

const GeographicalDistribution: React.FC = () => {
	const option: EChartsOption = {
		title: { text: 'Distribuição Geográfica dos Atendimentos' },
		tooltip: { trigger: 'axis' },
		xAxis: {
			type: 'category',
			data: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
			axisLabel: {
				rotate: 45,
				interval: 0
			}
		},
		yAxis: { type: 'value' },
		series: [{ data: [320, 240, 150, 400, 250], type: 'bar' }]
	};

	return <ReactECharts option={option} />;
};

export default GeographicalDistribution;
