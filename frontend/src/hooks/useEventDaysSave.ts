import { useContext } from "react";
import { AppContext } from "../store/store";
import { useApi } from "./useApi";

const useEventDaysSave = () => {
  const {state} = useContext(AppContext);
  const api = useApi();
  const error = api.error;
  const loading = api.loading;

  const call = () => {
    if (! state.workDays.touch_days) {
      console.log("Nothing to save");
      return;
    }

    const dataBatch = {
      days: state.workDays.days.filter((el) => {
        return state.workDays.daysEdited.includes(el.id);
      }),
      daysToRemove: state.workDays.daysToRemove.filter((el) => {
        return el.id > 0;
      }),
      event_id: Number(state.table.eventsTable.selected),
    };

    console.log("saving data", dataBatch);
    api.call("/api/v1/event/day_batch", {method: "PUT", data: dataBatch});
  };
  return {call, loading, error};
};

export {useEventDaysSave};
