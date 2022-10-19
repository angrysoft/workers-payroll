import React, {
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormContext } from "./Form";

interface ICheckBoxProps {
  id: string;
  required?: boolean;
  label: string;
  checked?: boolean;
}

const CheckBox: React.FC<ICheckBoxProps> = (props: ICheckBoxProps) => {
  const form = useContext(FormContext);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(form.getValue(props.id));
  }, [form.getValue]);

  const handleChange = (ev: SyntheticEvent) => {
    setChecked(! checked);
    const checkbox: HTMLInputElement = ev.target as HTMLInputElement;
    form.setValue(props.id, checkbox.checked);
  };

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
        checked={checked || false}
        onChange={handleChange}
      />
    </div>
  );
};

export { CheckBox };
