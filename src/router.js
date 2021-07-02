import React from "react";
import { Router } from "react-router-dom";
import routes from "./routes";
import AppRoutes from "./components/AppRoutes";
import customHistory from "./customHistory";
import { LocaleProvider } from "./context/localeContext";

const AppRoute = () => {
  return (
    <Router history={customHistory}>
      <LocaleProvider>
        <AppRoutes routes={routes} />
      </LocaleProvider>
    </Router>
  );
};

export default AppRoute;
