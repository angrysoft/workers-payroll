import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/elements/Button";
import { InputGroup } from "../../../components/elements/InputGroup";
import Table from "../../../components/elements/Table";
import { AppContext } from "../../../store/store";
import { DayItemDialog } from "./DayItemDialog";

interface IDayViewProps {
  children?: JSX.Element | JSX.Element[];
}

const DayView: React.FC<IDayViewProps> = (props: IDayViewProps) => {
  const { state, dispatch } = useContext(AppContext);
  const [dayData, setDayData] = useState([]);

  useEffect(() => {
    const day = state.workDays.days
        .filter((d) => d.id === state.workDays.selected)
        .at(0);
    day && console.log("day", day);
  }, [state.workDays.selected, state.workDays.days.length]);

  if (state.workDays.days.length === 0) {
    return <></>;
  }

  return (
    <div
      className="grid p-05 rounded-b-lg
                    border border-gray-500 text-gray-600"
    >
      <InputGroup>
        <div className="grid gap-05 md:grid-flow-col">
          <Button
            handleClick={() => dispatch({ type: "DAY_ITEM_DIALOG_SHOW" })}
          >
            Add Worker
          </Button>
          <Button>Remove Worker</Button>
        </div>
      </InputGroup>
      <Table
        id="workDayTable"
        data={dayData}
        header={["Worker", "Start", "End", "Function", "Additions"]}
      />
      <DayItemDialog />
    </div>
  );
};

export { DayView };
