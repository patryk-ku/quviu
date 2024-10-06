import { useState, useRef } from 'react';
import { TextInput, Text, Button } from '@mantine/core';

function VideoPicker({ file, handleFilePicker, isProcessing, clearFile }) {
	const videoRef = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);

	const handleTimeUpdate = () => {
		setCurrentTime(videoRef.current.currentTime);
	};

	return (
		<div className='grid grid-cols-[1fr,auto] gap-3 p-4'>
			<div className='grid grid-cols-1 content-start gap-3'>
				<div className='grid grid-cols-[auto,auto,1fr] gap-2'>
					<Button variant='filled' onClick={handleFilePicker} disabled={isProcessing}>
						Select video
					</Button>
					{file && (
						<Button disabled={isProcessing} variant='default' onClick={clearFile}>
							Clear
						</Button>
					)}
					{file && <TextInput value={file} readOnly />}
				</div>
				<div>
					<p>Aktualny czas: {currentTime.toFixed(2)} s</p>
					<p>Rozmiar pliku itp</p>
				</div>
			</div>
			<div>
				{file ? (
					<video
						ref={videoRef}
						onTimeUpdate={handleTimeUpdate}
						className='w-ful aspect-video h-[200px] rounded bg-[--mantine-color-dark-9]'
						src={`file://${file}`}
						controls
						muted
						loop
					/>
				) : (
					<div className='w-ful aspect-video h-[200px] rounded bg-[--mantine-color-dark-9]'></div>
				)}
			</div>
		</div>
	);
}

export default VideoPicker;
