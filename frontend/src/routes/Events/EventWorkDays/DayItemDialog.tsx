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
import { IOptions, Select } from "../../../components/elements/Select";
import Loader from "../../../components/Loader";
import { useGetFunctions } from "../../../hooks/useGetFunctions";
import { useGetUsers } from "../../../hooks/useGetUsers";
import { AppContext } from "../../../store/store";
import { IUserItem } from "../../Workers";
import { IDayItem } from "../../../reducers/workDaysReducer";
import {
  getTimeStringFromDateString,
  toLocalJSON,
} from "../../../services/dates";
import { ErrorMsg } from "../../../components/elements/ErrorMsg";

interface IDayItemDialogProps {
  children?: JSX.Element | JSX.Element[];
}

const DayItemDialog: React.FC<IDayItemDialogProps> = (
    props: IDayItemDialogProps,
) => {
  const [errors, setErrors] = useState<string>("");
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
    console.log(
        "to local json",
        toLocalJSON(state.workDays.selected),
        getTimeStringFromDateString(state.workDays.selected),
        state.workDays.selected,
    );

    let values: any = {
      start: "09:00",
      end: toLocalJSON(state.workDays.selected),
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
        end: toLocalJSON(day?.end || ""),
        function: day?.function.id || "",
        selectedWorker: day?.worker.id || "",
      };
    }
    setFromDefaultValues(values);
    setErrors("");
  }, [state.workDays.dayItemDialogShow]);

  const getDayId = (values: IFormValues) => {
    if (state.workDays.dayItemDialogEdit) {
      return values.id;
    }

    const id = new Date(values.end).getTime() - Number(values.selectedWorker);
    console.log(values.end, values.selectedWorker);
    if (id < 0) {
      return id;
    } else {
      return id * -1;
    }
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
      id: getDayId(values),
      start: startDay.toJSON(),
      end: new Date(values.end).toJSON(),
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
    if (!checkDayData(dayData)) {
      return;
    }
    state.workDays.dayItemDialogEdit ?
    dispatch({ type: "EDIT_WORKER_WORK_DAY", payload: dayData }):
    dispatch({ type: "ADD_WORKER_WORK_DAY", payload: dayData });
  };

  const checkDayData = (dayData: {
    id: any;
    start: string;
    end: string;
    worker: undefined;
    function: IOptions | undefined;
  }) => {
    let ret: Boolean = true;
    setErrors("");
    if (new Date(dayData.start).getTime() > new Date(dayData.end).getTime()) {
      setErrors("End date is earlier than start date");
      ret = false;
    }
    // TODO check if worker is in this day (time range).
    return ret;
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
        <ErrorMsg error={errors} />
        <Button>Ok</Button>
      </Form>
    </Dialog>
  );
};

export { DayItemDialog };
