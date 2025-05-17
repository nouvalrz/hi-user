import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { API_KEY, API_URL } from "@/constants";
import { useNavigate } from "react-router";
import Alert from "@/components/Alert";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import { AlertContext, AlertType } from "@/contexts/AlertContext";
import useForm from "@/hooks/useForm";
import { useAuth } from "@/hooks/useAuth";

const loginFormValidation = (values) => {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};

const loginInitialValues = {
  email: "",
  password: "",
};

function LoginPage() {
  const navigate = useNavigate();
  const { handleChange, values, handleSubmit, allFilled, errors } = useForm(
    loginInitialValues,
    loginFormValidation
  );
  const { loading, handleLogin } = useAuth();

  const login = () => {
    handleLogin({
      email: values.email,
      password: values.password,
    });
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
              Welcome
            </h1>
            <p className="text-gray-500 text-center text-sm">
              Use your account to login
            </p>

            <form
              className="flex flex-col gap-3 mt-10"
              onSubmit={handleSubmit(login)}
            >
              <Input
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={values.email}
                errorMessage={errors.email}
              />
              <Input
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                errorMessage={errors.password}
              />
              <Button
                variant="primary"
                type="submit"
                loading={loading}
                disabled={!allFilled}
              >
                Login
              </Button>
            </form>

            <p className="text-right text-sm mt-8 text-gray-500">
              Don't have an account?{" "}
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
      </div>
    </div>
  );
}

export default LoginPage;
