import React from 'react';


interface IErrorMsgProps {
  error: string;
}

const ErrorMsg:React.FC<IErrorMsgProps> = (props:IErrorMsgProps) => {
  return (
    <span className="text-pink-600 text-center">{props.error}</span>
  );
};

export {ErrorMsg};
