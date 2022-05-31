import React, { SyntheticEvent } from 'react';
import Button from '../components/elements/Button';
import Input from '../components/elements/Input';
import { useAppDispatch } from '../app/hooks';
import { login } from '../futures/auth';
import { UserState } from '../futures/auth';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (ev: SyntheticEvent) => {
    const form = new FormData(ev.target as HTMLFormElement);
    ev.preventDefault();
    const user: UserState = {
      username: form.get("username")?.toString() || "Seba",
      is_authenticated: true,
      type: "coordinator",
    };

    dispatch(login(user));
    navigate("/", {replace: true});
  };

  return (
    <div className="flex w-full h-screen justify-center items-center p-2">
      <form action=""
        className="p-2 grid gap-1 rounded border border-gray-300 bg-white"
        onSubmit={handleSubmit}>
        <Input id="username" type="text" label="Login" required />
        <Input id="password" type="password" label="Password" required />
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default Login;
