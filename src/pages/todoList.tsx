import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Todo 타입 인터페이스
interface Todo {
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editing, setEditing] = useState<number | null>(null);

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

  const addTodo = () => {
    setTodos(todos.concat({ text: newTodo, completed: false }));
    setNewTodo("");
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const updateTodo = (index: number, updatedTodo: Todo) => {
    setTodos(todos.map((todo, i) => (i === index ? updatedTodo : todo)));
    setEditing(null);
  };

  const toggleCompleted = (index: number) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <input
        data-testid="new-todo-input"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button data-testid="new-todo-add-button" onClick={addTodo}>
        추가
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editing === index ? (
              <>
                <input
                  data-testid="modify-input"
                  value={todo.text}
                  onChange={(e) =>
                    updateTodo(index, {
                      text: e.target.value,
                      completed: todo.completed,
                    })
                  }
                />
                <button
                  data-testid="submit-button"
                  onClick={() => {
                    updateTodo(index, { ...todo });
                    setEditing(null);
                  }}
                >
                  제출
                </button>
                <button
                  data-testid="cancel-button"
                  onClick={() => {
                    setEditing(null);
                  }}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompleted(index)}
                  />
                  <span>{todo.text}</span>
                </label>
                <button
                  data-testid="modify-button"
                  onClick={() => setEditing(index)}
                >
                  수정
                </button>
                <button
                  data-testid="delete-button"
                  onClick={() => deleteTodo(index)}
                >
                  삭제
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
