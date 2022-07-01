import React from 'react';


interface InputGroupProps {

  children?: JSX.Element | JSX.Element[];
}


const InputGroup:React.FC<InputGroupProps> = (props:InputGroupProps) => {
  return (
    <div className='grid gap-1 py-1 border-b border-b-gray-200'>
      {props.children}
    </div>
  );
};

export {InputGroup};
