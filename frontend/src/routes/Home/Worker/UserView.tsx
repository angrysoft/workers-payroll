import React, { SyntheticEvent, useEffect, useState } from "react";
import { DateSelector } from "../../../components/DateSelector";
import Button from "../../../components/elements/Button";
import {
  Form,
  IFormValues,
  ISubmitOptions,
} from "../../../components/elements/Form";
import Table from "../../../components/elements/Table";
import { IRow } from "../../../components/elements/Table/TableBody";
import Loader from "../../../components/Loader";
import { useGetWorkerReport, header } from "../../../hooks/useGetWorkerReport";
import SideMenu from "../Menu/SideMenu";
import UserPanel from "../UserPanel";
import WorkerActions from "./WorkerActions";

interface IUserViewProps {
  data?: IRow | IRow[];
}


const UserView = (props: IUserViewProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { report, getReport, loading } = useGetWorkerReport();

  const menuToggle = () => {
    console.log("click menu");
    setMenuOpen(menuOpen ? false : true);
  };

  const menuClose = () => {
    setMenuOpen(false);
  };

  const handleSubmit = (
      year: string,
      month: string,
  ) => {
    getReport(year, month);
  };
  console.log("render user view");
  return (
    <div className="w-full h-screen">
      <div className="grid print:grid-cols-1 gird-cols-1 md:grid-cols-6 h-full">
        <SideMenu open={menuOpen} handleClose={menuClose}>
          <WorkerActions />
        </SideMenu>
        <div
          className="w-full max-h-screen
                        col-span-5 grid auto-rows-min
                        overflow-auto print:overflow-visible"
        >
          <UserPanel handleMenuClick={menuToggle} />
          <div className="flex py-05 px-1 print:hidden">
            <DateSelector handleDateChange={handleSubmit} />
          </div>
          <div className="p-2 print:h-full">
            {loading ? (
              <Loader />
            ) : (
              <Table
                header={header}
                data={report}
                id="UserViewTable"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
