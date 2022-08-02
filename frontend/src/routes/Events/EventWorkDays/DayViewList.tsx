import React from 'react';
import { useSelector } from '../../../hooks/useSelector';
import { RootState } from '../../../reducers/rootReducer';


const DayViewList:React.FC = () => {
  const days = useSelector((state: RootState)=> state.workDays.days);
  console.log("days", days);
  return (
    <div className=''>Day View</div>
  );
};

export {DayViewList};
