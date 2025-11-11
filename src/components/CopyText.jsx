import { Button } from '@heroui/react';
import { CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { useState } from 'react';

export default function CopyText({ value }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard
			.writeText(value)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			})
			.catch((err) => {
				console.error('Failed to copy text: ', err);
			});
	};

	return (
		<Button
			isIconOnly
			variant='light'
			size='sm'
			onPress={handleCopy}
			color={copied ? 'success' : 'default'}
			aria-label='Copy to clipboard'
			disabled={copied}
		>
			{copied ? <CheckIcon size={14} weight='bold' /> : <CopyIcon size={14} weight='bold' />}
		</Button>
	);
}
