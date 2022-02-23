import { useRef, useState } from 'react';

export default function AudioPlayer({ voiceIntro }) {
	var audioElement = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const formatName = (name) => {
		return name.replaceAll('_', ' ');
	};

	const play = async (intro) => {
		const fileName = intro.name + intro.extension;

		const storage = getStorage();

		const storageRef = ref(storage, 'voice-intro-clips/' + fileName);

		const src = await getDownloadURL(storageRef).then((url) => url);

		audioElement.current.src = src;
		audioElement.current.play();
	};

	const stop = () => {
		audioElement.current.pause();
	};

	return (
		<>
			<audio
				ref={audioElement}
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
				onEnded={() => setIsPlaying(false)}
			>
				<source src="" type="audio/mpeg" />
			</audio>
			<div className="p-2 h-12 w-full bg-gray-200 border-2 border-gray-300 rounded-full flex justify-between items-center transition-all transition-duration-300">
				{!isPlaying ? (
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
						onClick={() => play(voiceIntro)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
								clipRule="evenodd"
							/>
						</svg>{' '}
					</button>
				) : (
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
						onClick={() => stop()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
								clipRule="evenodd"
							/>
						</svg>{' '}
					</button>
				)}
				<div className="w-1/2">
					<h6 title={formatName(voiceIntro.name)} className="truncate">
						{formatName(voiceIntro.name)}
					</h6>
				</div>
				<div className="h-8 w-24">
					<input
						className="h-full w-full"
						type="range"
						min="0"
						max="1"
						step="0.01"
						onChange={(e) => {
							audioElement.current.volume = e.target.value;
						}}
					/>
				</div>
			</div>
		</>
	);
}
