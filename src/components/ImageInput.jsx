import React from "react";
import { useRef } from "react";
import { useState } from "react";

function ImageInput({ label, errorMessage, onChange, value, name }) {
  const [preview, setPreview] = useState(value || null);
  const id = Math.random();
  const inputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange(e);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-sm text-gray-600">
          {label}
        </label>
      )}

      <div
        data-testid="image-input-container"
        role="button"
        className="w-36 h-36 object-cover overflow-clip bg-gray-100  border-gray-300 border-2 rounded-full border-dashed flex justify-center items-center cursor-pointer mt-4"
        onClick={handleClick}
      >
        {preview ? (
          <div className="group relative">
            <p className="hidden group-hover:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded text-xs shadow text-center">
              Change image
            </p>
            <img src={preview} className="w-36 h-36 object-cover" alt="preview" />
          </div>
        ) : (
          <p className="text-xs">Upload image</p>
        )}
      </div>

      <input
        data-testid="file-input"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        name={name}
        className="hidden"
        ref={inputRef}
      />

      {errorMessage && (
        <p className="text-xs mt-1 text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}

export default ImageInput;
