import { Collapse, Switch, Text } from '@mantine/core';
import SettingsSwitch from '../SettingsSwitch';
import StreamsInfo from '../StreamsInfo';
import TitledSegmentedControl from '../TitledSegmentedControl';

export default function Audio({ audio, setAudio, metadata }) {
	const audioStreams = metadata?.streams.filter((stream) => stream.codec_type === 'audio');
	const isAudio = audioStreams?.length > 0 ? true : false;

	if (!isAudio) {
		return (
			<div>
				<Text size='sm' c='dimmed'>
					No audio streams detected
				</Text>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 gap-2'>
			<StreamsInfo streams={audioStreams} />
			<div className='flex'>
				<Switch
					label='Mute audio'
					radius='md'
					checked={audio.isMuted}
					onChange={(event) => {
						setAudio((prevAudio) => ({
							...prevAudio,
							isMuted: event.target.checked,
						}));
					}}
					className='m-[1px] pt-1'
					classNames={{ label: 'font-bold' }}
				/>
			</div>
			<Collapse in={!audio.isMuted}>
				<div className='*:-ml-2 grid grid-cols-1 *:p-2'>
					<SettingsSwitch
						option={audio}
						setOption={setAudio}
						condition='isCompress'
						label='Re-encode Audio'
					>
						<TitledSegmentedControl
							label='Codec'
							data={[
								{ value: 'opus', label: 'opus' },
								{ value: 'aac', label: 'aac' },
								{ value: 'libmp3lame', label: 'mp3' },
								{ value: 'libvorbis', label: 'ogg vorbis' },
								{ value: 'ac3', label: 'ac3' },
								{ value: 'libfdk_aac', label: 'fdk-aac' },
								{ value: 'flac', label: 'flac' },
								{ value: 'alac', label: 'alac' },
							]}
							value={audio.codec}
							onChange={(event) => {
								setAudio((prevAudio) => ({
									...prevAudio,
									codec: event,
								}));
							}}
						/>
						<TitledSegmentedControl
							label='Bitrate'
							data={[
								'32',
								'64',
								'96',
								'128',
								'192',
								'256',
								'320',
								'500',
								'768',
								'1411',
							]}
							value={audio.bitrate}
							onChange={(event) => {
								setAudio((prevAudio) => ({
									...prevAudio,
									bitrate: event,
								}));
							}}
							custom
							suffix=' k'
						/>
					</SettingsSwitch>
					<div className='max-w-fit'>
						<Switch
							label='Merge all audio streams'
							radius='md'
							checked={audio.isMerge}
							onChange={(event) => {
								setAudio((prevAudio) => ({
									...prevAudio,
									isMerge: event.target.checked,
								}));
							}}
							description={metadata && `audio streams: ${audioStreams?.length}`}
							disabled={audioStreams?.length > 1 ? false : true}
							className='m-[2px]'
							classNames={{ label: 'font-bold' }}
						/>
					</div>
				</div>
			</Collapse>
		</div>
	);
}
