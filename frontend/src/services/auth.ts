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

const login = async (
    username: string,
    password: string,
): Promise<ILoginResponse> => {
  const results: ILoginResponse = {
    error: "",
    ok: true,
    user_id: -1,
  };

  try {
    const response = await fetch("/api/v1/user/auth/login",
        {
          method: "POST",
          body: JSON.stringify({username: username, password: password}),
        });

    if (! response.ok) {
      console.log('fetch response ! ok');
    }
    Object.assign(results, await response.json());
    console.log("data", results);
  } catch (error) {
    console.error(error);
    results.error = "Oops something went wrong";
  }
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
