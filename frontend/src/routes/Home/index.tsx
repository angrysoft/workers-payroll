import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../store/auth";
import UserView from "./UserView";
import WorkerActions from "./WorkerActions";

const Home = () => {
  const ctx = useContext(AuthContext);
  const location = useLocation();
  let actions = <></>;

  switch (ctx.user.type) {
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

  return (
    <UserView>
      {actions}
    </UserView>
  );
};

export default Home;
