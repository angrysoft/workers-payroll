import React from "react";
import { CoordinatorActions } from "./CoordinatorActions";
import SideMenu from "../Menu/SideMenu";
import UserPanel from "../UserPanel";
import { Outlet } from "react-router-dom";
import { ErrorDialog } from "../../../components/elements/ErrorDialog";


const CoordinatorView = () => {
  return (
    <div className="w-full h-screen">
      <div className="grid print:grid-cols-1 gird-cols-1 lg:grid-cols-6 h-full">
        <SideMenu>
          <CoordinatorActions />
        </SideMenu>
        <div className="w-full max-h-screen col-span-5 grid auto-rows-min">
          <UserPanel/>
          <div className="h-[calc(100vh_-_5rem)] overflow-auto">
            <ErrorDialog />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorView;
