import Button from "../components/elements/Button";
import Input from "../components/elements/Input";

const Login = () => {
    return (
        <div className="flex w-full h-screen justify-center items-center p-2">
            <form action="" className="p-2 grid gap-1 shadow-md bg-white">
                <Input id="username" type="text" label="Login" required />
                <Input id="password" type="password" label="Password" required />
                <Button handleClick={() =>console.log('click')}>
                    Login
                </Button>
            </form>
        </div>
    );
}

export default Login;