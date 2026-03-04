import { useSettings } from '../../contexts/SettingsContext';

import Merge from '../Tiles/Audio/Merge';
import Reencode from '../Tiles/Audio/Reencode';
import Remove from '../Tiles/Audio/Remove';

export default function Audio() {
	const { settings } = useSettings();

	return (
		<div className='grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-3 p-1'>
			<Remove />
			{!settings.audio.remove.enabled && (
				<>
					<Reencode />
					<Merge />
				</>
			)}
		</div>
	);
}
