import React, { useContext } from 'react';
import { useSelector } from '../../../hooks/useSelector';
import type { RootState } from '../../../reducers/rootReducer';
import { AppContext } from '../../../store/store';


const DayViewList:React.FC = () => {
  // const days = useSelector((state: RootState)=> state.workDays.days);
  const {state} = useContext(AppContext);
  const days = state.workDays.days;
  console.log("days", days);
  return (
    <div className=''>Day View</div>
  );
};

export {DayViewList};
