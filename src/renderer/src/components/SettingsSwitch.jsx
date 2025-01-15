import { Collapse, Switch } from '@mantine/core';

export default function SettingsSwitch({ children, condition, option, setOption, label }) {
	return (
		<div
			className={`max-w-fit rounded-lg border transition-all ${option[condition] ? 'app-background-alt my-1 border-[--tab-border-color]' : 'border-[--mantine-color-body]'}`}
		>
			<Switch
				label={label}
				radius='md'
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
