import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { FormContext } from "./Form";

export interface IOptions {
  id: string;
  name: string;
}

interface ISelectProps {
  id: string;
  label: string;
  items: Array<IOptions>;
  required?: boolean;
}

const Select: React.FC<ISelectProps> = (props: ISelectProps) => {
  const form = useContext(FormContext);
  const [selected, setSelected] = useState<string>("");
  const isRequired: boolean = form.isRequired(props.id);

  const optionItems = props.items.map((item) => {
    return (
      <option id={item.id} value={item.id} key={item.id} >
        {item.name}
      </option>
    );
  });

  useEffect(() => {
    const _value = form.getValue(props.id);
    if (_value && optionItems.length > 0) {
      setSelected(_value);
    }
  }, [form.getValue, optionItems]);

  const handleChange = (ev: SyntheticEvent) => {
    const select = ev.target as HTMLSelectElement;
    console.log("select", select.value);
    form.setValue(
        props.id,
        select.value,
    );
    setSelected(select.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center">
      <label htmlFor={props.id} className="font-bold text-gray-500">
        {props.label}:
      </label>
      <select
        className="p-05 bg-gray-100 text-gray-600
                   border border-gray-100 rounded
                   focus:outline-0 focus:border-gray-300"
        name={props.label.toLowerCase()}
        id={props.id}
        value={selected}
        required={isRequired}
        onChange={handleChange}
      >
        {optionItems}
      </select>
    </div>
  );
};

export { Select };
