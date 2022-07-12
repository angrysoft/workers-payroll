import React, { SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../components/elements/BackButton';
import { Form } from '../../components/elements/Form';
import Input from '../../components/elements/Input';
import { InputGroup } from '../../components/elements/InputGroup';
import { useApi } from '../../hooks/useApi';


const UserRatesForm:React.FC = () => {
  const {workerID} = useParams();
  const { results, error, loading, call } = useApi();


  const handleSubmit =(ev: SyntheticEvent) => {
    console.log('form submitted');
  };

  return (
    <Form handleSubmit={handleSubmit}>
      <div className="">
        <BackButton backTo="/workers/1" />
      </div>
      <InputGroup>
        <Input label="Username" type="text" id="username" required />
      </InputGroup>
    </Form>
  );
};

export {UserRatesForm};
