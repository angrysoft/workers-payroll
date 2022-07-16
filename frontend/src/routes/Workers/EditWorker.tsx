import React, { useState } from 'react';
import { useParams } from 'react-router-dom';


interface IEditWorkerProps {

  children?: JSX.Element | JSX.Element[];
}


const EditWorker:React.FC<IEditWorkerProps> = (props:IEditWorkerProps) => {
  const { workerID } = useParams();
  // const { inputs, setInputs} = useState<object>({});

  return (
    <></>
  );
};

export {EditWorker};
