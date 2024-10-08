import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

export function getMetadata(filePath) {
	return new Promise((resolve, reject) => {
		ffmpeg.ffprobe(filePath, (error, metadata) => {
			if (error) {
				reject(error);
			} else {
				resolve(metadata);
			}
		});
	});
}

export function generateUniqueFileName(filePath) {
	const dir = path.dirname(filePath);
	const ext = path.extname(filePath);
	const baseName = path.basename(filePath, ext);

	let newFilePath = filePath;
	let counter = 1;

	while (fs.existsSync(newFilePath)) {
		newFilePath = path.join(dir, `${baseName} (${counter})${ext}`);
		counter++;
	}

	return newFilePath;
}
