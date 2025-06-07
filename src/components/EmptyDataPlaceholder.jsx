import clsx from "clsx";
import { Info } from "lucide-react";
import React from "react";

function EmptyDataPlaceholder({ className }) {
  return (
    <div
      data-testid="empty-placeholder"
      className={clsx(
        "flex flex-col items-center justify-center w-full flex-1 text-gray-600",
        className
      )}
    >
      <Info data-testid="info-icon" className="dark:text-gray-400" />
      <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">
        No users found
      </p>
    </div>
  );
}

export default EmptyDataPlaceholder;
