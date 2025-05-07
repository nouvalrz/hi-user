import clsx from "clsx";
import { Loader } from "lucide-react";
import React from "react";

const variantsStyle = {
  primary: "bg-sky-600 hover:bg-sky-700 text-white ",
  secondary: "bg-sky-50 text-gray-700",
  ghost: "bg-transparent hover:bg-gray-200",
};

function Button({
  type = "button",
  variant = "primary",
  className,
  onClick,
  loading,
  children,
}) {
  return (
    <button
      disabled={loading}
      className={clsx(
        variantsStyle[variant],
        "px-4 py-2 rounded text-sm font-medium transition cursor-pointer flex flex-row justify-center items-center disabled:cursor-not-allowed",
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
