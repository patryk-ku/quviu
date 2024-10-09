import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join, sep } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';

import ffmpeg from 'fluent-ffmpeg';
import { getMetadata, generateUniqueFileName } from './utils';
import { timestampToSeconds } from '../renderer/src/utils';

async function handleFileOpen() {
	// TODO: error handling when canceled
	const { canceled, filePaths } = await dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [{ name: 'Movies', extensions: ['mkv', 'avi', 'mp4', 'webm'] }],
	});

	if (!canceled) {
		try {
			const metadata = await getMetadata(filePaths[0]);
			// console.log(metadata);

			return { path: filePaths[0], metadata: metadata };
		} catch (error) {
			console.error('Error:', error);

			return { error: 'Unable to open the selected file' };
		}
	}
}

async function handleFolderOpen() {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		properties: ['openDirectory'],
	});
	if (!canceled) {
		return filePaths[0] + sep;
	}
}

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 900,
		height: 700,
		minWidth: 900,
		minHeight: 700,
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

	ipcMain.handle('generateOutputVideo', async (event, config) => {
		console.log(' === New video processing: ', config);

		if (!config.output.isOverwrite) {
			config.output.path = generateUniqueFileName(config.output.path);
		}

		// Validation
		if (!config.output.name) {
			return { error: 'File name cannot be empty.' };
		}

		if (config.trim.isEnabled && config.trim.start == config.trim.end) {
			return { error: 'Trim start and end time cannot be the same.' };
		}

		let isError = false;
		try {
			await new Promise((resolve, reject) => {
				ffmpegProcess = ffmpeg().input(config.input);
				// .outputOptions('-vf', 'scale=-2:720')

				if (config.trim.isEnabled) {
					ffmpegProcess.seekInput(config.trim.start);
					ffmpegProcess.duration(config.trim.end - config.trim.start);
				}

				// Video options
				if (config.video.res) {
					ffmpegProcess.size(`?x${config.video.res}`);
				}

				// Audio options
				if (config.audio.isMuted) {
					ffmpegProcess.noAudio();
				} else {
					const audioStreamsCount = config.metadata.streams.filter(
						(stream) => stream.codec_type === 'audio'
					).length;

					if (audioStreamsCount > 0) {
						if (config.audio.isMerge) {
							if (audioStreamsCount > 1) {
								ffmpegProcess.complexFilter(`amerge=inputs=${audioStreamsCount}`);
							}
						}

						if (config.audio.isCompress) {
							ffmpegProcess
								.audioCodec(config.audio.codec)
								.audioBitrate(config.audio.bitrate);
						}
					}
				}

				console.log(config.outputOptions);
				if (config.outputOptions?.length > 0) {
					ffmpegProcess.outputOptions(...config.outputOptions);
				}

				ffmpegProcess
					.saveToFile(config.output.path)
					.on('progress', (progress) => {
						if (progress.percent) {
							let percent;
							// Fix for incorrect progress percent when trim is enabled
							if (config.trim.isEnabled) {
								percent = Math.floor(
									(timestampToSeconds(progress.timemark) /
										(config.trim.end - config.trim.start)) *
										100
								);
							} else {
								percent = Math.floor(progress.percent);
							}
							console.log(`Processing: ${percent}% done`);
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
						// console.error(error);
						isError = true;
						reject(error);
					});
			});
		} catch (error) {
			if (
				error?.message ===
				'ffmpeg exited with code 255: Exiting normally, received signal 2.\n'
			) {
				return { error: 'Operation canceled' };
			}
			console.log(error);
			isError = true;
		}

		if (isError) {
			return { error: 'Unknown Error.' };
		} else {
			return { error: false, success: config.output.path };
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
	ipcMain.handle('dialog:openFolder', handleFolderOpen);

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
