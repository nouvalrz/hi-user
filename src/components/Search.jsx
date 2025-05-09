import clsx from "clsx";
import { SearchIcon } from "lucide-react";
import React from "react";

function Search({ className, onSearchChange, placeholder }) {
  return (
    <div className={clsx("relative", className)}>
      <input
        className={clsx(
          "border border-gray-300 dark:border-gray-500 rounded-full pl-12 pr-3 py-2 focus:outline-sky-600 w-full text-gray-700 text-sm dark:text-white"
        )}
        type="text"
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
      />
      <div className="absolute inset-y-0 flex items-center pl-3">
        <SearchIcon className="size-5 text-gray-500" />
      </div>
    </div>
  );
}

export default Search;
