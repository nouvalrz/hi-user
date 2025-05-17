import React from "react";

function UserItemPlaceholder() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-[284px]  rounded-lg overflow-clip bg-gray-100 dark:bg-gray-500 flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-500 rounded-full"></div>
        <div className="bg-gray-200 dark:bg-gray-500 rounded-lg h-4 w-22 mt-16"></div>
        <div className="bg-gray-200 dark:bg-gray-500 rounded-lg h-4 w-32 mt-1"></div>
      </div>
    </div>
  );
}

export default UserItemPlaceholder;
