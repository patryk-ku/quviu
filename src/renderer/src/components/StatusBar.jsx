import { Progress, Text, Button } from '@mantine/core';

function StatusBar({ file, isProcessing, handleProcess, progress }) {
	return (
		<div className='grid grid-cols-[auto,1fr] items-center gap-2 bg-[--mantine-color-dark-8] p-2'>
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
			</div>
			<Progress value={progress} animated={isProcessing} />
		</div>
	);
}

export default StatusBar;
