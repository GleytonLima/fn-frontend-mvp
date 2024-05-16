import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import { CallbackDataParams } from 'echarts/types/dist/shared.js';
import React from 'react';

const ShelterStatus: React.FC = () => {
	const option: EChartsOption = {
		title: { text: 'Recursos nos Abrigos' },
		tooltip: { trigger: 'axis' },
		xAxis: {
			type: 'category',
			data: ['Água', 'Alimento', 'Assistência', 'Higiene'],
			axisLabel: {
				rotate: 45,
				interval: 0
			}
		},
		yAxis: { type: 'value' },
		series: [
			{
				name: 'Situação',
				type: 'bar',
				data: [50, 310, 234, 135],
				itemStyle: {
					color: function (params: CallbackDataParams) {
						const value: number = params.value as number;
						// Cores baseadas no valor
						if (value < 100) return '#f5222d'; // Vermelho para "crítico"
						if (value < 200) return '#fa8c16'; // Laranja para "baixo"
						return '#52c41a'; // Verde para "suficiente"
					}
				}
			}
		]
	};

	return <ReactECharts option={option} />;
};

export default ShelterStatus;
