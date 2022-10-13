import React, { useContext } from "react";
import {MaterialIcons} from "../../../components/elements/MaterialIcons";
import { AppContext } from "../../../store/store";

interface IMenuActionProps {
  name: string;
  icon: string;
  handleAction: CallableFunction;
  children?: JSX.Element | JSX.Element[];
}


const MenuAction = (props: IMenuActionProps) => {
  const {dispatch} = useContext(AppContext);

  const handleAction = () => {
    props.handleAction();
    dispatch({type: "MENU_CLOSE"});
  };

  return (
    <div
      className="hover:bg-blue-400 p-05 px-1 transition-background
                 overflow-hidden whitespace-nowrap select-none cursor-pointer"
      onClick={handleAction}
    >
      <MaterialIcons name={props.icon} />
      <span className="font-bold">{props.name}</span>
    </div>
  );
};

export default MenuAction;
