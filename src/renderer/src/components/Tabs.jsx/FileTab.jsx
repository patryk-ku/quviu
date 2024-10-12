import { Title, TextInput, Text, Select, Switch } from '@mantine/core';
import { FolderSimple, File } from '@phosphor-icons/react';

function FileTab({
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
		<div className='grid grid-cols-1 gap-2'>
			<Title order={4}>Output file settings</Title>
			<TextInput
				label='Output Folder'
				value={outputPath}
				// onChange={(event) => setOutputPath(event.currentTarget.value)}
				onClick={handleFolderPicker}
				// disabled
				error={outputPath.length === 0 ? 'Set output path' : false}
				leftSection={<FolderSimple size={18} weight='bold' />}
				onChange={() => null}
			/>
			<div className='grid grid-cols-[1fr,auto] gap-2'>
				<TextInput
					label='File Name'
					value={outputName}
					onChange={(event) => setOutputName(event.currentTarget.value)}
					leftSection={<File size={18} weight='bold' />}
					error={outputName.length === 0 ? 'Set output name' : false}
				/>
				<Select
					label='File Extension'
					data={['.mp4', '.webm', '.mkv', '.mp3', '.opus']}
					value={outputExtension}
					onChange={setOutputExtension}
					allowDeselect={false}
				/>
			</div>
			<Switch
				label='Overwrite file if exists'
				mt={8}
				radius='sm'
				checked={isOverwrite}
				onChange={(event) => setIsOverwrite(event.currentTarget.checked)}
			/>
			<div className='mt-4'>
				<Text size='xs'>Final file path:</Text>
				<Text c='accent'>
					{outputPath}
					{outputName}
					{outputExtension}
				</Text>
			</div>
		</div>
	);
}

export default FileTab;
