import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/react';
import { FileMagnifyingGlassIcon } from '@phosphor-icons/react';
import { useSettings } from '../../contexts/SettingsContext';
import ObjectTreeDisplay from '../ObjectTreeDisplay';

export default function Metadata() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { settings } = useSettings();

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
					<ModalHeader className='flex flex-col gap-1'>
						<span className='font-normal text-default-500 text-xs uppercase tracking-widest'>
							Raw Metadata Tree
						</span>
						<span className='truncate text-lg'>
							{settings.input.path?.split('/').pop()}
						</span>
					</ModalHeader>
					<ModalBody className='py-4'>
						<ObjectTreeDisplay obj={settings.input.metadata} />
					</ModalBody>
				</ModalContent>
			</Modal>
			<Button isIconOnly onPress={onOpen}>
				<FileMagnifyingGlassIcon size={20} />
			</Button>
		</>
	);
}
