import clsx from "clsx";
import React from "react";

const variantsStyle = {
  primary: "bg-sky-600 hover:bg-sky-700 text-white",
  secondary: "bg-sky-50 text-gray-700",
};

function Button({
  type = "button",
  variant = "primary",
  className,
  onClick,
  children,
}) {
  return (
    <button
      className={clsx(
        variantsStyle[variant],
        "px-4 py-2 rounded text-sm font-medium transition cursor-pointer",
        className
      )}
      type={type}
      onClick={onClick ?? null}
    >
      {children}
    </button>
  );
}

export default Button;
