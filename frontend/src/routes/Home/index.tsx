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

  switch (state.user.type) {
    case "worker": {
      actions = <WorkerActions />;
      break;
    }

    case "coordinator": {
      actions = <WorkerActions />;
      break;
    }
  }

  return <UserView>{actions}</UserView>;
};

export default Home;
