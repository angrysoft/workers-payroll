import React, { useContext, useEffect } from "react";
import { AppContext } from "../../store/store";
import UserView from "./UserView";
import WorkerActions from "./WorkerActions";

const Home = () => {
  const { state } = useContext(AppContext);
  let actions = <></>;
  useEffect(() => {
    console.log("home", state.user);
  }, [state]);

  if (state.user.is_coordinator) {
    actions = <WorkerActions />;
  } else {
    actions = <WorkerActions />;
  }

  return <UserView>{actions}</UserView>;
};

export default Home;
