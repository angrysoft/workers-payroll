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

const SelectMultiple: React.FC<ISelectProps> = (props: ISelectProps) => {
  const form = useContext(FormContext);
  const [selected, setSelected] = useState<Array<string>>([]);

  const optionItems = props.items.map((item) => {
    return (
      <option value={item.id} key={item.id}>
        {item.name.toUpperCase()}
      </option>
    );
  });

  useEffect(() => {
    setSelected(form.getValue(props.id));
  }, [form.getValue]);

  const handleChange = (ev: SyntheticEvent) => {
    const select = ev.target as HTMLSelectElement;
    setSelected(Array.from(select.selectedOptions).map((el) => el.value));

    form.setValue(
        props.id,
        Array.from(select.selectedOptions).map((el) => el.value),
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center">
      <label htmlFor={props.id} className="font-bold text-gray-500">
        {props.label}:
      </label>
      <select
        className="p-05
                   border border-gray-300 rounded
                   focus:outline-0 focus:border-gray-500"
        name={props.label.toLowerCase()}
        id={props.id}
        multiple
        required={props.required}
        value={selected || []}
        onChange={handleChange}
      >
        {optionItems}
      </select>
    </div>
  );
};

export { SelectMultiple };
