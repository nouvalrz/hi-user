import clsx from "clsx";
import React from "react";

function Card({ children, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-lg shadow bg-white dark:bg-gray-800 dark:text-gray-300  dark:border-gray-600",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
