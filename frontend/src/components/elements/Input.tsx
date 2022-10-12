import React, { SyntheticEvent, useContext, useEffect, useState} from "react";
import { FormContext } from "./Form";

interface InputProps {
  id: string;
  type: string;
  required?: boolean;
  label: string;
  inputArgs?: any;
  value?: any;
}

const Input = (props: InputProps) => {
  const form = useContext(FormContext);
  const [value, setValue] = useState(form.getValue(props.id));
  const isRequired: boolean = form.isRequired(props.id);

  useEffect(() => {
    setValue(form.getValue(props.id));
  }, [form.getValue]);

  const handleChange = (ev: SyntheticEvent) => {
    const input = ev.target as HTMLSelectElement;
    setValue(input.value);
    form.setValue(
        props.id,
        input.value,
    );
  };

  return (
    <div className="grid gap-05 grid-cols-1 md:grid-cols-3 items-center">
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
        required={isRequired}
        value={value || props.value || ""}
        onChange={handleChange}
        {...props.inputArgs}
      />
    </div>
  );
};

export default Input;
