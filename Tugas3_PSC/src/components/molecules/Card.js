import React from "react";

function Card({ children, className = "", title, subtitle }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-8 ${className}`}>
      {title && (
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-2">
            {title}
          </h2>
          {subtitle && <p className="text-center text-gray-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

export default Card;
