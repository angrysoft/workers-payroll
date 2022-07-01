import React, { SyntheticEvent } from "react";

export interface IOptions {
  id: string;
  name: string;
}

interface ISelectProps {
  id: string;
  label: string;
  items: Array<IOptions>;
  multiple: boolean;
  required?: boolean;
  handleSelectionChange: CallableFunction;
}

const Select: React.FC<ISelectProps> = (props: ISelectProps) => {
  const optionItems = props.items.map((item) => {
    return (
      <option value={item.id} key={item.id}>
        {item.name.toUpperCase()}
      </option>
    );
  });

  const handleChange = (ev: SyntheticEvent) => {
    const select = ev.target as HTMLSelectElement;
    console.log(
        Array.from(select.selectedOptions)
            .map((el) => el.value)
            .toString(),
    );
    props.handleSelectionChange(
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
        multiple={props.multiple}
        required={props.required}
        onChange={handleChange}
      >
        {optionItems}
      </select>
    </div>
  );
};

export { Select };
