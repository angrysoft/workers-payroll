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
            "border-2 border-black px-05 bg-secondary" +
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
    <div className="grid grid-flow-col justify-center items-center
                   mt-3 gap-1 text-2xl ">
      {prev()}
      {pageRange()}
      {next()}
    </div>
  );
};

export default Pagination;
