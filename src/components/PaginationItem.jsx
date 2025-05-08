import clsx from "clsx";
import React from "react";

function PaginationItem({ children, onClick, active, className }) {
  return (
    <button
      className={clsx(
        "min-h-[36px] min-w-[36px] rounded cursor-pointer text-sm flex flex-row gap-1 items-center justify-center hover:bg-gray-100",
        {
          "border border-gray-200  ": active,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PaginationItem;
