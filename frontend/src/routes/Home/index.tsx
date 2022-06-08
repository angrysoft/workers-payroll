import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../../store/store";
import UserView from "./UserView";
import WorkerActions from "./WorkerActions";

const Home = () => {
  const { state } = useContext(AppContext);
  const location = useLocation();
  let actions = <></>;
  useEffect(() => {
    console.log("home", state.user);
  }, [state]);

  switch (state.user.type) {
    case "worker": {
      actions = <WorkerActions />;
      break;
    }

    case "coordinator": {
      actions = <WorkerActions />;
      break;
    }

    default:
      return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <UserView>{actions}</UserView>;
};

export default Home;
