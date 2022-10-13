import React, { useContext } from "react";
import { MaterialIcons } from "../../../components/elements/MaterialIcons";
import { AppContext } from "../../../store/store";

interface SideMenuProps {
  children: JSX.Element | JSX.Element[];
}

const SideMenu: React.FC<SideMenuProps> = (props: SideMenuProps) => {
  const { state, dispatch } = useContext(AppContext);
  let cls =
    "print:hidden h-full bg-gradient-to-b from-indigo-500 to-blue-500 " +
    "fixed lg:relative overflow-x-hidden text-white " +
    "transition-width duration-500 easy-out";
  cls += state.menu.open ? " w-full" : " w-0 lg:w-full";

  const closeIcon = (
    <div
      className="cursor-pointer lg:invisible text-right font-bold"
      onClick={() => dispatch({ type: "MENU_CLOSE" })}
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
                   flex items-center justify-between lg:justify-center"
      >
        <span className="overflow-hidden whitespace-nowrap">
          Workers Payroll
        </span>
        {state.menu.open && closeIcon}
      </div>
      <div className="grid grid-cols-1 py-1">{props.children}</div>
    </div>
  );
};

export default SideMenu;
