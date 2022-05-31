import React from 'react';
import MenuAction from './MenuAction';


const CoordinatorActions:React.FC = () => {
  const addEvent = () => {
    console.log('addEvent');
  };

  return (
    <>
      <MenuAction
        name="Events"
        handleAction={addEvent}
        icon="edit_note"
      />
      <MenuAction
        name="Workers"
        handleAction={addEvent}
        icon="manage_accounts"
      />
    </>
  );
};

export default CoordinatorActions;
