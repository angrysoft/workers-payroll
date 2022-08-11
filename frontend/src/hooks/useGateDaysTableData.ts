import { useContext } from "react";
import { IRow } from "../components/elements/Table/TableBody";
import { AppContext } from "../store/store";

export const useGetDaysTableData = () => {
  const {state} = useContext(AppContext);

  const dataTable: Array<IRow> = state.workDays.days.filter((day)=>{
    return new Date(day.start).toLocaleDateString() === state.workDays.selected;
  }).map((day)=> {
    return {
      id: Number(day.id),
      cells: [
        `${day.worker.first_name}-${day.worker.last_name}`,
        day.start,
        day.end,
        day.function.name,
        "",
      ],
    };
  });
  return dataTable;
};
