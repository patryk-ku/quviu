import { ArrowsMergeIcon } from '@phosphor-icons/react';
import Tile from '../Tile';

export default function Merge() {
	return (
		<Tile
			option='audio'
			suboption='merge'
			title={'Merge all streams'}
			icon={<ArrowsMergeIcon weight='bold' size={70} className='rotate-270' />}
		/>
	);
}
