import { SpeakerXIcon } from '@phosphor-icons/react';
import Tile from '../Tile';

export default function Remove() {
	return (
		<Tile
			option='audio'
			suboption='remove'
			title={'Remove audio'}
			icon={<SpeakerXIcon weight='fill' size={60} />}
		></Tile>
	);
}
