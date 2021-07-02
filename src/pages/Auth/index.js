import React from "react";
import AppRoutes from "../../components/AppRoutes";

const Auth = ({ routes }) => {
  return (
    <div>
      <header>header component</header>
      <AppRoutes routes={routes} />
      <footer>footer component</footer>
    </div>
  );
};

export default Auth;
