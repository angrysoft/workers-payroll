import React from 'react';

interface InputProps {
  id: string;
  type: string;
  required?: boolean;
  label: string;
}

const Input = (props: InputProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center">
      <label htmlFor={props.id} className="font-bold">
        {props.label}:
      </label>
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        className="md:col-span-2 w-full
                   border-1 border-gray-50 shadow
                   focus:outline-none focus:shadow-lg"
        required={props.required}
      />
    </div>
  );
};

export default Input;
