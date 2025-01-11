import { useState, useEffect } from 'react';
import { Progress, Text, Button, Anchor, Tooltip } from '@mantine/core';
import { Plus, Play, Pause } from '@phosphor-icons/react';
import { formatDuration } from '../utils';
import CopyText from './CopyText';

function calculateFileSize(bitrate, duration) {
	const fileSizeMB = (parseInt(bitrate) * Number(duration)) / (8 * 1024);
	return fileSizeMB;
}

function estimateFileSize(config) {
	if (
		(config?.video?.isCompress || config?.video?.isDisabled) &&
		(config?.audio?.isCompress || config?.audio?.isMuted)
	) {
		let audio = parseInt(config.audio.bitrate);
		if (config?.audio?.isMuted) audio = 0;

		let video = parseInt(config.video.bitrate);
		if (config?.video?.isDisabled) video = 0;

		const bitrate = video + audio;
		let duration = config?.metadata?.format?.duration;

		if (config?.trim?.isEnabled) {
			duration = config.trim?.end - config.trim?.start;
		}

		const mb = `${calculateFileSize(bitrate, duration).toFixed(2)} MB`;

		return mb;
	} else {
		return null;
	}
}

export default function StatusBar({
	file,
	isProcessing,
	handleProcess,
	progress,
	error,
	success,
	config,
	handleFilePicker,
}) {
	const [size, setSize] = useState(0);
	const [seconds, setSeconds] = useState(null);

	useEffect(() => {
		const newSize = estimateFileSize(config);
		setSize(newSize);
	}, [config]);

	useEffect(() => {
		let timer;

		if (isProcessing && !success) {
			timer = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds + 1);
			}, 1000);
		} else if (success) {
			clearInterval(timer);
		}

		return () => clearInterval(timer);
	}, [isProcessing, success]);

	const handleClick = () => {
		handleProcess();
		setSeconds(0);
	};

	return (
		<div className='flex items-center justify-between gap-2 bg-[--mantine-color-dark-9] px-2 py-1.5'>
			<Button
				variant='filled'
				color='accent'
				onClick={handleFilePicker}
				disabled={isProcessing}
				size='compact-sm'
				leftSection={<Plus size={16} weight='bold' />}
				className='shrink-0'
			>
				Open file
			</Button>
			{isProcessing && <Text>{progress} %</Text>}

			{error && (
				<div className='mr-auto'>
					<Text c='red.6'>Error: {error}</Text>
				</div>
			)}
			{isProcessing && (
				<Progress
					value={progress}
					animated={isProcessing}
					radius='xs'
					size='lg'
					striped
					transitionDuration={300}
					className='grow'
				/>
			)}
			{success && (
				<>
					<Text size='sm' className='shrink-0'>
						File ready:
					</Text>
					<Anchor
						c='accent'
						size='sm'
						lineClamp={1}
						onClick={() => {
							window.api.openVideo(success);
						}}
						className='grow'
					>
						{success}
					</Anchor>
					<CopyText value={success} />
				</>
			)}
			{!(isProcessing || success) && size && (
				<div className='ml-auto'>
					<Tooltip label='Estimated max file size' color='gray'>
						<Text className='shrink-0'>{size}</Text>
					</Tooltip>
				</div>
			)}
			{(isProcessing || success) && (
				<Text className='shrink-0'>{formatDuration(seconds)}</Text>
			)}

			{isProcessing ? (
				<Button
					variant='filled'
					color='red'
					size='compact-sm'
					onClick={() => window.api.stopProcessingVideo()}
					className='shrink-0'
					leftSection={<Pause size={16} weight='fill' />}
				>
					Cancel
				</Button>
			) : (
				<Button
					variant='filled'
					onClick={handleClick}
					loading={isProcessing}
					size='compact-sm'
					disabled={!file}
					className='shrink-0'
					leftSection={<Play size={16} weight='fill' />}
				>
					Process Video
				</Button>
			)}
		</div>
	);
}
