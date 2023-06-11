import React, { useState, FormEvent } from "react";

interface TodoFormProps {
  onAdd(newTodo: string): void;
}

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAdd(newTodo);
    setNewTodo("");
  };

  return (
    <form className="flex justify-between mb-4" onSubmit={handleSubmit}>
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
        onClick={handleSubmit}
        className="bg-blue-500 text-white font-bold p-2 rounded ml-2"
      >
        추가
      </button>
    </form>
  );
};

export default TodoForm;
