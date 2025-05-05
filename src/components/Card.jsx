import clsx from "clsx";
import React from "react";

function Card({ children, className }) {
  return (
    <div className={clsx("rounded-lg shadow bg-white", className)}>
      {children}
    </div>
  );
}

export default Card;
