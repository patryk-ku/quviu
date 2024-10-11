import './assets/main.css';
import '@mantine/core/styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, MantineProvider, virtualColor } from '@mantine/core';
import App from './App';

const theme = createTheme({
	primaryColor: 'violet',
	defaultRadius: 'sm',
	cursorType: 'pointer',
	colors: {
		secondary: virtualColor({
			name: 'secondary',
			dark: 'gray',
			light: 'dark',
		}),
		accent: virtualColor({
			name: 'accent',
			dark: 'grape',
			light: 'grape',
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
