import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { apiCall } from "../services/request";
import { AppContext } from "../store/store";


const AuthRequired = ({ children }: { children: JSX.Element }) => {
  const { state, dispatch } = useContext(AppContext);
  const location = useLocation();
  const checkAuth = async () => {
    const response = await apiCall("/api/v1/user/auth");
    dispatch({
      type: "USER_AUTH_CHECK",
      isLoading: false,
      payload: response,
    });
  };

  useEffect(() => {
    if (! state.user.is_authenticated) {
      checkAuth();
    }
  }, []);
  console.log('auth required');
  if (state.user.is_authenticated) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export { AuthRequired };
