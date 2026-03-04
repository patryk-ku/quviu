import { useSettings } from '../../contexts/SettingsContext';

import AutoCrop from '../Tiles/Video/AutoCrop';
import Framerate from '../Tiles/Video/Framerate';
import Hardsubs from '../Tiles/Video/Hardsubs';
import Reencode from '../Tiles/Video/Reencode';
import Remove from '../Tiles/Video/Remove';
import Resolution from '../Tiles/Video/Resolution';

export default function Video() {
	const { settings } = useSettings();

	return (
		<div className='grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-3 p-1'>
			<Remove />
			{!settings.video.remove.enabled && (
				<>
					<Reencode />
					<Resolution />
					<Framerate />
					<Hardsubs />
					<AutoCrop />
				</>
			)}
		</div>
	);
}
