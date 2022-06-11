const login = (username: string, password: string) => {
  const results = {
    username: username,
    type: "coordinator",
    is_authenticated: true,
  };
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
