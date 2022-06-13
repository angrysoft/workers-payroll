import { User } from "../store/auth";

interface ILoginResponse {
  error: string;
  ok: boolean;
  token?: string;
  user_id?: number;
  results?: {
    email: string,
    firstName: string,
    lastName: string,
    is_account_manager: boolean,
    is_coordinator: boolean,
    is_superuser: boolean,
  };
}

const login = async (username: string, password: string): Promise<User> => {
  const results: User = {
    username: username,
    type: "unknown",
    is_authenticated: false,
    userId: -1,
  };

  const response = await fetch("/api/v1/user/auth/login",
      {
        method: "POST",
        body: JSON.stringify({username: username, password: password}),
      });
  const data: ILoginResponse = await response.json();
  console.log("data", data);
  if (! data.ok && data.error) {
    results.error = data.error;
  }
  results.type = data.results?.is_coordinator ? "coordinator" : "worker";
  results.is_authenticated = true;
  localStorage.setItem("token", data.token || "");
  return results;
};


const logout = () => {
  return {
    username: "unknown",
    is_authenticated: false,
    type: "unknown",
  };
};


export { login, logout};
