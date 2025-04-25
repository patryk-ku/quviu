import { MantineProvider, Tabs, createTheme, virtualColor } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { useEffect, useMemo, useState } from 'react';

import NoFileOpened from './components/NoFileOpened';
import StatusBar from './components/StatusBar';
import SummaryModal from './components/SummaryModal';
import Audio from './components/Tabs/Audio';
import Output from './components/Tabs/Output';
import Settings from './components/Tabs/Settings';
import Trim from './components/Tabs/Trim';
import Video from './components/Tabs/Video';
import TitleBar from './components/TitleBar';

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
				defaultGradient: {
					from: `${colors[0]}.6`,
					to: `${colors[1]}.6`,
					deg: 31,
				},
			}),
		[colors]
	);
	const [ffmpegPath, setFfmpegPath] = useLocalStorage({
		key: 'ffmpeg-path',
		defaultValue: '',
	});
	const [ffprobePath, setFfprobePath] = useLocalStorage({
		key: 'ffprobe-path',
		defaultValue: '',
	});

	const [activeTab, setActiveTab] = useState('File');
	const [file, setFile] = useState(null);
	const [outputPath, setOutputPath] = useLocalStorage({
		key: 'output-path',
		defaultValue: '',
	});
	const [outputName, setOutputName] = useState('New_video');
	const [outputExtension, setOutputExtension] = useState('.mp4');
	const [isOverwrite, setIsOverwrite] = useState(false);

	const [progress, setProgress] = useState(0);
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [metadata, setMetadata] = useState(null);
	const [thumbnail, setThumbnail] = useState(null);

	// Settings
	const [trim, setTrim] = useState({ isEnabled: false, start: 0, end: 0 });
	const [audio, setAudio] = useState({
		isMuted: false,
		isMerge: false,
		isCompress: false,
		codec: 'opus',
		bitrate: '64',
	});
	const [video, setVideo] = useState({
		isDisabled: false,
		isCompress: false,
		codec: 'libx264',
		bitrate: '2048',
		isResolution: false,
		resolution: '720',
		isFps: false,
		fps: '30',
	});
	const [opened, { open, close }] = useDisclosure(false);

	useEffect(() => {
		setSuccess(false);
	}, [audio, video, trim]);

	const resetState = () => {
		setProgress(0);
		setError(null);
		setSuccess(null);
	};

	const handleFilePicker = async () => {
		resetState();
		setTrim({ isEnabled: false, start: 0, end: 0 });
		setAudio((prev) => ({
			...prev,
			isMerge: false,
		}));

		const filePath = await window.api.openFile();

		if (filePath?.error) {
			setError(filePath.error);
			return;
		}

		if (filePath?.path) {
			setOutputName('New_video');
			setFile(filePath?.path);
			setMetadata(filePath?.metadata);
			setThumbnail(filePath?.thumbnail);
			console.log('Selected video: ', filePath);
		}
	};

	const handleClear = () => {
		resetState();
		setFile(null);
		setMetadata(null);
		setThumbnail(null);
		setOutputName('New_video');
	};

	const handleProcess = async () => {
		resetState();

		const config = {
			ffmpegPath,
			ffprobePath,
			input: file,
			metadata,
			output: {
				folder: outputPath,
				name: outputName,
				ext: outputExtension,
				path: outputPath + outputName.trim() + outputExtension,
				isOverwrite,
			},
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
		window.api.onFileOpened((filePath) => {
			if (filePath?.error) {
				setError(filePath.error);
			}

			if (filePath?.path) {
				setOutputName('New_video');
				setFile(filePath?.path);
				setMetadata(filePath?.metadata);
				setThumbnail(filePath?.thumbnail);
			}
		});
	}, []);

	useEffect(() => {
		window.api.onProgressUpdate((value) => {
			setProgress(value);
		});
	}, []);

	return (
		<MantineProvider theme={theme}>
			<SummaryModal
				opened={opened}
				close={close}
				file={file}
				metadata={metadata}
				thumbnail={thumbnail}
				video={video}
				audio={audio}
				trim={trim}
			/>
			<div className='grid h-full select-none grid-rows-[auto_1fr] border border-(--mantine-color-default-border)'>
				<TitleBar activeTab={activeTab} setActiveTab={setActiveTab} />
				<div className='grid h-full grid-rows-[1fr_auto]'>
					<Tabs
						value={activeTab}
						onChange={setActiveTab}
						styles={{
							panel: { overflowY: 'auto', marginRight: '2px' },
						}}
						classNames={{
							panel: 'h-0 min-h-full px-4 py-3',
						}}
					>
						<Tabs.Panel value='Presets'>WIP</Tabs.Panel>

						<Tabs.Panel value='File'>
							{file ? (
								<Output
									outputPath={outputPath}
									setOutputPath={setOutputPath}
									outputName={outputName}
									setOutputName={setOutputName}
									outputExtension={outputExtension}
									setOutputExtension={setOutputExtension}
									isOverwrite={isOverwrite}
									setIsOverwrite={setIsOverwrite}
									file={file}
									metadata={metadata}
									thumbnail={thumbnail}
								/>
							) : (
								<NoFileOpened handleFilePicker={handleFilePicker} />
							)}
						</Tabs.Panel>

						<Tabs.Panel value='Video'>
							{file ? (
								<Video video={video} setVideo={setVideo} metadata={metadata} />
							) : (
								<NoFileOpened handleFilePicker={handleFilePicker} />
							)}
						</Tabs.Panel>

						<Tabs.Panel value='Audio'>
							{file ? (
								<Audio audio={audio} setAudio={setAudio} metadata={metadata} />
							) : (
								<NoFileOpened handleFilePicker={handleFilePicker} />
							)}
						</Tabs.Panel>

						<Tabs.Panel value='Trim'>
							{file ? (
								<Trim
									file={file}
									metadata={metadata}
									trim={trim}
									setTrim={setTrim}
								/>
							) : (
								<NoFileOpened handleFilePicker={handleFilePicker} />
							)}
						</Tabs.Panel>

						<Tabs.Panel value='Settings'>
							<Settings
								setColors={setColors}
								ffmpegPaths={{
									ffmpegPath,
									setFfmpegPath,
									ffprobePath,
									setFfprobePath,
								}}
							/>
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
						handleFilePicker={handleFilePicker}
						handleClear={handleClear}
						openInfoModal={open}
					/>
				</div>
			</div>
		</MantineProvider>
	);
}
