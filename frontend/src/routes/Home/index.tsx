import React, { useContext } from "react";
import { AppContext } from "../../store/store";
import CoordinatorView from "./Coordinator/CoordinatorView";
import UserView from "./Worker/UserView";

const Home = () => {
  const { state } = useContext(AppContext);

  if (state.users.user.is_coordinator) {
    return (
      <CoordinatorView />
    );
  } else {
    return <UserView />;
  }
};

export default Home;
