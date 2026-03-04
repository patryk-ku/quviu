import { Input, Switch } from '@heroui/react';
import { useSettings } from '../../../contexts/SettingsContext';
import OptionSelect from '../OptionSelect';
import Tile from '../Tile';

const subs = [
	{ key: '0', label: '0: EN' },
	{ key: '1', label: '1: ES' },
	{ key: '2', label: '2: JP' },
	{ key: '3', label: '3: KR' },
];

export default function Hardsubs() {
	const { settings, updateSettings } = useSettings();

	return (
		<Tile option='video' suboption='hardsubs' title={'Hardcode subs'}>
			<div className='grid grid-cols-1 items-center gap-2 text-sm'>
				<Switch
					size='sm'
					isSelected={settings.video.hardsubs.fromCurrent}
					onValueChange={() => {
						updateSettings(
							'video',
							'hardsubs',
							'fromCurrent',
							!settings.video.hardsubs.fromCurrent
						);
					}}
				>
					from current video
				</Switch>
				{settings.video.hardsubs.fromCurrent ? (
					<OptionSelect
						name='stream'
						label='Stream:'
						selectedKeys={[settings.video.hardsubs.stream]}
						onChange={(v) =>
							updateSettings('video', 'hardsubs', 'stream', v.target.value)
						}
						items={subs}
						withLabel
					/>
				) : (
					<Input
						label='Path:'
						value={settings.video.hardsubs.path}
						onValueChange={(v) => {
							updateSettings('video', 'hardsubs', 'path', v);
						}}
					/>
				)}
			</div>
		</Tile>
	);
}
