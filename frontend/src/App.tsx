import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRequired } from "./routes/AuthRequired";
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
            <AuthRequired>
              <Home />
            </AuthRequired>
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
