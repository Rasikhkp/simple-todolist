import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo-slice";

export const store = configureStore({
	reducer: {
		todos: todoReducer,
	},
});

type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const getAllTodos = (state: RootState) => state.todos.value;

export const getIsEdit = (state: RootState) => state.todos.isEdit;
