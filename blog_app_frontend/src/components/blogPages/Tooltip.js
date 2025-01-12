import React from "react";

const Tooltip = ({ message, children, show }) => {
  return (
    <div className="relative group">
      {children}
      {show && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded-md px-4 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {message}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
