import React, { SyntheticEvent } from "react";
import Button from "./elements/Button";
import Input from "./elements/Input";

interface IDateSelectorProps {
  handleDateChange: CallableFunction;
}

const DateSelector: React.FC<IDateSelectorProps> = (
    props: IDateSelectorProps,
) => {
  const handleSubmit = (ev:SyntheticEvent) => {
    ev.preventDefault();
    const formData = new FormData(ev.target as HTMLFormElement);
    props.handleDateChange(formData.get("month"), formData.get("year"));
  };

  return (
    <form onSubmit={handleSubmit}
      className="grid gap-1 md:grid-cols-3 grid-cols-2 justify-center
                    w-full
                  bg-white p-1 rounded-lg"
    >
      <Input
        id="year"
        label="Year"
        type="number"
        required
        inputArgs={{ defaultValue: "2022" }}
      />
      <Input
        id="month"
        label="Month"
        type="number"
        required
        inputArgs={{ min: "1", max: "12", defaultValue: "1"}}
      />
      <div className="col-span-2 md:col-auto">
        <Button>Change Date</Button>
      </div>
    </form>
  );
};

export { DateSelector };
