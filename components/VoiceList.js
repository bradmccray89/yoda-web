import AudioPlayer from './AudioPlayer';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getDatabase, ref, set } from 'firebase/database';

export default function VoiceList({
	voiceIntroList,
	discordUser,
	currentUser,
}) {
	const [currentVoiceIntro, setCurrentVoiceIntro] = useState(
		currentUser.clipName || null
	);
	const router = useRouter();

	const discordUserId = discordUser.sub.split('|')[2];

	if (!currentUser) {
		currentUser = {
			id: discordUserId,
			clipName: null,
		};
	}

	const refreshData = () => {
		router.reload(window.location.pathname);
	};

	const handleSave = () => {
		const db = getDatabase();
		set(ref(db, 'users/' + currentUser.id), {
			id: currentUser.id,
			clipName: currentVoiceIntro,
		})
			.then(() => {
				refreshData();
			})
			.catch((error) => {
				// The write failed...
			});
	};

	return (
		<>
			<div className="h-[32rem] w-[95%] sm:w-[80%] lg:w-[50rem] flex flex-col justify-start items-center rounded-lg border-2">
				<h1 className="w-full text-2xl p-3 border-b-2">Voice Intros</h1>
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
			</div>
			{currentVoiceIntro && currentVoiceIntro !== currentUser.clipName && (
				<div className="h-12 w-[95%] sm:w-[80%] lg:w-[50rem] flex place-content-stretch mt-3 gap-x-3">
					<button
						className="w-full h-full bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg p-3"
						onClick={() => {
							setCurrentVoiceIntro(currentUser.clipName);
						}}
					>
						Cancel
					</button>
					<button
						className="w-full h-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg p-3"
						onClick={handleSave}
					>
						Save
					</button>
				</div>
			)}
		</>
	);
}
