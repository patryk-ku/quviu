import { useState, useEffect } from 'react';
import { Button, Tabs, TextInput } from '@mantine/core';
import { File, FrameCorners, SpeakerHigh } from '@phosphor-icons/react';

import TitleBar from './components/TitleBar';
import VideoPicker from './components/VideoPicker';
import StatusBar from './components/StatusBar';
// import electronLogo from './assets/electron.svg'

function App() {
	const [file, setFile] = useState(null);
	const [outputPath, setOutputPath] = useState('/home/patryk/Desktop/');
	const [outputName, setOutputName] = useState('test-video-001.mp4');
	const [progress, setProgress] = useState(0);
	const [isProcessing, setIsProcessing] = useState(false);

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

	const handleProcess = async () => {
		setProgress(0);
		const output = outputPath + outputName;
		setIsProcessing(true);
		const result = await window.api.generateOutputVideo(file, output);
		setIsProcessing(false);
		if (result.error) {
			// TODO: show error info or smt
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
		<div className='grid h-full grid-rows-[auto,1fr]'>
			<TitleBar />
			<div className='grid h-full grid-rows-[auto,1fr,auto]'>
				<VideoPicker
					file={file}
					handleFilePicker={handleFilePicker}
					isProcessing={isProcessing}
					clearFile={clearFile}
				/>

				<Tabs
					defaultValue='File'
					orientation='vertical'
					className='h-0 min-h-full border-t-2 border-[--tab-border-color]'
					styles={{
						panel: { overflowY: 'auto', padding: '8px 16px', marginRight: '2px' },
						tab: {
							paddingLeft: '20px',
							paddingRight: '24px',
						},
					}}
				>
					<Tabs.List className='mr-0'>
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

					<Tabs.Panel value='File'>
						<div className='grid grid-cols-1 gap-2'>
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
					</Tabs.Panel>

					<Tabs.Panel value='Video'></Tabs.Panel>

					<Tabs.Panel value='Audio'>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia quasi
							impedit aut architecto, illo velit minima vitae ut nesciunt eveniet hic
							qui deleniti fugiat soluta modi rerum labore tenetur beatae.
						</p>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia quasi
							impedit aut architecto, illo velit minima vitae ut nesciunt eveniet hic
							qui deleniti fugiat soluta modi rerum labore tenetur beatae.
						</p>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia quasi
							impedit aut architecto, illo velit minima vitae ut nesciunt eveniet hic
							qui deleniti fugiat soluta modi rerum labore tenetur beatae.
						</p>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia quasi
							impedit aut architecto, illo velit minima vitae ut nesciunt eveniet hic
							qui deleniti fugiat soluta modi rerum labore tenetur beatae.
						</p>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia quasi
							impedit aut architecto, illo velit minima vitae ut nesciunt eveniet hic
							qui deleniti fugiat soluta modi rerum labore tenetur beatae. Lorem ipsum
							dolor sit, amet consectetur adipisicing elit. Quia quasi impedit aut
							architecto, illo velit minima vitae ut nesciunt eveniet hic qui deleniti
							fugiat soluta modi rerum labore tenetur beatae. Lorem ipsum dolor sit,
							amet consectetur adipisicing elit. Quia quasi impedit aut architecto,
							illo velit minima vitae ut nesciunt eveniet hic qui deleniti fugiat
							soluta modi rerum labore tenetur beatae. Lorem ipsum dolor sit, amet
							consectetur adipisicing elit. Quia quasi impedit aut architecto, illo
							velit minima vitae ut nesciunt eveniet hic qui deleniti fugiat soluta
							modi rerum labore tenetur beatae. Lorem ipsum dolor sit, amet
							consectetur adipisicing elit. Quia quasi impedit aut architecto, illo
							velit minima vitae ut nesciunt eveniet hic qui deleniti fugiat soluta
							modi rerum labore tenetur beatae.
						</p>
					</Tabs.Panel>
				</Tabs>

				<StatusBar
					file={file}
					isProcessing={isProcessing}
					handleProcess={handleProcess}
					progress={progress}
				/>
			</div>
		</div>
	);
}

export default App;
