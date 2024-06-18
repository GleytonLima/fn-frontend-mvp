import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import React from 'react';

const DailyAttendances: React.FC = () => {
	// Calcula as datas da última semana
	const lastWeekDates = Array.from({ length: 7 }, (_, i) => {
		const d = new Date();
		d.setDate(d.getDate() - i);
		return `${d.getDate()}/0${d.getMonth() + 1}`; // Formato: dia/mês
	}).reverse(); // Inverte a ordem para começar pela data mais antiga

	const option: EChartsOption = {
		title: { text: 'Quantidade de Atendimentos por Dia' },
		tooltip: { trigger: 'axis' },
		xAxis: {
			type: 'category',
			data: lastWeekDates,
			axisLabel: {
				rotate: 45,
				interval: 0
			}
		},
		yAxis: { type: 'value' },
		series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'bar' }]
	};

	return <ReactECharts option={option} />;
};

export default DailyAttendances;
