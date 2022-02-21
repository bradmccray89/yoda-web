import logo from '../public/images/logo.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { useState } from 'react';

export default function Navbar() {
	const { user, error, isLoading } = useUser();
	const [showDropDown, setShowDropDown] = useState(false);

	const toggleDropdown = () => {
		setShowDropDown(!showDropDown);
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<nav className="h-20 w-full fixed flex items-center justify-between flex-wrap bg-gray-800 px-6 py-3 z-50">
			<div className="h-full flex items-center justify-start">
				<Image
					src={logo}
					alt="Logo"
					height={48}
					width={48}
					className="rounded-full"
				/>
				<h1 className="hidden sm:block text-white font-bold text-2xl ml-4">
					Yoda Bot
				</h1>
			</div>
			<div className="h-full flex items-center justify-end">
				{user ? (
					<div className="h-full w-56 relative flex flex-col group">
						<button
							id="dropdownButton"
							onClick={toggleDropdown}
							className="relative w-full flex justify-center self-center top-1/2 -translate-y-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							type="button"
						>
							<h2 className="text-white mr-3">{user.name}</h2>
							<Image
								src={user.picture}
								alt={user.name}
								className="rounded-full"
								width={35}
								height={35}
							/>
						</button>

						<div
							id="dropdown"
							className={`${
								showDropDown ? 'block' : 'hidden'
							} z-10 w-full mt-1 text-base list-none bg-white rounded divide-y divide-gray-100 shadow`}
						>
							<ul className="py-1" aria-labelledby="dropdownButton">
								<li className="border-b">
									<div className="p-3 text-xs">{user.email}</div>
								</li>
								<li className="my-1 flex justify-center items-center">
									<Link href="/api/auth/logout">
										<a className="px-5 py-2 rounded text-white bg-blue-500 hover:bg-blue-700">
											Logout
										</a>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				) : (
					<Link href="/api/auth/login">
						<a className="px-5 py-2 rounded text-white bg-blue-500 hover:bg-blue-700">
							Login
						</a>
					</Link>
				)}
			</div>
		</nav>
	);
}
