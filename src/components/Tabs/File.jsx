import { Input, Switch } from '@heroui/react';
import { FileIcon, FolderSimpleIcon } from '@phosphor-icons/react';
import { useSettings } from '../../contexts/SettingsContext';
import CopyText from '../CopyText';
import OptionSelect from '../Tiles/OptionSelect';

export const extensions = [
	{ key: 'mp4', label: 'mp4' },
	// { key: 'mov', label: 'mov' },
	// { key: 'avi', label: 'avi' },
	{ key: 'webm', label: 'webm' },
	{ key: 'mkv', label: 'mkv' },
	{ key: 'mp3', label: 'mp3' },
	// { key: 'wav', label: 'wav' },
	// { key: 'aac', label: 'aac' },
	{ key: 'flac', label: 'flac' },
	// { key: 'ogg', label: 'ogg' },
	// { key: 'opus', label: 'opus' },
];

export default function File() {
	const { settings, updateMainSettings } = useSettings();

	return (
		<div className='flex h-full items-center justify-center'>
			<div className='flex w-3/4 flex-col gap-4'>
				<Input
					label='Output folder'
					startContent={
						<FolderSimpleIcon weight='fill' size={20} className='text-default-400' />
					}
					value={settings.output.path}
					onValueChange={(v) => {
						updateMainSettings('output', 'path', v);
					}}
				/>
				<div className='flex gap-4'>
					<Input
						label='File name'
						startContent={
							<FileIcon weight='fill' size={20} className='text-default-400' />
						}
						value={settings.output.filename}
						onValueChange={(v) => {
							updateMainSettings('output', 'filename', v);
						}}
					/>
					<OptionSelect
						className='max-w-[130px]'
						label='File extension'
						classNames={{
							popoverContent: 'dark bg-content2 text-foreground',
						}}
						selectedKeys={[settings.output.extension]}
						onChange={(v) => updateMainSettings('output', 'extension', v.target.value)}
						name='extension'
						items={extensions}
						withLabel
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<Switch
						size='sm'
						isSelected={settings.output.overwrite}
						onValueChange={() => {
							updateMainSettings('output', 'overwrite', !settings.output.overwrite);
						}}
					>
						Overwrite file if exists
					</Switch>
					<Switch
						size='sm'
						isSelected={settings.output.mapAllStreams}
						onValueChange={() => {
							updateMainSettings(
								'output',
								'mapAllStreams',
								!settings.output.mapAllStreams
							);
						}}
					>
						Map all streams
					</Switch>
				</div>
				<div className='flex flex-col'>
					<span className='text-default-400 text-sm'>Output file full path:</span>
					<span className='break-words text-md text-primary-500'>
						{`${settings.output.path}${settings.output.filename}.${settings.output.extension}`}
						<CopyText
							value={`${settings.output.path}${settings.output.filename}.${settings.output.extension}`}
						/>
					</span>
				</div>
			</div>
		</div>
	);
}
