import { useState } from "react";

const Sidebar = ({ items = [], active = "" }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`bg-slate-900 text-slate-300 h-screen border-r border-slate-800 transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="flex justify-between items-center p-5 border-b border-slate-800">
        <span
          className={`text-xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-wide transition-opacity duration-300 ${
            isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          }`}
        >
          🎓 Akademik Portal
        </span>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-colors focus:outline-none"
        >
          {isCollapsed ? (
            <span className="text-lg font-bold">➔</span>
          ) : (
            <span className="text-lg font-bold">⟤</span>
          )}
        </button>
      </div>

      {/* Nav Menu */}
      <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
        {items.map((item, index) => {
          const isActive = active === item.label;
          return (
            <a
              key={index}
              href={item.href || "#"}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
              }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20"
                  : "hover:bg-slate-800 hover:text-white"
              } cursor-pointer`}
            >
              <span className={`text-xl transition-transform duration-200 ${!isActive && "group-hover:scale-110"}`}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="text-sm font-medium tracking-wide">
                  {item.label}
                </span>
              )}
            </a>
          );
        })}
      </nav>

      {/* Settings / Footer */}
      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors text-left focus:outline-none">
          <span className="text-lg">⚙️</span>
          {!isCollapsed && <span className="text-sm font-medium">Pengaturan</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
