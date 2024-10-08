import { Title, Switch, Collapse } from '@mantine/core';

export default function Audio({ audio, setAudio }) {
	const handleMute = (event) => {
		setAudio((prevAudio) => ({
			...prevAudio,
			isMuted: event.currentTarget.checked,
		}));
	};

	const handleMerge = (event) => {
		setAudio((prevAudio) => ({
			...prevAudio,
			isMerge: event.currentTarget.checked,
		}));
	};

	return (
		<div className='grid grid-cols-1 gap-2'>
			<Title order={4}>Audio Settings</Title>
			<Switch label='Mute audio' radius='sm' checked={audio.isMuted} onChange={handleMute} />
			<Collapse in={!audio.isMuted}>
				<div className='grid grid-cols-1 gap-2'>
					<Switch
						label='Merge all audio streams'
						radius='sm'
						checked={audio.isMerge}
						onChange={handleMerge}
					/>
				</div>
			</Collapse>
		</div>
	);
}
