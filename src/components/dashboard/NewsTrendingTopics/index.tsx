import { List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

interface Tweet {
	user: string;
	date: string;
	content: string;
}

const NewsTrendingTopics: React.FC = () => {
	const tweets: Tweet[] = [
		{
			user: '@user1',
			date: '2h',
			content: 'Inundações afetam milhares #inundação #clima'
		},
		{
			user: '@user2',
			date: '1h',
			content: 'Risco de rompimento de outra barragem #barragem #risco'
		},
		{
			user: '@user3',
			date: '3h',
			content: 'Vídeo mostra pessoas sendo resgatadas #resgate #video'
		}
	]; // Dados fictícios

	return (
		<div>
			<Typography variant="h6">Trending Topics de Notícias</Typography>
			<List>
				{tweets.map((tweet, index) => (
					<ListItem key={index}>
						<ListItemText
							primary={tweet.content}
							secondary={`${tweet.user} • ${tweet.date}`}
						/>
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default NewsTrendingTopics;
