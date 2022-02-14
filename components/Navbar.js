import logo from '../public/images/logo.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

function toggleDropdown() {
	console.log('toggleDropdown');
}

function navLinks(user) {
	if (user) {
		return (
			<div className="h-full flex items-center">
				<div className="h-full w-full flex items-center">
					<button
						onClick={toggleDropdown}
						className="flex items-center hover:border-blue-200"
					>
						<h2 className="text-white mr-3">{user.name}</h2>
						<Image
							src={user.picture}
							alt={user.name}
							className="rounded-full"
							width={60}
							height={60}
						/>
					</button>
				</div>
				{/* <div className="flex flex-row items-center">
					<h2 className="text-white mr-3">{user.name}</h2>
					<Image
						src={user.picture}
						alt={user.name}
						className="rounded-full"
						width={60}
						height={60}
					/>
				</div> */}
				<Link href="/api/auth/logout">
					<a className="ml-3 px-5 py-2 rounded text-white bg-blue-500 hover:bg-blue-700">
						Logout
					</a>
				</Link>
			</div>
		);
	} else {
		return (
			<Link href="/api/auth/login">
				<a className="px-5 py-2 rounded text-white bg-blue-500 hover:bg-blue-700">
					Login
				</a>
			</Link>
		);
	}
}

export default function Navbar() {
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<nav className="h-20 w-full fixed flex items-center justify-between flex-wrap bg-gray-800 p-6">
			<div className="h-full w-1/2 flex items-center justify-start">
				<Image
					src={logo}
					alt="Logo"
					height={60}
					width={60}
					className="rounded-full"
				/>
				<h1 className="text-white font-bold text-2xl ml-4">Yoda Bot</h1>
			</div>
			<div className="h-full w-1/2 flex items-center justify-end">
				{navLinks(user)}
			</div>
		</nav>
	);
}
