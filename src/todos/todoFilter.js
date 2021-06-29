import React, { memo } from "react";
import PropTypes from "prop-types";

const TodoFilter = ({ onFilter, filterType }) => {
  return (
    <div data-testid="todofilter-container">
      <button
        type="button"
        style={{ border: filterType === "all" ? "1px solid red" : "none" }}
        onClick={() => {
          onFilter("all");
        }}>
        All
      </button>
      <button
        type="button"
        style={{ border: filterType === "pending" ? "1px solid red" : "none" }}
        onClick={() => {
          onFilter("pending");
        }}>
        Pending
      </button>
      <button
        type="button"
        style={{ border: filterType === "completed" ? "1px solid red" : "none" }}
        onClick={() => {
          onFilter("completed");
        }}>
        Completed
      </button>
    </div>
  );
};

TodoFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filterType: PropTypes.string.isRequired,
};

export default memo(TodoFilter, (preProps, nextProps) => {
  return preProps.filterType === nextProps.filterType;
});
