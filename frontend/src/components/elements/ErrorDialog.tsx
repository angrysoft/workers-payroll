import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../store/store';
import Button from './Button';


const ErrorDialog:React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const handleClickOk = () => {
    dispatch({type: "ERROR_DIALOG_CLOSE"});
    navigate(state.dialog.backTo, { replace: true });
  };

  if (! state.dialog.show) {
    return <></>;
  }

  return (
    <div className="p-2">
      <div className="bg-white grid gap-1 grid-cols-1 p-1 rounded-lg shadow-lg">
        <div className="p-1 border text-red-500 font-bold text-xl">
          {state.dialog.msg}
        </div>
        <div className="grid grid-flow-col auto-cols-min gap-1 justify-center">
          <Button handleClick={handleClickOk}>
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
};

export {ErrorDialog};
