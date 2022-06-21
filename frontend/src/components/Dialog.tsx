import React, { useState } from 'react';


interface IDialogProps {

  children?: JSX.Element | JSX.Element[];
}


const Dialog:React.FC<IDialogProps> = (props:IDialogProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  if (isOpen) {
    return (
      <div className='w-full h-full fixed z-10 bg-black'>
        <div className='p-1 bg-white'>
          {props.children}
        </div>
      </div>
    );
  }
  return <></>;
};

export {Dialog};
