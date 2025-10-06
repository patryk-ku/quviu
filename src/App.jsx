import { invoke } from '@tauri-apps/api/core';
import { useState } from 'react';
import './App.css';

function App() {
	const [greetMsg, setGreetMsg] = useState('');
	const [name, setName] = useState('');

	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		setGreetMsg(await invoke('greet', { name }));
	}

	return (
		<main className='container'>
			<h1>Welcome to Quviu Tauri version</h1>

			<div className='row'>
				<a href='?' target='_blank' rel='noopener'>
					<img src='/icon.svg' className='logo vite' alt='Quviu logo' />
				</a>
			</div>
			<p>Hello World.</p>

			<form
				className='row'
				onSubmit={(e) => {
					e.preventDefault();
					greet();
				}}
			>
				<input
					id='greet-input'
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder='Enter a name...'
				/>
				<button type='submit'>Greet</button>
			</form>
			<p>{greetMsg}</p>
		</main>
	);
}

export default App;
