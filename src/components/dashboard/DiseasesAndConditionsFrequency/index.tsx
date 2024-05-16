import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import React from 'react';

const DiseasesAndConditionsFrequency: React.FC = () => {
	const option: EChartsOption = {
		title: { text: 'Doenças Mais Frequentes' },
		tooltip: { trigger: 'axis' },
		xAxis: {
			type: 'category',
			data: ['Diarreia', 'Leptospirose', 'Dermatite', 'Hepatite A'],
			axisLabel: {
				rotate: 45,
				interval: 0
			}
		},
		yAxis: { type: 'value' },
		series: [
			{
				data: [120, 80, 60, 30], // Quantidade de ocorrências de cada doença relacionada a enchentes
				type: 'bar',
				itemStyle: {
					color: () => {
						return '#ff7a45'; // Laranja para destacar
					}
				}
			}
		]
	};

	return <ReactECharts option={option} />;
};

export default DiseasesAndConditionsFrequency;
