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
import {
  IOptions,
  SelectMultiple,
} from "../../components/elements/SelectMultiple";
import Loader from "../../components/Loader";
import { IFetchMethod, useApi } from "../../hooks/useApi";
import { useGet } from "../../hooks/useGet";

const FunctionSelector: React.FC = () => {
  const [functionNames, setFunctionNames] = useState<Array<IOptions>>([]);
  const { data, loading } = useGet("/api/v1/event/functions");

  useEffect(() => {
    data && setFunctionNames(data.results);
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <SelectMultiple label="Functions" id="functions" items={functionNames} />
  );
};

interface IWorkerForm {
  values?: object;
  action?: string;
  method?: IFetchMethod;
  requiredFields?: Array<string>;
}

const WorkerForm: React.FC<IWorkerForm> = (props: IWorkerForm) => {
  const navigate = useNavigate();
  const [passwdError, setPasswdError] = useState<string>("");
  const { results, loading, error, code, call } = useApi();

  const handleSubmit = (
      ev: SyntheticEvent,
      values: IFormValues,
      options: ISubmitOptions,
  ) => {
    setPasswdError("");
    ev.preventDefault();

    if (values.password !== values.password2) {
      setPasswdError("Passwords are different");
      return;
    }
    call(options.action, {
      method: options.method,
      data: values,
    });
  };

  useEffect(() => {
    if (code === 201 && results && results.results !== undefined) {
      navigate(`/workers/1`, { replace: true });
    }
  }, [code, results]);

  return (
    <Form
      handleSubmit={handleSubmit}
      formDefaultValues={props.values}
      requiredFields={props.requiredFields}
      action={props.action}
      submitMethod={props.method}
    >
      <div className="">
        <BackButton backTo="/workers/1" />
      </div>
      <InputGroup>
        <Input label="Username" type="text" id="username" required />
      </InputGroup>
      <InputGroup>
        <Input label="Email" type="email" id="email" required />
        <Input label="First name" type="text" id="first_name" required />
        <Input label="Last name" type="text" id="last_name" required />
      </InputGroup>
      <InputGroup>
        <Input label="Password" type="password" id="password" required />
        <Input
          label="Password confirmation"
          type="password"
          id="password2"
          required
        />
        <span className="text-pink-600 text-center">{passwdError}</span>
      </InputGroup>
      <InputGroup>
        <FunctionSelector />
      </InputGroup>
      <InputGroup>
        <CheckBox label="Coordinator" id="is_coordinator" />
      </InputGroup>
      <InputGroup>{loading ? <Loader /> : <Button>Save</Button>}</InputGroup>
      <span className="text-pink-600 text-center">{error}</span>
    </Form>
  );
};

export { WorkerForm };
