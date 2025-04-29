import { NumberInput, SegmentedControl, Text } from '@mantine/core';

export default function TitledSegmentedControl({
	label,
	data,
	value,
	onChange,
	custom,
	allowDecimal = false,
	suffix = '',
}) {
	return (
		<div className='grid grid-cols-[min-content_min-content_min-content] items-center gap-2.5'>
			<Text size='sm' className='select-none'>
				{label}:
			</Text>
			{custom && (
				<NumberInput
					variant='filled'
					placeholder={label}
					value={value}
					onChange={onChange}
					className='w-24'
					min={1}
					allowNegative={false}
					allowLeadingZeros={false}
					allowDecimal={allowDecimal}
					suffix={suffix}
				/>
			)}
			<SegmentedControl color='accent' data={data} value={value} onChange={onChange} />
		</div>
	);
}
