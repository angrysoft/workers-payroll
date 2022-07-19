import React, { useContext } from 'react';
import { AppContext } from '../store/store';


const useDispatch = () => {
  const {dispatch} = useContext(AppContext);
  return dispatch;
};

export {useDispatch};
