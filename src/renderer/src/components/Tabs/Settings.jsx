import { ColorPicker, ColorSwatch, Text, TextInput, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { GithubLogo, Globe } from '@phosphor-icons/react';
import { useEffect } from 'react';
import CopyText from '../CopyText';

export default function Settings({ setColors, ffmpegPaths }) {
	const [color, setColor] = useLocalStorage({
		key: 'color',
		defaultValue: '#7950f2',
	});

	const { ffmpegPath, setFfmpegPath, ffprobePath, setFfprobePath } = ffmpegPaths;

	const colorMap = {
		'#fa5252': ['red', 'pink'],
		'#e64980': ['pink', 'grape'],
		'#be4bdb': ['grape', 'violet'],
		'#7950f2': ['violet', 'grape'],
		'#4c6ef5': ['indigo', 'cyan'],
		'#228be6': ['blue', 'cyan'],
		'#15aabf': ['cyan', 'green'],
		'#12b886': ['teal', 'cyan'],
		'#40c057': ['green', 'lime'],
		'#82c91e': ['lime', 'teal'],
		'#fab005': ['yellow', 'orange'],
		'#fd7e14': ['orange', 'red'],
	};

	useEffect(() => {
		setColors(colorMap[color]);
	}, [color]);

	return (
		<div className='grid grid-cols-1 gap-2'>
			<Title order={4}>Application Settings</Title>
			<div className='mt-2 grid grid-cols-1 gap-6'>
				<div className='grid gap-1'>
					<Title order={5}>Theme</Title>
					<div className='mb-1 flex items-center gap-1'>
						<Text>Current theme:</Text>
						<ColorSwatch
							color={`var(--mantine-color-${colorMap[color][0]}-6)`}
							radius='sm'
							className='ml-2'
						/>
						<ColorSwatch
							color={`var(--mantine-color-${colorMap[color][1]}-6)`}
							radius='sm'
						/>
					</div>
					<div className='flex'>
						<div className='rounded border border-[--tab-border-color] bg-[--mantine-color-dark-6] px-1.5 pb-1'>
							<ColorPicker
								size='xs'
								placeholder='theme'
								className='title-bar-button w-[100px]'
								withPicker={false}
								format='hex'
								swatches={[
									'#fa5252',
									'#e64980',
									'#be4bdb',
									'#7950f2',
									'#4c6ef5',
									'#228be6',
									'#15aabf',
									'#12b886',
									'#40c057',
									'#82c91e',
									'#fab005',
									'#fd7e14',
								]}
								value={color}
								onChange={setColor}
								swatchesPerRow={6}
							/>
						</div>
					</div>
				</div>

				<div className='grid gap-1'>
					<Title order={5}>Custom ffmpeg paths</Title>
					<Text size='sm' c='dimmed'>
						May require restart.
					</Text>
					<TextInput
						variant='filled'
						label='ffmpeg'
						value={ffmpegPath}
						onChange={(event) => setFfmpegPath(event.target.value)}
					/>
					<TextInput
						variant='filled'
						label='ffprobe'
						value={ffprobePath}
						onChange={(event) => setFfprobePath(event.target.value)}
					/>
				</div>

				<div className='grid gap-1'>
					<Title order={5}>About</Title>
					<div className='flex select-text items-center gap-2'>
						<GithubLogo size={24} weight='fill' />
						<Text>https://github.com/patryk-ku/quviu</Text>
						<CopyText value='https://github.com/patryk-ku/quviu' />
					</div>
					<div className='flex select-text items-center gap-2'>
						<Globe size={24} weight='bold' />
						<Text>https://patryk-ku.ct8.pl</Text>
						<CopyText value='https://patryk-ku.ct8.pl' />
					</div>
				</div>
			</div>
		</div>
	);
}
