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
import { Select } from "../../../components/elements/Select";
import Loader from "../../../components/Loader";
import { useGetFunctions } from "../../../hooks/useGetFunctions";
import { AppContext } from "../../../store/store";

interface IDayItemDialogProps {
  children?: JSX.Element | JSX.Element[];
}

const DayItemDialog: React.FC<IDayItemDialogProps> = (
    props: IDayItemDialogProps,
) => {
  const { state, dispatch } = useContext(AppContext);
  const { functionNames, loading } = useGetFunctions();

  const cancelAdd = (ev: SyntheticEvent) => {
    dispatch({ type: "DAY_ITEM_DIALOG_HIDE" });
  };

  const handleSubmit = (
      ev: SyntheticEvent,
      values: IFormValues,
      options: ISubmitOptions,
  ) => {
    ev.preventDefault();
  };

  return (
    <Dialog open={state.workDays.dayItemDialogShow}>
      <Form
        handleSubmit={handleSubmit}
        formDefaultValues={{start: "09:00"}}
      >
        <BackButton
          title="Day Item"
          backTo="/event/workDays"
          onClick={cancelAdd}
        />
        <InputGroup>
          <Input type="time" label="Start Day Work" id="start" />
          <Input type="datetime-local" label="End Day Work" id="end" />
        </InputGroup>
        <InputGroup>
          {loading ? (
            <Loader />
          ) : (
            <Select id="function" label="Function" items={functionNames} />
          )}
        </InputGroup>
        <Button>Ok</Button>
      </Form>
    </Dialog>
  );
};

export { DayItemDialog };
