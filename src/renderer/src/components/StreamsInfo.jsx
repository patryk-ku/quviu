import { Badge } from '@mantine/core';
import { Fragment } from 'react';
import { calculateFrameRate, formatBitrate } from '../utils';

export default function StreamsInfo({ streams, metadata }) {
	if (streams?.length > 0) {
		let bitrate = formatBitrate(streams?.at(0)?.bit_rate);
		if (metadata) {
			bitrate =
				bitrate == 'unknown bitrate'
					? `~ ${formatBitrate(metadata?.format?.bit_rate)}`
					: bitrate;
		}

		return (
			<div className='mb-2 grid select-text grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2'>
				{streams.map((stream, index) => (
					<Fragment key={index}>
						<div className='flex gap-2'>
							<Badge variant='default' color='accent' radius='md'>
								Stream #{index + 1}
							</Badge>
							{stream?.tags?.title && (
								<Badge variant='outline' color='accent' radius='md'>
									{stream.tags.title}
								</Badge>
							)}
						</div>
						<div className='flex gap-2'>
							{stream?.codec_name && (
								<Badge variant='light' radius='md'>
									{stream.codec_name}
								</Badge>
							)}
							{stream?.channel_layout && (
								<Badge variant='light' radius='md'>
									{stream.channel_layout}
								</Badge>
							)}
							{stream?.bit_rate && (
								<Badge variant='light' radius='md'>
									{bitrate}
								</Badge>
							)}
							{stream?.sample_rate && (
								<Badge variant='light' radius='md'>
									{stream.sample_rate / 1000} kHz
								</Badge>
							)}
							{stream?.avg_frame_rate && stream?.avg_frame_rate !== '0/0' && (
								<Badge variant='light' radius='md'>
									{calculateFrameRate(stream.avg_frame_rate)} FPS
								</Badge>
							)}
							{stream?.coded_height && stream?.coded_width && (
								<Badge variant='light' radius='md'>
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
