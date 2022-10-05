import { useEffect, useState } from "react";
import { IRow } from "../components/elements/Table/TableBody";
import { formatDateTime } from "../services/dates";
import { useApi } from "./useApi";


const useGetWorkerReport = () => {
  const [report, setReport] = useState<IRow[]>([]);
  const [date, setDate] = useState({year: "", month: ""});
  const {call, results, loading} = useApi();

  const getReport = (year: string, month:string) => {
    setDate({year: year, month: month});
  };

  useEffect(() => {
    call(`/api/v1/event/report/${date.year}/${date.month}`, {method: "GET"});
  }, [date]);

  useEffect(()=> {
    if (results && results.results) {
      const data = [];
      let total = 0;
      let totalWorkTime = 0;
      for (const day of results.results) {
        const dayResult: IRow = {
          id: day.id,
          cells: [
            `${day.event.number}-${day.event.name}`,
            formatDateTime(day.start),
            formatDateTime(day.end),
            day.work_time.toString(),
            day.rate.toString(),
            day.overtime_rate.toString(),
            day.additions.toString(),
            day.total.toString(),
          ],
        };
        data.push(dayResult);
        total += day.total;
        totalWorkTime += day.work_time;
      }
      data.push({
        id: -666,
        cells: [
          "SUMARY",
          " ",
          " ",
          totalWorkTime.toString(),
          " ",
          " ",
          " ",
          total.toString(),
        ],
      });
      setReport(data);
    }
  }, [results]);

  return {report, getReport, loading};
};

export { useGetWorkerReport };
