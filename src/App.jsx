import { useState } from 'react';
import Header from './components/Header';
import TabView from './components/Tabs/TabView';
import Welcome from './components/Welcome';
import { useSettings } from './contexts/SettingsContext';

export default function App() {
	const { settings } = useSettings();

	const [activeTab, setActiveTab] = useState('file');

	if (!settings.input.path) {
		return <Welcome />;
	}

	return (
		<div className='flex h-screen flex-col'>
			<Header activeTab={activeTab} setActiveTab={setActiveTab} />
			<main className='flex-grow overflow-y-auto p-2'>
				<TabView activeTab={activeTab} />
			</main>
		</div>
	);
}
