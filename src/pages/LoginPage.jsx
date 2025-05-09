import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { API_KEY, API_URL } from "../constants";
import { useNavigate } from "react-router";
import Alert from "../components/Alert";
import ToggleThemeButton from "../components/ToggleThemeButton";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(API_URL + "login", form, {
        headers: { ...API_KEY },
      });
      localStorage.setItem("token", response.data.token);

      setSuccess("Berhasil masuk, anda akan dialihkan ke home");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-dvh flex flex-col justify-center items-center lg:p-4 p-2 dark:bg-gray-900">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <div className="flex justify-end">
          <ToggleThemeButton />
        </div>
        <div className="rounded-lg overflow-clip shadow flex flex-col lg:flex-row">
          <div className="bg-white p-8 flex flex-col items-stretch flex-1 dark:bg-gray-800  ">
            <h1 className="text-2xl font-semibold text-center dark:text-gray-300  ">
              Selamat Datang
            </h1>
            <p className="text-gray-500 text-center text-sm">
              Login menggunakan akun anda
            </p>

            <form className="flex flex-col gap-3 mt-10" onSubmit={handleLogin}>
              <Input
                placeholder="Email"
                name="email"
                onChange={handleFormChange}
              />
              <Input
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleFormChange}
              />
              <Button variant="primary" type="submit" loading={loading}>
                Login
              </Button>
            </form>

            <p className="text-right text-sm mt-8 text-gray-500">
              Belum punya akun?{" "}
              <span
                className="text-gray-800 hover:underline cursor-pointer dark:text-gray-300"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
          <div className="bg-sky-600 dark:bg-sky-800 p-4 order-first lg:order-last flex-1 flex">
            <img src="./hi-user-logo.svg" alt="logo" className="w-48 m-auto" />
          </div>
        </div>
        {error && <Alert title="Error" description={error} />}
        {success && <Alert title="Success" description={success} />}
      </div>
    </div>
  );
}

export default LoginPage;
