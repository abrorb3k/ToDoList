import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    completedTodos: [],
    editingId: null,
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    removeTodo: (state, action) => {
      const { id, completed } = action.payload;
      if (completed) {
        state.completedTodos = state.completedTodos.filter(
          (todo) => todo.id !== id
        );
      } else {
        state.todos = state.todos.filter((todo) => todo.id !== id);
      }
    },
    toggleTodo: (state, action) => {
      const { id } = action.payload;

      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        const todo = state.todos.splice(todoIndex, 1)[0];
        todo.completed = true;
        state.completedTodos.push(todo);
      } else {
        const completedTodoIndex = state.completedTodos.findIndex(
          (todo) => todo.id === id
        );
        if (completedTodoIndex !== -1) {
          const completedTodo = state.completedTodos.splice(
            completedTodoIndex,
            1
          )[0];
          completedTodo.completed = false;
          state.todos.push(completedTodo);
        }
      }
    },
    startEditing: (state, action) => {
      state.editingId = action.payload;
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, startEditing, editTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
