import React, { SyntheticEvent, useEffect, useState } from "react";
import Button from "./elements/Button";
import { Form } from "./elements/Form";
import Input from "./elements/Input";
import { InputGroup } from "./elements/InputGroup";
import { Select } from "./elements/Select";

const MONTH = [
  { id: "", name: "" },
  { id: "1", name: "January" },
  { id: "2", name: "February" },
  { id: "3", name: "March" },
  { id: "4", name: "April" },
  { id: "5", name: "May" },
  { id: "6", name: "June" },
  { id: "7", name: "July" },
  { id: "8", name: "August" },
  { id: "9", name: "September" },
  { id: "10", name: "October" },
  { id: "11", name: "November" },
  { id: "12", name: "December" },
];

interface IDateSelectorProps {
  handleDateChange: CallableFunction;
}

const DateSelector: React.FC<IDateSelectorProps> = (
    props: IDateSelectorProps,
) => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    setDate(new Date());
  }, []);

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const formData = new FormData(ev.target as HTMLFormElement);
    props.handleDateChange(formData.get("month"), formData.get("year"));
    console.log("handleSubmit", formData.get("year"), formData.get("month"));
  };
  console.log(
      "rendered",
      date.getFullYear(),
      date.getMonth(),
  );
  return (
    <Form
      handleSubmit={handleSubmit}
      formDefaultValues={{
        year: date.getFullYear().toString(),
        month: date.getMonth().toString(),
      }}
      requiredFields={["year", "month"]}
    >
      <InputGroup>
        <Input id="year" label="Year" type="number" required />
        <Select id="month" label="Month" items={MONTH} />
      </InputGroup>
      <div className="col-span-2 md:col-auto">
        <Button>Change Date</Button>
      </div>
    </Form>
  );
};

export { DateSelector };
