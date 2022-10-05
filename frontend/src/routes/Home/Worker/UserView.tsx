import React, { SyntheticEvent, useEffect, useState } from "react";
import { DateSelector } from "../../../components/DateSelector";
import Button from "../../../components/elements/Button";
import {
  Form,
  IFormValues,
  ISubmitOptions,
} from "../../../components/elements/Form";
import Input from "../../../components/elements/Input";
import { InputGroup } from "../../../components/elements/InputGroup";
import { Select } from "../../../components/elements/Select";
import Table from "../../../components/elements/Table";
import { IRow } from "../../../components/elements/Table/TableBody";
import Loader from "../../../components/Loader";
import { useGetWorkerReport } from "../../../hooks/useGetWorkerReport";
import { header, prepareDataToTable, fakeData } from "../fakeData";
import SideMenu from "../Menu/SideMenu";
import UserPanel from "../UserPanel";
import WorkerActions from "./WorkerActions";

interface IUserViewProps {
  data?: IRow | IRow[];
}

const MONTH = [
  {id: "", name: ""},
  {id: "1", name: "January"},
  {id: "2", name: "February"},
  {id: "3", name: "March"},
  {id: "4", name: "April"},
  {id: "5", name: "May"},
  {id: "6", name: "June"},
  {id: "7", name: "July"},
  {id: "8", name: "August"},
  {id: "9", name: "September"},
  {id: "10", name: "October"},
  {id: "11", name: "November"},
  {id: "12", name: "December"},
];

const UserView = (props: IUserViewProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { report, getReport, loading } = useGetWorkerReport();
  // const {date , setDate}

  // useEffect(() => {
  //   const date = new Date();

  // }, []);
  const menuToggle = () => {
    console.log("click menu");
    setMenuOpen(menuOpen ? false : true);
  };

  const menuClose = () => {
    setMenuOpen(false);
  };

  const handleSubmit = (
      ev: SyntheticEvent,
      values: IFormValues,
      options: ISubmitOptions,
  ) => {
    ev.preventDefault();
    getReport(values.year, values.month);
  };

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
            <Form
              handleSubmit={handleSubmit}
              formDefaultValues={{
                year: 2022,
                month: 1,
              }}
              requiredFields={["year", "month"]}
            >
              <InputGroup>
                <Input
                  id="year"
                  label="Year"
                  type="number"
                  required
                />
                <Select
                  id="month"
                  label="Month"
                  items={MONTH}
                />
              </InputGroup>
              <div className="col-span-2 md:col-auto">
                <Button>Change Date</Button>
              </div>
            </Form>
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
