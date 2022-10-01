import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { Dialog } from "../../../components/Dialog";
import { BackButton } from "../../../components/elements/BackButton";
import Button from "../../../components/elements/Button";
import {
  Form,
  IFormValues,
  ISubmitOptions,
} from "../../../components/elements/Form";
import Input from "../../../components/elements/Input";
import { InputGroup } from "../../../components/elements/InputGroup";
import { Select } from "../../../components/elements/Select";
import Loader from "../../../components/Loader";
import { useGetFunctions } from "../../../hooks/useGetFunctions";
import { useGetUsers } from "../../../hooks/useGetUsers";
import { AppContext } from "../../../store/store";
import { IUserItem } from "../../Workers";
import { IDayItem } from "../../../reducers/workDaysReducer";
import { getTimeStringFromDateString } from "../../../services/dates";

interface IDayItemDialogProps {
  children?: JSX.Element | JSX.Element[];
}

const DayItemDialog: React.FC<IDayItemDialogProps> = (
    props: IDayItemDialogProps,
) => {
  const { state, dispatch } = useContext(AppContext);
  const { functionNames, loading } = useGetFunctions();
  const workers = useGetUsers("worker");
  const [formDefaultValues, setFromDefaultValues] = useState<
    IDayItem | undefined
  >();
  const cancelAdd = (ev: SyntheticEvent) => {
    dispatch({ type: "DAY_ITEM_DIALOG_HIDE" });
  };

  useEffect(() => {
    // TODO end set for local time json and on save set it to UTC
    let values: any = {
      start: "09:00",
      end: state.workDays.selected,
    };
    if (state.workDays.dayItemDialogEdit) {
      const day = state.workDays.days
          .filter(
              (_day) => state.workDays.dayItemDialogEdit === _day.id.toString(),
          )
          .at(0);
      values = {
        ...day,
        start: getTimeStringFromDateString(day?.start),
        end: day?.end || "",
        function: day?.function.id || "",
        selectedWorker: day?.worker.id || "",
      };
    }
    setFromDefaultValues(values);
  }, [state.workDays.dayItemDialogShow]);

  const handleSubmit = (
      ev: SyntheticEvent,
      values: IFormValues,
      options: ISubmitOptions,
  ) => {
    ev.preventDefault();
    const startDay = new Date(state.workDays.selected);
    const [hours, minutes] = values.start.split(":");
    startDay.setHours(Number(hours), Number(minutes));
    console.log(startDay.toISOString());
    const id = state.workDays.dayItemDialogEdit ?
    values.id :
    `new-${values.selectedWorker}-${values.start}`;

    const dayData = {
      ...values,
      id: id,
      start: startDay.toJSON(),
      worker: workers.users
          .filter((item: IUserItem) => {
            return item.id.toString() === values.selectedWorker.toString();
          })
          .at(0),
      function: functionNames
          .filter((item: { id: string; name: string }) => {
            return item.id.toString() === values.function.toString();
          })
          .at(0),
    };
    console.log("day data", workers.users, functionNames, values.selectedWorker, values.function, state.workDays.dayItemDialogEdit);
    // TODO: edit generate error parsing values is wrong when edited
    state.workDays.dayItemDialogEdit ?
    dispatch({ type: "EDIT_WORKER_WORK_DAY", payload: dayData }) :
    dispatch({ type: "ADD_WORKER_WORK_DAY", payload: dayData });
  };

  return (
    <Dialog open={state.workDays.dayItemDialogShow}>
      <Form
        handleSubmit={handleSubmit}
        formDefaultValues={formDefaultValues}
        requiredFields={["start", "end", "selectedWorker", "function"]}
      >
        <BackButton
          title="Day Item"
          backTo="/event/workDays"
          onClick={cancelAdd}
        />
        <InputGroup>
          {workers.loading ? (
            <Loader />
          ) : (
            <Select
              id="selectedWorker"
              label="Workers"
              items={[{ id: "", name: "" }, ...workers.usersName]}
            />
          )}
        </InputGroup>
        <InputGroup>
          <Input type="time" label="Start Day Work" id="start" />
          <Input type="datetime-local" label="End Day Work" id="end" />
        </InputGroup>
        <InputGroup>
          {loading ? (
            <Loader />
          ) : (
            <Select
              id="function"
              label="Function"
              items={[{ id: "", name: "" }, ...functionNames]}
            />
          )}
        </InputGroup>
        <Button>Ok</Button>
      </Form>
    </Dialog>
  );
};

export { DayItemDialog };
