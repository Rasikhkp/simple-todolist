import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  todo: string;
  userId: string;
};

type IsEdit = {
  status: boolean;
  tempId: string;
  tempTodo: string;
};

type initialState = {
  value: Todo[];
  isEdit: IsEdit;
};

export const fetchTodos = createAsyncThunk<Todo[]>("todo/fetchTodos", async () => {
  const res = await fetch("/api/todo");
  const { todos } = await res.json();

  return todos;
});

type AddNewTodoPayload = {
  todo: string;
  userId: string;
};

export const addNewTodo = createAsyncThunk<Todo, AddNewTodoPayload>(
  "todo/addNewTodo",
  async ({ todo, userId }) => {
	const res = await fetch("/api/todo", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify({
		todo,
		userId,
	  }),
	});

	const { newTodo } = await res.json();

	return newTodo;
  }
);

export const removeTodo = createAsyncThunk<Todo[], string>(
  "todo/removeTodo",
  async (id) => {
	const res = await fetch("/api/todo", {
	  method: "DELETE",
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify({
		id,
	  }),
	});

	const { todos } = await res.json();

	return todos;
  }
);

type UpdateTodoPayload = {
  id: string;
  todo: string;
};

export const updateTodo = createAsyncThunk<Todo[], UpdateTodoPayload>(
  "todo/updateTodo",
  async ({ id, todo }) => {
	const res = await fetch("api/todo", {
	  method: "PUT",
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify({
		id,
		todo,
	  }),
	});

	const { todos } = await res.json();

	return todos;
  }
);

const initialState: initialState = {
  value: [],
  isEdit: {
	status: false,
	tempId: "",
	tempTodo: "",
  },
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
	setIsEdit: (
	  state,
	  action: PayloadAction<IsEdit>
	) => {
	  state.isEdit = action.payload;
	},
  },
  extraReducers: (builder) => {
	builder.addCase(fetchTodos.fulfilled, (state, action) => {
	  state.value = action.payload;
	});

	builder.addCase(addNewTodo.fulfilled, (state, action) => {
	  state.value.push(action.payload);
	});

	builder.addCase(removeTodo.fulfilled, (state, action) => {
	  state.value = action.payload;
	});

	builder.addCase(updateTodo.fulfilled, (state, action) => {
	  state.value = action.payload;
	});
  },
});

export const { setIsEdit } = todoSlice.actions;

export default todoSlice.reducer;