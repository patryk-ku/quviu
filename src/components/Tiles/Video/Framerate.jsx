import { useSettings } from '../../../contexts/SettingsContext';
import NumberSelectInput from '../NumberSelectInput';
import Tile from '../Tile';

const fpsOptions = [
	{ value: '24', label: '24' },
	{ value: '25', label: '25' },
	{ value: '29.97', label: '29.97' },
	{ value: '30', label: '30' },
	{ value: '50', label: '50' },
	{ value: '59.94', label: '59.94' },
	{ value: '60', label: '60' },
];

export default function Framerate() {
	const { settings, updateSettings } = useSettings();

	return (
		<Tile option='video' suboption='framerate' title={'Change frame rate'}>
			<div className='grid grid-cols-[max-content_1fr] items-center gap-2 text-sm'>
				<span>FPS:</span>
				<NumberSelectInput
					label='FPS:'
					options={fpsOptions}
					value={settings.video.framerate.fps}
					onChange={(v) => {
						console.log(v);
						updateSettings('video', 'framerate', 'fps', v);
					}}
				/>
			</div>
		</Tile>
	);
}
