import React from "react";
import { render, within } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import App, { axiosInstance } from "./App";
import TodoFilter from "./todos/todoFilter";
import TodoList from "./todos/todoList";
import TodoForm from "./todos/todoForm";

const mock = new MockAdapter(axiosInstance);

describe("Todoapp Page", () => {
  //   it("snapshopt", () => {
  //     const { container } = render(<App />);
  //     expect(container.firstChild).toMatchSnapshot();
  //   });

  it("check render component", async () => {
    mock.onGet("/todo").reply(200, [
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
    ]);
    const { getByText, findByTestId } = render(<App />);
    expect(getByText("Loading...")).toBeInTheDocument();
    const wrapper = await findByTestId("todoapp-wrapper");
    expect(wrapper).toBeInTheDocument();
    expect(getByText("Todo App")).toBeInTheDocument();
    const todoForm = within(wrapper).getByTestId("todo-form");
    expect(todoForm).toBeInTheDocument();
    // const addTodo = jest.fn();
    // const inputRef = React.createRef();
    // expect(<TodoFilter addTodo={addTodo} ref={inputRef} />).toBeInTheDocument();
  });
});
