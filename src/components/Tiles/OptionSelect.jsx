import { Select, SelectItem } from '@heroui/react';

export default function OptionSelect({
	name,
	label,
	selectedKeys,
	onChange,
	items,
	className,
	withLabel = false,
}) {
	return (
		<Select
			className={className}
			size='md'
			name={name}
			aria-label={label}
			maxListboxHeight={200}
			label={withLabel ? label : null}
			// labelPlacement='outside-left'
			classNames={{
				popoverContent: 'dark bg-content2 text-foreground',
			}}
			selectedKeys={selectedKeys}
			onChange={onChange}
		>
			{items.map((item) => (
				<SelectItem key={item.key}>{item.label}</SelectItem>
			))}
		</Select>
	);
}
