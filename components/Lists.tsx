"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, getAllTodos } from "@/redux/store";
import { fetchTodos, removeTodo, setIsEdit } from "@/redux/features/todo-slice";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import trash from "@/public/icon/trash.svg";
import edit from "@/public/icon/edit.svg";
import Image from "next/image";
import { ExtendedSession } from "./CreateTodo";

export default function Lists() {
	const dispatch: AppDispatch = useDispatch();
	const todos = useSelector(getAllTodos);
	const session = useSession();
	console.log("session", typeof session);
	console.log("todos", todos);

	useEffect(() => {
		dispatch(fetchTodos());
	}, []);

	const handleRemove = (id: string) => {
		dispatch(setIsEdit({ status: false, tempId: "", tempTodo: "" }));
		dispatch(removeTodo(id));
	};

	return (
		<div className="overflow-y-scroll list w-full h-full flex flex-col gap-5">
			{todos?.map((todo: any, index: any) => (
				<div key={index} className="flex justify-between">
					<div className="w-full mr-3">
						<div className="text-sm py-3 px-4 text-gray-500 mb-2 bg-white rounded-xl">
							{todo.todo}
						</div>
						<div className="flex gap-4 items-center ml-3">
							<div className="w-6 h-6 bg-[#D9D9D9] rounded-full overflow-hidden">
								{todo.user.image && (
									<Image
										src={todo.user.image}
										alt={todo.user.name}
										width={24}
										height={24}
									/>
								)}
							</div>
							<div>
								<div className="text-xs">{todo.user.name}</div>
								<div className="text-[10px]">{todo.user.email}</div>
							</div>
						</div>
					</div>
					{(session.data as ExtendedSession).id == todo.user.id && (
						<div className="flex mt-1 mr-1">
							<button onClick={() => dispatch(setIsEdit({ status: true, tempId: todo.id, tempTodo: todo.todo }))} className="w-10 h-10 hover:bg-[#D9D9D9] transition-all rounded-full flex items-center justify-center">
								<Image src={edit} width={20} height={20} alt="edit" />
							</button>
							<button onClick={() => handleRemove(todo.id)} className="w-10 h-10 hover:bg-[#D9D9D9] transition-all rounded-full flex items-center justify-center">
								<Image src={trash} width={20} height={20} alt="edit" />
							</button>
						</div>
					)}
				</div>
			))}
		</div>
	);
}
