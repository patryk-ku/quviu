import { Button } from '@mantine/core';
// import electronLogo from './assets/electron.svg'

function App() {
	// const ipcHandle = () => window.electron.ipcRenderer.send('ping')

	return (
		<div className='bg-blue-400'>
			<h1>Hello World</h1>
			<Button variant='filled'>Button</Button>
		</div>
	);
}

export default App;
