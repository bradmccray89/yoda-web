import AudioPlayer from './AudioPlayer';
import { useState } from 'react';

export default function VoiceList({ voiceIntroList, currentUser }) {
	const [currentVoiceIntro, setCurrentVoiceIntro] = useState(
		currentUser.clipName || null
	);

	console.log(currentVoiceIntro);

	return (
		<div className="h-[32rem] w-[95%] sm:w-[80%] lg:w-[50rem] flex flex-col justify-start items-center rounded-lg border-2">
			<h1 className="w-full text-2xl p-3 border-b-2">Voice Intros</h1>
			{currentVoiceIntro && (
				<ul className="h-full w-full m-3 flex flex-col justify-start items-center overflow-scroll scroll-smooth">
					{voiceIntroList.map((voiceIntro) => (
						<li
							key={voiceIntro.name}
							className="w-[95%] sm:w-[80%] mb-3 flex justify-center items-center"
						>
							<input
								type="radio"
								id={voiceIntro.name}
								value={voiceIntro.name + voiceIntro.extension}
								checked={currentVoiceIntro === voiceIntro.name + voiceIntro.extension}
								onChange={(e) => {
									setCurrentVoiceIntro(e.target.value);
								}}
								className="mr-5 h-5 w-5 cursor-pointer"
							/>
							<AudioPlayer voiceIntro={voiceIntro} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
