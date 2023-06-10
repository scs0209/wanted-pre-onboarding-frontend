import React, { VFC, memo, useCallback, useState } from "react";
import { Todo } from "../types";

interface Props {
  todo: Todo;
  index: number;
  editing: number | null;
  onToggleCompleted: (id: number, isCompleted: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number, updatedTodo: string) => void;
  onCancel: (id: number) => void;
}

const TodoItem: VFC<Props> = ({
  todo,
  index,
  editing,
  onToggleCompleted,
  onDelete,
  onEdit,
  onUpdate,
  onCancel,
}) => {
  const [updatedText, setUpdatedText] = useState(todo.todo);

  const handleUpdate = useCallback(() => {
    onUpdate(todo.id, updatedText);
  }, [onUpdate, todo.id, updatedText]);

  if (editing === index) {
    return (
      <div className="flex mb-4">
        <input
          data-testid="modify-input"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          className="p-2 w-full border border-gray-300 rounded"
        />
        <button
          data-testid="submit-button"
          onClick={handleUpdate}
          className="bg-blue-500 text-white font-bold p-2 rounded ml-2"
        >
          제출
        </button>
        <button
          data-testid="cancel-button"
          onClick={() => onCancel(todo.id)}
          className="bg-red-500 text-white font-bold p-2 rounded ml-2"
        >
          취소
        </button>
      </div>
    );
  }

  return (
    <div className="flex mb-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggleCompleted(todo.id, todo.isCompleted)}
          className="mr-2"
        />
        <span className={todo.isCompleted ? "line-through" : ""}>
          {todo.todo}
        </span>
      </label>
      <button
        data-testid="modify-button"
        onClick={() => onEdit(index)}
        className="bg-yellow-500 text-white font-bold p-2 rounded ml-auto"
      >
        수정
      </button>
      <button
        data-testid="delete-button"
        onClick={() => onDelete(todo.id)}
        className="bg-red-500 text-white font-bold p-2 rounded ml-2"
      >
        삭제
      </button>
    </div>
  );
};

export default memo(TodoItem);
