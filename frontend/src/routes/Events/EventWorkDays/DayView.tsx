import React, { useContext } from "react";
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

  if (state.workDays.dates.length === 0) {
    return <></>;
  }

  const removeWorker = () => {
    let msg = "Delete Worker ?";
    let command = "REMOVE_WORKER";
    const workDayId = state.table.workDayTable.selected;
    if (! workDayId) {
      msg = "Select Worker First";
      command = "CONFIRM_DIALOG_HIDE";
    }

    dispatch({ type: "CONFIRM_DIALOG_SHOW", payload: {
      msg: msg,
      command: command,
      payload: workDayId,
    } });
  };

  const editWorker = () => {
    const workDayId = state.table.workDayTable.selected;
    if (! workDayId) {
      dispatch({ type: "CONFIRM_DIALOG_SHOW", payload: {
        msg: "Select Worker First",
        command: "CONFIRM_DIALOG_HIDE",
        payload: workDayId,
      } });
      return;
    };
    dispatch({ type: "DAY_ITEM_DIALOG_SHOW", payload: workDayId });
  };

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
          <Button
            handleClick={editWorker}
          >
            Edit Worker
          </Button>
          <Button
            handleClick={removeWorker}
          >
            Remove Worker
          </Button>
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
