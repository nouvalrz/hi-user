import clsx from "clsx";
import { Loader } from "lucide-react";
import React from "react";

const variantsStyle = {
  primary:
    "bg-sky-600 not-disabled:hover:bg-sky-700 text-white dark:bg-sky-700  not-disabled:dark:hover:bg-sky-800",
  secondary:
    "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700",
  ghost: "bg-transparent hover:bg-gray-200 dark:hover:text-gray-700",
};

function Button({
  type = "button",
  variant = "primary",
  className,
  onClick,
  loading,
  children,
  disabled,
}) {
  return (
    <button
      disabled={loading || disabled}
      className={clsx(
        variantsStyle[variant],
        "px-4 py-2 rounded text-sm font-medium transition cursor-pointer flex flex-row justify-center items-center disabled:cursor-not-allowed dark:text-gray-300 disabled:opacity-80",
        className
      )}
      type={type}
      onClick={onClick ?? null}
    >
      {!loading && children}
      {loading && (
        <>
          <Loader className="animate-spin mr-1 size-4" /> Loading
        </>
      )}
    </button>
  );
}

export default Button;
