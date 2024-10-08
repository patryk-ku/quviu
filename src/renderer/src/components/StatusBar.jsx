import { Progress, Text, Button } from '@mantine/core';

function StatusBar({ file, isProcessing, handleProcess, progress, error, success }) {
	return (
		<div className='grid grid-cols-[auto,1fr] items-center gap-3 bg-[--mantine-color-dark-9] p-2'>
			<div className='flex items-center gap-3'>
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
				{progress == 100 && <Text>File ready:</Text>}
			</div>
			{error && <Text c='red.6'>Error: {error}</Text>}
			{isProcessing && (
				<Progress
					value={progress}
					animated={isProcessing}
					size='md'
					striped
					transitionDuration={300}
				/>
			)}
			{success && (
				<Text c='blue' size='sm' lineClamp={1}>
					{success}
				</Text>
			)}
		</div>
	);
}

export default StatusBar;
