import { HeroUIProvider } from '@heroui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<HeroUIProvider>
			<main className='dark h-screen w-screen bg-background text-foreground'>
				<App />
			</main>
		</HeroUIProvider>
	</React.StrictMode>
);
