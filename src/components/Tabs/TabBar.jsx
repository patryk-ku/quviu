import { Tab, Tabs } from '@heroui/react';

export default function TabBar({ activeTab, setActiveTab }) {
	return (
		<Tabs aria-label='Options' selectedKey={activeTab}>
			<Tab key='file' title='File' onClick={() => setActiveTab('file')} />
			<Tab key='video' title='Video' onClick={() => setActiveTab('video')} />
			<Tab key='audio' title='Audio' onClick={() => setActiveTab('audio')} />
			<Tab key='trim' title='Trim' onClick={() => setActiveTab('trim')} />
		</Tabs>
	);
}
