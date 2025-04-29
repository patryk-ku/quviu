import './assets/main.css';
import '@mantine/core/styles.css';

import { MantineProvider, createTheme, virtualColor } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const theme = createTheme({
	defaultRadius: 'md',
	cursorType: 'pointer',
	colors: {
		secondary: virtualColor({
			name: 'secondary',
			dark: 'gray',
			light: 'dark',
		}),
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<MantineProvider defaultColorScheme='dark' theme={theme}>
			<App />
		</MantineProvider>
	</React.StrictMode>
);
