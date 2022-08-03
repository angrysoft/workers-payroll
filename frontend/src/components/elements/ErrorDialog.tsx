import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../store/store';
import { Dialog } from '../Dialog';
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

  return (
    <Dialog open={! state.dialog.show}>
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
    </Dialog>
  );
};

export {ErrorDialog};
