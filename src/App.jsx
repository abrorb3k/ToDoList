import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  toggleTodo,
  editTodo,
  startEditing,
} from "./redux/todoSlice";
import "./App.css";

import add from "./assets/add-btn.svg";
import checkk from "./assets/check-btn.svg";
import deletee from "./assets/delete-btn.svg";
import returnn from "./assets/return.svg";
import edit from "./assets/edit.svg";

const TodoApp = () => {
  const [todo, setTodo] = useState("");
  const [editInput, setEditInput] = useState("");
  const todos = useSelector((state) => state.todos.todos);
  const completedTodos = useSelector((state) => state.todos.completedTodos);
  const editingId = useSelector((state) => state.todos.editingId);
  const dispatch = useDispatch();

  // Add a new todo
  const handleAdd = () => {
    if (todo.trim()) {
      dispatch(addTodo(todo));
      setTodo(""); // Clear the input after adding
    }
  };

  // Delete a todo
  const handleDelete = (id, completed = false) => {
    dispatch(removeTodo({ id, completed }));
  };

  // Toggle a todo between completed and pending
  const handleCheck = (id) => {
    dispatch(toggleTodo({ id }));
  };

  // Return a completed todo back to pending
  const handleReturn = (id) => {
    dispatch(toggleTodo({ id }));
  };

  // Start editing a todo
  const handleStartEditing = (id, currentText) => {
    setEditInput(currentText); // Set the current text to the edit input
    dispatch(startEditing(id)); // Set the editing state to the current todo's ID
  };

  // Save the edited todo
  const handleSaveEdit = () => {
    if (editInput.trim()) {
      dispatch(editTodo({ id: editingId, text: editInput })); // Update the todo
      setEditInput(""); // Clear the input after saving
      dispatch(startEditing(null)); // Exit the editing mode
    }
  };

  // Set the input field to the current todo's text when editing starts
  useEffect(() => {
    if (editingId !== null) {
      const todoToEdit = todos.find((todo) => todo.id === editingId);
      setEditInput(todoToEdit ? todoToEdit.text : "");
    }
  }, [editingId, todos]);

  return (
    <div>
      <div className="container">
        <header>
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)} // Update the todo text
            type="text"
            placeholder="Yangi vazifani kiriting..."
          />
          <button onClick={handleAdd} className="plus">
            <img className="delll" src={add} alt="add btn" />
          </button>
        </header>

        <div className="lists">
          <h2 style={{ display: todos.length ? "inline" : "none" }}>
            Vazifalar - <span>{todos.length}</span>
          </h2>
          {todos.map((value) => (
            <div key={value.id} className="card">
              <p>{value.text}</p>
              <div className="btns">
                <button
                  className="checkk"
                  onClick={() => handleCheck(value.id)}
                >
                  <img src={checkk} alt="Tugallash" />
                </button>
                <button
                  className="deletee"
                  onClick={() => handleDelete(value.id)}
                >
                  <img src={deletee} alt="delete btn" />
                </button>
                <button
                  className="edit"
                  onClick={() => handleStartEditing(value.id, value.text)}
                >
                  <img src={edit} alt="edit" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {editingId !== null && (
          <div className="editContainer">
            <input
              type="text"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)} // Update the edit input
            />
            <button className="save" onClick={handleSaveEdit}>
              Save
            </button>
          </div>
        )}

        <div className="lists">
          <h3
            style={{
              display: completedTodos.length ? "inline" : "none",
            }}
          >
            Tugallanganlar - <span>{completedTodos.length}</span>
          </h3>
          {completedTodos.map((value) => (
            <div key={value.id} className="card">
              <p className="comp">{value.text}</p>
              <div className="btns">
                <button
                  className="returnn"
                  onClick={() => handleReturn(value.id)}
                >
                  <img src={returnn} alt="return btn" />
                </button>
                <button
                  className="deletee"
                  onClick={() => handleDelete(value.id, true)}
                >
                  <img src={deletee} alt="delete btn" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
