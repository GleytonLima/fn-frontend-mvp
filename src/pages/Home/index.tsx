import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Container,
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainBar from '../../components/Commons/Header';

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<>
			<MainBar />
			<Container>
				<br />
				<Typography variant="h4" gutterBottom>
					Força Nacional do SUS (FN-SUS)
				</Typography>

				<Accordion defaultExpanded>
					<AccordionSummary expandIcon={<ArrowDropDownIcon />}>
						<Typography variant="h5">1. Introdução</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							A Força Nacional do Sistema Único de Saúde (FN-SUS), instituída
							pelo Decreto nº 7.616/2011, é um programa de cooperação que visa
							fortalecer a capacidade de resposta do SUS em situações de
							emergência em saúde pública, desastres e desassistência à
							população, conduzindo suas atividades segundo os princípios de
							equidade, integralidade e universalidade, buscando atender às
							necessidades de saúde da população de forma justa e abrangente.
						</Typography>
						<br />
						<Typography>
							A FN-SUS contribui com o território afetado com ações preventivas
							(como educação em saúde e controle de vetores), orientações
							técnicas, ações de busca ativa e monitoramento de pacientes,
							atendimentos, liberação de medicamentos, apoio psicossocial
							(incluindo avaliação, acompanhamento e tratamento de transtornos
							mentais e emocionais) e apoio na reconstrução da rede de atenção à
							saúde local, dependendo do nível de resposta que a situação exija.
						</Typography>
						<br />
						<Typography>
							Exemplos de Situações Elegíveis para atuação da FN-SUS:
							<ul>
								<li>Eventos de massa: Jogos Olímpicos, Copa do Mundo, etc.</li>
								<li>
									Desastres naturais: Enchentes, deslizamentos, terremotos, etc.
								</li>
								<li>
									Emergências epidemiológicas: Surtos e epidemias de doenças
									infecciosas, como Dengue, Zika, Covid-19, etc.
								</li>
								<li>
									Acidentes e tragédias: Acidentes industriais, incêndios,
									desabamentos, etc.
								</li>
								<li>
									Situações de desassistência: Falta de acesso a serviços de
									saúde em áreas remotas ou vulneráveis.
								</li>
								<li>
									Situações de conflito e crise humanitária: Atendimento a
									refugiados e deslocados internos.
								</li>
							</ul>
						</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion defaultExpanded>
					<AccordionSummary expandIcon={<ArrowDropDownIcon />}>
						<Typography variant="h5">2. Definições</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<List>
							<ListItem>
								<ListItemText
									primary="Emergência em Saúde Pública de Importância Nacional (ESPIN)"
									secondary="Situação que exige medidas urgentes de prevenção, controle e contenção de riscos à saúde pública em nível nacional, como surtos, epidemias, desastres ou desassistência à população. A ESPIN é declarada pelo Ministro da Saúde, após análise de recomendações e requerimentos, conforme o Artigo 4º do Decreto nº 7.616/2011 e o Artigo 2º da Portaria nº 2.952."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Desastre"
									secondary="Evento que resulta em danos à saúde pública e exige resposta imediata do sistema de saúde, como reconhecido pelo poder executivo federal (Artigo 2º, inciso II, da Portaria nº 2.952)."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Desassistência"
									secondary="Situação em que a população tem acesso insuficiente aos serviços de saúde, necessitando de intervenção emergencial, sendo reconhecida por decretos de emergência ou calamidade pública (Artigo 2º, inciso III, da Portaria nº 2.952)."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Níveis de Resposta"
									secondary="Graus de complexidade da emergência, que determinam o tipo e intensidade da resposta da FN-SUS, variando do nível I (monitoramento e orientação) ao nível IV (recursos extraordinários), conforme o Artigo 12 da Portaria nº 2.952."
								/>
							</ListItem>
						</List>
					</AccordionDetails>
				</Accordion>

				<Accordion defaultExpanded>
					<AccordionSummary expandIcon={<ArrowDropDownIcon />}>
						<Typography variant="h5">3. Etapas do Acionamento</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<List>
							<ListItem>
								<ListItemText
									primary="Reconhecimento da Crise"
									secondary="O Ministério da Saúde (MS), em conjunto com autoridades estaduais e municipais, reconhece a situação como crise e a necessidade de acionar a FN-SUS, seguindo os critérios do Artigo 3º da Portaria nº 2.952."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Comunicação e Alerta"
									secondary="O MS informa todas as partes interessadas (autoridades de saúde, Defesa Civil, etc.) sobre a crise e a possível necessidade de acionamento da FN-SUS, garantindo que todos estejam preparados para a mobilização."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Solicitação Formal"
									secondary="O estado ou município afetado, após decretar situação de emergência ou calamidade, solicita formalmente o apoio da FN-SUS ao MS, conforme o Artigo 3º da Portaria nº 2.952."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Avaliação Preliminar"
									secondary="A FN-SUS envia uma equipe para avaliar a situação, utilizando critérios como riscos à saúde, vulnerabilidades da população, danos à infraestrutura e capacidades locais de resposta. A partir dessa avaliação, define-se o nível de resposta adequado, em consonância com o Artigo 9º da Portaria nº 2.952."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Convocação e Mobilização"
									secondary="O MS convoca e mobiliza os profissionais e recursos necessários para a resposta, de acordo com o nível de resposta definido e as diretrizes do Artigo 6º da Portaria nº 2.952."
								/>
							</ListItem>
						</List>
					</AccordionDetails>
				</Accordion>

				<Accordion defaultExpanded>
					<AccordionSummary expandIcon={<ArrowDropDownIcon />}>
						<Typography variant="h5">4. Níveis de Resposta</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<List>
							<ListItem>
								<ListItemText
									primary="Nível I"
									secondary="Monitoramento da situação, orientação técnica à distância e envio de insumos básicos."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Nível II"
									secondary="Monitoramento, orientação técnica, envio de profissionais de saúde para suporte básico e avançado."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Nível III"
									secondary="Monitoramento, orientação técnica, envio de profissionais de saúde e instalação de Hospital de Campanha (HCAMP) com capacidade para UTI e cirurgias."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Nível IV"
									secondary="Para situações de excepcional gravidade, com a mobilização de recursos extraordinários e a realização de intervenções de alta complexidade, como cirurgias de grande porte, tratamentos especializados e apoio psicossocial intensivo."
								/>
							</ListItem>
						</List>
					</AccordionDetails>
				</Accordion>

				<Accordion defaultExpanded>
					<AccordionSummary expandIcon={<ArrowDropDownIcon />}>
						<Typography variant="h5">5. Estrutura da FN-SUS</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<List>
							<ListItem>
								<ListItemText
									primary="Comitê Gestor (CG/FN-SUS)"
									secondary="Responsável por coordenar e definir as estratégias de atuação da FN-SUS, incluindo diretrizes de seleção, treinamento e mobilização de profissionais (Artigo 9º da Portaria nº 2.952)."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Grupo de Resposta (GR/FN-SUS)"
									secondary="Responsável pela execução das ações de resposta em campo, em articulação com autoridades locais e parceiros, planejando, coordenando e monitorando as atividades (Artigo 11 da Portaria nº 2.952)."
								/>
							</ListItem>
						</List>
					</AccordionDetails>
				</Accordion>

				<Accordion defaultExpanded>
					<AccordionSummary expandIcon={<ArrowDropDownIcon />}>
						<Typography variant="h5">6. Recursos</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<List>
							<ListItem>
								<ListItemText
									primary="Articulação Intersetorial"
									secondary="A FN-SUS atua em colaboração com outras áreas do governo e organizações parceiras, como Defesa Civil, Assistência Social e organizações não governamentais (ONGs) (Artigo 8º da Portaria nº 2.952)."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Profissionais de Saúde"
									secondary="Médicos (generalistas, intensivistas, infectologistas, etc.), enfermeiros, técnicos de enfermagem, especialistas em saúde pública, epidemiologia, saneamento, saúde mental, entre outros (Artigo 15 do Decreto nº 7.616)."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Logística"
									secondary="Profissionais de logística, transporte, comunicação e outras áreas de apoio (Artigo 13, inciso VII, do Decreto nº 7.616)."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Voluntários"
									secondary="Profissionais de saúde e outras áreas que se voluntariam para atuar em situações de emergência (Artigo 15, inciso V, do Decreto nº 7.616)."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Hospitais de Campanha"
									secondary="Unidades móveis equipadas para atendimento em áreas afetadas (Artigo 12 da Portaria nº 2.952)."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Kits de Medicamentos e Insumos"
									secondary="Conjuntos padronizados de medicamentos e insumos básicos para atendimento em emergências, definidos pela Portaria nº 74 de 2009."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Veículos e Equipamentos"
									secondary="Ambulâncias, veículos de transporte, equipamentos de comunicação, entre outros (necessidade identificada na avaliação preliminar)."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Recursos Financeiros"
									secondary="Alocação de recursos financeiros para custear as ações da FN-SUS, incluindo o Fundo Nacional de Saúde (Artigo 13 da Portaria nº 2.952)."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Forças Armadas"
									secondary="Em situações que demandem, a FN-SUS poderá solicitar apoio das Forças Armadas para logística, transporte e segurança, mediante autorização do Presidente da República (Artigo 18 do Decreto nº 7.616/2011)."
								/>
							</ListItem>
						</List>
					</AccordionDetails>
				</Accordion>

				<Accordion defaultExpanded>
					<AccordionSummary expandIcon={<ArrowDropDownIcon />}>
						<Typography variant="h5">8. Princípios e Diretrizes</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<List>
							<ListItem>
								<ListItemText
									primary="Comunicação Interna"
									secondary="Manter comunicação clara e constante entre os membros da equipe e os diferentes níveis de gestão, utilizando ferramentas como rádio, telefone, aplicativos de mensagens, etc."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Comunicação Externa"
									secondary="Informar a população sobre as ações da FN-SUS, riscos à saúde, medidas de prevenção e outras informações relevantes, utilizando linguagem acessível e meios de comunicação adequados ao contexto local, como rádio comunitária, carros de som, cartazes, etc. (Artigo 10, §1º, inciso IV, do Decreto nº 7.616)."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Transparência"
									secondary="Prestar contas das ações e recursos utilizados à sociedade."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Monitoramento Contínuo"
									secondary="Acompanhar a evolução da emergência, o impacto das ações e a necessidade de ajustes na resposta (Artigo 11, inciso I, da Portaria nº 2.952)."
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText
									primary="Avaliação Pós-Emergência"
									secondary="Avaliar os resultados das ações da FN-SUS, identificando lições aprendidas e aprimorando o protocolo para futuras atuações. A avaliação deve incluir a análise de indicadores de saúde, como taxas de morbidade e mortalidade, cobertura de serviços, impacto das intervenções, gestão de recursos e pesquisas de satisfação com a população."
								/>
							</ListItem>
						</List>
					</AccordionDetails>
				</Accordion>

				<Accordion defaultExpanded>
					<AccordionSummary expandIcon={<ArrowDropDownIcon />}>
						<Typography variant="h5">10. Considerações Finais</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Este protocolo visa garantir uma resposta rápida, eficiente e
							coordenada em situações de emergência em saúde pública, desastres
							e desassistência, protegendo a saúde da população e salvando
							vidas. A FN-SUS se baseia nos princípios de equidade,
							integralidade e universalidade do SUS, buscando atender às
							necessidades de saúde da população de forma justa e abrangente.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<br />
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate('/voluntarios')}
				>
					Ir para listagem de voluntários
				</Button>
			</Container>
			<br />
		</>
	);
};

export default HomePage;
