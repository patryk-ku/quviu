import { CopyButton, ActionIcon, Tooltip } from '@mantine/core';
import { Copy, Check } from '@phosphor-icons/react';

export default function CopyText({ value }) {
	return (
		<CopyButton value={value} timeout={2000}>
			{({ copied, copy }) => (
				<Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position='right'>
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
