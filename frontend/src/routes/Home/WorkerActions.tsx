import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuAction from './MenuAction';


const WorkerActions:React.FC = () => {
  const navigate = useNavigate();
  const printReport = () => {
    window.print();
  };

  const logout = () => {
    navigate("/logout", {replace: true});
  };

  return (
    <>
      <MenuAction name="Print Report" handleAction={printReport} icon="print"/>
      <MenuAction name="Logout" handleAction={logout} icon="logout"/>
    </>
  );
};

export default WorkerActions;
