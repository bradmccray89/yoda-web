import { ref, getDownloadURL, getStorage } from 'firebase/storage';
import initFirebase from '../firebase/initFirebase';

initFirebase();

export default async function handler(req, res) {
	const { name } = req.query;
	const storage = getStorage();

	const storageRef = ref(storage, 'voice-intro-clips/' + name);

	const downloadURL = await getDownloadURL(storageRef).then((url) => url);

	res.status(200).send({ downloadURL });
}
