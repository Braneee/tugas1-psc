import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/atoms";
import { Card, FormGroup } from "../components/molecules";
import { Form } from "../components/organisms";
import { registerUser } from "../services/api";
import { showToast } from "../helpers/toastHelper";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedEmail || !trimmedPassword || !trimmedConfirm) {
      setError("Semua field wajib diisi!");
      showToast.error("Semua field wajib diisi!");
      return;
    }

    if (trimmedPassword !== trimmedConfirm) {
      setError("Konfirmasi password tidak cocok!");
      showToast.error("Konfirmasi password tidak cocok!");
      return;
    }

    if (trimmedPassword.length < 6) {
      setError("Password minimal 6 karakter!");
      showToast.error("Password minimal 6 karakter!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await registerUser(trimmedEmail, trimmedPassword);
      if (response.data.success) {
        showToast.success("Registrasi berhasil! Silakan login.");
        navigate("/");
      } else {
        setError(response.data.message || "Registrasi gagal!");
        showToast.error(response.data.message || "Registrasi gagal!");
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || "Koneksi backend gagal!";
      setError(errMsg);
      showToast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-blue-600">Daftar Akun</h2>
            <p className="text-gray-500 mt-2">Buat akun admin baru Anda</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <Form onSubmit={handleRegister}>
            <FormGroup
              label="Email"
              type="email"
              id="email"
              placeholder="Masukkan email baru"
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

            <FormGroup
              label="Konfirmasi Password"
              type="password"
              id="confirmPassword"
              placeholder="Ulangi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className="pt-4">
              <Button type="submit" variant="primary" className="w-full py-2.5" disabled={loading}>
                {loading ? "Mendaftarkan..." : "Daftar Akun"}
              </Button>
            </div>
          </Form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Sudah punya akun?
            <span
              onClick={() => navigate("/")}
              className="text-blue-500 hover:underline ml-1 cursor-pointer"
            >
              Login di sini
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
