export function formatDuration(seconds) {
	if (!seconds && seconds !== 0) {
		return 'unknown duration';
	}

	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);
	const secs = Math.floor(seconds % 60);

	if (hrs > 0) {
		return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
	} else {
		return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
	}
}

export function formatBitrate(bitrate) {
	if (!bitrate) {
		return 'unknown bitrate';
	}

	if (bitrate >= 1e6) {
		return `${(bitrate / 1e6).toFixed(2)} Mbps`;
	} else {
		return `${(bitrate / 1e3).toFixed(2)} kbps`;
	}
}

export function formatFileSize(bytes) {
	if (!bytes) {
		return 'unknown size';
	}

	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes === 0) return '0 Bytes';

	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

export function getFileExtension(filePath) {
	if (!filePath) {
		return 'unknown ext';
	}

	const lastDotIndex = filePath.lastIndexOf('.');

	if (lastDotIndex > 0 && lastDotIndex < filePath.length - 1) {
		return filePath.slice(lastDotIndex + 1);
	} else {
		return 'unknown ext';
	}
}
