import React, { useState } from "react";
import Table from "../../components/elements/Table";
import { IRow } from "../../components/elements/Table/TableBody";
import { header, prepareDataToTable, fakeData } from "./fakeData";
import SideMenu from "./SideMenu";
import UserPanel from "./UserPanel";


interface IUserViewProps {
  children: JSX.Element | JSX.Element[];
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
          {props.children}
        </SideMenu>
        <div className="w-full max-h-screen col-span-5 grid auto-rows-min">
          <UserPanel handleMenuClick={menuToggle} />
          <div className="h-[calc(100vh_-_5rem)] print:h-full overflow-auto">
            <Table header={header} data={prepareDataToTable(fakeData)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
