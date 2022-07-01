import React, { useState } from "react";

interface ICheckBoxProps {
  id: string;
  required?: boolean;
  label: string;
  checked?: boolean;
}

const CheckBox: React.FC<ICheckBoxProps> = (props: ICheckBoxProps) => {
  const [checked, setChecked] = useState(props.checked || false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3
                    items-center justify-items-start">
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
        value={checked.toString() || ""}
        onChange={() => setChecked(!checked)}
      />
    </div>
  );
};

export { CheckBox };
