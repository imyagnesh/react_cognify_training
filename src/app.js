import React, { Component, createRef } from "react";

export class App extends Component {
  todoInput = createRef();

  state = {
    todoList: [],
  };

  addTodo = () => {
    const { todoList } = this.state;
    this.setState(
      {
        todoList: [
          ...todoList,
          { todoText: this.todoInput.current.value, isDone: false, id: new Date().valueOf },
        ],
      },
      () => {
        this.todoInput.current.value = "";
      },
    );
  };

  render() {
    console.log("render");
    const { todoList } = this.state;

    return (
      <div>
        <h1>Todo App</h1>
        <div>
          <input type="text" name="todoInput" ref={this.todoInput} />
          <button type="button" onClick={this.addTodo}>
            Add Todo
          </button>
        </div>
        <div>
          {/* always use unique ID instead of Index to improve performace */}
          {todoList.map(todoItem => (
            <div key={todoItem.id}>
              <span>{todoItem.todoText}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
