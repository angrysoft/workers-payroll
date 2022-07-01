import React, { SyntheticEvent, useContext, useEffect } from "react";
import { AppContext } from "../../../store/store";

interface IRow {
  id: number;
  cells: Array<string>;
}

interface ITableBodyProps {
  data: Array<IRow>;
}

const TableBody: React.FC<ITableBodyProps> = (props: ITableBodyProps) => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => dispatch("RESET_TABLE_SELECTION"), []);

  const handleClick = (ev: SyntheticEvent) => {
    const el = ev.target as HTMLElement;
    if (el.tagName === "TD") {
      const tr = el.parentElement as HTMLElement;
      dispatch({ type: "SET_TABLE_SELECTION", payload: tr.dataset["id"] });
    }
  };

  const rows = props.data.map((row: IRow) => {
    return (
      <Row
        key={row.id}
        id={row.id}
        cells={row.cells}
      />
    );
  });

  return (
    <tbody className="overflow-auto" onClick={handleClick}>
      {rows}
    </tbody>
  );
};

const Row: React.FC<IRow> = (props: IRow) => {
  const { state } = useContext(AppContext);

  const classes: string = "border-b border-b-gray-100";
  return (
    <tr
      className={
        state.table.selected === props.id.toString() ?
        "border-b border-b-indigo-200 bg-indigo-200 text-black-500" :
        classes
      }
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
