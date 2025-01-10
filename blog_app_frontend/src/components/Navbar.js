import React from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import maitLogo from "../assets/mait_logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-md w-full z-50" style={{ height: "75px" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <img src={maitLogo} className="w-14 "></img>
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold">BlogSpace</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Home
              </a>
            </Link>
            <Link to="/all-posts">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                All Posts
              </a>
            </Link>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              My Posts
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Add Post
            </a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Sign Out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              All Posts
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              My Posts
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Add Post
            </a>
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
