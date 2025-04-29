import { Anchor, Button, Progress, Text, Tooltip } from '@mantine/core';
import { File, Info, Pause, Play, X } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { estimateFileSize, formatDuration } from '../utils';
import CopyText from './CopyText';

export default function StatusBar({
	file,
	isProcessing,
	handleProcess,
	progress,
	error,
	success,
	config,
	handleFilePicker,
	handleClear,
	openInfoModal,
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
		<div className='app-background-dark flex items-center justify-between gap-2 border-(--mantine-color-default-border) border-t px-2 py-1.5'>
			<div className='flex gap-1'>
				{file ? (
					<Button
						variant='gradient'
						onClick={handleClick}
						loading={isProcessing}
						size='compact-sm'
						disabled={!file}
						className='shrink-0'
						leftSection={<Play size={16} weight='fill' />}
					>
						Process Video
					</Button>
				) : (
					<Button
						variant='gradient'
						color='accent'
						onClick={handleFilePicker}
						disabled={isProcessing}
						size='compact-sm'
						leftSection={<File size={16} weight='bold' />}
						className='shrink-0'
					>
						Open file
					</Button>
				)}

				{file &&
					(isProcessing ? (
						<Button
							variant='filled'
							color='red'
							size='compact-sm'
							onClick={() => window.api.stopProcessingVideo()}
							className='shrink-0'
						>
							<Pause size={16} weight='fill' />
						</Button>
					) : (
						<Button
							variant='default'
							onClick={handleClear}
							disabled={isProcessing}
							size='compact-sm'
							className='shrink-0'
						>
							<X size={18} weight='bold' />
						</Button>
					))}
			</div>

			{isProcessing && <Text>{progress} %</Text>}
			{error && (
				<div className='mr-auto'>
					<Tooltip label={error} w={500} multiline color='red' withArrow>
						<Text c='red.6' lineClamp={1}>
							Error: {error}
						</Text>
					</Tooltip>
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
					<CopyText value={success} label='Copy path to clipboard' />
				</>
			)}
			{!(isProcessing || success) && size && (
				<div className='ml-auto'>
					<Tooltip label='Estimated max file size' withArrow>
						<Text className='shrink-0 whitespace-nowrap'>{size}</Text>
					</Tooltip>
				</div>
			)}
			{(isProcessing || success) && (
				<Text className='shrink-0'>{formatDuration(seconds)}</Text>
			)}
			{file && (
				<Button
					variant='default'
					onClick={openInfoModal}
					size='compact-sm'
					className='shrink-0'
				>
					<Info size={18} weight='bold' />
				</Button>
			)}
		</div>
	);
}
