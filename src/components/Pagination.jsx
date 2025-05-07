import React from "react";
import PaginationItem from "./PaginationItem";

function Pagination({ count, onPageChange, current }) {
  const handlePageChange = (newPage) => {
    if (newPage <= 0 || newPage > count) {
      return;
    }
    onPageChange(newPage);
  };

  return (
    <>
      <PaginationItem
        title="Prev"
        onClick={() => handlePageChange(current - 1)}
      />
      {Array.from({ length: count }).map((_, index) => (
        <PaginationItem
          key={index}
          title={index + 1}
          active={current === index + 1}
          onClick={() => handlePageChange(index + 1)}
        />
      ))}
      <PaginationItem
        title="Next"
        onClick={() => handlePageChange(current + 1)}
      />
    </>
  );
}

export default Pagination;
