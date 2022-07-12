import React, { SyntheticEvent } from 'react';


interface IFormProps {
  handleSubmit: CallableFunction;
  children?: JSX.Element | JSX.Element[];
}


const Form:React.FC<IFormProps> = (props:IFormProps) => {
  return (
    <div className="p-1 md:p-2">
      <form
        action=""
        onSubmit={(ev:SyntheticEvent) => props.handleSubmit(ev)}
        className="grid gap-1 grid-cols-1 p-2 bg-white rounded-lg"
      >
        {props.children}
      </form>
    </div>
  );
};

export {Form};
