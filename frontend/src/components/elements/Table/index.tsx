import React, {
  createContext,
  SyntheticEvent,
  useContext,
  useEffect,
} from "react";
import { AppContext } from "../../../store/store";
import { IRow, TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

interface TableProps {
  header?: string[];
  data: Array<IRow>;
  children?: JSX.Element | JSX.Element[];
  id: string;
}

interface ITableContext {
  tableId: string;
}
const TableContext = createContext<ITableContext>({ tableId: "" });

const Table = (props: TableProps) => {
  const { dispatch } = useContext(AppContext);

  useEffect(
      () =>
        dispatch({
          type: "RESET_TABLE_SELECTION",
          payload: { tableId: props.id },
        }),
      [],
  );

  const handleClick = (ev: SyntheticEvent) => {
    const el = ev.target as HTMLElement;
    if (el.tagName === "TD") {
      const tr = el.parentElement as HTMLElement;
      dispatch({
        type: "SET_TABLE_SELECTION",
        payload: {
          selected: tr.dataset["id"],
          tableId: props.id,
        },
      });
    } else {
      dispatch({ type: "RESET_TABLE_SELECTION", payload: {tableId: props.id }});
    }
  };

  if (!props.data) {
    return <div className="font-bold text-red-500">No record found</div>;
  }

  return (
    <div
      className="overflow-auto
                 print:p-0 p-1 w-full h-full"
      onClick={handleClick}
    >
      <table
        className="w-full shadow-xl rounded-xl print:shadow-none
                  text-sm text-left text-gray-500
                  bg-white overflow-hidden"
      >
        <TableContext.Provider value={{ tableId: props.id }}>
          <TableHeader names={props.header} />
          <TableBody data={props.data} />
        </TableContext.Provider>
      </table>
      <div>{props.children}</div>
    </div>
  );
};

export default Table;
export { TableContext };
