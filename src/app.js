import React, { Component, createRef } from "react";
import TodoFilter from "./todos/todoFilter";
import TodoList from "./todos/todoList";
import TodoForm from "./todos/todoForm";

export class App extends Component {
  todoInput = createRef();

  state = {
    todoList: [],
    filterType: "all",
    error: null,
    loading: false,
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     greet: `Hello, ${props.firstName}`,
  //   };
  //   // this.xyz = this.xyz.bind(this);
  // }

  // static getDerivedStateFromProps(props, state) {
  //   return {

  //   }
  // }

  componentDidMount = async () => {
    try {
      this.setState({
        loading: true,
      });
      const res = await fetch("http://localhost:3000/todo");
      const json = await res.json();
      this.setState({
        todoList: json,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error,
        loading: false,
      });
    }
  };

  addTodo = async event => {
    event.preventDefault();
    try {
      this.setState({
        loading: true,
      });
      const res = await fetch("http://localhost:3000/todo", {
        method: "POST",
        body: JSON.stringify({ todoText: this.todoInput.current.value, isDone: false }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const json = await res.json();

      const { todoList } = this.state;

      this.setState(
        {
          todoList: [...todoList, json],
          filterType: "all",
          loading: false,
        },
        () => {
          this.todoInput.current.value = "";
        },
      );
    } catch (error) {
      this.setState({
        error,
        loading: false,
      });
    }
  };

  completeTodo = async todoItem => {
    try {
      this.setState({
        loading: true,
      });

      const res = await fetch(`http://localhost:3000/todo/${todoItem.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...todoItem, isDone: !todoItem.isDone }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const json = await res.json();

      const { todoList } = this.state;
      const index = todoList.findIndex(x => x.id === todoItem.id);

      const updatedTodoList = [...todoList.slice(0, index), json, ...todoList.slice(index + 1)];

      this.setState({
        todoList: updatedTodoList,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error,
        loading: false,
      });
    }
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
    const { filterType, error, loading } = this.state;

    if (error) {
      return <h1>{error.message}</h1>;
    }

    if (loading) {
      return <h1>Loading...</h1>;
    }

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
