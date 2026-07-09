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
    <header className="bg-white border-b border-slate-200">
      <div className="flex justify-between items-center px-8 py-4">
        {/* Title */}
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          {title}
        </h1>

        {/* Profile Avatar & Dropdown */}
        {showProfile && (
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm tracking-wider flex items-center justify-center shadow-md shadow-blue-500/15 focus:outline-none transition-all duration-200 hover:scale-105 active:scale-95"
            >
              AD
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 transition-all duration-200">
                <div className="px-4 py-2 border-b border-slate-50">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Role
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    Administrator
                  </p>
                </div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Profil Saya
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium border-t border-slate-50"
                >
                  Keluar Aplikasi
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
