import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { FormContext } from "./Form";

interface ICheckBoxProps {
  id: string;
  required?: boolean;
  label: string;
  checked?: boolean;
}

const CheckBox: React.FC<ICheckBoxProps> = (props: ICheckBoxProps) => {
  const form = useContext(FormContext);
  const value = form.getValue(props.id);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3
                    items-center justify-items-start"
    >
      <label htmlFor={props.id} className="font-bold text-gray-500">
        {props.label}:
      </label>
      <input
        type="checkbox"
        id={props.id}
        name={props.id}
        className="md:col-span-2
                   border border-gray-300 rounded
                   focus:outline-0 focus:border-gray-500
                   transition-border duration-500 h-2 w-2"
        required={props.required}
        defaultChecked={value || ""}
        onChange={(ev) => form.setValue(props.id, ev.target.checked)}
      />
    </div>
  );
};

export { CheckBox };
