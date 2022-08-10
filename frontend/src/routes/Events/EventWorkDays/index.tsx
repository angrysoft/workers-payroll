import React, { useEffect } from "react";
import Button from "../../../components/elements/Button";
import { InputGroup } from "../../../components/elements/InputGroup";
import { useDispatch } from "../../../hooks/useDispatch";
import { AddDayDialog } from "./AddDayDialog";
import { DayViewList } from "./DayViewList";
import { RemoveDayDialog } from "./RemoveDayDialog";

interface IEventDays {
  days: Array<IEventWorkerDay>;
}

interface IEventWorkerDay {
  event: string;
  function: string;
  worker: string;
  start: Date;
  end: Date;
  additions: Array<any>;
}

const EventWorkDays: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "CLEAR_WORK_DAYS" });
  }, []);

  return (
    <div className="p-1 md:p-2">
      <div className="grid gap-1 grid-cols-1 p-2 bg-white rounded-lg">
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
