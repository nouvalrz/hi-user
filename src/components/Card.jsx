import clsx from "clsx";
import React from "react";

function Card({ children, className }) {
  return (
    <div
      className={clsx(
        "rounded-lg shadow bg-white dark:bg-gray-800 dark:text-gray-300",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
