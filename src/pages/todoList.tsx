import React, { useState, useEffect, useCallback, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "../types";
import TodoItem from "../components/TodoList/todo-item";
import { backUrl } from "../config";
import axios from "axios";
import TodoForm from "../components/TodoList/todo-form";

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
  console.log(token);

  // 데이터 가져오기
  const getTodos = useCallback(async () => {
    const response = await axios.get(`${backUrl}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos(response.data);
  }, [token]);

  // 할 일 추가
  const addTodo = useCallback(
    async (newTodo: string) => {
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

  // 할 일 삭제
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

  // 수정 취소
  const cancelEditing = useCallback(() => {
    setEditing(null);
  }, []);

  // 할 일 수정
  const updateTodo = useCallback(
    async (id: number, updatedTodo: string, isCompleted: boolean) => {
      const response = await axios.put(
        `${backUrl}/todos/${id}`,
        { todo: updatedTodo, isCompleted },
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
          todo.id === id
            ? { ...todo, todo: data.todo, isCompleted: data.isCompleted }
            : todo
        )
      );
      setEditing(null);
    },
    [token, todos]
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className=" mb-3 text-5xl font-bold text-center text-blue-400">
        Todo List
      </h1>
      <TodoForm onAdd={addTodo} />
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <TodoItem
              todo={todo}
              editing={editing}
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
