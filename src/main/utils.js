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

export function detectCrop(config) {
	return new Promise((resolve, reject) => {
		const inputPath = config.input;
		const time = Math.floor(config.metadata.format.duration / 2);
		let cropValues;

		ffmpeg(inputPath)
			.videoFilters('cropdetect')
			.seekInput(time)
			.format('null')
			.on('stderr', (line) => {
				const match = line.match(/crop=\d+:\d+:\d+:\d+/);
				if (match) cropValues = match[0];
			})
			.on('end', () => {
				if (cropValues) resolve(cropValues.trim());
				else reject(new Error('Failed to detect crop dimensions'));
			})
			.on('error', reject)
			.save('-');
	});
}
