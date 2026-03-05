const ObjectItem = ({ label, value, indent = 0 }) => {
	const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
	const isArray = Array.isArray(value);

	if (isObject || isArray) {
		return (
			<div style={{ marginLeft: `${indent * 12}px` }} className='mb-1'>
				<div className='mb-1 font-bold text-primary-500 text-sm uppercase tracking-tight'>
					{label}
				</div>
				<div className='ml-1 flex flex-col gap-1 border-divider border-l pl-3'>
					{Object.entries(value).map(([key, val]) => (
						<ObjectItem key={key} label={key} value={val} indent={0} />
					))}
				</div>
			</div>
		);
	}

	return (
		<div
			style={{ marginLeft: `${indent * 12}px` }}
			className='flex gap-2 rounded px-1 py-0.5 text-sm transition-colors hover:bg-white/5'
		>
			<span className='shrink-0 font-medium text-default-500'>{label}:</span>
			<span className='break-all text-default-900'>{String(value)}</span>
		</div>
	);
};

export default function ObjectTreeDisplay({ obj }) {
	return (
		<>
			{!obj ? (
				<div className='flex items-center justify-center py-10 text-default-400'>
					No data to display
				</div>
			) : (
				<div className='custom-scrollbar flex flex-col gap-4 font-mono'>
					{Object.entries(obj).map(([key, value]) => (
						<ObjectItem key={key} label={key} value={value} />
					))}
				</div>
			)}
		</>
	);
}
