import {
	ActionIcon,
	Badge,
	Button,
	Collapse,
	RangeSlider,
	Slider,
	Switch,
	Text,
	Title,
} from '@mantine/core';
import {
	ArrowLineLeft,
	ArrowLineRight,
	Pause,
	Play,
	SkipBack,
	SkipForward,
	SpeakerHigh,
	SpeakerSimpleX,
} from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { formatBitrate, formatDuration, formatFileSize, getFileExtension } from '../../utils';

export default function Trim({ file, metadata, trim, setTrim }) {
	const videoRef = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [isMuted, setIsMuted] = useState(true);
	const [isPaused, setIsPaused] = useState(true);
	const prevTrimValues = useRef();

	useEffect(() => {
		prevTrimValues.current = trim;
	}, [trim]);

	const handleTimeUpdate = () => {
		setCurrentTime(videoRef.current.currentTime);
	};

	const handlePlayPause = () => {
		if (videoRef?.current?.paused) {
			videoRef.current.play();
		} else {
			videoRef.current.pause();
		}
	};

	const handleSeek = (time) => {
		videoRef.current.currentTime = time;
	};

	const handleForward = () => {
		videoRef.current.currentTime += 1;
	};

	const handleRewind = () => {
		videoRef.current.currentTime -= 1;
	};

	const handleVolume = () => {
		if (isMuted) {
			videoRef.current.volume = 1;
			setIsMuted(false);
		} else {
			videoRef.current.volume = 0;
			setIsMuted(true);
		}
	};

	const handleTrimChange = (range) => {
		if (range[0] !== prevTrimValues.current.start) {
			videoRef.current.currentTime = prevTrimValues.current.start;
		} else if (range[1] !== prevTrimValues.current.end) {
			videoRef.current.currentTime = prevTrimValues.current.end;
		}

		setTrim((prevTrim) => ({
			...prevTrim,
			start: range[0],
			end: range[1],
		}));
	};

	const handleTrimStart = () => {
		setTrim((prevTrim) => ({
			...prevTrim,
			start: videoRef.current.currentTime,
		}));
	};

	const handleTrimEnd = () => {
		setTrim((prevTrim) => ({
			...prevTrim,
			end: videoRef.current.currentTime,
		}));
	};

	if (!file) {
		return (
			<div className='grid grid-cols-1 gap-3'>
				<Title order={4}>Trim Video</Title>
				<Text size='sm' c='dimmed'>
					No file opened
				</Text>
			</div>
		);
	}

	return (
		<div className='grid h-0 min-h-full grid-cols-1 grid-rows-[auto,1fr,auto] gap-2'>
			<div className='flex gap-4'>
				<Title order={4}>Trim Video</Title>
				{metadata && (
					<div className='flex gap-2'>
						{metadata?.format?.duration && (
							<Badge variant='light' size='lg' radius='md'>
								{formatDuration(metadata?.format?.duration)}
							</Badge>
						)}
						{metadata?.format?.size && (
							<Badge variant='light' size='lg' radius='md'>
								{formatFileSize(metadata?.format?.size)}
							</Badge>
						)}
						{file && (
							<Badge variant='light' size='lg' radius='md'>
								{getFileExtension(file)}
							</Badge>
						)}
						{metadata?.format?.bit_rate && (
							<Badge variant='light' size='lg' radius='md'>
								{formatBitrate(metadata?.format?.bit_rate)}
							</Badge>
						)}
						{metadata?.streams && (
							<Badge variant='light' size='lg' radius='md'>
								{metadata?.streams.length} streams
							</Badge>
						)}
					</div>
				)}
			</div>

			<div className='app-background-dark relative flex h-0 min-h-full w-full place-content-center overflow-clip rounded-lg border border-[--tab-border-color] '>
				{metadata?.streams.filter((stream) => stream.codec_type === 'video').at(0)
					?.codec_name === 'hevc' && (
					<div className='absolute flex h-full w-full items-center justify-center'>
						<div>HEVC video preview is not supported</div>
						<div></div>
					</div>
				)}
				<video
					ref={videoRef}
					onTimeUpdate={handleTimeUpdate}
					onPlay={() => setIsPaused(false)}
					onPause={() => setIsPaused(true)}
					className='aspect-video h-full cursor-pointer'
					src={`file://${file}`}
					// controls
					muted={isMuted}
					loop
					onClick={handlePlayPause}
				/>
			</div>

			<div className='mt-1 mb-2 grid gap-3 overflow-x-clip'>
				{metadata?.format?.duration && (
					<div className='flex items-center gap-2'>
						<ActionIcon.Group>
							<ActionIcon variant='filled' size='lg' onClick={handlePlayPause}>
								{isPaused === true ? (
									<Play size={20} weight='fill' />
								) : (
									<Pause size={20} weight='fill' />
								)}
							</ActionIcon>
							<ActionIcon variant='default' size='lg' onClick={handleRewind}>
								<SkipBack size={20} weight='fill' />
							</ActionIcon>
							<ActionIcon variant='default' size='lg' onClick={handleForward}>
								<SkipForward size={20} weight='fill' />
							</ActionIcon>
						</ActionIcon.Group>

						<ActionIcon variant='default' size='lg' onClick={handleVolume}>
							{isMuted ? (
								<SpeakerSimpleX size={20} weight='fill' />
							) : (
								<SpeakerHigh size={20} weight='fill' />
							)}
						</ActionIcon>

						<div className='ml-auto flex items-center gap-2'>
							{trim.isEnabled && (
								<Button
									variant='default'
									size='compact-sm'
									leftSection={<ArrowLineLeft size={18} weight='bold' />}
									onClick={handleTrimStart}
								>
									Set Start
								</Button>
							)}
							{trim.isEnabled && (
								<Button
									variant='default'
									size='compact-sm'
									onClick={handleTrimEnd}
									rightSection={<ArrowLineRight size={18} weight='bold' />}
								>
									Set End
								</Button>
							)}
							<Switch
								label='Trim video'
								radius='md'
								labelPosition='left'
								checked={trim.isEnabled}
								onChange={(event) =>
									setTrim((prevTrim) => ({
										...prevTrim,
										start: 0,
										end: metadata?.format?.duration,
										isEnabled: event.target.checked,
									}))
								}
							/>
						</div>
					</div>
				)}

				{metadata?.format?.duration && (
					<div>
						<Collapse in={trim.isEnabled}>
							<RangeSlider
								min={0}
								max={metadata?.format?.duration}
								step={0.001}
								minRange={2}
								marks={[
									{ value: 0 },
									{ value: metadata?.format?.duration / 2 },
									{ value: metadata?.format?.duration },
								]}
								label={(value) => formatDuration(value)}
								color='accent'
								className='mt-1 mb-2'
								styles={{
									thumb: {
										backgroundColor: 'white',
										borderRadius: 0,
										width: '2px',
										borderWidth: '4px',
									},
									bar: {
										marginLeft: '5px',
									},
								}}
								value={[trim?.start, trim?.end]}
								onChange={handleTrimChange}
							/>
						</Collapse>
						<div className='mb-1.5 flex justify-between'>
							<Text size='xs'>00:00</Text>
							<Text size='xs'>{formatDuration(metadata?.format?.duration / 2)}</Text>
							<Text size='xs'>{formatDuration(metadata?.format?.duration)}</Text>
						</div>
						<Slider
							min={0}
							max={metadata?.format?.duration}
							step={0.001}
							marks={[
								{ value: 0 },
								{ value: metadata?.format?.duration / 2 },
								{ value: metadata?.format?.duration },
							]}
							value={currentTime}
							// onChange={setCurrentTime}
							onChange={handleSeek}
							label={(value) => formatDuration(value)}
							styles={{
								thumb: {
									backgroundColor: 'white',
								},
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
