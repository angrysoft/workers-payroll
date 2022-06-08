import React from 'react';
import MenuAction from './MenuAction';


const WorkerActions:React.FC = () => {
  const printReport = () => {
    window.print();
  };

  return (
    <>
      <MenuAction name="Print Report" handleAction={printReport} icon="print"/>
    </>
  );
};

export default WorkerActions;
