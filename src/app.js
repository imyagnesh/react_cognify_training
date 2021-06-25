import React, { Component, createRef } from "react";

export class App extends Component {
  todoInput = createRef();

  state = {
    todoList: [],
    filterType: "all",
  };

  addTodo = () => {
    const { todoList } = this.state;

    this.setState(
      {
        todoList: [
          ...todoList,
          { todoText: this.todoInput.current.value, isDone: false, id: new Date().valueOf() },
        ],
        filterType: "all",
      },
      () => {
        this.todoInput.current.value = "";
      },
    );
  };

  completeTodo = todoItem => {
    const { todoList } = this.state;
    const index = todoList.findIndex(x => x.id === todoItem.id);

    const updatedTodoList = [
      ...todoList.slice(0, index),
      { ...todoItem, isDone: !todoItem.isDone },
      ...todoList.slice(index + 1),
    ];

    this.setState({
      todoList: updatedTodoList,
    });
  };

  deleteTodo = todoItem => {
    const { todoList } = this.state;
    const index = todoList.findIndex(x => x.id === todoItem.id);

    const updatedTodoList = [...todoList.slice(0, index), ...todoList.slice(index + 1)];

    this.setState({
      todoList: updatedTodoList,
    });
  };

  render() {
    const { todoList, filterType } = this.state;

    return (
      <div>
        <h1>Todo App</h1>
        <div>
          <input type="text" name="todoInput" id="todoInput" ref={this.todoInput} />
          <button type="button" onClick={this.addTodo}>
            Add Todo
          </button>
        </div>
        <div>
          {/* always use unique ID instead of Index to improve performace */}
          {todoList
            .filter(todoItem => {
              switch (filterType) {
                case "completed":
                  return todoItem.isDone;

                case "pending":
                  return !todoItem.isDone;

                default:
                  return true;
              }
            })
            .map(todoItem => (
              <div key={todoItem.id}>
                <input
                  type="checkbox"
                  checked={todoItem.isDone}
                  onChange={() => {
                    this.completeTodo(todoItem);
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
                    this.deleteTodo(todoItem);
                  }}>
                  Delete
                </button>
              </div>
            ))}
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              this.setState({ filterType: "all" });
            }}>
            All
          </button>
          <button
            type="button"
            onClick={() => {
              this.setState({ filterType: "pending" });
            }}>
            Pending
          </button>
          <button
            type="button"
            onClick={() => {
              this.setState({ filterType: "completed" });
            }}>
            Completed
          </button>
        </div>
      </div>
    );
  }
}

export default App;
