import { Title, Text, Switch, Collapse } from '@mantine/core';
import StreamsInfo from '../StreamsInfo';
import SettingsSwitch from '../SettingsSwitch';
import TitledSegmentedControl from '../TitledSegmentedControl';

export default function Video({ video, setVideo, metadata }) {
	const videoStreams = metadata?.streams.filter((stream) => stream.codec_type === 'video');
	const isVideo = videoStreams?.length > 0 ? true : false;

	if (!isVideo) {
		return (
			<div className='grid grid-cols-1 gap-3'>
				<Title order={4}>Video Settings</Title>
				<Text size='sm' c='dimmed'>
					No video streams detected
				</Text>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 gap-2'>
			<Title order={4}>Video Settings</Title>
			<StreamsInfo streams={videoStreams} />
			<Switch
				label='Disable Video'
				radius='sm'
				checked={video.isDisabled}
				onChange={(event) => {
					setVideo((prev) => ({
						...prev,
						isDisabled: event.currentTarget.checked,
					}));
				}}
				className='m-[1px] pt-1'
				classNames={{ label: 'font-bold' }}
			/>
			<Collapse in={!video.isDisabled}>
				<div className='grid grid-cols-1 *:-ml-2 *:p-2'>
					<SettingsSwitch
						option={video}
						setOption={setVideo}
						condition='isCompress'
						label='Re-encode Video'
					>
						<TitledSegmentedControl
							label='Codec:'
							data={[
								{ value: 'libx264', label: 'H.264' },
								{ value: 'libx265', label: 'H.265 HEVC' },
								{ value: 'libvpx-vp9', label: 'VP9' },
								{ value: 'libaom-av1', label: 'AV1' },
							]}
							value={video.codec}
							onChange={(event) => {
								setVideo((prev) => ({
									...prev,
									codec: event,
								}));
							}}
						/>
						<TitledSegmentedControl
							label='Bitrate:'
							data={['256k', '512k', '1024k', '2048k', '4096k', '8192k']}
							value={video.bitrate}
							onChange={(event) => {
								setVideo((prev) => ({
									...prev,
									bitrate: event,
								}));
							}}
						/>
					</SettingsSwitch>

					<SettingsSwitch
						option={video}
						setOption={setVideo}
						condition='isResolution'
						label='Change Resolution'
					>
						<TitledSegmentedControl
							label='Height:'
							data={[
								{ value: '240', label: '240p' },
								{ value: '360', label: '360p' },
								{ value: '480', label: '480p' },
								{ value: '720', label: '720p' },
								{ value: '1080', label: '1080p' },
								{ value: '1440', label: '1440p (2K)' },
								{ value: '2160', label: '2160p (4K)' },
								{ value: '4320', label: '4320p (8K)' },
							]}
							value={video.resolution}
							onChange={(event) => {
								setVideo((prev) => ({
									...prev,
									resolution: event,
								}));
							}}
						/>
					</SettingsSwitch>

					<SettingsSwitch
						option={video}
						setOption={setVideo}
						condition='isFps'
						label='Change Frame Rate'
					>
						<TitledSegmentedControl
							label='FPS:'
							data={['24', '25', '29.97', '30', '50', '59.94', '60', '120']}
							value={video.fps}
							onChange={(event) => {
								setVideo((prev) => ({
									...prev,
									fps: event,
								}));
							}}
						/>
					</SettingsSwitch>
				</div>
			</Collapse>
		</div>
	);
}
