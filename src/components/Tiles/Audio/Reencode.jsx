import { useSettings } from '../../../contexts/SettingsContext';
import NumberSelectInput from '../NumberSelectInput';
import OptionSelect from '../OptionSelect';
import Tile from '../Tile';

export const codecs = [
	{ key: 'opus', label: 'opus' },
	{ key: 'aac', label: 'aac' },
	{ key: 'mp3', label: 'mp3' },
	{ key: 'flac', label: 'flac' },
	// todo: add correct keys
];

const bitrates = [
	{ value: '32', label: '32' },
	{ value: '64', label: '64' },
	{ value: '96', label: '96' },
	{ value: '128', label: '128' },
	{ value: '160', label: '160' },
	{ value: '192', label: '192' },
	{ value: '224', label: '224' },
	{ value: '256', label: '256' },
	{ value: '320', label: '320' },
	{ value: '512', label: '512' },
	{ value: '1024', label: '1024' },
];

export default function Reencode() {
	const { settings, updateSettings } = useSettings();

	return (
		<Tile option='audio' suboption='reencode' title={'Re-encode audio'}>
			<div className='grid grid-cols-[max-content_1fr] items-center gap-2 text-sm'>
				<span>Codec:</span>
				<OptionSelect
					name='codec'
					label='Codec:'
					selectedKeys={[settings.audio.reencode.codec]}
					onChange={(v) => updateSettings('audio', 'reencode', 'codec', v.target.value)}
					items={codecs}
				/>
				<span>Bitrate:</span>
				<NumberSelectInput
					label='Bitrate:'
					options={bitrates}
					value={settings.audio.reencode.bitrate}
					onChange={(v) => {
						console.log(v);
						updateSettings('audio', 'reencode', 'bitrate', v);
					}}
				/>
			</div>
		</Tile>
	);
}
