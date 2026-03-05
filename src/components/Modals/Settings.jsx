import {
	Modal,
	ModalBody,
	ModalContent,
	// ModalHeader
} from '@heroui/react';
import { useSettings } from '../../contexts/SettingsContext';
import ObjectTreeDisplay from '../ObjectTreeDisplay';

export default function Settings({ isOpen, onOpenChange }) {
	const { settings } = useSettings();
	// biome-ignore lint: noUnusedVariables
	const { input, ...projectSettings } = settings;

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			size='full'
			scrollBehavior='inside'
			classNames={{
				header: 'border-b border-divider',
				base: 'dark bg-content1 text-foreground',
			}}
		>
			<ModalContent>
				{/* <ModalHeader className='flex flex-col gap-1'>
					<span className='font-normal text-default-500 text-xs uppercase tracking-widest'>
						Settings
					</span>
				</ModalHeader>*/}
				<ModalBody className='py-4'>
					<ObjectTreeDisplay obj={projectSettings} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
