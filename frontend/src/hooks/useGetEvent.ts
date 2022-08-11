import { useEffect, useState } from "react";
import { IDayItem } from "../reducers/workDaysReducer";
import { useGet } from "./useGet";

interface IEventWorkData {
  dates: Array<string>;
  days: Array<IDayItem>;
}


const useGetEvent = (eventId: string) => {
  const [events, setEvents] = useState<IEventWorkData>(
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
      const dates: Set<string> = new Set();
      data.results.forEach((day: IDayItem) => {
        dates.add(new Date(day.start).toLocaleDateString());
      });
      console.log(dates);
      setEvents({
        dates: Array.from(dates),
        days: data.results,
      });
    }
  }, [data]);

  return {events, loading};
};

export { useGetEvent };
