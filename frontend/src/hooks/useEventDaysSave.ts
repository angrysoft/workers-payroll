import { useContext, useEffect } from "react";
import { AppContext } from "../store/store";
import { useApi } from "./useApi";

const useEventDaysSave = () => {
  const {state, dispatch} = useContext(AppContext);
  const api = useApi();
  const error = api.error;
  const loading = api.loading;

  useEffect(() => {
    if (api.loading === false && api.code === 201) {
      dispatch({type: "SAVED_WORK_DAYS", payload: {touch_days: false}});
    }
  }, [api.loading]);

  const call = () => {
    if (! state.workDays.touch_days) {
      console.log("Nothing to save");
      return;
    }

    const dataBatch = {
      days: state.workDays.days.filter((el) => {
        return state.workDays.daysEdited.includes(el.id);
      }).map((day) => {
        return {
          ...day,
          worker: day.worker.id,
          function: day.function.id,
          event: day.event.id,
        };
      }),
      daysIdToRemove: state.workDays.daysToRemove.filter((el) => {
        return el.id > 0;
      }).map((day) => day.id),
    };

    api.call("/api/v1/event/day_batch", {method: "PUT", data: dataBatch});
  };

  return {call, loading, error};
};

export {useEventDaysSave};
