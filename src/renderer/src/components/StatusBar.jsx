import { Progress, Text, Button } from '@mantine/core';

function StatusBar({ file, isProcessing, handleProcess, progress, error }) {
	return (
		<div className='grid grid-cols-[auto,1fr] items-center gap-2 bg-[--mantine-color-dark-9] p-2'>
			<div className='flex items-center gap-2'>
				{isProcessing ? (
					<Button
						variant='filled'
						color='red'
						size='compact-sm'
						onClick={() => window.api.stopProcessingVideo()}
					>
						Cancel
					</Button>
				) : (
					<Button
						variant='filled'
						onClick={handleProcess}
						loading={isProcessing}
						size='compact-sm'
						disabled={!file}
					>
						Process Video
					</Button>
				)}
				{isProcessing && <Text>{progress} %</Text>}
				{progress == 100 && (
					<Text c='green.6' fw={700}>
						Process Completed
					</Text>
				)}
			</div>
			{error ? (
				<Text c='red.6' fw={700}>
					Error: {error}
				</Text>
			) : (
				<Progress
					value={progress}
					animated={isProcessing}
					size='md'
					striped
					transitionDuration={300}
				/>
			)}
		</div>
	);
}

export default StatusBar;
