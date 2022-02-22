import firebase from '../firebase/initFirebase';
import { getStorage, ref as stoRef, listAll } from 'firebase/storage';
import { getDatabase, ref as dbRef, get } from 'firebase/database';
import { useUser } from '@auth0/nextjs-auth0';
import { useState, useRef, useEffect } from 'react';
import VoiceList from '../components/VoiceList';

firebase();

export default function Home({ voiceIntroList, notFound }) {
	const { user, error, isLoading } = useUser();
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		async function getCurrentUser() {
			if (user) {
				const userId = user.sub.split('|')[2];
				const db = getDatabase();
				const databaseRef = dbRef(db, 'users/' + userId);
				get(databaseRef).then((snapshot) => {
					if (snapshot.exists()) {
						setCurrentUser(snapshot.val());
					}
				});
			}
		}
		getCurrentUser();
	}, [user]);

	if (user) {
		return (
			<div className="h-full w-full absolute pt-24 bg-blue flex flex-col justify-start items-center overflow-hidden">
				{voiceIntroList.length > 0 ? (
					<>
						{currentUser && (
							<VoiceList
								voiceIntroList={voiceIntroList}
								discordUser={user}
								currentUser={currentUser}
							/>
						)}
					</>
				) : (
					<h1 className="text-center text-2xl font-bold">No voice intros found</h1>
				)}
			</div>
		);
	} else {
		return (
			<div className="h-full w-full absolute pt-24 flex flex-col justify-start items-center overflow-hidden">
				<div className="h-full w-full flex flex-col justify-center items-center">
					<h1 className="text-6xl font-bold text-gray-800 text-center">
						Welcome to Yoda Discord Bot!
					</h1>
					<h1 className="mt-5 text-xl font-bold text-gray-800 text-center">
						Please sign in to continue
					</h1>
				</div>
			</div>
		);
	}
}

export async function getServerSideProps() {
	const storage = getStorage();

	const storageRef = stoRef(storage, 'voice-intro-clips');

	const list = listAll(storageRef).then(async (snapshot) => {
		var introList = [];
		for (var i = 0; i < snapshot.items.length; i++) {
			const voiceIntro = {
				name: snapshot.items[i].name.split('.')[0],
				extension: '.' + snapshot.items[i].name.split('.')[1],
			};
			introList.push(voiceIntro);
		}
		return JSON.stringify(introList);
	});

	const voiceIntroList = JSON.parse(await list);

	return {
		props: { voiceIntroList },
	};
}
