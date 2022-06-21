import React, { useContext, useEffect } from "react";
import { AppContext } from "../../store/store";
import UserView from "./UserView";
import WorkerActions from "./WorkerActions";

const Home = () => {
  const { state } = useContext(AppContext);
  useEffect(() => {
    console.log("home", state.user);
  }, [state]);

  if (state.user.is_coordinator) {
    return <UserView />;
  } else {
    return <UserView />;
  }
};

export default Home;
