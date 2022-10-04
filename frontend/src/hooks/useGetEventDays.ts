import { useEffect, useState } from "react";
import { IDayItem } from "../reducers/workDaysReducer";
import { getDateStringList } from "../services/dates";
import { useGet } from "./useGet";

interface IEventWorkData {
  dates: Array<string>;
  days: Array<IDayItem>;
}


const useGetEventDays = (eventId: string) => {
  const [days, setDays] = useState<IEventWorkData>(
      {
        dates: [],
        days: [],
      },
  );

  const {data, loading} = useGet(
      `/api/v1/event/day/${eventId}`,
  );

  useEffect(() => {
    if (data && data.results) {
      setDays({
        dates: getDateStringList(data.results),
        days: data.results,
      });
    }
  }, [data]);

  return {days, loading};
};

export { useGetEventDays };
