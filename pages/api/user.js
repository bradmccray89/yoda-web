import { getDatabase, ref, child, get } from 'firebase/database';

export default function handler(req, res) {
	const voiceIntroList = [];

	const storage = getStorage();

	const storageRef = ref(storage, 'voice-intro-clips');

	listAll(storageRef).then((snapshot) => {
		snapshot.items.forEach((item) => {
			const voiceIntro = {
				name: item.name.split('.')[0],
				extension: '.' + item.name.split('.')[1],
			};
			voiceIntroList.push(voiceIntro);
		});
	});

	res.status(200).send(voiceIntroList);
}
