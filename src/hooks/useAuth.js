import { API_KEY, API_URL } from "@/constants";
import { AlertContext } from "@/contexts/AlertContext";
import axios from "axios";
import { useContext, useState } from "react"
import { AlertType } from "@/contexts/AlertContext";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const alert = useContext(AlertContext);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL + "login", { email, password }, { headers: API_KEY });
      localStorage.setItem("token", response.data.token);

      alert.fire({
        title: "Success",
        message: "Login success, redirecting to dashboard",
        type: AlertType.success,
      });

      setTimeout(() => {
        navigate("/employees", { replace: true });
      }, 2000);
    } catch (error) {
      setError(error.response.data.error);

      alert.fire({
        title: "Error",
        message: error.response.data.error,
        type: AlertType.error,
      });
    }
    setLoading(false);
  }

  const handleRegister = async ({ email, password }) => {
    setLoading(true);
    try {
      await axios.post(API_URL + "register", { email, password }, { headers: API_KEY });

      alert.fire({
        title: "Success",
        message: "Register success, redirecting to login page",
        type: AlertType.success,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response.data.error);

      alert.fire({
        title: "Error",
        message: error.response.data.error,
        type: AlertType.error,
      });
    }
    setLoading(false);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return { loading, handleLogin, handleRegister, handleLogout, error }
}