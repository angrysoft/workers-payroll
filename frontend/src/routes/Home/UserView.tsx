import React from "react";
import MenuItem from "./MenuItem";
import SideMenu from "./SideMenu";
import UserReportView from "./UserReportView";

const UserView = () => {
  return (
    <>
      <SideMenu>
        <MenuItem name="Test" />
      </SideMenu>
      <UserReportView />
    </>
  );
};

export default UserView;
