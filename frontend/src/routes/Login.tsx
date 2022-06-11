import React, { SyntheticEvent, useContext } from "react";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import { AppContext } from "../store/store";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);

  const handelSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const form = new FormData(ev.target as HTMLFormElement);
    const user = login(
      form.get("username") as string,
      form.get("password") as string,
    );
    dispatch({
      type: "USER_LOGGED",
      isLoading: false,
      payload: user,
    });
    navigate("/", { replace: true });
  };

  if (state.user.is_authenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return (
      <div className="flex w-full h-screen justify-center items-center p-2">
        <form
          action=""
          className="p-2 grid gap-1 shadow-md bg-white"
          onSubmit={handelSubmit}
        >
          <Input id="username" type="text" label="Login" required />
          <Input id="password" type="password" label="Password" required />
          <Button>Login</Button>
        </form>
      </div>
    );
  }
};

export default Login;
