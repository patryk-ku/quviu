import { Button } from '@heroui/react';
import { XIcon } from '@phosphor-icons/react';

import { useSettings } from '../contexts/SettingsContext';

import Metadata from './Modals/Metadata.jsx';
import Settings from './Modals/Settings.jsx';
import Start from './Modals/Start.jsx';
import TabBar from './Tabs/TabBar';

export default function Header({ activeTab, setActiveTab }) {
	const { updateMainSettings } = useSettings();

	const handleClearFile = () => {
		updateMainSettings('input', 'path', null);
		updateMainSettings('input', 'metadata', null);
	};

	return (
		<header className='flex items-center justify-between px-2 pt-2'>
			<div className='flex flex-1 items-center gap-2'>
				{/* <img src='/icon.svg' alt='Quviu logo' className='max-h-10' />*/}
				{/* <span className='text-xl'>Quviu v2.0.0</span>*/}
				<Start />
				<Metadata />
				<Button variant='flat' color='danger' isIconOnly onPress={handleClearFile}>
					<XIcon size={20} />
				</Button>
			</div>
			<div className='flex-shrink-0'>
				<TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
			</div>
			<div className='flex flex-1 justify-end'>
				<Settings />
			</div>
		</header>
	);
}
