import React, { useState, useEffect } from "react";
import parse from "html-react-parser";


const Modal = ({ isOpen, onClose, content, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  function decodeHTMLFromJSON(escapedText) {
    return escapedText
      .replace(/\\u003C/g, "<") // Decode < from \u003C
      .replace(/\\u003E/g, ">") // Decode > from \u003E
      .replace(/\\u0026/g, "&") // Decode & from \u0026
      .replace(/\\u0022/g, '"') // Decode " from \u0022
      .replace(/\\"/g, '"') // Decode escaped double quotes
      .replace(/\\'/g, "'") // Decode escaped single quotes
      .replace(/\\\\/g, "\\") // Decode backslashes
      .replace(/\\n/g, "<br>"); // Decode newline characters
      // Pehle ye aaise de rha tha:- .replace(/\\n/g, "\n");  -> I changed it to "<br>"!!
  }

  // console.log(parse(decodeHTMLFromJSON(content))); // -> Just console this once!!
  
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
        className={`bg-black text-white rounded-lg shadow-xl w-[90%] h-[90%] overflow-hidden transform transition-all duration-700 ${
          isVisible
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-90 translate-y-10 opacity-0"
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
        <div className="p-6 overflow-y-auto max-h-[89%] text-lg prose">
          {parse(content)}
        </div>
      </div>
    </div>
  );
};

export default Modal;
