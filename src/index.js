import React from "react";
import ReactDOM from "react-dom";

// Rules
// 1. Name should should start with capital letter
// 2. return only single element
// 3. use className instead of class

const App = () => (
  <>
    <h1 className="header">Hello World</h1>
    <h2>yagnesh</h2>
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
