import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import React from 'react';

const MedicinesAndSuppliesUsage: React.FC = () => {
	const option: EChartsOption = {
		title: { text: 'Medicamentos/Insumos Mais Utilizados' },
		tooltip: { trigger: 'axis' },
		xAxis: {
			type: 'category',
			data: [
				'Kits de Primeiros Socorros',
				'Soro Fisiológico',
				'Hipoclorito de Sódio',
				'Ataduras'
			],
			axisLabel: {
				rotate: -45,
				interval: 0,
				fontSize: 10
			}
		},
		yAxis: { type: 'value' },
		series: [
			{
				data: [150, 120, 100, 80], // Quantidade de uso de cada medicamento ou insumo relacionado a enchentes
				type: 'bar',
				itemStyle: {
					color: () => {
						return '#52c41a'; // Verde para destacar
					}
				}
			}
		]
	};

	return <ReactECharts option={option} />;
};

export default MedicinesAndSuppliesUsage;
