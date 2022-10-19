import React, { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader";

import { useGet } from "../../hooks/useGet";
import { AppContext } from "../../store/store";
import { EventForm, IEventFormValues } from "./EventForm";

interface IEditWorkerProps {
  children?: JSX.Element | JSX.Element[];
}

const EditEvent: React.FC<IEditWorkerProps> = (props: IEditWorkerProps) => {
  const [values, setValues] = useState<IEventFormValues>({
    name: "",
    number: "",
    coordinator: "",
    account_manager: "",
  });
  const { state } = useContext(AppContext);
  const eventEditUri = `/api/v1/event/${state.table.eventsTable.selected}`;
  const { code, data, loading } = useGet(eventEditUri);

  useEffect(() => {
    if (code === 200 && data && data.results !== undefined) {
      setValues(data.results);
    }
  }, [code, data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <EventForm
      values={values}
      action={eventEditUri}
      method="PUT"
      requiredFields={["name", "number", "coordinator", "account_manager"]}
      header="Edit event"
    />
  );
};

export { EditEvent };
