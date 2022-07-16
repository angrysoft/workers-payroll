import React, { SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import { BackButton } from "../../components/elements/BackButton";
import { Form, IFormValues } from "../../components/elements/Form";
import { InputGroup } from "../../components/elements/InputGroup";
import { useApi } from "../../hooks/useApi";
import { RateInput } from "./RateInput";

interface IUserRatesForm {
}

const UserRatesForm: React.FC<IUserRatesForm> = (props: IUserRatesForm) => {
  const {workerID} = useParams();
  const { results, error, loading, call } = useApi();

  const handleSubmit = (ev: SyntheticEvent, values: IFormValues) => {
    ev.preventDefault();
    console.log("form submitted", values);
  };

  return (
    <Form handleSubmit={handleSubmit}>
      <div className="">
        <BackButton backTo="/workers/1" />
      </div>
      <InputGroup>
        <RateInput
          id="1"
          name="Technician"
          value={0}
          overtime={0}
          overtime_after={0}
        />
      </InputGroup>
    </Form>
  );
};

export { UserRatesForm };
