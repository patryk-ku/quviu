import { Title, Text, Switch, Collapse, Select } from '@mantine/core';

export default function Audio({ audio, setAudio, metadata }) {
	const audioStreams = metadata?.streams.filter((stream) => stream.codec_type === 'audio').length;
	const isAudio = audioStreams > 0 ? true : false;

	if (!isAudio) {
		return (
			<div className='grid grid-cols-1 gap-3'>
				<Title order={4}>Audio Settings</Title>
				<Text size='sm' c='dimmed'>
					No audio streams detected
				</Text>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 gap-3'>
			<Title order={4}>Audio Settings</Title>
			<Switch
				label='Mute audio'
				radius='sm'
				checked={audio.isMuted}
				onChange={(event) => {
					setAudio((prevAudio) => ({
						...prevAudio,
						isMuted: event.currentTarget.checked,
					}));
				}}
			/>
			<Collapse in={!audio.isMuted}>
				<div className='grid grid-cols-1 gap-3'>
					<Switch
						label='Merge all audio streams'
						radius='sm'
						checked={audio.isMerge}
						onChange={(event) => {
							setAudio((prevAudio) => ({
								...prevAudio,
								isMerge: event.currentTarget.checked,
							}));
						}}
						description={metadata && `audio streams: ${audioStreams}`}
						disabled={audioStreams > 1 ? false : true}
					/>
					<Switch
						label='Compress audio'
						radius='sm'
						checked={audio.isCompress}
						onChange={(event) => {
							setAudio((prevAudio) => ({
								...prevAudio,
								isCompress: event.currentTarget.checked,
							}));
						}}
					/>
					<Collapse in={audio.isCompress}>
						<div className='grid grid-cols-[150px,100px] gap-2'>
							<Select
								label='Codec'
								data={[
									{ value: 'opus' },
									{ value: 'aac' },
									{ value: 'libmp3lame', label: 'mp3' },
								]}
								value={audio.codec}
								onChange={(event) => {
									setAudio((prevAudio) => ({
										...prevAudio,
										codec: event,
									}));
								}}
								allowDeselect={false}
							/>
							<Select
								label='Bitrate'
								data={['64k', '96k', '128k', '192k', '256k']}
								value={audio.bitrate}
								onChange={(event) => {
									setAudio((prevAudio) => ({
										...prevAudio,
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
