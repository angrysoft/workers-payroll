import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext, initialState } from '../store/store';


interface ILogoutProps {

  children?: JSX.Element | JSX.Element[];
}


const Logout:React.FC<ILogoutProps> = (props:ILogoutProps) => {
  const location = useLocation();
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    const value = {};
    Object.assign(value, initialState);
    dispatch({
      type: "USER_LOGOUT",
      isLoading: false,
      payload: value,
    });
  }, []);

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export {Logout};
