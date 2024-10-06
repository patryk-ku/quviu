import { Title, Text, ActionIcon } from '@mantine/core';
import { Minus, Resize, X } from '@phosphor-icons/react';

function TitleBar() {
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
			className='flex select-none items-center justify-between gap-1 bg-[--mantine-color-dark-9] p-2'
		>
			<div className='flex items-baseline gap-1'>
				<Title order={2}>QuViU</Title>
				<Text size='sm' c='dimmed'>
					v0.1.0
				</Text>
			</div>
			<div className='flex gap-2'>
				<ActionIcon
					variant='filled'
					color='yellow.5'
					onClick={handleMinimize}
					className='title-bar-button'
				>
					<Minus size={34} weight='bold' />
				</ActionIcon>
				<ActionIcon
					variant='filled'
					color='green'
					onClick={handleMaximize}
					className='title-bar-button'
				>
					<Resize size={34} weight='bold' />
				</ActionIcon>
				<ActionIcon
					variant='filled'
					color='red'
					onClick={handleClose}
					className='title-bar-button'
				>
					<X size={34} weight='bold' />
				</ActionIcon>
			</div>
		</div>
	);
}

export default TitleBar;
