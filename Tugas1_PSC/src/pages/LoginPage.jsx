import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/atoms";
import { Card, FormGroup } from "../components/molecules";
import { Form } from "../components/organisms";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Email dan password wajib diisi!");
      return;
    }

    // Simple validation
    if (
      trimmedEmail === "admin@example.com" &&
      trimmedPassword === "admin123"
    ) {
      setError("");
      alert("Login berhasil!");
      navigate("/admin");
    } else {
      setError("Email atau password salah!");
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-blue-600">Login</h2>
            <p className="text-gray-500 mt-2">Masuk ke akun Anda</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <Form onSubmit={handleLogin}>
            <FormGroup
              label="Email"
              type="email"
              id="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FormGroup
              label="Password"
              type="password"
              id="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-between items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-gray-600">Ingat saya</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Lupa password?
              </a>
            </div>
          </Form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Belum punya akun?
            <a href="#" className="text-blue-500 hover:underline ml-1">
              Daftar
            </a>
          </p>
        </Card>

        <div className="text-center text-xs text-gray-500 mt-4">
          <p>Demo: admin@example.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
