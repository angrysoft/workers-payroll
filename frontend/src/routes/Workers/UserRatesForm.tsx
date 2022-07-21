import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../components/elements/BackButton";
import Button from "../../components/elements/Button";
import { IFormValues } from "../../components/elements/Form";
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
  const [values, setValues] = useState<IFormValues>({});
  const { state } = useContext(AppContext);
  const [rates, setRates] = useState([]);
  const { results, code, error, loading, call } = useApi();
  const ratesRequest = useGet(
      `/api/v1/user/rates/list/${state.table.selected}`,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (
      ratesRequest.code === 200 &&
      ratesRequest.data &&
      ratesRequest.data.results !== undefined
    ) {
      setRates(ratesRequest.data.results);
    }
  }, [ratesRequest.code, ratesRequest.data]);

  const handleChange = (rateId: string, filedName: string, fieldValue: any) => {
    const newValue = { ...values };
    newValue[rateId] === undefined && (newValue[rateId] = {});
    newValue[rateId][filedName] = fieldValue;
    setValues(newValue);
  };

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    console.log("form submitted", values, state.table.selected);
    call(`/api/v1/user/rates/${state.table.selected}`, {
      method: "PUT",
      data: values,
    });
  };

  useEffect(() => {
    if (code === 200) {
      navigate("/workers/1", {replace: true});
    }
  }, [code]);

  if (ratesRequest.loading) {
    return <Loader />;
  }

  return (
    <div className="p-1 md:p-2">
      <form
        onSubmit={handleSubmit}
        className="grid gap-1 grid-cols-1 p-2 bg-white rounded-lg"
      >
        <div className="">
          <BackButton backTo="/workers/1" />
        </div>
        {rates.map((rate: IRate) => {
          return (
            <InputGroup key={rate.id}>
              <RateInput
                id={rate.id}
                name={rate.name}
                value={rate.value}
                overtime={rate.overtime}
                overtime_after={rate.overtime_after}
                onChange={handleChange}
              />
            </InputGroup>
          );
        })}
        {loading ? <Loader /> : <Button>Save</Button>}
      </form>
    </div>
  );
};

export { UserRatesForm };
