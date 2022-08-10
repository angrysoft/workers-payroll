import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../components/elements/BackButton";
import Button from "../../components/elements/Button";
import { CheckBox } from "../../components/elements/CheckBox";
import { ErrorMsg } from "../../components/elements/ErrorMsg";
import {
  Form,
  IFormValues,
  ISubmitOptions as ISubmitOptions,
} from "../../components/elements/Form";
import Input from "../../components/elements/Input";
import { InputGroup } from "../../components/elements/InputGroup";
import { Select } from "../../components/elements/Select";
import Loader from "../../components/Loader";
import { IFetchMethod, useApi } from "../../hooks/useApi";
import { useGet } from "../../hooks/useGet";
import { IUserItem } from "../Workers";

interface IEventForm {
  values?: IEventFormValues;
  action?: string;
  method?: IFetchMethod;
  requiredFields?: Array<string>;
  header?: string;
}

interface IEventFormValues {
  name: string,
  number: string,
  coordinator: IUserItem | string,
  account_manager: IUserItem | string,
}

const EventForm: React.FC<IEventForm> = (props: IEventForm) => {
  const navigate = useNavigate();
  const { results, loading, error, code, call } = useApi();
  const [coordinatorsList, setCoordinatorList] = useState([]);
  const [accountManagersList, setAccountManagersList] = useState([]);
  const coordinators = useGet(
      "/api/v1/user/list?page=1&account_type=coordinator",
  );

  const accountManager = useGet(
      "/api/v1/user/list?page=1&account_type=account_manager",
  );

  useEffect(() => {
    if (coordinators.data) {
      const coorList = coordinators.data.results.map((el: IUserItem) => {
        return { id: el.id, name: `${el.first_name}-${el.last_name}` };
      });
      coorList.unshift({id: "", name: ""});
      setCoordinatorList(coorList);
    }
  }, [coordinators.data]);

  useEffect(() => {
    if (accountManager.data) {
      const accountList = accountManager.data.results.map((el: IUserItem) => {
        return { id: el.id, name: `${el.first_name}-${el.last_name}` };
      });
      accountList.unshift({id: "-1", name: ""});
      setAccountManagersList(accountList);
    }
  }, [accountManager.data]);

  const handleSubmit = (
      ev: SyntheticEvent,
      values: IFormValues,
      options: ISubmitOptions,
  ) => {
    ev.preventDefault();
    console.log("event values", values);
    call(options.action, {
      method: options.method,
      data: values,
    });
  };

  const getValues = () => {
    const newValues = { ...props.values };
    if (typeof props?.values?.coordinator === "object") {
      newValues.coordinator = props.values.coordinator.id;
    }
    if (typeof props?.values?.account_manager === "object") {
      newValues.account_manager = props.values.account_manager.id;
    }
    return newValues;
  };

  useEffect(() => {
    if (code === 201 && results && results.results !== undefined) {
      navigate(`/events/1`, { replace: true });
    }
  }, [code, results]);

  return (
    <Form
      handleSubmit={handleSubmit}
      formDefaultValues={() => getValues()}
      requiredFields={props.requiredFields}
      action={props.action}
      submitMethod={props.method}
    >
      <BackButton backTo="/events/1" title={props.header} />
      <InputGroup>
        <Input label="Event name" type="text" id="name" />
        <Input label="Event number" type="text" id="number" />
      </InputGroup>
      <InputGroup>
        <Select label="Coordinator" id="coordinator" items={coordinatorsList} />
      </InputGroup>
      <InputGroup>
        <Select
          label="Account Manager"
          id="account_manager"
          items={accountManagersList}
        />
      </InputGroup>
      <InputGroup>
        <CheckBox id="is_readonly" label="Is Readonly Event" />
      </InputGroup>
      <InputGroup>
        {loading ? <Loader /> : <Button>Save</Button>}
      </InputGroup>
      <ErrorMsg error={error} />
    </Form>
  );
};
export { EventForm };
export type {IEventForm, IEventFormValues};

