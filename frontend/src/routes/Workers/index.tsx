import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../../components/elements/Table";
import { IRow } from "../../components/elements/Table/TableBody";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import { useApi } from "../../hooks/useApi";

const header = ["First name", "Last name", "Email"];

interface IWorkersProps {
  children?: JSX.Element | JSX.Element[];
}

interface IUserItem {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface IPageInfo {
  pages: number;
  currentPage: number;
  pageRange: Array<number>;
}

const Workers: React.FC<IWorkersProps> = (props: IWorkersProps) => {
  const [userData, setUserData] = useState<Array<IRow>>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    pages: 1,
    currentPage: 1,
    pageRange: [1],
  });

  const { pageNo } = useParams();
  const { results, error, loading, call } = useApi();


  useEffect(() => {
    call(`/api/v1/user/list?account_type=all&page=${pageNo}`, {method: "GET"});
  }, [pageNo]);

  useEffect(() => {
    const data: Array<IRow> = [];
    if (results && results.results) {
      results.results.forEach((item: IUserItem) => {
        data.push({
          id: Number(item.id),
          cells: [item.first_name, item.last_name, item.email],
        });
      });
      setUserData(data);
      setPageInfo({
        pages: results.pages,
        currentPage: results.currentPage,
        pageRange: results.pageRange,
      });
    }
  }, [results]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500 font-bold">Ups something went wrong</div>
    );
  }

  return (
    <>
      <div className="h-[calc(100vh_-_5rem)] print:h-full overflow-auto">
        <Table header={header} data={userData} id="workersTable">
          <div
            className="bg-white rounded-xl mt-2 shadow-xl
                          flex justify-center"
          >
            <Pagination
              path="/workers"
              currentPage={pageInfo.currentPage}
              pageRange={pageInfo.pageRange}
              pages={pageInfo.pages}
            />
          </div>
        </Table>
      </div>
    </>
  );
};

export { Workers };
export type { IUserItem };
