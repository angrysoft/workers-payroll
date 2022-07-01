import React from 'react';
import Table from '../../components/elements/Table';


const header = [
  "Firstname",
  "Lastname",
  "Email",
];

const userData = [
  {
    id: 1,
    cells: [
      "John",
      "Doe",
      "john.doe@example.net",
    ],
  },
];

interface IWorkersProps {

  children?: JSX.Element | JSX.Element[];
}


const Workers:React.FC<IWorkersProps> = (props:IWorkersProps) => {
  return (
    <>
      <div className="h-[calc(100vh_-_5rem)] print:h-full overflow-auto">
        <Table header={header} data={userData} />
      </div>
    </>
  );
};

export {Workers};
