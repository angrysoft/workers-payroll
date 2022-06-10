import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../store/store";


const AuthRequired = ({ children }: { children: JSX.Element }) => {
  const { state } = useContext(AppContext);
  const location = useLocation();

  if (state.user.is_authenticated) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export { AuthRequired };
