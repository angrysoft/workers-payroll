import React, { useContext, useEffect, useState } from "react";
import { TableContext } from ".";
import { AppContext } from "../../../store/store";

interface IRow {
  id: number | string;
  cells: Array<any>;
}

interface ITableBodyProps {
  data: Array<IRow>;
}

const TableBody: React.FC<ITableBodyProps> = (props: ITableBodyProps) => {
  const rows = props.data.map((row: IRow) => {
    return <Row key={row.id} id={row.id} cells={row.cells} />;
  });

  return <tbody className="overflow-auto">{rows}</tbody>;
};

const Row: React.FC<IRow> = (props: IRow) => {
  const { state } = useContext(AppContext);
  const table = useContext(TableContext);
  const [classes, setClasses] = useState("");

  useEffect(() => {
    state.table[table.tableId]?.selected === props.id.toString() ?
      setClasses("border-b border-b-indigo-200 bg-indigo-200 text-black-500") :
      setClasses("border-b border-b-gray-100");
  }, [state.table]);

  return (
    <tr
      className={classes}
      data-id={props.id.toString()}
    >
      {props.cells.map((cell: string, index: number) => {
        return (
          <td className="p-1" key={`${props.id}${index}`}>
            {cell}
          </td>
        );
      })}
    </tr>
  );
};

export { TableBody };
export type { IRow, ITableBodyProps };
