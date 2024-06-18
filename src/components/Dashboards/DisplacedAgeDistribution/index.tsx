import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import React from 'react';

const DisplacedAgeDistribution: React.FC = () => {
	const option: EChartsOption = {
		title: { text: 'Desabrigados por faixa etária' },
		tooltip: { trigger: 'axis' },
		xAxis: {
			type: 'category',
			data: ['0-10', '11-20', '21-30', '31-40', '41-50', '51+'],
			axisLabel: {
				rotate: 45,
				interval: 0
			}
		},
		yAxis: { type: 'value' },
		series: [{ data: [120, 200, 150, 80, 70, 110], type: 'bar' }]
	};

	return <ReactECharts option={option} />;
};

export default DisplacedAgeDistribution;
