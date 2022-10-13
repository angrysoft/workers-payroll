import React from "react";
import { DateSelector } from "../../../components/DateSelector";
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
  const { report, getReport, loading } = useGetWorkerReport();

  const handleSubmit = (
      year: string,
      month: string,
  ) => {
    getReport(year, month);
  };

  return (
    <div className="w-full h-screen">
      <div className="grid print:grid-cols-1 gird-cols-1 lg:grid-cols-6 h-full">
        <SideMenu>
          <WorkerActions />
        </SideMenu>
        <div
          className="w-full max-h-screen col-span-5
                     grid auto-rows-min"
        > 
          <UserPanel />
          <div className="grid auto-rows-min
                          h-[calc(100vh_-_5rem)] w-full
                          overflow-auto print:overflow-visible">
            <div className="flex py-05 px-1 print:hidden">
              <DateSelector handleDateChange={handleSubmit} />
            </div>
            <div className="p-2 print:h-full overflow-auto">
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
    </div>
  );
};

export default UserView;
