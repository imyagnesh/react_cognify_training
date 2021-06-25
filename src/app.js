import React, { Component, createRef } from "react";
import TodoFilter from "./todos/todoFilter";
import TodoList from "./todos/todoList";
import TodoForm from "./todos/todoForm";

export class App extends Component {
  todoInput = createRef();

  state = {
    todoList: [],
    filterType: "all",
  };

  addTodo = event => {
    event.preventDefault();

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

  filteredTodos = () => {
    const { todoList, filterType } = this.state;

    return todoList.filter(todoItem => {
      switch (filterType) {
        case "completed":
          return todoItem.isDone;

        case "pending":
          return !todoItem.isDone;

        default:
          return true;
      }
    });
  };

  render() {
    const { filterType } = this.state;

    return (
      <div>
        <h1>Todo App</h1>
        <TodoForm addTodo={this.addTodo} ref={this.todoInput} />
        <TodoList
          data={this.filteredTodos()}
          completeTodo={this.completeTodo}
          deleteTodo={this.deleteTodo}
        />
        <TodoFilter
          onFilter={ft => {
            this.setState({
              filterType: ft,
            });
          }}
          filterType={filterType}
        />
      </div>
    );
  }
}

export default App;
