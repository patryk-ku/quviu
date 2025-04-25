import { Badge, Modal, Table, Text, Title } from '@mantine/core';
import { Check, FileAudio, X } from '@phosphor-icons/react';
import {
	calculateFrameRate,
	estimateFileSize,
	formatBitrate,
	formatDuration,
	formatFileSize,
	getFileExtension,
} from '../utils';

function getVideoCodec(value) {
	switch (value) {
		case 'libx264':
			return 'h264';
		case 'libx265':
			return 'hevc';
		case 'libvpx-vp9':
			return 'vp9';
		case 'libaom-av1':
			return 'av1';
		default:
			return value;
	}
}

export default function SummaryModal({
	opened,
	close,
	file,
	metadata,
	thumbnail,
	video,
	audio,
	trim,
}) {
	const videoStreams = metadata?.streams.filter(
		(stream) => stream.codec_type === 'video' && stream.codec_name !== 'mjpeg'
	);
	const isVideo = videoStreams?.length > 0 ? true : false;
	const videoBitrate =
		formatBitrate(videoStreams?.at(0)?.bit_rate) == 'unknown bitrate'
			? `~ ${formatBitrate(metadata?.format?.bit_rate)}`
			: formatBitrate(videoStreams?.at(0)?.bit_rate);
	const fps = calculateFrameRate(videoStreams?.at(0)?.avg_frame_rate);
	const resolution = videoStreams?.at(0)?.height;

	const audioStreams = metadata?.streams.filter((stream) => stream.codec_type === 'audio');
	const isAudio = audioStreams?.length > 0 ? true : false;
	const audioBitrate = formatBitrate(audioStreams?.at(0)?.bit_rate);

	const rows = [];

	// Video compression
	if (video.isCompress && !video.isDisabled) {
		if (getVideoCodec(video.codec) != videoStreams?.at(0)?.codec_name) {
			rows.push({
				label: 'video codec',
				original: videoStreams?.at(0)?.codec_name,
				new: getVideoCodec(video.codec),
			});
		}
		const newBitrate = formatBitrate(video.bitrate * 1000);
		if (newBitrate != videoBitrate) {
			rows.push({
				label: 'video bitrate',
				original: videoBitrate,
				new: newBitrate,
			});
		}
	}

	// Video resolution
	if (video.isResolution && !video.isDisabled && video.resolution != resolution) {
		rows.push({
			label: 'resolution',
			original: `${resolution}p`,
			new: `${video.resolution}p`,
		});
	}

	// Video FPS
	if (video.isFps && !video.isDisabled && video.fps != fps) {
		rows.push({
			label: 'FPS',
			original: fps,
			new: video.fps,
		});
	}

	// Video disabled
	if (video.isDisabled) {
		rows.push({
			label: 'video',
			original: (
				<Text c='green'>
					<Check size={21} weight='bold' />
				</Text>
			),
			new: (
				<Text c='red'>
					<X size={21} weight='bold' />
				</Text>
			),
		});
	}

	// Audio compression
	if (audio.isCompress && !audio.isMuted && isAudio) {
		if (audioStreams?.at(0)?.codec_name != audio.codec) {
			rows.push({
				label: 'audio codec',
				original: audioStreams?.at(0)?.codec_name,
				new: audio.codec,
			});
		}
		const newBitrate = formatBitrate(audio.bitrate * 1000);
		if (newBitrate != audioBitrate) {
			rows.push({
				label: 'audio bitrate',
				original: audioBitrate,
				new: newBitrate,
			});
		}
	}

	// Audio streams
	if (audio.isMerge && !audio.isMuted && isAudio) {
		rows.push({
			label: 'audio streams',
			original: audioStreams?.length,
			new: 1,
		});
	}

	// Audio muted
	if (audio.isMuted && isAudio) {
		rows.push({
			label: 'audio',
			original: (
				<Text c='green'>
					<Check size={21} weight='bold' />
				</Text>
			),
			new: (
				<Text c='red'>
					<X size={21} weight='bold' />
				</Text>
			),
		});
	}

	// Video trim
	if (trim.isEnabled) {
		rows.push({
			label: 'duration',
			original: `00:00 - ${formatDuration(metadata?.format?.duration)}`,
			new: `${formatDuration(trim.start)} - ${formatDuration(trim.end)}`,
		});
	}

	// File size
	const fileSize = estimateFileSize({ metadata, video, audio, trim });
	if (fileSize && metadata?.format?.size && metadata?.format?.size != fileSize) {
		rows.push({
			label: 'file size',
			original: formatFileSize(metadata?.format?.size),
			new: `~${fileSize}`,
		});
	}

	return (
		<Modal opened={opened} onClose={close} centered size='auto' withCloseButton={false}>
			<div className='grid gap-4'>
				<div>
					<Title order={4}>Input file</Title>
					<div className='flex'>
						<div className='app-background-alt my-1 my-border grid min-h-[60px] grid-cols-[auto_1fr] gap-3 overflow-clip rounded-lg border'>
							<div>
								{isVideo ? (
									<img src={thumbnail} />
								) : (
									<div className='flex h-full items-center pl-3'>
										<FileAudio size={38} weight='bold' />
									</div>
								)}
							</div>
							<div className='flex flex-col justify-center gap-1 pr-3'>
								<Text size='sm' lineClamp={1} fw={700}>
									{metadata?.name ? metadata?.name : file}
								</Text>
								{metadata && (
									<div className='flex gap-2'>
										{metadata?.format?.duration && (
											<Badge variant='light' size='md' radius='md'>
												{formatDuration(metadata?.format?.duration)}
											</Badge>
										)}
										{metadata?.format?.size && (
											<Badge variant='light' size='md' radius='md'>
												{formatFileSize(metadata?.format?.size)}
											</Badge>
										)}
										{file && (
											<Badge variant='light' size='md' radius='md'>
												{getFileExtension(file)}
											</Badge>
										)}
										<Badge variant='light' size='md' radius='md'>
											{fps} FPS
										</Badge>
										{metadata?.format?.bit_rate && (
											<Badge variant='light' size='md' radius='md'>
												{formatBitrate(metadata?.format?.bit_rate)}
											</Badge>
										)}
										{metadata?.streams && (
											<Badge variant='light' size='md' radius='md'>
												{metadata?.streams.length} streams
											</Badge>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div>
					<Title order={4} className='pb-2'>
						Summary of changes
					</Title>
					{rows.length > 0 ? (
						<div className='my-border rounded-lg border'>
							<Table withColumnBorders striped withRowBorders={false}>
								<Table.Thead>
									<Table.Tr>
										<Table.Th></Table.Th>
										<Table.Th>Original</Table.Th>
										<Table.Th>
											<Text fw={700} size='sm' variant='gradient'>
												Processed
											</Text>
										</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>
									{rows.map((row) => (
										<Table.Tr key={row.label}>
											<Table.Td>{row.label}</Table.Td>
											<Table.Td>{row.original}</Table.Td>
											<Table.Td>{row.new}</Table.Td>
										</Table.Tr>
									))}
								</Table.Tbody>
							</Table>
						</div>
					) : (
						<Text c='dimmed' ta='center'>
							no changes applied
						</Text>
					)}
				</div>
			</div>
		</Modal>
	);
}
