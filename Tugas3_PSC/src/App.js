import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    // Simple authentication logic
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="h-full">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <AdminPage onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
