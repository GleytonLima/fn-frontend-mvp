import * as React from 'react';
import { IMaskInput } from 'react-imask';

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
	function TextMaskCustom(props, ref) {
		const { onChange, ...other } = props;
		return (
			<IMaskInput
				{...other}
				mask="(00) #0000-0000"
				definitions={{
					'#': /[1-9]/
				}}
				inputRef={ref}
				onAccept={(value) => onChange({ target: { name: props.name, value } })}
				overwrite
			/>
		);
	}
);

export default TextMaskCustom;
