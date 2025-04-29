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

	if (isNaN(bitrate)) {
		return 'unknown bitrate';
	}

	// if (bitrate >= 1e6) {
	// return `${(bitrate / 1e6).toFixed(2)} Mbps`;
	// } else {
	return `${(bitrate / 1e3).toFixed(0)} kbps`;
	// }
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

export function calculateFrameRate(frameRateStr) {
	if (!frameRateStr) {
		return 'unknown';
	}

	const parts = frameRateStr.split('/');
	if (parts.length !== 2) {
		return frameRateStr;
	}

	const numerator = parseFloat(parts[0]);
	const denominator = parseFloat(parts[1]);

	if (denominator === 0) {
		return frameRateStr;
	}

	const result = numerator / denominator;

	// Format to 2 decimal places but remove trailing zeros
	return result % 1 === 0 ? result.toString() : result.toFixed(2).replace(/\.?0+$/, '');
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

export function timestampToSeconds(timeString) {
	const [hours, minutes, seconds] = timeString.split(':');
	const [wholeSeconds, milliseconds] = seconds.split('.');

	const totalSeconds =
		parseInt(hours, 10) * 3600 +
		parseInt(minutes, 10) * 60 +
		parseInt(wholeSeconds, 10) +
		parseInt(milliseconds, 10) / 100;

	return totalSeconds;
}

function calculateFileSize(bitrate, duration) {
	const fileSizeMB = (parseInt(bitrate) * Number(duration)) / (8 * 1024);
	return fileSizeMB;
}

export function estimateFileSize(config) {
	if (
		(config?.video?.isCompress || config?.video?.isDisabled) &&
		(config?.audio?.isCompress || config?.audio?.isMuted)
	) {
		let audio = parseInt(config.audio.bitrate);
		if (config?.audio?.isMuted) audio = 0;

		let video = parseInt(config.video.bitrate);
		if (config?.video?.isDisabled) video = 0;

		const bitrate = video + audio;
		let duration = config?.metadata?.format?.duration;

		if (config?.trim?.isEnabled) {
			duration = config.trim?.end - config.trim?.start;
		}

		const mb = `${calculateFileSize(bitrate, duration).toFixed(2)} MB`;

		return mb;
	} else {
		return null;
	}
}
