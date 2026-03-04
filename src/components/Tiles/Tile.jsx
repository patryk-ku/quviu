import { Card, CardBody, CardHeader, Checkbox } from '@heroui/react';
import { useSettings } from '../../contexts/SettingsContext';

export default function Tile({ title, children, option, suboption, icon }) {
	const { settings, updateSettings } = useSettings();
	const enabled = settings[option][suboption].enabled;

	const handleToggle = () => {
		updateSettings(option, suboption, 'enabled', !enabled);
	};

	return (
		<Card
			// className={enabled ? 'ring-2 ring-primary-200' : ''}
			className='min-h-[164px]'
			// isPressable={!enabled}
			// onPress={handleToggle}
		>
			<CardHeader>
				<Checkbox
					size='lg'
					isSelected={enabled}
					onValueChange={handleToggle}
					className='pr-3'
				>
					{title}
				</Checkbox>
			</CardHeader>
			<CardBody className={enabled ? 'visible' : 'invisible'}>
				<div className='grid gap-2'>{children}</div>
				{icon && <div className='flex place-content-center text-default-300'>{icon}</div>}
			</CardBody>
		</Card>
	);
}
