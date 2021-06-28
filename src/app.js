// import React, { Component, createRef } from "react";
import React, { useState, useRef, useEffect, useCallback } from "react";

import axios from "axios";
import TodoFilter from "./todos/todoFilter";
import TodoList from "./todos/todoList";
import TodoForm from "./todos/todoForm";

const axiosInstance = axios.create({
  url: "/todo",
  baseURL: "http://localhost:3000/",
  timeout: 3000,
});

// Mounting
// -> Constructor
//    -> to derived state base on props  -> Possible
//    -> to bind method -> NA
//    -> Call Api
// -> GetDerivedFromProps
// -> render
// -> Component Did Mount

// 1. memory occupation
// 2. less code
// 3. if you implement proper hook then performance is better

const App = () => {
  const [loading, setLoading] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("all");

  const todoInput = useRef(null);

  const getTodos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance("todo");
      setTodoList(res.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  const addTodo = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstance.post("todo", {
        todoText: todoInput.current.value,
        isDone: false,
      });

      setLoading(false);
      setTodoList([...todoList, res.data]);
      setFilterType("all");

      todoInput.current.value = "";
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // component did mount
  useEffect(() => {
    getTodos();
    return () => {};
  }, [getTodos]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} ref={todoInput} />
      <TodoList data={todoList} completeTodo={() => {}} deleteTodo={() => {}} />

      {/* <TodoFilter
        onFilter={async ft => {
          try {
            this.setState({
              loading: true,
            });
            let params = {};
            if (ft !== "all") {
              params = {
                isDone: ft === "completed",
              };
            }

            const res = await axiosInstance.get("todo", {
              params,
            });

            this.setState({
              filterType: ft,
              todoList: res.data,
              loading: false,
            });
          } catch (err) {
            this.setState({
              error: err,
              loading: false,
            });
          }
        }}
        filterType={filterType}
      /> */}
    </div>
  );
};

// export class App extends Component {
//   todoInput = createRef();

//   state = {
//     todoList: [],
//     filterType: "all",
//     error: null,
//     loading: false,
//   };

//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     greet: `Hello, ${props.firstName}`,
//   //   };
//   //   // this.xyz = this.xyz.bind(this);
//   // }

//   // static getDerivedStateFromProps(props, state) {
//   //   return {

//   //   }
//   // }

//   componentDidMount = async () => {
//     try {
//       this.setState({
//         loading: true,
//       });
//       const res = await axiosInstance.get("todo");
//       this.setState({
//         todoList: res.data,
//         loading: false,
//       });
//     } catch (error) {
//       this.setState({
//         error,
//         loading: false,
//       });
//     }
//   };

//   addTodo = async event => {
//     event.preventDefault();
//     try {
//       this.setState({
//         loading: true,
//       });
//       const res = await axiosInstance.post("todo", {
//         todoText: this.todoInput.current.value,
//         isDone: false,
//       });

//       const { todoList } = this.state;

//       this.setState(
//         {
//           todoList: [...todoList, res.data],
//           filterType: "all",
//           loading: false,
//         },
//         () => {
//           this.todoInput.current.value = "";
//         },
//       );
//     } catch (error) {
//       this.setState({
//         error,
//         loading: false,
//       });
//     }
//   };

//   completeTodo = async todoItem => {
//     try {
//       this.setState({
//         loading: true,
//       });

//       const res = await axiosInstance.put(`todo/${todoItem.id}`, {
//         ...todoItem,
//         isDone: !todoItem.isDone,
//       });

//       const { todoList } = this.state;
//       const index = todoList.findIndex(x => x.id === todoItem.id);

//       const updatedTodoList = [...todoList.slice(0, index), res.data, ...todoList.slice(index + 1)];

//       this.setState({
//         todoList: updatedTodoList,
//         loading: false,
//       });
//     } catch (error) {
//       this.setState({
//         error,
//         loading: false,
//       });
//     }
//   };

//   deleteTodo = async todoItem => {
//     try {
//       this.setState({
//         loading: true,
//       });

//       await axiosInstance.delete(`todo/${todoItem.id}`);

//       const { todoList } = this.state;

//       const index = todoList.findIndex(x => x.id === todoItem.id);

//       const updatedTodoList = [...todoList.slice(0, index), ...todoList.slice(index + 1)];

//       this.setState({
//         todoList: updatedTodoList,
//         loading: false,
//       });
//     } catch (error) {
//       this.setState({
//         error,
//         loading: false,
//       });
//     }
//   };

//   // filteredTodos = () => {
//   //   const { todoList, filterType } = this.state;

//   //   return todoList.filter(todoItem => {
//   //     switch (filterType) {
//   //       case "completed":
//   //         return todoItem.isDone;

//   //       case "pending":
//   //         return !todoItem.isDone;

//   //       default:
//   //         return true;
//   //     }
//   //   });
//   // };

//   render() {
//     const { filterType, error, loading, todoList } = this.state;

//     if (error) {
//       return <h1>{error.message}</h1>;
//     }

//     if (loading) {
//       return <h1>Loading...</h1>;
//     }

//     return (
//       <div>
//         <h1>Todo App</h1>
//         <TodoForm addTodo={this.addTodo} ref={this.todoInput} />
//         <TodoList data={todoList} completeTodo={this.completeTodo} deleteTodo={this.deleteTodo} />
//         <TodoFilter
//           onFilter={async ft => {
//             try {
//               this.setState({
//                 loading: true,
//               });
//               let params = {};
//               if (ft !== "all") {
//                 params = {
//                   isDone: ft === "completed",
//                 };
//               }

//               const res = await axiosInstance.get("todo", {
//                 params,
//               });

//               this.setState({
//                 filterType: ft,
//                 todoList: res.data,
//                 loading: false,
//               });
//             } catch (err) {
//               this.setState({
//                 error: err,
//                 loading: false,
//               });
//             }
//           }}
//           filterType={filterType}
//         />
//       </div>
//     );
//   }
// }

export default App;
