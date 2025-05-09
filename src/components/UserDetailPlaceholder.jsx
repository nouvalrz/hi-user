import React from "react";

function UserDetailPlaceholder() {
  return (
    <div className="flex flex-col items-center animate-pulse">
      <div className="rounded-full w-62 h-62 bg-gray-200 dark:bg-gray-500"></div>
      <div className="h-4 w-22 mt-4 bg-gray-200 rounded-lg dark:bg-gray-500"></div>
      <div className="h-4 w-32 mt-1 bg-gray-200 rounded-lg dark:bg-gray-500"></div>
    </div>
  );
}

export default UserDetailPlaceholder;
