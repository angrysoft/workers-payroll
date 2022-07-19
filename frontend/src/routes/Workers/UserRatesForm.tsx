import React, { SyntheticEvent, useContext, useEffect } from "react";
import { BackButton } from "../../components/elements/BackButton";
import { Form, IFormValues } from "../../components/elements/Form";
import { InputGroup } from "../../components/elements/InputGroup";
import Loader from "../../components/Loader";
import { useApi } from "../../hooks/useApi";
import { useGet } from "../../hooks/useGet";
import { AppContext } from "../../store/store";
import { RateInput } from "./RateInput";

interface IUserRatesForm {}

interface IRate {
  id: string;
  name: string;
  value: number;
  overtime: number;
  overtime_after: number;
}

const UserRatesForm: React.FC<IUserRatesForm> = (props: IUserRatesForm) => {
  const { state } = useContext(AppContext);
  const { results, error, loading, call } = useApi();
  const rates = useGet(`/api/v1/user/rates/list/${state.table.selected}`);

  let rateList = <></>;

  useEffect(() => {
    if (rates.code === 200) {
      rateList = rates.results.map((rate: IRate) => {
        return (
          <RateInput
            key={rate.id}
            id={rate.id}
            name={rate.name}
            value={rate.value}
            overtime={rate.overtime}
            overtime_after={rate.overtime_after}
          />
        );
      });
    }
    console.log(rates);
  }, [rates.results]);

  const handleSubmit = (ev: SyntheticEvent, values: IFormValues) => {
    ev.preventDefault();
    console.log("form submitted", values);
  };

  if (rates.loading) {
    return <Loader />;
  }

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
