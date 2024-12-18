import { useEffect } from 'react';
import { Title, ActionIcon, ColorInput, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { GithubLogo } from '@phosphor-icons/react';

export default function Settings({ setColors }) {
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

	return (
		<div className='grid grid-cols-1 gap-2'>
			<Title order={4}>Application Settings</Title>
			<div className='flex items-center gap-4'>
				<Text>Theme:</Text>
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
			<ActionIcon variant='subtle' color='gray' className='title-bar-button' size='lg'>
				<GithubLogo size={22} weight='fill' />
			</ActionIcon>
		</div>
	);
}
