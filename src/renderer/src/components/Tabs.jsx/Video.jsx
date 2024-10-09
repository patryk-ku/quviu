import { Title, Text, Switch, Collapse, Select } from '@mantine/core';

export default function Video({ video, setVideo, metadata }) {
	const videoStreams = metadata?.streams.filter((stream) => stream.codec_type === 'video').length;
	const isAudio = videoStreams > 0 ? true : false;

	if (!isAudio) {
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
		<div className='grid grid-cols-1 gap-3'>
			<Title order={4}>Video Settings</Title>
			<Switch
				label='Disable video'
				radius='sm'
				checked={video.isDisabled}
				onChange={(event) => {
					setVideo((prev) => ({
						...prev,
						isDisabled: event.currentTarget.checked,
					}));
				}}
			/>
			<Collapse in={!video.isDisabled}>
				<div className='grid grid-cols-1 gap-3'>
					<Switch
						label='Compress video'
						radius='sm'
						checked={video.isCompress}
						onChange={(event) => {
							setVideo((prev) => ({
								...prev,
								isCompress: event.currentTarget.checked,
							}));
						}}
					/>
					<Collapse in={video.isCompress}>
						<div className='grid grid-cols-[180px,100px] gap-2'>
							<Select
								label='Codec'
								data={[
									{ value: 'libx264', label: 'H.264' },
									// { value: 'x264', label: 'h264' },
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
							/>
						</div>
					</Collapse>
				</div>
			</Collapse>
		</div>
	);
}
