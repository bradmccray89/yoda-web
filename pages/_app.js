import { UserProvider } from '@auth0/nextjs-auth0';
import Navbar from '../components/Navbar';
import firebase from '../firebase/initFirebase';

import '../styles/globals.css';

firebase();

function MyApp({ Component, pageProps }) {
	return (
		<UserProvider>
			<Navbar />
			<Component {...pageProps} />
		</UserProvider>
	);
}

export default MyApp;
