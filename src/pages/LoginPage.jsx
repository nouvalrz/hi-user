import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function LoginPage() {
  return (
    <div className="bg-gray-100 min-h-dvh flex flex-col justify-center items-center">
      <div className="rounded-lg overflow-clip shadow flex flex-col lg:flex-row">
        <div className="bg-white p-8 flex flex-col items-stretch">
          <h1 className="text-2xl font-semibold text-center">Selamat Datang</h1>
          <p className="text-gray-500 text-center text-sm">
            Login menggunakan akun anda
          </p>

          <form className="flex flex-col gap-3 mt-6">
            <Input placeholder="Email" />
            <Input placeholder="Password" type="password" />
            <Button variant="primary">Login</Button>
          </form>
        </div>
        <div className="bg-sky-600 p-4 order-first lg:order-last">
          <img src="./hi-user-logo.svg" alt="logo" className="w-48 m-auto" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
