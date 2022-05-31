import React from 'react';
import MaterialIcons from '../../components/elements/MaterialIcons';
import { useAppSelector } from "../../app/hooks";
import { RootState } from '../../app/store';

interface IUserPanelProps {
  handleMenuClick: CallableFunction;
}


const UserPanel = (props: IUserPanelProps) => {
  const user = useAppSelector((state: RootState) => state.auth);

  return (
    <div className='print:hidden w-full text-white
                    bg-gradient-to-r from-indigo-500 to-blue-500
                    h-4 px-1
                    flex justify-between items-center'
    >
      <div
        className='cursor-pointer md:invisible'
        onClick={() => props.handleMenuClick()}
      >
        <MaterialIcons name='menu' />
      </div>
      <div>
        <MaterialIcons name='account_circle' />
        <span>{user.username}</span>
      </div>
    </div>
  );
};

export default UserPanel;
