import { ActionIcon, Tabs, Text, Title } from '@mantine/core';
import {
	ArrowsInLineHorizontal,
	File,
	FrameCorners,
	// Star,
	GearSix,
	Minus,
	SpeakerHigh,
	Square,
	X,
} from '@phosphor-icons/react';

export default function TitleBar({ activeTab, setActiveTab }) {
	const handleMinimize = () => {
		window.api.minimize();
	};

	const handleMaximize = () => {
		window.api.maximize();
	};

	const handleClose = () => {
		window.api.close();
	};

	return (
		<div
			id='title-bar'
			className='grid select-none grid-cols-[auto,1fr,auto] items-center justify-between gap-2 bg-[--mantine-color-dark-9] p-0.5'
		>
			<div className='flex items-baseline gap-1 px-2 py-1'>
				<Title order={2}>
					<Text c='accent' span inherit>
						Q
					</Text>
					uviu
				</Title>
				<Text size='sm' c='dimmed'>
					v1.0.2
				</Text>
			</div>

			<Tabs
				value={activeTab}
				onChange={setActiveTab}
				variant='pills'
				color='accent'
				classNames={{ list: 'pb-[1px]' }}
			>
				<Tabs.List justify='center'>
					{/* <Tabs.Tab
						value='Presets'
						leftSection={<Star size={14} color='gold' weight='fill' />}
						className='title-bar-button'
					>
						Quick Presets
					</Tabs.Tab> */}
					<Tabs.Tab
						value='File'
						leftSection={<File size={14} weight='bold' />}
						className='title-bar-button'
					>
						File
					</Tabs.Tab>
					<Tabs.Tab
						value='Video'
						leftSection={<FrameCorners size={14} weight='bold' />}
						className='title-bar-button'
					>
						Video
					</Tabs.Tab>
					<Tabs.Tab
						value='Audio'
						leftSection={<SpeakerHigh size={14} weight='bold' />}
						className='title-bar-button'
					>
						Audio
					</Tabs.Tab>
					<Tabs.Tab
						value='Trim'
						leftSection={<ArrowsInLineHorizontal size={14} weight='bold' />}
						className='title-bar-button'
					>
						Trim
					</Tabs.Tab>
					<Tabs.Tab
						value='Settings'
						leftSection={<GearSix size={14} weight='bold' />}
						className='title-bar-button'
					></Tabs.Tab>
				</Tabs.List>
			</Tabs>

			<div className='flex gap-1 px-1'>
				<ActionIcon
					variant='subtle'
					color='yellow'
					onClick={handleMinimize}
					className='title-bar-button'
					size='lg'
				>
					<Minus size={24} weight='bold' />
				</ActionIcon>
				<ActionIcon
					variant='subtle'
					color='green'
					onClick={handleMaximize}
					className='title-bar-button'
					size='lg'
				>
					<Square size={20} weight='bold' />
				</ActionIcon>
				<ActionIcon
					variant='subtle'
					color='red'
					onClick={handleClose}
					className='title-bar-button'
					size='lg'
				>
					<X size={24} weight='bold' />
				</ActionIcon>
			</div>
		</div>
	);
}
