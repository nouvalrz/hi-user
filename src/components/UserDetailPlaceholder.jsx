import React from "react";

function UserDetailPlaceholder() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-start animate-pulse h-screen">
      <div className="flex-1 h-[300px]  bg-gray-100 dark:bg-gray-500 rounded-lg w-full"></div>
      <div className="flex-2 h-[700px]  bg-gray-100 dark:bg-gray-500 rounded-lg w-full"></div>
    </div>
  );
}

export default UserDetailPlaceholder;
