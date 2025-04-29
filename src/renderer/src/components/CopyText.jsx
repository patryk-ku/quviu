import { ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { Check, Copy } from '@phosphor-icons/react';

export default function CopyText({ value, label }) {
	return (
		<CopyButton value={value} timeout={2000}>
			{({ copied, copy }) => (
				<Tooltip
					label={copied ? 'Copied' : label ? label : 'Copy to clipboard'}
					withArrow
					position='right'
				>
					<ActionIcon color={copied ? 'teal' : 'gray'} variant='subtle' onClick={copy}>
						{copied ? (
							<Check size={14} weight='bold' />
						) : (
							<Copy size={14} weight='bold' />
						)}
					</ActionIcon>
				</Tooltip>
			)}
		</CopyButton>
	);
}
