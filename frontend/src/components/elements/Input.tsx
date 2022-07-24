import React, { useContext} from "react";
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
  const value: any = form.getValue(props.id);
  const isRequired: boolean = form.isRequired(props.id);

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
        required={isRequired}
        defaultValue={value || props.value || ""}
        onChange={(ev) => form.setValue(props.id, ev.target.value)}
        {...props.inputArgs}
      />
    </div>
  );
};

export default Input;
