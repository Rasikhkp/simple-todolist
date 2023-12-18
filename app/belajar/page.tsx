"use client";

import Tes from "@/components/Tes";
import { useState } from "react";
import Image from "next/image";

export default function page() {
	return (
		<div className="w-full grid grid-rows-[100px_auto] h-screen bg-blue-400">
			<div className="w-40 h-20 bg-yellow-400"></div>
			<div className="w-80 bg-red-400 overflow-hidden">
				<div className="h-screen w-40 bg-green-500"></div>
			</div>
		</div>
	);
}
