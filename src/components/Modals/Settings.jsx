import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	useDisclosure,
	// ModalHeader
} from '@heroui/react';
import { SlidersHorizontalIcon } from '@phosphor-icons/react';
import { useSettings } from '../../contexts/SettingsContext';
import ObjectTreeDisplay from '../ObjectTreeDisplay';

export default function Settings() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { settings } = useSettings();
	// biome-ignore lint: noUnusedVariables
	const { input, ...projectSettings } = settings;

	return (
		<>
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
			<Button isIconOnly aria-label='Settings' onPress={onOpen}>
				<SlidersHorizontalIcon size={20} />
			</Button>
		</>
	);
}
