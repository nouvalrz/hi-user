import clsx from "clsx";
import React from "react";

/**
 * @param options object with value and name
 */

function Dropdown({
  options = [],
  placeholder = "Select...",
  label,
  onSelectedChange,
  className,
  value,
  name,
  errorMessage,
}) {
  const id = Math.random();
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-sm text-gray-600">
          {label}
        </label>
      )}
      <select
        value={value}
        name={name}
        onChange={onSelectedChange}
        id={id}
        className={clsx(
          "mt-1 w-full py-2 px-3 rounded shadow-2xs border border-gray-300 focus:outline-sky-600 text-sm dark:bg-transparent dark:border-gray-500",
          className
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
      {errorMessage && (
        <p className="text-xs mt-1 text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}

export default Dropdown;
