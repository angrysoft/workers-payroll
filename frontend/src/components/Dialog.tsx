import React, { useEffect, useState } from "react";

interface IDialogProps {
  open: boolean;
  children?: JSX.Element | JSX.Element[];
}

const Dialog: React.FC<IDialogProps> = (props: IDialogProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  useEffect(()=> {
    setOpen(props.open);
  }, [props.open]);

  if (isOpen) {
    return (
      <div
        className="flex flex-col
                    justify-center justify-items-center items-center
                    fixed top-0 left-0 p-2 w-full h-full z-50
                  bg-[rgba(0,0,0,0.6)]"
      >
        <div className="grid gap-1 grid-cols-1
                        p-1 rounded-lg shadow-lg bg-white"
        >
          {props.children}
        </div>
      </div>
    );
  }
  return <></>;
};

export { Dialog };
