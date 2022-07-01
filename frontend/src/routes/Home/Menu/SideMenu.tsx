import React from "react";
import {MaterialIcons} from "../../../components/elements/MaterialIcons";

interface SideMenuProps {
  open: boolean;
  handleClose: CallableFunction;
  children: JSX.Element | JSX.Element[];
}

const SideMenu: React.FC<SideMenuProps> = (props: SideMenuProps) => {
  let cls =
    "print:hidden h-full bg-gradient-to-b from-indigo-500 to-blue-500 " +
    "fixed md:relative overflow-x-hidden text-white " +
    "transition-width duration-500 easy-out";
  cls += props.open ? " w-full" : " w-0 md:w-full";

  const closeIcon = (
    <div
      className="cursor-pointer md:invisible text-right font-bold"
      onClick={() => props.handleClose()}
    >
      <MaterialIcons name="close" />
    </div>
  );

  return (
    <div className={cls}>
      <div
        className="font-bold text-xl text-center
                   h-4 px-1
                   border-b border-gray-300
                   flex items-center justify-between md:justify-center"
      >
        <span className="overflow-hidden whitespace-nowrap">
          Workers Payroll
        </span>
        { props.open && closeIcon}
      </div>
      <div className="grid grid-cols-1 py-1">{props.children}</div>
    </div>
  );
};

export default SideMenu;
