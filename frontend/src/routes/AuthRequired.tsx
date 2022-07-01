import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { apiCall } from "../services/request";
import { AppContext, initialState } from "../store/store";


const AuthRequired = ({ children }: { children: JSX.Element }) => {
  const { state, dispatch } = useContext(AppContext);
  const location = useLocation();
  const checkAuth = async () => {
    const [response, error, code] = await apiCall("/api/v1/user/auth");
    if (code === 401) {
      const value = {};
      Object.assign(value, initialState);
      dispatch({
        type: "USER_AUTH_FAILED",
        isLoading: false,
        payload: value,
      });
    }

    dispatch({
      type: "USER_AUTH_CHECK",
      isLoading: false,
      payload: response,
    });
  };

  useEffect(() => {
    if (! state.users.user.is_authenticated) {
      checkAuth();
    }
  }, []);

  if (state.users.user.is_authenticated) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export { AuthRequired };
