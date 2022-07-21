import React, { useContext, useEffect, useState } from 'react';
import Loader from '../../components/Loader';

import { useGet } from '../../hooks/useGet';
import { AppContext } from '../../store/store';
import { WorkerForm } from './WorkerForm';


interface IEditWorkerProps {

  children?: JSX.Element | JSX.Element[];
}


const EditWorker:React.FC<IEditWorkerProps> = (props:IEditWorkerProps) => {
  const [values, setValues] = useState({});
  const { state } = useContext(AppContext);
  const {code, data, loading, error} = useGet(
      `/api/v1/user/${state.table.selected}`,
  );

  useEffect(() => {
    if (code === 200 && data && data.results !== undefined) {
      setValues(data.results);
    }
  }, [code, data]);

  useEffect(() => console.log("edit worker", values), [values]);

  if (loading) {
    return <Loader />;
  }

  return (
    <WorkerForm values={values}/>
  );
};

export {EditWorker};
