import React from "react";
import AppRoutes from "../../components/AppRoutes";

const Main = ({ routes }) => {
  return (
    <div>
      <header>Header component</header>
      <aside>side component</aside>
      <main>
        <AppRoutes routes={routes} />
      </main>
      <footer>footer component</footer>
    </div>
  );
};

export default Main;
