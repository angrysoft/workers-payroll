import React from "react";


interface SideMenuProps {
  children: JSX.Element | JSX.Element[];
}


const SideMenu = (props: SideMenuProps) => {
  return (
    <div className="w-15 h-full bg-secondary">
      {props.children}
    </div>
  );
};

export default SideMenu;
