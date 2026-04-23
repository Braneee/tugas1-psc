import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Mahasiswa from "./pages/Mahasiswa";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<Mahasiswa />} />
      </Routes>
    </Router>
  );
}

export default App;
