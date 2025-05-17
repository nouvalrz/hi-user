import React from "react";
import Button from "../Button";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { KeyRound } from "lucide-react";
import { DoorClosed } from "lucide-react";

const LandingPageNavbar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem("token");

    if (login) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="bg-sky-50 border-b border-sky-100 px-5 py-3 fixed top-0 left-0 w-full flex justify-between items-center">
      <div className="flex gap-8">
        <p className="font-medium">Hi Employee 👋</p>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
      </div>
      {!isLogin ? (
        <div className="flex gap-3">
          <Button variant="primary" onClick={() => navigate("/login")}>
            <KeyRound className="size-4 mr-2" />
            Login
          </Button>
          <Button
            variant="secondary"
            className="bg-white!"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      ) : (
        <Button variant="primary" onClick={() => navigate("/employees")}>
          <DoorClosed className="size-4 mr-2" />
          Dashboard
        </Button>
      )}
    </div>
  );
};

export default LandingPageNavbar;
