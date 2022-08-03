import React, { useEffect, useState } from 'react';
import { Dialog } from '../../../components/Dialog';
import Button from '../../../components/elements/Button';
import Input from '../../../components/elements/Input';
import { InputGroup } from '../../../components/elements/InputGroup';
import { useDispatch } from '../../../hooks/useDispatch';
import { DayViewList } from './DayViewList';

interface IEventDays {
  days: Array<IEventWorkerDay>;
}

interface IEventWorkerDay {
  event: string;
  function: string;
  worker: string;
  start: Date;
  end: Date;
  additions: Array<any>;
}


const EventWorkDays:React.FC = () => {
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(()=> {
    dispatch({type: "CLEAR_WORK_DAYS"});
  }, []);

  const addDay = () => {
    setShowDialog(true);
    dispatch({type: "ADD_WORK_DAY", payload: {start: "startday"}});
  };

  return (
    <div className="p-1 md:p-2">
      <div className="grid gap-1 grid-cols-1 p-2 bg-white rounded-lg">
        <InputGroup>
          <div className='grid gap-05 md:grid-flow-col'>
            <Button handleClick={addDay}>Add Day</Button>
            <Button>Remove Day</Button>
            <Button>Add Worker</Button>
          </div>
        </InputGroup>
        <DayViewList />
        <Dialog open={showDialog}>
          <InputGroup>
            <Input type='date' label='Choose day' id="start"/>
          </InputGroup>
          <Button handleClick={()=> setShowDialog(false)}>Ok</Button>
          <Button handleClick={()=> setShowDialog(false)}>Cancel</Button>
        </Dialog>
      </div>
    </div>
  );
};

export default EventWorkDays;
