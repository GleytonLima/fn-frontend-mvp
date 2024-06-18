import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import React from 'react';

const AttendancesByType: React.FC = () => {
	const option: EChartsOption = {
		title: { text: 'Atendimentos por Tipo' },
		tooltip: { trigger: 'axis' },
		xAxis: {
			type: 'category',
			data: ['Emergências', 'Consultas', 'Cirurgias', 'Outros'],
			axisLabel: {
				rotate: 45,
				interval: 0
			}
		},
		yAxis: { type: 'value' },
		series: [
			{
				data: [120, 200, 150, 80],
				type: 'bar',
				itemStyle: {
					color: () => {
						return '#52c41a'; // Verde para "suficiente"
					}
				}
			}
		]
	};

	return <ReactECharts option={option} />;
};

export default AttendancesByType;
