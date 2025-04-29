import { Switch } from '@mantine/core';

export default function SimpleSwitch({ label, description, checked, onChange, disabled }) {
	return (
		<div className='max-w-fit'>
			<Switch
				label={label}
				radius='md'
				checked={checked}
				onChange={onChange}
				description={description}
				disabled={disabled}
				className='m-[2px]'
				classNames={{ label: 'font-bold' }}
			/>
		</div>
	);
}
