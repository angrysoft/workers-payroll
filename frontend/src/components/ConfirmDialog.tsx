import React, { useContext } from "react";
import { AppContext } from "../store/store";
import { Dialog } from "./Dialog";
import { BackButton } from "./elements/BackButton";
import Button from "./elements/Button";

const ConfirmDialog: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const handleClickOk = () => {
    dispatch({
      type: state.confirmDialog.command,
      payload: state.confirmDialog.payload,
    });
    dispatch({ type: "CONFIRM_DIALOG_HIDE" });
  };

  return (
    <Dialog open={state.confirmDialog.show}>
      <BackButton
        title="Confirm"
        onClick={() => dispatch({ type: "CONFIRM_DIALOG_HIDE" })}
        backTo=""
      />
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
