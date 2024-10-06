import { useState, useEffect, useRef } from 'react';
import { Divider, Button, Text, TextInput, Progress } from '@mantine/core';

import TitleBar from './components/TitleBar';
// import electronLogo from './assets/electron.svg'

function App() {
	const [file, setFile] = useState(null);
	const [outputPath, setOutputPath] = useState('/home/patryk/Desktop/');
	const [outputName, setOutputName] = useState('test-video-001.mp4');
	const [progress, setProgress] = useState(0);
	const [isProcessing, setIsProcessing] = useState(false);

	const videoRef = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);

	const handleTimeUpdate = () => {
		setCurrentTime(videoRef.current.currentTime);
	};

	const handleFilePicker = async () => {
		setProgress(0);
		const filePath = await window.api.openFile();
		setFile(filePath);
		console.log('Selected video: ', filePath);
	};

	const clearFile = async () => {
		console.log('Cleared video path: ', file);
		setFile(null);
		setProgress(0);
	};

	const handleCompress = async () => {
		setProgress(0);
		const output = outputPath + outputName;
		setIsProcessing(true);
		const result = await window.api.generateOutputVideo(file, output);
		setIsProcessing(false);
		if (result.error) {
			// TODO: ....
			setProgress(0);
		} else {
			setProgress(100);
		}
	};

	useEffect(() => {
		window.api.onProgressUpdate((value) => {
			setProgress(value);
		});
	}, []);

	return (
		<div className='grid grid-cols-1 gap-4'>
			<TitleBar />
			<div className='p-2'>
				<div className='grid grid-cols-[auto,auto,1fr] items-center gap-3'>
					<Button variant='filled' onClick={handleFilePicker} disabled={isProcessing}>
						Select video
					</Button>
					{file && (
						<Button disabled={isProcessing} variant='default' onClick={clearFile}>
							Clear
						</Button>
					)}
					{file && (
						<Text size='sm' truncate='end'>
							{file.name}
						</Text>
					)}
				</div>
				<div>
					{file && (
						<div className='grid grid-cols-2'>
							<video
								ref={videoRef}
								onTimeUpdate={handleTimeUpdate}
								className='w-ful aspect-video max-h-[200px] rounded bg-black shadow-2xl'
								src={`file://${file}`}
								controls
								muted
								loop
							/>
							<div>
								<p>Aktualny czas: {currentTime.toFixed(2)} s</p>
							</div>
						</div>
					)}
				</div>
				<div>
					<Divider my='xs' />
					<div>
						<div className='mb-4 grid grid-cols-1 gap-2'>
							<TextInput
								label='Output Folder'
								value={outputPath}
								onChange={(event) => setOutputPath(event.currentTarget.value)}
								disabled
							/>
							<TextInput
								label='File Name'
								value={outputName}
								onChange={(event) => setOutputName(event.currentTarget.value)}
							/>
						</div>
						<div className='mb-4 flex gap-2'>
							<Button
								variant='filled'
								onClick={handleCompress}
								loading={isProcessing}
							>
								Compress Video
							</Button>
							{isProcessing && (
								<Button
									variant='filled'
									color='red'
									onClick={() => window.api.stopProcessingVideo()}
								>
									Cancel
								</Button>
							)}
						</div>
						<Progress value={progress} animated={isProcessing} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
