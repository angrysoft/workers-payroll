import React, { useState } from "react";
import { DateSelector } from "../../../components/DateSelector";
import Table from "../../../components/elements/Table";
import { IRow } from "../../../components/elements/Table/TableBody";
import { header, prepareDataToTable, fakeData } from "../fakeData";
import SideMenu from "../Menu/SideMenu";
import UserPanel from "../UserPanel";
import WorkerActions from "./WorkerActions";


interface IUserViewProps {
  data?: IRow | IRow[];
}


const UserView = (props: IUserViewProps) => {
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
          <WorkerActions />
        </SideMenu>
        <div className="w-full max-h-screen col-span-5 grid auto-rows-min">
          <UserPanel handleMenuClick={menuToggle} />
          <div className="flex py-05 px-1 print:hidden">
            <DateSelector handleDateChange={console.log}/>
          </div>
          <div className="h-[calc(100vh_-_5rem)] print:h-full overflow-auto">
            <Table header={header} data={prepareDataToTable(fakeData)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
