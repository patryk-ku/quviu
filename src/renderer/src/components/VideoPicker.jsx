import { useState, useRef } from 'react';
import { TextInput, Text, Button, Badge, Slider, ActionIcon } from '@mantine/core';
import {
	Play,
	Pause,
	SkipForward,
	SkipBack,
	SpeakerHigh,
	SpeakerSimpleX,
} from '@phosphor-icons/react';

function formatDuration(seconds) {
	if (!seconds) {
		return 'unknown duration';
	}

	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);
	const secs = Math.floor(seconds % 60);

	if (hrs > 0) {
		return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
	} else {
		return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
	}
}

function formatBitrate(bitrate) {
	if (!bitrate) {
		return 'unknown bitrate';
	}

	if (bitrate >= 1e6) {
		return `${(bitrate / 1e6).toFixed(2)} Mbps`;
	} else {
		return `${(bitrate / 1e3).toFixed(2)} kbps`;
	}
}

function formatFileSize(bytes) {
	if (!bytes) {
		return 'unknown size';
	}

	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes === 0) return '0 Bytes';

	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

function getFileExtension(filePath) {
	if (!filePath) {
		return 'unknown ext';
	}

	const lastDotIndex = filePath.lastIndexOf('.');

	if (lastDotIndex > 0 && lastDotIndex < filePath.length - 1) {
		return filePath.slice(lastDotIndex + 1);
	} else {
		return 'unknown ext';
	}
}

function VideoPicker({ file, handleFilePicker, isProcessing, clearFile, metadata }) {
	const videoRef = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [isMuted, setIsMuted] = useState(true);

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
				<div className='grid grid-rows-[auto,1fr] gap-2'>
					{metadata && (
						<div className='flex gap-2'>
							{metadata?.format?.duration && (
								<Badge variant='light' size='lg' radius='sm'>
									{formatDuration(metadata?.format?.duration)}
								</Badge>
							)}
							{metadata?.format?.size && (
								<Badge variant='light' size='lg' radius='sm'>
									{formatFileSize(metadata?.format?.size)}
								</Badge>
							)}
							{file && (
								<Badge variant='light' size='lg' radius='sm'>
									{getFileExtension(file)}
								</Badge>
							)}
							{metadata?.format?.bit_rate && (
								<Badge variant='light' size='lg' radius='sm'>
									{formatBitrate(metadata?.format?.bit_rate)}
								</Badge>
							)}
							{metadata?.streams && (
								<Badge variant='light' size='lg' radius='sm'>
									{metadata?.streams.length} streams
								</Badge>
							)}
						</div>
					)}
					<div className='grid grid-rows-[1fr,auto] gap-2'>
						<div>tmp</div>
						<div className='grid grid-cols-[auto,1fr,auto] gap-2'>
							{metadata?.format?.duration && (
								<ActionIcon.Group>
									<ActionIcon
										variant='filled'
										size='lg'
										onClick={handlePlayPause}
									>
										{videoRef.current?.paused == true ? (
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
							)}

							{metadata?.format?.duration && (
								<div>
									<div className='flex justify-between'>
										<Text size='xs'>0:00</Text>
										<Text size='xs'>
											{formatDuration(metadata?.format?.duration)}
										</Text>
									</div>
									<Slider
										min={0}
										max={metadata?.format?.duration}
										step={1}
										value={currentTime.toFixed(0)}
										// onChange={setCurrentTime}
										onChange={handleSeek}
										label={(value) => formatDuration(value)}
									/>
								</div>
							)}

							{metadata?.format?.duration && (
								<ActionIcon variant='default' size='lg' onClick={handleVolume}>
									{videoRef.current?.volume > 0 ? (
										<SpeakerHigh size={20} weight='fill' />
									) : (
										<SpeakerSimpleX size={20} weight='fill' />
									)}
								</ActionIcon>
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
