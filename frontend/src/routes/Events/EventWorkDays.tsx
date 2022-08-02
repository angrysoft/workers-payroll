import React from 'react';

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
  return (
    <div className="p-1 md:p-2">
      <div className="grid gap-1 grid-cols-1 p-2 bg-white rounded-lg"></div>
    </div>
  );
};

export {EventWorkDays};
