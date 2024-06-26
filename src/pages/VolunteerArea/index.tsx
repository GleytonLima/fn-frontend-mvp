import CommunicationList, {
	Communication
} from '../../components/Commons/CommunicationList';
import EventCalendar from '../../components/Commons/EventCalendar';
import MainBar from '../../components/Commons/Header';
import VolunteerArea from '../../components/Volunteers/VolunteerArea';
import VolunteerTasks from '../../components/Volunteers/VolunteerTasks';
import VolunteerTeamsAndMissions from '../../components/Volunteers/VolunteerTeamsAndMissions';

export const VolunteerAreaPage = () => {
	const exampleTasks = [
		{
			id: 1,
			description: 'Distribuir alimentos na comunidade',
			status: 'Em andamento',
			priority: 1,
			dueDate: '2024-07-01T10:00:00'
		},
		{
			id: 2,
			description: 'Organizar reunião de planejamento',
			status: 'Pendente',
			priority: 2,
			dueDate: '2024-07-05T14:00:00'
		},
		{
			id: 3,
			description: 'Elaborar relatório mensal',
			status: 'Concluída',
			priority: 3,
			dueDate: '2024-06-30T23:59:59'
		}
	];
	const exampleCommunications = [
		{
			id: 1,
			title: 'Atualização da Missão 05/2024',
			message:
				'Informamos que a distribuição de alimentos será realizada no próximo sábado, às 10h, no centro comunitário. Fiquem atentos às tarefas atribuídas!',
			dateTime: '2024-07-01T09:00:00',
			communicationType: 'mission'
		},
		{
			id: 2,
			title: 'Reunião de Equipe',
			message:
				'Lembrete: Nossa reunião mensal de equipe será realizada amanhã às 14h via Google Meet.',
			dateTime: '2024-07-04T15:30:00',
			communicationType: 'team'
		},
		{
			id: 3,
			title: 'Parabéns pelo seu trabalho!',
			message:
				'Gostaríamos de parabenizá-lo pelo excelente trabalho realizado no último evento. Sua dedicação fez toda a diferença!',
			dateTime: '2024-07-02T11:45:00',
			communicationType: 'individual'
		}
	] as Communication[];

	const exampleEvents = [
		{
			id: 1,
			title: 'Distribuição de Alimentos',
			description:
				'Distribuição mensal de alimentos para famílias necessitadas.',
			dateTime: '2024-07-15T10:00:00',
			eventType: 'Atividade',
			location: 'Centro Comunitário'
		},
		{
			id: 2,
			title: 'Treinamento de Primeiros Socorros',
			description: 'Curso básico de primeiros socorros para voluntários.',
			dateTime: '2024-07-20T14:00:00',
			eventType: 'Treinamento',
			eventLink: 'https://meet.google.com'
		},
		{
			id: 3,
			title: 'Reunião de Planejamento',
			description: 'Reunião mensal para discutir as próximas atividades.',
			dateTime: '2024-07-10T19:00:00',
			eventType: 'Reunião',
			location: 'Sede da ONG'
		}
	];
	const exampleMissionTeams = [
		{
			missionId: 1,
			missionName: 'Missão 05/2024 - Rio Grande do Sul',
			teamId: 1,
			teamName: 'Equipe de Logística',
			specificObjectives:
				'Organizar a distribuição de alimentos para 100 famílias carentes.',
			location: 'Centro Comunitário do Bairro X',
			messagingPlatformLink: 'https://chat.whatsapp.com/ClxcIs8oopsEzVFQrUDsfN'
		}
	];

	return (
		<>
			<MainBar />
			<VolunteerArea />
			<VolunteerTasks tasks={exampleTasks} />
			<VolunteerTeamsAndMissions missionTeams={exampleMissionTeams} />
			<CommunicationList communications={exampleCommunications} />
			<EventCalendar events={exampleEvents} />
		</>
	);
};
