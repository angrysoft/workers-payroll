import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../components/elements/BackButton";
import Button from "../../components/elements/Button";
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
  values?: object;
  action?: string;
  method?: IFetchMethod;
  requiredFields?: Array<string>;
}

const AddEventForm: React.FC<IEventForm> = (props: IEventForm) => {
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
      const coorList = coordinators.data.results.map((el: IUserItem)=> {
        return {id: el.id, name: `${el.first_name}-${el.last_name}`};
      });
      setCoordinatorList(coorList);
    }
  }, [coordinators.data]);

  useEffect(() => {
    if (accountManager.data) {
      const accountList = accountManager.data.results.map((el: IUserItem)=> {
        return {id: el.id, name: `${el.first_name}-${el.last_name}`};
      });
      setAccountManagersList(accountList);
    }
  }, [accountManager.data]);


  const handleSubmit = (
      ev: SyntheticEvent,
      values: IFormValues,
      options: ISubmitOptions,
  ) => {
    ev.preventDefault();
    console.log("values", values);
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
      requiredFields={["name", "number", "coordinator", "account_manager"]}
      action="/api/v1/event/"
      submitMethod="POST"
    >
      <BackButton backTo="/events/1" title="Add new event" />
      <InputGroup>
        <Input label="Event name" type="text" id="name" />
        <Input label="Event number" type="text" id="number" />
      </InputGroup>
      <InputGroup>
        <Select
          label="Coordinator"
          id="coordinator"
          items={coordinatorsList}
        />
      </InputGroup>
      <InputGroup>
        <Select
          label="Account Manager"
          id="account_manager"
          items={accountManagersList}
        />
      </InputGroup>
      <InputGroup>{loading ? <Loader /> : <Button>Save</Button>}</InputGroup>
      <span className="text-pink-600 text-center">{error}</span>
    </Form>
  );
};

export { AddEventForm };
