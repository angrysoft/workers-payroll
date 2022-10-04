import React from "react";
import { Link } from "react-router-dom";

type IPaginationProps = {
  currentPage: number;
  pageRange: Array<number>;
  pages: number;
  path?: string;
};

const Pagination = (props: IPaginationProps) => {
  const pageRange = () => {
    return props.pageRange.map((page) => {
      return (
        <Link
          to={`${props.path}/${page}`}
          key={page}
          className={
            "border-2 border-blue-900 px-05 shadow-xl rounded-md " +
            "bg-gradient-to-b from-indigo-500 to-blue-500 text-white" +
            (page === props.currentPage ? " font-bold" : "")
          }
        >
          {page}
        </Link>
      );
    });
  };

  const linkClasses = "flex justify-center p-05 font-bold text-3xl";
  const prev = () => {
    if (props.currentPage > 1) {
      return (
        <Link
          to={`${props.path}/${props.currentPage - 1}`}
          className={linkClasses}
        >
          &laquo;
        </Link>
      );
    }
    return "";
  };

  const next = () => {
    if (props.currentPage < props.pages) {
      return (
        <Link
          to={`${props.path}/${props.currentPage + 1}`}
          className={linkClasses}
        >
          &raquo;
        </Link>
      );
    }
    return "";
  };

  return (
    <div
      className="grid grid-flow-col justify-center items-center
                 gap-1 text-2xl p-1
                 overflow-auto"
    >
      {prev()}
      {pageRange()}
      {next()}
    </div>
  );
};

export default Pagination;
