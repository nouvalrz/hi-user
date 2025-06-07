import React from "react";
import PaginationItem from "./PaginationItem";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

function Pagination({ count, onPageChange, current }) {
  const handlePageChange = (newPage) => {
    if (newPage <= 0 || newPage > count) {
      return;
    }
    onPageChange(newPage);
  };

  return (
    <div data-testid="pagination" className="flex flex-row gap-2">
      <PaginationItem
        onClick={() => handlePageChange(current - 1)}
        className="px-3"
      >
        <ChevronLeft data-testid="chevron-icon" className="size-5" /> Prev
      </PaginationItem>
      {Array.from({ length: count }).map((_, index) => (
        <PaginationItem
          key={index}
          active={current === index + 1}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </PaginationItem>
      ))}
      <PaginationItem
        onClick={() => handlePageChange(current + 1)}
        className="px-3"
      >
        Next <ChevronRight data-testid="chevron-icon" className="size-5" />
      </PaginationItem>
    </div>
  );
}

export default Pagination;
