import React from "react";
import MaterialIcons from "../../components/elements/MaterialIcons";

interface IMenuActionProps {
  name: string;
  icon: string;
  handleAction: CallableFunction;
  children?: JSX.Element | JSX.Element[];
}

const MenuAction = (props: IMenuActionProps) => {
  return (
    <div
      className="hover:bg-blue-400 p-05 px-1 transition cursor-pointer
                 overflow-hidden whitespace-nowrap"
      onClick={() => props.handleAction()}
    >
      <MaterialIcons name={props.icon} />
      <span className="font-bold">{props.name}</span>
    </div>
  );
};

export default MenuAction;
