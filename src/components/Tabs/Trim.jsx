import { useSettings } from '../../contexts/SettingsContext';

export default function Trim() {
	const { settings } = useSettings();

	return (
		<div>
			<h1>Settings</h1>
			<pre>{JSON.stringify(settings, null, 2)}</pre>
		</div>
	);
}
