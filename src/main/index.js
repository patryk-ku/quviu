import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';

import ffmpeg from 'fluent-ffmpeg';

async function handleFileOpen() {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [{ name: 'Movies', extensions: ['mkv', 'avi', 'mp4', 'webm'] }],
	});
	if (!canceled) {
		return filePaths[0];
	}
}

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 900,
		height: 670,
		frame: false,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false,

			// TODO: TMP for development only:
			webSecurity: false,
		},
	});

	mainWindow.on('ready-to-show', () => {
		mainWindow.show();
	});

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: 'deny' };
	});

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
	}

	ipcMain.handle('minimize', () => mainWindow.minimize());
	ipcMain.handle('maximize', () => {
		if (mainWindow.isMaximized()) {
			mainWindow.unmaximize();
		} else {
			mainWindow.maximize();
		}
	});
	ipcMain.handle('close', () => mainWindow.close());

	let ffmpegProcess = null;

	ipcMain.handle('generateOutputVideo', async (event, { input, output }) => {
		let isError = false;
		try {
			await new Promise((resolve, reject) => {
				ffmpegProcess = ffmpeg()
					.input(input)
					.outputOptions('-vf', 'scale=-2:720')
					.saveToFile(output)
					.on('progress', (progress) => {
						if (progress.percent) {
							const percent = Math.floor(progress.percent);
							console.log(`Processing: ${percent}% done`);
							// Wysyłanie komunikatu z postępem do renderera
							mainWindow.webContents.send('encoding-progress', percent);
						}
					})
					.on('end', () => {
						ffmpegProcess = null;
						console.log('FFmpeg has finished.');
						resolve();
					})
					.on('error', (error) => {
						ffmpegProcess = null;
						console.error(error);
						isError = true;
						reject(error);
					});
			});
		} catch (error) {
			console.log(error);
			isError = true;
		}

		if (isError) {
			return { error: true };
		} else {
			return { error: false };
		}
	});

	ipcMain.handle('stopVideoProcessing', () => {
		if (ffmpegProcess) {
			ffmpegProcess.kill('SIGINT');
			console.log('FFmpeg process stopped.');
			ffmpegProcess = null;
			return { stopped: true };
		} else {
			return { stopped: false, error: 'No process running' };
		}
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	// Set app user model id for windows
	electronApp.setAppUserModelId('com.electron');

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	// IPC test
	ipcMain.on('ping', () => console.log('pong'));

	// My IPC
	// ipcMain.on('pickFile', async (e, message) => {
	// 	const file = dialog.showOpenDialogSync({ properties: ['openFile', 'multiSelections'] });
	// 	console.log(file);
	// 	return 'test xd';
	// });

	ipcMain.handle('dialog:openFile', handleFileOpen);

	createWindow();

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
