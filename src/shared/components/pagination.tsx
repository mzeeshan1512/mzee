import React, { useMemo } from "react";
import { Left, Right } from "../icons/common";

const Pagination = ({
  list = [],
  currentPage = 1,
  setCurrentPage,
  recordsPerPage = 10,
  visiblePages = 5,
  totalRecord
}: {
  list: any;
  currentPage?: number;
  setCurrentPage: any;
  recordsPerPage?: number | any;
  visiblePages?: number;
  totalRecord?: number;
}) => {
  const numberOfPages = Math.ceil(list?.length / recordsPerPage);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCurrenPage = (id: number | string) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pagination = useMemo(() => {
    const pages = [];
    if (numberOfPages <= visiblePages) {
      for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
      const endPage = Math.min(currentPage + 2, numberOfPages);

      if (currentPage > 2) {
        pages.push(1);
        if (startPage > 1) {
          pages.push("...");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < numberOfPages) {
        if (endPage < numberOfPages - 1) {
          pages.push("...");
        }
        pages.push(numberOfPages);
      }
    }
    return pages;
  },[numberOfPages,visiblePages, currentPage]);
  
  return (
    <nav className="d-flex align-items-center mb-2 flex-wrap">
      <div> {list?.length > 0 ? `Total Records: ${totalRecord}` : ""}</div>
      <div className="flex-grow-1 d-flex justify-content-center">
        <ul className="pagination">
          {list?.length > 0 ? (
            <li className={currentPage <= 1 ? "d-none" : "no-border"}>
              <button
                disabled={currentPage <= 1}
                className={currentPage <= 1 ? "d-none" : "general-hover-cursor"}
                onClick={prePage}
              >
                <Left />
              </button>
            </li>
          ) : null}
          {pagination?.map((page: number | string, index: number) => {
            return (
              <li
                key={index}
                className={`${page === currentPage ? "active" : ""} ${
                  page === "..." ? "no-hover disable no-border" : ""
                }`}
              >
                {page === "..." ? (
                  <span className="no-hover">...</span>
                ) : (
                  <span onClick={() => changeCurrenPage(+page)}>
                    {+page < 10 ? `0${page}` : page}
                  </span>
                )}
              </li>
            );
          })}
          {list?.length > 0 ? (
            <li
              className={currentPage >= numberOfPages ? "d-none" : "no-border"}
            >
              <button
                disabled={currentPage >= numberOfPages}
                className={
                  currentPage >= numberOfPages
                    ? "d-none"
                    : "general-hover-cursor"
                }
                onClick={nextPage}
              >
                <Right />
              </button>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default Pagination;
