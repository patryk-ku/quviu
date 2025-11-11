// import { Button, Card, CardBody, Input } from '@heroui/react';
// import { invoke } from '@tauri-apps/api/core';
import { useState } from 'react';
import Header from './components/Header';
import TabView from './components/Tabs/TabView';
import Welcome from './components/Welcome';

export default function App() {
	const [file, setFile] = useState('');
	const [activeTab, setActiveTab] = useState('file');

	if (!file) {
		return <Welcome setFile={setFile} />;
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
