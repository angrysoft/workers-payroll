import React from "react";
import Table from "../../components/elements/Table";
import Pagination from "../../components/Pagination";

const header = ["Firstname", "Lastname", "Email"];

const userData = [
  {
    id: 1,
    cells: ["John", "Doe", "john.doe@example.net"],
  },
  {
    id: 2,
    cells: ["John", "Doe", "john.doe@example.net"],
  },
];

interface IWorkersProps {
  children?: JSX.Element | JSX.Element[];
}

const Workers: React.FC<IWorkersProps> = (props: IWorkersProps) => {
  return (
    <>
      <div className="h-[calc(100vh_-_5rem)] print:h-full overflow-auto">
        <Table header={header} data={userData}>
          <div className="bg-white rounded-xl mt-2 shadow-xl
                          flex justify-center">
            <Pagination
              path="/workers"
              currentPage={1 || 0}
              pageRange={[1] || []}
              pages={1 || 0}
            />
          </div>
        </Table>
      </div>
    </>
  );
};

export { Workers };
