import { BookmarkCheck, Languages } from "lucide-react";
import { NavLink } from "react-router-dom";
import { BsTranslate } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

export default function Navbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navItems = [
    { name: "Full List", path: "/full_list" },
    { name: "AI Categories", path: "/ai_categories" },
    { name: "AI Prompt", path: "https://www.godofprompt.ai/prompt-library" },
    {
      name: "+ More",
      children: [
        { name: "New AI", path: "/new_ai" },
        { name: "Free AI", path: "/free_ai" },
        { name: "AI News", path: "/ai_news" },
      ],
    },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 w-full border-b shadow-md hover:shadow-lg transition-shadow duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-700 hover:shadow-gray-800' 
        : 'bg-white border-gray-200 hover:shadow-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="https://cdn-icons-png.flaticon.com/128/6281/6281567.png"
              className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]"
              alt="Logo"
            />
            <Link to="/">
              <span className={`font-bold text-lg sm:text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>AI-Capitol</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navItems.map((item) =>
                !item.children ? (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `relative font-medium transition-all duration-200 
                      after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 
                      hover:after:w-full ${
                        isDarkMode
                          ? `text-gray-300 hover:text-white after:bg-white ${
                              isActive ? "text-white after:w-full" : ""
                            }`
                          : `text-gray-700 hover:text-black after:bg-black ${
                              isActive ? "text-black after:w-full" : ""
                            }`
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ) : (
                  <div
                    key={item.name}
                    className="relative"
                    style={{ display: "inline-block" }}
                  >
                    <button
                      className={`relative font-medium transition-all duration-200 flex items-center gap-1 ${
                        isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                      }`}
                      onClick={() => setDropdownOpen((open) => !open)}
                      type="button"
                    >
                      {item.name}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div className={`absolute left-0 mt-2 w-40 border rounded shadow-lg z-50 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-600' 
                          : 'bg-white border-gray-200'
                      }`}>
                        {item.children.map((child) => (
                          <NavLink
                            key={child.name}
                            to={child.path}
                            className={({ isActive }) =>
                              `block px-4 py-2 transition-colors ${
                                isDarkMode
                                  ? `text-gray-300 hover:bg-gray-700 hover:text-white ${
                                      isActive ? "bg-gray-700 text-white" : ""
                                    }`
                                  : `text-gray-700 hover:bg-gray-100 hover:text-black ${
                                      isActive ? "bg-gray-100 text-black" : ""
                                    }`
                              }`
                            }
                            onClick={() => setDropdownOpen(false)}
                          >
                            {child.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4 ms-6">
              <button className={`transition cursor-pointer ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
              }`}>
                <BookmarkCheck size={22} />
              </button>
              <button className={`transition cursor-pointer ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
              }`}>
                <BsTranslate size={22} />
              </button>
              <button 
                onClick={toggleDarkMode}
                className={`transition cursor-pointer ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                {isDarkMode ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              className={`p-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Open mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="px-2 py-3 space-y-2">
            {navItems.map((item) =>
              !item.children ? (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `block text-base font-medium px-3 py-2 rounded-md transition-colors ${
                      isDarkMode
                        ? isActive
                          ? "text-white bg-gray-700"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        : isActive
                        ? "text-black bg-gray-100"
                        : "text-gray-700 hover:bg-gray-50 hover:text-black"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ) : (
                <div key={item.name}>
                  <button
                    className={`w-full text-left block text-base font-medium px-3 py-2 rounded-md transition-colors ${
                      isDarkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                    }`}
                    onClick={() => setMobileDropdownOpen((open) => !open)}
                    type="button"
                  >
                    {item.name}
                    <svg className="w-4 h-4 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileDropdownOpen && (
                    <div className="pl-4">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.name}
                          to={child.path}
                          className={({ isActive }) =>
                            `block text-base font-medium px-3 py-2 rounded-md transition-colors ${
                              isDarkMode
                                ? isActive
                                  ? "text-white bg-gray-700"
                                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                : isActive
                                ? "text-black bg-gray-100"
                                : "text-gray-700 hover:bg-gray-50 hover:text-black"
                            }`
                          }
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}

