import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { MissaoTipo } from '../../models/missao';
import { listarMissoesTipos } from '../../services/missoes.service';

export interface MisaoTipoDropdownProps {
	fieldState: ControllerFieldState;
	onChange: (value: MissaoTipo | null) => void;
	value?: MissaoTipo | null;
}

export default function MissaoTipoDropdown({
	fieldState,
	onChange,
	value
}: MisaoTipoDropdownProps) {
	const [missoes, setMissoes] = useState<MissaoTipo[]>([]);
	useEffect(() => {
		listarMissoesTipos().then((missoesRetornadas) => {
			console.log('Fim da requisição de missoes', missoesRetornadas);
			setMissoes(missoesRetornadas);
		});
	}, []);
	return (
		<Autocomplete
			options={missoes}
			fullWidth
			value={value}
			getOptionLabel={(option) => option.nome}
			onChange={(_, newValue) => onChange(newValue)}
			renderInput={(params) => (
				<TextField
					{...params}
					inputProps={{
						...params.inputProps,
						autoComplete: 'new-password'
					}}
					fullWidth
					label="Filtrar por Tipos de Missão"
					variant="outlined"
					error={!!fieldState?.error?.message}
					helperText={fieldState?.error?.message}
				/>
			)}
		/>
	);
}
