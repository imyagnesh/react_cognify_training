import React, { Component, createRef } from "react";
import Test from "./test";

// Function Component(Maximum use function component)
// -> use to render html based on props
// -> to render static content
// -> for Example to render header, footer, navigation

// its light weight
// its not re-render unnecessary

// Class Component(Hooks)
// -> for data manipulation
// -> life cycle method
// -> for extra method/operation
// -> To handle state value

// Mouting Life Cycle

// -> constructore
// -> getDerivedStateFromProps
// -> render
// -> componentDidMount

// when State/Props/Context value change Component will rerender

// Update Life Cycle

// getDerivedStateFromProps
// shouldComponentUpdate -> IMP
// render
// getSnapshotBeforeUpdate
// componentDidUpdate

// Unmount

// -> componentWillUnmount -> IMP

// Error LifeCycle

// getDerivedStateFromError
// componentDidCatch

let outerVar = `I'm Outsider`;

// O(logn)
// O(n)
// O(1)

// Component will rerender only when props value or state value or context value

// class component
class App extends Component {
  // store temparary data for the component
  // state = {
  //   greet: "hello",
  // };

  headerRef = createRef();

  // initialize only once
  constructor(props) {
    console.log("constructor");
    super(props);

    this.state = {
      firstName: props.firstName,
      lastName: props.lastName,
      greet: "hello",
      password: "",
    };

    // this.changeText = this.changeText.bind(this);

    // initialize state value
    // fetch data or call api
    // its use for bind method
    // use operation which you want to execute only once
  }

  // before render base on props and state value you can update your state value
  // whatever you return that will become your new state value
  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps");
    // console.log(state);

    return {
      greet: "hola",
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // return false;
  // }

  // call only once
  componentDidMount() {
    // fetch data on load
    document.addEventListener("copy", () => {
      console.log("copied");
    });

    this.interval = setInterval(() => {
      console.log("hello");
    }, 1000);

    // console.log(this.headerRef.current);

    // O(1) -> best
    this.headerRef.current.style = "color: blue";

    // O(logn) -> intermediate
    // document.getElementById('header').style = "color: blue";

    // O(n) -> worst
    // document.getElementsByClassName("header").style = "color: blue";
  }

  // capture last screen information
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return 10;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentWillUnmount() {
    document.removeEventListener("copy");
    clearInterval(this.interval);
    // stop api calls
  }

  // App Method
  changeText = e => {
    // Component method
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    console.log("render");
    const { firstName, lastName, greet, password } = this.state;
    return (
      <>
        <h1
          ref={this.headerRef}
          className="header"
          style={{
            backgroundColor: "green",
          }}>
          {firstName}
        </h1>
        <h2>{lastName}</h2>
        <input type="password" value={password} onChange={this.changeText} />
        <button
          type="button"
          onClick={() => {
            this.setState({
              firstName: "rohit",
              lastName: "sharma",
            });
          }}>
          Click Me
        </button>
        <h1>{greet}</h1>
        <button
          type="button"
          onClick={() => {
            this.setState({
              greet: "bonjour",
            });
          }}>
          Change Greet
        </button>
        <h1>{outerVar}</h1>
        <button
          type="button"
          onClick={() => {
            outerVar = `I'm Insider`;
          }}>
          Change OuterVar
        </button>
        <Test />
      </>
    );
  }
}

export default App;

// import React from "react";
// import PropTypes from "prop-types";
// import "./app.scss";

// // Function component
// const App = ({ firstName, lastName }) => (
//   <>
//     <h1
//       className="header"
//       style={{
//         backgroundColor: "green",
//       }}>
//       {firstName}
//     </h1>
//     <h2>{lastName}</h2>
//     <input type="password" />
//   </>
// );

// App.propTypes = {
//   firstName: PropTypes.string.isRequired,
//   lastName: PropTypes.string.isRequired,
// };

// export default App;
