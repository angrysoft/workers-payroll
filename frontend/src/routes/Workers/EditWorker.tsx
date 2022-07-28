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
  const userEditUri = `/api/v1/user/${state.table.workersTable.selected}`;
  const {code, data, loading, error} = useGet(
      userEditUri,
  );

  useEffect(() => {
    if (code === 200 && data && data.results !== undefined) {
      setValues(data.results);
    }
  }, [code, data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <WorkerForm values={values} action={userEditUri} method="PUT"/>
  );
};

export {EditWorker};
