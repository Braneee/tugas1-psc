import React, { useState } from "react";
import Card from "../components/molecules/Card";
import Form from "../components/molecules/Form";
import FormGroup from "../components/molecules/FormGroup";
import Button from "../components/atoms/Button";
import Checkbox from "../components/atoms/Checkbox";
import Link from "../components/atoms/Link";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="h-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card
          title="Login"
          subtitle="Masukkan kredensial Anda untuk melanjutkan"
        >
          <Form onSubmit={handleSubmit}>
            <FormGroup
              id="email"
              label="Email"
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FormGroup
              id="password"
              label="Password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-between items-center py-4">
              <Checkbox
                id="rememberMe"
                label="Ingat saya"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Link href="#" onClick={(e) => e.preventDefault()}>
                Lupa password?
              </Link>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Login
            </Button>

            <p className="text-center text-gray-600 text-sm mt-4">
              Belum punya akun?{" "}
              <Link href="#" onClick={(e) => e.preventDefault()}>
                Daftar sekarang
              </Link>
            </p>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
