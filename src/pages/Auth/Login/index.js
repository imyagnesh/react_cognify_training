import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { LocaleContext } from "../../../context/localeContext";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <TextField label="Username" variant="outlined" />
        </div>
        <div>
          <TextField label="Password" type="password" variant="outlined" />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
