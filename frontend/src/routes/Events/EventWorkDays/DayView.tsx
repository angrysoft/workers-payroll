import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/elements/Button";
import { InputGroup } from "../../../components/elements/InputGroup";
import Table from "../../../components/elements/Table";
import { useGetDaysTableData } from "../../../hooks/useGateDaysTableData";
import { AppContext } from "../../../store/store";
import { DayItemDialog } from "./DayItemDialog";

interface IDayViewProps {
  children?: JSX.Element | JSX.Element[];
}

const DayView: React.FC<IDayViewProps> = (props: IDayViewProps) => {
  const { state, dispatch } = useContext(AppContext);
  const daysTableData = useGetDaysTableData();

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
        data={daysTableData}
        header={["Worker", "Start", "End", "Function", "Additions"]}
      />
      <DayItemDialog />
    </div>
  );
};

export { DayView };
