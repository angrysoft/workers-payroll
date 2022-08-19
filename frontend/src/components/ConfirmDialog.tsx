import React, { useContext } from "react";
import { AppContext } from "../store/store";
import { Dialog } from "./Dialog";
import { BackButton } from "./elements/BackButton";
import Button from "./elements/Button";

interface IConfirmDialogProps {
  action: string;
}

const ConfirmDialog: React.FC<IConfirmDialogProps> = (
    props: IConfirmDialogProps,
) => {
  const { state, dispatch } = useContext(AppContext);
  const handleClickOk = () => {
    dispatch({ type: props.action });
  };

  return (
    <Dialog open={state.dialog.show}>
      <div className="p-1 border-b font-bold text-xl">
        {state.confirmDialog.msg}
      </div>
      <div className="grid grid-flow-col auto-cols-min gap-1 justify-center">
        <Button handleClick={handleClickOk}>Ok</Button>
      </div>
    </Dialog>
  );
};

export { ConfirmDialog };
