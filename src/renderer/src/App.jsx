import { useState, useEffect, useMemo } from 'react';
import { createTheme, MantineProvider, virtualColor, Tabs } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import TitleBar from './components/TitleBar';
import Output from './components/Tabs/Output';
import Audio from './components/Tabs/Audio';
import Video from './components/Tabs/Video';
import Trim from './components/Tabs/Trim';
import Settings from './components/Tabs/Settings';
import StatusBar from './components/StatusBar';

export default function App() {
	const [colors, setColors] = useState(['violet', 'grape']);
	const theme = useMemo(
		() =>
			createTheme({
				primaryColor: colors[0],
				colors: {
					accent: virtualColor({
						name: 'accent',
						dark: colors[1],
						light: colors[1],
					}),
				},
			}),
		[colors]
	);

	const [activeTab, setActiveTab] = useState('File');
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
	// const [outputOptions, setOutputOptions] = useState(['-crf 40']);
	const [audio, setAudio] = useState({
		isMuted: false,
		isMerge: false,
		isCompress: false,
		codec: 'opus',
		bitrate: '64k',
	});
	const [video, setVideo] = useState({
		isDisabled: false,
		isCompress: false,
		codec: 'libx265',
		bitrate: '2048k',
		isResolution: false,
		resolution: '720',
		isFps: false,
		fps: '30',
	});

	useEffect(() => {
		setSuccess(false);
	}, [audio, video, trim]);

	const resetState = () => {
		setProgress(0);
		setError(null);
		setSuccess(null);
	};

	const handleFilePicker = async () => {
		setProgress(0);
		setError(null);
		setSuccess(null);
		const filePath = await window.api.openFile();

		if (filePath?.error) {
			setError(filePath.error);
			return;
		}

		setFile(filePath?.path);
		setMetadata(filePath?.metadata);
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
			// outputOptions,
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
		<MantineProvider theme={theme}>
			<div className='grid h-full grid-rows-[auto,1fr] border border-[--mantine-color-default-border]'>
				<TitleBar
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					handleFilePicker={handleFilePicker}
					isProcessing={isProcessing}
				/>
				<div className='grid h-full grid-rows-[1fr,auto]'>
					{/* <VideoPicker file={file} metadata={metadata} trim={trim} setTrim={setTrim} /> */}

					<Tabs
						value={activeTab}
						onChange={setActiveTab}
						// className='h-0 min-h-full select-none'
						styles={{
							panel: { overflowY: 'auto', padding: '8px 16px', marginRight: '2px' },
						}}
						classNames={{
							panel: 'h-0 min-h-full',
						}}
					>
						<Tabs.Panel value='Presets'>WIP</Tabs.Panel>

						<Tabs.Panel value='File'>
							<Output
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

						<Tabs.Panel value='Video'>
							<Video video={video} setVideo={setVideo} metadata={metadata} />
						</Tabs.Panel>

						<Tabs.Panel value='Audio'>
							<Audio audio={audio} setAudio={setAudio} metadata={metadata} />
						</Tabs.Panel>

						<Tabs.Panel value='Trim'>
							<Trim file={file} metadata={metadata} trim={trim} setTrim={setTrim} />
						</Tabs.Panel>

						<Tabs.Panel value='Settings'>
							<Settings setColors={setColors} />
						</Tabs.Panel>
					</Tabs>

					<StatusBar
						file={file}
						isProcessing={isProcessing}
						handleProcess={handleProcess}
						progress={progress}
						error={error}
						success={success}
						config={{ metadata, video, audio, trim }}
					/>
				</div>
			</div>
		</MantineProvider>
	);
}
