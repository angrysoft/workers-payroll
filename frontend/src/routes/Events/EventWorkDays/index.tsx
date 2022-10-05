import React, { useContext, useEffect } from "react";
import { ConfirmDialog } from "../../../components/ConfirmDialog";
import { BackButton } from "../../../components/elements/BackButton";
import Button from "../../../components/elements/Button";
import { InputGroup } from "../../../components/elements/InputGroup";
import Loader from "../../../components/Loader";
import { useEventDaysSave } from "../../../hooks/useEventDaysSave";
import { useGetEvent } from "../../../hooks/useGetEvent";
import { useGetEventDays } from "../../../hooks/useGetEventDays";
import { AppContext } from "../../../store/store";
import { AddDayDialog } from "./AddDayDialog";
import { DayViewList } from "./DayViewList";
import { RemoveDayDialog } from "./RemoveDayDialog";

const EventWorkDays: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { days, loading } = useGetEventDays(state.table.eventsTable.selected);
  const event = useGetEvent(state.table.eventsTable.selected);
  const save = useEventDaysSave();

  useEffect(() => {
    dispatch({ type: "CLEAR_WORK_DAYS" });
  }, []);

  useEffect(() => {
    dispatch({
      type: "LOAD_WORK_DAYS",
      payload: {
        ...days,
        event: { ...event.event },
      },
    });
  }, [days, event.event]);

  if (loading || save.loading) {
    return <Loader />;
  }

  return (
    <div className="p-1 md:p-2">
      <div className="grid gap-1 grid-cols-1 p-2 bg-white rounded-lg">
        <BackButton title={event.event.name} backTo="/events/1" />
        <InputGroup>
          <div className="grid gap-05 md:grid-flow-col">
            <Button
              handleClick={() => dispatch({ type: "ADD_DAY_DIALOG_SHOW" })}
            >
              Add Day
            </Button>
            <Button
              handleClick={() => dispatch({ type: "REMOVE_DAY_DIALOG_SHOW" })}
            >
              Remove Day
            </Button>
            <Button
              handleClick={save.call}
              disabled={!state.workDays.touch_days}
            >
              Save
            </Button>
          </div>
        </InputGroup>
        <DayViewList />
        <AddDayDialog />
        <RemoveDayDialog />
        <ConfirmDialog />
      </div>
    </div>
  );
};

export default EventWorkDays;
