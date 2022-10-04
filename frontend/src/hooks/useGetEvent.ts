import { useEffect, useState } from "react";
import { useGet } from "./useGet";

interface IEvent {
  id: number;
  name: string;
  number: string;
  coordinator: any;
  account_manger: any;
  is_readonly: boolean;
}


const useGetEvent = (eventId: string) => {
  const [event, setEvent] = useState<IEvent>(
      {
        id: -1,
        name: "",
        number: "",
        coordinator: {},
        account_manger: {},
        is_readonly: false,
      },
  );

  const {data, loading} = useGet(
      `/api/v1/event/${eventId}`,
  );

  useEffect(() => {
    if (data && data.results) {
      setEvent({
        ...data.results,
      });
    }
  }, [data]);

  return {event, loading};
};

export { useGetEvent };
