import { useState } from "react";

const Sidebar = ({ items = [], active = "" }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`bg-blue-800 text-white h-screen transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-blue-700">
        <span
          className={`text-2xl font-bold ${isCollapsed ? "hidden" : "block"}`}
        >
          Admin
        </span>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-blue-700 p-1 rounded"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="p-4 space-y-2 flex-1">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href || "#"}
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault();
                item.onClick();
              }
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700 transition ${
              active === item.label ? "bg-blue-700" : ""
            } cursor-pointer`}
          >
            <span className="text-lg">{item.icon}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-blue-700">
        <button className="w-full py-2 hover:bg-blue-700 rounded transition text-left px-2">
          {!isCollapsed ? "⚙️ Settings" : "⚙️"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
