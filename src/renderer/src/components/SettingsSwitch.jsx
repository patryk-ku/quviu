import { Collapse, Switch } from '@mantine/core';

export default function SettingsSwitch({ children, condition, option, setOption, label }) {
	return (
		<div
			className={`max-w-fit rounded border transition-all ${option[condition] ? 'my-1 border-[--tab-border-color] bg-[--mantine-color-dark-6]' : 'border-[--mantine-color-dark-7]'}`}
		>
			<Switch
				label={label}
				radius='sm'
				checked={option[condition]}
				onChange={(event) => {
					setOption((prev) => ({
						...prev,
						[condition]: event.target.checked,
					}));
				}}
				classNames={{ label: 'font-bold' }}
			/>
			<Collapse in={option[condition]}>
				<div className='mt-2 ml-12 grid gap-1.5'>{children}</div>
			</Collapse>
		</div>
	);
}
