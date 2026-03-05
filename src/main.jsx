import { HeroUIProvider } from '@heroui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SettingsProvider } from './contexts/SettingsContext';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<HeroUIProvider>
			<SettingsProvider>
				<main className='dark h-screen w-screen bg-background text-foreground'>
					<App />
				</main>
			</SettingsProvider>
		</HeroUIProvider>
	</React.StrictMode>
);
