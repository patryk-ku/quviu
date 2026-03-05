import { Button } from '@heroui/react';
import { FileIcon } from '@phosphor-icons/react';
import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';
import { useSettings } from '../contexts/SettingsContext';

export default function Welcome() {
	const { updateMainSettings } = useSettings();

	const handleOpen = async () => {
		try {
			const file = await open({
				multiple: false,
				directory: false,
			});

			if (!file) {
				throw new Error('No file selected');
			}

			const metadata = await invoke('open_file', { path: file });
			console.log(metadata);

			if (!metadata) {
				throw new Error("Can't read metadata.");
			}

			updateMainSettings('input', 'path', file);
			updateMainSettings('input', 'metadata', metadata);
		} catch (err) {
			console.error(err);
			updateMainSettings('input', 'path', null);
			updateMainSettings('input', 'metadata', null);
		}
	};

	return (
		<div className='flex h-full w-full flex-col items-center justify-center gap-2 text-xl'>
			<span>It's a bit empty here!</span>
			<span>Open a file to get started.</span>
			<Button
				color='primary'
				size='lg'
				startContent={<FileIcon size={22} weight='bold' />}
				className='mt-2'
				onPress={handleOpen}
			>
				Open file
			</Button>
		</div>
	);
}
