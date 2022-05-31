import React from "react";
import { useAppSelector } from "../../../app/hooks";

interface IRow {
  id: number,
  cells: Array<string>;
  selected?: boolean;
}

interface ITableBodyProps {
  data: Array<IRow>;
}

const TableBody: React.FC<ITableBodyProps> = (props: ITableBodyProps) => {
  const selected = useAppSelector((state) => state.table.selected);

  const rows = props.data.map((row: IRow) => {
    return (
      <Row
        key={row.id}
        id={row.id}
        cells={row.cells}
        selected={selected.includes(row.id.toString())}
      />
    );
  });

  return (
    <tbody className="overflow-auto">
      {rows}
    </tbody>
  );
};


const Row: React.FC<IRow> = (props: IRow) => {
  let cls = "border-b border-b-gray-100";
  if (props.selected) {
    cls += " selected";
  }
  console.log(props.selected, props.selected ? " selected" : "");
  return (
    <tr className={cls} data-id={props.id.toString()}>
      {props.cells.map((cell: string, index:number) => {
        return <td className="p-1" key={index}>{cell}</td>;
      })}
    </tr>
  );
};

export {TableBody};
export type {IRow, ITableBodyProps};
