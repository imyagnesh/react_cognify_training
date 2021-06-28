// import React, { Component, createRef } from "react";
import React, { useState, useRef, useEffect } from "react";

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

const App = ({ initialGreet }) => {
  // const [todoList, setTodoList] = useState([]);
  const [greet, setGreet] = useState(initialGreet);
  const [firstname, setFirstname] = useState("Yagnesh");
  const [lastName, setLastName] = useState("Modh");

  // useEffect(() => {
  //   console.log("compononet did mount");
  //   return () => {
  //     console.log("component will unmount");
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log("useEffect");
  //   return () => {
  //     console.log("component will unmount");
  //   };
  // });

  // 1. NEVER USE COMPONENTWILLUNMOUNT WITHOUT EMPTY ARRAY
  // 2. NEVER USE USEEFFECT WITHOUT SECOND PARAMETER

  // 1. SNAPSHOT BEFORE UPDATE
  // 2. GETDERIVEDSTATEFROMERROR
  // 3. COMPONENTDIDCATCH

  // componentDidMount
  // componentWillUpdate

  // component did mount
  useEffect(() => {
    console.log("use effetct with empty array");
    return () => {
      console.log("component will unmount on with empty array");
    };
  }, []);

  useEffect(() => {
    console.log("use effetct with firstName");
  }, [firstname]);

  useEffect(() => {
    console.log("use effetct with lastName");
  }, [lastName]);

  useEffect(() => {
    console.log("use effetct with firstname & lastName");
  }, [firstname, lastName]);

  const callGreet = () => {
    setGreet("hola");
  };

  const changeFistName = () => {
    setFirstname("Rohit");
  };

  const changeLastName = () => {
    setLastName("Sharma");
  };

  const chnageName = () => {
    setFirstname("Rohit");

    setLastName("Sharma");
  };

  console.log("render");
  return (
    <div>
      <h1>{greet}</h1>
      <h1>{firstname}</h1>
      <h1>{lastName}</h1>
      <button type="button" onClick={callGreet}>
        Click Me
      </button>

      <button type="button" onClick={changeFistName}>
        Change FirstName
      </button>

      <button type="button" onClick={changeLastName}>
        Change LastName
      </button>

      <button type="button" onClick={chnageName}>
        Change FullName
      </button>
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
