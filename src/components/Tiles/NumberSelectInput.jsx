import { Autocomplete, AutocompleteItem } from '@heroui/react';

export default function NumberSelectInput({
	label,
	value,
	onChange,
	options,
	isDisabled,
	className,
	...props
}) {
	const handleInputChange = (inputValue) => {
		if (inputValue === null) {
			return;
		}
		// Allow only numbers
		const sanitizedValue = inputValue.replace(/[^0-9]/g, '');

		// Do not allow values starting with 0
		if (sanitizedValue.length > 1 && sanitizedValue.startsWith('0')) {
			return;
		}
		if (sanitizedValue === '0') {
			return;
		}

		onChange(sanitizedValue);
	};

	return (
		<Autocomplete
			allowsCustomValue
			size='md'
			aria-label={label}
			// label={label}
			// labelPlacement='outside-left'
			className={className}
			value={value}
			inputValue={value?.toString() || ''}
			onInputChange={handleInputChange}
			onSelectionChange={(key) => handleInputChange(key)}
			isDisabled={isDisabled}
			classNames={{
				popoverContent: 'dark bg-content2 text-foreground',
			}}
			{...props}
		>
			{options.map((option) => (
				<AutocompleteItem key={option.value} textValue={option.value}>
					{option.label}
				</AutocompleteItem>
			))}
		</Autocomplete>
	);
}
