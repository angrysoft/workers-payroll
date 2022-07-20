import React from "react";

interface IRateInputProps {
  id: string;
  name: string;
  value: number;
  overtime: number;
  overtime_after: number;
  onChange: CallableFunction;
}

const RateInput: React.FC<IRateInputProps> = (props: IRateInputProps) => {
  return (
    <div className="grid gap-1">
      <span className="font-bold text-xl">{props.name}</span>
      <RateFieldInput
        rateID={props.id}
        type="number"
        label="Value"
        id="value"
        value={props.value.toString()}
        handleChange={props.onChange}
      />
      <RateFieldInput
        rateID={props.id}
        type="number"
        label="Overtime value"
        id="overtime"
        value={props.overtime.toString()}
        handleChange={props.onChange}
      />
      <RateFieldInput
        rateID={props.id}
        type="number"
        label="Overtime after"
        id="overtime_after"
        value={props.overtime_after.toString()}
        handleChange={props.onChange}
      />
    </div>
  );
};

interface RateFieldInputProps {
  rateID: string;
  id: string;
  type: string;
  label: string;
  inputArgs?: any;
  value?: any;
  handleChange: CallableFunction;
}

const RateFieldInput = (props: RateFieldInputProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center">
      <label htmlFor={props.id} className="font-bold text-gray-500">
        {props.label}:
      </label>
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        className="md:col-span-2 w-full
                   border border-gray-300 rounded
                   focus:outline-0 focus:border-gray-500
                   transition-border duration-500"
        defaultValue={props.value || ""}
        onChange={(ev) =>
          props.handleChange(props.rateID, props.id, ev.target.value)
        }
        {...props.inputArgs}
      />
    </div>
  );
};

export { RateInput };
