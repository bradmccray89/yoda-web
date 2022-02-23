import { ref, getDownloadURL, getStorage } from 'firebase/storage';

export default async function handler(req, res) {
	const { name } = req.query;
	const storage = getStorage();

	const storageRef = ref(storage, 'voice-intro-clips/' + name);

	const downloadURL = await getDownloadURL(storageRef).then((url) => url);

	res.status(200).send({ downloadURL });
}
