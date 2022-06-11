import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../store/store";


const AuthRequired = ({ children }: { children: JSX.Element }) => {
  const { state } = useContext(AppContext);
  const location = useLocation();
  console.log("auth required", state, children);
  if (state.user.is_authenticated) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export { AuthRequired };
