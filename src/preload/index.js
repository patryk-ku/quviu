import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
	minimize: () => ipcRenderer.invoke('minimize'),
	maximize: () => ipcRenderer.invoke('maximize'),
	close: () => ipcRenderer.invoke('close'),
	openFile: () => ipcRenderer.invoke('dialog:openFile'),
	openFolder: () => ipcRenderer.invoke('dialog:openFolder'),
	generateOutputVideo: (config) => ipcRenderer.invoke('generateOutputVideo', config),
	onProgressUpdate: (callback) =>
		ipcRenderer.on('encoding-progress', (_event, value) => callback(value)),
	stopProcessingVideo: () => ipcRenderer.invoke('stopVideoProcessing'),
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
