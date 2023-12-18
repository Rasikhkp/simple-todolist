"use client";

import { useDispatch, useSelector } from "react-redux";
import { updateTodo, addNewTodo, setIsEdit } from "@/redux/features/todo-slice";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AppDispatch, getIsEdit } from "@/redux/store";
import { Session } from "next-auth";

export type ExtendedSession = Session & {
	id: string;
};

export default function CreateTodo() {
	const [newTodo, setNewTodo] = useState("");
	const dispatch: AppDispatch = useDispatch();
	const session = useSession();
	const isEdit = useSelector(getIsEdit);

	useEffect(() => {
		if (isEdit.status) setNewTodo(isEdit.tempTodo);
		else setNewTodo("");
		document.querySelector("input")?.focus();
	}, [isEdit]);

	const handleNewTodo = async () => {
		dispatch(
			addNewTodo({
				userId: (session.data as ExtendedSession)?.id,
				todo: newTodo,
			})
		);

		setNewTodo("");
		document.querySelector("input")?.focus();
	};

	const handleUpdateTodo = async () => {
		dispatch(updateTodo({ todo: newTodo, id: isEdit.tempId }));

		setNewTodo("");
		document.querySelector("input")?.focus();

		dispatch(setIsEdit({ status: false, tempId: "", tempTodo: "" }));
	};

	return (
		<div className="h-fit">
			<div className="text-2xl text-[#5E5454] font-bold mb-2">Add Todo</div>
			<div className="flex w-96 gap-5">
				<input
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					type="text"
					className="px-4 py-3 rounded-xl text-sm border"
					placeholder="Enter todo..."
				/>
				<button
					onClick={isEdit.status ? handleUpdateTodo : handleNewTodo}
					className="bg-red-400 rounded-xl flex-1 text-white text-sm px-4 py-2"
				>
					{isEdit.status ? "Update Todo" : "Create Todo"}
				</button>
			</div>
			<div className="divider text-white h-fit"></div>
		</div>
	);
}
