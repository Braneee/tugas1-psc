import React, { useState } from "react";

function Sidebar({ activeMenu, onMenuChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "mahasiswa", label: "Mahasiswa", icon: "🎓" },
    { id: "courses", label: "Courses", icon: "📚" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside
      className={`bg-blue-800 text-white transition-all duration-300 ${
        isCollapsed ? "w-20" : "lg:w-64 w-20"
      } h-screen sticky top-0`}
    >
      <div className="flex justify-between items-center p-4 border-b border-blue-700">
        <span
          className={`text-2xl font-bold ${isCollapsed ? "hidden" : "hidden lg:block"}`}
        >
          Admin
        </span>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-blue-700 p-2 rounded lg:hidden"
        >
          ☰
        </button>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onMenuChange(item.id)}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
              activeMenu === item.id ? "bg-blue-700" : "hover:bg-blue-700"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span
              className={`menu-text ${isCollapsed ? "hidden" : "hidden lg:inline"}`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
