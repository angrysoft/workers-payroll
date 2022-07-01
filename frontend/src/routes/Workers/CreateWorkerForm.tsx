import React, { SyntheticEvent, useEffect, useState } from "react";
import { BackButton } from "../../components/elements/BackButton";
import Button from "../../components/elements/Button";
import { CheckBox } from "../../components/elements/CheckBox";
import Input from "../../components/elements/Input";
import { InputGroup } from "../../components/elements/InputGroup";
import { IOptions, Select } from "../../components/elements/Select";
import { useApi } from "../../hooks/useApi";
import { useGet } from "../../hooks/useGet";

interface IPostDataObj {
  [key: string]: any
}

const CreateWorkerForm: React.FC = () => {
  const [functionNames, setFunctionNames] = useState<Array<IOptions>>([]);
  const [selectedFunctionNames, setSelectedFunctionNames] = useState<
    Array<string>
  >([]);
  const [passwdError, setPasswdError] = useState<string>("");
  const { data, loading, error } = useGet("/api/v1/event/functions");
  const { results, call } = useApi();

  useEffect(() => {
    console.log("useApi from Create", data, loading, error);
    data && setFunctionNames(data.results);
  }, [data]);

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
    console.log(postDataObj, typeof postDataObj );

    call("/api/v1/user/", {
      method: "POST",
      data: postDataObj,
    });
    console.log(results);
  };

  return (
    <div className="p-1 md:p-2">
      <div>{results}</div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="grid gap-1 grid-cols-1 p-2 bg-white rounded-lg"
      >
        <div className="">
          <BackButton backTo="/workers" />
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
          <Select
            label="Functions"
            id="functions"
            items={functionNames}
            multiple
            handleSelectionChange={setSelectedFunctionNames}
          />
        </InputGroup>
        <InputGroup>
          <CheckBox label="Coordinator" id="is_coordinator" checked={false} />
        </InputGroup>
        <InputGroup>
          <Button>Save</Button>
        </InputGroup>
      </form>
    </div>
  );
};

export { CreateWorkerForm };
