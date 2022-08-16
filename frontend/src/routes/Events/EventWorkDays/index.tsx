import React, { useContext, useEffect } from "react";
import Button from "../../../components/elements/Button";
import { InputGroup } from "../../../components/elements/InputGroup";
import Loader from "../../../components/Loader";
import { useGetEvent } from "../../../hooks/useGetEvent";
import { AppContext } from "../../../store/store";
import { AddDayDialog } from "./AddDayDialog";
import { DayViewList } from "./DayViewList";
import { RemoveDayDialog } from "./RemoveDayDialog";


const EventWorkDays: React.FC = () => {
  const {state, dispatch} = useContext(AppContext);
  const {events, loading} = useGetEvent(state.table.eventsTable.selected);

  useEffect(() => {
    dispatch({ type: "CLEAR_WORK_DAYS" });
  }, []);

  useEffect(() => {
    dispatch({type: "LOAD_WORK_DAYS", payload: events});
  }, [events]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-1 md:p-2">
      <div className="grid gap-1 grid-cols-1 p-2 bg-white rounded-lg">
        <h2 className="text-gray-500 font-bold">Event Name</h2>
        <InputGroup>
          <div className="grid gap-05 md:grid-flow-col">
            <Button
              handleClick={() => dispatch({ type: "ADD_DAY_DIALOG_SHOW" })}
            >
              Add Day
            </Button>
            <Button handleClick={()=> console.log('duplicate day')}
            >
              Duplicate Day
            </Button>
            <Button
              handleClick={() => dispatch({ type: "REMOVE_DAY_DIALOG_SHOW" })}
            >
              Remove Day
            </Button>
            <Button>Save</Button>
          </div>
        </InputGroup>
        <DayViewList />
        <AddDayDialog />
        <RemoveDayDialog />
      </div>
    </div>
  );
};

export default EventWorkDays;
