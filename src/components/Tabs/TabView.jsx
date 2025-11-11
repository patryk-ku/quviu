import Audio from './Audio';
import File from './File';
import Trim from './Trim';
import Video from './Video';

const tabComponents = {
	audio: <Audio />,
	file: <File />,
	trim: <Trim />,
	video: <Video />,
};

export default function TabView({ activeTab }) {
	return <div className='h-full'>{tabComponents[activeTab]}</div>;
}
