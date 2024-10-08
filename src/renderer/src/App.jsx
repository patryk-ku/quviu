import { useState, useEffect } from 'react';
import { Button, Tabs, TextInput } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { File, FrameCorners, SpeakerHigh, Star } from '@phosphor-icons/react';

import TitleBar from './components/TitleBar';
import VideoPicker from './components/VideoPicker';
import FileTab from './components/Tabs.jsx/FileTab';
import Audio from './components/Tabs.jsx/Audio';
import StatusBar from './components/StatusBar';
// import electronLogo from './assets/electron.svg'

function App() {
	const [file, setFile] = useState(null);
	const [outputPath, setOutputPath] = useLocalStorage({
		key: 'output-path',
		defaultValue: '',
	});
	const [outputName, setOutputName] = useState('New video');
	const [outputExtension, setOutputExtension] = useState('.mp4');
	const [isOverwrite, setIsOverwrite] = useState(false);

	const [progress, setProgress] = useState(0);
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [metadata, setMetadata] = useState(null);

	// Settings
	const [trim, setTrim] = useState({ isEnabled: false, start: 0, end: 0 });
	const [outputOptions, setOutputOptions] = useState([
		// '-vf scale=-2:720',
		// dobre do vp9:
		'-crf 40',
		// '-deadline best',
	]);
	const [audio, setAudio] = useState({ isMuted: false, isMerge: false });
	const [video, setVideo] = useState({ res: '720' });

	const handleFilePicker = async () => {
		setProgress(0);
		setError(null);
		setSuccess(null);
		const filePath = await window.api.openFile();

		if (filePath.error) {
			setError(filePath.error);
			return;
		}

		setFile(filePath.path);
		setMetadata(filePath.metadata);
		console.log('Selected video: ', filePath);
	};

	const clearFile = async () => {
		console.log('Cleared video path: ', file);
		setFile(null);
		setMetadata(null);
		setProgress(0);
		setError(null);
		setSuccess(null);
	};

	const handleProcess = async () => {
		setError(null);
		setSuccess(null);
		setProgress(0);

		const config = {
			input: file,
			metadata,
			output: {
				folder: outputPath,
				name: outputName,
				ext: outputExtension,
				path: outputPath + outputName + outputExtension,
				isOverwrite,
			},
			outputOptions,
			trim,
			video,
			audio,
		};
		console.log(config);

		setIsProcessing(true);
		const result = await window.api.generateOutputVideo(config);
		setIsProcessing(false);
		if (result.error) {
			setError(result.error);
			setSuccess(null);
			setProgress(0);
		} else if (result.success) {
			setSuccess(result.success);
			setProgress(100);
		}
	};

	useEffect(() => {
		window.api.onProgressUpdate((value) => {
			setProgress(value);
		});
	}, []);

	return (
		<div className='grid h-full grid-rows-[auto,1fr]'>
			<TitleBar />
			<div className='grid h-full grid-rows-[auto,1fr,auto]'>
				<VideoPicker
					file={file}
					handleFilePicker={handleFilePicker}
					isProcessing={isProcessing}
					clearFile={clearFile}
					metadata={metadata}
					trim={trim}
					setTrim={setTrim}
				/>

				<Tabs
					defaultValue='File'
					orientation='vertical'
					variant='pills'
					radius='xs'
					className='h-0 min-h-full border-t-2 border-[--tab-border-color]'
					styles={{
						panel: { overflowY: 'auto', padding: '8px 16px', marginRight: '2px' },
						tab: {
							paddingLeft: '20px',
							paddingRight: '24px',
							paddingTop: '12px',
							paddingBottom: '12px',
						},
					}}
				>
					<Tabs.List className='border-r-2 border-[--tab-border-color]'>
						<Tabs.Tab
							value='Presets'
							leftSection={<Star size={14} color='gold' weight='fill' />}
						>
							Fast Presets
						</Tabs.Tab>
						<Tabs.Tab value='File' leftSection={<File size={14} weight='bold' />}>
							File
						</Tabs.Tab>
						<Tabs.Tab
							value='Video'
							leftSection={<FrameCorners size={14} weight='bold' />}
						>
							Video
						</Tabs.Tab>
						<Tabs.Tab
							value='Audio'
							leftSection={<SpeakerHigh size={14} weight='bold' />}
						>
							Audio
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value='Presets'>Presety</Tabs.Panel>

					<Tabs.Panel value='File'>
						<FileTab
							outputPath={outputPath}
							setOutputPath={setOutputPath}
							outputName={outputName}
							setOutputName={setOutputName}
							outputExtension={outputExtension}
							setOutputExtension={setOutputExtension}
							isOverwrite={isOverwrite}
							setIsOverwrite={setIsOverwrite}
						/>
					</Tabs.Panel>

					<Tabs.Panel value='Video'></Tabs.Panel>

					<Tabs.Panel value='Audio'>
						<Audio audio={audio} setAudio={setAudio} />
					</Tabs.Panel>
				</Tabs>

				<StatusBar
					file={file}
					isProcessing={isProcessing}
					handleProcess={handleProcess}
					progress={progress}
					error={error}
					success={success}
				/>
			</div>
		</div>
	);
}

export default App;
