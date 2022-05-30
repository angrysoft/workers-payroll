import React from "react";

interface IRow {
  id: number,
  cells: Array<string>;
}

interface ITableBodyProps {
  data: Array<IRow>;
}

const TableBody: React.FC<ITableBodyProps> = (props: ITableBodyProps) => {
  const rows = props.data.map((row: IRow) => {
    return <Row key={row.id} id={row.id} cells={row.cells} />;
  });

  return (
    <tbody className="overflow-auto">
      {rows}
    </tbody>
  );
};


const Row: React.FC<IRow> = (props: IRow) => {
  return (
    <tr className="border-b border-b-gray-100" data-id={props.id.toString()}>
      {props.cells.map((cell: string, index:number) => {
        return <td className="p-1" key={index}>{cell}</td>;
      })}
    </tr>
  );
};

export {TableBody};
export type {IRow, ITableBodyProps};
