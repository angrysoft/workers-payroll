import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { Dialog } from "../../../components/Dialog";
import { BackButton } from "../../../components/elements/BackButton";
import Button from "../../../components/elements/Button";
import { AppContext } from "../../../store/store";

interface IRemoveDayDialogProps {
  children?: JSX.Element | JSX.Element[];
}

const RemoveDayDialog: React.FC<IRemoveDayDialogProps> = (
    props: IRemoveDayDialogProps,
) => {
  const { state, dispatch } = useContext(AppContext);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setMsg("Remove Day ?");
  }, [state.workDays.removeDayDialogShow]);

  const cancelAdd = (ev: SyntheticEvent) => {
    dispatch({ type: "REMOVE_DAY_DIALOG_HIDE" });
  };


  const handleClick = (ev: SyntheticEvent) => {
    dispatch({type: "REMOVE_WORK_DAY"});
  };

  return (
    <Dialog open={state.workDays.removeDayDialogShow}>
      <BackButton
        title={msg}
        backTo="/event/workDays"
        onClick={cancelAdd}
      />
      <Button handleClick={handleClick}>Ok</Button>
    </Dialog>
  );
};

export { RemoveDayDialog };
