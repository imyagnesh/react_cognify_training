import React from "react";
import PropTypes from "prop-types";
import "./app.scss";

const App = ({ firstName, lastName }) => (
  <>
    <h1
      className="header"
      style={{
        backgroundColor: "green",
      }}>
      {firstName}
    </h1>
    <h2>{lastName}</h2>
    <input type="password" />
  </>
);

App.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default App;
