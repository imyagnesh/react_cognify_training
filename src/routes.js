import Auth from "./pages/Auth";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Main from "./pages/Main";
import Home from "./pages/Main/Home";

const routes = [
  {
    path: "/main",
    component: Main,
    routes: [
      {
        path: "/main",
        component: Home,
      },
    ],
  },
  {
    path: "/",
    component: Auth,
    routes: [
      {
        path: "/register",
        component: Register,
      },
      {
        path: "/",
        component: Login,
      },
    ],
  },
];

export default routes;
