import React from "react";

function Title({ level = 1, children, className = "" }) {
  const levels = {
    1: "text-4xl font-bold",
    2: "text-3xl font-semibold",
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-semibold",
    6: "text-base font-semibold",
  };

  const Tag = `h${level}`;
  return (
    <Tag className={`text-gray-800 ${levels[level]} ${className}`}>
      {children}
    </Tag>
  );
}

export default Title;
