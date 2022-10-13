import React, { useContext } from "react";
import {MaterialIcons} from "../../components/elements/MaterialIcons";
import { AppContext } from "../../store/store";

interface IUserPanelProps {
}

const UserPanel = (props: IUserPanelProps) => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div
      className="print:hidden w-full text-white
                    bg-gradient-to-r from-indigo-500 to-blue-500
                    h-4 px-1
                    flex justify-between items-center"
    >
      <div
        className="cursor-pointer lg:invisible"
        onClick={() => dispatch({type: "MENU_TOGGLE"})}
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
