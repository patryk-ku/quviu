import { Button } from '@heroui/react';
import { FileIcon } from '@phosphor-icons/react';

export default function Welcome({ setFile }) {
	return (
		<div className='flex h-full w-full flex-col items-center justify-center gap-2 text-xl'>
			<span>It's a bit empty here!</span>
			<span>Open a file to get started.</span>
			<Button
				color='primary'
				size='lg'
				startContent={<FileIcon size={22} weight='bold' />}
				className='mt-2'
				onPress={() => setFile('test')}
			>
				Open file
			</Button>
		</div>
	);
}
