import React, { SyntheticEvent } from "react";
import { IRow, TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { useAppDispatch } from '../../../app/hooks';
import { setSelect } from '../../../futures/table';


interface TableProps {
  header?: string[];
  data: Array<IRow>;
  children?: JSX.Element | JSX.Element[];
}


const Table = (props: TableProps) => {
  const dispatch = useAppDispatch();
  const handleTableClick = (ev: SyntheticEvent) => {
    const el = ev.target as HTMLElement;
    const nev = ev.nativeEvent as MouseEvent;
    if (el.tagName === "TD") {
      dispatch(setSelect(el.parentElement?.dataset["id"]));
      console.log(el.parentElement?.dataset["id"]);
    }
  };

  return (
    <div
      className="overflow-auto
                 print:p-0 p-1 w-full h-full"
    >
      <table
        className="w-full shadow-xl rounded-xl print:shadow-none
                  text-sm text-left text-gray-500
                  bg-white overflow-hidden"
        onClick={handleTableClick}
      >
        <TableHeader names={props.header} />
        <TableBody data={props.data} />
      </table>
    </div>
  );
};

export default Table;
