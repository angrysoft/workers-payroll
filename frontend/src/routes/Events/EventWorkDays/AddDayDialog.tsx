import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { Dialog } from "../../../components/Dialog";
import { BackButton } from "../../../components/elements/BackButton";
import Button from "../../../components/elements/Button";
import { ErrorMsg } from "../../../components/elements/ErrorMsg";
import {
  Form,
  IFormValues,
  ISubmitOptions,
} from "../../../components/elements/Form";
import Input from "../../../components/elements/Input";
import { InputGroup } from "../../../components/elements/InputGroup";
import { AppContext } from "../../../store/store";

interface IAddDayDialogProps {
  children?: JSX.Element | JSX.Element[];
}

const AddDayDialog: React.FC<IAddDayDialogProps> = (
    props: IAddDayDialogProps,
) => {
  const { state, dispatch } = useContext(AppContext);
  const [inputDate, setInputDate] = useState("");
  const [addError, setAddError] = useState("");

  const nextDay = () => {
    setAddError("");
    const date = new Date();
    const lastDay = state.workDays.dates.at(-1);
    if (lastDay) {
      date.setDate(new Date(lastDay).getDate() + 1);
    }
    const year = date.toLocaleString("en-GB", { year: "numeric" });
    const month = date.toLocaleString("en-GB", { month: "2-digit" });
    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    setInputDate(`${year}-${month}-${day}`);
  };

  useEffect(() => {
    nextDay();
  }, [state.workDays.addDayDialogShow]);

  const cancelAdd = (ev: SyntheticEvent) => {
    dispatch({ type: "ADD_DAY_DIALOG_HIDE" });
  };

  const handleSubmit = (
      ev: SyntheticEvent,
      values: IFormValues,
      options: ISubmitOptions,
  ) => {
    ev.preventDefault();
    let dayExist: boolean = false;
    const newDay = new Date(values.start);

    state.workDays.dates.forEach((day) => {
      if (new Date(day).toLocaleDateString() === newDay.toLocaleDateString()) {
        dayExist = true;
      }
    });

    if (dayExist) {
      setAddError(
          // eslint-disable-next-line max-len
          `The date ${newDay.toLocaleDateString()} is already added, changing !`,
      );
      return;
    }

    dispatch({ type: "ADD_WORK_DAY", payload: newDay.toISOString() });
  };

  return (
    <Dialog open={state.workDays.addDayDialogShow}>
      <Form
        handleSubmit={handleSubmit}
        formDefaultValues={{ start: inputDate }}
      >
        <BackButton
          title="Choose Date"
          backTo="/event/workDays"
          onClick={cancelAdd}
        />
        <InputGroup>
          <Input type="date" label="Choose day" id="start" />
        </InputGroup>
        <ErrorMsg error={addError} />
        <Button>Ok</Button>
      </Form>
    </Dialog>
  );
};

export { AddDayDialog };
