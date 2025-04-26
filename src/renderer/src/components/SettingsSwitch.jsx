import { Collapse, Switch } from '@mantine/core';

export default function SettingsSwitch({ children, condition, option, setOption, label, help }) {
	return (
		<div
			className={`max-w-fit rounded-lg border transition-all ${option[condition] ? 'app-background-alt my-1 border-(--tab-border-color)' : 'border-(--mantine-color-body)'}`}
		>
			<div className='flex items-center justify-between'>
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
				<div className={option[condition] ? '' : 'invisible'}>{help}</div>
				{/* {help} */}
			</div>
			<Collapse in={option[condition]}>
				<div className='mt-2.5 ml-12 grid gap-2'>{children}</div>
			</Collapse>
		</div>
	);
}
