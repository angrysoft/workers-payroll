import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../store/store';
import Button from './Button';
import { MaterialIcons } from './MaterialIcons';


const ErrorDialog:React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const handleClickOk = () => {
    dispatch({type: "ERROR_DIALOG_CLOSE"});
    if (state.dialog.backTo) {
      navigate(state.dialog.backTo, { replace: true });
    }
  };

  if (! state.dialog.show) {
    return <></>;
  }

  return (
    <div className="flex flex-col justify-center justify-items-center items-center p-2
                    fixed top-0 left-0 w-full h-full z-50
                  bg-[rgba(0,0,0,0.6)]">
      <div className="bg-white grid gap-1 grid-cols-1 p-1 rounded-lg shadow-lg">
        <div className='p-1 text-center text-red-500'>
          <MaterialIcons name='warning' />
        </div>
        <div className="p-1 border-b font-bold text-xl">
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
