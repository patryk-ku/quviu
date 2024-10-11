import { Fragment } from 'react';
import { Badge } from '@mantine/core';
import { formatBitrate } from '../utils';

function formatFps(value) {
	const values = value.split('/');
	const fps = Number(values[0]) / Number(values[1]);
	return `${fps.toFixed(3)} FPS`;
}

export default function StreamsInfo({ streams }) {
	if (streams?.length > 0) {
		return (
			<div className='mb-2 grid grid-cols-[auto,1fr] items-center gap-x-4 gap-y-2'>
				{streams.map((stream, index) => (
					<Fragment key={index}>
						<div className='flex gap-2'>
							<Badge variant='default' color='accent' radius='sm'>
								Stream #{index + 1}
							</Badge>
							{stream?.tags?.title && (
								<Badge variant='outline' color='accent' radius='sm'>
									{stream.tags.title}
								</Badge>
							)}
						</div>
						<div className='flex gap-2'>
							{stream?.codec_name && (
								<Badge variant='light' color='accent' radius='sm'>
									{stream.codec_name}
								</Badge>
							)}
							{stream?.bit_rate && (
								<Badge variant='light' color='accent' radius='sm'>
									{formatBitrate(stream.bit_rate)}
								</Badge>
							)}
							{stream?.avg_frame_rate && stream?.avg_frame_rate !== '0/0' && (
								<Badge variant='light' color='accent' radius='sm'>
									{formatFps(stream.avg_frame_rate)}
								</Badge>
							)}
							{stream?.coded_height && stream?.coded_width && (
								<Badge variant='light' color='accent' radius='sm'>
									{stream.coded_height} x {stream.coded_width}
								</Badge>
							)}
						</div>
					</Fragment>
				))}
			</div>
		);
	}
}
