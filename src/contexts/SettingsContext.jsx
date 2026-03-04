import { createContext, useContext, useState } from 'react';

const initialSettings = {
	video: {
		remove: {
			enabled: false,
		},
		reencode: {
			enabled: false,
			codec: 'x264',
			bitrate: 2048,
		},
		resize: {
			enabled: false,
			resolution: 720,
		},
		framerate: {
			enabled: false,
			fps: 30,
		},
		hardsubs: {
			enabled: false,
			fromCurrent: true,
			path: '',
			stream: '1',
		},
		autoCrop: {
			enabled: false,
		},
	},
	audio: {
		remove: {
			enabled: false,
		},
		reencode: {
			enabled: false,
			codec: 'aac',
			bitrate: 192,
		},
		merge: {
			enabled: false,
		},
	},
	trim: {
		enabled: false,
		startTime: '00:00:00.000',
		endTime: '00:00:00.000',
	},
	output: {
		filename: 'new_video',
		extension: 'mp4',
		path: '/home/user/Videos/',
		overwrite: false,
		mapAllStreams: false,
	},
	input: null,
};

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
	const [settings, setSettings] = useState(initialSettings);

	const updateSettings = (option, suboption, property, value) => {
		setSettings((prev) => ({
			...prev,
			[option]: {
				...prev[option],
				[suboption]: {
					...prev[option][suboption],
					[property]: value,
				},
			},
		}));
	};

	const updateMainSettings = (option, property, value) => {
		setSettings((prev) => ({
			...prev,
			[option]: {
				...prev[option],
				[property]: value,
			},
		}));
	};

	const value = { settings, setSettings, updateSettings, updateMainSettings };
	return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
	const context = useContext(SettingsContext);
	if (context === undefined) {
		throw new Error('useSettings must be used within a SettingsProvider');
	}
	return context;
}
