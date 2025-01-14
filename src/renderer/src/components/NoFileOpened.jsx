import { Button, Text } from '@mantine/core';
import { File } from '@phosphor-icons/react';

export default function NoFileOpened({ handleFilePicker }) {
	return (
		<div className='flex h-full w-full flex-col items-center justify-center'>
			<Text size='lg'>It's a bit empty here!</Text>
			<Text size='lg'>Open a file to get started.</Text>
			<Button
				variant='filled'
				color='accent'
				onClick={handleFilePicker}
				size='md'
				leftSection={<File size={22} weight='bold' />}
				className='mt-2'
			>
				Open file
			</Button>
		</div>
	);
}
