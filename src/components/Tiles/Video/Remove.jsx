import { VideoCameraSlashIcon } from '@phosphor-icons/react';
import Tile from '../Tile';

export default function Remove() {
	return (
		<Tile
			option='video'
			suboption='remove'
			title={'Remove video'}
			icon={<VideoCameraSlashIcon weight='bold' size={60} />}
		></Tile>
	);
}
