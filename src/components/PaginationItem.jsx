import clsx from "clsx";
import React from "react";

function PaginationItem({ title, onClick, active }) {
  return (
    <button
      className={clsx("p-2 border border-gray-200 rounded cursor-pointer", {
        "bg-sky-600 text-white border-0": active,
      })}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default PaginationItem;
