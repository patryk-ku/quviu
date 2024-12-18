import { Title, Text, Switch, Collapse, Select } from '@mantine/core';
import StreamsInfo from '../StreamsInfo';
import SettingsSwitch from '../SettingsSwitch';

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
			/>
			<Collapse in={!video.isDisabled}>
				<div className='grid grid-cols-1 *:-ml-2 *:p-2'>
					<SettingsSwitch
						option={video}
						setOption={setVideo}
						condition='isCompress'
						label='Compress Video'
					>
						<Select
							label='Codec'
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
							allowDeselect={false}
							className='max-w-[150px]'
						/>
						<Select
							label='Bitrate'
							data={['256k', '512k', '1024k', '2048k', '4096k', '8192k']}
							value={video.bitrate}
							onChange={(event) => {
								setVideo((prev) => ({
									...prev,
									bitrate: event,
								}));
							}}
							allowDeselect={false}
							className='max-w-[110px]'
						/>
					</SettingsSwitch>

					<SettingsSwitch
						option={video}
						setOption={setVideo}
						condition='isResolution'
						label='Reduce Resolution'
					>
						<Select
							label='Resolution'
							data={[
								{ value: '144', label: '144p' },
								{ value: '240', label: '240p' },
								{ value: '360', label: '360p' },
								{ value: '480', label: '480p (SD)' },
								{ value: '720', label: '720p (HD)' },
								{ value: '1080', label: '1080p (Full HD)' },
								// { value: '1440', label: '1440p (2K)' },
								// { value: '2160', label: '2160p (4K UHD)' },
								// { value: '4320', label: '4320p (8K UHD)' },
							]}
							value={video.resolution}
							onChange={(event) => {
								setVideo((prev) => ({
									...prev,
									resolution: event,
								}));
							}}
							allowDeselect={false}
							className='max-w-[180px]'
						/>
					</SettingsSwitch>

					<SettingsSwitch
						option={video}
						setOption={setVideo}
						condition='isFps'
						label='Decrease FPS'
					>
						<Select
							label='Frame Rate'
							data={[
								{ value: '24', label: '24 FPS' },
								{ value: '25', label: '25 FPS' },
								{ value: '30', label: '30 FPS' },
								{ value: '48', label: '48 FPS' },
								{ value: '50', label: '50 FPS' },
								{ value: '60', label: '60 FPS' },
							]}
							value={video.fps}
							onChange={(event) => {
								setVideo((prev) => ({
									...prev,
									fps: event,
								}));
							}}
							allowDeselect={false}
							className='max-w-[140px]'
						/>
					</SettingsSwitch>
				</div>
			</Collapse>
		</div>
	);
}
