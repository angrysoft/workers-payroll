import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/auth";
import Home from "./routes/Home";

const Loader = lazy(() => import("./components/Loader"));
const Login = lazy(() => import("./routes/Login"));

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <AuthContext.Provider
              value={{
                user: {
                  username: "Sebastian",
                  is_authenticated: true,
                  type: "worker",
                },
              }}
            >
              <Home />
            </AuthContext.Provider>
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />
      <Route path="/test" element={<Loader />} />
    </Routes>
  );
};

export default App;
