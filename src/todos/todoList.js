import React, { memo } from "react";
import PropTypes from "prop-types";

const TodoList = ({ data, completeTodo, deleteTodo }) => {
  return (
    <div data-testid="todoList-container">
      {/* always use unique ID instead of Index to improve performace */}
      {data.map(todoItem => (
        <div data-testid="todoList-item" key={todoItem.id}>
          <input
            type="checkbox"
            checked={todoItem.isDone}
            onChange={() => {
              completeTodo(todoItem);
            }}
          />
          <span
            style={{
              textDecoration: todoItem.isDone ? "line-through" : "none",
            }}>
            {todoItem.todoText}
          </span>
          <button
            type="button"
            onClick={() => {
              deleteTodo(todoItem);
            }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

TodoList.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default memo(TodoList);
