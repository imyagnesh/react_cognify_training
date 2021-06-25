import React, { forwardRef, memo } from "react";
import PropTypes from "prop-types";

const TodoForm = forwardRef(({ addTodo }, ref) => {
  console.log("TodoForm");
  return (
    <form onSubmit={addTodo}>
      <input type="text" name="todoInput" id="todoInput" ref={ref} required autoComplete="off" />
      <button type="submit">Add Todo</button>
    </form>
  );
});

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default memo(TodoForm);
