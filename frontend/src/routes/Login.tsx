import React, { SyntheticEvent, useContext, useState } from "react";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import { AppContext } from "../store/store";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import {MaterialIcons} from "../components/elements/MaterialIcons";
import Loader from "../components/Loader";
import { Form } from "../components/elements/Form";


const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handelSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    setLoading(true);
    const form = new FormData(ev.target as HTMLFormElement);
    const response = await login(
      form.get("username") as string,
      form.get("password") as string,
    );

    if (response.error) {
      setError(response.error);
      setLoading(false);
      return;
    }

    dispatch({
      type: "USER_LOGGED",
      isLoading: false,
      payload: response,
    });
    navigate("/", { replace: true });
  };

  const showError = () => {
    return (
      <div className="text-red-500 text-center">
        {error && <MaterialIcons name="error" />}
        <span>{error}</span>
      </div>
    );
  };

  if (state.users.user.is_authenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (loading) {
    return (
      <div className="flex w-full h-screen justify-center items-center p-2">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen justify-center items-center p-2">
      <Form handleSubmit={handelSubmit} >
        {showError()}
        <Input id="username" type="text" label="Login" required />
        <Input id="password" type="password" label="Password" required />
        <Button>Login</Button>
      </Form>
    </div>
  );
};

export default Login;
