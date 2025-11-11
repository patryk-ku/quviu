import { Input, Select, SelectItem, Switch } from '@heroui/react';
import { FileIcon, FolderSimpleIcon } from '@phosphor-icons/react';
import CopyText from '../CopyText';

export const extensions = [
	{ key: 'mp4', label: 'mp4' },
	{ key: 'mov', label: 'mov' },
	{ key: 'avi', label: 'avi' },
	{ key: 'mkv', label: 'mkv' },
	{ key: 'webm', label: 'webm' },
	{ key: 'mp3', label: 'mp3' },
	{ key: 'wav', label: 'wav' },
	{ key: 'aac', label: 'aac' },
	{ key: 'flac', label: 'flac' },
	{ key: 'ogg', label: 'ogg' },
];

export default function File() {
	return (
		<div className='flex h-full items-center justify-center'>
			<div className='flex w-3/4 flex-col gap-4'>
				<Input
					label='Output folder'
					startContent={
						<FolderSimpleIcon weight='fill' size={20} className='text-default-400' />
					}
				/>
				<div className='flex gap-4'>
					<Input
						label='File name'
						startContent={
							<FileIcon weight='fill' size={20} className='text-default-400' />
						}
					/>
					<Select
						className='max-w-[130px]'
						label='File extension'
						maxListboxHeight={220}
						classNames={{
							popoverContent: 'dark bg-content2 text-foreground',
						}}
					>
						{extensions.map((ext) => (
							<SelectItem key={ext.key}>.{ext.label}</SelectItem>
						))}
					</Select>
				</div>
				<div className='flex flex-col gap-2'>
					<Switch size='sm'>Overwrite file if exists</Switch>
					<Switch size='sm'>Map all streams</Switch>
				</div>
				<div className='flex flex-col'>
					<span className='text-default-400 text-sm'>Final file path:</span>
					<span className='break-words text-md text-primary-500'>
						/home/user/Videos/file.mp4 <CopyText value={'test'} />
					</span>
				</div>
			</div>
		</div>
	);
}
