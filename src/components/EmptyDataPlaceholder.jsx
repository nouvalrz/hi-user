import clsx from "clsx";
import { Info } from "lucide-react";
import React from "react";

function EmptyDataPlaceholder({ className }) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center w-full flex-1 text-gray-600",
        className
      )}
    >
      <Info />
      <p className="text-sm text-gray-600 mt-1">No users found</p>
    </div>
  );
}

export default EmptyDataPlaceholder;
