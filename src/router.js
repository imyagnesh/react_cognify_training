import React from "react";
import { Router } from "react-router-dom";
import routes from "./routes";
import AppRoutes from "./components/AppRoutes";
import customHistory from "./customHistory";

const AppRoute = () => {
  return (
    <Router history={customHistory}>
      <AppRoutes routes={routes} />
    </Router>
  );
};

export default AppRoute;
