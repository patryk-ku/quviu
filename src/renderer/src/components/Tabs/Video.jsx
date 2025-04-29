import { Collapse, Select, Switch, Text, TextInput } from '@mantine/core';
import CodecInfo from '../CodecInfo';
import SettingsSwitch from '../SettingsSwitch';
import SimpleSwitch from '../SimpleSwitch';
import StreamsInfo from '../StreamsInfo';
import TitledChipGroup from '../TitledChipGroup';
import TitledSegmentedControl from '../TitledSegmentedControl';

export default function Video({ video, setVideo, metadata }) {
	const videoStreams = metadata?.streams.filter((stream) => stream.codec_type === 'video');
	const isVideo = videoStreams?.length > 0 ? true : false;
	const subtitleStreams = metadata?.streams.filter((stream) => stream.codec_type === 'subtitle');
	const isSubtitle = subtitleStreams?.length > 0 ? true : false;
	console.log(subtitleStreams);
	const parsedSubtitleStreams = subtitleStreams?.map((stream, index) => ({
		value: String(index),
		label: `${index}: ${stream.tags?.language}` || `Stream ${index}`,
	}));
	console.log('parsedSubtitleStreams', parsedSubtitleStreams);

	const handleSubtitleFilePicker = async () => {
		const filePath = await window.api.openAnyFile();

		if (filePath && !filePath?.error) {
			setVideo((prev) => ({
				...prev,
				hardsubPath: filePath,
			}));
		}
	};

	if (!isVideo) {
		return (
			<div>
				<Text size='sm' c='dimmed'>
					No video streams detected
				</Text>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 gap-2'>
			<StreamsInfo streams={videoStreams} metadata={metadata} />
			<div className='flex'>
				<Switch
					label='Disable Video'
					radius='md'
					checked={video.isDisabled}
					onChange={(event) => {
						setVideo((prev) => ({
							...prev,
							isDisabled: event.target.checked,
						}));
					}}
					className='m-[1px] pt-1'
					classNames={{ label: 'font-bold' }}
				/>
			</div>
			<Collapse in={!video.isDisabled}>
				<div className='*:-ml-2 grid grid-cols-1 *:p-2'>
					<SettingsSwitch
						option={video}
						setOption={setVideo}
						condition='isCompress'
						label='Re-encode Video'
						help={<CodecInfo />}
					>
						<TitledChipGroup
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
						/>
						<TitledSegmentedControl
							label='Bitrate'
							data={[
								'256',
								'512',
								'768',
								'1024',
								'1500',
								'2048',
								'3000',
								'4096',
								'6000',
								'8192',
							]}
							value={video.bitrate}
							onChange={(event) => {
								setVideo((prev) => ({
									...prev,
									bitrate: event,
								}));
							}}
							custom
							suffix=' k'
						/>
					</SettingsSwitch>

					<SettingsSwitch
						option={video}
						setOption={setVideo}
						condition='isResolution'
						label='Change Resolution'
					>
						<TitledSegmentedControl
							label='Height'
							data={['240', '360', '480', '720', '1080', '1440', '2160', '4320']}
							value={video.resolution}
							onChange={(event) => {
								setVideo((prev) => ({
									...prev,
									resolution: event,
								}));
							}}
							custom
							suffix=' px'
						/>
					</SettingsSwitch>

					<SettingsSwitch
						option={video}
						setOption={setVideo}
						condition='isFps'
						label='Change Frame Rate'
					>
						<TitledSegmentedControl
							label='FPS'
							data={['24', '25', '29.97', '30', '50', '59.94', '60', '120']}
							value={video.fps}
							onChange={(event) => {
								setVideo((prev) => ({
									...prev,
									fps: event,
								}));
							}}
							custom
							allowDecimal={true}
						/>
					</SettingsSwitch>

					<SettingsSwitch
						option={video}
						setOption={setVideo}
						condition='isHardsub'
						label='Add hardcoded subtitles'
					>
						<div className='grid grid-cols-[auto_1fr] items-center gap-4'>
							<Switch
								label='from current video'
								radius='md'
								checked={video.isHardsubFromInput}
								onChange={(event) => {
									setVideo((prev) => ({
										...prev,
										isHardsubFromInput: event.target.checked,
									}));
								}}
								disabled={!isSubtitle}
							/>
							{video.isHardsubFromInput ? (
								<Select
									variant='filled'
									allowDeselect={false}
									value={video.hardsubStreamIndex}
									onChange={(value) => {
										setVideo((prev) => ({
											...prev,
											hardsubStreamIndex: value,
										}));
									}}
									data={parsedSubtitleStreams}
									className='w-[150px]'
								/>
							) : (
								<TextInput
									variant='filled'
									value={video.hardsubPath}
									onClick={handleSubtitleFilePicker}
									readOnly
									className='min-w-[550px]'
									size='sm'
									placeholder='Select subtitle file'
								/>
							)}
						</div>
					</SettingsSwitch>

					<SimpleSwitch
						label='Crop black bars around video'
						checked={video.isCropdetect}
						onChange={(event) => {
							setVideo((prev) => ({
								...prev,
								isCropdetect: event.target.checked,
							}));
						}}
						disabled={!video.isCompress}
					/>
				</div>
			</Collapse>
		</div>
	);
}
