import React from "react";

function Link({ href, children, className = "", onClick, ...props }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`text-blue-600 hover:text-blue-700 hover:underline transition-colors ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export default Link;
