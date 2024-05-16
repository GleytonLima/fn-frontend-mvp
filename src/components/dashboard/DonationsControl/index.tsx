import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import React from 'react';

const DonationsControl: React.FC = () => {
	// Calcula os nomes dos últimos 5 meses
	const lastFiveMonths = Array.from({ length: 5 }, (_, i) => {
		const d = new Date();
		d.setMonth(d.getMonth() - i);
		return d.toLocaleString('default', { month: 'long' }); // Formato: nome do mês
	}).reverse(); // Inverte a ordem para começar pelo mês mais antigo

	const option: EChartsOption = {
		title: { text: 'Controle Mensal de Doações (R$)' },
		xAxis: {
			type: 'category',
			data: lastFiveMonths,
			axisLabel: {
				rotate: 45,
				interval: 0
			}
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: function (value) {
					return value.toLocaleString('de-DE');
				}
			}
		},
		series: [{ data: [5000, 3000, 4000, 3500, 4200], type: 'line' }]
	};

	return <ReactECharts option={option} />;
};

export default DonationsControl;
