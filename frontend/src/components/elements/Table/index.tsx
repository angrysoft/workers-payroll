import React from "react";
import { IRow, TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

interface TableProps {
  header?: string[];
  data: Array<IRow>;
  children?: JSX.Element | JSX.Element[];
}

const Table = (props: TableProps) => {
  return (
    <div
      className="overflow-auto
                 print:p-0 p-1 w-full h-full"
    >
      <table
        className="w-full shadow-xl rounded-xl print:shadow-none
                  text-sm text-left text-gray-500
                  bg-white overflow-hidden"
      >
        <TableHeader names={props.header} />
        <TableBody data={props.data} />
      </table>
      <div>
        {props.children}
      </div>
    </div>
  );
};

export default Table;
