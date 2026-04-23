import React from "react";
import Button from "../atoms/Button";
import Link from "../atoms/Link";

function Form({ children, onSubmit, title, footer }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {title && (
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
      )}
      {children}
      {footer && <div className="pt-4">{footer}</div>}
    </form>
  );
}

export default Form;
