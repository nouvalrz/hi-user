import clsx from "clsx";
import React from "react";

function Input({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  className,
  label,
}) {
  const id = Math.random();
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-sm text-gray-600">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          "mt-1 w-full py-2 px-3 rounded shadow-2xs border border-gray-300 focus:outline-sky-600 text-sm dark:bg-transparent dark:border-gray-500",
          className
        )}
      />
    </div>
  );
}

export default Input;
