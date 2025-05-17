import { TriangleAlert } from "lucide-react";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-4 dark:text-gray-200">
        <TriangleAlert />
        <p className="text-sm font-medium">Ups, Resource not found</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
