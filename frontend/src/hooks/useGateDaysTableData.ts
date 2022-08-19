import { useContext } from "react";
import { IRow } from "../components/elements/Table/TableBody";
import { formatDateTime } from "../services/dates";
import { AppContext } from "../store/store";

export const useGetDaysTableData = () => {
  const {state} = useContext(AppContext);

  const dataTable: Array<IRow> = state.workDays.days.filter((day)=>{
    return (
      new Date(day.start).toLocaleDateString() ===
      new Date(state.workDays.selected).toLocaleDateString());
  }).map((day)=> {
    return {
      id: day.id,
      cells: [
        `${day.worker.first_name}-${day.worker.last_name}`,
        formatDateTime(day.start),
        formatDateTime(day.end),
        day.function.name,
        "",
      ],
    };
  });
  return dataTable;
};
