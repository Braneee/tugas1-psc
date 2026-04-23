import React from "react";
import Button from "../atoms/Button";

function Header({ title, onLogout }) {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          >
            A
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-t-lg">
                Profile
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                Settings
              </button>
              <hr className="my-2" />
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 rounded-b-lg font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
