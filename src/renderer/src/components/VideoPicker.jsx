import { useState, useRef, useEffect } from 'react';
import {
	TextInput,
	Text,
	Button,
	Badge,
	Slider,
	RangeSlider,
	ActionIcon,
	Switch,
	Collapse,
} from '@mantine/core';
import {
	Play,
	Pause,
	SkipForward,
	SkipBack,
	SpeakerHigh,
	SpeakerSimpleX,
} from '@phosphor-icons/react';
import { formatDuration, formatBitrate, formatFileSize, getFileExtension } from '../utils';

function VideoPicker({ file, handleFilePicker, isProcessing, clearFile, metadata, trim, setTrim }) {
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
		console.log(range, prevTrimValues.current);

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

	return (
		<div className='grid grid-cols-[1fr,auto] gap-3 p-4'>
			<div className='grid grid-cols-1 grid-rows-[auto,1fr] content-start gap-3'>
				<div className='grid grid-cols-[auto,auto,1fr] gap-2'>
					<Button variant='filled' onClick={handleFilePicker} disabled={isProcessing}>
						Select video
					</Button>
					{file && (
						<Button disabled={isProcessing} variant='default' onClick={clearFile}>
							Clear
						</Button>
					)}
					{file && <TextInput value={file} readOnly variant='filled' />}
				</div>
				<div className='grid select-none grid-rows-[auto,1fr] gap-2'>
					{metadata && (
						<div className='flex gap-2'>
							{metadata?.format?.duration && (
								<Badge variant='light' color='accent' size='lg' radius='sm'>
									{formatDuration(metadata?.format?.duration)}
								</Badge>
							)}
							{metadata?.format?.size && (
								<Badge variant='light' color='accent' size='lg' radius='sm'>
									{formatFileSize(metadata?.format?.size)}
								</Badge>
							)}
							{file && (
								<Badge variant='light' color='accent' size='lg' radius='sm'>
									{getFileExtension(file)}
								</Badge>
							)}
							{metadata?.format?.bit_rate && (
								<Badge variant='light' color='accent' size='lg' radius='sm'>
									{formatBitrate(metadata?.format?.bit_rate)}
								</Badge>
							)}
							{metadata?.streams && (
								<Badge variant='light' color='accent' size='lg' radius='sm'>
									{metadata?.streams.length} streams
								</Badge>
							)}
							{/* TODO: print all codecs of streams here but only for audio and video, ignore subs etc */}
							{/* TODO: also write about resolution and fps, or move it all to settings page for audio video etc */}
						</div>
					)}
					<div className='grid grid-rows-[1fr,auto]'>
						<div></div>
						<div className='grid gap-3'>
							{metadata?.format?.duration && (
								<div className='flex items-center gap-2'>
									<ActionIcon.Group>
										<ActionIcon
											variant='filled'
											size='lg'
											onClick={handlePlayPause}
										>
											{isPaused === true ? (
												<Play size={20} weight='fill' />
											) : (
												<Pause size={20} weight='fill' />
											)}
										</ActionIcon>
										<ActionIcon
											variant='default'
											size='lg'
											onClick={handleRewind}
										>
											<SkipBack size={20} weight='fill' />
										</ActionIcon>
										<ActionIcon
											variant='default'
											size='lg'
											onClick={handleForward}
										>
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
											>
												Set End
											</Button>
										)}
										<Switch
											label='Trim video'
											radius='sm'
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
											className='mb-2 mt-1'
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
										<Text size='xs'>
											{formatDuration(metadata?.format?.duration / 2)}
										</Text>
										<Text size='xs'>
											{formatDuration(metadata?.format?.duration)}
										</Text>
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
				</div>
			</div>
			<div>
				{file ? (
					<video
						ref={videoRef}
						onTimeUpdate={handleTimeUpdate}
						onPlay={() => setIsPaused(false)}
						onPause={() => setIsPaused(true)}
						className='w-ful aspect-video h-[200px] cursor-pointer rounded bg-[--mantine-color-dark-9]'
						src={`file://${file}`}
						// controls
						muted={isMuted}
						loop
						onClick={handlePlayPause}
					/>
				) : (
					<div className='w-ful aspect-video h-[200px] rounded bg-[--mantine-color-dark-9]'></div>
				)}
			</div>
		</div>
	);
}

export default VideoPicker;
