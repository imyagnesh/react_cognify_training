import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import TodoList from "../todoList";

const listData = [
  {
    todoText: "get milk",
    isDone: true,
    id: 1,
  },
  {
    todoText: "Get Milk",
    isDone: false,
    id: 3,
  },
  {
    todoText: "learn vue",
    isDone: false,
    id: 5,
  },
];

// mock function
const fnCompletedTodo = jest.fn();
const fnDeleteTodo = jest.fn();

const setup = (data = []) => {
  const props = {
    data,
    completeTodo: fnCompletedTodo,
    deleteTodo: fnDeleteTodo,
  };
  return render(<TodoList {...props} />);
};

describe("TodoList component", () => {
  test("should render snapshot", () => {
    const { container } = setup();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render snapshot with data", () => {
    const { container } = setup(listData);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render todoFilter component", () => {
    const { findByTestId } = setup();
    expect(findByTestId("todoList-container")).not.toBeNull();
  });

  test("should render all 3 items", () => {
    const { queryAllByTestId } = setup(listData);
    const items = queryAllByTestId("todoList-item");
    expect(items.length).toBe(listData.length);
    for (let i = 0; i < listData.length; i++) {
      const element = items[i];
      expect(element.childNodes.length).toBe(3);
      expect(element.childNodes[0]).toHaveAttribute("type", "checkbox");
      if (listData[i].isDone) {
        expect(element.childNodes[0]).toHaveAttribute("checked", "");
      } else {
        expect(element.childNodes[0]).not.toHaveAttribute("checked");
      }
      //   fireEvent.change(element.childNodes[0]);
      //   expect(fnCompletedTodo).toBeCalledTimes(1);
      //   expect(fnCompletedTodo).toBeCalledWith(listData[i]);

      expect(element.childNodes[1]).toHaveTextContent(listData[i].todoText);
      expect(element.childNodes[1]).toHaveStyle(
        `text-decoration: ${listData[i].isDone ? "line-through" : "none"}`,
      );
      expect(element.childNodes[2]).toHaveAttribute("type", "button");
      expect(element.childNodes[2]).toHaveTextContent("Delete");
    }
    // expect(items[0].childNodes.length).toBe(3);
    // expect(items[0].childNodes[0]).toHaveAttribute("type", "checkbox");
  });
});
