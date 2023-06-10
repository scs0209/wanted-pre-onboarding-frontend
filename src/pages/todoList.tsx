import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "../types";
import TodoItem from "../components/todo-item";

import { backUrl } from "../config";
import axios from "axios";

const TodoList = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editing, setEditing] = useState<number | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      getTodos();
    }
  }, []);

  const getTodos = useCallback(async () => {
    const response = await axios.get(`${backUrl}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos(response.data);
  }, [token]);

  const addTodo = useCallback(
    async (e: any) => {
      e.preventDefault();
      const response = await axios.post(
        `${backUrl}/todos`,
        { todo: newTodo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setTodos([...todos, data]);
    },
    [newTodo, token, todos]
  );

  const deleteTodo = useCallback(
    async (id: number) => {
      await axios.delete(`${backUrl}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [token, todos]
  );

  const toggleCompleted = useCallback(
    async (id: number, isCompleted: boolean) => {
      const response = await axios.patch(
        `${backUrl}/todos/${id}`,
        { isCompleted: !isCompleted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: data.isCompleted } : todo
        )
      );
    },
    [token, todos]
  );

  const cancelEditing = useCallback((id: number) => {
    setEditing(id);
  }, []);

  const updateTodo = useCallback(
    async (id: number, updatedTodo: string) => {
      const response = await axios.put(
        `${backUrl}/todos/${id}`,
        { todo: updatedTodo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, todo: data.todo } : todo
        )
      );
      setEditing(null);
    },
    [token, todos]
  );

  return (
    <div className="container mx-auto p-4">
      <h1>Todo List</h1>
      <form className="flex justify-between mb-4">
        <input
          data-testid="new-todo-input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="shadow appearance-none p-2 w-full border border-gray-300 rounded focus:outline-blue-500"
          placeholder="Add Todo"
        />
        <button
          data-testid="new-todo-add-button"
          type="submit"
          onClick={addTodo}
          className="bg-blue-500 text-white font-bold p-2 rounded ml-2"
        >
          추가
        </button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <TodoItem
              todo={todo}
              index={index}
              editing={editing}
              onToggleCompleted={toggleCompleted}
              onDelete={deleteTodo}
              onEdit={setEditing}
              onUpdate={updateTodo}
              onCancel={cancelEditing}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
