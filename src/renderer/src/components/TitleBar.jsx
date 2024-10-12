import { useEffect } from 'react';
import { Title, Text, ActionIcon, ColorInput } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { GithubLogo, Minus, Square, X } from '@phosphor-icons/react';

export default function TitleBar({ setColors }) {
	const [color, setColor] = useLocalStorage({
		key: 'color',
		defaultValue: '#7950f2',
	});

	useEffect(() => {
		const colorMap = {
			'#fa5252': ['red', 'pink'],
			'#e64980': ['pink', 'grape'],
			'#be4bdb': ['grape', 'grape'],
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

		setColors(colorMap[color]);
	}, [color]);

	const handleMinimize = () => {
		window.api.minimize();
	};

	const handleMaximize = () => {
		window.api.maximize();
	};

	const handleClose = () => {
		window.api.close();
	};

	return (
		<div
			id='title-bar'
			className='grid select-none grid-cols-[auto,1fr,auto] items-center justify-between gap-1 bg-[--mantine-color-dark-9]'
		>
			<div className='flex items-baseline gap-1 px-2 py-1'>
				<Title order={2}>Quviu</Title>
				<Text size='sm' c='dimmed'>
					v1.0.0
				</Text>
			</div>
			<div className='flex items-center gap-4'>
				<ActionIcon
					variant='subtle'
					color='gray'
					className='title-bar-button ml-4'
					size='lg'
				>
					<GithubLogo size={22} weight='fill' />
				</ActionIcon>
				<ColorInput
					size='xs'
					placeholder='theme'
					className='title-bar-button w-[100px]'
					withEyeDropper={false}
					disallowInput
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
					closeOnColorSwatchClick
				/>
			</div>
			<div className='flex gap-1 px-1'>
				<ActionIcon
					variant='subtle'
					color='yellow'
					onClick={handleMinimize}
					className='title-bar-button'
					size='lg'
				>
					<Minus size={24} weight='bold' />
				</ActionIcon>
				<ActionIcon
					variant='subtle'
					color='green'
					onClick={handleMaximize}
					className='title-bar-button'
					size='lg'
				>
					<Square size={20} weight='bold' />
				</ActionIcon>
				<ActionIcon
					variant='subtle'
					color='red'
					onClick={handleClose}
					className='title-bar-button'
					size='lg'
				>
					<X size={24} weight='bold' />
				</ActionIcon>
			</div>
		</div>
	);
}
