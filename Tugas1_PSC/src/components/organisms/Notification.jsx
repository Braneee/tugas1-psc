import { useState, useEffect } from "react";

const Notification = ({ message, type = "success", duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const typeStyles = {
    success:
      "bg-green-100 border-green-400 text-green-700 fill-green-700 before:content-['✓']",
    error:
      "bg-red-100 border-red-400 text-red-700 fill-red-700 before:content-['✕']",
    info: "bg-blue-100 border-blue-400 text-blue-700 fill-blue-700 before:content-['ℹ']",
    warning:
      "bg-yellow-100 border-yellow-400 text-yellow-700 fill-yellow-700 before:content-['⚠']",
  };

  return (
    <div
      className={`fixed top-4 right-4 border-l-4 p-4 rounded shadow-lg flex items-center gap-3 z-40 ${typeStyles[type]}`}
    >
      <span className="text-xl font-bold">{message}</span>
    </div>
  );
};

export default Notification;
