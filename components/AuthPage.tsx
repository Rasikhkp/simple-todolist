"use client";

import React, { useState } from "react";
import threedimg from "/public/img/3d image 3.png";
import googleicon from "/public/img/google icon.png";
import githubicon from "/public/img/github icon.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type AuthPageProps = {
	toRegister?: string;
	toLogin?: string;
	greeting: string;
	cta?: string;
	isSignUp?: boolean;
};

export default function AuthPage({
	toRegister,
	toLogin,
	greeting,
	cta,
	isSignUp,
}: AuthPageProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const router = useRouter();

	const handleSubmit = async () => {
		if (isSignUp) {
			await fetch("/api/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					name,
					password,
				}),
			});

			router.push("/sign-in");
			setName("");
		} else {
			await signIn("credentials", { password, email, callbackUrl: "/" });
			router.push("/");
		}

		setEmail("");
		setPassword("");
	};
	return (
		<div className="w-full h-screen text-gray-600 font-poppins flex justify-center items-center">
			<div className="w-[729px] p-3 flex h-[518px] rounded-[32px] bg-[#D9D9D98A] backdrop-blur">
				<Image src={threedimg} alt="image" />
				<div className="relative w-full h-full flex justify-center items-center">
					<div className="text-xs absolute right-5 top-0 font-bold text-end">
						{isSignUp ? toLogin : toRegister}{" "}
						<Link
							href={isSignUp ? "sign-in" : "sign-up"}
							className="text-[#3728E5] font-normal hover:underline"
						>
							{isSignUp ? "Login" : "Register Now"}
						</Link>
					</div>
					<div className="flex flex-col justify-center items-center">
						<div className="text-3xl font-semibold">{greeting}</div>
						<div className="text-sm">{cta}</div>

						{isSignUp && (
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								type="text"
								className="px-4 py-3 w-60 text-sm rounded-lg mt-6"
								placeholder="Enter username"
							/>
						)}
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="text"
							className="px-4 py-3 w-60 text-sm rounded-lg mt-6"
							placeholder="Enter email"
						/>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							className="px-4 py-3 w-60 text-sm rounded-lg mt-5"
							placeholder="*********"
						/>

						<button
							onClick={handleSubmit}
							className="px-4 py-3 w-60 text-sm rounded-lg mt-5 bg-[#FE6B68] text-white font-semibold hover:opacity-80 active:opacity-60 transition-all"
						>
							{isSignUp ? "Sign Up" : "Sign In"}
						</button>

						<div className="divider text-sm">Or continue with</div>

						<div className="flex gap-5">
							<button
								onClick={() => signIn("google", { callbackUrl: "/" })}
								className="w-16 h-12 flex items-center justify-center  border-2 border-white rounded-lg hover:bg-white hover:shadow-lg transition-all"
							>
								<Image
									src={googleicon}
									alt="image"
									width={24}
									height={24}
								/>
							</button>
							<button
								onClick={() => signIn("github", { callbackUrl: "/" })}
								className="w-16 h-12 border-2 border-white flex items-center justify-center rounded-lg hover:bg-white hover:shadow-lg transition-all"
							>
								<Image
									src={githubicon}
									alt="image"
									width={24}
									height={24}
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
