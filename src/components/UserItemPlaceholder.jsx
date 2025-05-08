import React from "react";

function UserItemPlaceholder() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-[300px]  rounded-lg overflow-clip bg-gray-200 skelton "></div>
      <div className="bg-gray-200 rounded-lg h-4 w-22 mt-2"></div>
      <div className="bg-gray-200 rounded-lg h-4 w-32 mt-1"></div>
    </div>
  );
}

export default UserItemPlaceholder;
