import { Chip, Text } from '@mantine/core';

export default function TitledChipGroup({ label, data, value, onChange }) {
	return (
		<div className='grid grid-cols-[min-content_min-content] items-center gap-2'>
			<Text size='sm' className='select-none'>
				{label}:
			</Text>
			<div className='flex gap-1.5'>
				<Chip.Group value={value} onChange={onChange}>
					{data.map((item) => (
						<Chip
							key={item.value}
							value={item.value}
							size='sm'
							color='accent'
							radius='md'
						>
							{item.label}
						</Chip>
					))}
				</Chip.Group>
			</div>
		</div>
	);
}
