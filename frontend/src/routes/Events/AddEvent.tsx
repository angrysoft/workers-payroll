import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../components/elements/BackButton";
import Button from "../../components/elements/Button";
import { CheckBox } from "../../components/elements/CheckBox";
import {
  Form,
  IFormValues,
  ISubmitOptions as ISubmitOptions,
} from "../../components/elements/Form";
import Input from "../../components/elements/Input";
import { InputGroup } from "../../components/elements/InputGroup";
import Loader from "../../components/Loader";
import { IFetchMethod, useApi } from "../../hooks/useApi";

interface IEventForm {
  values?: object;
  action?: string;
  method?: IFetchMethod;
  requiredFields?: Array<string>;
}

const AddEventForm: React.FC<IEventForm> = (props: IEventForm) => {
  const navigate = useNavigate();
  const { results, loading, error, code, call } = useApi();

  const handleSubmit = (
      ev: SyntheticEvent,
      values: IFormValues,
      options: ISubmitOptions,
  ) => {
    ev.preventDefault();
    call(options.action, {
      method: options.method,
      data: values,
    });
  };

  useEffect(() => {
    if (code === 201 && results && results.results !== undefined) {
      navigate(`/events/1`, { replace: true });
    }
  }, [code, results]);

  return (
    <Form
      handleSubmit={handleSubmit}
      formDefaultValues={props.values}
      requiredFields={props.requiredFields}
      action="/api/v1/event/"
      submitMethod="POST"
    >
      <BackButton backTo="/events/1" title="Add new event"/>
      <InputGroup>
        <Input label="Event name" type="text" id="name" required />
        <Input label="Event number" type="text" id="number" required />
      </InputGroup>
      <InputGroup>{loading ? <Loader /> : <Button>Save</Button>}</InputGroup>
      <span className="text-pink-600 text-center">{error}</span>
    </Form>
  );
};

export { AddEventForm };
