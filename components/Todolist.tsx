"use client";

import CreateTodo from "./CreateTodo";
import Lists from "./Lists";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, getAllTodos } from "@/redux/store";
import { fetchTodos } from "@/redux/features/todo-slice";

export default function Todolist() {
	const session = useSession();
	return (
		<div className="overflow-hidden grid grid-rows-[auto_auto] content-start p-6 bg-[#EAEAEA] h-full rounded-t-3xl">
			{session.status == "authenticated" && <CreateTodo />}
			<Lists />
		</div>
	);
}
