import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, content, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10); // Trigger animation
    } else {
      setIsVisible(false); // Hide animation
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null; // Only render when necessary

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      {/* Modal container */}
      <div
        className={`bg-black text-white rounded-lg shadow-xl w-11/12 sm:w-2/3 lg:w-1/2 max-h-[80vh] overflow-hidden transform transition-all duration-700 ${
          isVisible ? "scale-100 translate-y-0 opacity-100" : "scale-90 translate-y-10 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            className="text-gray-400 hover:text-white focus:outline-none"
            onClick={onClose}
          >
            &#10005; {/* Cross Icon */}
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] text-lg">{content}</div>
      </div>
    </div>
  );
};

export default Modal;
