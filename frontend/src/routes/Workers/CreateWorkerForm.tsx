import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../components/elements/BackButton";
import Button from "../../components/elements/Button";
import { CheckBox } from "../../components/elements/CheckBox";
import { Form } from "../../components/elements/Form";
import Input from "../../components/elements/Input";
import { InputGroup } from "../../components/elements/InputGroup";
import { IOptions, Select } from "../../components/elements/Select";
import Loader from "../../components/Loader";
import { useApi } from "../../hooks/useApi";
import { useGet } from "../../hooks/useGet";

interface IPostDataObj {
  [key: string]: any;
}

interface IFunctionSelector {
  handleFunctionSelection: CallableFunction;
}

const FunctionSelector: React.FC<IFunctionSelector> = (
    props: IFunctionSelector,
) => {
  const [functionNames, setFunctionNames] = useState<Array<IOptions>>([]);
  const { results, loading, error } = useGet("/api/v1/event/functions");

  useEffect(() => {
    console.log("useApi from Create", results, loading, error);
    results && setFunctionNames(results.results);
  }, [results]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Select
      label="Functions"
      id="functions"
      items={functionNames}
      multiple
      handleSelectionChange={props.handleFunctionSelection}
    />
  );
};

const CreateWorkerForm: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFunctionNames, setSelectedFunctionNames] = useState<
    Array<string>
  >([]);
  const [passwdError, setPasswdError] = useState<string>("");
  const { results, loading, error, code, call } = useApi();

  const handleSubmit = (ev: SyntheticEvent) => {
    setPasswdError("");
    ev.preventDefault();
    const postData = new FormData(ev.target as HTMLFormElement);
    if (postData.get("password") !== postData.get("password2")) {
      setPasswdError("Passwords are different");
      return;
    }
    const postDataObj: IPostDataObj = {};
    Object.assign(postDataObj, Object.fromEntries(postData.entries()));
    postDataObj.functions = selectedFunctionNames;

    call("/api/v1/user/", {
      method: "POST",
      data: postDataObj,
    });
  };

  useEffect(() => {
    if (code === 201 && results.results !== null) {
      console.log("results", results);
      navigate(`/worker/set_rates/${results.results.id}`, {replace: true});
    }
  }, [loading, results]);

  return (
    <Form handleSubmit={handleSubmit}>
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
        <FunctionSelector handleFunctionSelection={setSelectedFunctionNames}/>
      </InputGroup>
      <InputGroup>
        <CheckBox label="Coordinator" id="is_coordinator" checked={false} />
      </InputGroup>
      <InputGroup>
        {loading ? <Loader /> : <Button>Save</Button>}
      </InputGroup>
      <span className="text-pink-600 text-center">{error}</span>
    </Form>
  );
};

export { CreateWorkerForm };
