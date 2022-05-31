import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import CoordinatorActions from "./CoordinatorActions";
import UserView from "./UserView";
import WorkerActions from "./WorkerActions";

const Home = () => {
  const user = useAppSelector((state) => state.auth);
  const location = useLocation();
  let actions = <></>;
  console.log("wtf", user.type);
  switch (user.type) {
    case "worker": {
      actions = <WorkerActions />;
      break;
    }

    case "coordinator": {
      actions = <CoordinatorActions />;
      break;
    }

    default:
      return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <UserView>
      {actions}
    </UserView>
  );
};

export default Home;
