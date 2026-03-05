import { Button, useDisclosure } from '@heroui/react';
import {
	FileMagnifyingGlassIcon,
	PlayIcon,
	SlidersHorizontalIcon,
	// FileXIcon,
	XIcon,
} from '@phosphor-icons/react';
import { invoke } from '@tauri-apps/api/core';
import { useSettings } from '../contexts/SettingsContext';

import Metadata from './Modals/Metadata.jsx';
import Settings from './Modals/Settings.jsx';
import TabBar from './Tabs/TabBar';

async function greet() {
	// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
	console.log(await invoke('greet', { name: 'test' }));
}

export default function Header({ activeTab, setActiveTab }) {
	const { updateMainSettings } = useSettings();
	const {
		isOpen: isMetadataOpen,
		onOpen: onMetadataOpen,
		onOpenChange: onMetadataOpenChange,
	} = useDisclosure();
	const {
		isOpen: isSettingsOpen,
		onOpen: onSettingsOpen,
		onOpenChange: onSettingsOpenChange,
	} = useDisclosure();

	const handleClearFile = () => {
		updateMainSettings('input', 'path', null);
		updateMainSettings('input', 'metadata', null);
	};

	return (
		<header className='flex items-center justify-between px-2 pt-2'>
			<div className='flex flex-1 items-center gap-2'>
				{/* <img src='/icon.svg' alt='Quviu logo' className='max-h-10' />*/}
				{/* <span className='text-xl'>Quviu v2.0.0</span>*/}
				<Button
					size='md'
					color='primary'
					startContent={<PlayIcon size={20} weight='fill' />}
					onPress={greet}
				>
					Start
				</Button>
				<Button isIconOnly onPress={onMetadataOpen}>
					<FileMagnifyingGlassIcon size={20} />
				</Button>
				<Metadata isOpen={isMetadataOpen} onOpenChange={onMetadataOpenChange} />
				<Button variant='flat' color='danger' isIconOnly onPress={handleClearFile}>
					<XIcon size={20} />
				</Button>
			</div>
			<div className='flex-shrink-0'>
				<TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
			</div>
			<div className='flex flex-1 justify-end'>
				<Button isIconOnly aria-label='Settings' onPress={onSettingsOpen}>
					<SlidersHorizontalIcon size={20} />
				</Button>
				<Settings isOpen={isSettingsOpen} onOpenChange={onSettingsOpenChange} />
			</div>
		</header>
	);
}
