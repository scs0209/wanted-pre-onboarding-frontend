import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "../types";
import TodoItem from "../components/todo-item";

const TodoList: React.FC = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editing, setEditing] = useState<number | null>(null);

  const addTodo = (e: any) => {
    e.preventDefault();
    setTodos(todos.concat({ text: newTodo, completed: false }));
    setNewTodo("");
  };

  const deleteTodo = useCallback((index: number) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  }, []);

  const updateTodo = useCallback((index: number, updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) => (i === index ? updatedTodo : todo))
    );
    setEditing(null);
  }, []);

  const toggleCompleted = useCallback((index: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const cancelEditing = useCallback(() => {
    setEditing(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    } else {
      const storedTodos = JSON.parse(localStorage.getItem("todos")!) || [];
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <form>
      <input
        data-testid="new-todo-input"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button data-testid="new-todo-add-button" type="submit" onClick={addTodo}>
        추가
      </button>
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
    </form>
  );
};

export default TodoList;
