import React from 'react';

type ButtonOutlineProps = {
  id?: string;
  children?: React.ReactNode;
  handleClick?: CallableFunction;
};

const Button = (props: ButtonOutlineProps) => {
  return (
    <button
      className="w-full p-05
               bg-secondary rounded
                 cursor-pointer
                 text-xl font-bold text-center
                 shadow-md hover:shadow-2xl
                 transition-all-500 transition-all duration-500"
      id={props.id}
      onClick={() => props.handleClick && props.handleClick()}
    >
      {props.children}
    </button>
  );
};

export default Button;
