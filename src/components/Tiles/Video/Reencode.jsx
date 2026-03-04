import { useSettings } from '../../../contexts/SettingsContext';
import NumberSelectInput from '../NumberSelectInput';
import OptionSelect from '../OptionSelect';
import Tile from '../Tile';

const codecs = [
	{ key: 'x264', label: 'H.264' },
	{ key: 'x265', label: 'H.265 HEVC' },
	{ key: 'vp9', label: 'VP9' },
	{ key: 'av1', label: 'AV1' },
];

const bitrates = [
	{ value: '256', label: '256' },
	{ value: '512', label: '512' },
	{ value: '1024', label: '1024' },
	{ value: '2048', label: '2048' },
	{ value: '4096', label: '4096' },
	{ value: '8192', label: '8192' },
	{ value: '16384', label: '16384' },
];

export default function Reencode() {
	const { settings, updateSettings } = useSettings();

	return (
		<Tile option='video' suboption='reencode' title={'Re-encode video'}>
			<div className='grid grid-cols-[max-content_1fr] items-center gap-2 text-sm'>
				<span>Codec:</span>
				<OptionSelect
					name='codec'
					label='Codec:'
					selectedKeys={[settings.video.reencode.codec]}
					onChange={(v) => updateSettings('video', 'reencode', 'codec', v.target.value)}
					items={codecs}
				/>
				<span>Bitrate:</span>
				<NumberSelectInput
					label='Bitrate:'
					options={bitrates}
					value={settings.video.reencode.bitrate}
					onChange={(v) => {
						console.log(v);
						updateSettings('video', 'reencode', 'bitrate', v);
					}}
				/>
			</div>
		</Tile>
	);
}
