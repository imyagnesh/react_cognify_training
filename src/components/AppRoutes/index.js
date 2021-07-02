import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import NoMatch from "../../pages/NoMatch";

const index = ({ routes }) => {
  return (
    <Switch>
      {routes?.map(({ path, exact, authRequired, routes: childRoutes, component: Component }) => (
        <Route
          key={path}
          exact={!!exact}
          path={path}
          render={renderProps => {
            if (authRequired) {
              const token = sessionStorage.getItem("token");
              if (token) {
                return <Component routes={childRoutes} {...renderProps} />;
              }
              return (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: renderProps.location },
                  }}
                />
              );
            }
            return <Component routes={childRoutes} {...renderProps} />;
          }}
        />
      ))}
      <Route component={NoMatch} />
    </Switch>
  );
};

export default index;
