import { useState } from "react";
import { Button } from "../atoms";

const Header = ({ title = "", onLogout, showProfile = true }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    setShowMenu(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

        {showProfile && (
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none transition"
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-10">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
