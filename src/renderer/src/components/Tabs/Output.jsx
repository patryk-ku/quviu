import { Select, Switch, Text, TextInput, Title } from '@mantine/core';
import { File, FolderSimple } from '@phosphor-icons/react';
import CopyText from '../CopyText';

export default function Output({
	outputPath,
	setOutputPath,
	outputName,
	setOutputName,
	outputExtension,
	setOutputExtension,
	isOverwrite,
	setIsOverwrite,
}) {
	const handleFolderPicker = async () => {
		const folderPath = await window.api.openFolder();
		if (folderPath) {
			setOutputPath(folderPath);
			console.log('Selected output folder path: ', folderPath);
		}
	};

	return (
		<div className='grid select-none grid-cols-1 gap-2'>
			<Title order={4}>Output file settings</Title>
			<TextInput
				variant='filled'
				label='Output Folder'
				value={outputPath}
				onClick={handleFolderPicker}
				error={outputPath.length === 0 ? 'Set output path' : false}
				leftSection={<FolderSimple size={18} weight='bold' />}
				onChange={() => null}
			/>
			<div className='grid grid-cols-[1fr,auto] gap-2'>
				<TextInput
					variant='filled'
					label='File Name'
					value={outputName}
					onChange={(event) => setOutputName(event.target.value)}
					leftSection={<File size={18} weight='bold' />}
					error={outputName.length === 0 ? 'Set output name' : false}
				/>
				<Select
					variant='filled'
					label='File Extension'
					data={[
						{ group: '', items: ['.mp4', '.webm', '.mkv'] },
						{
							group: 'Audio only',
							items: ['.mp3', '.aac', '.m4a', '.ogg', '.opus', '.flac'],
						},
					]}
					value={outputExtension}
					onChange={setOutputExtension}
					allowDeselect={false}
				/>
			</div>
			<Text size='sm' c='dimmed'>
				Note: Not every file format is compatible with all video and audio codecs. Please
				ensure your selected format and codec are supported.
			</Text>
			<div className='flex'>
				<Switch
					label='Overwrite file if exists'
					mt={8}
					radius='md'
					checked={isOverwrite}
					onChange={(event) => setIsOverwrite(event.currentTarget.checked)}
				/>
			</div>
			<div className='mt-4'>
				<Text size='xs'>Final file path:</Text>
				<div className='flex flex-wrap items-center gap-1'>
					<Text span c='accent' className='select-text'>
						{outputPath + outputName.trim() + outputExtension}
					</Text>
					<CopyText value={outputPath + outputName.trim() + outputExtension} />
				</div>
			</div>
		</div>
	);
}
