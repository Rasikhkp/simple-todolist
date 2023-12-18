"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logout from '@/public/icon/logout.svg'

export default function Nav() {
	const [showLogout, setShowLogout] = useState(false);
	const session = useSession();
	return (
		<div className="w-full py-3 gap-5 flex justify-end items-center relative">
			{session.status === "authenticated" ? (
				<>
					<button
						onClick={() => setShowLogout(!showLogout)}
						className="w-10 h-10 rounded-full bg-yellow-400 overflow-hidden flex justify-center items-center"
					>
						{session.data.user?.image && (
							<Image
								src={session.data.user.image}
								width={40}
								height={40}
								alt="profile"
							/>
						)}
					</button>
					{showLogout && (
						<div className="absolute top-[69px] pt-3 px-4 pb-1.5 text-xs rounded-lg border border-[#EAD3D3] bg-white">
							<div className="text-sm font-semibold">{session.data?.user?.name}</div>
							<div>{session.data?.user?.email}</div>
							<div className="border-t border-gray-600 h-[1px] mt-3 mb-1.5 w-full"></div>
							<button
								onClick={() => signOut({ callbackUrl: "/" })}
								className="flex gap-4 pl-2 rounded-lg top-14 text-gray-800 hover:bg-gray-100 transition-all w-full py-2 items-center"
							>
								<Image src={logout} alt="logout" width={24} height={24} /> Sign Out
							</button>
						</div>
					)}
				</>
			) : (
				<>
					<Link
						href="/sign-up"
						className="px-5 h-fit py-2 text-sm text-[#5A3E3E] hover:bg-[#FE6B68] border-2 border-[#FE6B68] hover:text-white transition-all rounded-lg "
					>
						sign up
					</Link>
					<Link
						href="/sign-in"
						className="px-5 h-fit py-2 text-sm text-white bg-[#FE6B68] hover:bg-transparent hover:text-[#5A3E3E] transition-all border-2 border-[#FE6B68] rounded-lg "
					>
						login
					</Link>
				</>
			)}
		</div>
	);
}
