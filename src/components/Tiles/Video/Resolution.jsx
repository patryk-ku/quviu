import { useSettings } from '../../../contexts/SettingsContext';
import NumberSelectInput from '../NumberSelectInput';
import Tile from '../Tile';

const resolutions = [
	{ value: '240', label: '240p' },
	{ value: '360', label: '360p' },
	{ value: '480', label: '480p' },
	{ value: '720', label: '720p' },
	{ value: '1080', label: '1080p' },
	{ value: '1440', label: '2K' },
	{ value: '2160', label: '4K' },
];

export default function Resolution() {
	const { settings, updateSettings } = useSettings();

	return (
		<Tile option='video' suboption='resize' title={'Change resolution'}>
			<div className='grid grid-cols-[max-content_1fr] items-center gap-2 text-sm'>
				<span>Height:</span>
				<NumberSelectInput
					label='Height:'
					options={resolutions}
					value={settings.video.resize.resolution}
					onChange={(v) => {
						console.log(v);
						updateSettings('video', 'resize', 'resolution', v);
					}}
				/>
			</div>
		</Tile>
	);
}
