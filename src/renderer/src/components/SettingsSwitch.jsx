import { Switch, Collapse } from '@mantine/core';

export default function SettingsSwitch({ children, condition, option, setOption, label }) {
	return (
		<div
			className={`max-w-fit rounded border transition-all ${option[condition] ? 'my-1 border-[--tab-border-color] bg-[--mantine-color-dark-8]' : 'border-[--mantine-color-dark-7]'}`}
		>
			<Switch
				label={label}
				radius='sm'
				checked={option[condition]}
				onChange={(event) => {
					setOption((prev) => ({
						...prev,
						[condition]: event.currentTarget.checked,
					}));
				}}
			/>
			<Collapse in={option[condition]}>
				<div className='mt-2 flex gap-2'>{children}</div>
			</Collapse>
		</div>
	);
}
