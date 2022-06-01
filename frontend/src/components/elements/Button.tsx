import React from 'react';

type ButtonOutlineProps = {
  id?: string;
  children?: React.ReactNode;
  handleClick?: CallableFunction;
};

const Button = (props: ButtonOutlineProps) => {
  return (
    <button
      className="w-full p-05 rounded
                 bg-gradient-to-r from-indigo-500 to-blue-500
                 cursor-pointer
                 text-xl font-bold text-center text-white
                 shadow-md hover:shadow-2xl
                 border border-gray-500
                 transition-all-500 transition-all duration-500"
      id={props.id}
      onClick={() => props.handleClick && props.handleClick()}
    >
      {props.children}
    </button>
  );
};

export default Button;
