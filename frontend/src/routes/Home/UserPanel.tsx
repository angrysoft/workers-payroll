import React, { useContext } from "react";
import {MaterialIcons} from "../../components/elements/MaterialIcons";
import { AppContext } from "../../store/store";

interface IUserPanelProps {
  handleMenuClick: CallableFunction;
}

const UserPanel = (props: IUserPanelProps) => {
  const { state } = useContext(AppContext);

  return (
    <div
      className="print:hidden w-full text-white
                    bg-gradient-to-r from-indigo-500 to-blue-500
                    h-4 px-1
                    flex justify-between items-center"
    >
      <div
        className="cursor-pointer md:invisible"
        onClick={() => props.handleMenuClick()}
      >
        <MaterialIcons name="menu" />
      </div>
      <div className="cursor-pointer">
        <MaterialIcons name="account_circle" />
        <span>{state.users.user.username}</span>
      </div>
    </div>
  );
};

export default UserPanel;
