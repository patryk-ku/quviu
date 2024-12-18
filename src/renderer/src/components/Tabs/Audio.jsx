import { Title, Text, Switch, Collapse, Select } from '@mantine/core';
import StreamsInfo from '../StreamsInfo';
import SettingsSwitch from '../SettingsSwitch';

export default function Audio({ audio, setAudio, metadata }) {
	const audioStreams = metadata?.streams.filter((stream) => stream.codec_type === 'audio');
	const isAudio = audioStreams?.length > 0 ? true : false;

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
		<div className='grid grid-cols-1 gap-2'>
			<Title order={4}>Audio Settings</Title>
			<StreamsInfo streams={audioStreams} />
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
				className='m-[1px] pt-1'
			/>
			<Collapse in={!audio.isMuted}>
				<div className='grid grid-cols-1 *:-ml-2 *:p-2'>
					<SettingsSwitch
						option={audio}
						setOption={setAudio}
						condition='isCompress'
						label='Compress Audio'
					>
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
							className='max-w-[150px]'
						/>
						<Select
							label='Bitrate'
							data={['32k', '64k', '96k', '128k', '192k', '256k']}
							value={audio.bitrate}
							onChange={(event) => {
								setAudio((prevAudio) => ({
									...prevAudio,
									bitrate: event,
								}));
							}}
							allowDeselect={false}
							className='max-w-[100px]'
						/>
					</SettingsSwitch>
					<div className='max-w-fit'>
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
							description={metadata && `audio streams: ${audioStreams?.length}`}
							disabled={audioStreams?.length > 1 ? false : true}
							className='m-[2px]'
						/>
					</div>
				</div>
			</Collapse>
		</div>
	);
}
