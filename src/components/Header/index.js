import React from "react";
import customHistory from "../../customHistory";

const Header = () => {
  return (
    <div>
      <h1>Header Component</h1>
      <button
        type="button"
        onClick={() => {
          customHistory.push("/about");
        }}>
        Logout
      </button>
    </div>
  );
};

export default Header;
