import { Info } from "lucide-react";
import React from "react";
import Card from "./Card";
import clsx from "clsx";

function Alert({ title, description, className }) {
  return (
    <Card className={clsx("flex flex-row gap-3 bg p-3", className)}>
      <Info />
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-sm capitalize text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </Card>
  );
}

export default Alert;
