import clsx from "clsx";
import React from "react";

function Input({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  className,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(
        "py-2 px-3 rounded shadow-2xs border border-gray-300 focus:outline-sky-600 text-sm dark:bg-transparent dark:border-gray-500",
        className
      )}
    />
  );
}

export default Input;
