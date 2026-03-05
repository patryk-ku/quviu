import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useSettings } from '../contexts/SettingsContext';

const MetadataItem = ({ label, value, indent = 0 }) => {
	const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
	const isArray = Array.isArray(value);

	if (isObject || isArray) {
		return (
			<div style={{ marginLeft: `${indent * 12}px` }} className='mb-1'>
				<div className='mb-1 font-bold text-primary-500 text-sm uppercase tracking-tight'>
					{label}
				</div>
				<div className='ml-1 flex flex-col gap-1 border-divider border-l pl-3'>
					{Object.entries(value).map(([key, val]) => (
						<MetadataItem key={key} label={key} value={val} indent={0} />
					))}
				</div>
			</div>
		);
	}

	return (
		<div
			style={{ marginLeft: `${indent * 12}px` }}
			className='flex gap-2 rounded px-1 py-0.5 text-sm transition-colors hover:bg-white/5'
		>
			<span className='shrink-0 font-medium text-default-500'>{label}:</span>
			<span className='break-all text-default-900'>{String(value)}</span>
		</div>
	);
};

export default function MetadataModal({ isOpen, onOpenChange }) {
	const { settings } = useSettings();
	const metadata = settings.input.metadata;

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
				<ModalHeader className='flex flex-col gap-1'>
					<span className='font-normal text-default-500 text-xs uppercase tracking-widest'>
						Raw Metadata Tree
					</span>
					<span className='truncate text-lg'>
						{settings.input.path?.split('/').pop()}
					</span>
				</ModalHeader>
				<ModalBody className='py-4 font-mono'>
					{!metadata ? (
						<div className='flex items-center justify-center py-10 text-default-400'>
							No metadata
						</div>
					) : (
						<div className='custom-scrollbar flex flex-col gap-4'>
							{Object.entries(metadata).map(([key, value]) => (
								<MetadataItem key={key} label={key} value={value} />
							))}
						</div>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
