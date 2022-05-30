import React, { useContext } from 'react';
import MaterialIcons from '../../components/elements/MaterialIcons';
import { AuthContext } from '../../context/auth';


interface IUserPanelProps {
  handleMenuClick: CallableFunction;
}


const UserPanel = (props: IUserPanelProps) => {
  const ctx = useContext(AuthContext);

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
        <span>{ctx.user.username}</span>
      </div>
    </div>
  );
};

export default UserPanel;
