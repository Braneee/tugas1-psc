import React from "react";

function Checkbox({ id, label, checked, onChange, ...props }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        {...props}
      />
      {label && (
        <label htmlFor={id} className="ml-2 text-sm text-gray-600">
          {label}
        </label>
      )}
    </div>
  );
}

export default Checkbox;
