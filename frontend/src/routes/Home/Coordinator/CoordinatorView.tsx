import React, { useState } from "react";
import { DateSelector } from "../../../components/DateSelector";
import Table from "../../../components/elements/Table";
import { IRow } from "../../../components/elements/Table/TableBody";
import { CoordinatorActions } from "./CoordinatorActions";
import { header, prepareDataToTable, fakeData } from "../fakeData";
import SideMenu from "../Menu/SideMenu";
import UserPanel from "../UserPanel";
import { Outlet } from "react-router-dom";


interface ICoordinatorViewProps {
  data?: IRow | IRow[];
}


const CoordinatorView = (props: ICoordinatorViewProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuToggle = () => {
    console.log("click menu");
    setMenuOpen(menuOpen ? false : true);
  };

  const menuClose = () => {
    setMenuOpen(false);
  };

  return (
    <div className="w-full h-screen">
      <div className="grid print:grid-cols-1 gird-cols-1 md:grid-cols-6 h-full">
        <SideMenu open={menuOpen} handleClose={menuClose}>
          <CoordinatorActions />
        </SideMenu>
        <div className="w-full max-h-screen col-span-5 grid auto-rows-min">
          <UserPanel handleMenuClick={menuToggle} />
          <div className="h-[calc(100vh_-_5rem)] overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorView;
