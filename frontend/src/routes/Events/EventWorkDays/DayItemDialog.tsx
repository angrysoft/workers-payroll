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
import { getDateStringList } from "../../../services/dates";
import { AppContext } from "../../../store/store";
import { IUserItem } from "../../Workers";

interface IDayItemDialogProps {
  children?: JSX.Element | JSX.Element[];
}

const DayItemDialog: React.FC<IDayItemDialogProps> = (
    props: IDayItemDialogProps,
) => {
  const { state, dispatch } = useContext(AppContext);
  const { functionNames, loading } = useGetFunctions();
  const workers = useGetUsers("worker");
  const cancelAdd = (ev: SyntheticEvent) => {
    dispatch({ type: "DAY_ITEM_DIALOG_HIDE" });
  };

  const handleSubmit = (
      ev: SyntheticEvent,
      values: IFormValues,
      options: ISubmitOptions,
  ) => {
    ev.preventDefault();
    const startDay = new Date(state.workDays.selected);
    const [hours, minutes] = values.start.split(":");
    startDay.setHours(Number(hours), Number(minutes));
    const dayData = {
      ...values,
      id: `new-${values.selectedWorker}-${values.start}`,
      start: startDay.toISOString(),
      worker: workers.users
          .filter((item: IUserItem) => {
            return item.id.toString() === values.selectedWorker;
          })
          .at(0),
      function: functionNames
          .filter((item: { id: string; name: string }) => {
            return item.id.toString() === values.function;
          })
          .at(0),
    };
    dispatch({ type: "ADD_WORKER_WORK_DAY", payload: dayData });
  };

  return (
    <Dialog open={state.workDays.dayItemDialogShow}>
      <Form
        handleSubmit={handleSubmit}
        formDefaultValues={{
          start: "09:00",
          end: state.workDays.selected.replace("Z", ""),
        }}
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
