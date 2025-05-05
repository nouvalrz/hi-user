import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function LoginPage() {
  return (
    <div className="bg-gray-100 min-h-dvh flex flex-col justify-center items-center lg:p-4 p-2">
      <div className="rounded-lg overflow-clip shadow flex flex-col lg:flex-row w-full max-w-2xl">
        <div className="bg-white p-8 flex flex-col items-stretch flex-1">
          <h1 className="text-2xl font-semibold text-center">Selamat Datang</h1>
          <p className="text-gray-500 text-center text-sm">
            Login menggunakan akun anda
          </p>

          <form className="flex flex-col gap-3 mt-10">
            <Input placeholder="Email" />
            <Input placeholder="Password" type="password" />
            <Button variant="primary">Login</Button>
          </form>
        </div>
        <div className="bg-sky-600 p-4 order-first lg:order-last flex-1 flex">
          <img src="./hi-user-logo.svg" alt="logo" className="w-48 m-auto" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
