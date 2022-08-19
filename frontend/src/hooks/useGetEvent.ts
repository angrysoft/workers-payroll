import { useEffect, useState } from "react";
import { IDayItem } from "../reducers/workDaysReducer";
import { getDateStringList } from "../services/dates";
import { useGet } from "./useGet";

interface IEventWorkData {
  event_id: string;
  event_name: string;
  dates: Array<string>;
  days: Array<IDayItem>;
}


const useGetEvent = (eventId: string) => {
  const [events, setEvents] = useState<IEventWorkData>(
      {
        event_id: "",
        event_name: "",
        dates: [],
        days: [],
      },
  );

  const {data, loading} = useGet(
      `/api/v1/event/day/${eventId}`,
  );

  useEffect(() => {
    if (data && data.results) {
      // eslint-disable-next-line max-len
      const eventName = (`${data.results.at(0).event.number}-${data.results.at(0).event.name}`);
      setEvents({
        event_id: eventId,
        event_name: eventName,
        dates: getDateStringList(data.results),
        days: data.results,
      });
    }
  }, [data]);

  return {events, loading};
};

export { useGetEvent };
