import React, { VFC, memo } from "react";
import { Todo } from "../types";

interface Props {
  todo: Todo;
  index: number;
  editing: number | null;
  onToggleCompleted: (index: number) => void;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  onUpdate: (index: number, updatedTodo: Todo) => void;
  onCancel: () => void;
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
  if (editing === index) {
    return (
      <>
        <input
          data-testid="modify-input"
          value={todo.text}
          onChange={(e) =>
            onUpdate(index, {
              text: e.target.value,
              completed: todo.completed,
            })
          }
        />
        <button
          data-testid="submit-button"
          onClick={() => {
            onUpdate(index, { ...todo });
            onCancel();
          }}
        >
          제출
        </button>
        <button data-testid="cancel-button" onClick={onCancel}>
          취소
        </button>
      </>
    );
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleCompleted(index)}
        />
        <span>{todo.text}</span>
      </label>
      <button data-testid="modify-button" onClick={() => onEdit(index)}>
        수정
      </button>
      <button data-testid="delete-button" onClick={() => onDelete(index)}>
        삭제
      </button>
    </>
  );
};

export default memo(TodoItem);
