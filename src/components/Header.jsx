import { LogOut } from "lucide-react";
import Button from "./Button";
import { useNavigate } from "react-router";

import { ThemeContext } from "../contexts/ThemeContext";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import ToggleThemeButton from "./ToggleThemeButton";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="p-3  border-b border-gray-200 dark:border-gray-600 backdrop-blur bg-white/30 dark:bg-white/5 flex flex-row justify-between items-center fixed top-0 w-full z-50">
      <p
        className="text-base font-medium text-white rounded-full bg-sky-600 px-4 py-1 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Hi User 👋
      </p>
      <div className="flex flex-row gap-1 items-center">
        <ToggleThemeButton />
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="size-4 mr-1" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Header;
