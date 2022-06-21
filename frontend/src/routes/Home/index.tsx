import React, { useContext, useEffect } from "react";
import { AppContext } from "../../store/store";
import CoordinatorView from "./Coordinator/CoordinatorView";
import UserView from "./Worker/UserView";
import WorkerActions from "./Worker/WorkerActions";

const Home = () => {
  const { state } = useContext(AppContext);
  useEffect(() => {
    console.log("home", state.user);
  }, [state]);

  if (state.user.is_coordinator) {
    return (
      <CoordinatorView />
    );
  } else {
    return <UserView />;
  }
};

export default Home;
