import Skeleton from '@mui/material/Skeleton';
import Typography, { TypographyProps } from '@mui/material/Typography';

export function TypographySkeleton(props: { type: string }) {
	const { type } = props;

	return (
		<div>
			<Typography
				component="div"
				key={type}
				variant={type as TypographyProps['variant']}
			>
				<Skeleton />
			</Typography>
		</div>
	);
}
