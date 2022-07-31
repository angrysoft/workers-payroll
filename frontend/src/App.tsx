import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AppPool } from "./routes/AppPool";
import { AuthRequired } from "./routes/AuthRequired";
import { Events } from "./routes/Events";
import { AddEvent } from "./routes/Events/AddEvent";
import { RemoveEvent } from "./routes/Events/RemoveEvent";
import { EditEvent } from "./routes/Events/EditEvent";
import {EventWorkDays} from "./routes/Events/EventWorkDays";
import Home from "./routes/Home";
import { Logout } from "./routes/Logout";
import { Workers } from "./routes/Workers";
import { CreateWorkerForm } from "./routes/Workers/CreateWorkerForm";
import { EditWorker } from "./routes/Workers/EditWorker";
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
        <Route path="/events/">
          <Route path=":pageNo" element={<Events />} />
        </Route>
        <Route path="event/">
          <Route path="add" element={<AddEvent />} />
          <Route path="remove" element={<RemoveEvent />} />
          <Route path="edit" element={<EditEvent />} />
          <Route path="workDays" element={<EventWorkDays />} />
        </Route>
        <Route path="workers/">
          <Route path=":pageNo" element={<Workers />} />
        </Route>
        <Route path="worker/">
          <Route path="add" element={<CreateWorkerForm />} />
          <Route path="remove" element={<RemoveWorker />} />
          <Route path="edit" element={<EditWorker />} />
          <Route path="rates" element={<UserRatesForm />} />
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
