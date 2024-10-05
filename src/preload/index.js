import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import ffmpeg from 'fluent-ffmpeg';

// Custom APIs for renderer
const api = {
	openFile: () => ipcRenderer.invoke('dialog:openFile'),
	generateOutputVideo: (input, output) =>
		ipcRenderer.invoke('generateOutputVideo', { input, output }),
	onProgressUpdate: (callback) =>
		ipcRenderer.on('encoding-progress', (_event, value) => callback(value)),
	stopProcessingVideo: () => ipcRenderer.invoke('stopVideoProcessing'),
	// compressVideo: async (path, output) => {
	// 	console.log(output);
	// 	// Run FFmpeg
	// 	await ffmpeg()
	// 		// Input file
	// 		.input(path)

	// 		// Scale the video to 720 pixels in height. The -2 means FFmpeg should figure out the
	// 		// exact size of the other dimension. In other words, to make the video 720 pixels wide
	// 		// and make FFmpeg calculate its height, use scale=720:-2 instead.
	// 		.outputOptions('-vf', 'scale=-2:720')

	// 		// Output file
	// 		.saveToFile(output)

	// 		// Log the percentage of work completed
	// 		.on('progress', (progress) => {
	// 			if (progress.percent) {
	// 				console.log(`Processing: ${Math.floor(progress.percent)}% done`);
	// 			}
	// 		})

	// 		// The callback that is run when FFmpeg is finished
	// 		.on('end', () => {
	// 			console.log('FFmpeg has finished.');
	// 		})

	// 		// The callback that is run when FFmpeg encountered an error
	// 		.on('error', (error) => {
	// 			console.error(error);
	// 		});

	// 	return 'test xd';
	// },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI);
		contextBridge.exposeInMainWorld('api', api);
	} catch (error) {
		console.error(error);
	}
} else {
	window.electron = electronAPI;
	window.api = api;
}
