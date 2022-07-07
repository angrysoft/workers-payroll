import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRequired } from "./routes/AuthRequired";
import Home from "./routes/Home";
import { Logout } from "./routes/Logout";
import { Workers } from "./routes/Workers";
import { CreateWorkerForm } from "./routes/Workers/CreateWorkerForm";

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
      >
        <Route path='workers/:pageNo' element={<Workers />} />
        <Route path='add_worker' element={<CreateWorkerForm />} />
      </Route>
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />
      <Route path="/logout" element={<Logout />} />
      <Route path="/test" element={<Loader />} />
    </Routes>
  );
};

export default App;
