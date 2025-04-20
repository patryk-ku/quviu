import { SegmentedControl, Text } from '@mantine/core';

export default function TitledSegmentedControl({ label, data, value, onChange }) {
	return (
		<div className='grid grid-cols-[min-content_min-content] items-center gap-2'>
			<Text size='sm' className='select-none'>
				{label}
			</Text>
			<SegmentedControl color='accent' data={data} value={value} onChange={onChange} />
		</div>
	);
}
