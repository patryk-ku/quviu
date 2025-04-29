import { Badge, Button, Card, Modal, Table, Text } from '@mantine/core';
import { useState } from 'react';

export default function CodecInfo() {
	const [opened, setOpened] = useState(false);

	return (
		<>
			<Button variant='subtle' size='xs' onClick={() => setOpened(true)}>
				Help me choose
			</Button>

			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title='Bitrate Conversion Rates (for same quality as H.264 at 10 000 kbps)'
				size='auto'
				centered
			>
				<div className='grid max-w-[800px] gap-4'>
					<div>
						<div className='my-border rounded-lg border'>
							<Table withColumnBorders striped withRowBorders={false}>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Codec</Table.Th>
										<Table.Th>Bitrate</Table.Th>
										<Table.Th>Size Saving vs H.264</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>
									<Table.Tr>
										<Table.Td>H.264</Table.Td>
										<Table.Td>10 000 kbps</Table.Td>
										<Table.Td></Table.Td>
									</Table.Tr>
									<Table.Tr>
										<Table.Td>H.265 HEVC</Table.Td>
										<Table.Td>5 000 kbps</Table.Td>
										<Table.Td>≈ 50 % smaller</Table.Td>
									</Table.Tr>
									<Table.Tr>
										<Table.Td>VP9</Table.Td>
										<Table.Td>6 000 kbps</Table.Td>
										<Table.Td>≈ 40 % smaller</Table.Td>
									</Table.Tr>
									<Table.Tr>
										<Table.Td>AV1</Table.Td>
										<Table.Td>4 000 kbps</Table.Td>
										<Table.Td>≈ 60 % smaller</Table.Td>
									</Table.Tr>
								</Table.Tbody>
							</Table>
						</div>
						<Text size='xs' c='dimmed'>
							These are approximate values, actual results may vary based on content
							type and encoder settings.
						</Text>
					</div>

					<div>
						<div className='grid grid-cols-2 gap-4'>
							<Card radius='md' withBorder>
								<div className='flex justify-between gap-2'>
									<Text fw={700}>H.264</Text>
									<Badge color='blue' radius='md' size='xs'>
										Widely Supported
									</Badge>
								</div>

								<Text size='sm'>
									Standard codec with universal support across all devices. Offers
									good quality but requires higher bitrates compared to newer
									codecs.
								</Text>
							</Card>

							<Card radius='md' withBorder>
								<div className='flex justify-between gap-2'>
									<Text fw={700}>H.265 HEVC</Text>
									<Badge color='orange' radius='md' size='xs'>
										Proprietary
									</Badge>
								</div>

								<Text size='sm'>
									Achieves better compression than H.264 but has limited support
									on some platforms due to licensing issues.
								</Text>
							</Card>

							<Card radius='md' withBorder>
								<div className='flex justify-between gap-2'>
									<Text fw={700}>VP9</Text>
									<Badge color='green' radius='md' size='xs'>
										Open Source
									</Badge>
								</div>

								<Text size='sm'>
									Open-source alternative to HEVC developed by Google.
									Well-supported in browsers and YouTube but less common in
									hardware devices.
								</Text>
							</Card>

							<Card radius='md' withBorder>
								<div className='flex justify-between gap-2'>
									<Text fw={700}>AV1</Text>
									<Badge color='grape' radius='md' size='xs'>
										Hardware Acceleration Needed
									</Badge>
								</div>

								<Text size='sm'>
									Newest codec offering the best compression efficiency. Requires
									hardware acceleration for efficient encoding.
								</Text>
							</Card>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}
