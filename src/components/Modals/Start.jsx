import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Progress,
	useDisclosure,
} from '@heroui/react';
import { PlayIcon } from '@phosphor-icons/react';
import { invoke } from '@tauri-apps/api/core';
import { useSettings } from '../../contexts/SettingsContext';

export default function Start() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { settings } = useSettings();

	const handleStart = async () => {
		await invoke('start', { settings });
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				size='sm'
				scrollBehavior='inside'
				classNames={{
					// header: 'border-b border-divider',
					base: 'dark bg-content1 text-foreground',
				}}
				isDismissable={false}
				isKeyboardDismissDisabled={true}
			>
				<ModalContent>
					<ModalHeader>
						<span className='font-normal text-default-500 text-xs uppercase tracking-widest'>
							Process file
						</span>
					</ModalHeader>
					<ModalBody className='py-4'>
						<Progress aria-label='Processing...' value={30} isIndeterminate />
					</ModalBody>
					<ModalFooter>
						<Button
							size='md'
							color='primary'
							startContent={<PlayIcon size={20} weight='fill' />}
							onPress={handleStart}
						>
							Start
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Button
				size='md'
				color='primary'
				startContent={<PlayIcon size={20} weight='fill' />}
				onPress={onOpen}
			>
				Start
			</Button>
		</>
	);
}
