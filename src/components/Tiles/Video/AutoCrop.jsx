import { ScissorsIcon } from '@phosphor-icons/react';
import Tile from '../Tile';

export default function AutoCrop() {
	return (
		<Tile
			option='video'
			suboption='autoCrop'
			title={'Crop black bars'}
			icon={<ScissorsIcon weight='bold' size={60} />}
		></Tile>
	);
}
