import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AppPool } from "./routes/AppPool";
import { AuthRequired } from "./routes/AuthRequired";
import Home from "./routes/Home";
import { Logout } from "./routes/Logout";
import { Workers } from "./routes/Workers";
import { CreateWorkerForm } from "./routes/Workers/CreateWorkerForm";
import { RemoveWorker } from "./routes/Workers/RemoveWorker";
import { UserRatesForm } from "./routes/Workers/UserRatesForm";

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
        <Route path="/" element={<AppPool />} />
        <Route path='workers/'>
          <Route path=":pageNo" element={<Workers />} />
        </Route>
        <Route path="worker/">
          <Route path='add' element={<CreateWorkerForm />} />
          <Route path='remove' element={<RemoveWorker />} />
          <Route path="set_rates/:workerID" element={<UserRatesForm />} />
        </Route>
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
